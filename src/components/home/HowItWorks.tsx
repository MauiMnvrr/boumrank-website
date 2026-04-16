'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Settings, QrCode, Gamepad2, Store } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { useOnboarding } from '@/components/ui/OnboardingProvider';
import Link from 'next/link';

type Step = {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  accent: string;
};

const steps: Step[] = [
  {
    icon: Settings,
    title: 'Configurez',
    subtitle: 'Votre jeu en 2 minutes',
    description:
      "Choisissez Roue, Slots ou Blackjack. Personnalisez les lots, les probabilités et le design aux couleurs de votre commerce.",
    gradient: 'linear-gradient(135deg, #1B6FC2 0%, #144F8C 100%)',
    accent: '#1B6FC2',
  },
  {
    icon: QrCode,
    title: 'Affichez',
    subtitle: 'Le QR code prêt à poser',
    description:
      "Sur la table, le comptoir, l'addition, la vitrine. Nous vous envoyons les supports imprimables : vous n'avez qu'à les poser.",
    gradient: 'linear-gradient(135deg, #1E9DAA 0%, #177A85 100%)',
    accent: '#1E9DAA',
  },
  {
    icon: Gamepad2,
    title: 'Vos clients jouent',
    subtitle: 'Avis Google · Follow · Newsletter',
    description:
      "Ils scannent, réalisent l'action marketing que vous avez choisie, puis lancent le jeu pour tenter de débloquer un lot.",
    gradient: 'linear-gradient(135deg, #2EAE6D 0%, #1E8A52 100%)',
    accent: '#2EAE6D',
  },
  {
    icon: Store,
    title: 'Ils reviennent gagner',
    subtitle: 'Swipe caissier · Achat min · Fini',
    description:
      "Le gagnant revient en boutique avec son coupon. Votre caissier vérifie le minimum d'achat et swipe le coupon : plus jamais utilisable, fraude impossible.",
    gradient: 'linear-gradient(135deg, #F28C28 0%, #D47318 100%)',
    accent: '#F28C28',
  },
];

export const HowItWorks = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { openModal } = useOnboarding();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      id="comment-ca-marche"
      className="relative py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(27,111,194,0.06),transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <Eyebrow variant="subtle" size="md" className="mb-5">
            Comment ça marche
          </Eyebrow>
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            Quatre étapes.
            <br />
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_50%,#2EAE6D_100%)]">
              Cinq minutes. Zéro friction.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            Du setup au premier avis Google encaissé, voici le parcours complet.
          </p>
        </motion.div>

        {/* Desktop frise horizontale */}
        <div className="hidden md:block relative max-w-6xl mx-auto">
          {/* Connecting line background */}
          <div className="absolute top-16 left-[10%] right-[10%] h-[3px] bg-[var(--border-default)] rounded-full z-0" />
          {/* Connecting line progress animated */}
          <motion.div
            style={{ width: lineWidth }}
            className="absolute top-16 left-[10%] h-[3px] rounded-full z-0 bg-[linear-gradient(90deg,#1B6FC2_0%,#1E9DAA_33%,#2EAE6D_66%,#F28C28_100%)] shadow-[0_0_15px_rgba(27,111,194,0.4)]"
          />

          <div className="grid grid-cols-4 gap-4 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon bubble */}
                <div className="relative mb-6">
                  <div
                    className="w-32 h-32 rounded-full flex items-center justify-center text-white shadow-[0_16px_40px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-300"
                    style={{ background: step.gradient }}
                  >
                    <step.icon className="w-12 h-12" />
                  </div>
                  {/* Number badge */}
                  <div className="absolute -top-1 -right-1 w-10 h-10 rounded-full bg-white border-4 border-[var(--bg-primary)] flex items-center justify-center font-display font-extrabold text-sm text-[var(--text-primary)] shadow-md">
                    {i + 1}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="font-display font-extrabold uppercase text-lg mb-1"
                  style={{ color: step.accent }}
                >
                  {step.title}
                </h3>

                {/* Subtitle */}
                <div className="text-xs text-[var(--text-muted)] font-display font-semibold uppercase tracking-wider mb-3">
                  {step.subtitle}
                </div>

                {/* Description */}
                <p className="text-sm text-[var(--text-body)] leading-relaxed px-2">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden relative pl-12">
          {/* Vertical line background */}
          <div className="absolute top-0 bottom-0 left-[23px] w-[3px] bg-[var(--border-default)] rounded-full" />
          {/* Vertical line progress */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute top-0 left-[23px] w-[3px] rounded-full bg-[linear-gradient(180deg,#1B6FC2_0%,#1E9DAA_33%,#2EAE6D_66%,#F28C28_100%)] shadow-[0_0_12px_rgba(27,111,194,0.4)]"
          />

          <div className="flex flex-col gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Icon bubble (mobile) — positioned on the line */}
                <div className="absolute -left-12 top-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] relative"
                    style={{ background: step.gradient }}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3
                    className="font-display font-extrabold uppercase text-lg mb-1"
                    style={{ color: step.accent }}
                  >
                    <span className="text-xs text-[var(--text-muted)] mr-2">{i + 1}.</span>
                    {step.title}
                  </h3>
                  <div className="text-xs text-[var(--text-muted)] font-display font-semibold uppercase tracking-wider mb-2">
                    {step.subtitle}
                  </div>
                  <p className="text-sm text-[var(--text-body)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button onClick={openModal} variant="gradient" size="lg">
            Configurer mon commerce
          </Button>
          <Link
            href="/comment-ca-marche"
            className="text-[var(--primary-blue)] hover:text-[var(--primary-blue-dark)] font-display font-bold text-sm uppercase tracking-wider transition-colors underline underline-offset-4 decoration-2 decoration-[var(--primary-blue)]/30 hover:decoration-[var(--primary-blue)]"
          >
            Voir le détail complet →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
