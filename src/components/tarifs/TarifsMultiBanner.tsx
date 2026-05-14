'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Building2, ArrowRight } from 'lucide-react';

export const TarifsMultiBanner = () => {
  const t = useTranslations('pricing.enterprise');

  return (
    <section className="relative py-12 md:py-16 bg-[var(--bg-primary)] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div
            className="rounded-3xl p-7 md:p-9 border flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6"
            style={{
              background:
                'linear-gradient(135deg, rgba(124,92,252,0.04) 0%, rgba(232,67,147,0.04) 100%)',
              borderColor: 'rgba(124,92,252,0.15)',
            }}
          >
            <div className="flex items-start gap-4 text-center md:text-left">
              <div
                className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-xl items-center justify-center text-white shadow-[0_8px_20px_rgba(124,92,252,0.25)]"
                style={{ background: 'linear-gradient(135deg, #7C5CFC 0%, #E84393 100%)' }}
              >
                <Building2 size={22} />
              </div>
              <div>
                <h3 className="font-display font-extrabold uppercase text-lg md:text-xl text-[var(--text-primary)] mb-1.5 tracking-wide">
                  {t('title')}
                </h3>
                <p className="text-sm md:text-base text-[var(--text-body)] leading-snug">
                  {t('body')}
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 flex-shrink-0 font-display font-bold uppercase text-xs md:text-sm tracking-wider text-white px-6 py-3.5 rounded-full shadow-[0_10px_28px_rgba(124,92,252,0.3)] hover:scale-[1.03] transition-transform"
              style={{ background: 'linear-gradient(135deg, #7C5CFC 0%, #E84393 100%)' }}
            >
              {t('cta')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
