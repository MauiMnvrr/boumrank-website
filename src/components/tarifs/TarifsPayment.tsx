'use client';

import { motion } from 'framer-motion';
import { Shield, Globe, FileText, Lock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';

const guarantees = [
  {
    icon: <Lock size={22} />,
    title: 'Paiement sécurisé par Stripe',
    body: 'Leader mondial du paiement SaaS, certifié PCI-DSS niveau 1. Vos infos bancaires ne passent jamais par nos serveurs.',
    accent: '#1B6FC2',
  },
  {
    icon: <Globe size={22} />,
    title: 'Hébergement européen',
    body: "Toutes vos données (commerce, clients, coupons) sont stockées en France et en Allemagne, conformes RGPD.",
    accent: '#2EAE6D',
  },
  {
    icon: <FileText size={22} />,
    title: 'Facturation automatique',
    body: 'Factures PDF émises chaque mois, téléchargeables depuis votre dashboard, compatibles avec votre expert-comptable.',
    accent: '#F28C28',
  },
  {
    icon: <Shield size={22} />,
    title: 'Aucune revente de data',
    body: "Vos données vous appartiennent, point final. On ne les vend pas, on ne les partage pas, on ne les analyse pas pour des tiers.",
    accent: '#7C5CFC',
  },
];

export const TarifsPayment = () => {
  return (
    <section className="relative py-20 md:py-24 bg-[var(--bg-primary)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(46,174,109,0.06),transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Eyebrow variant="subtle" size="md" className="mb-5">
            Sécurité paiement
          </Eyebrow>
          <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-4 text-[var(--text-primary)]">
            Votre CB est entre{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]">
              de bonnes mains
            </span>
            .
          </h2>
          <p className="text-lg text-[var(--text-secondary)] italic">
            On traite vos paiements comme on traite nos clients — avec obsession.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {guarantees.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card variant="glass" padding="lg" className="h-full flex gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
                  style={{ background: g.accent }}
                >
                  {g.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[var(--text-primary)] mb-2 leading-tight">
                    {g.title}
                  </h3>
                  <p className="text-sm text-[var(--text-body)] leading-relaxed">{g.body}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
