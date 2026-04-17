'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';

export const CommentCaMarcheHero = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-[var(--bg-primary)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,157,170,0.08),transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Eyebrow variant="gradient" size="md" className="mb-6">
            <Zap size={14} />
            4 étapes · 5 minutes
          </Eyebrow>

          <h1 className="font-display font-extrabold uppercase text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 text-[var(--text-primary)]">
            De l&apos;idée à l&apos;avis Google{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_50%,#2EAE6D_100%)]">
              encaissé
            </span>
            , voici le parcours complet.
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            Quatre étapes,{' '}
            <span className="text-[var(--text-primary)] font-semibold">
              cinq minutes de setup
            </span>
            , une mécanique qui tourne 24/7 sans que vous leviez le petit doigt.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
