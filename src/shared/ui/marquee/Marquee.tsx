'use client';
import React from 'react';

interface MarqueeProps {
  items?: string[];
  speed?: string;
  separator?: string;
  color?: string;
  fontSize?: string;
  style?: React.CSSProperties;
}

export function Marquee({
  items = ['aespa', 'Taylor Swift', 'Ive', 'Cortis', 'Doja Cat', 'NCT', 'Ateez', 'NMIXX', 'Joji', 'Stray Kids'],
  speed = 'var(--dur-marquee)',
  separator = '✦',
  color = 'var(--gray-500)',
  fontSize = 'var(--text-title)',
  style,
}: MarqueeProps) {
  const id = React.useId().replace(/:/g, '');

  const run = items.map((it, i) => (
    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8em', paddingInline: '0.8em' }}>
      <span>{it}</span>
      <span style={{ color: 'var(--accent)', fontSize: '0.6em' }}>{separator}</span>
    </span>
  ));

  return (
    <div
      style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', ...style }}
      onMouseEnter={(e) => {
        const t = e.currentTarget.querySelector<HTMLElement>('div');
        if (t) t.style.animationPlayState = 'paused';
      }}
      onMouseLeave={(e) => {
        const t = e.currentTarget.querySelector<HTMLElement>('div');
        if (t) t.style.animationPlayState = 'running';
      }}
    >
      <style>{`@keyframes rhythm-marq-${id}{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          fontFamily: 'var(--font-display)',
          fontSize,
          color,
          animation: `rhythm-marq-${id} ${speed} linear infinite`,
          willChange: 'transform',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>{run}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center' }} aria-hidden="true">{run}</span>
      </div>
    </div>
  );
}
