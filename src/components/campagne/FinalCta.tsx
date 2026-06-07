'use client';

import { Reveal, CalCta, CheckIcon } from './primitives';

const reassure = ['15 minutes', 'Sans engagement', 'On vous montre tout en direct'];

export function FinalCta() {
  return (
    <section style={{ padding: '20px 16px 40px' }}>
      <div
        className="cmp-container"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 32,
          background: 'var(--gradient-primary)',
          padding: 'clamp(40px, 7vw, 72px) clamp(22px, 5vw, 64px)',
          textAlign: 'center',
          boxShadow: '0 30px 70px rgba(27,111,194,0.38)',
        }}
      >
        {/* halo décoratif */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: '-40%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120%',
            height: '120%',
            background:
              'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.25), transparent 55%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <h2
              className="cmp-h2"
              style={{ color: '#fff', maxWidth: 720, margin: '0 auto' }}
            >
              Prêt à faire jouer vos clients ?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="cmp-lead"
              style={{
                color: 'rgba(255,255,255,0.92)',
                margin: '16px auto 0',
                maxWidth: 540,
              }}
            >
              Réservez un appel de 15 minutes. On vous montre BoumRank en direct, sans
              engagement.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div style={{ marginTop: 32 }}>
              <CalCta size="lg" variant="invert" pulse source="campagne_final">
                Réserver mon appel de 15 min
              </CalCta>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <ul
              style={{
                marginTop: 24,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '10px 22px',
                listStyle: 'none',
                padding: 0,
              }}
            >
              {reassure.map((r) => (
                <li
                  key={r}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.95)',
                  }}
                >
                  <span style={{ display: 'inline-flex' }}>
                    <CheckIcon size={15} />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
