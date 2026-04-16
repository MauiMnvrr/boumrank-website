'use client';

import { motion } from 'framer-motion';
import { Zap, Dices, ShieldCheck, Palette, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';

type Differentiator = {
  id: string;
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
  competitor: string;
  gradient: string;
  accent: string;
};

const differentiators: Differentiator[] = [
  {
    id: 'setup',
    icon: <Zap size={24} />,
    number: '01',
    title: 'Setup en 5 minutes, pas en 3 semaines',
    description:
      "Pendant que les concurrents vous demandent un devis, vous avez déjà encaissé votre premier avis. Aucune formation requise, aucun commercial à caler.",
    competitor: 'Kadow Club : sur devis · Délai moyen 2-3 semaines',
    gradient: 'linear-gradient(135deg, #F28C28 0%, #D47318 100%)',
    accent: '#F28C28',
  },
  {
    id: 'games',
    icon: <Dices size={24} />,
    number: '02',
    title: '3 jeux, pas 1',
    description:
      "Roue, Slots, Blackjack. Variez, testez, trouvez celui qui fait kiffer votre clientèle. Les autres plateformes vous donnent une seule mécanique.",
    competitor: 'Up Review, Cadeo, Basilyk : 1 jeu unique',
    gradient: 'linear-gradient(135deg, #1B6FC2 0%, #1E9DAA 100%)',
    accent: '#1B6FC2',
  },
  {
    id: 'coupon',
    icon: <ShieldCheck size={24} />,
    number: '03',
    title: 'Le coupon physique anti-fraude',
    description:
      "Le caissier swipe, le coupon disparaît. Fini les captures d'écran qui tournent entre potes. L'anti-abus est dans la mécanique, pas dans un algo fragile.",
    competitor: 'Concurrents : codes réutilisables · Fraude possible',
    gradient: 'linear-gradient(135deg, #2EAE6D 0%, #1E8A52 100%)',
    accent: '#2EAE6D',
  },
  {
    id: 'branding',
    icon: <Palette size={24} />,
    number: '04',
    title: 'Branding 100 % à vos couleurs',
    description:
      "13 templates de départ, couleurs perso, logo, typo : le jeu, c'est vous. Pas BoumRank avec votre nom dessus.",
    competitor: 'Concurrents : branding limité · Logo discret',
    gradient: 'linear-gradient(135deg, #7C5CFC 0%, #E84393 100%)',
    accent: '#7C5CFC',
  },
];

export const Differentiators = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[var(--bg-elevated)] overflow-hidden">
      {/* Background : dramatic central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(124,92,252,0.08),transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Eyebrow variant="gradient" size="md" className="mb-5">
            Pourquoi BoumRank ?
          </Eyebrow>
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            Le{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#F28C28_0%,#E84393_50%,#7C5CFC_100%)]">
              combo gagnant
            </span>{' '}
            que les autres n&apos;ont pas.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Quatre choses que BoumRank fait —{' '}
            <span className="text-[var(--text-primary)] font-semibold">
              et que vos alternatives ne font pas.
            </span>
          </p>
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {differentiators.map((diff, i) => (
            <motion.div
              key={diff.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card
                variant="solid"
                padding="lg"
                className="h-full group relative overflow-hidden hover:-translate-y-1 transition-all duration-300"
              >
                {/* Big faded number background */}
                <div
                  className="absolute -top-4 -right-4 font-display font-extrabold text-[9rem] leading-none opacity-[0.06] select-none pointer-events-none"
                  style={{ color: diff.accent }}
                >
                  {diff.number}
                </div>

                {/* Icon */}
                <div
                  className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center text-white mb-5 shadow-[0_8px_24px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform"
                  style={{ background: diff.gradient }}
                >
                  {diff.icon}
                </div>

                {/* Title */}
                <h3 className="relative z-10 font-display font-extrabold uppercase text-xl text-[var(--text-primary)] mb-3 leading-tight">
                  {diff.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-base text-[var(--text-body)] leading-relaxed mb-5">
                  {diff.description}
                </p>

                {/* vs Competitor line */}
                <div
                  className="relative z-10 inline-flex items-center gap-2 text-xs font-display font-semibold px-3 py-1.5 rounded-full border"
                  style={{
                    color: diff.accent,
                    borderColor: `${diff.accent}33`,
                    background: `${diff.accent}0A`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: diff.accent }} />
                  {diff.competitor}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-5xl mx-auto mt-10"
        >
          <Card variant="gradient" padding="lg" className="text-center">
            <p className="text-base md:text-lg text-[var(--text-body)] leading-relaxed max-w-3xl mx-auto mb-5">
              <span className="font-semibold text-[var(--text-primary)]">
                Aucun concurrent ne coche les 4 cases.
              </span>{' '}
              BoumRank a été pensé pour les commerçants qui veulent du concret, vite, sans devoir devenir
              ingénieur marketing.
            </p>
            <Link
              href="/#comparatif-concurrents"
              className="inline-flex items-center gap-2 font-display font-bold text-sm uppercase tracking-wider text-[var(--primary-blue)] hover:text-[var(--primary-blue-dark)] transition-colors"
            >
              Voir le comparatif détaillé
              <ArrowRight size={14} />
            </Link>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
