'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Reveal, SectionHeader, IcChevDown } from './shared';

type Kpi = { label: string; value: string; trend: string; detail: string };

// Visual mapping (icon + color) applied by index — text comes from i18n.
const KPI_ICONS = ['🎮', '⭐', '✉️', '€', '🎟️'];
const KPI_COLORS = ['#1B6FC2', '#1E9DAA', '#00CEC9', '#F28C28', '#7C5CFC'];

// Curve data — 30 points
const CURVE_SHOP = [
  12, 18, 22, 14, 20, 28, 35, 24, 30, 28, 38, 42, 36, 48, 44, 56, 50, 62, 58, 72,
  68, 76, 70, 80, 78, 92, 86, 96, 90, 104,
];
const CURVE_NETWORK = [
  60, 78, 92, 84, 104, 138, 165, 142, 178, 168, 210, 232, 218, 260, 248, 296, 272,
  328, 312, 376, 358, 396, 372, 416, 408, 472, 448, 496, 470, 532,
];

function CurveChart({
  data,
  color = '#1B6FC2',
  colorEnd = '#2EAE6D',
}: {
  data: number[];
  color?: string;
  colorEnd?: string;
}) {
  const w = 600;
  const h = 200;
  const padL = 32;
  const padB = 24;
  const padT = 10;
  const max = Math.max(...data);
  const stepX = (w - padL) / (data.length - 1);
  const pts = data.map((v, i) => {
    const x = padL + i * stepX;
    const y = padT + (1 - v / max) * (h - padT - padB);
    return [x, y] as const;
  });
  const path = pts
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ');
  const area = `${path} L ${pts[pts.length - 1][0]} ${h - padB} L ${padL} ${
    h - padB
  } Z`;

  return (
    <svg
      className="fn-curve"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      key={data.join(',')}
      aria-hidden
    >
      <defs>
        <linearGradient id="fn-curve-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={color} />
          <stop offset="1" stopColor={colorEnd} />
        </linearGradient>
        <linearGradient id="fn-curve-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.24" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((p, i) => (
        <line
          key={i}
          x1={padL}
          x2={w}
          y1={padT + p * (h - padT - padB)}
          y2={padT + p * (h - padT - padB)}
          stroke="var(--border-default)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
      ))}
      {[0, 0.5, 1].map((p, i) => (
        <text
          key={i}
          x={padL - 6}
          y={padT + (1 - p) * (h - padT - padB) + 3}
          fontSize="10"
          fill="var(--text-muted)"
          textAnchor="end"
          fontFamily="var(--font-data)"
        >
          {Math.round(p * max)}
        </text>
      ))}
      <path className="fn-curve-fill" d={area} />
      <path className="fn-curve-line" d={path} />
      <circle
        cx={pts[pts.length - 1][0]}
        cy={pts[pts.length - 1][1]}
        r="5"
        fill="#fff"
        stroke="url(#fn-curve-grad)"
        strokeWidth="3"
      />
    </svg>
  );
}

export const Section6Dashboard = () => {
  const t = useTranslations('features.dashboard');
  const [scope, setScope] = useState<'shop' | 'network'>('shop');

  const kpis = t.raw(`kpis.${scope}`) as Kpi[];
  const curve = scope === 'shop' ? CURVE_SHOP : CURVE_NETWORK;
  const highlights = t.raw('highlights') as Array<{ title: string; body: string }>;

  return (
    <section
      className="fn-section"
      id="dashboard"
      style={{ background: 'var(--bg-elevated)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Decorative background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(at 80% 10%, rgba(27,111,194,0.10), transparent 50%), radial-gradient(at 15% 90%, rgba(46,174,109,0.10), transparent 55%)',
        }}
      />

      <div className="fn-container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader
          title={
            <>
              {t('title')} <span className="hl-orange">{t('titleGradient')}</span>
              {t('titleSuffix')}
            </>
          }
          lead={<>{t('lead').split(':')[0] + ':'}<br />{t('lead').split(':').slice(1).join(':').trim()}</>}
          maxLead={620}
          center
        />

        <Reveal delay={2}>
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-default)',
              borderRadius: 28,
              padding: '28px',
              boxShadow: '0 24px 60px rgba(15,23,42,0.10)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 22,
                flexWrap: 'wrap',
                gap: 14,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'var(--gradient-primary)',
                    color: '#fff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                  }}
                >
                  📊
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 17,
                      color: 'var(--text-primary)',
                      lineHeight: 1.1,
                    }}
                  >
                    {t('card.title')}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    {scope === 'shop' ? t('card.shopSub') : t('card.networkSub')}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="fn-seg">
                  <button
                    className={scope === 'shop' ? 'active' : ''}
                    onClick={() => setScope('shop')}
                  >
                    {t('card.scopeShop')}
                  </button>
                  <button
                    className={scope === 'network' ? 'active' : ''}
                    onClick={() => setScope('network')}
                  >
                    {t('card.scopeNetwork')}
                  </button>
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 12px',
                    border: '1px solid var(--border-default)',
                    borderRadius: 9999,
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 11,
                    color: 'var(--text-secondary)',
                    background: 'var(--bg-surface)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {t('card.period')}
                  <IcChevDown size={12} />
                </div>
              </div>
            </div>

            {/* KPIs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 14,
                marginBottom: 22,
              }}
            >
              {kpis.map((k, i) => (
                <div
                  key={`${scope}-${k.label}`}
                  className="fn-kpi"
                  style={{
                    animation: `fn-kpi-pop 0.5s ${i * 0.04}s var(--ease-out-expo) both`,
                  }}
                >
                  <div
                    className="fn-kpi-icon"
                    style={{
                      background: `linear-gradient(135deg, ${KPI_COLORS[i]}, ${KPI_COLORS[i]}88)`,
                    }}
                  >
                    {KPI_ICONS[i]}
                  </div>
                  <div className="fn-kpi-label">{k.label}</div>
                  <div className="fn-kpi-value">{k.value}</div>
                  <div className="fn-kpi-trend">↑ {k.trend}</div>
                  <div className="fn-kpi-detail">
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: 11,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: 6,
                        opacity: 0.8,
                      }}
                    >
                      {k.label}
                    </div>
                    {k.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Curve */}
            <div
              style={{
                background: 'var(--bg-elevated)',
                borderRadius: 18,
                padding: '20px 22px 16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 14,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {t('card.engagementTitle')}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    {t('card.engagementSub')}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 11,
                      color: 'var(--text-secondary)',
                      fontFamily: 'var(--font-display)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 2,
                        background: 'var(--gradient-primary)',
                      }}
                    />
                    {t('card.legend')}
                  </span>
                </div>
              </div>
              <CurveChart data={curve} />
            </div>
          </div>
        </Reveal>

        {/* Highlights below */}
        <Reveal delay={3}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
              marginTop: 32,
            }}
          >
            {highlights.map((hl) => (
              <div
                key={hl.title}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 18,
                  padding: '18px 20px',
                  transition: 'transform .3s, box-shadow .3s, border-color .3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-highlight)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(27,111,194,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 15,
                    color: 'var(--text-primary)',
                    marginBottom: 6,
                  }}
                >
                  {hl.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-body)', lineHeight: 1.5 }}>
                  {hl.body}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
