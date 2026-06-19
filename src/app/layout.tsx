import type { Metadata, Viewport } from 'next';
import '@/shared/styles/globals.css';
import { Header } from '@/widgets/header';
import { PlayerBar } from '@/widgets/player-bar';
import { PlayerProvider } from '@/features/play-track';
import { LikedTracksProvider } from '@/features/like-track';
import { SpotifyAuthProvider } from '@/features/spotify-auth';

export const metadata: Metadata = {
  title: 'Rhythm — Find your rhythm',
  description: 'Millions of tracks, no shuffle of the same five — just music that feels like you.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SpotifyAuthProvider>
          <PlayerProvider>
            <LikedTracksProvider>
              <Header />
              {children}
              <PlayerBar />
            </LikedTracksProvider>
          </PlayerProvider>
        </SpotifyAuthProvider>
      </body>
    </html>
  );
}
