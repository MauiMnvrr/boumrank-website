'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Smartphone, Bot, Store, ShieldCheck, Database, TrendingUp, Clock, Users, Zap } from 'lucide-react';

interface AdvantageCardProps {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  advantage: string;
  result: string;
  index: number;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({ icon: Icon, title, advantage, result, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-[var(--bg-surface)] dark:bg-[#161B22] p-6 rounded-2xl border border-[var(--border-default)] hover:border-[#1B6FC2]/50 transition-all group relative overflow-hidden shadow-sm dark:shadow-none"
  >
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-[var(--text-primary)]">
      <Icon size={80} />
    </div>

    <div className="w-12 h-12 rounded-lg bg-[var(--bg-elevated)] dark:bg-[#0D1117] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      <Icon className="text-[#1B6FC2] w-6 h-6" />
    </div>

    <h3 className="text-xl font-extrabold uppercase text-[var(--text-primary)] mb-3">{title}</h3>

    <div className="space-y-3">
      <div>
        <span className="text-xs font-bold text-[#7C5CFC] uppercase tracking-wider block mb-1">L&apos;Avantage</span>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{advantage}</p>
      </div>

      <div className="pt-3 border-t border-[var(--border-default)]">
        <span className="text-xs font-bold text-[#2EAE6D] uppercase tracking-wider block mb-1">Le R&eacute;sultat</span>
        <p className="text-[var(--text-primary)] font-medium text-sm">{result}</p>
      </div>
    </div>
  </motion.div>
);

export const CompetitiveAdvantages = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const advantages = [
    {
      icon: Sparkles,
      title: "L\u2019Engagement Dopamine",
      advantage: "Contrairement aux enqu\u00eates ennuyeuses, nous offrons une exp\u00e9rience \u00e9motionnelle excitante.",
      result: "Un taux de participation explosif compar\u00e9 aux solutions classiques."
    },
    {
      icon: Smartphone,
      title: "Z\u00e9ro Friction (No-App)",
      advantage: "Pas d\u2019app lourde \u00e0 t\u00e9l\u00e9charger. Tout se passe sur le navigateur mobile via QR Code.",
      result: "Scan \u2192 Jeu \u2192 Gain en moins de 30 secondes."
    },
    {
      icon: Bot,
      title: "Automatisation Totale",
      advantage: "Votre staff ne v\u00e9rifie rien. Notre moteur IA valide les preuves instantan\u00e9ment 24/7.",
      result: "Une campagne de fid\u00e9lit\u00e9 autonome qui ne ralentit pas votre service."
    },
    {
      icon: Store,
      title: "Drive-to-Store",
      advantage: "Les r\u00e9compenses sont stock\u00e9es num\u00e9riquement et incitent \u00e0 une nouvelle visite pour \u00eatre d\u00e9pens\u00e9es.",
      result: "Augmentation de la fr\u00e9quence de visite et du panier moyen."
    },
    {
      icon: ShieldCheck,
      title: "S\u00e9curit\u00e9 Anti-Fraude",
      advantage: "D\u00e9tection automatique des doublons, des montages et des preuves invalides.",
      result: "Vous ne distribuez des cadeaux qu\u2019aux vrais clients qui ont consomm\u00e9."
    },
    {
      icon: Database,
      title: "Data Marketing",
      advantage: "En \u00e9change du jeu, nous collectons l\u00e9galement les emails de vos clients (RGPD).",
      result: "Une base de donn\u00e9es qualifi\u00e9e pour vous affranchir des algos sociaux."
    }
  ];

  return (
    <section ref={containerRef} className="py-24 bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Abstract Background */}
      <motion.div
        style={{ y: yBg }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-b from-[#7C5CFC]/5 dark:from-[#7C5CFC]/10 to-transparent rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#1B6FC2] font-bold uppercase tracking-widest text-sm">Pourquoi nous ?</span>
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase mt-4 mb-6 text-[var(--text-primary)]">
            L&apos;Avantage <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">Injuste</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
            Ne jouez pas seulement pour participer. Jouez pour gagner des parts de march&eacute;.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {advantages.map((adv, idx) => (
            <AdvantageCard key={idx} {...adv} index={idx} />
          ))}
        </div>

        {/* Summary Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[var(--bg-surface)] dark:bg-gradient-to-r dark:from-[#161B22] dark:to-[#1C2333] rounded-2xl p-8 border border-[var(--border-highlight)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-full bg-[#1B6FC2]/5 skew-x-12 transform translate-x-20"></div>

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {[
              { icon: TrendingUp, text: "Boostez votre C.A.", sub: "Revenus r\u00e9currents" },
              { icon: Clock, text: "Gagnez du temps", sub: "IA Autonome" },
              { icon: Users, text: "Connaissez vos clients", sub: "Data Propri\u00e9taire" },
              { icon: Zap, text: "Modernisez votre image", sub: "Exp\u00e9rience Digitale" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="flex items-center gap-3 mb-2">
                  <item.icon className="text-[#1B6FC2] w-5 h-5" />
                  <span className="font-bold text-[var(--text-primary)] uppercase text-sm md:text-xs lg:text-sm">{item.text}</span>
                </div>
                <span className="text-[var(--text-secondary)] text-xs pl-8 md:pl-8">{item.sub}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
