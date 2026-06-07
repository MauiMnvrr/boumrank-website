'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Reveal,
  PhoneFrame,
  Stars,
  GoogleGlyph,
  QrCode,
  CheckIcon,
  screenCtaStyle,
} from './primitives';

type Tab = 'jeu' | 'avis' | 'recompense';
const tabs: { id: Tab; label: string }[] = [
  { id: 'jeu', label: 'Le jeu' },
  { id: 'avis', label: 'L’avis' },
  { id: 'recompense', label: 'Récompense' },
];

export function Showcase() {
  const [tab, setTab] = useState<Tab>('jeu');

  return (
    <section className="cmp-section" style={{ background: 'var(--bg-surface)' }}>
      <div className="cmp-container">
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 40px' }}>
          <Reveal>
            <span className="cmp-eyebrow">À quoi ça ressemble</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="cmp-h2" style={{ marginTop: 16 }}>
              Pensé pour le commerce de proximité.
            </h2>
          </Reveal>
        </div>

        <div className="cmp-show-grid">
          {/* Scène d'ambiance (placement réel) */}
          <Reveal>
            <AmbianceScene />
          </Reveal>

          {/* Téléphone interactif */}
          <Reveal delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Onglets (boutons bascules) */}
              <div
                role="group"
                aria-label="Aperçu de l’expérience"
                style={{
                  display: 'flex',
                  gap: 6,
                  padding: 5,
                  borderRadius: 9999,
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-default)',
                  marginBottom: 24,
                  width: '100%',
                  maxWidth: 340,
                }}
              >
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className="cmp-tab"
                    aria-pressed={tab === t.id}
                    onClick={() => setTab(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <PhoneFrame>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.28 }}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                  >
                    {tab === 'jeu' && <ScreenJeu />}
                    {tab === 'avis' && <ScreenAvis />}
                    {tab === 'recompense' && <ScreenRecompense />}
                  </motion.div>
                </AnimatePresence>
              </PhoneFrame>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =========================== Scène ambiance =========================== */
function AmbianceScene() {
  return (
    <div className="cmp-scene" style={{ padding: 28, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <span className="cmp-scene-grain" />

      {/* Chevalet QR posé sur la table */}
      <div
        className="cmp-float"
        style={{
          position: 'relative',
          alignSelf: 'center',
          marginTop: 8,
          background: '#fff',
          borderRadius: 18,
          padding: '18px 20px',
          textAlign: 'center',
          boxShadow: '0 24px 50px rgba(0,0,0,0.35)',
          width: 200,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-plus-jakarta), sans-serif',
            fontWeight: 800,
            fontSize: 15,
            color: 'var(--text-primary)',
          }}
        >
          Scannez &amp; jouez
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', margin: '4px 0 12px' }}>
          Tentez de gagner une récompense
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <QrCode />
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, marginTop: 24 }}>
        <div
          style={{
            color: '#fff',
            fontFamily: 'var(--font-plus-jakarta), sans-serif',
            fontWeight: 800,
            fontSize: 18,
            lineHeight: 1.2,
          }}
        >
          Sur la table, au comptoir, sur le ticket.
        </div>
        <div style={{ color: 'rgba(255,255,255,0.92)', fontSize: 13.5, marginTop: 6 }}>
          Un simple QR code, et vos clients jouent là où ils sont.
        </div>
      </div>
    </div>
  );
}

/* =========================== Écrans =========================== */
function ScreenShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '6px 18px 20px' }}>
      {children}
    </div>
  );
}

function ScreenJeu() {
  return (
    <ScreenShell>
      <p style={titleSm}>Tournez la roue</p>
      <div className="cmp-wheel" style={{ margin: '14px auto 18px' }} aria-hidden>
        <span className="cmp-wheel-arrow" />
        <span className="cmp-wheel-disc" />
        <span className="cmp-wheel-hub">🎁</span>
      </div>
      <div style={screenCtaStyle}>Je tente ma chance</div>
    </ScreenShell>
  );
}

function ScreenAvis() {
  return (
    <ScreenShell>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
        <GoogleGlyph size={22} />
        <span style={titleSm}>Votre avis</span>
      </div>
      <div style={{ marginBottom: 14 }}>
        <Stars size={26} />
      </div>
      {[100, 88, 70].map((w, i) => (
        <div
          key={i}
          style={{
            height: 9,
            width: `${w}%`,
            borderRadius: 5,
            background: 'var(--bg-elevated)',
            marginBottom: 9,
          }}
        />
      ))}
      <div style={{ ...screenCtaStyle, marginTop: 'auto' }}>Publier mon avis</div>
    </ScreenShell>
  );
}

function ScreenRecompense() {
  return (
    <ScreenShell>
      <p style={{ ...titleSm, textAlign: 'center', marginBottom: 14 }}>
        Vous avez gagné <span aria-hidden>🎉</span>
      </p>
      <div className="cmp-coupon" style={{ textAlign: 'center', padding: '22px 18px' }}>
        <span className="cmp-coupon-shimmer" />
        <div style={{ fontSize: 30 }} aria-hidden>
          🎁
        </div>
        <div
          style={{
            fontFamily: 'var(--font-plus-jakarta), sans-serif',
            fontWeight: 800,
            fontSize: 22,
            marginTop: 6,
          }}
        >
          Café offert
        </div>
        <div style={{ fontSize: 12, opacity: 0.92, marginTop: 4 }}>
          Code : BOUM-7K2
        </div>
      </div>
      <div
        style={{
          marginTop: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          justifyContent: 'center',
          fontSize: 12.5,
          fontWeight: 600,
          color: 'var(--primary-green-dark)',
        }}
      >
        <span style={{ display: 'inline-flex' }}>
          <CheckIcon size={15} />
        </span>
        À récupérer en boutique
      </div>
    </ScreenShell>
  );
}

const titleSm: React.CSSProperties = {
  fontFamily: 'var(--font-plus-jakarta), sans-serif',
  fontWeight: 800,
  fontSize: 16,
  color: 'var(--text-primary)',
  margin: 0,
};
