'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useOnboarding } from '@/components/ui/OnboardingProvider';

export const CTA = () => {
  const { openModal } = useOnboarding();
  const locale = useLocale();
  const t = useTranslations('home.finalCta');
  const isEn = locale === 'en';
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scaleContent = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 bg-gradient-to-b from-[#1B6FC2]/10 dark:from-[#1B6FC2]/20 to-[var(--bg-primary)]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ scale: scaleContent }}
        className="container mx-auto px-4 sm:px-6 relative z-10 text-center"
      >
        <h2 className="text-5xl md:text-7xl font-extrabold uppercase mb-8 text-[var(--text-primary)]">
          {isEn ? 'Ready to' : 'Prêt à'} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">
            {isEn ? 'bet on success?' : 'parier sur le succès ?'}
          </span>
        </h2>
        <p className="text-xl text-[var(--text-body)] max-w-2xl mx-auto mb-12">
          {isEn
            ? 'Join 500+ local businesses already transforming their reviews into rewards.'
            : "Rejoignez plus de 500 commerces qui ont transformé leurs avis clients en récompenses."}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(27, 111, 194, 0.5)' }}
            className="w-full md:w-auto bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] text-white px-12 py-5 rounded-full font-bold text-xl uppercase shadow-[0_0_20px_rgba(27,111,194,0.4)] transition-all flex items-center justify-center"
          >
            {isEn ? 'Create a free account' : 'Créer un compte gratuit'}
          </motion.button>
          <span className="text-[var(--text-muted)] text-sm uppercase font-bold tracking-widest">
            {t('badges.noCard')}
          </span>
        </div>
      </motion.div>
    </section>
  );
};
