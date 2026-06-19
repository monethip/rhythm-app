'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { exchangeCodeForToken, useSpotifyAuth } from '@/features/spotify-auth';

export function CallbackHandler() {
  const params = useSearchParams();
  const router = useRouter();
  const { setToken } = useSpotifyAuth();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const code = params.get('code');
    const error = params.get('error');

    if (error || !code) {
      router.replace('/');
      return;
    }

    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? '';
    const redirectUri = `${window.location.origin}/callback`;

    exchangeCodeForToken(code, clientId, redirectUri)
      .then((data) => {
        setToken({
          accessToken: data.access_token,
          expiresAt: Date.now() + data.expires_in * 1000,
        });
        router.replace('/');
      })
      .catch(() => router.replace('/'));
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh',
      gap: 16,
      fontFamily: 'var(--font-display)',
      color: 'var(--text-muted)',
    }}>
      <div style={{
        width: 36, height: 36,
        border: '3px solid var(--gray-200)',
        borderTopColor: '#1db954',
        borderRadius: '50%',
        animation: 'spin 0.75s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      Connecting to Spotify…
    </div>
  );
}
