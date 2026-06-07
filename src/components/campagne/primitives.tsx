'use client';

import { type ReactNode, type CSSProperties } from 'react';
import { motion, MotionConfig, type Variants } from 'framer-motion';
import { CAL_URL } from '@/lib/constants';
import { fadeUp, inViewOnce, EASE } from '@/lib/motion';

/* ============================================================================
   Provider Motion — respecte prefers-reduced-motion pour TOUTES les animations
   Framer (entrées, étoiles, transitions d'onglets), pas seulement les boucles CSS.
   ============================================================================ */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/* URL de réservation avec UTM, construite proprement (robuste aux query params) */
function buildCalHref(source: string) {
  try {
    const u = new URL(CAL_URL);
    u.searchParams.set('utm_source', source);
    return u.toString();
  } catch {
    return CAL_URL;
  }
}

/* ============================================================================
   CTA — réservation d'appel (cal.com). Toujours en nouvel onglet.
   ============================================================================ */
export function CalCta({
  children = 'Réserver mon appel',
  size = 'lg',
  pulse = false,
  variant = 'gradient',
  className = '',
  style,
  source = 'campagne',
}: {
  children?: ReactNode;
  size?: 'md' | 'lg';
  pulse?: boolean;
  variant?: 'gradient' | 'invert';
  className?: string;
  style?: CSSProperties;
  source?: string;
}) {
  return (
    <a
      href={buildCalHref(source)}
      target="_blank"
      rel="noopener noreferrer"
      data-cta={source}
      className={`cmp-cta cmp-cta-${size} ${variant === 'invert' ? 'cmp-cta-invert' : ''} ${pulse ? 'cmp-cta-pulse' : ''} ${className}`}
      style={style}
    >
      {children}
      <ArrowIcon size={size === 'lg' ? 20 : 16} />
      <span className="cmp-sr-only"> (ouvre un nouvel onglet)</span>
    </a>
  );
}

/* ============================================================================
   Reveal — entrée au scroll (Framer Motion)
   ============================================================================ */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = '',
  as = 'div',
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span';
  style?: CSSProperties;
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.6, ease: EASE.outExpo, delay }}
    >
      {children}
    </MotionTag>
  );
}

/* Conteneur stagger */
export const staggerWrap: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
export const staggerItem: Variants = fadeUp;

export function Stagger({
  children,
  className = '',
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={staggerWrap}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================================
   Étoiles animées (avis 5★)
   ============================================================================ */
export function Stars({ size = 22, className = '' }: { size?: number; className?: string }) {
  return (
    <motion.span
      className={`cmp-stars ${className}`}
      variants={staggerWrap}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      aria-label="5 étoiles sur 5"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          className="cmp-star"
          style={{ display: 'inline-flex' }}
          variants={{
            hidden: { opacity: 0, scale: 0.3, rotate: -30 },
            visible: {
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: { type: 'spring', stiffness: 320, damping: 14 },
            },
          }}
        >
          <StarIcon size={size} />
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ============================================================================
   Cadre téléphone
   ============================================================================ */
export function PhoneFrame({
  children,
  className = '',
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`cmp-phone ${className}`} style={style}>
      <div className="cmp-phone-screen">
        <div className="cmp-app-bar">
          <span className="cmp-app-dot" style={{ background: 'var(--primary-blue)' }} />
          <span className="cmp-app-dot" style={{ background: 'var(--primary-teal)' }} />
          <span className="cmp-app-dot" style={{ background: 'var(--primary-green)' }} />
        </div>
        {children}
      </div>
    </div>
  );
}

/* Style partagé : faux bouton dans l'écran du téléphone (mockup) */
export const screenCtaStyle: CSSProperties = {
  textAlign: 'center',
  height: 46,
  borderRadius: 9999,
  background: 'var(--gradient-primary)',
  color: '#fff',
  fontFamily: 'var(--font-plus-jakarta), sans-serif',
  fontWeight: 800,
  fontSize: 14,
  letterSpacing: '0.03em',
  textTransform: 'uppercase',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 8px 20px rgba(27,111,194,0.35)',
  textShadow: '0 1px 2px rgba(0,0,0,0.25)',
};

/* ============================================================================
   Icônes
   ============================================================================ */
export function StarIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.2l2.85 5.95 6.55.78-4.83 4.46 1.27 6.46L12 17.95 6.16 20.85l1.27-6.46-4.83-4.46 6.55-.78z" />
    </svg>
  );
}

export function ArrowIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function GoogleGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 16 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.1 4 9.3 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3c-2 1.5-4.5 2.5-7.3 2.5-5.2 0-9.6-3.3-11.2-8l-6.6 5.1C9.1 39.6 16 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.1 5.7l6.3 5.3C40 35.6 44 30.4 44 24c0-1.3-.1-2.3-.4-3.5z" />
    </svg>
  );
}

export function QrCode() {
  // motif décoratif déterministe (7x7)
  const pattern = [
    1, 1, 1, 0, 1, 1, 1,
    1, 0, 1, 0, 1, 0, 1,
    1, 1, 1, 0, 1, 1, 1,
    0, 0, 0, 1, 0, 0, 0,
    1, 1, 0, 1, 0, 1, 1,
    1, 0, 1, 0, 1, 0, 1,
    1, 1, 1, 0, 1, 1, 1,
  ];
  return (
    <div className="cmp-qr" aria-hidden>
      {pattern.map((v, i) => (
        <span key={i} className={v ? 'on' : ''} />
      ))}
    </div>
  );
}
