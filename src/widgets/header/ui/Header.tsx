'use client';
import React from 'react';
import Link from 'next/link';
import { StarBurst } from '@/shared/ui/star-burst';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { label: 'Home',      href: '/' },
  { label: 'Playlist',  href: '/browse' },
  { label: 'Discovery', href: '/browse?tab=discovery' },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);

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

          {/* Avatar */}
          <div
            style={{
              width: 36, height: 36, borderRadius: 'var(--radius-pill)',
              background: 'var(--accent)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
            }}
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx={12} cy={7} r={4} />
            </svg>
          </div>

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
