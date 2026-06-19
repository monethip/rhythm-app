'use client';
import React from 'react';

interface TextRollerProps {
  phrases?: string[];
  interval?: number;
  fontSize?: string;
  color?: string;
  style?: React.CSSProperties;
}

export function TextRoller({
  phrases = [
    'Explore the album to match your style',
    'A lot of albums waiting for you',
    'Add your favourites to a playlist',
  ],
  interval = 2600,
  fontSize = 'var(--text-display)',
  color = 'var(--text-strong)',
  style,
}: TextRollerProps) {
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % phrases.length), interval);
    return () => clearInterval(t);
  }, [phrases.length, interval]);

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: '1.25em',
        fontFamily: 'var(--font-display)',
        fontSize,
        letterSpacing: 'var(--track-display)',
        lineHeight: 1.25,
        color,
        ...style,
      }}
    >
      <div style={{ transform: `translateY(-${i * 1.25}em)`, transition: 'transform var(--dur-slow) var(--ease-in-out)' }}>
        {phrases.map((p, n) => (
          <div key={n} style={{ height: '1.25em', whiteSpace: 'nowrap' }}>{p}</div>
        ))}
      </div>
    </div>
  );
}
