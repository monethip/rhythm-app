'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { Tag } from '@/shared/ui/tag';
import { TrackList } from '@/widgets/track-list';
import { ALBUMS } from '@/entities/album';
import { TRACKS } from '@/entities/track';
import { usePlayer } from '@/features/play-track';
import styles from './AlbumPage.module.css';

interface AlbumPageProps {
  albumId: string;
}

export function AlbumPage({ albumId }: AlbumPageProps) {
  const album = ALBUMS.find((a) => a.id === albumId);
  const { play, currentTrack, isPlaying, toggle } = usePlayer();

  if (!album) {
    return (
      <main style={{ padding: 'var(--space-10)', textAlign: 'center', color: 'var(--text-muted)' }}>
        Album not found.
      </main>
    );
  }

  const tracks = TRACKS.filter((t) => t.albumId === album.id);
  const isActiveAlbum = currentTrack?.albumId === album.id;

  function handlePlay() {
    if (isActiveAlbum) toggle();
    else if (tracks[0]) play(tracks[0], tracks);
  }

  return (
    <main style={{ paddingBottom: 80 }}>
      {/* Album header */}
      <div className={styles.header}>
        <div className={styles.coverWrap} style={{
          borderRadius: 'var(--radius-lg)', overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)', position: 'relative',
        }}>
          <Image src={album.cover} alt={album.title} fill style={{ objectFit: 'cover' }} sizes="(max-width:640px) 80vw, 220px" />
        </div>

        <div>
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
          }}>
            {album.artist} · {album.year} · {tracks.length} songs
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Button variant={isActiveAlbum && isPlaying ? 'outline' : 'solid'} size="lg" onClick={handlePlay}>
              {isActiveAlbum && isPlaying ? '⏸ Pause' : '▶ Play'}
            </Button>
            <Tag variant="light">{album.genre}</Tag>
          </div>
        </div>
      </div>

      <div className={styles.trackSection}>
        <TrackList tracks={tracks} />
      </div>
    </main>
  );
}
