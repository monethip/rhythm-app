'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { PlayButton } from '@/shared/ui/play-button';
import { LikeButton } from '@/shared/ui/like-button';
import { usePlayer } from '@/features/play-track';
import { useLikedTracks } from '@/features/like-track';
import { ALBUMS } from '@/entities/album';
import styles from './PlayerBar.module.css';

export function PlayerBar() {
  const { currentTrack, isPlaying, toggle, next, prev } = usePlayer();
  const { isLiked, toggle: toggleLike } = useLikedTracks();
  const [progress, setProgress] = React.useState(0.3);
  const barRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  React.useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(() => setProgress((p) => (p >= 1 ? 0 : p + 0.001)), 300);
    return () => clearInterval(t);
  }, [isPlaying]);

  useEffect(() => {
    if (!barRef.current || hasAnimated.current) return;
    hasAnimated.current = true;
    gsap.from(barRef.current, { y: 80, duration: 0.45, ease: 'power2.out' });
  }, [currentTrack]);

  if (!currentTrack) return null;

  const album = ALBUMS.find((a) => a.id === currentTrack.albumId);
  const liked = isLiked(currentTrack.id);

  const SkipIcon = ({ flip }: { flip?: boolean }) => (
    <svg
      width={20} height={20} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
    >
      <polygon points="5 4 15 12 5 20 5 4" />
      <line x1="19" y1="5" x2="19" y2="19" />
    </svg>
  );

  return (
    <div
      ref={barRef}
      className={styles.root}
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: 80,
        background: 'var(--black)', color: 'var(--white)', zIndex: 200,
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Track info */}
      <div className={styles.trackInfo}>
        {album && (
          <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
            <Image src={album.cover} alt={album.title} fill style={{ objectFit: 'cover' }} sizes="48px" />
          </div>
        )}
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)',
            color: 'var(--white)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {currentTrack.title}
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
            {currentTrack.artist}
          </div>
        </div>
        <LikeButton
          liked={liked}
          onChange={() => toggleLike(currentTrack.id)}
          size={20}
          style={{ color: liked ? 'var(--like-active)' : 'rgba(255,255,255,0.5)', flexShrink: 0 }}
        />
      </div>

      {/* Transport */}
      <div className={styles.transport}>
        <div className={styles.transportButtons}>
          <button
            className={styles.prevNext}
            onClick={prev}
            aria-label="Previous"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', padding: 0 }}
          >
            <SkipIcon flip />
          </button>
          <PlayButton playing={isPlaying} onClick={toggle} size={44} variant="light" />
          <button
            className={styles.prevNext}
            onClick={next}
            aria-label="Next"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', padding: 0 }}
          >
            <SkipIcon />
          </button>
        </div>

        <div
          className={styles.progress}
          style={{ height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setProgress((e.clientX - rect.left) / rect.width);
          }}
        >
          <div style={{
            height: '100%', width: `${progress * 100}%`,
            background: 'var(--white)', borderRadius: 2, transition: 'width 0.3s linear',
          }} />
        </div>
      </div>

      {/* Volume */}
      <div className={styles.volume}>
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
        <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
          <div style={{ height: '100%', width: '70%', background: 'rgba(255,255,255,0.6)', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}
