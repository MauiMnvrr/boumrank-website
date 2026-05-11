'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';

type Visual = 'wheel' | 'actions' | 'probabilities' | 'coupon';

type Step = {
  number: string;
  label: string;
  title: string;
  body: string;
  bullets: string[];
  accent: string;
  accentSoft: string;
  visual: Visual;
  kpi: { value: string; label: string };
};

// TODO: replace KPI values with real beta numbers
const steps: Step[] = [
  {
    number: '01',
    label: 'Les jeux',
    title: '3 mécaniques calibrées pour la dopamine',
    body: 'Chaque jeu génère un pic émotionnel court et viral : le frisson qui pousse à partager.',
    bullets: [
      'Roue de la fortune : visuelle et universelle',
      'Machine à sous : frisson de l’alignement',
      'Blackjack : pour la clientèle joueuse',
    ],
    accent: '#1B6FC2',
    accentSoft: 'rgba(27, 111, 194, 0.12)',
    visual: 'wheel',
    kpi: { value: '+187 %', label: 'd’engagement vs sondage' },
  },
  {
    number: '02',
    label: 'Les actions',
    title: 'Chaque partie commence par une action',
    body: 'Vous décidez ce que le client fait avant de jouer. Pas de loterie gratuite : du marketing déguisé en jeu.',
    bullets: [
      'Avis Google avec vérification automatique',
      'Abonnement Instagram, TikTok, Facebook',
      'Opt‑in newsletter ou SMS',
      'Parrainage à un ami',
    ],
    accent: '#1E9DAA',
    accentSoft: 'rgba(30, 157, 170, 0.12)',
    visual: 'actions',
    kpi: { value: '4,8 / 5', label: 'note Google moyenne en bêta' },
  },
  {
    number: '03',
    label: 'Lots & probabilités',
    title: 'Vous pilotez 100 % de l’économie',
    body: 'Chaque lot a sa probabilité, son minimum d’achat, sa rareté. Vous gardez la marge à la centaine près.',
    bullets: [
      'Lots illimités, libres à configurer',
      'Probabilités au pourcent près',
      'Minimum d’achat par lot (ex : 5 €)',
      'Rejouez la prochaine fois : boucle de retour',
    ],
    accent: '#2EAE6D',
    accentSoft: 'rgba(46, 174, 109, 0.12)',
    visual: 'probabilities',
    kpi: { value: '−12 %', label: 'de coût d’acquisition client' },
  },
  {
    number: '04',
    label: 'Les coupons',
    title: 'Disponibles dès le lendemain. Ramènent le client.',
    body: 'Le client gagne aujourd’hui, peut consommer demain. C’est ce délai qui transforme un avis en client fidèle.',
    bullets: [
      'Date d’expiration que vous fixez',
      'Disponible J+1 : pousse à revenir',
      'Lié à un compte, à usage unique',
      'Synchronisé temps réel multi‑caisses',
    ],
    accent: '#F28C28',
    accentSoft: 'rgba(242, 140, 40, 0.12)',
    visual: 'coupon',
    kpi: { value: '63 %', label: 'de coupons activés en boutique' },
  },
];

/* ---------- Visual primitives ---------- */

const WheelVisual = ({ accent }: { accent: string }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative w-28 h-28 mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="w-full h-full rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
        style={{
          background:
            'conic-gradient(from 0deg, #1B6FC2 0% 16%, #1E9DAA 16% 33%, #2EAE6D 33% 50%, #F28C28 50% 66%, #1B6FC2 66% 83%, #2EAE6D 83% 100%)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: hovered ? 2 : 9, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-[34%] rounded-full bg-[var(--bg-surface)] shadow-md flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: accent }} />
      </div>
      <div
        className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 z-10"
        style={{
          borderLeft: '7px solid transparent',
          borderRight: '7px solid transparent',
          borderTop: `11px solid ${accent}`,
        }}
      />
    </div>
  );
};

const ActionsVisual = () => {
  const items = [
    { letter: 'G', color: '#4285F4', x: 8, y: 12 },
    { letter: 'IG', color: '#E1306C', x: 36, y: 50 },
    { letter: 'f', color: '#1877F2', x: 60, y: 8 },
    { letter: 'TT', color: '#111111', x: 78, y: 48 },
  ];
  return (
    <div className="relative w-full h-28">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-12 rounded-full text-white font-display font-extrabold flex items-center justify-center text-sm shadow-[0_8px_16px_rgba(0,0,0,0.18)]"
          style={{
            background: item.color,
            left: `${item.x}%`,
            top: `${item.y}%`,
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 2.4 + i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.25,
          }}
        >
          {item.letter}
        </motion.div>
      ))}
      {/* faint connection lines hint */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M 14 18 Q 30 10 42 56 Q 55 70 66 14 Q 75 30 84 54"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            fill="none"
            className="text-[var(--text-muted)]"
          />
        </svg>
      </div>
    </div>
  );
};

const ProbabilitiesVisual = ({ accent }: { accent: string }) => {
  const bars = [
    { label: 'Café offert', pct: 50 },
    { label: '−10 %', pct: 30 },
    { label: 'Menu', pct: 15 },
    { label: 'Jackpot', pct: 5 },
  ];
  return (
    <div className="relative w-full h-28 px-2 flex flex-col justify-center gap-2">
      {bars.map((bar, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-16 text-[10px] text-[var(--text-secondary)] truncate">
            {bar.label}
          </span>
          <div className="flex-1 h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${accent}, ${accent}99)`,
              }}
              initial={{ width: 0 }}
              whileInView={{ width: `${bar.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: 'easeOut' }}
            />
          </div>
          <span
            className="w-9 text-right font-data font-bold text-[10px] text-[var(--text-primary)]"
          >
            {bar.pct} %
          </span>
        </div>
      ))}
    </div>
  );
};

const CouponVisual = ({ accent }: { accent: string }) => (
  <div className="relative w-full h-28 flex items-center justify-center">
    <motion.div
      className="relative bg-[var(--bg-surface)] rounded-xl px-5 py-3 border-2"
      style={{ borderColor: accent, color: accent }}
      animate={{
        boxShadow: [
          '0 8px 24px rgba(242,140,40,0.18)',
          '0 8px 36px rgba(242,140,40,0.45)',
          '0 8px 24px rgba(242,140,40,0.18)',
        ],
      }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* notches */}
      <div
        className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--bg-primary)]"
        style={{ border: `2px solid ${accent}`, borderLeft: 'none', borderTop: 'none', borderBottom: 'none' }}
      />
      <div
        className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--bg-primary)]"
        style={{ border: `2px solid ${accent}`, borderRight: 'none', borderTop: 'none', borderBottom: 'none' }}
      />
      <div className="text-center">
        <div className="text-[8px] uppercase tracking-widest font-display font-extrabold opacity-70">
          Boum coupon
        </div>
        <div className="font-display font-extrabold text-2xl mt-0.5 leading-none">−20 %</div>
        <div
          className="border-t border-dashed mt-1.5 pt-1 text-[8px] font-medium opacity-80"
          style={{ borderColor: accent }}
        >
          Valide dès demain
        </div>
      </div>
    </motion.div>
  </div>
);

const VisualByKey = ({ which, accent }: { which: Visual; accent: string }) => {
  switch (which) {
    case 'wheel':
      return <WheelVisual accent={accent} />;
    case 'actions':
      return <ActionsVisual />;
    case 'probabilities':
      return <ProbabilitiesVisual accent={accent} />;
    case 'coupon':
      return <CouponVisual accent={accent} />;
  }
};

/* ---------- Main section ---------- */

export const Section2Mecanique = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[var(--bg-elevated)] overflow-hidden">
      {/* subtle gradient halo */}
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(30,157,170,0.18) 0%, rgba(46,174,109,0.10) 40%, transparent 70%)',
        }}
      />

      {/* big "2" decorative */}
      <div className="absolute top-8 right-4 md:right-12 font-display font-extrabold text-[20rem] md:text-[28rem] leading-none opacity-[0.04] select-none pointer-events-none text-[var(--primary-teal)]">
        2
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Eyebrow variant="subtle" size="md" className="mb-5">
            Section 2 · La mécanique
          </Eyebrow>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-5 text-[var(--text-primary)]">
            Vous configurez. Vos clients jouent.{' '}
            <span className="text-gradient">Vous récoltez.</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            Quatre éléments qui s&apos;assemblent en{' '}
            <span className="text-[var(--text-primary)] font-semibold">
              un programme de fidélité gamifié
            </span>{' '}
            pilotable depuis votre téléphone.
          </p>
        </motion.div>

        {/* Horizontal 4-step flow */}
        <div className="relative max-w-7xl mx-auto">
          {/* progression line — desktop only */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            className="hidden lg:block absolute left-[6%] right-[6%] top-[110px] h-[3px] rounded-full origin-left z-0"
            style={{
              background:
                'linear-gradient(90deg, #1B6FC2 0%, #1E9DAA 33%, #2EAE6D 66%, #F28C28 100%)',
              opacity: 0.55,
            }}
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group relative rounded-2xl overflow-hidden"
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'var(--glass-blur)',
                  WebkitBackdropFilter: 'var(--glass-blur)',
                  border: '1px solid var(--glass-border)',
                  boxShadow: 'var(--glass-shadow)',
                  borderTop: `4px solid ${step.accent}`,
                }}
              >
                {/* subtle accent halo on hover */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(60% 50% at 50% 0%, ${step.accentSoft} 0%, transparent 70%)`,
                  }}
                />

                <div className="relative p-6 flex flex-col h-full">
                  {/* Step header — number + label pill */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="font-display font-extrabold text-4xl tracking-tight leading-none"
                      style={{
                        background: `linear-gradient(135deg, ${step.accent} 0%, ${step.accent}88 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {step.number}
                    </div>
                    <div
                      className="font-display font-extrabold uppercase tracking-widest text-[10px] px-2.5 py-1 rounded-full"
                      style={{
                        color: step.accent,
                        background: step.accentSoft,
                        border: `1px solid ${step.accent}33`,
                      }}
                    >
                      {step.label}
                    </div>
                  </div>

                  {/* Visual */}
                  <div className="mb-6 h-28 flex items-center justify-center">
                    <VisualByKey which={step.visual} accent={step.accent} />
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg leading-tight mb-3 text-[var(--text-primary)]">
                    {step.title}
                  </h3>

                  {/* Body */}
                  <p className="text-sm text-[var(--text-body)] leading-relaxed mb-4">
                    {step.body}
                  </p>

                  {/* Bullets — no separator above */}
                  <ul className="space-y-2 mb-5 flex-1">
                    {step.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-xs leading-snug text-[var(--text-body)]"
                      >
                        <Check
                          size={12}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: step.accent }}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* KPI footer */}
                  <div
                    className="mt-auto pt-3 flex items-baseline justify-between gap-2"
                    style={{ borderTop: '1px dashed var(--border-default)' }}
                  >
                    <div
                      className="font-data font-extrabold text-2xl leading-none whitespace-nowrap"
                      style={{ color: step.accent }}
                    >
                      {step.kpi.value}
                    </div>
                    <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider text-right max-w-[60%] leading-tight">
                      {step.kpi.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
