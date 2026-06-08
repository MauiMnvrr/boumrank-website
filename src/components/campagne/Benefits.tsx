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
            <h2 className="cmp-h2">Ce que vous y gagnez</h2>
          </Reveal>
        </div>

        <Stagger className="cmp-bento">
          {/* Avis Google */}
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
                5/5
              </span>
              <Stars size={18} />
            </div>
            <h3 className="cmp-h3" style={{ marginTop: 10 }}>
              Votre note qui grimpe
            </h3>
            <p style={pStyle}>
              Chaque joueur génère des avis. Hissez-vous sur le podium des recherches
              locales.
            </p>
          </motion.div>

          {/* Référence locale */}
          <motion.div
            variants={staggerItem}
            className="cmp-card"
            style={cardStyle('rgba(46,174,109,0.35)')}
          >
            <AccentBar from="var(--primary-teal)" to="var(--primary-green)" />
            <div style={iconWrap('rgba(46,174,109,0.12)')}>
              <PodiumIcon />
            </div>
            <span
              className="cmp-data"
              style={{ fontSize: 34, color: 'var(--primary-green)' }}
            >
              Top 1
            </span>
            <h3 className="cmp-h3" style={{ marginTop: 10 }}>
              Devenez la référence
            </h3>
            <p style={pStyle}>
              88% des consommateurs consultent les avis Google avant de choisir un
              établissement.
            </p>
          </motion.div>

          {/* Auto-financement */}
          <motion.div
            variants={staggerItem}
            className="cmp-card"
            style={cardStyle('rgba(242,140,40,0.35)')}
          >
            <AccentBar from="var(--secondary-orange)" to="var(--secondary-orange-light)" />
            <div style={iconWrap('rgba(242,140,40,0.12)')}>
              <CycleIcon color="var(--secondary-orange)" />
            </div>
            <span
              className="cmp-data"
              style={{ fontSize: 34, color: 'var(--secondary-orange)' }}
            >
              +$
            </span>
            <h3 className="cmp-h3" style={{ marginTop: 10 }}>
              Ça s’auto-finance
            </h3>
            <p style={pStyle}>
              Pour récupérer sa récompense, le client doit consommer sous minimum
              d’achat.
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

/* Podium (classement local) */
function PodiumIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="var(--primary-green)" aria-hidden>
      <rect x="2.5" y="12.5" width="5.5" height="8.5" rx="1.2" />
      <rect x="9.25" y="6.5" width="5.5" height="14.5" rx="1.2" />
      <rect x="16" y="15" width="5.5" height="6" rx="1.2" />
      <path d="M12 1.3l.85 1.75 1.93.28-1.4 1.36.33 1.92L12 5.64l-1.71.95.33-1.92-1.4-1.36 1.93-.28z" />
    </svg>
  );
}

/* Cycle / boucle (auto-financement) */
function CycleIcon({ color = 'var(--primary-green)' }: { color?: string }) {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 2.1 21 6l-4 3.9" />
      <path d="M3 11V9.5A3.5 3.5 0 0 1 6.5 6H21" />
      <path d="M7 21.9 3 18l4-3.9" />
      <path d="M21 13v1.5a3.5 3.5 0 0 1-3.5 3.5H3" />
    </svg>
  );
}
