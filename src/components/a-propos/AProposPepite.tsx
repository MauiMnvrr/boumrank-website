'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';

export const AProposPepite = () => {
  return (
    <section className="relative py-20 md:py-24 bg-[var(--bg-primary)] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card
            variant="solid"
            padding="xl"
            className="relative overflow-hidden border-2 border-[var(--border-highlight)]"
          >
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[linear-gradient(90deg,#1B6FC2_0%,#2EAE6D_100%)]" />

            <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-start">
              {/* Badge icon */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_100%)] flex items-center justify-center text-white shadow-[0_16px_40px_rgba(27,111,194,0.3)]">
                    <GraduationCap size={44} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-[linear-gradient(135deg,#F28C28_0%,#FBAB5C_100%)] flex items-center justify-center text-white shadow-[0_8px_20px_rgba(242,140,40,0.3)]">
                    <Award size={18} />
                  </div>
                </div>
              </div>

              <div>
                <Eyebrow variant="subtle" size="sm" className="mb-3">
                  Soutenu par
                </Eyebrow>
                <h2 className="font-display font-extrabold uppercase text-2xl md:text-3xl text-[var(--text-primary)] mb-2 leading-tight">
                  Pépite Aix-Marseille Université
                </h2>
                <p className="text-sm italic text-[var(--primary-blue)] font-display font-semibold mb-5">
                  Le programme entrepreneurs-étudiants qui booste les startups du Sud.
                </p>

                <p className="text-[var(--text-body)] leading-relaxed">
                  BoumRank est{' '}
                  <span className="font-semibold text-[var(--text-primary)]">
                    lauréat du programme Pépite Aix-Marseille Université
                  </span>
                  , l&apos;incubateur étudiant-entrepreneur qui accompagne les projets innovants du sud
                  de la France. Pépite nous donne l&apos;accès à un mentorat senior, à un réseau
                  d&apos;experts juridiques, comptables et commerciaux, et à la communauté
                  entrepreneuriale la plus vivante de la région PACA. On fait partie d&apos;une cuvée de
                  projets ambitieux qui prouvent qu&apos;on peut construire une SaaS de qualité ailleurs
                  qu&apos;à Paris ou à la Silicon Valley.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
