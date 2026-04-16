'use client';

import { useState, useEffect, createElement } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Star, Gift, ChevronLeft, Upload, Clock, LayoutGrid, Ticket, MoreHorizontal, MapPin, Sparkles, Zap } from 'lucide-react';
import Image from 'next/image';
import { useOnboarding } from '@/components/ui/OnboardingProvider';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
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

const FOOD_EMOJIS = ['🍔', '🌭', '🌮', '🌯', '🥙', '🥗', '🥓', '🍗', '🍖', '🍟', '🍕', '🥪', '🍱', '🥘', '🧆', '🍲', '🍛', '🍜', '🍳', '🥟', '🍿', '🍤', '🍣', '🍝', '🥞', '🧇', '🍪', '🍩', '🧁', '🍦', '🎂', '🍰', '🥧', '🍮', '🍧', '🍨', '🍭', '🍫', '🍬', '🍆', '🍑', '🍓', '🍍', '🍊', '🍎', '🍌', '🥑', '🍒', '🍋', '🥥', '🥚', '🧀', '🥜', '🥔', '🥩', '🍞', '🥯', '🥝', '🍉', '🍇', '🥦', '🥖', '🥒', '🍯', '🥕', '🌽'];

const EmojiRain = () => {
  const [drops, setDrops] = useState<{ emoji: string; left: string; duration: number; delay: number; size: number }[]>([]);

  useEffect(() => {
    setDrops(
      Array.from({ length: 40 }).map((_, i) => ({
        emoji: FOOD_EMOJIS[i % FOOD_EMOJIS.length],
        left: Math.floor(Math.random() * 100) + '%',
        duration: Math.random() * 20 + 15,
        delay: Math.random() * -30,
        size: Math.random() * 1.5 + 1,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {drops.map((drop, i) => (
        <motion.div
          key={i}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: '110vh', opacity: [0, 0.18, 0.18, 0], rotate: [0, 360] }}
          transition={{ duration: drop.duration, repeat: Infinity, delay: drop.delay, ease: 'linear' }}
          style={{ left: drop.left, fontSize: `${drop.size}rem` }}
          className="absolute top-0 pointer-events-none select-none filter blur-[1px] z-0"
        >
          {drop.emoji}
        </motion.div>
      ))}
    </div>
  );
};

const BottomNav = () => (
  <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#0D1117] border-t border-[#1B6FC2]/20 flex justify-around items-center px-4 z-20 backdrop-blur-md">
    <div className="flex flex-col items-center gap-1 text-[#3A8FE0]">
      <LayoutGrid size={20} className="drop-shadow-[0_0_5px_rgba(27,111,194,0.5)]" />
      <span className="text-[10px] font-bold uppercase tracking-wide">Jouer</span>
    </div>
    <div className="flex flex-col items-center gap-1 text-gray-500">
      <Ticket size={20} />
      <span className="text-[10px] font-bold uppercase tracking-wide">Tickets</span>
    </div>
    <div className="flex flex-col items-center gap-1 text-gray-500">
      <MoreHorizontal size={20} />
      <span className="text-[10px] font-bold uppercase tracking-wide">Menu</span>
    </div>
  </div>
);

const ScreenHome = () => (
  <div className="flex flex-col h-full bg-[#0D1117] relative overflow-hidden font-sans">
    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#1B6FC2]/10 to-transparent"></div>
    <div className="absolute top-10 right-10 w-20 h-20 bg-[#7C5CFC] rounded-full blur-[50px] opacity-40"></div>
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10">
      <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(27,111,194,0.2)] overflow-hidden">
        <Image src="/logos/logo-original-v2-transparent.png" alt="BoumRank" width={96} height={96} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-white text-4xl font-extrabold uppercase mb-2 drop-shadow-lg">
        Joue & <span className="text-[#3A8FE0] text-glow">Gagne !</span>
      </h3>
      <p className="text-gray-400 font-medium mb-10 text-sm max-w-[200px] leading-relaxed">
        Choisis ton défi et remporte ton prochain repas <span className="text-[#3A8FE0]">⚡</span>
      </p>
      <div className="w-full space-y-3">
        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D] py-3 rounded-xl flex items-center justify-center gap-3 text-white font-bold text-sm uppercase shadow-[0_0_20px_rgba(27,111,194,0.4)] hover:scale-105 transition-transform cursor-pointer block no-underline">
          <span>🎰</span> Machine à Sous
        </a>
        <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="w-full bg-[#161B22] border border-white/10 py-3 rounded-xl flex items-center justify-center gap-3 text-white font-bold text-sm hover:bg-[#161B22]/80 hover:scale-105 transition-all cursor-pointer block no-underline">
          <span>🎡</span> Roue Fortune
        </a>
      </div>
    </div>
    <BottomNav />
  </div>
);

const ScreenActions = () => (
  <div className="flex flex-col h-full bg-[#0D1117] font-sans">
    <div className="p-4 flex items-center gap-2 text-white/70">
      <ChevronLeft size={20} />
      <span className="font-bold text-sm uppercase">Retour</span>
    </div>
    <div className="flex-1 px-6 flex flex-col items-center pt-8">
      <div className="w-16 h-16 bg-[#161B22] border border-[#1B6FC2]/30 rounded-full flex items-center justify-center mb-4">
        <span className="text-3xl">🚀</span>
      </div>
      <h3 className="text-white text-xl font-extrabold uppercase mb-1">Choisis une action</h3>
      <p className="text-gray-400 text-xs mb-8">Prouve ton engagement ! 📸</p>
      <div className="w-full space-y-3">
        {['Avis Google', 'Instagram', 'Facebook'].map((action, i) => (
          <div key={i} className="bg-[#161B22] p-4 rounded-xl border border-white/10 flex items-center gap-3 font-bold text-white shadow-lg">
            {action === 'Avis Google' ? <Star size={18} className="text-[#3A8FE0]" /> : action === 'Instagram' ? <InstagramIcon size={18} /> : <FacebookIcon size={18} />}
            {action}
          </div>
        ))}
      </div>
    </div>
    <BottomNav />
  </div>
);

const ScreenSlots = () => (
  <div className="flex flex-col h-full bg-[#0D1117] font-sans relative">
    <div className="p-4 flex items-center gap-2 text-white/70 absolute top-0 left-0 z-20">
      <ChevronLeft size={20} />
      <span className="font-bold text-sm uppercase">Retour</span>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <h3 className="text-white text-xl font-extrabold uppercase mb-10">
        Machine à <span className="text-[#3A8FE0] text-glow">Sous</span>
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
        En cours...
      </button>
    </div>
    <BottomNav />
  </div>
);

const ScreenWheel = () => (
  <div className="flex flex-col h-full bg-[#0D1117] relative overflow-hidden font-sans">
    <div className="p-4 flex items-center gap-2 text-white/70 absolute top-0 left-0 z-20">
      <ChevronLeft size={20} />
      <span className="font-bold text-sm uppercase">Retour</span>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center mt-6">
      <h3 className="text-white text-3xl font-extrabold uppercase mb-12 text-glow">Spin & Win</h3>
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
        Lancer la roue
      </button>
    </div>
  </div>
);

const ScreenWin = () => (
  <div className="flex flex-col h-full bg-[#0D1117] font-sans relative">
    <div className="p-4 flex items-center gap-2 text-white/70">
      <ChevronLeft size={20} />
      <span className="font-bold text-sm uppercase">Retour</span>
    </div>
    <div className="px-6 pb-20 overflow-y-auto pt-4">
      <h2 className="text-2xl font-extrabold text-[#3A8FE0] text-center mb-8 text-glow uppercase tracking-wide">
        1 Cookie Gratuit
      </h2>
      <div className="bg-[#161B22] rounded-lg p-4 mb-8 border border-white/10">
        <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">
          <span className="flex items-center gap-2"><Clock size={12} /> EXPIRATION</span>
          <span className="text-white">59:56</span>
        </div>
        <div className="w-full bg-[#1C2333] rounded-full h-1.5 overflow-hidden">
          <div className="bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D] h-full rounded-full w-[80%] shadow-[0_0_10px_rgba(27,111,194,0.5)]"></div>
        </div>
      </div>
      <div className="space-y-6 mb-8">
        <div>
          <h4 className="font-bold text-white text-[10px] uppercase tracking-widest mb-3">Preuve Requise</h4>
          <div className="bg-[#161B22]/30 border-2 border-dashed border-[#1B6FC2]/20 rounded-xl h-24 flex flex-col items-center justify-center text-center">
            <Upload className="text-gray-500 mb-2 w-5 h-5" />
            <p className="text-gray-500 text-[9px] font-bold uppercase">Upload ton screenshot</p>
          </div>
        </div>
      </div>
      <button className="w-full bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D] text-white font-bold uppercase py-3.5 rounded-xl shadow-[0_0_25px_rgba(27,111,194,0.4)] text-sm tracking-wide">
        Valider ma preuve
      </button>
    </div>
    <BottomNav />
  </div>
);

// =====================================================
// HERO COMPONENT — Layout principal
// =====================================================

export const Hero = () => {
  const { openModal } = useOnboarding();
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 50]);
  const [currentScreen, setCurrentScreen] = useState(0);
  const screens = [ScreenHome, ScreenActions, ScreenSlots, ScreenWheel, ScreenWin];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [screens.length]);

  const scrollToDemo = () => {
    const target = document.getElementById('demo-roue');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Fallback : scroll to next section if demo-roue not yet built
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen pt-24 pb-12 overflow-hidden flex items-center bg-[var(--bg-primary)]">
      {/* Background : radial gradient + emoji rain */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(27,111,194,0.08),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(27,111,194,0.1),transparent_70%)]" />
        <EmojiRain />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT — Copy & CTAs (refonte complète Jour 2) */}
          <motion.div
            style={{ y: yText }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-left"
          >
            {/* Eyebrow gradient orange (gamification accent) */}
            <Eyebrow variant="orange" size="md" withDot className="mb-6">
              Plus d&apos;avis Google grâce au jeu
            </Eyebrow>

            {/* H1 — punchline avec mots-clés en gradient */}
            <h1 className="font-display font-extrabold uppercase text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 text-[var(--text-primary)]">
              Vos clients laissent un{' '}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_50%,#2EAE6D_100%)]">
                avis Google
              </span>
              .
              <br />
              Ils repartent avec un{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#F28C28_0%,#FBAB5C_100%)]">
                  lot à venir gagner
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[linear-gradient(135deg,#F28C28_0%,#FBAB5C_100%)] rounded-full opacity-30" />
              </span>
              .
            </h1>

            {/* Sub-headline */}
            <p className="text-[var(--text-body)] text-lg md:text-xl mb-8 max-w-xl leading-relaxed">
              Un QR code, un mini-jeu de casino, un coupon à dégainer en caisse.
              Vous décuplez vos avis, vos abonnés et vos retours client —{' '}
              <span className="text-[var(--text-primary)] font-semibold">
                sans app, sans compétence technique, setup en 5 minutes.
              </span>
            </p>

            {/* Double CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button onClick={openModal} variant="gradient" size="lg">
                <Sparkles size={18} />
                Lancer ma démo gratuite
              </Button>
              <Button onClick={scrollToDemo} variant="subtle" size="lg">
                <Zap size={18} />
                Voir la roue en action
              </Button>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--text-muted)] font-display font-semibold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[var(--primary-teal)]" />
                <span>Conçu à Marseille</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                <span>Soutenu par Pépite Aix-Marseille</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary-green)] animate-pulse" />
                  Beta active depuis Janvier 2026
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Mockup smartphone (CONSERVÉ TEL QUEL — chef d'œuvre) */}
          <div className="relative flex justify-center perspective-1000">
            <motion.div
              initial={{ rotateY: -20, rotateX: 10, opacity: 0 }}
              animate={{ rotateY: -12, rotateX: 5, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.2 }}
              className="relative w-[320px] h-[650px] bg-[#1a1a1a] rounded-[3rem] border-8 border-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[linear-gradient(135deg,rgba(27,111,194,0.15)_0%,rgba(46,174,109,0.15)_100%)] rounded-full blur-[80px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
