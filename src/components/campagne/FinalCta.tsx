'use client';

import { Reveal, Reassurance } from './primitives';
import { OfferButton } from './OfferModal';

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
              Réservez un appel de 15 minutes. On vous aide à paramétrer votre essai en
              15 min.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div style={{ marginTop: 32 }}>
              <OfferButton size="lg" variant="invert" pulse source="campagne_final">
                Débloquer mon mois offert
              </OfferButton>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div style={{ marginTop: 18 }}>
              <Reassurance tone="light" center />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
