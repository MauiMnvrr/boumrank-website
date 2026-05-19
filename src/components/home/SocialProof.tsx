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
  Mail,
  Gift,
  Trophy,
  Percent,
  Cookie,
  Brush,
  Wrench,
  Pen,
  HandHeart,
  Hand,
  Store,
  Key,
  Wine,
} from 'lucide-react';
import { FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa';
import { MarqueeRow } from '@/components/decorative/MarqueeRow';
import { RevealOnScroll } from '@/components/decorative/RevealOnScroll';

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
    { icon: <Scissors size={16} />,         label: isEn ? 'Hairdresser': 'Coiffeur',     tone: 'teal'   as const },
    { icon: <Brush size={16} />,            label: isEn ? 'Barber'     : 'Barbier',      tone: 'orange' as const },
    { icon: <Wrench size={16} />,           label: isEn ? 'Garage'     : 'Garage',       tone: 'blue'   as const },
    { icon: <Pen size={16} />,              label: isEn ? 'Tattoo shop': 'Salon tatouage', tone: 'pink' as const },
    { icon: <HandHeart size={16} />,        label: isEn ? 'Massage'    : 'Massage',      tone: 'purple' as const },
    { icon: <Hand size={16} />,             label: isEn ? 'Manicure'   : 'Manucure',     tone: 'pink'   as const },
    { icon: <Store size={16} />,            label: isEn ? 'Concept store': 'Concept store', tone: 'green' as const },
    { icon: <Key size={16} />,              label: isEn ? 'Locksmith'  : 'Serrurier',    tone: 'orange' as const },
    { icon: <Wine size={16} />,             label: isEn ? 'Bar'        : 'Bar',          tone: 'purple' as const },
  ];

  const actions = [
    { icon: <Star size={16} />,        label: isEn ? 'Google review'       : 'Avis Google',           tone: 'orange' as const },
    { icon: <FaInstagram size={16} />, label: isEn ? 'Instagram follow'    : 'Abonnement Instagram',  tone: 'pink'   as const },
    { icon: <FaFacebook size={16} />,  label: isEn ? 'Facebook follow'     : 'Abonnement Facebook',   tone: 'blue'   as const },
    { icon: <Mail size={16} />,        label: isEn ? 'Newsletter signup'   : 'Inscription newsletter', tone: 'teal'   as const },
    { icon: <FaTiktok size={16} />,    label: isEn ? 'TikTok follow'       : 'Abonnement TikTok',     tone: 'purple' as const },
    { icon: <ThumbsUp size={16} />,    label: isEn ? 'TripAdvisor review'  : 'Avis TripAdvisor',      tone: 'green'  as const },
  ];

  const rewards = [
    { icon: <Coffee size={16} />,      label: isEn ? 'Free coffee'       : 'Café offert',          tone: 'orange' as const },
    { icon: <Cookie size={16} />,      label: isEn ? 'Free dessert'      : 'Dessert offert',       tone: 'teal'   as const },
    { icon: <Wine size={16} />,        label: isEn ? 'Free beer'         : 'Bière offerte',        tone: 'orange' as const },
    { icon: <Gift size={16} />,        label: isEn ? 'Gift voucher'      : "Bon d'achat",          tone: 'purple' as const },
    { icon: <Percent size={16} />,     label: isEn ? '15% off'           : 'Réduction 15%',        tone: 'green'  as const },
    { icon: <Sparkles size={16} />,    label: isEn ? 'Mystery product'   : 'Produit mystère',      tone: 'pink'   as const },
    { icon: <HandHeart size={16} />,   label: isEn ? 'Free aperitif'     : 'Apéritif offert',      tone: 'orange' as const },
    { icon: <UtensilsCrossed size={16} />, label: isEn ? 'Free burger'   : 'Burger offert',        tone: 'teal'   as const },
    { icon: <Croissant size={16} />,   label: isEn ? 'Free croissant'    : 'Croissant offert',     tone: 'orange' as const },
    { icon: <Star size={16} />,        label: isEn ? 'Free ice cream'    : 'Glace offerte',        tone: 'pink'   as const },
    { icon: <Hand size={16} />,        label: isEn ? '30min massage'     : 'Massage 30min',        tone: 'purple' as const },
    { icon: <Scissors size={16} />,    label: isEn ? 'Free haircut'      : 'Coupe cheveux',        tone: 'teal'   as const },
    { icon: <Coffee size={16} />,      label: isEn ? 'Free brunch'       : 'Brunch',               tone: 'blue'   as const },
    { icon: <Brush size={16} />,       label: isEn ? 'Free treatment'    : 'Soin',                 tone: 'pink'   as const },
    { icon: <Wine size={16} />,        label: isEn ? 'Free cocktail'     : 'Cocktail offert',      tone: 'purple' as const },
    { icon: <Sparkles size={16} />,    label: isEn ? 'Free smoothie'     : 'Smoothie offert',      tone: 'green'  as const },
    { icon: <Croissant size={16} />,   label: isEn ? 'Free pastry'       : 'Pâtisserie offerte',   tone: 'orange' as const },
    { icon: <Percent size={16} />,     label: isEn ? '25% off'           : 'Réduction 25%',        tone: 'green'  as const },
    { icon: <Gift size={16} />,        label: isEn ? 'Gift card'         : 'Bon cadeau',           tone: 'blue'   as const },
    { icon: <Hand size={16} />,        label: isEn ? 'Free manicure'     : 'Manucure offerte',     tone: 'pink'   as const },
    { icon: <UtensilsCrossed size={16} />, label: isEn ? 'Free starter'  : 'Entrée offerte',       tone: 'teal'   as const },
    { icon: <UtensilsCrossed size={16} />, label: isEn ? 'Free daily dish': 'Plat jour offert',    tone: 'orange' as const },
    { icon: <Star size={16} />,        label: isEn ? 'Yoga class'        : 'Cours yoga',           tone: 'purple' as const },
    { icon: <Coffee size={16} />,      label: isEn ? 'Free breakfast'    : 'Petit déjeuner',       tone: 'teal'   as const },
    { icon: <ShoppingBag size={16} />, label: isEn ? 'Gourmet basket'    : 'Panier gourmand',      tone: 'green'  as const },
    { icon: <Sparkles size={16} />,    label: isEn ? 'Sauna session'     : 'Séance sauna',         tone: 'blue'   as const },
    { icon: <Trophy size={16} />,      label: isEn ? 'Cinema ticket'     : 'Billet cinéma',        tone: 'purple' as const },
    { icon: <ShoppingBag size={16} />, label: isEn ? 'Free delivery'     : 'Livraison offerte',    tone: 'teal'   as const },
    { icon: <UtensilsCrossed size={16} />, label: isEn ? 'Restaurant voucher': 'Bon restaurant',   tone: 'orange' as const },
    { icon: <Gift size={16} />,        label: isEn ? 'Surprise box'      : 'Lot surprise',         tone: 'pink'   as const },
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
                  Une solution pour{' '}
                  <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_50%,#2EAE6D_100%)]">
                    votre commerce
                  </span>
                </>
              )}
            </h2>
            <p className="text-[var(--text-body)] text-base sm:text-lg leading-relaxed">
              {isEn
                ? 'BoumRank turns any in-store action into a playful reward — choose the action, set the prize, the platform runs the rest.'
                : "Avis Google, abonnés Instagram, inscriptions newsletter… Vous fixez l'action à booster et la récompense à offrir. Vos clients jouent, gagnent et reviennent."}
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
