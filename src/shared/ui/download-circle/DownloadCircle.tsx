'use client';
import React from 'react';

interface DownloadCircleProps {
  progress?: number | null;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  style?: React.CSSProperties;
}

export function DownloadCircle({
  progress = null,
  size = 120,
  stroke = 4,
  color = 'var(--black)',
  track = 'var(--gray-200)',
  style,
}: DownloadCircleProps) {
  const id = React.useId().replace(/:/g, '');
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const indeterminate = progress == null;
  const offset = indeterminate ? c * 0.25 : c * (1 - Math.max(0, Math.min(1, progress)));

  return (
    <div style={{ width: size, height: size, position: 'relative', color, ...style }}>
      <style>{`@keyframes rhythm-ring-${id}{to{transform:rotate(360deg)}}`}</style>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          transform: 'rotate(-90deg)',
          animation: indeterminate ? `rhythm-ring-${id} 1.1s linear infinite` : 'none',
          transformOrigin: '50% 50%',
        }}
      >
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: indeterminate ? 'none' : 'stroke-dashoffset var(--dur-base) var(--ease-out)' }}
        />
      </svg>
      <svg
        width={size * 0.3}
        height={size * 0.3}
        viewBox="0 0 24 24"
        fill="none"
        style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}
      >
        <path d="M12 3v13M12 16l-5-5M12 16l5-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
