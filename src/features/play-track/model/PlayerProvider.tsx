'use client';
import React, { createContext, useContext, useState } from 'react';
import type { Track } from '@/entities/track';

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  play: (track: Track, queue?: Track[]) => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
}

const PlayerContext = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Track[]>([]);

  function play(track: Track, newQueue?: Track[]) {
    setCurrentTrack(track);
    setIsPlaying(true);
    if (newQueue) setQueue(newQueue);
  }

  function pause() {
    setIsPlaying(false);
  }

  function toggle() {
    setIsPlaying((p) => !p);
  }

  function next() {
    if (!currentTrack || queue.length === 0) return;
    const idx = queue.findIndex((t) => t.id === currentTrack.id);
    const nextTrack = queue[(idx + 1) % queue.length];
    if (nextTrack) setCurrentTrack(nextTrack);
  }

  function prev() {
    if (!currentTrack || queue.length === 0) return;
    const idx = queue.findIndex((t) => t.id === currentTrack.id);
    const prevTrack = queue[(idx - 1 + queue.length) % queue.length];
    if (prevTrack) setCurrentTrack(prevTrack);
  }

  return (
    <PlayerContext.Provider value={{ currentTrack, isPlaying, queue, play, pause, toggle, next, prev }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer(): PlayerState {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
}
