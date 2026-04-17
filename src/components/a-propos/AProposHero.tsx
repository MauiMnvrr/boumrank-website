'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';

export const AProposHero = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-[var(--bg-primary)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(242,140,40,0.08),transparent_60%)]" />
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(124,92,252,0.1),transparent_70%)] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Eyebrow variant="orange" size="md" withDot className="mb-6">
            <MapPin size={14} />
            Marseille · Fondée en 2026
          </Eyebrow>

          <h1 className="font-display font-extrabold uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8 text-[var(--text-primary)]">
            On a construit BoumRank parce qu&apos;on en avait marre de voir{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#F28C28_0%,#E84393_100%)]">
              les commerces locaux perdre
            </span>{' '}
            la bataille marketing.
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto">
            Notre mission : redonner aux commerces de quartier des outils marketing qui claquent
            autant que ceux des grandes chaînes — sans la complexité, sans le jargon, sans le devis
            qui traîne.{' '}
            <span className="text-[var(--text-primary)] font-semibold">
              Le jeu, c&apos;est le levier. Le commerce local, c&apos;est le terrain.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
