'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useOnboarding } from '@/components/ui/OnboardingProvider';
import { PRICING_OFFERS, type PricingOffer } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/events';

type TeaserCardProps = {
  offer: PricingOffer;
  index: number;
  onCtaClick: () => void;
  isEn: boolean;
};

const TeaserCard = ({ offer, index, onCtaClick, isEn }: TeaserCardProps) => {
  const isFeatured = offer.highlighted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn('h-full', isFeatured && 'md:-translate-y-3')}
    >
      <Card
        variant="solid"
        padding="lg"
        className={cn(
          'h-full flex flex-col relative overflow-visible',
          isFeatured
            ? 'border-2 shadow-[0_20px_50px_rgba(27,111,194,0.12)]'
            : 'border border-[var(--border-default)]'
        )}
        style={
          isFeatured
            ? {
                borderColor: 'var(--primary-blue)',
                background:
                  'linear-gradient(180deg, rgba(27,111,194,0.04) 0%, rgba(46,174,109,0.04) 100%)',
              }
            : undefined
        }
      >
        {isFeatured && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-[linear-gradient(135deg,#F28C28_0%,#E84393_100%)] text-white text-[10px] font-display font-extrabold uppercase tracking-[0.12em] px-4 py-1.5 rounded-full whitespace-nowrap shadow-[0_8px_20px_rgba(242,140,40,0.3)]">
              {isEn ? '⭐ Best deal' : '⭐ Le meilleur deal'}
            </div>
          </div>
        )}

        <div className="mb-3 min-h-[26px]">
          {offer.yearlySaving > 0 ? (
            <span className="inline-block font-display font-bold uppercase text-[10px] tracking-[0.1em] px-3 py-1 rounded-full bg-[rgba(46,174,109,0.12)] text-[var(--primary-green)]">
              {isEn ? `Save ${offer.yearlySaving}€/yr` : `Économisez ${offer.yearlySaving}€/an`}
            </span>
          ) : (
            <span className="inline-block invisible">.</span>
          )}
        </div>

        <h3
          className={cn(
            'font-display font-extrabold uppercase text-base tracking-[0.08em] mb-4',
            isFeatured
              ? 'text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]'
              : 'text-[var(--text-primary)]'
          )}
        >
          {offer.label}
        </h3>

        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="font-display font-extrabold text-5xl text-[var(--text-primary)] leading-none">
            {offer.price}€
          </span>
          <span className="text-xs font-display font-semibold text-[var(--text-muted)]">
            {isEn ? '/mo excl. tax' : '/mois HT'}
          </span>
        </div>
        <div className="text-xs text-[var(--text-muted)] mb-5">{offer.totalLabel}</div>

        <div className="flex-1" />

        <Button
          onClick={() => {
            trackEvent('pricing_tier_click', { pricing_tier: offer.id });
            trackEvent('signup_click', { cta_location: `pricing-${offer.id}`, content_name: `signup_pricing_${offer.id}` });
            onCtaClick();
          }}
          data-cta={`pricing-${offer.id}`}
          data-cta-location="pricing-teaser"
          variant={isFeatured ? 'gradient' : 'subtle'}
          size="md"
          className="w-full"
        >
          {isEn ? 'Start 14-day free trial' : 'Démarrer 14j gratuits'}
        </Button>
        <div className="text-[11px] text-[var(--text-muted)] text-center mt-2">
          {isEn ? 'No credit card required' : 'Sans carte bancaire'}
        </div>
      </Card>
    </motion.div>
  );
};

export const PricingTeaser = () => {
  const { openModal } = useOnboarding();
  const locale = useLocale();
  const isEn = locale === 'en';

  return (
    <section
      id="tarifs-teaser"
      data-section="pricing"
      className="relative py-24 md:py-32 bg-[var(--bg-elevated)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(46,174,109,0.08),transparent_70%)]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            {isEn ? 'The longer you commit,' : 'Plus vous vous engagez,'}{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]">
              {isEn ? 'The less you pay' : 'Moins vous payez'}
            </span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            {isEn ? 'Every feature. Always.' : 'Un service complet.'}{' '}
            <span className="font-semibold text-[var(--text-primary)]">
              {isEn ? 'Three commitment options. From €59/mo.' : 'Trois engagements. À partir de 59€/mois.'}
            </span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
          {PRICING_OFFERS.map((offer, i) => (
            <TeaserCard key={offer.id} offer={offer} index={i} onCtaClick={() => openModal(undefined, offer.id === 'six-months' ? 'sixmonths' : offer.id)} isEn={isEn} />
          ))}
        </div>

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
            {isEn ? 'View details and FAQ' : 'Voir le détail et la FAQ'}
            <ArrowRight size={14} />
          </Link>
          <p className="text-xs text-[var(--text-muted)] mt-3">
            {isEn
              ? 'All plans include: 100% of features · 5-min setup · 14-day trial no CC · GDPR'
              : 'Toutes les offres incluent : 100% des features · Setup en 5 min · Essai 14 jours sans CB · RGPD'}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
