'use client';

import { motion } from 'framer-motion';
import { Reveal, Stagger, staggerItem, Stars, GoogleGlyph } from './primitives';

export function Benefits() {
  return (
    <section className="cmp-section">
      <div className="cmp-aurora">
        <span className="cmp-blob cmp-blob-3" />
      </div>

      <div className="cmp-container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 44px' }}>
          <Reveal>
            <span className="cmp-eyebrow">Pourquoi ça marche</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="cmp-h2" style={{ marginTop: 16 }}>
              Plus de visibilité. Plus de clients fidèles.
            </h2>
          </Reveal>
        </div>

        <Stagger className="cmp-bento">
          {/* Note Google */}
          <motion.div
            variants={staggerItem}
            className="cmp-card"
            style={cardStyle('rgba(27,111,194,0.35)')}
          >
            <AccentBar from="var(--primary-blue)" to="var(--primary-teal)" />
            <div style={iconWrap('rgba(27,111,194,0.10)')}>
              <GoogleGlyph size={26} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
              <span
                className="cmp-data"
                style={{ fontSize: 34, color: 'var(--primary-blue)' }}
              >
                5,0
              </span>
              <Stars size={18} />
            </div>
            <h3 className="cmp-h3" style={{ marginTop: 10 }}>
              Votre note qui grimpe
            </h3>
            <p style={pStyle}>
              Chaque partie peut générer un avis 5★. Vous remontez dans les recherches
              locales.
            </p>
          </motion.div>

          {/* Fidélité */}
          <motion.div
            variants={staggerItem}
            className="cmp-card"
            style={cardStyle('rgba(46,174,109,0.35)')}
          >
            <AccentBar from="var(--primary-teal)" to="var(--primary-green)" />
            <div style={iconWrap('rgba(46,174,109,0.12)')}>
              <LoopIcon />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-plus-jakarta), sans-serif',
                fontWeight: 800,
                fontSize: 30,
                color: 'var(--primary-green)',
                lineHeight: 1,
              }}
            >
              + de visites
            </span>
            <h3 className="cmp-h3" style={{ marginTop: 10 }}>
              Ils reviennent
            </h3>
            <p style={pStyle}>
              La récompense à récupérer sur place fait revenir vos clients en boutique.
            </p>
          </motion.div>

          {/* Zéro friction */}
          <motion.div
            variants={staggerItem}
            className="cmp-card"
            style={cardStyle('rgba(242,140,40,0.35)')}
          >
            <AccentBar from="var(--secondary-orange)" to="var(--secondary-orange-light)" />
            <div style={iconWrap('rgba(242,140,40,0.12)')}>
              <BoltIcon />
            </div>
            <span
              className="cmp-data"
              style={{ fontSize: 34, color: 'var(--secondary-orange)' }}
            >
              5 sec
            </span>
            <h3 className="cmp-h3" style={{ marginTop: 10 }}>
              Sans appli, sans compte
            </h3>
            <p style={pStyle}>
              On scanne, on joue. Rien à installer pour le client, rien à gérer pour vous.
            </p>
          </motion.div>
        </Stagger>
      </div>
    </section>
  );
}

function cardStyle(border: string): React.CSSProperties {
  return {
    position: 'relative',
    padding: '30px 26px 28px',
    overflow: 'hidden',
    borderColor: border,
  };
}

const pStyle: React.CSSProperties = {
  marginTop: 8,
  fontSize: 14.5,
  lineHeight: 1.55,
  color: 'var(--text-body)',
};

function iconWrap(bg: string): React.CSSProperties {
  return {
    width: 56,
    height: 56,
    borderRadius: 16,
    background: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  };
}

function AccentBar({ from, to }: { from: string; to: string }) {
  return (
    <span
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: `linear-gradient(90deg, ${from}, ${to})`,
      }}
    />
  );
}

function LoopIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="var(--primary-green)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 2.1 21 6l-4 3.9" />
      <path d="M3 11V9.5A3.5 3.5 0 0 1 6.5 6H21" />
      <path d="M7 21.9 3 18l4-3.9" />
      <path d="M21 13v1.5a3.5 3.5 0 0 1-3.5 3.5H3" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="var(--secondary-orange)" aria-hidden>
      <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13z" />
    </svg>
  );
}
