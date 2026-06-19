'use client';
import React from 'react';

type Variant = 'solid' | 'invert' | 'accent' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';
type Shape = 'pill' | 'rounded';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  shape?: Shape;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
}

const sizes: Record<Size, React.CSSProperties> = {
  sm: { fontSize: 'var(--text-base)', padding: '8px 16px', gap: 8 },
  md: { fontSize: 'var(--text-lg)',   padding: '10px 22px', gap: 10 },
  lg: { fontSize: 'var(--text-h)',    padding: '12px 28px', gap: 12 },
};

const variants: Record<Variant, React.CSSProperties> = {
  solid:   { background: 'var(--black)',      color: 'var(--white)',       border: '1px solid var(--black)' },
  invert:  { background: 'var(--white)',      color: 'var(--black)',       border: '1px solid var(--white)' },
  accent:  { background: 'var(--accent)',     color: 'var(--white)',       border: '1px solid var(--accent)' },
  outline: { background: 'transparent',       color: 'var(--text-strong)', border: '1px solid var(--border-hairline)' },
  ghost:   { background: 'transparent',       color: 'var(--text-strong)', border: '1px solid transparent' },
};

export function Button({
  children,
  variant = 'solid',
  size = 'md',
  shape = 'pill',
  iconRight,
  iconLeft,
  disabled = false,
  style,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: 'var(--weight-regular)',
        letterSpacing: 'var(--track-display)',
        lineHeight: 1,
        borderRadius: shape === 'pill' ? 'var(--radius-pill)' : 'var(--radius-xs)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        whiteSpace: 'nowrap',
        transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out)',
        ...sizes[size],
        ...variants[variant],
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'scale(0.96)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = ''; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
