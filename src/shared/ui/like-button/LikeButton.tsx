'use client';
import React from 'react';

const HEART_PATH =
  'M 8 2.625 C 8 2.625 8 2.625 8.676 1.75 C 9.458 0.735 10.613 0 12 0 C 14.213 0 16 1.759 16 3.938 C 16 4.751 15.751 5.504 15.324 6.125 C 14.604 7.184 8 14 8 14 C 8 14 1.396 7.184 0.676 6.125 C 0.249 5.504 0 4.751 0 3.938 C 0 1.759 1.787 0 4 0 C 5.387 0 6.551 0.735 7.324 1.75 C 8 2.625 8 2.625 8 2.625 Z';

interface LikeButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  liked?: boolean;
  onChange?: (liked: boolean) => void;
  size?: number;
}

export function LikeButton({ liked = false, onChange, size = 24, style, ...rest }: LikeButtonProps) {
  const [on, setOn] = React.useState(liked);
  React.useEffect(() => setOn(liked), [liked]);

  const toggle = () => {
    const next = !on;
    setOn(next);
    onChange?.(next);
  };

  return (
    <button
      aria-pressed={on}
      aria-label={on ? 'Remove from Liked' : 'Add to Liked'}
      onClick={toggle}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        padding: 0,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        color: on ? 'var(--like-active)' : 'var(--ink-900)',
        transition: 'transform var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.12)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
      {...rest}
    >
      <svg width={size * 0.67} height={size * 0.58} viewBox="0 0 16 14" fill="none">
        <path
          d={HEART_PATH}
          fill={on ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={on ? 0 : 1.5}
        />
      </svg>
    </button>
  );
}
