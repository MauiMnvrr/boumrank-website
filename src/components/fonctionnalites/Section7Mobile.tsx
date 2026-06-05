'use client';

import { useTranslations } from 'next-intl';
import { Reveal, SectionHeader, IcGoogle, IcInsta, IcMail, IcCheck } from './shared';

const HUB_ICON = '/fonctionnalites/icon-gradient-eclats.png';

function ScreenScan({ step, title, body }: { step: string; title: string; body: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 20,
        background: 'linear-gradient(180deg, #fdfdff 0%, #f4f6fb 100%)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--text-muted)',
          marginBottom: 14,
        }}
      >
        {step}
      </div>
      <div
        style={{
          width: 110,
          height: 110,
          borderRadius: 18,
          padding: 10,
          background: 'var(--gradient-primary)',
          boxShadow: '0 14px 30px rgba(27,111,194,0.25)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#fff',
            borderRadius: 10,
            backgroundImage:
              'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)',
            backgroundSize: '10px 10px',
            opacity: 0.95,
          }}
        />
      </div>
      <h4
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 18,
          color: 'var(--text-primary)',
          margin: '20px 0 4px',
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontSize: 12,
          color: 'var(--text-secondary)',
          textAlign: 'center',
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {body}
      </p>
    </div>
  );
}

function ScreenAction({
  step,
  title,
  platforms,
}: {
  step: string;
  title: string;
  platforms: string[];
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: 20,
        background: 'linear-gradient(180deg, #fdfdff 0%, #f4f6fb 100%)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--text-muted)',
          marginBottom: 14,
          textAlign: 'center',
        }}
      >
        {step}
      </div>
      <h4
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 18,
          color: 'var(--text-primary)',
          margin: '0 0 14px',
          textAlign: 'center',
        }}
      >
        {title}
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div
          style={{
            background: '#fff',
            border: '1px solid var(--border-default)',
            borderRadius: 12,
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
          }}
        >
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: '#fff',
              border: '1px solid var(--border-default)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IcGoogle size={14} />
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 12,
              color: 'var(--text-primary)',
            }}
          >
            {platforms[0]}
          </span>
          <span
            style={{
              marginLeft: 'auto',
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: 'var(--primary-green)',
              color: '#fff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IcCheck size={10} />
          </span>
        </div>
        <div
          style={{
            background: '#fff',
            border: '1px solid var(--border-default)',
            borderRadius: 12,
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            opacity: 0.55,
          }}
        >
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: 'linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)',
              color: '#fff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IcInsta size={12} />
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 12,
              color: 'var(--text-primary)',
            }}
          >
            {platforms[1]}
          </span>
        </div>
        <div
          style={{
            background: '#fff',
            border: '1px solid var(--border-default)',
            borderRadius: 12,
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            opacity: 0.55,
          }}
        >
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: 'linear-gradient(135deg,#1B6FC2,#2EAE6D)',
              color: '#fff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IcMail size={12} />
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 12,
              color: 'var(--text-primary)',
            }}
          >
            {platforms[2]}
          </span>
        </div>
      </div>
    </div>
  );
}

function ScreenPlay({
  step,
  cta,
  body,
}: {
  step: string;
  cta: string;
  body: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        padding: '26px 20px 18px',
        background: 'linear-gradient(180deg, #fdfdff 0%, #f4f6fb 100%)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--text-muted)',
        }}
      >
        {step}
      </div>
      <div className="fn-wheel" style={{ width: 140, height: 140 }}>
        <div className="fn-wheel-arrow" />
        <div
          className="fn-wheel-disc"
          style={{ animation: 'fn-spin-slow 12s linear infinite', transition: 'none' }}
        />
        <div className="fn-wheel-hub" style={{ width: 32, height: 32 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HUB_ICON} alt="" style={{ width: 22, height: 22 }} />
        </div>
      </div>
      <div style={{ width: '100%' }}>
        <div
          style={{
            background: 'var(--gradient-primary)',
            color: '#fff',
            borderRadius: 12,
            padding: '12px 0',
            textAlign: 'center',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 13,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            boxShadow: '0 8px 18px rgba(27,111,194,0.3)',
          }}
        >
          {cta}
        </div>
        <p
          style={{
            fontSize: 11,
            color: 'var(--text-secondary)',
            textAlign: 'center',
            margin: '10px 0 0',
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

export const Section7Mobile = () => {
  const t = useTranslations('features.mobile');
  const badges = t.raw('badges') as Array<{ label: string; emoji: string }>;
  const bullets = t.raw('bullets') as Array<{ title: string; body: string }>;
  const actionPlatforms = t.raw('screens.action.platforms') as string[];

  const screens = [
    {
      label: 'scan',
      node: (
        <ScreenScan
          step={t('screens.scan.step')}
          title={t('screens.scan.title')}
          body={t('screens.scan.body')}
        />
      ),
    },
    {
      label: 'action',
      node: (
        <ScreenAction
          step={t('screens.action.step')}
          title={t('screens.action.title')}
          platforms={actionPlatforms}
        />
      ),
    },
    {
      label: 'play',
      node: (
        <ScreenPlay
          step={t('screens.play.step')}
          cta={t('screens.play.cta')}
          body={t('screens.play.body')}
        />
      ),
    },
  ];

  return (
    <section className="fn-section" id="mobile" style={{ background: 'var(--bg-primary)' }}>
      <div className="fn-container">
        <div className="fn-twocol">
          <div>
            <SectionHeader
              title={
                <>
                  {t('title')} <span className="hl">{t('titleGradient')}</span>
                  {t('titleSuffix')}
                </>
              }
              lead={t('lead')}
              maxLead={520}
            />

            <Reveal delay={2}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 10,
                  marginBottom: 28,
                }}
              >
                {badges.map((b) => (
                  <span key={b.label} className="fn-badge" style={{ padding: '8px 14px' }}>
                    <span style={{ fontSize: 14 }}>{b.emoji}</span> {b.label}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={3}>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                {bullets.map((b) => (
                  <li
                    key={b.title}
                    style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: 'var(--primary-green)',
                        color: '#fff',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      <IcCheck size={12} />
                    </span>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: 15,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {b.title}
                      </div>
                      <div
                        style={{ fontSize: 14, color: 'var(--text-body)', lineHeight: 1.5 }}
                      >
                        {b.body}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={2}>
            <div
              className="s7-phones"
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 18,
                position: 'relative',
                paddingTop: 12,
              }}
            >
              {screens.map(({ label, node }, i) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 12,
                    transform: `translateY(${i === 1 ? 0 : 10}px)`,
                  }}
                >
                  <div className="fn-phone" style={{ width: 200, height: 410 }}>
                    <div className="fn-phone-screen">{node}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .s7-phones { flex-wrap: wrap; gap: 12px !important; }
        }
      `}</style>
    </section>
  );
};
