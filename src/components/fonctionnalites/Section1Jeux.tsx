'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Reveal, SectionHeader, IcSparkles } from './shared';

const HUB_ICON = '/fonctionnalites/icon-gradient-eclats.png';

function GameCardWheel({ name, hint }: { name: string; hint: string }) {
  return (
    <div className="fn-game-card">
      <div className="fn-wheel" style={{ marginBottom: 22 }}>
        <div className="fn-wheel-arrow" />
        <div className="fn-wheel-disc" />
        <div className="fn-wheel-hub">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HUB_ICON} alt="" />
        </div>
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 22,
          margin: '0 0 16px',
          color: 'var(--text-primary)',
        }}
      >
        {name}
      </h3>
      <span className="fn-chip-pct">
        <IcSparkles size={14} /> {hint}
      </span>
    </div>
  );
}

function GameCardSlot({
  name,
  hint,
  badge,
}: {
  name: string;
  hint: string;
  badge: string;
}) {
  return (
    <div className="fn-game-card">
      <div style={{ marginBottom: 22, padding: '0 18px' }}>
        <div className="fn-slot">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 12,
                color: 'var(--primary-green)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '4px 14px',
                border: '1.5px solid var(--primary-green)',
                borderRadius: 9999,
              }}
            >
              {badge}
            </div>
          </div>
          <div className="fn-slot-reels">
            <div className="fn-slot-reel">
              <div className="fn-slot-reel-inner">
                <span>☕</span>
                <span>🍔</span>
                <span>🎁</span>
                <span>🍰</span>
                <span>☕</span>
              </div>
              <div className="fn-slot-glow" />
            </div>
            <div className="fn-slot-reel">
              <div className="fn-slot-reel-inner">
                <span>🍔</span>
                <span>☕</span>
                <span>🍰</span>
                <span>🎁</span>
                <span>🍔</span>
              </div>
              <div className="fn-slot-glow" />
            </div>
            <div className="fn-slot-reel">
              <div className="fn-slot-reel-inner">
                <span>🎁</span>
                <span>🍰</span>
                <span>☕</span>
                <span>🍔</span>
                <span>🎁</span>
              </div>
              <div className="fn-slot-glow" />
            </div>
          </div>
        </div>
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 22,
          margin: '0 0 16px',
          color: 'var(--text-primary)',
        }}
      >
        {name}
      </h3>
      <span className="fn-chip-pct">
        <IcSparkles size={14} /> {hint}
      </span>
    </div>
  );
}

function GameCardBlackjack({ name, hint }: { name: string; hint: string }) {
  return (
    <div className="fn-game-card">
      <div className="fn-bj" style={{ marginBottom: 22 }}>
        <div className="fn-bj-card">
          <span className="fn-bj-rank" style={{ color: '#d4263b' }}>
            A
          </span>
          <span className="fn-bj-suit" style={{ color: '#d4263b' }}>
            ♥
          </span>
          <span className="fn-bj-rank-bot" style={{ color: '#d4263b' }}>
            A
          </span>
        </div>
        <div className="fn-bj-card">
          <span className="fn-bj-rank" style={{ color: 'var(--text-primary)' }}>
            10
          </span>
          <span className="fn-bj-suit" style={{ color: 'var(--text-primary)' }}>
            ♠
          </span>
          <span className="fn-bj-rank-bot" style={{ color: 'var(--text-primary)' }}>
            10
          </span>
        </div>
        <div className="fn-bj-card">
          <span className="fn-bj-rank">?</span>
          <span className="fn-bj-suit">🎁</span>
          <span className="fn-bj-rank-bot">?</span>
        </div>
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 22,
          margin: '0 0 16px',
          color: 'var(--text-primary)',
        }}
      >
        {name}
      </h3>
      <span className="fn-chip-pct">
        <IcSparkles size={14} /> {hint}
      </span>
    </div>
  );
}

export const Section1Jeux = () => {
  const t = useTranslations('features.jeux');
  const [pct, setPct] = useState(80);

  return (
    <section
      className="fn-section"
      id="jeux"
      style={{ background: 'var(--bg-primary)', position: 'relative' }}
    >
      {/* Aurora background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: '60%',
            height: '60%',
            background:
              'radial-gradient(circle, rgba(27,111,194,0.10), transparent 60%)',
            filter: 'blur(20px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            right: '-10%',
            width: '55%',
            height: '55%',
            background:
              'radial-gradient(circle, rgba(46,174,109,0.10), transparent 60%)',
            filter: 'blur(20px)',
          }}
        />
      </div>

      <div className="fn-container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader
          title={
            <>
              {t('title')} <span className="hl">{t('titleGradient')}</span>
              {t('titleSuffix')}
            </>
          }
          lead={t('lead')}
          maxLead={620}
        />

        <Reveal delay={2}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 24,
              marginBottom: 64,
            }}
          >
            <GameCardWheel name={t('wheel.name')} hint={t('wheel.hint')} />
            <GameCardSlot
              name={t('slot.name')}
              hint={t('slot.hint')}
              badge={t('slot.badge')}
            />
            <GameCardBlackjack
              name={t('blackjack.name')}
              hint={t('blackjack.hint')}
            />
          </div>
        </Reveal>

        {/* Probability slider — interactive */}
        <Reveal delay={3}>
          <div
            className="s1-slider-card"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              borderRadius: 24,
              padding: '32px 36px',
              display: 'grid',
              gridTemplateColumns: '1fr 1.4fr',
              gap: 40,
              alignItems: 'center',
              boxShadow: '0 10px 30px rgba(15,23,42,0.04)',
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 26,
                  margin: '0 0 10px',
                  color: 'var(--text-primary)',
                  lineHeight: 1.1,
                }}
              >
                {t('slider.title')}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: 'var(--text-body)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {t.rich('slider.body', {
                  strong: (chunks) => (
                    <strong style={{ color: 'var(--text-primary)' }}>{chunks}</strong>
                  ),
                })}
              </p>
            </div>
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 12,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {t('slider.label')}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-data)',
                    fontWeight: 700,
                    fontSize: 44,
                    color: 'var(--primary-blue)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {pct}
                  <span style={{ fontSize: 22, color: 'var(--text-secondary)' }}>%</span>
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={pct}
                onChange={(e) => setPct(parseInt(e.target.value, 10))}
                className="fn-slider"
                aria-label={t('slider.label')}
                style={{ '--val': `${pct}%` } as React.CSSProperties}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 18,
                  gap: 16,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    background: 'var(--bg-elevated)',
                    borderRadius: 12,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 12,
                      color: 'var(--primary-green-dark)',
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: 'var(--primary-green)',
                      }}
                    />
                    {t('slider.win')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-data)',
                      fontWeight: 700,
                      color: 'var(--primary-green-dark)',
                    }}
                  >
                    {pct}%
                  </span>
                </div>
                <div
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    background: 'var(--bg-elevated)',
                    borderRadius: 12,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 12,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: 'var(--text-muted)',
                      }}
                    />
                    {t('slider.lose')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-data)',
                      fontWeight: 700,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {100 - pct}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .s1-slider-card { grid-template-columns: 1fr !important; gap: 24px !important; padding: 24px !important; }
        }
      `}</style>
    </section>
  );
};
