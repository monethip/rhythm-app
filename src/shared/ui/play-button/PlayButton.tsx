'use client';
import React from 'react';

const PLAY_PATH =
  'M 2.201 0.193 L 27.248 14.676 C 27.476 14.809 27.666 15.001 27.798 15.233 C 27.93 15.466 28 15.73 28 15.999 C 28 16.268 27.93 16.533 27.798 16.765 C 27.666 16.997 27.476 17.189 27.248 17.322 L 2.201 31.805 C 1.976 31.935 1.722 32.002 1.464 32 C 1.206 31.998 0.953 31.926 0.731 31.792 C 0.508 31.658 0.323 31.466 0.195 31.236 C 0.067 31.006 0 30.746 0 30.481 L 0 1.517 C 0 1.252 0.068 0.992 0.196 0.762 C 0.324 0.533 0.509 0.341 0.731 0.208 C 0.954 0.074 1.207 0.002 1.464 0 C 1.722 -0.002 1.976 0.063 2.201 0.193 Z';

function PauseIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="7" y="6" width="6" height="20" rx="1.5" fill="currentColor" />
      <rect x="19" y="6" width="6" height="20" rx="1.5" fill="currentColor" />
    </svg>
  );
}

type PlayVariant = 'light' | 'dark' | 'accent';

interface PlayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  playing?: boolean;
  size?: number;
  variant?: PlayVariant;
}

const variants: Record<PlayVariant, React.CSSProperties> = {
  light:  { background: 'var(--white)', color: 'var(--black)' },
  dark:   { background: 'var(--black)', color: 'var(--white)' },
  accent: { background: 'var(--accent)', color: 'var(--white)' },
};

export function PlayButton({ playing = false, size = 72, variant = 'light', style, ...rest }: PlayButtonProps) {
  const glyph = size * 0.42;
  return (
    <button
      aria-label={playing ? 'Pause' : 'Play'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: 'var(--radius-pill)',
        border: 'none',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-play)',
        transition: 'transform var(--dur-base) var(--ease-out)',
        ...variants[variant],
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
      {...rest}
    >
      {playing ? (
        <PauseIcon size={glyph} />
      ) : (
        <svg width={glyph * 0.875} height={glyph} viewBox="0 0 28 32" fill="none" style={{ marginLeft: size * 0.04 }}>
          <path d={PLAY_PATH} fill="currentColor" />
        </svg>
      )}
    </button>
  );
}
