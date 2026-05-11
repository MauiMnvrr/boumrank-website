'use client';

import { motion } from 'framer-motion';
import { Heart, Zap, MapPin } from 'lucide-react';

const PILLARS = [
  {
    icon: Heart,
    title: 'Humain.',
    body: "On ne vend pas un outil, on s'occupe de votre marketing comme un associé.",
  },
  {
    icon: Zap,
    title: 'Automatique.',
    body: 'Vous ne touchez à rien. Tout tourne en arrière-plan, tous les jours.',
  },
  {
    icon: MapPin,
    title: 'Local.',
    body: 'Construit pour les commerces de proximité français, en France.',
  },
];

export function AProposMission() {
  return (
    <section className="bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-5xl"
        >
          Notre mission.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 max-w-3xl font-display text-xl font-semibold leading-snug text-[var(--text-primary)] md:text-3xl"
        >
          Libérer le temps des commerçants français pour qu&apos;ils retournent
          à ce qu&apos;ils font de mieux :{' '}
          <span className="text-gradient">leur métier</span>.
        </motion.p>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl bg-[var(--bg-elevated)] p-8"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--bg-surface)] text-[var(--primary-teal)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[var(--text-secondary)]">
                  {pillar.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
