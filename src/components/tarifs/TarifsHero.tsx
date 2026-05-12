'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export const TarifsHero = () => {
  const t = useTranslations('pricing.hero');

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-[var(--bg-primary)]">
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(46,174,109,0.1),transparent_70%)] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display font-extrabold uppercase text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 text-[var(--text-primary)]">
            {t('title1')}{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_50%,#2EAE6D_100%)]">
              {t('title2')}
            </span>
            <br />
            {t('title3')}
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            {t('subtitle')}{' '}
            <span className="text-[var(--text-primary)] font-semibold">
              {t('subtitleHighlight')}
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
