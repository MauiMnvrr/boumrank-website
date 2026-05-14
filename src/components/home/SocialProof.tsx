'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import {
  Coffee,
  UtensilsCrossed,
  Scissors,
  Croissant,
  ShoppingBag,
  Sparkles,
  Star,
  ThumbsUp,
  Heart,
  Share2,
  Mail,
  Gift,
  Trophy,
  Cake,
  Percent,
  Cookie,
  Crown,
} from 'lucide-react';
import { MarqueeRow } from '@/components/decorative/MarqueeRow';
import { RevealOnScroll } from '@/components/decorative/RevealOnScroll';
import { Eyebrow } from '@/components/ui/Eyebrow';

type ChipProps = {
  icon: React.ReactNode;
  label: string;
  /** "blue" | "teal" | "green" | "orange" | "purple" | "pink" */
  tone?: 'blue' | 'teal' | 'green' | 'orange' | 'purple' | 'pink';
};

const TONE_COLORS: Record<NonNullable<ChipProps['tone']>, { bg: string; ring: string; icon: string }> = {
  blue:   { bg: 'rgba(27,111,194,0.08)',  ring: 'rgba(27,111,194,0.25)',  icon: '#1B6FC2' },
  teal:   { bg: 'rgba(30,157,170,0.08)',  ring: 'rgba(30,157,170,0.25)',  icon: '#1E9DAA' },
  green:  { bg: 'rgba(46,174,109,0.08)',  ring: 'rgba(46,174,109,0.25)',  icon: '#2EAE6D' },
  orange: { bg: 'rgba(242,140,40,0.08)',  ring: 'rgba(242,140,40,0.25)',  icon: '#F28C28' },
  purple: { bg: 'rgba(124,92,252,0.08)',  ring: 'rgba(124,92,252,0.25)',  icon: '#7C5CFC' },
  pink:   { bg: 'rgba(232,67,147,0.08)',  ring: 'rgba(232,67,147,0.25)',  icon: '#E84393' },
};

function Chip({ icon, label, tone = 'blue' }: ChipProps) {
  const c = TONE_COLORS[tone];
  return (
    <div
      className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-sm"
      style={{
        background: c.bg,
        border: `1px solid ${c.ring}`,
        boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)',
      }}
    >
      <span style={{ color: c.icon }} className="flex items-center">
        {icon}
      </span>
      <span className="font-display font-bold text-sm uppercase tracking-wider text-[var(--text-primary)] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export const SocialProof = () => {
  const locale = useLocale();
  const isEn = locale === 'en';

  const sectors = [
    { icon: <UtensilsCrossed size={16} />, label: isEn ? 'Restaurant' : 'Restaurant',  tone: 'blue'   as const },
    { icon: <Croissant size={16} />,        label: isEn ? 'Bakery'     : 'Boulangerie', tone: 'orange' as const },
    { icon: <Coffee size={16} />,           label: isEn ? 'Café'       : 'Café',        tone: 'teal'   as const },
    { icon: <Scissors size={16} />,         label: isEn ? 'Salon'      : 'Salon',       tone: 'pink'   as const },
    { icon: <ShoppingBag size={16} />,      label: isEn ? 'Boutique'   : 'Boutique',    tone: 'green'  as const },
    { icon: <Sparkles size={16} />,         label: isEn ? 'Florist'    : 'Fleuriste',   tone: 'purple' as const },
    { icon: <Cookie size={16} />,           label: isEn ? 'Pastry'     : 'Pâtisserie',  tone: 'orange' as const },
    { icon: <Crown size={16} />,            label: isEn ? 'Concept'    : 'Concept',     tone: 'blue'   as const },
  ];

  const actions = [
    { icon: <Star size={16} />,      label: isEn ? 'Google review'       : 'Avis Google',           tone: 'orange' as const },
    { icon: <Heart size={16} />,     label: isEn ? 'Social follow'       : 'Abonnement réseaux',     tone: 'pink'   as const },
    { icon: <Share2 size={16} />,    label: isEn ? 'Social share'        : 'Partage réseaux',        tone: 'blue'   as const },
    { icon: <Mail size={16} />,      label: isEn ? 'Newsletter signup'   : 'Inscription newsletter', tone: 'teal'   as const },
    { icon: <ThumbsUp size={16} />,  label: isEn ? 'TripAdvisor review'  : 'Avis TripAdvisor',       tone: 'green'  as const },
    { icon: <Star size={16} />,      label: isEn ? 'Yelp rating'         : 'Note Yelp',             tone: 'pink'   as const },
    { icon: <Sparkles size={16} />,  label: isEn ? 'Photo on social'     : 'Photo sur les réseaux',  tone: 'purple' as const },
    { icon: <Mail size={16} />,      label: isEn ? 'Loyalty subscription': 'Abonnement fidélité',    tone: 'blue'   as const },
  ];

  const rewards = [
    { icon: <Coffee size={16} />,    label: isEn ? 'Free coffee'         : 'Café offert',            tone: 'orange' as const },
    { icon: <Percent size={16} />,   label: isEn ? '10% off'             : '10 % de réduction',      tone: 'green'  as const },
    { icon: <Cookie size={16} />,    label: isEn ? 'Free dessert'        : 'Dessert offert',         tone: 'teal'   as const },
    { icon: <Cake size={16} />,      label: isEn ? 'Birthday gift'       : "Cadeau d'anniversaire",  tone: 'pink'   as const },
    { icon: <Gift size={16} />,      label: isEn ? 'Mystery bonus'       : 'Bonus mystère',          tone: 'purple' as const },
    { icon: <Trophy size={16} />,    label: isEn ? 'VIP access'          : 'Accès VIP',              tone: 'blue'   as const },
    { icon: <Sparkles size={16} />,  label: isEn ? 'Surprise menu'       : 'Menu surprise',          tone: 'orange' as const },
    { icon: <Star size={16} />,      label: isEn ? 'Loyalty boost'       : 'Boost fidélité',         tone: 'teal'   as const },
  ];

  return (
    <section
      aria-label={isEn ? 'BoumRank ecosystem' : 'Écosystème BoumRank'}
      className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-[var(--bg-surface)]"
    >
      {/* Soft top + bottom seam fade */}
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[var(--bg-primary)] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[var(--bg-primary)] to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <RevealOnScroll mode="fade">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <Eyebrow variant="subtle" size="sm" withDot className="mb-4">
              {isEn ? 'Plug & play ecosystem' : 'Écosystème plug & play'}
            </Eyebrow>
            <h2 className="font-display font-extrabold uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-[var(--text-primary)] mb-4">
              {isEn ? (
                <>
                  Every kind of shop,{' '}
                  <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_50%,#2EAE6D_100%)]">
                    every kind of reward
                  </span>
                </>
              ) : (
                <>
                  Tous les commerces,{' '}
                  <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_50%,#2EAE6D_100%)]">
                    toutes les récompenses
                  </span>
                </>
              )}
            </h2>
            <p className="text-[var(--text-body)] text-base sm:text-lg leading-relaxed">
              {isEn
                ? 'BoumRank turns any in-store action into a playful reward — choose the action, set the prize, the platform runs the rest.'
                : "BoumRank transforme n'importe quelle action en boutique en récompense ludique. Vous choisissez l'action, vous fixez le gain, la plateforme s'occupe du reste."}
            </p>
          </div>
        </RevealOnScroll>

        {/* Marquee row 1: secteurs (left, slow) */}
        <RevealOnScroll mode="fade" delay={0.1}>
          <div className="mb-4">
            <MarqueeRow duration={56} direction="left" gap="gap-3 sm:gap-4">
              {sectors.map((s) => (
                <Chip key={`s-${s.label}`} icon={s.icon} label={s.label} tone={s.tone} />
              ))}
            </MarqueeRow>
          </div>
        </RevealOnScroll>

        {/* Marquee row 2: actions (right, medium) */}
        <RevealOnScroll mode="fade" delay={0.18}>
          <div className="mb-4">
            <MarqueeRow duration={48} direction="right" gap="gap-3 sm:gap-4">
              {actions.map((a) => (
                <Chip key={`a-${a.label}`} icon={a.icon} label={a.label} tone={a.tone} />
              ))}
            </MarqueeRow>
          </div>
        </RevealOnScroll>

        {/* Marquee row 3: récompenses (left, faster) */}
        <RevealOnScroll mode="fade" delay={0.26}>
          <div>
            <MarqueeRow duration={42} direction="left" gap="gap-3 sm:gap-4">
              {rewards.map((r) => (
                <Chip key={`r-${r.label}`} icon={r.icon} label={r.label} tone={r.tone} />
              ))}
            </MarqueeRow>
          </div>
        </RevealOnScroll>

        {/* Footer caption with subtle motion */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-10 sm:mt-14 text-xs sm:text-sm text-[var(--text-muted)] font-display font-bold uppercase tracking-[0.25em]"
        >
          {isEn ? '× combinable in seconds via the BoumRank back-office' : '× combinables en quelques secondes via le back-office BoumRank'}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
