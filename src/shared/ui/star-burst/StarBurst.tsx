'use client';
import React from 'react';

const STAR16 = 'M 135.5 0 L 151.523 96.818 L 231.313 39.687 L 174.182 119.477 L 271 135.5 L 174.182 151.523 L 231.313 231.313 L 151.523 174.182 L 135.5 271 L 119.477 174.182 L 39.687 231.313 L 96.818 151.523 L 0 135.5 L 96.818 119.477 L 39.687 39.687 L 119.477 96.818 L 135.5 0 Z';
const STAR_INNER = 'M 135.5 18 L 147.27 89.13 L 205.86 47.14 L 163.87 105.73 L 235 117.5 L 163.87 129.27 L 205.86 187.86 L 147.27 145.87 L 135.5 217 L 123.73 145.87 L 65.14 187.86 L 107.13 129.27 L 36 117.5 L 107.13 105.73 L 65.14 47.14 L 123.73 89.13 L 135.5 18 Z';

interface StarBurstProps {
  size?: number;
  spin?: boolean;
  duration?: number;
  inner?: boolean;
  color?: string;
  style?: React.CSSProperties;
}

export function StarBurst({
  size = 120,
  spin = true,
  duration = 14,
  inner = true,
  color = 'var(--orange-500)',
  style,
}: StarBurstProps) {
  const id = React.useId().replace(/:/g, '');
  return (
    <div style={{ width: size, height: size, display: 'inline-block', ...style }}>
      <style>{`@keyframes rhythm-spin-${id}{to{transform:rotate(360deg)}}`}</style>
      <svg
        width={size}
        height={size}
        viewBox="0 0 271 271"
        fill="none"
        style={{
          display: 'block',
          animation: spin ? `rhythm-spin-${id} ${duration}s linear infinite` : 'none',
          transformOrigin: '50% 50%',
        }}
      >
        <path d={STAR16} fill={color} />
        {inner && <path d={STAR_INNER} fill="var(--white)" />}
      </svg>
    </div>
  );
}
