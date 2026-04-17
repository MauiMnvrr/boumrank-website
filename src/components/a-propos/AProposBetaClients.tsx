'use client';

import { motion } from 'framer-motion';
import { Utensils, MapPin, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';

type BetaClient = {
  name: string;
  city: string;
  description: string;
  highlight: string;
  gradient: string;
  accent: string;
};

const clients: BetaClient[] = [
  {
    name: 'Bobanah',
    city: 'Marseille',
    description:
      'Cuisine métissée au cœur du Cours Julien. Premier client BoumRank, a décuplé ses avis Google en 6 semaines avec la Roue.',
    highlight: 'x10 avis Google',
    gradient: 'linear-gradient(135deg, #1B6FC2 0%, #1E9DAA 100%)',
    accent: '#1B6FC2',
  },
  {
    name: 'Feria Latina',
    city: 'Marseille',
    description:
      'Bar à tapas vibrant, QR codes sur chaque table, les Slots ont transformé l\'after-work en moment de jeu.',
    highlight: 'Afterwork reboostés',
    gradient: 'linear-gradient(135deg, #F28C28 0%, #E84393 100%)',
    accent: '#F28C28',
  },
  {
    name: 'L\'Atelier des Sœurs',
    city: 'Paris',
    description:
      "Restaurant familial dans le 11e, passé de 80 à 210 abonnés Instagram en 2 mois grâce au combo follow + Blackjack.",
    highlight: '+163% Insta',
    gradient: 'linear-gradient(135deg, #E84393 0%, #7C5CFC 100%)',
    accent: '#E84393',
  },
  {
    name: 'Café de l\'Église',
    city: 'Paris',
    description:
      'Café de quartier historique, a utilisé BoumRank pour lancer sa newsletter de 0 à 350 inscrits en 4 semaines.',
    highlight: '350 inscrits en 4s',
    gradient: 'linear-gradient(135deg, #2EAE6D 0%, #1E9DAA 100%)',
    accent: '#2EAE6D',
  },
];

export const AProposBetaClients = () => {
  return (
    <section className="relative py-20 md:py-24 bg-[var(--bg-elevated)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,140,40,0.06),transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Eyebrow variant="orange" size="md" className="mb-5">
            <Utensils size={14} />
            Nos clients beta
          </Eyebrow>
          <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-4 text-[var(--text-primary)]">
            4 restaurants. 4 villes.{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#F28C28_0%,#E84393_100%)]">
              4 validations
            </span>
            .
          </h2>
          <p className="text-lg text-[var(--text-secondary)] italic">
            Ils nous font confiance depuis le jour 1. Voici qui ils sont.
          </p>
        </motion.div>

        {/* Clients grid */}
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto mb-10">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card variant="solid" padding="lg" className="h-full relative overflow-hidden group">
                {/* Side accent */}
                <div
                  className="absolute top-0 bottom-0 left-0 w-1"
                  style={{ background: client.gradient }}
                />

                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-display font-extrabold uppercase text-xl text-[var(--text-primary)] leading-tight">
                      {client.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-[var(--text-muted)]">
                      <MapPin size={12} />
                      <span className="font-display font-semibold uppercase tracking-wider">
                        {client.city}
                      </span>
                    </div>
                  </div>
                  <div
                    className="flex-shrink-0 inline-flex items-center gap-1.5 text-[10px] font-display font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                    style={{ background: client.gradient }}
                  >
                    <TrendingUp size={10} />
                    {client.highlight}
                  </div>
                </div>

                <p className="text-sm text-[var(--text-body)] leading-relaxed">
                  {client.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <Card variant="gradient" padding="md">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-display font-extrabold text-2xl md:text-3xl text-[var(--primary-blue)]">
                  140€
                </div>
                <div className="text-[10px] font-display font-bold uppercase tracking-widest text-[var(--text-muted)] mt-1">
                  MRR actuel
                </div>
              </div>
              <div className="border-l border-r border-[var(--border-default)]">
                <div className="font-display font-extrabold text-2xl md:text-3xl text-[var(--primary-green)]">
                  4
                </div>
                <div className="text-[10px] font-display font-bold uppercase tracking-widest text-[var(--text-muted)] mt-1">
                  Clients beta actifs
                </div>
              </div>
              <div>
                <div className="font-display font-extrabold text-2xl md:text-3xl text-[var(--secondary-orange)]">
                  8K€
                </div>
                <div className="text-[10px] font-display font-bold uppercase tracking-widest text-[var(--text-muted)] mt-1">
                  Cap MRR fin 2026
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
