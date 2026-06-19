'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { LikeButton } from '@/shared/ui/like-button';
import { usePlayer } from '@/features/play-track';
import { useLikedTracks } from '@/features/like-track';
import type { Track } from '@/entities/track';

const PLAY_PATH =
  'M 2.201 0.193 L 27.248 14.676 C 27.476 14.809 27.666 15.001 27.798 15.233 C 27.93 15.466 28 15.73 28 15.999 C 28 16.268 27.93 16.533 27.798 16.765 C 27.666 16.997 27.476 17.189 27.248 17.322 L 2.201 31.805 C 1.976 31.935 1.722 32.002 1.464 32 C 1.206 31.998 0.953 31.926 0.731 31.792 C 0.508 31.658 0.323 31.466 0.195 31.236 C 0.067 31.006 0 30.746 0 30.481 L 0 1.517 C 0 1.252 0.068 0.992 0.196 0.762 C 0.324 0.533 0.509 0.341 0.731 0.208 C 0.954 0.074 1.207 0.002 1.464 0 C 1.722 -0.002 1.976 0.063 2.201 0.193 Z';

const COLS = '44px minmax(180px, 2fr) minmax(120px, 1fr) minmax(140px, 1.4fr) 72px 48px';

interface TrackListProps {
  tracks: Track[];
  showHeader?: boolean;
  style?: React.CSSProperties;
}

function TrackRow({ track, index, tracks }: { track: Track; index: number; tracks: Track[] }) {
  const { currentTrack, isPlaying, play, toggle } = usePlayer();
  const { isLiked, toggle: toggleLike } = useLikedTracks();
  const [hover, setHover] = React.useState(false);
  const isActive = currentTrack?.id === track.id;
  const liked = isLiked(track.id);

  function handleClick() {
    if (isActive) {
      toggle();
    } else {
      play(track, tracks);
    }
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      style={{
        display: 'grid',
        gridTemplateColumns: COLS,
        gap: '0 16px',
        alignItems: 'center',
        padding: '12px 16px',
        borderRadius: 'var(--radius-sm)',
        background: hover ? 'var(--surface-hover)' : 'transparent',
        transition: 'background var(--dur-fast) var(--ease-out)',
        cursor: 'pointer',
      }}
    >
      {/* Index / play glyph */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        {hover ? (
          <svg width={14} height={16} viewBox="0 0 28 32" fill="none" style={{ color: isActive ? 'var(--accent)' : 'var(--text-strong)' }}>
            <path d={PLAY_PATH} fill="currentColor" />
          </svg>
        ) : (
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            color: isActive ? 'var(--accent)' : 'var(--text-muted)',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {index + 1}
          </span>
        )}
      </div>

      {/* Title + artist */}
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-lg)',
          color: isActive ? 'var(--accent)' : 'var(--text-strong)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {track.title}
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'var(--text-muted)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {track.artist}
        </div>
      </div>

      {/* Plays */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-lg)',
        fontVariantNumeric: 'tabular-nums',
        minWidth: 0,
      }}>
        {track.plays}
      </div>

      {/* Album */}
      <div style={{
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-lg)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {track.album}
      </div>

      {/* Duration */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-lg)',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {track.duration}
      </div>

      {/* Like */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LikeButton
          liked={liked}
          onChange={() => toggleLike(track.id)}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}

export function TrackList({ tracks, showHeader = true, style }: TrackListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!listRef.current) return;
      gsap.from(Array.from(listRef.current.children), {
        opacity: 0,
        y: 16,
        duration: 0.4,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 90%',
        },
      });
    });
    return () => ctx.revert();
  }, [tracks]);

  return (
    <div style={{ width: '100%', ...style }}>
      {showHeader && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: COLS,
          gap: '0 16px',
          padding: '0 16px 10px',
          borderBottom: '1px solid var(--border-faint)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
          color: 'var(--text-faint)',
        }}>
          <div style={{ textAlign: 'center' }}>#</div>
          <div>Title</div>
          <div>Plays</div>
          <div>Album</div>
          <div style={{ textAlign: 'center' }}>Time</div>
          <div />
        </div>
      )}
      <div ref={listRef} style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {tracks.map((track, i) => (
          <TrackRow key={track.id} track={track} index={i} tracks={tracks} />
        ))}
      </div>
    </div>
  );
}
