'use client';

import { motion } from 'framer-motion';
import { Network, Sparkles, ArrowRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { useOnboarding } from '@/components/ui/OnboardingProvider';

export const Vision = () => {
  const { openModal } = useOnboarding();

  return (
    <section
      id="vision"
      className="relative py-24 md:py-32 overflow-hidden bg-[var(--bg-primary)]"
    >
      {/* Full-width gradient card (not full-width section to keep container rhythm) */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden max-w-6xl mx-auto"
          style={{
            background: 'linear-gradient(135deg, #1B6FC2 0%, #1E9DAA 40%, #2EAE6D 100%)',
          }}
        >
          {/* Animated decorative blobs */}
          <motion.div
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{
              x: [0, -40, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F28C28]/20 rounded-full blur-3xl pointer-events-none"
          />

          {/* Connected network pattern (decorative SVG) */}
          <svg
            className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="network-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="white" />
                <line x1="30" y1="30" x2="90" y2="30" stroke="white" strokeWidth="0.5" />
                <line x1="30" y1="30" x2="30" y2="90" stroke="white" strokeWidth="0.5" />
                <line x1="30" y1="30" x2="0" y2="60" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#network-grid)" />
          </svg>

          {/* Content */}
          <div className="relative z-10 py-16 md:py-20 px-8 md:px-16 text-center">
            {/* Top : "Bientôt" badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full mb-6"
            >
              <Sparkles size={14} className="text-[#F28C28]" />
              <span className="text-white text-xs font-display font-bold uppercase tracking-widest">
                Roadmap 2026 · En cours de build
              </span>
            </motion.div>

            {/* H2 */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-display font-extrabold uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
            >
              Demain, vos coupons{' '}
              <span className="inline-block text-transparent bg-clip-text bg-[linear-gradient(135deg,#F28C28_0%,#FBAB5C_50%,#FFFFFF_100%)]">
                circuleront dans tout le quartier
              </span>
              .
            </motion.h2>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-white/90 text-lg md:text-xl font-display font-semibold mb-8"
            >
              La marketplace cross-promo BoumRank — le futur proche.
            </motion.p>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-white/85 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-10"
            >
              Imaginez un instant : votre client gagne chez vous un café offert. La semaine d&apos;après, le
              caviste d&apos;à côté le fait gagner <em className="text-white font-semibold">chez vous</em> sur
              sa propre roue. Vous partagez des clients, pas des concurrents. C&apos;est la marketplace
              cross-promo BoumRank, en cours de build pour 2026 —{' '}
              <span className="text-white font-semibold">
                et vos premiers abonnés auront la place de choix.
              </span>
            </motion.p>

            {/* Bottom : illustration network (3 nodes connected) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center justify-center gap-4 md:gap-8 mb-10"
            >
              {['🍔 Votre restaurant', '🍷 Le caviste d\'à côté', '💇 Le salon du coin'].map(
                (label, i) => (
                  <div key={i} className="flex items-center gap-3 md:gap-6">
                    <div className="flex items-center justify-center bg-white/15 backdrop-blur-md border border-white/30 rounded-full px-3 md:px-5 py-2 md:py-3 font-display font-bold text-xs md:text-sm text-white whitespace-nowrap">
                      {label}
                    </div>
                    {i < 2 && (
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.2,
                        }}
                        className="text-white/60 hidden md:block"
                      >
                        <Network size={18} />
                      </motion.div>
                    )}
                  </div>
                )
              )}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                onClick={openModal}
                variant="solid"
                size="lg"
                className="!bg-white !text-[var(--primary-blue)] hover:!bg-white/90 shadow-[0_12px_32px_rgba(0,0,0,0.2)]"
              >
                Rejoindre les premiers abonnés
                <ArrowRight size={18} />
              </Button>
              <span className="text-white/70 text-xs font-display font-bold uppercase tracking-widest">
                Accès prioritaire à la marketplace
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
