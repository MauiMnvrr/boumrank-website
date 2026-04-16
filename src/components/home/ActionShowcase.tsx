'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Share2 } from 'lucide-react';

// --- Custom Brand Icons ---

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.5 12.2857C23.5 11.4594 23.4259 10.7059 23.2974 10H12V14.5086H18.5244C18.2571 16.0353 17.3486 17.3871 15.9943 18.3188V21.432H19.8629C22.1371 19.3188 23.5 16.1553 23.5 12.2857Z" fill="#4285F4"/>
    <path d="M12 24C15.2286 24 17.9571 22.9247 19.8629 21.432L15.9943 18.3188C14.9057 19.0635 13.5429 19.4753 12 19.4753C8.86286 19.4753 6.22286 17.3624 5.27143 14.5082H1.28571V17.5976C3.25714 21.5129 7.32857 24 12 24Z" fill="#34A853"/>
    <path d="M5.27143 14.5082C5.02286 13.7788 4.88571 13.0047 4.88571 12.2141C4.88571 11.4235 5.02286 10.6494 5.27143 9.92001V6.83057H1.28571C0.462857 8.46825 0 10.2965 0 12.2141C0 14.1318 0.462857 15.96 1.28571 17.5976L5.27143 14.5082Z" fill="#FBBC05"/>
    <path d="M12 4.95294C13.7314 4.95294 15.2914 5.54824 16.5343 6.70353L20.0143 3.22353C17.9314 1.28471 15.2286 0 12 0C7.32857 0 3.25714 2.48706 1.28571 6.40235L5.27143 9.49176C6.22286 6.63765 8.86286 4.95294 12 4.95294Z" fill="#EA4335"/>
  </svg>
);

const TripAdvisorLogo = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="https://cdn.freebiesupply.com/logos/large/2x/tripadvisor-2-logo-png-transparent.png"
    alt="TripAdvisor"
    className="w-full h-full object-contain"
  />
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// --- Main Component ---

export const ActionShowcase = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={containerRef} className="py-24 bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Background Ambience */}
      <motion.div
        style={{ y: yBg }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#2EAE6D]/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[var(--bg-surface)] dark:bg-[#161B22] border border-[var(--border-default)] px-4 py-1.5 rounded-full mb-6"
          >
            <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
            <span className="text-yellow-600 dark:text-yellow-400 text-xs font-bold uppercase tracking-widest">Objectifs Multiples</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold uppercase mb-6 text-[var(--text-primary)]"
          >
            Choisissez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-[#1B6FC2]">Objectif</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg"
          >
            Ne demandez plus, gamifiez. Incitez vos clients &agrave; r&eacute;aliser l&apos;action qui compte le plus pour votre croissance.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-5 gap-6 max-w-5xl mx-auto">

          {/* Card 1: E-Reputation (Larger - 3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-3 bg-[var(--bg-surface)] dark:bg-[#161B22]/40 backdrop-blur-md rounded-2xl p-8 border border-yellow-500/30 hover:border-yellow-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)] transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-yellow-500/20"></div>

            <div className="flex gap-4 mb-6">
              {/* Google Icon */}
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <GoogleIcon />
              </div>

              {/* TripAdvisor Icon */}
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                <TripAdvisorLogo />
              </div>
            </div>

            <h3 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-3 flex items-center gap-2">
              Boostez votre <span className="text-yellow-500">E-R&eacute;putation</span>
            </h3>
            <p className="text-[var(--text-body)] font-medium leading-relaxed">
              Multipliez vos avis 5 &eacute;toiles m&eacute;caniquement. Le client poste une capture d&apos;&eacute;cran de son avis positif pour d&eacute;bloquer le jeu.
            </p>

            <div className="mt-6 flex items-center gap-2 text-yellow-600 dark:text-yellow-400 text-sm font-bold uppercase tracking-wide opacity-80 group-hover:opacity-100">
              <Star className="w-4 h-4 fill-current" />
              <span>Impact Imm&eacute;diat sur le r&eacute;f&eacute;rencement local</span>
            </div>
          </motion.div>

          {/* Card 2: Social (Smaller - 2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="md:col-span-2 bg-[var(--bg-surface)] dark:bg-gradient-to-br dark:from-[#161B22]/60 dark:to-[#7C5CFC]/20 backdrop-blur-md rounded-2xl p-8 border border-[var(--border-default)] hover:border-[#7C5CFC] hover:shadow-[0_0_30px_rgba(124,92,252,0.2)] transition-all group relative overflow-hidden flex flex-col justify-between"
          >
            <div className="flex gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-lg flex items-center justify-center text-white shadow-lg">
                <InstagramIcon />
              </div>
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white border border-gray-700 shadow-lg">
                <TikTokIcon />
              </div>
              <div className="w-10 h-10 bg-[#1877F2] rounded-lg flex items-center justify-center text-white shadow-lg">
                <FacebookIcon />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-extrabold uppercase text-[var(--text-primary)] mb-2">
                Engagez votre <span className="text-[#7C5CFC]">Communaut&eacute;</span>
              </h3>
              <p className="text-[var(--text-body)] text-sm leading-relaxed mb-4">
                Gagnez des followers qualifi&eacute;s. &quot;Abonnez-vous pour lancer la roue !&quot;
              </p>

              <div className="flex items-center gap-2 text-[#7C5CFC] text-xs font-bold uppercase tracking-wide">
                <Share2 className="w-3 h-3" />
                <span>Viralit&eacute; garantie</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ActionShowcase;
