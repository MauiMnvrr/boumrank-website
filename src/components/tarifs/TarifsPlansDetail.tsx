'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Zap, Crown, Star, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useOnboarding } from '@/components/ui/OnboardingProvider';
import { cn } from '@/lib/utils';

type DetailedPlan = {
  id: string;
  name: string;
  price: string;
  priceUnit: string;
  tagline: string;
  forWho: string;
  features: { label: string; highlight?: boolean }[];
  cta: string;
  ctaAction: 'modal' | 'link';
  ctaHref?: string;
  icon: React.ReactNode;
  gradient: string;
  accent: string;
  highlighted: boolean;
};

const plans: DetailedPlan[] = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    price: '65',
    priceUnit: '€ / mois HT',
    tagline: "L'arme de base pour démarrer fort.",
    forWho:
      'Les commerces qui testent le terrain et veulent décupler leurs avis Google sans se ruiner.',
    features: [
      { label: '1 jeu au choix (Roue, Slots ou Blackjack)' },
      { label: '1 établissement' },
      { label: 'QR code imprimable fourni' },
      { label: 'Branding aux couleurs de votre commerce (logo + 3 couleurs)' },
      { label: 'Coupon physique anti-fraude (swipe caissier illimité)' },
      { label: 'Dashboard analytics basique' },
      { label: 'Export CSV des gagnants' },
      { label: 'Support chat en français (réponse sous 24h)' },
    ],
    cta: 'Lancer en Essentiel',
    ctaAction: 'modal',
    icon: <Star size={22} />,
    gradient: 'linear-gradient(135deg, #1E9DAA 0%, #2EAE6D 100%)',
    accent: '#1E9DAA',
    highlighted: false,
  },
  {
    id: 'performance',
    name: 'Performance',
    price: '79',
    priceUnit: '€ / mois HT',
    tagline: 'Le combo complet pour faire exploser vos retours.',
    forWho:
      'Les commerces qui veulent activer toutes les mécaniques et piloter leur croissance au cordeau.',
    features: [
      { label: 'Les 3 jeux débloqués (Roue, Slots, Blackjack)', highlight: true },
      { label: '1 établissement' },
      { label: 'QR code imprimable fourni (×3 formats)' },
      {
        label: 'Branding 100% custom : 13 templates + palette illimitée + illustrations',
        highlight: true,
      },
      { label: 'Coupon physique anti-fraude (swipe caissier illimité)' },
      {
        label: 'Dashboard Performance : taux de scan, conversion, retour en caisse, temps moyen',
        highlight: true,
      },
      { label: 'Export CSV + intégration Zapier' },
      {
        label: 'Campagnes séquentielles : lot spécial week-end, happy hour, anniversaire',
        highlight: true,
      },
      { label: 'Support chat prioritaire en français (réponse sous 2h)' },
      { label: 'Accès anticipé à la marketplace cross-promo 2026', highlight: true },
    ],
    cta: 'Booster avec Performance',
    ctaAction: 'modal',
    icon: <Crown size={22} />,
    gradient: 'linear-gradient(135deg, #1B6FC2 0%, #2EAE6D 100%)',
    accent: '#1B6FC2',
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Sur devis',
    priceUnit: '',
    tagline: 'Fait pour les enseignes qui jouent dans la cour des grands.',
    forWho:
      'Chaînes, franchises, groupes multi-établissements et marques qui veulent un partenariat stratégique.',
    features: [
      { label: 'Tout le plan Performance, multiplié par N établissements' },
      {
        label: 'API BoumRank pour brancher votre CRM, POS ou loyalty existant',
        highlight: true,
      },
      { label: 'Dashboard groupe + dashboards par établissement' },
      { label: 'SSO, permissions avancées, rôles managers' },
      {
        label: 'Account manager dédié + revue trimestrielle de perf',
        highlight: true,
      },
      {
        label: 'Onboarding sur-mesure (formation équipes sur site à Marseille et Paris)',
      },
      { label: 'SLA contractuel 99,9% + support 7j/7' },
      { label: 'Intégration marketplace cross-promo prioritaire' },
    ],
    cta: 'Parler à Liam (fondateur)',
    ctaAction: 'link',
    ctaHref: '/contact',
    icon: <Zap size={22} />,
    gradient: 'linear-gradient(135deg, #7C5CFC 0%, #E84393 100%)',
    accent: '#7C5CFC',
    highlighted: false,
  },
];

export const TarifsPlansDetail = () => {
  const { openModal } = useOnboarding();

  return (
    <section className="relative py-20 md:py-24 bg-[var(--bg-elevated)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(124,92,252,0.06),transparent_60%)]" />

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
            Grille détaillée
          </Eyebrow>
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            Choisissez votre{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]">
              combo gagnant
            </span>
            .
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            Tous les plans incluent le support en français, l&apos;hébergement RGPD en Europe et
            les mises à jour à vie.
          </p>
        </motion.div>

        {/* Plans detail grid */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, i) => {
            const CTA = plan.ctaAction === 'modal' ? (
              <Button
                onClick={openModal}
                variant={plan.highlighted ? 'gradient' : 'subtle'}
                size="lg"
                className="w-full"
              >
                {plan.cta}
              </Button>
            ) : (
              <Link href={plan.ctaHref ?? '/contact'} className="block">
                <Button variant={plan.highlighted ? 'gradient' : 'subtle'} size="lg" className="w-full">
                  <MessageCircle size={16} />
                  {plan.cta}
                </Button>
              </Link>
            );

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card
                  variant="solid"
                  padding="lg"
                  className={cn(
                    'h-full flex flex-col relative overflow-hidden',
                    plan.highlighted
                      ? 'border-2 shadow-[0_24px_64px_rgba(27,111,194,0.15)]'
                      : 'border border-[var(--border-default)]'
                  )}
                  style={plan.highlighted ? { borderColor: plan.accent } : {}}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: plan.gradient }}
                  />

                  {plan.highlighted && (
                    <div className="absolute top-0 right-6 translate-y-[-50%]">
                      <div className="bg-[linear-gradient(135deg,#F28C28_0%,#E84393_100%)] text-white text-[10px] font-display font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-[0_8px_20px_rgba(242,140,40,0.3)]">
                        ⭐ Recommandé
                      </div>
                    </div>
                  )}

                  {/* Icon + name */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                      style={{ background: plan.gradient }}
                    >
                      {plan.icon}
                    </div>
                    <h3 className="font-display font-extrabold uppercase text-2xl text-[var(--text-primary)]">
                      {plan.name}
                    </h3>
                  </div>

                  {/* Tagline */}
                  <p
                    className="text-sm italic font-display font-semibold mb-5 leading-snug"
                    style={{ color: plan.accent }}
                  >
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-5 pb-5 border-b border-[var(--border-default)]">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-extrabold text-5xl text-[var(--text-primary)]">
                        {plan.price.startsWith('Sur') ? plan.price : `${plan.price}€`}
                      </span>
                      {plan.priceUnit && (
                        <span className="text-sm text-[var(--text-muted)] font-display font-semibold">
                          {plan.priceUnit.replace('€', '')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* For who */}
                  <div className="mb-5">
                    <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-display font-bold mb-2">
                      Pour qui
                    </div>
                    <p className="text-sm text-[var(--text-body)] leading-relaxed">
                      {plan.forWho}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-6 flex-1">
                    <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-display font-bold mb-3">
                      Inclus
                    </div>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm leading-snug">
                          <Check
                            size={15}
                            className="flex-shrink-0 mt-0.5"
                            style={{ color: feature.highlight ? plan.accent : 'var(--primary-green)' }}
                          />
                          <span
                            className={cn(
                              feature.highlight
                                ? 'text-[var(--text-primary)] font-semibold'
                                : 'text-[var(--text-body)]'
                            )}
                          >
                            {feature.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {CTA}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
