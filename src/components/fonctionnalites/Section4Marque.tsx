'use client';

import { type CSSProperties, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Reveal, SectionHeader, IcCheck } from './shared';

type BrandText = {
  name: string;
  tagline: string;
  cta: string;
  fullName: string;
  type: string;
};

type BrandVisual = {
  logo: ReactNode;
  nameStyle: CSSProperties;
  brand: string;
  accent: string;
  deep: string;
};

function BrandPhone({
  brand,
  accent,
  deep,
  logo,
  name,
  tagline,
  cta,
  nameStyle,
  navLabels,
  games,
}: BrandVisual &
  Pick<BrandText, 'name' | 'tagline' | 'cta'> & {
    navLabels: string[];
    games: { wheel: string; slot: string };
  }) {
  return (
    <div
      className="fn-phone"
      style={{
        width: 240,
        height: 480,
        transform: 'scale(0.95)',
        transformOrigin: 'top center',
      }}
    >
      <div className="fn-phone-screen" style={{ background: brand }}>
        <div
          style={{
            position: 'absolute',
            top: 36,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0 18px',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 22,
              boxShadow: `0 8px 20px ${deep}`,
              marginBottom: 12,
            }}
          >
            {logo}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', ...nameStyle }}>{name}</div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 18,
              color: '#1a1a1a',
              margin: '6px 0 18px',
              textAlign: 'center',
            }}
          >
            {tagline}
          </div>

          <div
            style={{
              width: '100%',
              background: '#fff',
              borderRadius: 16,
              padding: 12,
              boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
            }}
          >
            <div
              style={{
                background: accent,
                color: '#fff',
                padding: '10px 12px',
                borderRadius: 10,
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 12,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                marginBottom: 8,
              }}
            >
              🎡 {games.wheel}
            </div>
            <div
              style={{
                background: `linear-gradient(135deg, ${deep}, ${accent})`,
                color: '#fff',
                padding: '10px 12px',
                borderRadius: 10,
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 12,
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              🎰 {games.slot}
            </div>
          </div>

          <div
            style={{
              marginTop: 16,
              display: 'inline-flex',
              gap: 4,
              alignItems: 'center',
              padding: '6px 12px',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: 9999,
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 10,
              color: deep,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            ✨ {cta}
          </div>
        </div>

        {/* Bottom nav skinned */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 44,
            background: deep,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {navLabels.map((l, i) => (
            <div
              key={l}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 10,
                color: i === 0 ? '#fff' : 'rgba(255,255,255,0.45)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Section4Marque = () => {
  const t = useTranslations('features.marque');

  const fork = (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 3v6M10 3v6M8.5 3v6M8.5 9v12" />
      <path d="M16.5 3c-1.4 0-2 2.2-2 4.5s.6 3.5 2 3.5 2-1.2 2-3.5-.6-4.5-2-4.5z" />
      <path d="M16.5 11v10" />
    </svg>
  );
  const glass = (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1A1531"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 4h14l-7 8z" />
      <path d="M12 12v6" />
      <path d="M8 20h8" />
      <circle cx="17" cy="6.5" r="1" fill="#1A1531" stroke="none" />
    </svg>
  );
  const scissors = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  );

  const visuals: BrandVisual[] = [
    {
      logo: fork,
      nameStyle: {
        fontWeight: 700,
        fontSize: 18,
        color: '#C8463C',
        letterSpacing: '0.01em',
        fontStyle: 'italic',
      },
      brand: 'linear-gradient(180deg, #FEF6E4 0%, #FBE7C6 100%)',
      accent: '#C8463C',
      deep: '#7A2A22',
    },
    {
      logo: glass,
      nameStyle: {
        fontWeight: 800,
        fontSize: 15,
        color: '#D4AF37',
        letterSpacing: '0.34em',
        textTransform: 'uppercase',
        paddingLeft: '0.34em',
      },
      brand: 'linear-gradient(180deg, #1A1531 0%, #0E0A22 100%)',
      accent: '#D4AF37',
      deep: '#5C4A1F',
    },
    {
      logo: scissors,
      nameStyle: {
        fontWeight: 500,
        fontSize: 14,
        color: '#E84393',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        paddingLeft: '0.28em',
      },
      brand: 'linear-gradient(180deg, #FFF0F4 0%, #FCDCE5 100%)',
      accent: '#E84393',
      deep: '#7C2E59',
    },
  ];

  const brandsText = t.raw('brands') as BrandText[];
  const navLabels = t.raw('navLabels') as string[];
  const badges = t.raw('badges') as string[];
  const games = { wheel: t('games.wheel'), slot: t('games.slot') };

  const brands = visuals.map((v, i) => ({ ...v, ...brandsText[i] }));

  return (
    <section
      className="fn-section"
      id="marque"
      style={{ background: 'var(--bg-elevated)', overflow: 'hidden' }}
    >
      <div className="fn-container">
        <SectionHeader
          title={
            <>
              {t('title')} <span className="hl">{t('titleGradient')}</span>
              {t('titleSuffix')}
            </>
          }
          lead={t('lead')}
          maxLead={620}
          center
        />

        <Reveal delay={2}>
          <div
            className="s4-phones"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 32,
              justifyItems: 'center',
              marginTop: 40,
            }}
          >
            {brands.map((b) => (
              <div
                key={b.fullName}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 18,
                }}
              >
                <BrandPhone {...b} navLabels={navLabels} games={games} />
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 16,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {b.fullName}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
                    {b.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={3}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 10,
              flexWrap: 'wrap',
              marginTop: 48,
            }}
          >
            {badges.map((b) => (
              <span key={b} className="fn-badge">
                <IcCheck /> {b}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .s4-phones { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
