'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Marquee } from '@/shared/ui/marquee';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section>
      {/* Split hero */}
      <div className={styles.grid}>

        {/* Left: text */}
        <div className={styles.textCol}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--text-faint)', marginBottom: 20,
          }}>
            <span style={{ width: 20, height: 1, background: 'var(--gray-300)', display: 'inline-block' }} />
            Featured artist
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 4.5vw, 64px)',
            fontWeight: 'var(--weight-regular)',
            letterSpacing: 'var(--track-display)',
            lineHeight: 1.0,
            color: 'var(--text-strong)',
            margin: '0 0 4px',
          }}>
            The Top Artist<br />On the chart
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, marginTop: 8 }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(22px, 3vw, 44px)',
              color: 'var(--accent)',
              letterSpacing: 'var(--track-display)',
              lineHeight: 1,
            }}>
              For this week
            </span>
            <svg width={40} height={28} viewBox="0 0 40 28" fill="none">
              <path d="M4 22 C8 10, 16 4, 24 8 C32 12, 36 20, 30 24 C24 28, 14 22, 18 14 C22 6, 32 8, 36 6" stroke="var(--black)" strokeWidth={2} strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)',
            color: 'var(--text-muted)', lineHeight: 'var(--leading-body)',
            maxWidth: 420, margin: '0 0 28px',
          }}>
            Discover the artist delivering the most streams this week — her latest single has
            highlights the most-listened week across all charts, based on listening activity
            across your connected accounts.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
            <Link href="/browse" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex' }}>
                  {['var(--gray-300)', 'var(--orange-100)', 'var(--gray-200)'].map((bg, i) => (
                    <div key={i} style={{
                      width: 28, height: 28, borderRadius: 'var(--radius-pill)',
                      background: bg, border: '2px solid var(--white)',
                      marginLeft: i === 0 ? 0 : -8, zIndex: 3 - i, position: 'relative',
                    }} />
                  ))}
                </div>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)',
                  color: 'var(--text-strong)', letterSpacing: '0.02em',
                }}>See all →</span>
              </div>
            </Link>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--accent)', display: 'inline-block', flexShrink: 0,
            }} />
            118 hours and 35 minutes &nbsp;
            <span style={{ color: 'var(--text-faint)' }}>Longest live stream</span>
          </div>
        </div>

        {/* Right: photo collage */}
        <div className={styles.photoCol}>
          <div className={styles.mainPhoto}>
            <Image src="/albums/girls.png" alt="Top artist" fill style={{ objectFit: 'cover' }} sizes="(max-width:768px) 100vw, 420px" priority />
          </div>
          <div className={styles.overlay1}>
            <Image src="/albums/reputation.png" alt="" fill style={{ objectFit: 'cover' }} sizes="110px" />
          </div>
          <div className={styles.overlay2}>
            <Image src="/albums/lover.png" alt="" fill style={{ objectFit: 'cover' }} sizes="80px" />
          </div>
          <div className={styles.disc}>
            <Image src="/albums/hotmess.png" alt="" fill style={{ objectFit: 'cover' }} sizes="52px" />
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div style={{
        borderTop: '1px solid var(--border-faint)',
        borderBottom: '1px solid var(--border-faint)',
        padding: '20px 0',
        overflow: 'hidden',
      }}>
        <Marquee fontSize="var(--text-lg)" color="var(--gray-400)" speed="28s" />
      </div>
    </section>
  );
}
