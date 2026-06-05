'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Reveal, SectionHeader, IcCheck, IcArrow } from './shared';

function SlideToValidate() {
  const t = useTranslations('features.coupons.slide');
  const [pct, setPct] = useState(0); // 0..1
  const [done, setDone] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({ startX: 0, startPct: 0, active: false });

  const onPointerMove = (e: PointerEvent) => {
    if (!dragRef.current.active || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - dragRef.current.startX;
    const trackWidth = rect.width - 56;
    let p = dragRef.current.startPct + x / trackWidth;
    p = Math.max(0, Math.min(1, p));
    setPct(p);
    if (p >= 0.97) {
      setDone(true);
      setPct(1);
      dragRef.current.active = false;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    }
  };

  const onPointerUp = () => {
    dragRef.current.active = false;
    setDone((d) => {
      if (!d) setPct(0);
      return d;
    });
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (done) return;
    e.preventDefault();
    dragRef.current.active = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.startPct = pct;
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const reset = () => {
    setDone(false);
    setPct(0);
  };

  return (
    <div>
      <div className="fn-slide-track" ref={trackRef}>
        <div
          className="fn-slide-fill"
          style={{
            transform: `scaleX(${Math.max(pct, done ? 1 : 0)})`,
            opacity: pct > 0 || done ? 1 : 0,
          }}
        />
        <div
          className="fn-slide-label"
          style={{ opacity: pct > 0.05 ? 0 : 1, color: 'var(--primary-green-dark)' }}
        >
          {t('prompt')}
        </div>
        <div
          className="fn-slide-label"
          style={{ opacity: done ? 1 : 0, color: '#fff', letterSpacing: '0.18em' }}
        >
          {t('done')}
        </div>
        <div
          className="fn-slide-thumb"
          style={{
            left: `calc(4px + ${pct} * (100% - 56px))`,
            background: done ? '#fff' : undefined,
            color: done ? 'var(--primary-green-dark)' : '#fff',
          }}
          onPointerDown={onPointerDown}
          role="slider"
          aria-label={t('prompt')}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct * 100)}
        >
          {done ? <IcCheck size={20} /> : <IcArrow size={20} />}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 14,
        }}
      >
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {done ? t('usedOnce') : t('once')}
        </span>
        {done && (
          <button
            onClick={reset}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              border: '1px solid var(--border-default)',
              background: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
              padding: '6px 12px',
              borderRadius: 9999,
              cursor: 'pointer',
            }}
          >
            {t('restart')}
          </button>
        )}
      </div>
    </div>
  );
}

export const Section3Coupons = () => {
  const t = useTranslations('features.coupons');
  const features = t.raw('features') as Array<{ title: string; body: string }>;

  return (
    <section
      className="fn-section"
      id="coupons"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="fn-container">
        <SectionHeader
          title={
            <>
              {t('title')} <span className="hl">{t('titleGradient')}</span>
            </>
          }
          lead={t('lead')}
          maxLead={620}
        />

        <div className="fn-twocol" style={{ marginTop: 24 }}>
          {/* LEFT — Realistic coupon mockup */}
          <Reveal>
            <div style={{ maxWidth: 460, margin: '0 auto', width: '100%' }}>
              <div className="fn-coupon">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 56, lineHeight: 1, marginBottom: 8 }}>🎁</div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 24,
                      margin: '0 0 4px',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {t('coupon.reward')}
                  </h3>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      marginTop: 14,
                      padding: '8px 18px',
                      borderRadius: 9999,
                      border: '1.5px dashed var(--border-default)',
                      fontFamily: 'var(--font-data)',
                      fontWeight: 700,
                      fontSize: 14,
                      color: 'var(--text-primary)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    <span style={{ color: 'var(--primary-green)' }}>●</span>
                    {t('coupon.code')}
                  </div>
                </div>

                <hr className="fn-coupon-divider" />

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 14,
                    marginBottom: 18,
                  }}
                >
                  <div className="fn-info-row" style={{ gap: 10 }}>
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: 'rgba(242,140,40,0.12)',
                        color: 'var(--secondary-orange-dark)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      💰
                    </span>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: 11,
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {t('coupon.minLabel')}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-data)',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {t('coupon.minValue')}
                      </div>
                    </div>
                  </div>
                  <div className="fn-info-row" style={{ gap: 10 }}>
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: 'rgba(27,111,194,0.10)',
                        color: 'var(--primary-blue-dark)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      ⏰
                    </span>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: 11,
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {t('coupon.expireLabel')}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-data)',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {t('coupon.expireValue')}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(46,174,109,0.10), rgba(27,111,194,0.06))',
                    border: '1px solid rgba(46,174,109,0.30)',
                    borderRadius: 16,
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 20,
                  }}
                >
                  <span
                    className="fn-pulse-glow"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'var(--primary-green)',
                      color: '#fff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <IcCheck size={16} />
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: 15,
                        color: 'var(--primary-green-dark)',
                      }}
                    >
                      {t('coupon.activeTitle')}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      {t('coupon.activeSub')}
                    </div>
                  </div>
                </div>

                <SlideToValidate />
              </div>

              <p
                style={{
                  marginTop: 16,
                  textAlign: 'center',
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-display)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {t('slide.demo')}
              </p>
            </div>
          </Reveal>

          {/* RIGHT — Feature list */}
          <Reveal delay={1}>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
              }}
            >
              {features.map((f, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 16,
                    padding: '16px 0',
                    borderBottom:
                      i < features.length - 1
                        ? '1px solid var(--border-default)'
                        : 'none',
                  }}
                >
                  <span
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 10,
                      background: 'var(--gradient-subtle)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary-blue)',
                      flexShrink: 0,
                    }}
                  >
                    <IcCheck size={16} />
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: 16,
                        color: 'var(--text-primary)',
                        marginBottom: 4,
                      }}
                    >
                      {f.title}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: 'var(--text-body)',
                        lineHeight: 1.5,
                      }}
                    >
                      {f.body}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
