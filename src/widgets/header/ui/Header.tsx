'use client';
import React from 'react';
import Link from 'next/link';
import { StarBurst } from '@/shared/ui/star-burst';
import { usePathname } from 'next/navigation';
import { useSpotifyAuth } from '@/features/spotify-auth';
import { SpotifyConnectFlow } from '@/features/two-factor-auth';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { label: 'Home',      href: '/' },
  { label: 'Playlist',  href: '/browse' },
  { label: 'Discovery', href: '/browse?tab=discovery' },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [connectOpen, setConnectOpen] = React.useState(false);
  const { isConnected, disconnect } = useSpotifyAuth();

  return (
    <>
      <header
        className={styles.root}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-faint)',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-h)',
            letterSpacing: 'var(--track-display)',
            color: 'var(--text-strong)',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <StarBurst size={24} spin duration={14} />
          Rhythm
        </Link>

        {/* Desktop nav */}
        <nav className={styles.nav}>
          {NAV_ITEMS.map(({ label, href }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href.split('?')[0]);
            return (
              <Link
                key={label}
                href={href}
                style={{
                  position: 'relative',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-base)',
                  letterSpacing: '0.02em',
                  color: active ? 'var(--text-strong)' : 'var(--text-muted)',
                  textDecoration: 'none',
                  fontWeight: active ? 'var(--weight-semibold)' : 'var(--weight-regular)',
                  transition: 'color var(--dur-fast) var(--ease-out)',
                  paddingBottom: 4,
                }}
              >
                {label}
                {active && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: 'var(--accent)',
                      borderRadius: 2,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: search + avatar + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Search (hidden on mobile via CSS module) */}
          <div
            className={styles.searchBar}
            style={{
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              border: '1px solid var(--border-hairline)',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--gray-50)',
              minWidth: 180,
            }}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" />
            </svg>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-faint)' }}>
              Search...
            </span>
          </div>

          {/* Spotify connect / connected badge */}
          {isConnected ? (
            <button
              onClick={disconnect}
              title="Disconnect Spotify"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#1db954', border: 'none', borderRadius: 'var(--radius-pill)',
                padding: '6px 12px 6px 8px', cursor: 'pointer', flexShrink: 0,
                fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)',
                color: 'white', letterSpacing: '0.02em',
              }}
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="white">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.314a.748.748 0 0 1-1.029.249c-2.815-1.72-6.358-2.11-10.528-1.155a.748.748 0 0 1-.332-1.459c4.565-1.042 8.483-.593 11.641 1.336a.748.748 0 0 1 .248 1.029zm1.472-3.275a.936.936 0 0 1-1.287.308c-3.222-1.98-8.133-2.554-11.944-1.397a.936.936 0 1 1-.543-1.79c4.354-1.322 9.763-.681 13.466 1.592a.935.935 0 0 1 .308 1.287zm.127-3.408c-3.863-2.295-10.234-2.506-13.92-1.386a1.122 1.122 0 1 1-.651-2.148c4.232-1.285 11.267-1.037 15.708 1.603a1.122 1.122 0 1 1-1.137 1.931z" />
              </svg>
              Connected
            </button>
          ) : (
            <button
              onClick={() => setConnectOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'var(--black)', border: 'none', borderRadius: 'var(--radius-pill)',
                padding: '6px 12px 6px 8px', cursor: 'pointer', flexShrink: 0,
                fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)',
                color: 'white', letterSpacing: '0.02em',
              }}
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="white">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.314a.748.748 0 0 1-1.029.249c-2.815-1.72-6.358-2.11-10.528-1.155a.748.748 0 0 1-.332-1.459c4.565-1.042 8.483-.593 11.641 1.336a.748.748 0 0 1 .248 1.029zm1.472-3.275a.936.936 0 0 1-1.287.308c-3.222-1.98-8.133-2.554-11.944-1.397a.936.936 0 1 1-.543-1.79c4.354-1.322 9.763-.681 13.466 1.592a.935.935 0 0 1 .308 1.287zm.127-3.408c-3.863-2.295-10.234-2.506-13.92-1.386a1.122 1.122 0 1 1-.651-2.148c4.232-1.285 11.267-1.037 15.708 1.603a1.122 1.122 0 1 1-1.137 1.931z" />
              </svg>
              Connect
            </button>
          )}

          {/* Hamburger (visible on mobile via CSS module) */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <line x1="3" y1="6"  x2="21" y2="6"  />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Spotify 2FA connect modal */}
      {connectOpen && <SpotifyConnectFlow onClose={() => setConnectOpen(false)} />}

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuClose}>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-strong)' }}
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <line x1="18" y1="6"  x2="6" y2="18" />
                <line x1="6"  y1="6"  x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className={styles.mobileNavLinks}>
            {NAV_ITEMS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-display)',
                  fontWeight: 'var(--weight-regular)',
                  letterSpacing: 'var(--track-display)',
                  color: 'var(--text-strong)',
                  textDecoration: 'none',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
