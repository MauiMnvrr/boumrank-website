'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Settings, QrCode, Smartphone, RefreshCw } from 'lucide-react';

const steps = [
  {
    icon: Settings,
    title: "1. Configurez",
    desc: "Cr\u00e9ez votre campagne en 2 min. Choisissez les gains et les probabilit\u00e9s.",
    color: "#7C5CFC"
  },
  {
    icon: QrCode,
    title: "2. Affichez",
    desc: "Placez le QR Code en caisse, sur les tables ou sur vos flyers.",
    color: "#00CEC9"
  },
  {
    icon: Smartphone,
    title: "3. Ils Jouent",
    desc: "Le client scanne, joue et gagne instantan\u00e9ment sur son mobile.",
    color: "#2EAE6D"
  },
  {
    icon: RefreshCw,
    title: "4. Ils Reviennent",
    desc: "Le client revient en magasin pour utiliser son coupon gagnant.",
    color: "#E74C3C"
  }
];

export const HowItWorks = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-24 bg-[var(--bg-elevated)] relative overflow-hidden">

      {/* Section Header */}
      <div className="container mx-auto px-6 mb-20 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#1B6FC2] font-bold uppercase tracking-widest text-sm"
        >
          Simple comme bonjour
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold uppercase mt-4 text-[var(--text-primary)]"
        >
          Comment &ccedil;a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">Marche ?</span>
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Desktop View (Horizontal) */}
        <div className="hidden md:flex justify-between items-start relative">

          {/* Connecting Line Background */}
          <div className="absolute top-12 left-0 w-full h-1 bg-[var(--border-default)] rounded-full z-0"></div>

          {/* Connecting Line Progress (Animated) */}
          <motion.div
            style={{ width: lineWidth }}
            className="absolute top-12 left-0 h-1 bg-gradient-to-r from-[#7C5CFC] via-[#2EAE6D] to-[#E74C3C] rounded-full z-0 shadow-[0_0_15px_rgba(27,111,194,0.5)]"
          />

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center w-64 group">

              {/* Icon Bubble */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 rounded-full bg-[var(--bg-surface)] dark:bg-[#0D1117] border-4 border-[var(--bg-elevated)] dark:border-[#161B22] group-hover:border-[var(--text-primary)] transition-colors flex items-center justify-center mb-6 relative shadow-xl"
              >
                <div
                  className="absolute inset-0 rounded-full opacity-20 blur-md group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: step.color }}
                />
                <step.icon className="w-10 h-10 text-[var(--text-primary)]" />

                {/* Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[var(--bg-surface)] dark:bg-[#161B22] border-2 border-[var(--border-default)] flex items-center justify-center font-extrabold text-sm text-[var(--text-primary)]">
                  {index + 1}
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.2 }}
              >
                <h3 className="text-xl font-extrabold uppercase mb-3" style={{ color: step.color }}>{step.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm font-medium leading-relaxed px-2">
                  {step.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Mobile View (Vertical) */}
        <div className="md:hidden relative flex flex-col gap-12 pl-8">

          {/* Connecting Line Background */}
          <div className="absolute top-0 bottom-0 left-[27px] w-1 bg-[var(--border-default)] rounded-full z-0"></div>

          {/* Connecting Line Progress (Animated) */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute top-0 left-[27px] w-1 bg-gradient-to-b from-[#7C5CFC] via-[#2EAE6D] to-[#E74C3C] rounded-full z-0 shadow-[0_0_15px_rgba(27,111,194,0.5)]"
          />

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex items-start text-left gap-6">
              {/* Icon Bubble */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
                className="flex-shrink-0 w-14 h-14 rounded-full bg-[var(--bg-surface)] dark:bg-[#0D1117] border-2 border-[var(--bg-elevated)] dark:border-[#161B22] flex items-center justify-center relative shadow-xl z-20"
              >
                <step.icon className="w-6 h-6 text-[var(--text-primary)]" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.1 }}
                className="pt-1"
              >
                <h3 className="text-xl font-extrabold uppercase mb-2" style={{ color: step.color }}>{step.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm font-medium leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
