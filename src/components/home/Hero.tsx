'use client';

import { useState, useEffect, createElement } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Star, Gift, ChevronLeft, Upload, Clock, LayoutGrid, Ticket, MoreHorizontal, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useOnboarding } from '@/components/ui/OnboardingProvider';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { AuroraBackground } from '@/components/decorative/AuroraBackground';
import { RevealOnScroll } from '@/components/decorative/RevealOnScroll';
import { DEMO_URL } from '@/lib/constants';

// =====================================================
// Mockup smartphone — 5 écrans cycliques (loop d'environ 22s)
// Conservé du Hero précédent, juste isolé dans un module logique
// =====================================================

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const BottomNav = () => {
  const t = useTranslations('home.hero.mockup');
  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#0D1117] border-t border-[#1B6FC2]/20 flex justify-around items-center px-4 z-20 backdrop-blur-md">
      <div className="flex flex-col items-center gap-1 text-[#3A8FE0]">
        <LayoutGrid size={20} className="drop-shadow-[0_0_5px_rgba(27,111,194,0.5)]" />
        <span className="text-[10px] font-bold uppercase tracking-wide">{t('play')}</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-gray-500">
        <Ticket size={20} />
        <span className="text-[10px] font-bold uppercase tracking-wide">{t('tickets')}</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-gray-500">
        <MoreHorizontal size={20} />
        <span className="text-[10px] font-bold uppercase tracking-wide">{t('menu')}</span>
      </div>
    </div>
  );
};

const ScreenHome = () => {
  const t = useTranslations('home.hero.mockup');
  const playWin = t('playWin');
  const exclaim = playWin.split('&').slice(-1)[0]?.trim() ?? playWin;
  const before = playWin.includes('&') ? playWin.split('&')[0].trim() + ' & ' : '';
  return (
    <div className="flex flex-col h-full bg-[#0D1117] relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#1B6FC2]/10 to-transparent"></div>
      <div className="absolute top-10 right-10 w-20 h-20 bg-[#7C5CFC] rounded-full blur-[50px] opacity-40"></div>
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(27,111,194,0.2)] overflow-hidden">
          <Image src="/logos/logo-original-v2-transparent.png" alt="BoumRank" width={96} height={96} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-white text-4xl font-extrabold uppercase mb-2 drop-shadow-lg">
          {before}
          <span className="text-[#3A8FE0] text-glow">{exclaim}</span>
        </h3>
        <p className="text-gray-400 font-medium mb-10 text-sm max-w-[200px] leading-relaxed">
          {t('chooseChallenge')} <span className="text-[#3A8FE0]">⚡</span>
        </p>
        <div className="w-full space-y-3">
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D] py-3 rounded-xl flex items-center justify-center gap-3 text-white font-bold text-sm uppercase shadow-[0_0_20px_rgba(27,111,194,0.4)] hover:scale-105 transition-transform cursor-pointer block no-underline">
            <span>🎰</span> {t('slotMachine')}
          </a>
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="w-full bg-[#161B22] border border-white/10 py-3 rounded-xl flex items-center justify-center gap-3 text-white font-bold text-sm hover:bg-[#161B22]/80 hover:scale-105 transition-all cursor-pointer block no-underline">
            <span>🎡</span> {t('fortuneWheel')}
          </a>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

const ScreenActions = () => {
  const t = useTranslations('home.hero.mockup');
  const tCommon = useTranslations('common');
  const actions: { key: 'googleReview' | 'instagram' | 'facebook'; icon: React.ReactNode }[] = [
    { key: 'googleReview', icon: <Star size={18} className="text-[#3A8FE0]" /> },
    { key: 'instagram', icon: <InstagramIcon size={18} /> },
    { key: 'facebook', icon: <FacebookIcon size={18} /> },
  ];
  return (
    <div className="flex flex-col h-full bg-[#0D1117] font-sans">
      <div className="p-4 flex items-center gap-2 text-white/70">
        <ChevronLeft size={20} />
        <span className="font-bold text-sm uppercase">{tCommon('back')}</span>
      </div>
      <div className="flex-1 px-6 flex flex-col items-center pt-8">
        <div className="w-16 h-16 bg-[#161B22] border border-[#1B6FC2]/30 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">🚀</span>
        </div>
        <h3 className="text-white text-xl font-extrabold uppercase mb-1">{t('chooseAction')}</h3>
        <p className="text-gray-400 text-xs mb-8">{t('proveCommitment')} 📸</p>
        <div className="w-full space-y-3">
          {actions.map((a) => (
            <div key={a.key} className="bg-[#161B22] p-4 rounded-xl border border-white/10 flex items-center gap-3 font-bold text-white shadow-lg">
              {a.icon}
              {t(a.key)}
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

const ScreenSlots = () => {
  const t = useTranslations('home.hero.mockup');
  const tCommon = useTranslations('common');
  const slots = t('slots');
  // split on the last word for visual emphasis (matches FR "Machine à Sous" / EN "Slot Machine")
  const tokens = slots.split(' ');
  const last = tokens.pop() ?? slots;
  const head = tokens.join(' ');
  return (
    <div className="flex flex-col h-full bg-[#0D1117] font-sans relative">
      <div className="p-4 flex items-center gap-2 text-white/70 absolute top-0 left-0 z-20">
        <ChevronLeft size={20} />
        <span className="font-bold text-sm uppercase">{tCommon('back')}</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-white text-xl font-extrabold uppercase mb-10">
          {head} <span className="text-[#3A8FE0] text-glow">{last}</span>
        </h3>
      <div className="relative w-full max-w-[240px] bg-[#4a2e00] border-[4px] border-[#a16207] rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
        <div className="relative bg-[#1a1a1a] rounded-lg border-2 border-black p-2.5 flex gap-2 h-28 overflow-hidden">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-1 bg-white rounded-md flex flex-col items-center justify-center relative overflow-hidden">
              <motion.div animate={{ y: [0, -120, 0] }} transition={{ duration: 0.15 + (i * 0.05), repeat: Infinity, ease: 'linear' }} className="flex flex-col gap-5 py-4">
                <span className="text-2xl">⭐</span>
                <span className="text-2xl">🎁</span>
                <span className="text-2xl">🍒</span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <button className="mt-12 bg-[#1B6FC2]/10 border-2 border-[#1B6FC2]/40 text-[#3A8FE0] w-4/5 py-3 rounded-xl font-bold uppercase text-[10px] animate-pulse">
        {t('loading')}
      </button>
    </div>
    <BottomNav />
  </div>
  );
};

const ScreenWheel = () => {
  const t = useTranslations('home.hero.mockup');
  const tCommon = useTranslations('common');
  return (
  <div className="flex flex-col h-full bg-[#0D1117] relative overflow-hidden font-sans">
    <div className="p-4 flex items-center gap-2 text-white/70 absolute top-0 left-0 z-20">
      <ChevronLeft size={20} />
      <span className="font-bold text-sm uppercase">{tCommon('back')}</span>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center mt-6">
      <h3 className="text-white text-3xl font-extrabold uppercase mb-12 text-glow">{t('spinWin')}</h3>
      <div className="relative w-64 h-64 flex items-center justify-center">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-[#3A8FE0]"></div>
        </div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full rounded-full border-4 border-[#161B22] relative overflow-hidden"
          style={{
            background: `conic-gradient(from 0deg, #161B22 0deg 30deg, #1C2333 30deg 60deg, #161B22 60deg 90deg, #1C2333 90deg 120deg, #161B22 120deg 150deg, #1C2333 150deg 180deg, #161B22 180deg 210deg, #1C2333 210deg 240deg, #161B22 240deg 270deg, #1C2333 270deg 300deg, #161B22 300deg 330deg, #1C2333 330deg 360deg)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-[#3A8FE0] flex items-center justify-center bg-[#0D1117] z-10">
            <Gift size={32} className="text-[#3A8FE0]" />
          </div>
        </div>
      </div>
      <button className="mt-16 bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D] text-white w-4/5 py-4 rounded-xl font-bold text-lg uppercase shadow-[0_0_20px_rgba(27,111,194,0.5)]">
        {t('spinWheel')}
      </button>
    </div>
  </div>
  );
};

const ScreenWin = () => {
  const t = useTranslations('home.hero.mockup');
  const tCommon = useTranslations('common');
  return (
    <div className="flex flex-col h-full bg-[#0D1117] font-sans relative">
      <div className="p-4 flex items-center gap-2 text-white/70">
        <ChevronLeft size={20} />
        <span className="font-bold text-sm uppercase">{tCommon('back')}</span>
      </div>
      <div className="px-6 pb-20 overflow-y-auto pt-4">
        <h2 className="text-2xl font-extrabold text-[#3A8FE0] text-center mb-8 text-glow uppercase tracking-wide">
          {t('freeCookie')}
        </h2>
        <div className="bg-[#161B22] rounded-lg p-4 mb-8 border border-white/10">
          <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">
            <span className="flex items-center gap-2"><Clock size={12} /> {t('expiration')}</span>
            <span className="text-white">59:56</span>
          </div>
          <div className="w-full bg-[#1C2333] rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D] h-full rounded-full w-[80%] shadow-[0_0_10px_rgba(27,111,194,0.5)]"></div>
          </div>
        </div>
        <div className="space-y-6 mb-8">
          <div>
            <h4 className="font-bold text-white text-[10px] uppercase tracking-widest mb-3">{t('proofRequired')}</h4>
            <div className="bg-[#161B22]/30 border-2 border-dashed border-[#1B6FC2]/20 rounded-xl h-24 flex flex-col items-center justify-center text-center">
              <Upload className="text-gray-500 mb-2 w-5 h-5" />
              <p className="text-gray-500 text-[9px] font-bold uppercase">{t('uploadScreenshot')}</p>
            </div>
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D] text-white font-bold uppercase py-3.5 rounded-xl shadow-[0_0_25px_rgba(27,111,194,0.4)] text-sm tracking-wide">
          {t('validateProof')}
        </button>
      </div>
      <BottomNav />
    </div>
  );
};

// =====================================================
// HERO COMPONENT — Layout principal
// =====================================================

export const Hero = () => {
  const { openModal } = useOnboarding();
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 50]);
  const [currentScreen, setCurrentScreen] = useState(0);
  const screens = [ScreenHome, ScreenActions, ScreenSlots, ScreenWheel];
  const t = useTranslations('home.hero');
  const tCommon = useTranslations('common');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [screens.length]);

  return (
    <section className="relative min-h-[100dvh] pt-24 pb-16 overflow-hidden flex items-center bg-[var(--bg-primary)]">
      {/* Signature aurora background — replaces previous radial gradient + emoji rain */}
      <AuroraBackground variant="auto" intensity="medium" />

      {/* Subtle dotted grid overlay for texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.15] dark:opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, currentColor 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          color: 'var(--text-muted)',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 80%)',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* LEFT — Copy & CTAs */}
          <motion.div
            style={{ y: yText }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            {/* Eyebrow — clé d'entrée brand */}
            <RevealOnScroll mode="fade" delay={0.05}>
              <Eyebrow variant="subtle" size="sm" withDot className="mb-5">
                QR · Mini-jeux · Avis Google
              </Eyebrow>
            </RevealOnScroll>

            {/* H1 — punchline avec mots-cles en gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extrabold uppercase text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 text-[var(--text-primary)]"
            >
              {t('h1Part1')}{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_100%)]">
                {t('h1Word1')}
              </span>
              ,{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1E9DAA_0%,#2EAE6D_100%)]">
                {t('h1Word2')}
              </span>
              ,
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#F28C28_0%,#FBAB5C_100%)]">
                  {t('h1Final')}
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0 }}
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-[linear-gradient(135deg,#F28C28_0%,#FBAB5C_100%)] rounded-full opacity-40"
                />
              </span>
              .
            </motion.h1>

            {/* Sub-headline */}
            <RevealOnScroll mode="fade" delay={0.25}>
              <p className="text-[var(--text-body)] text-base sm:text-lg md:text-xl mb-7 max-w-xl leading-relaxed">
                {t('subhead')}
              </p>
            </RevealOnScroll>

            {/* CTA */}
            <RevealOnScroll mode="fade" delay={0.35}>
              <div className="flex flex-col sm:flex-row gap-4 mb-7">
                <Button onClick={openModal} variant="gradient" size="lg" className="w-full sm:w-auto">
                  <Sparkles size={18} />
                  {tCommon('tryFreeFortnight')}
                </Button>
              </div>
            </RevealOnScroll>

            {/* Identity chips — secteurs commerce */}
            <RevealOnScroll mode="split" delay={0.45} stagger={0.06}>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {['Restaurant', 'Boulangerie', 'Salon', 'Café', 'Boutique'].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-default)] shadow-[0_2px_8px_rgba(15,23,42,0.04)]"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--primary-green)]" />
                    {label}
                  </span>
                ))}
              </div>
            </RevealOnScroll>

          </motion.div>

          {/* RIGHT — Mockup smartphone with subtle float loop */}
          <motion.div
            className="relative flex justify-center perspective-1000 origin-top"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              initial={{ rotateY: -20, rotateX: 10, opacity: 0 }}
              animate={{ rotateY: -12, rotateX: 5, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.2 }}
              className="relative w-[260px] sm:w-[300px] md:w-[340px] lg:w-[360px] h-[560px] sm:h-[620px] md:h-[700px] lg:h-[740px] bg-[#1a1a1a] rounded-[3rem] border-8 border-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-50"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-xl z-50"></div>
              <div className="w-full h-full bg-[#0D1117] pt-8 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScreen}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    {createElement(screens[currentScreen])}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
            {/* Glow halo behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[320px] md:w-[400px] h-[260px] sm:h-[320px] md:h-[400px] bg-[linear-gradient(135deg,rgba(27,111,194,0.15)_0%,rgba(46,174,109,0.15)_100%)] rounded-full blur-[80px] -z-10" />
          </motion.div>
        </div>

        {/* Scroll indicator — SVG draw-on line + chevron */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[var(--text-secondary)]"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Découvrir</span>
          <svg width="2" height="48" viewBox="0 0 2 48" fill="none">
            <motion.line
              x1="1" y1="0" x2="1" y2="48"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};
