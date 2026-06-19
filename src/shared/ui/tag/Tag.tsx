'use client';
import React from 'react';

type TagVariant = 'light' | 'dark' | 'accent' | 'outline';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
}

const variants: Record<TagVariant, React.CSSProperties> = {
  light:   { background: 'var(--gray-100)',   color: 'var(--text-strong)', border: '1px solid transparent' },
  dark:    { background: 'var(--black)',       color: 'var(--white)',       border: '1px solid var(--black)' },
  accent:  { background: 'var(--orange-100)', color: 'var(--orange-600)',  border: '1px solid transparent' },
  outline: { background: 'transparent',       color: 'var(--text-body)',   border: '1px solid var(--border-hairline)' },
};

export function Tag({ children, variant = 'light', style, ...rest }: TagProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-base)',
        letterSpacing: 'var(--track-display)',
        lineHeight: 1,
        padding: '6px 14px',
        borderRadius: 'var(--radius-xs)',
        whiteSpace: 'nowrap',
        ...variants[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
