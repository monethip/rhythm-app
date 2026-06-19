'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlayButton } from '@/shared/ui/play-button';
import { StarBurst } from '@/shared/ui/star-burst';
import { Button } from '@/shared/ui/button';
import { usePlayer } from '@/features/play-track';
import type { Album } from '@/entities/album';
import { TRACKS } from '@/entities/track';
import styles from './AlbumGrid.module.css';

interface AlbumGridProps {
  albums: Album[];
  title?: string;
  tag?: string;
  showCta?: boolean;
}

function AlbumCard({ album }: { album: Album }) {
  const { play, currentTrack, isPlaying } = usePlayer();
  const [hover, setHover] = React.useState(false);
  const albumTracks = TRACKS.filter((t) => t.albumId === album.id);
  const isActive = currentTrack?.albumId === album.id;

  function handlePlay(e: React.MouseEvent) {
    e.preventDefault();
    const first = albumTracks[0];
    if (first) play(first, albumTracks);
  }

  return (
    <Link href={`/album/${album.id}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ cursor: 'pointer' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '1' }}>
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            background: 'var(--gray-200)',
            boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
            transition: 'box-shadow var(--dur-base) var(--ease-out)',
          }}>
            <Image src={album.cover} alt={album.title} fill style={{ objectFit: 'cover' }} sizes="(max-width:640px) 50vw, 220px" />
          </div>

          {isActive && (
            <div style={{
              position: 'absolute', inset: 0,
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--accent)', pointerEvents: 'none',
            }} />
          )}

          <div style={{
            position: 'absolute', right: '5%', bottom: '5%',
            opacity: hover ? 1 : 0,
            transform: hover ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
            pointerEvents: hover ? 'auto' : 'none',
          }}>
            <PlayButton size={56} playing={isActive && isPlaying} onClick={handlePlay} />
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <div style={{
            fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-semibold)',
            fontSize: 'var(--text-base)',
            color: isActive ? 'var(--accent)' : 'var(--text-strong)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {album.title}
          </div>
          <div style={{
            fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 2,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {album.artist} · {album.year}
          </div>
        </div>
      </div>
    </Link>
  );
}

function CtaCard() {
  return (
    <Link href="/browse" style={{ textDecoration: 'none' }}>
      <div style={{
        borderRadius: 'var(--radius-lg)', background: 'var(--accent)',
        padding: 28, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', aspectRatio: '1',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -20, top: -20, opacity: 0.25 }}>
          <StarBurst size={160} spin duration={20} color="var(--white)" inner={false} />
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2vw, 26px)',
          fontWeight: 'var(--weight-regular)', letterSpacing: 'var(--track-display)',
          color: 'var(--white)', lineHeight: 1.15, margin: 0, position: 'relative', zIndex: 1,
        }}>
          Explore the album to matching your style
        </h3>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <svg width={36} height={36} viewBox="0 0 36 36" fill="none">
            <path d="M8 28 L28 8 M16 8 L28 8 L28 20" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <Button variant="invert" size="sm" style={{ background: 'var(--white)', color: 'var(--black)', border: 'none' }}>
            Explore →
          </Button>
        </div>
      </div>
    </Link>
  );
}

export function AlbumGrid({ albums, title, tag, showCta = false }: AlbumGridProps) {
  return (
    <section className={styles.section}>
      {(title || tag) && (
        <div style={{ marginBottom: 24 }}>
          {tag && (
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
              letterSpacing: '0.1em', textTransform: 'uppercase' as const,
              color: 'var(--text-faint)', marginBottom: 6,
            }}>
              {tag}
            </div>
          )}
          {title && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: 'var(--text-title)',
                fontWeight: 'var(--weight-regular)', letterSpacing: 'var(--track-display)',
                color: 'var(--text-strong)', margin: 0,
              }}>
                {title}
              </h2>
              <Link href="/browse" style={{
                fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)',
                color: 'var(--text-muted)', textDecoration: 'none',
              }}>
                See all →
              </Link>
            </div>
          )}
        </div>
      )}

      <div className={styles.grid}>
        {albums.map((album) => <AlbumCard key={album.id} album={album} />)}
        {showCta && <CtaCard />}
      </div>
    </section>
  );
}
