'use client';

import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { QrCode, ThumbsUp, Dices, ScanEye, Ticket, Star, Smartphone } from 'lucide-react';

const steps = [
  {
    icon: QrCode,
    title: "Le Scan Instantan\u00e9",
    desc: "Le client scanne votre QR code en boutique. Aucune application \u00e0 t\u00e9l\u00e9charger.",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-32 h-32 border-4 border-[#1B6FC2] rounded-xl relative p-2 shadow-[0_0_20px_rgba(27,111,194,0.2)]">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[var(--text-primary)] -mt-1 -ml-1"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[var(--text-primary)] -mt-1 -mr-1"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[var(--text-primary)] -mb-1 -ml-1"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[var(--text-primary)] -mb-1 -mr-1"></div>
          <QrCode className="w-full h-full text-[var(--text-primary)] opacity-90" />
          <motion.div
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1 bg-[#1B6FC2] shadow-[0_0_15px_rgba(27,111,194,0.8)] z-10 opacity-80"
          />
        </div>
      </div>
    )
  },
  {
    icon: ThumbsUp,
    title: "L\u2019Engagement",
    desc: "Il choisit une mission pour soutenir votre commerce (Avis Google, Abonnement Instagram, ...).",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="bg-white text-[#1A202C] p-6 rounded-xl shadow-lg w-48 relative transform rotate-3">
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
          </div>
          <div className="h-2 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-2 bg-gray-200 rounded w-1/2"></div>
          <div className="absolute -right-4 -bottom-4 bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] p-3 rounded-full border-4 border-[var(--bg-elevated)]">
            <ThumbsUp className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    )
  },
  {
    icon: Dices,
    title: "Le Frisson du Jeu",
    desc: "Le jeu se d\u00e9bloque (Machine \u00e0 sous, Roue de la fortune ou Blackjack). Il joue pour tenter de gagner un lot exclusif.",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 rounded-full border-4 border-[#7C5CFC] border-t-[#1B6FC2] border-r-[#2EAE6D] shadow-[0_0_30px_rgba(124,92,252,0.3)] relative bg-[var(--bg-surface)] dark:bg-[#1C2333] flex items-center justify-center"
        >
          <Dices className="w-12 h-12 text-[var(--text-primary)]" />
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-[var(--border-default)] rounded-full animate-ping opacity-20"></div>
      </div>
    )
  },
  {
    icon: ScanEye,
    title: "La Validation Magique",
    desc: "Il uploade sa preuve et notre IA la valide instantan\u00e9ment (Aucune triche possible!).",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-40 h-24 bg-[var(--bg-surface)] dark:bg-[#161B22] border border-[#1B6FC2] rounded-lg relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[#1B6FC2]/10"></div>
          <ScanEye className="w-10 h-10 text-[#1B6FC2]" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] w-full origin-left"
          />
          <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] text-white text-[10px] font-bold rounded">OK</div>
        </div>
      </div>
    )
  },
  {
    icon: Ticket,
    title: "Le Retour Garanti",
    desc: "Il re\u00e7oit son coupon digital, valable lors de sa prochaine visite, pour le faire revenir \u00e0 coup s\u00fbr.",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-48 bg-gradient-to-r from-[#7C5CFC] to-[#9B7BFF] p-4 rounded-lg shadow-xl relative overflow-hidden border-2 border-dashed border-white/30">
          <div className="w-6 h-6 bg-[var(--bg-elevated)] rounded-full absolute -left-3 top-1/2 -translate-y-1/2"></div>
          <div className="w-6 h-6 bg-[var(--bg-elevated)] rounded-full absolute -right-3 top-1/2 -translate-y-1/2"></div>
          <div className="text-center">
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Gagn&eacute; !</span>
            <div className="text-xl font-extrabold text-white uppercase my-1">1 Menu Offert</div>
            <div className="text-[10px] text-white/70">Valable 7 jours</div>
          </div>
        </div>
      </div>
    )
  }
];

export const GameScenario = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="py-24 bg-[var(--bg-elevated)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_50%,rgba(27,111,194,0.05),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[var(--bg-surface)] dark:bg-[#161B22] border border-[var(--border-highlight)] px-4 py-1.5 rounded-full mb-6">
            <Smartphone className="w-4 h-4 text-[#1B6FC2]" />
            <span className="text-[#1B6FC2] text-xs font-bold uppercase tracking-widest">Parcours Client</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase text-[var(--text-primary)]">
            Mise en <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">Situation</span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-xl mx-auto">
            De l&apos;entr&eacute;e en magasin jusqu&apos;au retour client. Une exp&eacute;rience fluide et addictive.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-[27px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-[var(--border-default)] rounded-full z-0"></div>
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute left-[27px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] origin-top rounded-full z-0 shadow-[0_0_15px_rgba(27,111,194,0.5)]"
          />

          <div className="space-y-24">
            {steps.map((step, index) => (
              <StepItem key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface StepItemProps {
  step: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    desc: string;
    visual: React.ReactNode;
  };
  index: number;
}

const StepItem: React.FC<StepItemProps> = ({ step, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}
    >
      <div className="absolute left-[27px] md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[var(--bg-elevated)] border-4 border-[var(--bg-surface)] dark:border-[#161B22] flex items-center justify-center z-10 shadow-xl group-hover:border-[#1B6FC2] transition-colors">
        <div className="w-full h-full rounded-full bg-[var(--bg-surface)] dark:bg-[#0D1117] flex items-center justify-center">
          <step.icon className="w-6 h-6 text-[#1B6FC2]" />
        </div>
        <motion.div
          initial={{ scale: 1, opacity: 0.5 }}
          whileInView={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-[#1B6FC2]"
        />
      </div>

      <div className={`flex-1 pl-20 md:pl-0 ${!isEven ? 'md:text-right' : 'md:text-left'}`}>
        <h3 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-3">
          {step.title}
        </h3>
        <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
          {step.desc}
        </p>
      </div>

      <div className="flex-1 w-full pl-20 md:pl-0">
        <div className={`h-48 rounded-2xl bg-[var(--bg-surface)]/50 dark:bg-[#161B22]/50 border border-[var(--border-default)] backdrop-blur-sm relative overflow-hidden group hover:border-[#1B6FC2]/30 transition-colors ${!isEven ? 'md:mr-auto' : 'md:ml-auto'}`}>
          {step.visual}
        </div>
      </div>
    </motion.div>
  );
};
