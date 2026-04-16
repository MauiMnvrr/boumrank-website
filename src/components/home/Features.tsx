'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PieChart, Gift } from 'lucide-react';

interface FeatureCardProps {
  icon?: React.ComponentType<{ className?: string; size?: number }>;
  customIcon?: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const WheelIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M8 22h8l-4-5z" fill="currentColor" stroke="none" />
    <circle cx="12" cy="11" r="7" />
    <path d="M12 4v14" />
    <path d="M5 11h14" />
    <path d="m7.05 6.05 9.9 9.9" />
    <path d="m16.95 6.05-9.9 9.9" />
    <circle cx="12" cy="11" r="1.5" fill="currentColor" stroke="none" />
    <path d="M2 11l3.5-2v4z" fill="currentColor" stroke="none" />
  </svg>
);

const SlotIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
    <path d="M9 3v18" />
    <path d="M15 3v18" />
    <circle cx="6" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="18" cy="18" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const DualIcons = () => (
  <div className="flex gap-4 mb-6">
    <div className="bg-[var(--bg-elevated)] dark:bg-[#0D1117] w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#1B6FC2] group-hover:via-[#1E9DAA] group-hover:to-[#2EAE6D] transition-all duration-300">
      <SlotIcon className="text-[#1B6FC2] group-hover:text-white w-7 h-7 transition-colors duration-300" />
    </div>
    <div className="bg-[var(--bg-elevated)] dark:bg-[#0D1117] w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#1B6FC2] group-hover:via-[#1E9DAA] group-hover:to-[#2EAE6D] transition-all duration-300">
      <WheelIcon className="text-[#1B6FC2] group-hover:text-white w-7 h-7 transition-colors duration-300" />
    </div>
  </div>
);

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, customIcon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 50 }}
      whileHover={{ y: -5, borderColor: '#1B6FC2', scale: 1.02 }}
      className="bg-[var(--bg-surface)] dark:bg-[#161B22] p-8 rounded-2xl border border-[var(--border-default)] hover:border-[#1B6FC2] transition-all group cursor-default relative overflow-hidden z-10 shadow-sm dark:shadow-none"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity text-[var(--text-primary)]">
        {Icon && <Icon size={100} />}
      </div>

      {customIcon ? (
        customIcon
      ) : (
        <div className="bg-[var(--bg-elevated)] dark:bg-[#0D1117] w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gradient-to-r group-hover:from-[#1B6FC2] group-hover:via-[#1E9DAA] group-hover:to-[#2EAE6D] transition-all duration-300">
          {Icon && <Icon className="text-[#1B6FC2] group-hover:text-white w-7 h-7 transition-colors duration-300" />}
        </div>
      )}

      <h3 className="text-xl font-extrabold uppercase mb-3 text-[var(--text-primary)]">{title}</h3>
      <p className="text-[var(--text-secondary)] leading-relaxed font-medium">
        {description}
      </p>
    </motion.div>
  );
};

export const Features = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scaleBg = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  const features = [
    {
      customIcon: <DualIcons />,
      title: "Slots, Roue & Blackjack",
      description: "Transformez chaque feedback en jeu. Vos clients choisissent entre la Machine \u00e0 Sous, la Roue ou le Blackjack Express pour gagner."
    },
    {
      icon: Gift,
      title: "R\u00e9compenses Flash",
      description: "Ticket gagnant envoy\u00e9 par email, utilisable \u00e0 J+1. Fixez un minimum d\u2019achat pour garantir votre rentabilit\u00e9."
    },
    {
      icon: PieChart,
      title: "Stats en Temps R\u00e9el",
      description: "Pilotage tout-en-un : Suivi de la fid\u00e9lisation, validation des preuves et configuration des jeux."
    }
  ];

  return (
    <section ref={containerRef} className="py-24 bg-[var(--bg-elevated)] relative overflow-hidden">
      <motion.div
        style={{ y: yBg1, scale: scaleBg }}
        className="absolute top-20 -left-20 w-96 h-96 bg-[#7C5CFC]/5 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        style={{ y: yBg2, scale: scaleBg }}
        className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-[#2EAE6D]/5 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="container mx-auto px-6 mb-16 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#1B6FC2] font-bold uppercase tracking-widest text-sm"
        >
          Pourquoi BoumRank ?
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold uppercase mt-4 text-[var(--text-primary)]"
        >
          Toutes les chances <br />de votre <span className="text-[#1B6FC2] underline decoration-4 underline-offset-4">C&ocirc;t&eacute;</span>
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} index={idx} />
        ))}
      </div>
    </section>
  );
};
