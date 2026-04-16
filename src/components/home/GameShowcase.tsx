'use client';

import { useState, useEffect, createElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, LayoutGrid, Ticket, MoreHorizontal, Gift } from 'lucide-react';
import Image from 'next/image';

// --- Icons & Assets ---
const GoogleIconMini = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.5 12.2857C23.5 11.4594 23.4259 10.7059 23.2974 10H12V14.5086H18.5244C18.2571 16.0353 17.3486 17.3871 15.9943 18.3188V21.432H19.8629C22.1371 19.3188 23.5 16.1553 23.5 12.2857Z" fill="#4285F4"/>
    <path d="M12 24C15.2286 24 17.9571 22.9247 19.8629 21.432L15.9943 18.3188C14.9057 19.0635 13.5429 19.4753 12 19.4753C8.86286 19.4753 6.22286 17.3624 5.27143 14.5082H1.28571V17.5976C3.25714 21.5129 7.32857 24 12 24Z" fill="#34A853"/>
    <path d="M5.27143 14.5082C5.02286 13.7788 4.88571 13.0047 4.88571 12.2141C4.88571 11.4235 5.02286 10.6494 5.27143 9.92001V6.83057H1.28571C0.462857 8.46825 0 10.2965 0 12.2141C0 14.1318 0.462857 15.96 1.28571 17.5976L5.27143 14.5082Z" fill="#FBBC05"/>
    <path d="M12 4.95294C13.7314 4.95294 15.2914 5.54824 16.5343 6.70353L20.0143 3.22353C17.9314 1.28471 15.2286 0 12 0C7.32857 0 3.25714 2.48706 1.28571 6.40235L5.27143 9.49176C6.22286 6.63765 8.86286 4.95294 12 4.95294Z" fill="#EA4335"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// --- Mini Components for Phone Screens (stay dark-themed) ---

const BottomNav = () => (
  <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#1C2333] border-t border-white/5 flex justify-around items-center px-4 z-20">
    <div className="flex flex-col items-center gap-1 text-[#3A8FE0]">
      <LayoutGrid size={20} />
      <span className="text-[10px] font-bold">Jouer</span>
    </div>
    <div className="flex flex-col items-center gap-1 text-gray-500">
      <Ticket size={20} />
      <span className="text-[10px] font-bold">Tickets</span>
    </div>
    <div className="flex flex-col items-center gap-1 text-gray-500">
      <MoreHorizontal size={20} />
      <span className="text-[10px] font-bold">Menu</span>
    </div>
  </div>
);

const ScreenHome = () => (
  <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#0D1117] to-[#161B22]">
    <div className="mb-4 w-20 h-20 rounded-2xl shadow-[0_0_30px_rgba(27,111,194,0.3)] overflow-hidden">
      <Image src="/logos/logo-original-v2-transparent.png" alt="BoumRank" width={80} height={80} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-3xl font-extrabold uppercase text-white mb-2 tracking-tighter">
      Boum<span className="text-[#3A8FE0]">Rank</span>
    </h3>
    <p className="text-gray-300 text-xs mb-8 font-medium max-w-[200px]">
      Ressentez le frisson du feedback. Gagnez &agrave; tous les coups.
    </p>
    <motion.button
      whileTap={{ scale: 0.95 }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="w-full bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D] text-white py-4 rounded-xl font-bold uppercase text-sm shadow-[0_0_20px_rgba(27,111,194,0.4)]"
    >
      Commencer maintenant
    </motion.button>
  </div>
);

const ScreenActions = () => (
  <div className="h-full flex flex-col p-6 bg-[#0D1117]">
    <div className="flex items-center gap-2 mb-8">
      <button className="text-white"><ArrowLeft className="w-5 h-5" /></button>
      <span className="font-bold text-white text-sm">Retour</span>
    </div>

    <h3 className="text-2xl font-extrabold uppercase text-white mb-8">
      Choisis une <br /><span className="text-[#3A8FE0]">Action</span>
    </h3>

    <div className="space-y-4">
      <div className="bg-[#161B22] p-4 rounded-xl border border-white/10 flex items-center gap-4 hover:border-[#1B6FC2] transition-colors cursor-pointer shadow-lg group">
        <div className="bg-white p-2 rounded-lg group-hover:scale-110 transition-transform"><GoogleIconMini /></div>
        <div className="text-sm font-bold text-white">Avis Google</div>
      </div>

      <div className="bg-[#161B22] p-4 rounded-xl border border-white/10 flex items-center gap-4 hover:border-[#E1306C] transition-colors cursor-pointer shadow-lg group">
        <div className="bg-gradient-to-tr from-yellow-400 to-purple-600 p-2 rounded-lg text-white group-hover:scale-110 transition-transform"><InstagramIcon /></div>
        <div className="text-sm font-bold text-white">Instagram</div>
      </div>
    </div>
  </div>
);

const ScreenSlots = () => (
  <div className="h-full flex flex-col bg-[#0D1117] relative overflow-hidden">
    <div className="px-5 py-6 flex items-center gap-3">
      <ArrowLeft className="text-white w-5 h-5" />
      <span className="text-white font-bold text-sm">Retour</span>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center -mt-10">
      <h3 className="text-xl font-extrabold uppercase text-white mb-8 flex items-center gap-2">
        Machine &agrave; Sous <span className="text-2xl">🎰</span>
      </h3>

      <div className="relative w-4/5 bg-gradient-to-b from-[#F28C28] to-[#E74C3C] border-[4px] border-[#a16207] rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(242,140,40,0.3)]">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-orange-500 px-4 py-1 rounded-full border border-white/30 shadow-lg z-20">
          <span className="text-white text-[9px] font-extrabold uppercase tracking-widest">JACKPOT</span>
        </div>

        <div className="relative bg-[#1a1a1a] rounded-lg border-2 border-black p-2 flex gap-2 h-24 overflow-hidden">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)] z-10 pointer-events-none -translate-y-1/2"></div>

          {[1, 2, 3].map(i => (
            <div key={i} className="flex-1 bg-white rounded-md flex flex-col items-center justify-center overflow-hidden relative">
              <motion.div
                animate={{ y: [0, -100, 0] }}
                transition={{ duration: 0.15 + (i * 0.05), repeat: Infinity, ease: "linear" }}
                className="text-2xl flex flex-col gap-4 py-2"
              >
                <span>&#11088;</span>
                <span>🎁</span>
                <span>🍒</span>
                <span>💎</span>
                <span>🍀</span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        className="mt-10 bg-[#1B6FC2]/20 border-2 border-[#1B6FC2]/40 text-[#3A8FE0] w-4/5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg animate-pulse"
      >
        En cours...
      </motion.button>
    </div>

    <BottomNav />
  </div>
);

const ScreenWheel = () => (
  <div className="h-full flex flex-col bg-[#0D1117] relative overflow-hidden">
    <div className="px-5 py-6 flex items-center gap-3">
      <ArrowLeft className="text-white w-5 h-5" />
      <span className="text-white font-bold text-sm">Retour</span>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center -mt-16">
      <h3 className="text-xl font-extrabold uppercase text-white mb-8 flex items-center gap-2">
        Roue de la Chance <span className="text-2xl">🎡</span>
      </h3>

      <div className="relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-white z-20 drop-shadow-lg"></div>
        <motion.div
          animate={{ rotate: [0, 1800 + Math.random() * 360] }}
          transition={{ duration: 3, ease: "circOut" }}
          className="w-56 h-56 rounded-full border-4 border-white shadow-2xl relative overflow-hidden bg-white"
          style={{
            background: `conic-gradient(
              #7C5CFC 0deg 45deg,
              #E84393 45deg 90deg,
              #7C5CFC 90deg 135deg,
              #E84393 135deg 180deg,
              #7C5CFC 180deg 225deg,
              #E84393 225deg 270deg,
              #7C5CFC 270deg 315deg,
              #E84393 315deg 360deg
            )`
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-[#0D1117] rounded-full flex items-center justify-center z-10 border-2 border-white">
              <Gift className="w-5 h-5 text-[#3A8FE0]" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        className="mt-10 bg-gradient-to-r from-[#7C5CFC] to-[#E84393] w-4/5 py-3 rounded-full font-bold text-white text-base uppercase shadow-lg"
      >
        Tourner !
      </motion.button>
    </div>

    <BottomNav />
  </div>
);

// --- Main Layout Component ---

export const GameShowcase = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. L\u2019Attraction",
      desc: "Le client scanne votre QR Code. Pas d\u2019inscription, pas de friction.",
      component: ScreenHome,
      duration: 3500
    },
    {
      title: "2. L\u2019Action",
      desc: "Le client r\u00e9alise l\u2019action : Avis Google, Instagram ou Quiz.",
      component: ScreenActions,
      duration: 3500
    },
    {
      title: "3. Machine \u00e0 Sous",
      desc: "Alignez 3 symboles identiques pour gagner. Un classique ind\u00e9modable qui booste l\u2019adr\u00e9naline.",
      component: ScreenSlots,
      duration: 4000
    },
    {
      title: "4. Le Jeu (Roue)",
      desc: "Roue de la chance : Une exp\u00e9rience fluide \u00e0 60FPS.",
      component: ScreenWheel,
      duration: 4000
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, steps[activeStep].duration);

    return () => clearInterval(timer);
  }, [activeStep]);

  return (
    <section className="py-24 bg-[var(--bg-elevated)] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Narrative */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-[var(--bg-surface)] dark:bg-[#161B22] border border-[var(--border-highlight)] px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#1B6FC2] rounded-full animate-ping"></span>
              <span className="text-[#1B6FC2] text-xs font-bold uppercase tracking-widest">
                Live Preview
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-extrabold uppercase mb-10 leading-none text-[var(--text-primary)]">
              L&apos;Exp&eacute;rience
              <div className="w-48 h-2 bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] mt-2 shadow-[0_0_15px_rgba(27,111,194,0.5)]"></div>
            </h2>

            <div className="space-y-8 relative">
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-[var(--border-default)] -z-10"></div>

              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex gap-6 group cursor-pointer"
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="flex-shrink-0 relative">
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg font-extrabold transition-all duration-300 z-10 relative
                      ${activeStep === idx
                        ? 'border-[#1B6FC2] text-white bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] scale-110 shadow-[0_0_20px_rgba(27,111,194,0.5)]'
                        : 'border-[var(--border-default)] text-[var(--text-muted)] bg-[var(--bg-elevated)] group-hover:border-[var(--text-secondary)]'}`}
                    >
                      {idx + 1}
                    </div>
                  </div>

                  <div className={`transition-all duration-300 ${activeStep === idx ? 'opacity-100 translate-x-2' : 'opacity-40'}`}>
                    <h3 className={`text-xl font-bold uppercase mb-1 ${activeStep === idx ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                      {step.title.split('. ')[1]}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
                      {step.desc}
                    </p>

                    {activeStep === idx && (
                      <motion.div
                        layoutId="activeLine"
                        className="h-0.5 bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] mt-3 rounded-full w-12"
                        initial={{ width: 0 }}
                        animate={{ width: 48 }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone mockup stays dark-themed */}
          <div className="order-1 lg:order-2 flex justify-center items-center h-[650px] perspective-1000">
            <motion.div
              initial={{ rotateY: -15 }}
              whileInView={{ rotateY: -5 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-[320px] h-[640px] bg-[#0D1117] rounded-[3.5rem] border-[8px] border-[#2a2a2a] shadow-[0_0_60px_rgba(0,0,0,0.6),0_20px_40px_rgba(0,0,0,0.4)] z-10 overflow-hidden ring-4 ring-black"
            >
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-bl from-white/10 via-transparent to-transparent pointer-events-none z-50"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#2a2a2a] rounded-b-2xl z-50"></div>

              <div className="w-full h-full bg-[#0D1117] pt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    {createElement(steps[activeStep].component)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[600px] bg-[#1B6FC2] blur-[120px] opacity-5 dark:opacity-10 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameShowcase;
