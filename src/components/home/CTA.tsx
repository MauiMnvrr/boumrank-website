'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useOnboarding } from '@/components/ui/OnboardingProvider';

export const CTA = () => {
  const { openModal } = useOnboarding();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scaleContent = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 bg-gradient-to-b from-[#1B6FC2]/10 dark:from-[#1B6FC2]/20 to-[var(--bg-primary)]"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ scale: scaleContent }}
        className="container mx-auto px-6 relative z-10 text-center"
      >
        <h2 className="text-5xl md:text-7xl font-extrabold uppercase mb-8 text-[var(--text-primary)]">
          Pr&ecirc;t &agrave; <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">Parier sur le succ&egrave;s ?</span>
        </h2>
        <p className="text-xl text-[var(--text-body)] max-w-2xl mx-auto mb-12">
          Rejoignez plus de 500 entreprises qui ont transform&eacute; leur culture d&apos;entreprise.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(27, 111, 194, 0.5)" }}
            className="w-full md:w-auto bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] text-white px-12 py-5 rounded-full font-bold text-xl uppercase shadow-[0_0_20px_rgba(27,111,194,0.4)] transition-all flex items-center justify-center"
          >
            Cr&eacute;er un compte Gratuit
          </motion.button>
          <span className="text-[var(--text-muted)] text-sm uppercase font-bold tracking-widest">Aucune CB requise</span>
        </div>
      </motion.div>
    </section>
  );
};
