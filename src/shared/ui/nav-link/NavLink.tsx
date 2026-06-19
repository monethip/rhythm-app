'use client';
import React from 'react';
import Link from 'next/link';

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  active?: boolean;
  onDark?: boolean;
  style?: React.CSSProperties;
}

export function NavLink({ children, href, active = false, onDark = false, style }: NavLinkProps) {
  const [hover, setHover] = React.useState(false);
  const base = onDark ? 'var(--text-on-dark)' : 'var(--text-strong)';
  const color = active
    ? 'var(--accent)'
    : hover
    ? onDark ? 'var(--white)' : 'var(--ink-700)'
    : base;

  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-lg)',
        letterSpacing: '0.01em',
        lineHeight: 1,
        color,
        opacity: onDark && !active && !hover ? 0.7 : 1,
        transition: 'color var(--dur-fast) var(--ease-out), opacity var(--dur-fast) var(--ease-out)',
        ...style,
      }}
    >
      {children}
      <span
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: -6,
          height: 2,
          background: 'var(--accent)',
          borderRadius: 2,
          transform: `scaleX(${active ? 1 : 0})`,
          transformOrigin: 'left',
          transition: 'transform var(--dur-base) var(--ease-out)',
        }}
      />
    </Link>
  );
}
