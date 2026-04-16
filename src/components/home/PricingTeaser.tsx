'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Star, Crown, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useOnboarding } from '@/components/ui/OnboardingProvider';
import { cn } from '@/lib/utils';

type Plan = {
  id: string;
  name: string;
  price: string;
  priceSuffix: string;
  tagline: string;
  features: string[];
  highlighted: boolean;
  cta: string;
  ctaAction: 'modal' | 'link';
  ctaHref?: string;
  icon: React.ReactNode;
};

const plans: Plan[] = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    price: '65',
    priceSuffix: '€/mois',
    tagline: 'Un jeu, un QR code, un commerce.',
    features: [
      '1 jeu au choix (Roue / Slots / Blackjack)',
      'QR code illimité',
      'Dashboard analytics',
      'Support email',
    ],
    highlighted: false,
    cta: 'Commencer gratuitement',
    ctaAction: 'modal',
    icon: <Star size={20} />,
  },
  {
    id: 'performance',
    name: 'Performance',
    price: '79',
    priceSuffix: '€/mois',
    tagline: 'Les 3 jeux, branding avancé, analytics boostés.',
    features: [
      'Les 3 jeux (Roue + Slots + Blackjack)',
      'Branding 100% custom (13 templates)',
      'Analytics avancés + exports CSV',
      'Support prioritaire (2h en chat)',
      'Lots illimités',
    ],
    highlighted: true,
    cta: 'Essayer Performance',
    ctaAction: 'modal',
    icon: <Crown size={20} />,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Sur devis',
    priceSuffix: '',
    tagline: 'Multi-établissements, API, account manager dédié.',
    features: [
      'Multi-établissements (5+)',
      'API & intégrations custom',
      'Account manager dédié',
      'SLA & conformité enterprise',
      'Formation équipe',
    ],
    highlighted: false,
    cta: 'Parler à un expert',
    ctaAction: 'link',
    ctaHref: '/contact',
    icon: <Crown size={20} />,
  },
];

export const PricingTeaser = () => {
  const { openModal } = useOnboarding();

  return (
    <section
      id="tarifs-teaser"
      className="relative py-24 md:py-32 bg-[var(--bg-elevated)] overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(46,174,109,0.08),transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <Eyebrow variant="subtle" size="md" className="mb-5">
            Tarifs
          </Eyebrow>
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            Un prix clair.{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]">
              Un essai gratuit.
            </span>{' '}
            Zéro engagement.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            <span className="font-semibold text-[var(--text-primary)]">À partir de 65€/mois</span>{' '}
            pour débloquer la bête.
          </p>
        </motion.div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, i) => {
            const cardContent = (
              <Card
                variant={plan.highlighted ? 'solid' : 'glass'}
                padding="lg"
                className={cn(
                  'h-full flex flex-col relative overflow-hidden transition-all duration-300',
                  plan.highlighted
                    ? 'border-2 shadow-[0_20px_56px_rgba(27,111,194,0.18)] md:scale-105 md:-my-2'
                    : 'hover:-translate-y-0.5'
                )}
                style={plan.highlighted ? { borderColor: 'var(--primary-blue)' } : {}}
              >
                {/* Highlighted badge */}
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-[linear-gradient(135deg,#F28C28_0%,#E84393_100%)] text-white text-xs font-display font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_8px_20px_rgba(242,140,40,0.3)]">
                      ⭐ Le plus populaire
                    </div>
                  </div>
                )}

                {/* Plan icon + name */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      'w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-[0_8px_20px_rgba(0,0,0,0.15)]'
                    )}
                    style={{
                      background: plan.highlighted
                        ? 'linear-gradient(135deg, #1B6FC2 0%, #2EAE6D 100%)'
                        : plan.id === 'enterprise'
                          ? 'linear-gradient(135deg, #7C5CFC 0%, #E84393 100%)'
                          : 'linear-gradient(135deg, #1E9DAA 0%, #2EAE6D 100%)',
                    }}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="font-display font-extrabold uppercase text-xl text-[var(--text-primary)]">
                    {plan.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-extrabold text-5xl text-[var(--text-primary)]">
                      {plan.price.startsWith('Sur') ? plan.price : `${plan.price}€`}
                    </span>
                    {plan.priceSuffix && (
                      <span className="text-sm text-[var(--text-muted)] font-display font-semibold">
                        {plan.priceSuffix.replace('€', '')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-sm text-[var(--text-secondary)] italic mb-5 leading-snug min-h-[3rem]">
                  {plan.tagline}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[var(--text-body)]">
                      <Check
                        size={16}
                        className={cn(
                          'flex-shrink-0 mt-0.5',
                          plan.highlighted
                            ? 'text-[var(--primary-blue)]'
                            : 'text-[var(--primary-green)]'
                        )}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {plan.ctaAction === 'modal' ? (
                  <Button
                    onClick={openModal}
                    variant={plan.highlighted ? 'gradient' : 'subtle'}
                    size="md"
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                ) : (
                  <Link href={plan.ctaHref ?? '#'} className="block">
                    <Button
                      variant={plan.highlighted ? 'gradient' : 'subtle'}
                      size="md"
                      className="w-full"
                      type="button"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                )}
              </Card>
            );

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {cardContent}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom : detail link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/tarifs"
            className="inline-flex items-center gap-2 font-display font-bold text-sm uppercase tracking-wider text-[var(--primary-blue)] hover:text-[var(--primary-blue-dark)] transition-colors"
          >
            Voir les tarifs en détail
            <ArrowRight size={14} />
          </Link>
          <p className="text-xs text-[var(--text-muted)] mt-3">
            Tous les plans incluent : Setup en 5 min · QR codes imprimables · Support français ·
            Sans engagement · RGPD
          </p>
        </motion.div>
      </div>
    </section>
  );
};
