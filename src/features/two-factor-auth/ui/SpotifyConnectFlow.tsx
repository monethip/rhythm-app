'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { buildSpotifyAuthUrl } from '@/features/spotify-auth';
import { generateOtp, verifyOtp } from '../model/otp';
import styles from './SpotifyConnectFlow.module.css';

type Step = 'email' | 'otp' | 'connecting';

interface Props {
  onClose: () => void;
}

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ?? '';

// SpotifyIcon as inline SVG to avoid extra deps
function SpotifyIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.314a.748.748 0 0 1-1.029.249c-2.815-1.72-6.358-2.11-10.528-1.155a.748.748 0 0 1-.332-1.459c4.565-1.042 8.483-.593 11.641 1.336a.748.748 0 0 1 .248 1.029zm1.472-3.275a.936.936 0 0 1-1.287.308c-3.222-1.98-8.133-2.554-11.944-1.397a.936.936 0 1 1-.543-1.79c4.354-1.322 9.763-.681 13.466 1.592a.935.935 0 0 1 .308 1.287zm.127-3.408c-3.863-2.295-10.234-2.506-13.92-1.386a1.122 1.122 0 1 1-.651-2.148c4.232-1.285 11.267-1.037 15.708 1.603a1.122 1.122 0 1 1-1.137 1.931z" />
    </svg>
  );
}

export function SpotifyConnectFlow({ onClose }: Props) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Animate modal in on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(modalRef.current, {
        opacity: 0,
        y: 24,
        scale: 0.97,
        duration: 0.35,
        ease: 'power2.out',
      });
    });
    return () => ctx.revert();
  }, []);

  // Animate content on step change
  function animateStepChange(cb: () => void) {
    gsap.to(contentRef.current, {
      opacity: 0,
      y: -12,
      duration: 0.18,
      ease: 'power1.in',
      onComplete: () => {
        cb();
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        );
      },
    });
  }

  function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    const code = generateOtp();
    setGeneratedOtp(code);
    // Simulate network delay for "sending email"
    setTimeout(() => {
      setLoading(false);
      animateStepChange(() => {
        setStep('otp');
        setOtp(Array(6).fill(''));
      });
      // In production: call your API to email the OTP to `email`
      if (process.env.NODE_ENV === 'development') {
        console.info('[2FA dev] OTP for', email, '→', code);
      }
    }, 800);
  }

  function handleOtpInput(index: number, value: string) {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    setError('');
    if (digit && index < 5) otpRefs.current[index + 1]?.focus();
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');
    const next = Array(6).fill('');
    digits.forEach((d, i) => { next[i] = d; });
    setOtp(next);
    otpRefs.current[Math.min(digits.length, 5)]?.focus();
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter the full 6-digit code.');
      return;
    }
    if (!verifyOtp(code, generatedOtp)) {
      setError('Incorrect code. Please try again.');
      setOtp(Array(6).fill(''));
      otpRefs.current[0]?.focus();
      gsap.from(otpRefs.current, { x: [-6, 6, -4, 4, -2, 0][0], duration: 0.4, ease: 'power2.out' });
      return;
    }

    setError('');
    animateStepChange(() => setStep('connecting'));

    if (!CLIENT_ID) {
      setTimeout(() => {
        setStep('otp');
        setError('NEXT_PUBLIC_SPOTIFY_CLIENT_ID is not set. Add it to .env.local to complete the flow.');
      }, 1200);
      return;
    }

    try {
      const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI
        ?? `${window.location.origin}/callback`;
      const url = await buildSpotifyAuthUrl(CLIENT_ID, redirectUri);
      window.location.href = url;
    } catch (err) {
      animateStepChange(() => setStep('otp'));
      setError((err as Error).message);
    }
  }

  function handleResend() {
    const code = generateOtp();
    setGeneratedOtp(code);
    setOtp(Array(6).fill(''));
    setError('');
    if (process.env.NODE_ENV === 'development') {
      console.info('[2FA dev] Resent OTP for', email, '→', code);
    }
    otpRefs.current[0]?.focus();
  }

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className={styles.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} ref={modalRef}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Step dots */}
        <div className={styles.stepIndicator}>
          <div className={`${styles.stepDot} ${step === 'email' ? styles.active : ''}`} />
          <div className={`${styles.stepDot} ${step === 'otp' || step === 'connecting' ? styles.active : ''}`} />
        </div>

        <div ref={contentRef}>
          {step === 'email' && (
            <form onSubmit={handleSendOtp}>
              <div className={styles.spotifyBadge}>
                <SpotifyIcon size={12} />
                Spotify
              </div>
              <h2 className={styles.title}>Connect your<br />Spotify account</h2>
              <p className={styles.subtitle}>
                We&apos;ll send a 6-digit verification code to confirm it&apos;s you before connecting.
              </p>

              <input
                className={styles.emailInput}
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                autoFocus
                autoComplete="email"
              />

              {error && <p className={styles.errorMsg}>{error}</p>}

              <button className={styles.primaryBtn} type="submit" disabled={loading}>
                {loading ? 'Sending…' : 'Send verification code →'}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerify}>
              <div className={styles.spotifyBadge}>
                <SpotifyIcon size={12} />
                Verification
              </div>
              <h2 className={styles.title}>Check your<br />email</h2>
              <p className={styles.subtitle}>
                We sent a 6-digit code to <strong>{email}</strong>. Enter it below to continue.
              </p>

              <div className={styles.otpRow} onPaste={handleOtpPaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    className={`${styles.otpBox} ${digit ? styles.filled : ''} ${error ? styles.error : ''}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpInput(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    autoFocus={i === 0}
                    autoComplete="one-time-code"
                  />
                ))}
              </div>

              {error && <p className={styles.errorMsg}>{error}</p>}

              {isDev && generatedOtp && (
                <div className={styles.devHint}>
                  <span>Dev mode — your code: </span>
                  <span className={styles.devHintCode}>{generatedOtp}</span>
                </div>
              )}

              <button
                className={styles.primaryBtn}
                type="submit"
                disabled={otp.join('').length < 6}
                style={{ marginTop: isDev ? 14 : 0 }}
              >
                Verify &amp; connect →
              </button>

              <div className={styles.footerLinks}>
                <button type="button" className={styles.footerLink} onClick={handleResend}>
                  Resend code
                </button>
                <span>·</span>
                <button type="button" className={styles.footerLink} onClick={() => animateStepChange(() => setStep('email'))}>
                  Change email
                </button>
              </div>
            </form>
          )}

          {step === 'connecting' && (
            <div className={styles.connectingWrap}>
              <div className={styles.spotifyBadge}>
                <SpotifyIcon size={12} />
                Spotify
              </div>
              <div className={styles.spinner} />
              <p style={{ fontFamily: 'var(--font-display)', color: 'var(--text-muted)', margin: 0 }}>
                Redirecting to Spotify…
              </p>
              {error && <p className={styles.errorMsg} style={{ marginTop: 8 }}>{error}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
