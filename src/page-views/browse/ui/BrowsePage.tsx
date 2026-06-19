import React from 'react';
import { AlbumGrid } from '@/widgets/album-grid';
import { ALBUMS } from '@/entities/album';
import styles from './BrowsePage.module.css';

export function BrowsePage() {
  const newReleases = ALBUMS.slice(0, 5);
  const forYou = [...ALBUMS].reverse();

  return (
    <main>
      <div className={styles.pageHero}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
          letterSpacing: '0.08em', textTransform: 'uppercase' as const,
          color: 'var(--text-faint)', marginBottom: 8,
        }}>
          ALBUM
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(var(--text-title), 5vw, var(--text-display))',
          fontWeight: 'var(--weight-regular)', letterSpacing: 'var(--track-display)',
          color: 'var(--text-strong)', margin: 0,
        }}>
          Browse
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-lg)',
          color: 'var(--text-muted)', marginTop: 12, marginBottom: 0,
        }}>
          A lot of albums waiting for you.
        </p>
      </div>

      <AlbumGrid albums={newReleases} tag="NEW THIS WEEK" title="New releases" />
      <div style={{ borderTop: '1px solid var(--border-faint)' }}>
        <AlbumGrid albums={forYou} tag="MADE FOR YOU" title="Music that feels like you" showCta />
      </div>
    </main>
  );
}
