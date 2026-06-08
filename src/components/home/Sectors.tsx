'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { trackEvent } from '@/lib/events';
import { Utensils, Scissors, ShoppingBag, ArrowRight, Star, TrendingUp, Heart } from 'lucide-react';
import { Card } from '@/components/ui/Card';

type Sector = {
  id: string;
  icon: React.ReactNode;
  emoji: string;
  name: string;
  tagline: string;
  body: string;
  perks: { icon: React.ReactNode; label: string }[];
  gradient: string;
  accent: string;
  href: string;
};

const FR_SECTORS: Sector[] = [
  {
    id: 'restaurants',
    icon: <Utensils size={24} />,
    emoji: '🍔',
    name: 'Restaurants & bars',
    tagline: 'Vos clients adorent votre cuisine. Faites-le savoir à Google.',
    body:
      'Bistros, pizzerias, salons de thé, food trucks : transformez la fin du repas en moment de jeu et vos avis en carburant pour remplir le service du soir.',
    perks: [
      { icon: <Star size={14} />, label: '+47 avis Google en 6 semaines' },
      { icon: <TrendingUp size={14} />, label: '25 % de retours sur le ticket du soir' },
      { icon: <Heart size={14} />, label: "Pic de satisfaction = pic d'avis" },
    ],
    gradient: 'linear-gradient(135deg, #1B6FC2 0%, #1E9DAA 100%)',
    accent: '#1B6FC2',
    href: '/secteurs/restaurants',
  },
  {
    id: 'salons',
    icon: <Scissors size={24} />,
    emoji: '💇',
    name: 'Salons & beauté',
    tagline: "L'avis de la cliente heureuse, pris avant qu'elle repasse la porte.",
    body:
      "Coiffure, barbier, esthétique, onglerie : activez vos clientes à la fin de la prestation, au moment où la satisfaction est à son pic. Elles jouent, elles gagnent, elles reviennent pour encaisser.",
    perks: [
      { icon: <Star size={14} />, label: 'Avis collectés en sortie de fauteuil' },
      { icon: <TrendingUp size={14} />, label: '+1 prestation / mois en moyenne' },
      { icon: <Heart size={14} />, label: 'Followers Insta qui décollent' },
    ],
    gradient: 'linear-gradient(135deg, #E84393 0%, #7C5CFC 100%)',
    accent: '#E84393',
    href: '/secteurs/salons-beaute',
  },
  {
    id: 'boutiques',
    icon: <ShoppingBag size={24} />,
    emoji: '🛍️',
    name: 'Boutiques & retail',
    tagline: 'Votre flyer fidélité, version jackpot.',
    body:
      "Concept store, librairie, caviste, fleuriste, déco : remplacez la carte de fidélité poussiéreuse par un jeu qui se raconte entre amis — et qui double votre liste d'abonnés Insta en 6 semaines.",
    perks: [
      { icon: <Star size={14} />, label: 'Fidélité gamifiée, sans carte papier' },
      { icon: <TrendingUp size={14} />, label: 'Panier moyen : +18 %' },
      { icon: <Heart size={14} />, label: 'Bouche-à-oreille boosté' },
    ],
    gradient: 'linear-gradient(135deg, #2EAE6D 0%, #1E9DAA 100%)',
    accent: '#2EAE6D',
    href: '/secteurs/boutiques-retail',
  },
];

const EN_SECTORS: Sector[] = [
  {
    id: 'restaurants',
    icon: <Utensils size={24} />,
    emoji: '🍔',
    name: 'Restaurants & bars',
    tagline: 'Your customers love your food. Make sure Google knows it.',
    body:
      'Bistros, pizzerias, tea rooms, food trucks: turn the end of a meal into a game moment, and your reviews into fuel to fill the evening service.',
    perks: [
      { icon: <Star size={14} />, label: '+47 Google reviews in 6 weeks' },
      { icon: <TrendingUp size={14} />, label: '25% return rate on the evening ticket' },
      { icon: <Heart size={14} />, label: 'Satisfaction peak = review peak' },
    ],
    gradient: 'linear-gradient(135deg, #1B6FC2 0%, #1E9DAA 100%)',
    accent: '#1B6FC2',
    href: '/secteurs/restaurants',
  },
  {
    id: 'salons',
    icon: <Scissors size={24} />,
    emoji: '💇',
    name: 'Salons & beauty',
    tagline: "The happy client's review — captured before she walks out the door.",
    body:
      "Hair salons, barbershops, aesthetics, nail studios: engage your clients at the end of their appointment, when satisfaction is at its peak. They play, they win, they come back to redeem.",
    perks: [
      { icon: <Star size={14} />, label: 'Reviews collected right from the chair' },
      { icon: <TrendingUp size={14} />, label: '+1 appointment per month on average' },
      { icon: <Heart size={14} />, label: 'Insta followers taking off' },
    ],
    gradient: 'linear-gradient(135deg, #E84393 0%, #7C5CFC 100%)',
    accent: '#E84393',
    href: '/secteurs/salons-beaute',
  },
  {
    id: 'boutiques',
    icon: <ShoppingBag size={24} />,
    emoji: '🛍️',
    name: 'Boutiques & retail',
    tagline: 'Your loyalty card — jackpot edition.',
    body:
      "Concept stores, bookshops, wine bars, florists, décor: replace the dusty stamp card with a game your customers talk about — and double your Insta following in 6 weeks.",
    perks: [
      { icon: <Star size={14} />, label: 'Gamified loyalty, no paper card' },
      { icon: <TrendingUp size={14} />, label: 'Average basket: +18%' },
      { icon: <Heart size={14} />, label: 'Word-of-mouth on turbo' },
    ],
    gradient: 'linear-gradient(135deg, #2EAE6D 0%, #1E9DAA 100%)',
    accent: '#2EAE6D',
    href: '/secteurs/boutiques-retail',
  },
];

export const Sectors = () => {
  const locale = useLocale();
  const isEn = locale === 'en';
  const sectors = isEn ? EN_SECTORS : FR_SECTORS;

  return (
    <section
      id="pour-qui"
      data-section="sectors"
      className="relative py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden"
    >
      {/* Background decorative emojis (pale) */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.06] text-9xl">
        <div className="absolute top-[10%] left-[8%] rotate-[-12deg]">🍕</div>
        <div className="absolute top-[60%] right-[10%] rotate-[15deg]">💅</div>
        <div className="absolute bottom-[15%] left-[40%] rotate-[-8deg]">🛒</div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            {isEn ? 'Built for businesses' : 'Pensé pour les commerces'}{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#F28C28_0%,#E84393_100%)]">
              {isEn ? 'that want to play' : 'qui veulent jouer'}
            </span>
            <br />
            {isEn ? '— and win' : '— et gagner'}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            {isEn ? 'Three sectors, one mechanic,' : 'Trois secteurs, une même mécanique,'}{' '}
            <span className="text-[var(--text-primary)] font-semibold">{isEn ? 'results that take off.' : 'des résultats qui décollent.'}</span>
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={sector.href} className="block h-full group">
                <Card
                  variant="glass"
                  padding="lg"
                  className="h-full flex flex-col relative overflow-hidden transition-all group-hover:shadow-[0_20px_56px_rgba(0,0,0,0.14)]"
                >
                  {/* Top accent bar (gradient) */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: sector.gradient }}
                  />

                  {/* Big emoji (pale background) */}
                  <div className="absolute top-4 right-4 text-6xl opacity-20 group-hover:opacity-30 transition-opacity group-hover:scale-110 duration-300">
                    {sector.emoji}
                  </div>

                  {/* Icon */}
                  <div
                    className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center text-white mb-5 shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                    style={{ background: sector.gradient }}
                  >
                    {sector.icon}
                  </div>

                  {/* Name */}
                  <h3 className="relative z-10 font-display font-extrabold uppercase text-xl text-[var(--text-primary)] mb-3 leading-tight">
                    {sector.name}
                  </h3>

                  {/* Tagline (quote) */}
                  <p
                    className="relative z-10 text-base font-display font-semibold italic mb-4 leading-snug"
                    style={{ color: sector.accent }}
                  >
                    « {sector.tagline} »
                  </p>

                  {/* Body */}
                  <p className="relative z-10 text-sm text-[var(--text-body)] leading-relaxed mb-5">
                    {sector.body}
                  </p>

                  {/* Perks */}
                  <ul className="relative z-10 space-y-2 mb-5">
                    {sector.perks.map((perk, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2 text-xs text-[var(--text-secondary)]"
                      >
                        <span style={{ color: sector.accent }}>{perk.icon}</span>
                        <span>{perk.label}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA footer */}
                  <div className="relative z-10 mt-auto pt-4 border-t border-[var(--border-default)]">
                    <span
                      className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-wider transition-colors"
                      style={{ color: sector.accent }}
                    >
                      {isEn ? 'Discover for my sector' : 'Découvrir pour mon secteur'}
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12 max-w-2xl mx-auto"
        >
          <p className="text-sm text-[var(--text-muted)] italic">
            {isEn
              ? 'In a different industry (services, events, tourism, franchise)?'
              : 'Vous êtes dans un autre secteur (services, événementiel, tourisme, franchise) ?'}{' '}
            <Link
              href="/contact"
              onClick={() => trackEvent('contact_click', { cta_location: 'sectors' })}
              className="text-[var(--primary-blue)] font-semibold not-italic hover:underline"
            >
              {isEn ? 'We adapt BoumRank to your business →' : 'On adapte BoumRank à votre métier →'}
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
