'use client';

import { motion } from 'framer-motion';
import { MessageSquareOff, TrendingDown, Wrench } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';

type Frustration = {
  icon: React.ReactNode;
  emoji: string;
  title: string;
  body: string;
  highlight: string;
};

const frustrations: Frustration[] = [
  {
    icon: <MessageSquareOff size={24} />,
    emoji: '😩',
    title: 'Zéro avis Google malgré 40 couverts par service',
    body: 'Vous le demandez, ils sourient, ils oublient dès la porte franchie.',
    highlight: '40 couverts',
  },
  {
    icon: <TrendingDown size={24} />,
    emoji: '😤',
    title: 'Vos réseaux stagnent à 200 abonnés depuis 18 mois',
    body: 'Pendant que le resto d\'à côté dépasse les 5 000 sans rien faire de spécial.',
    highlight: '5 000',
  },
  {
    icon: <Wrench size={24} />,
    emoji: '🤯',
    title: 'Vos outils marketing sont des usines à gaz',
    body: 'Trois logins, une formation obligatoire, un devis qui traîne. Vous n\'avez pas le temps.',
    highlight: '3 logins',
  },
];

export const Problem = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(242,140,40,0.04),transparent_60%)]" />

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
            Le constat brutal
          </Eyebrow>
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            Vos clients passent, mangent, partent.
            <br />
            Et vous n&apos;avez{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#F28C28_0%,#E84393_100%)]">
              rien récupéré
            </span>
            .
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Trois frustrations que chaque commerçant local connaît par cœur.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {frustrations.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card variant="glass" padding="lg" className="h-full flex flex-col group cursor-default">
                {/* Top : icon + emoji */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[linear-gradient(135deg,rgba(242,140,40,0.1)_0%,rgba(232,67,147,0.1)_100%)] border border-[rgba(242,140,40,0.2)] flex items-center justify-center text-[var(--secondary-orange)] group-hover:scale-110 transition-transform">
                    {f.icon}
                  </div>
                  <span className="text-4xl group-hover:scale-110 transition-transform">{f.emoji}</span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)] leading-tight mb-3">
                  {f.title}
                </h3>

                {/* Body */}
                <p className="text-[var(--text-body)] leading-relaxed text-base">
                  {f.body}
                </p>

                {/* Decorative line at bottom */}
                <div className="mt-auto pt-6">
                  <div className="h-1 w-12 rounded-full bg-[linear-gradient(90deg,#F28C28_0%,#E84393_100%)] opacity-60 group-hover:w-20 transition-all duration-300" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Outro line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16 max-w-2xl mx-auto"
        >
          <p className="text-lg md:text-xl text-[var(--text-secondary)] font-display font-semibold">
            Et si on transformait ça en{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)] font-bold">
              combo gagnant
            </span>{' '}
            ? 👇
          </p>
        </motion.div>
      </div>
    </section>
  );
};
