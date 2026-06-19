'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Genres.module.css';

interface GenreCard {
  label: string;
  sublabel: string;
  cover: string;
  overlay: string;
}

const GENRES: GenreCard[] = [
  { label: 'Find My Rhythm', sublabel: 'Electro Pop', cover: '/albums/girls.png',      overlay: 'rgba(0,0,0,0.35)' },
  { label: 'UNIVERSE',       sublabel: 'K-Pop',       cover: '/albums/reputation.png', overlay: 'rgba(0,0,0,0.45)' },
  { label: 'Indie Pop',      sublabel: 'Indie Pop',   cover: '/albums/lover.png',      overlay: 'rgba(255,131,77,0.35)' },
  { label: 'New Wave',       sublabel: 'New Wave',    cover: '/albums/showgirl.png',   overlay: 'rgba(0,0,0,0.40)' },
  { label: 'Pop',            sublabel: 'Pop',         cover: '/albums/hotmess.png',    overlay: 'rgba(0,0,0,0.45)' },
  { label: 'Jazz',           sublabel: 'Jazz',        cover: '/albums/girls.png',      overlay: 'rgba(20,10,5,0.6)' },
];

function Card({ genre, className }: { genre: GenreCard; className?: string }) {
  const [hover, setHover] = React.useState(false);
  return (
    <Link
      href={`/browse?genre=${encodeURIComponent(genre.sublabel)}`}
      className={`${styles.card} ${className ?? ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 20,
        cursor: 'pointer',
        textDecoration: 'none',
        transform: hover ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform var(--dur-base) var(--ease-out)',
      }}
    >
      <Image src={genre.cover} alt={genre.label} fill style={{ objectFit: 'cover' }} sizes="400px" />
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(to top, rgba(0,0,0,0.75) 0%, ${genre.overlay} 100%)`,
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
          letterSpacing: '0.1em', textTransform: 'uppercase' as const,
          color: 'rgba(255,255,255,0.65)', marginBottom: 4,
        }}>
          {genre.sublabel}
        </div>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-h)',
          fontWeight: 'var(--weight-semibold)', letterSpacing: 'var(--track-display)',
          color: 'var(--white)', lineHeight: 1.1,
        }}>
          {genre.label}
        </div>
      </div>
    </Link>
  );
}

export function Genres() {
  return (
    <section className={styles.section}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-title)',
          fontWeight: 'var(--weight-regular)', letterSpacing: 'var(--track-display)',
          color: 'var(--text-strong)', margin: 0,
        }}>
          Genres
        </h2>
        <Link href="/browse" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', textDecoration: 'none' }}>
          See all →
        </Link>
      </div>

      <div className={styles.grid}>
        <Card genre={GENRES[0]} className={styles.wideCard} />
        {GENRES.slice(1).map((g) => <Card key={g.label} genre={g} />)}
      </div>
    </section>
  );
}
