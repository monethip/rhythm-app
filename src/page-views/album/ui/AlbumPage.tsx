'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { Tag } from '@/shared/ui/tag';
import { TrackList } from '@/widgets/track-list';
import { usePlayer } from '@/features/play-track';
import { useSpotifyAlbum } from '@/features/spotify-auth';
import styles from './AlbumPage.module.css';

interface AlbumPageProps {
  albumId: string;
}

function SpotifySourceBadge() {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: '#1db954', color: 'white',
      fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
      letterSpacing: '0.06em', textTransform: 'uppercase',
      padding: '3px 9px', borderRadius: 'var(--radius-pill)',
      marginBottom: 10,
    }}>
      <svg width={10} height={10} viewBox="0 0 24 24" fill="white">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.314a.748.748 0 0 1-1.029.249c-2.815-1.72-6.358-2.11-10.528-1.155a.748.748 0 0 1-.332-1.459c4.565-1.042 8.483-.593 11.641 1.336a.748.748 0 0 1 .248 1.029zm1.472-3.275a.936.936 0 0 1-1.287.308c-3.222-1.98-8.133-2.554-11.944-1.397a.936.936 0 1 1-.543-1.79c4.354-1.322 9.763-.681 13.466 1.592a.935.935 0 0 1 .308 1.287zm.127-3.408c-3.863-2.295-10.234-2.506-13.92-1.386a1.122 1.122 0 1 1-.651-2.148c4.232-1.285 11.267-1.037 15.708 1.603a1.122 1.122 0 1 1-1.137 1.931z" />
      </svg>
      Live from Spotify
    </div>
  );
}

export function AlbumPage({ albumId }: AlbumPageProps) {
  const { album, tracks, status, error, source } = useSpotifyAlbum(albumId);
  const { play, currentTrack, isPlaying, toggle } = usePlayer();

  if (!album) {
    return (
      <main style={{ padding: 'var(--space-10)', textAlign: 'center', color: 'var(--text-muted)' }}>
        Album not found.
      </main>
    );
  }

  const isActiveAlbum = currentTrack?.albumId === album.id;

  function handlePlay() {
    if (isActiveAlbum) toggle();
    else if (tracks[0]) play(tracks[0], tracks);
  }

  const isLoading = status === 'loading';

  return (
    <main style={{ paddingBottom: 80 }}>
      {/* Album header */}
      <div className={styles.header}>
        <div className={styles.coverWrap} style={{
          borderRadius: 'var(--radius-lg)', overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)', position: 'relative',
        }}>
          {/* Use <img> for Spotify CDN URLs (external domain), Next Image for local paths */}
          {album.cover.startsWith('http') ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={album.cover}
              alt={album.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <Image
              src={album.cover}
              alt={album.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width:640px) 80vw, 220px"
            />
          )}
        </div>

        <div>
          {source === 'spotify' && <SpotifySourceBadge />}

          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
            letterSpacing: '0.08em', textTransform: 'uppercase' as const,
            color: 'var(--text-faint)', marginBottom: 8,
          }}>
            ALBUM
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(var(--text-display), 5vw, var(--text-hero))',
            fontWeight: 'var(--weight-regular)', letterSpacing: 'var(--track-display)',
            color: 'var(--text-strong)', lineHeight: 1, margin: '0 0 12px',
          }}>
            {album.title}
          </h1>

          <div style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-lg)',
            color: 'var(--text-muted)', marginBottom: 24,
            display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' as const,
          }}>
            {album.artist} · {album.year} ·{' '}
            {isLoading ? (
              <span style={{
                display: 'inline-block', width: 60, height: 14,
                background: 'var(--gray-200)', borderRadius: 4,
                verticalAlign: 'middle', animation: 'pulse 1.2s ease-in-out infinite',
              }} />
            ) : (
              `${tracks.length} songs`
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' as const }}>
            <Button variant={isActiveAlbum && isPlaying ? 'outline' : 'solid'} size="lg" onClick={handlePlay} disabled={isLoading}>
              {isActiveAlbum && isPlaying ? '⏸ Pause' : '▶ Play'}
            </Button>
            <Tag variant="light">{album.genre}</Tag>
          </div>

          {error && (
            <p style={{
              marginTop: 12, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
              color: 'var(--text-muted)',
            }}>
              Could not load Spotify data — showing local tracks.
            </p>
          )}
        </div>
      </div>

      <div className={styles.trackSection}>
        {isLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 16px' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{
                height: 52, borderRadius: 'var(--radius-sm)',
                background: 'var(--gray-100)',
                animation: 'pulse 1.2s ease-in-out infinite',
                animationDelay: `${i * 0.07}s`,
              }} />
            ))}
            <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
          </div>
        ) : (
          <TrackList tracks={tracks} />
        )}
      </div>
    </main>
  );
}
