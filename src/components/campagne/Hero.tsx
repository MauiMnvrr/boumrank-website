'use client';

import {
  Reveal,
  CalCta,
  Stars,
  PhoneFrame,
  GoogleGlyph,
  screenCtaStyle,
} from './primitives';

export function Hero() {
  return (
    <section className="cmp-section" style={{ paddingTop: 40, paddingBottom: 56 }}>
      <div className="cmp-aurora">
        <span className="cmp-blob cmp-blob-1" />
        <span className="cmp-blob cmp-blob-2" />
      </div>
      <div className="cmp-grain" />

      <div className="cmp-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="cmp-hero-grid">
          {/* Colonne texte */}
          <div>
            <Reveal>
              <h1 className="cmp-h1">
                Transformez chaque client en{' '}
                <span className="cmp-grad-text">avis 5★</span> et en{' '}
                <span className="cmp-grad-text">habitué</span>.
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <div style={{ marginTop: 28 }}>
                <CalCta size="lg" pulse source="campagne_hero">
                  Réserver mon appel de 15 min
                </CalCta>
              </div>
            </Reveal>
          </div>

          {/* Colonne visuel */}
          <Reveal delay={0.15}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
              <div className="cmp-phone-wrap">
                <PhoneFrame>
                  <HeroWheelScreen />
                </PhoneFrame>

                {/* Puce flottante : avis */}
                <div className="cmp-fchip cmp-float cmp-fchip-tl">
                  <GoogleGlyph size={18} />
                  <span>+1 avis</span>
                  <Stars size={13} />
                </div>

                {/* Puce flottante : récompense */}
                <div className="cmp-fchip cmp-float-2 cmp-fchip-br">
                  <span aria-hidden style={{ fontSize: 16 }}>
                    🎁
                  </span>
                  <span>Café offert</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Écran téléphone : roue */
function HeroWheelScreen() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '6px 18px 18px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          marginBottom: 14,
        }}
      >
        <span
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            background: 'var(--gradient-primary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 15,
          }}
          aria-hidden
        >
          🍽️
        </span>
        <div style={{ lineHeight: 1.1 }}>
          <div
            style={{
              fontFamily: 'var(--font-plus-jakarta), sans-serif',
              fontWeight: 800,
              fontSize: 13,
              color: 'var(--text-primary)',
            }}
          >
            Le Bistrot du Coin
          </div>
          <div style={{ fontSize: 10.5, color: 'var(--text-secondary)' }}>
            Tournez &amp; gagnez
          </div>
        </div>
      </div>

      <div className="cmp-wheel" style={{ margin: '8px auto 16px' }} aria-hidden>
        <span className="cmp-wheel-arrow" />
        <span className="cmp-wheel-disc" />
        <span className="cmp-wheel-hub">🎁</span>
      </div>

      <div style={screenCtaStyle}>Je tente ma chance</div>

      <div
        style={{
          marginTop: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          padding: '9px 11px',
          borderRadius: 13,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
        }}
      >
        <GoogleGlyph size={18} />
        <span
          style={{
            fontSize: 10.5,
            fontWeight: 600,
            color: 'var(--text-body)',
            lineHeight: 1.25,
            flex: 1,
          }}
        >
          Laissez un avis pour jouer
        </span>
        <Stars size={11} />
      </div>
    </div>
  );
}
