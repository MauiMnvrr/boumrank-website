'use client';

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';

/* ============================================================================
   Reveal on scroll — IntersectionObserver ajoute la classe `.in`
   ============================================================================ */
type RevealProps = {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

export function Reveal({
  children,
  delay = 0,
  as: As = 'div',
  className = '',
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <As
      ref={ref}
      className={`reveal ${delay ? `delay-${delay}` : ''} ${className}`}
      style={style}
    >
      {children}
    </As>
  );
}

/* ============================================================================
   Section header (titre + lead, sans eyebrow)
   ============================================================================ */
type SectionHeaderProps = {
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
  maxLead?: number;
  children?: ReactNode;
};

export function SectionHeader({
  title,
  lead,
  center = false,
  maxLead = 640,
  children,
}: SectionHeaderProps) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 16 }}>
      <Reveal>
        <h2
          className="fn-h2"
          style={{
            marginLeft: center ? 'auto' : 0,
            marginRight: center ? 'auto' : 0,
          }}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={1}>
          <p
            className={`fn-lead ${center ? 'fn-lead-center' : ''}`}
            style={{ maxWidth: maxLead }}
          >
            {lead}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  );
}

/* ============================================================================
   Icônes plateformes / UI
   ============================================================================ */
type IconProps = { size?: number };

export const IcGoogle = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
    />
    <path
      fill="#FF3D00"
      d="m6.3 14.7 6.6 4.8C14.6 16 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.1 4 9.3 8.3 6.3 14.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3c-2 1.5-4.5 2.5-7.3 2.5-5.2 0-9.6-3.3-11.2-8l-6.6 5.1C9.1 39.6 16 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.1 5.7l6.3 5.3C40 35.6 44 30.4 44 24c0-1.3-.1-2.3-.4-3.5z"
    />
  </svg>
);

export const IcTrust = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <polygon
      fill="#00B67A"
      points="12,2 14.6,8.6 21.5,8.9 16.1,13.3 17.9,20 12,16.3 6.1,20 7.9,13.3 2.5,8.9 9.4,8.6"
    />
  </svg>
);

export const IcInsta = ({ size = 18 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
  </svg>
);

export const IcFb = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const IcTiktok = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M16 4.5c.9 1.4 2.4 2.4 4 2.6V10c-1.5 0-2.9-.3-4.2-1v6.4a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1V13a2.8 2.8 0 1 0 1.9 2.6V2h3z" />
  </svg>
);

export const IcMail = ({ size = 18 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 6 10-6" />
  </svg>
);

export const IcCheck = ({ size = 16 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const IcArrow = ({ size = 16 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export const IcChevDown = ({ size = 16 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IcSparkles = ({ size = 18 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2l1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7zM18 13l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9zM5 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
  </svg>
);

/* ============================================================================
   Registre des plateformes (couleur + icône). Le libellé vient des traductions.
   ============================================================================ */
export type Platform = {
  id: string;
  bg: string;
  border: boolean;
  Icon: (props: IconProps) => ReactNode;
};

export const PLATFORMS: Platform[] = [
  { id: 'google', bg: '#fff', border: true, Icon: IcGoogle },
  {
    id: 'trip',
    bg: '#00AF87',
    border: false,
    Icon: () => (
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 14,
          color: '#fff',
        }}
      >
        Ⓣ
      </span>
    ),
  },
  { id: 'trust', bg: '#fff', border: true, Icon: IcTrust },
  {
    id: 'instagram',
    bg: 'linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)',
    border: false,
    Icon: ({ size }: IconProps) => (
      <span style={{ color: '#fff', display: 'inline-flex' }}>
        <IcInsta size={size} />
      </span>
    ),
  },
  {
    id: 'facebook',
    bg: '#1877F2',
    border: false,
    Icon: ({ size }: IconProps) => (
      <span style={{ color: '#fff', display: 'inline-flex' }}>
        <IcFb size={size} />
      </span>
    ),
  },
  {
    id: 'tiktok',
    bg: '#000',
    border: false,
    Icon: ({ size }: IconProps) => (
      <span style={{ color: '#fff', display: 'inline-flex' }}>
        <IcTiktok size={size} />
      </span>
    ),
  },
  {
    id: 'newsletter',
    bg: 'linear-gradient(135deg,#1B6FC2,#2EAE6D)',
    border: false,
    Icon: ({ size }: IconProps) => (
      <span style={{ color: '#fff', display: 'inline-flex' }}>
        <IcMail size={size} />
      </span>
    ),
  },
];
