import React from 'react';
import { Hero } from '@/widgets/hero';
import { TopSongs } from '@/widgets/top-songs';
import { Genres } from '@/widgets/genres';
import { AlbumGrid } from '@/widgets/album-grid';
import { ALBUMS } from '@/entities/album';

export function LandingPage() {
  return (
    <main style={{ paddingBottom: 80 }}>
      {/* 1. Split hero + marquee */}
      <Hero />

      {/* 2. Top 5 Songs */}
      <div style={{ borderBottom: '1px solid var(--border-faint)' }}>
        <TopSongs />
      </div>

      {/* 3. Genres grid */}
      <div style={{ paddingTop: 56, borderBottom: '1px solid var(--border-faint)' }}>
        <Genres />
      </div>

      {/* 4. Albums + CTA card */}
      <div style={{ paddingTop: 56 }}>
        <AlbumGrid
          albums={ALBUMS}
          tag="ALBUM"
          title="Albums"
          showCta
        />
      </div>

      {/* Footer */}
      <div style={{
        padding: '24px 56px',
        borderTop: '1px solid var(--border-faint)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        color: 'var(--text-faint)',
        textAlign: 'center',
      }}>
        © {new Date().getFullYear()} Rhythm. Find your rhythm.
      </div>
    </main>
  );
}
