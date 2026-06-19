'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface SpotifyToken {
  accessToken: string;
  expiresAt: number;
}

interface SpotifyAuthContextValue {
  token: SpotifyToken | null;
  isConnected: boolean;
  setToken: (token: SpotifyToken) => void;
  disconnect: () => void;
}

const SpotifyAuthContext = createContext<SpotifyAuthContextValue | null>(null);

export function SpotifyAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<SpotifyToken | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('spotify_token');
      if (!raw) return;
      const parsed = JSON.parse(raw) as SpotifyToken;
      if (parsed.expiresAt > Date.now()) setTokenState(parsed);
      else localStorage.removeItem('spotify_token');
    } catch {
      localStorage.removeItem('spotify_token');
    }
  }, []);

  function setToken(t: SpotifyToken) {
    localStorage.setItem('spotify_token', JSON.stringify(t));
    setTokenState(t);
  }

  function disconnect() {
    localStorage.removeItem('spotify_token');
    setTokenState(null);
  }

  return (
    <SpotifyAuthContext.Provider value={{ token, isConnected: !!token, setToken, disconnect }}>
      {children}
    </SpotifyAuthContext.Provider>
  );
}

export function useSpotifyAuth() {
  const ctx = useContext(SpotifyAuthContext);
  if (!ctx) throw new Error('useSpotifyAuth must be used within SpotifyAuthProvider');
  return ctx;
}
