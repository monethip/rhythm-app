'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { LikeButton } from '@/shared/ui/like-button';
import { usePlayer } from '@/features/play-track';
import { useLikedTracks } from '@/features/like-track';
import { TRACKS } from '@/entities/track';
import styles from './TopSongs.module.css';

const PLAY_PATH =
  'M 2.201 0.193 L 27.248 14.676 C 27.476 14.809 27.666 15.001 27.798 15.233 C 27.93 15.466 28 15.73 28 15.999 C 28 16.268 27.93 16.533 27.798 16.765 C 27.666 16.997 27.476 17.189 27.248 17.322 L 2.201 31.805 C 1.976 31.935 1.722 32.002 1.464 32 C 1.206 31.998 0.953 31.926 0.731 31.792 C 0.508 31.658 0.323 31.466 0.195 31.236 C 0.067 31.006 0 30.746 0 30.481 L 0 1.517 C 0 1.252 0.068 0.992 0.196 0.762 C 0.324 0.533 0.509 0.341 0.731 0.208 C 0.954 0.074 1.207 0.002 1.464 0 C 1.722 -0.002 1.976 0.063 2.201 0.193 Z';

const TOP_5_IDS = ['lov-1', 'rep-6', 'ttp-1', 'lov-3', 'rep-2'];

function TopRow({ trackId, index }: { trackId: string; index: number }) {
  const track = TRACKS.find((t) => t.id === trackId)!;
  const { currentTrack, isPlaying, play, toggle } = usePlayer();
  const { isLiked, toggle: toggleLike } = useLikedTracks();
  const [hover, setHover] = React.useState(false);
  const isActive = currentTrack?.id === track.id;
  const liked = isLiked(track.id);
  const allTop = TOP_5_IDS.map((id) => TRACKS.find((t) => t.id === id)!);

  function handleClick() {
    if (isActive) toggle();
    else play(track, allTop);
  }

  return (
    <div
      className={styles.row}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      style={{
        padding: '14px 0',
        borderBottom: '1px solid var(--border-faint)',
        cursor: 'pointer',
        background: hover ? 'var(--gray-50)' : 'transparent',
        borderRadius: 'var(--radius-sm)',
        transition: 'background var(--dur-fast) var(--ease-out)',
      }}
    >
      {/* Index */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {hover ? (
          <svg width={12} height={14} viewBox="0 0 28 32" fill="none" style={{ color: isActive ? 'var(--accent)' : 'var(--text-strong)' }}>
            <path d={PLAY_PATH} fill="currentColor" />
          </svg>
        ) : (
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)',
            fontWeight: 'var(--weight-semibold)',
            color: isActive ? 'var(--accent)' : 'var(--gray-300)',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Title + artist */}
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)',
          fontWeight: 'var(--weight-semibold)',
          color: isActive ? 'var(--accent)' : 'var(--text-strong)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {track.title}
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 2 }}>
          {track.artist}
        </div>
      </div>

      {/* Album (hidden on tablet) */}
      <div className={styles.albumCell} style={{
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {track.album}
      </div>

      {/* Plays (hidden on mobile) */}
      <div className={styles.playsCell} style={{
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
        color: 'var(--text-faint)', fontVariantNumeric: 'tabular-nums',
      }}>
        {track.plays}
      </div>

      {/* Duration */}
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)',
        color: 'var(--text-faint)', fontVariantNumeric: 'tabular-nums', textAlign: 'center',
      }}>
        {track.duration}
      </div>

      {/* Like */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LikeButton
          liked={liked}
          onChange={() => toggleLike(track.id)}
          onClick={(e) => e.stopPropagation()}
          size={20}
        />
      </div>
    </div>
  );
}

export function TopSongs() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!listRef.current) return;
      gsap.from(Array.from(listRef.current.children), {
        opacity: 0,
        x: -24,
        duration: 0.45,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 85%',
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-title)',
          fontWeight: 'var(--weight-regular)', letterSpacing: 'var(--track-display)',
          color: 'var(--text-strong)', margin: 0,
        }}>
          5 Top Song
        </h2>
        <Link href="/browse" style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)',
          color: 'var(--text-muted)', textDecoration: 'none',
        }}>
          See all →
        </Link>
      </div>

      {/* Table header */}
      <div
        className={styles.headerRow}
        style={{
          padding: '0 0 10px',
          borderBottom: '1px solid var(--border-faint)',
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
          letterSpacing: '0.08em', textTransform: 'uppercase' as const,
          color: 'var(--text-faint)',
        }}
      >
        <div style={{ textAlign: 'center' }}>#</div>
        <div>Song</div>
        <div className={styles.albumCell}>Album</div>
        <div className={styles.playsCell}>Plays</div>
        <div style={{ textAlign: 'center' }}>Time</div>
        <div />
      </div>

      <div ref={listRef}>
        {TOP_5_IDS.map((id, i) => (
          <TopRow key={id} trackId={id} index={i} />
        ))}
      </div>
    </section>
  );
}
