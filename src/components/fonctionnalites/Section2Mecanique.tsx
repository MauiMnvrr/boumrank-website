'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Megaphone, Gift, Ticket, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';

type Block = {
  icon: React.ReactNode;
  label: string;
  title: string;
  body: string;
  bullets: string[];
  gradient: string;
  accent: string;
};

const blocks: Block[] = [
  {
    icon: <Gamepad2 size={24} />,
    label: 'Les jeux',
    title: '3 mécaniques calibrées pour la dopamine',
    body: 'Chaque jeu est conçu pour générer un pic émotionnel court et viral — le frisson qui pousse à partager.',
    bullets: [
      'Roue de la fortune — visuelle et universelle',
      'Machine à sous — frisson de l\'alignement',
      'Blackjack — pour la clientèle joueuse',
    ],
    gradient: 'linear-gradient(135deg, #1B6FC2 0%, #144F8C 100%)',
    accent: '#1B6FC2',
  },
  {
    icon: <Megaphone size={24} />,
    label: 'Les actions',
    title: 'Chaque partie commence par une action',
    body: 'Vous décidez ce que le client fait avant de jouer. Pas de loterie gratuite : du marketing déguisé en jeu.',
    bullets: [
      'Avis Google (vérification du pseudo automatique)',
      'Abonnement Instagram, TikTok, Facebook',
      'Opt-in newsletter / SMS',
      'Parrainage à un ami',
    ],
    gradient: 'linear-gradient(135deg, #1E9DAA 0%, #177A85 100%)',
    accent: '#1E9DAA',
  },
  {
    icon: <Gift size={24} />,
    label: 'Les lots & probabilités',
    title: 'Vous pilotez 100% de l\'économie',
    body: 'Chaque lot a sa probabilité, son minimum d\'achat, sa rareté. Pas de boîte noire — vous gardez la marge.',
    bullets: [
      'Lots illimités, libres à configurer',
      'Probabilités au pourcent près',
      'Minimum d\'achat par lot (ex : 5€)',
      'Rejouez la prochaine fois → boucle de retour',
    ],
    gradient: 'linear-gradient(135deg, #2EAE6D 0%, #1E8A52 100%)',
    accent: '#2EAE6D',
  },
  {
    icon: <Ticket size={24} />,
    label: 'Les coupons',
    title: 'Disponibles dès le lendemain. Forcent le retour.',
    body: 'Le client gagne aujourd\'hui, peut consommer demain. C\'est ce délai qui transforme un avis en client fidèle.',
    bullets: [
      'Date d\'expiration que vous fixez',
      'Disponible J+1 — pousse à revenir',
      'Lié à un compte, à usage unique',
      'Synchronisé temps réel multi-caisses',
    ],
    gradient: 'linear-gradient(135deg, #F28C28 0%, #D47318 100%)',
    accent: '#F28C28',
  },
];

export const Section2Mecanique = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[var(--bg-elevated)] overflow-hidden">
      {/* Big "2" decorative number */}
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
          <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            Vous configurez. Vos clients jouent.{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1E9DAA_0%,#2EAE6D_100%)]">
              Vous récoltez.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            Quatre briques qui s&apos;assemblent en{' '}
            <span className="text-[var(--text-primary)] font-semibold">
              un programme de fidélité gamifié
            </span>{' '}
            pilotable depuis votre téléphone.
          </p>
        </motion.div>

        {/* 2x2 grid wrapper card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <Card
            variant="glass"
            padding="lg"
            className="bg-[var(--bg-primary)] border-2 border-[var(--border-highlight)]"
          >
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {blocks.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Card
                    variant="solid"
                    padding="lg"
                    className="h-full relative overflow-hidden"
                    style={{ borderLeft: `4px solid ${b.accent}` }}
                  >
                    {/* Header — icon + label */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                        style={{ background: b.gradient }}
                      >
                        {b.icon}
                      </div>
                      <div
                        className="text-[10px] uppercase tracking-widest font-display font-extrabold"
                        style={{ color: b.accent }}
                      >
                        {b.label}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl md:text-2xl text-[var(--text-primary)] mb-3 leading-tight">
                      {b.title}
                    </h3>

                    {/* Body */}
                    <p className="text-sm md:text-base text-[var(--text-body)] leading-relaxed mb-5">
                      {b.body}
                    </p>

                    {/* Bullets */}
                    <ul className="space-y-2 pt-4 border-t border-[var(--border-default)]">
                      {b.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-[var(--text-body)] leading-snug"
                        >
                          <Check
                            size={14}
                            className="flex-shrink-0 mt-0.5"
                            style={{ color: b.accent }}
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
