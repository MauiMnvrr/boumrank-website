'use client';

import {
  Reveal,
  Stagger,
  staggerItem,
  Stars,
  QrCode,
  GoogleGlyph,
} from './primitives';
import { motion } from 'framer-motion';

type Step = {
  n: number;
  title: string;
  text: string;
  visual: React.ReactNode;
};

const steps: Step[] = [
  {
    n: 1,
    title: 'Le client scanne',
    text: 'Un QR code sur la table, le comptoir ou le ticket de caisse.',
    visual: <QrCode />,
  },
  {
    n: 2,
    title: 'Il joue pour gagner',
    text: 'Roue, machine à sous ou blackjack. C’est fun, il veut gagner.',
    visual: <MiniWheel />,
  },
  {
    n: 3,
    title: 'Il laisse un avis 5★',
    text: 'Pour jouer, il poste un avis Google. Votre note locale grimpe.',
    visual: <ReviewBubble />,
  },
  {
    n: 4,
    title: 'Il revient le chercher',
    text: 'Sa récompense l’attend en boutique. Il revient, il consomme.',
    visual: <CouponMini />,
  },
];

export function Loop() {
  return (
    <section className="cmp-section" style={{ background: 'var(--bg-surface)' }}>
      <div className="cmp-container">
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 44px' }}>
          <Reveal>
            <span className="cmp-eyebrow">Comment ça marche</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="cmp-h2" style={{ marginTop: 16 }}>
              Une boucle qui tourne toute seule.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="cmp-lead" style={{ marginTop: 14 }}>
              Quatre étapes, zéro friction. Vos clients jouent, vous récoltez.
            </p>
          </Reveal>
        </div>

        <Stagger className="cmp-loop-grid">
          {steps.map((s) => (
            <motion.div
              key={s.n}
              variants={staggerItem}
              className="cmp-card"
              style={{
                padding: '24px 22px 26px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span className="cmp-step-num">{s.n}</span>
              <div
                style={{
                  height: 132,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '18px 0 16px',
                }}
              >
                {s.visual}
              </div>
              <h3 className="cmp-h3">{s.title}</h3>
              <p
                style={{
                  marginTop: 8,
                  fontSize: 14.5,
                  lineHeight: 1.5,
                  color: 'var(--text-body)',
                }}
              >
                {s.text}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---- mini visuels ---- */
function MiniWheel() {
  return (
    <div className="cmp-wheel" style={{ width: 124 }} aria-hidden>
      <span className="cmp-wheel-arrow" />
      <span className="cmp-wheel-disc" />
      <span className="cmp-wheel-hub" style={{ fontSize: 14 }}>
        🎁
      </span>
    </div>
  );
}

function ReviewBubble() {
  return (
    <div
      className="cmp-card"
      style={{
        padding: '14px 16px',
        width: '100%',
        maxWidth: 200,
        boxShadow: '0 12px 28px rgba(15,23,42,0.10)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <GoogleGlyph size={18} />
        <span
          style={{
            fontFamily: 'var(--font-plus-jakarta), sans-serif',
            fontWeight: 700,
            fontSize: 12,
            color: 'var(--text-primary)',
          }}
        >
          Avis Google
        </span>
      </div>
      <Stars size={17} />
      <div
        style={{
          marginTop: 9,
          height: 7,
          width: '90%',
          borderRadius: 4,
          background: 'var(--bg-elevated)',
        }}
      />
      <div
        style={{
          marginTop: 6,
          height: 7,
          width: '65%',
          borderRadius: 4,
          background: 'var(--bg-elevated)',
        }}
      />
    </div>
  );
}

function CouponMini() {
  return (
    <div className="cmp-coupon" style={{ width: '100%', maxWidth: 200 }}>
      <span className="cmp-coupon-shimmer" />
      <div
        style={{
          fontFamily: 'var(--font-plus-jakarta), sans-serif',
          fontWeight: 800,
          fontSize: 22,
          lineHeight: 1,
        }}
      >
        Café offert
      </div>
      <div style={{ fontSize: 11.5, opacity: 0.92, marginTop: 6 }}>
        À récupérer en boutique
      </div>
    </div>
  );
}
