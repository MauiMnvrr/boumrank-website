'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';

export const FonctionnalitesHero = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-[var(--bg-primary)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,157,170,0.08),transparent_60%)]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(27,111,194,0.10),transparent_70%)] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Eyebrow variant="gradient" size="md" className="mb-6">
            <Sparkles size={14} />
            3 sections · Toute la mécanique
          </Eyebrow>

          <h1 className="font-display font-extrabold uppercase text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 text-[var(--text-primary)]">
            Tout ce qu&apos;il faut pour transformer{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_50%,#2EAE6D_100%)]">
              chaque visite
            </span>{' '}
            en avis Google.
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            Du menu digital au dashboard de pilotage :{' '}
            <span className="text-[var(--text-primary)] font-semibold">
              les fonctionnalités qui font tourner BoumRank
            </span>
            , décortiquées en 3 sections.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
