'use client';
import React, { createContext, useContext, useState } from 'react';

interface LikedTracksState {
  liked: Set<string>;
  toggle: (trackId: string) => void;
  isLiked: (trackId: string) => boolean;
}

const LikedTracksContext = createContext<LikedTracksState | null>(null);

export function LikedTracksProvider({ children }: { children: React.ReactNode }) {
  const [liked, setLiked] = useState<Set<string>>(
    () => new Set(['rep-2', 'rep-5', 'lov-1', 'lov-3', 'ttp-2', 'ttp-5', 'aes-3', 'sho-2'])
  );

  function toggle(trackId: string) {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(trackId)) next.delete(trackId);
      else next.add(trackId);
      return next;
    });
  }

  function isLiked(trackId: string) {
    return liked.has(trackId);
  }

  return (
    <LikedTracksContext.Provider value={{ liked, toggle, isLiked }}>
      {children}
    </LikedTracksContext.Provider>
  );
}

export function useLikedTracks(): LikedTracksState {
  const ctx = useContext(LikedTracksContext);
  if (!ctx) throw new Error('useLikedTracks must be used within LikedTracksProvider');
  return ctx;
}
