'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScanEye, ShieldAlert, Bot, UserCheck, Zap, BrainCircuit, Lock, Fingerprint } from 'lucide-react';

const FeatureBlock = ({ icon: Icon, title, children, delay }: { icon: React.ComponentType<{ className?: string }>, title: string, children?: React.ReactNode, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex gap-4 mb-8"
  >
    <div className="flex-shrink-0">
      <div className="w-12 h-12 rounded-lg bg-[var(--bg-surface)] dark:bg-[#161B22] border border-[var(--border-highlight)] flex items-center justify-center">
        <Icon className="text-[#1B6FC2] w-6 h-6" />
      </div>
    </div>
    <div>
      <h4 className="text-xl font-bold uppercase text-[var(--text-primary)] mb-2">{title}</h4>
      <div className="text-[var(--text-secondary)] text-sm leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  </motion.div>
);

export const AIValidation = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="py-24 bg-[var(--bg-elevated)] relative overflow-hidden">
      {/* Background Tech Elements */}
      <motion.div style={{ y: yBg }} className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7C5CFC]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[var(--bg-surface)] dark:bg-[#161B22] border border-[var(--border-highlight)] px-4 py-1.5 rounded-full mb-6">
            <ShieldAlert className="w-4 h-4 text-[#1B6FC2]" />
            <span className="text-[#1B6FC2] text-xs font-bold uppercase tracking-widest">S&eacute;curit&eacute; Maximale</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase mb-6 text-[var(--text-primary)]">
            Validation IA : <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">Fiabilit&eacute; &agrave; toute &eacute;preuve</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
            L&apos;IA agit comme premi&egrave;re ligne de d&eacute;fense (vitesse), tandis que le Dashboard Admin assure le contr&ocirc;le final.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content - Features */}
          <div>
            <FeatureBlock icon={ScanEye} title="1. Analyse Visuelle Cognitive" delay={0.2}>
              <p>Notre technologie ne se contente pas de regarder, elle <strong>comprend</strong>.</p>
              <ul className="list-disc list-inside mt-2 text-[var(--text-muted)]">
                <li><span className="text-[var(--text-body)]">OCR Avanc&eacute; :</span> Lit les mots-cl&eacute;s obligatoires.</li>
                <li><span className="text-[var(--text-body)]">Validation de crit&egrave;res :</span> V&eacute;rifie les 5 &eacute;toiles ou les dates.</li>
              </ul>
            </FeatureBlock>

            <FeatureBlock icon={Fingerprint} title="2. Bouclier Anti-Fraude" delay={0.3}>
              <p>Fini les tricheurs qui r&eacute;utilisent la m&ecirc;me photo.</p>
              <ul className="list-disc list-inside mt-2 text-[var(--text-muted)]">
                <li><span className="text-[var(--text-body)]">Hachage d&apos;image :</span> D&eacute;tecte les doublons m&ecirc;me recadr&eacute;s.</li>
                <li><span className="text-[var(--text-body)]">Analyse de m&eacute;tadonn&eacute;es :</span> &Eacute;carte les montages grossiers.</li>
              </ul>
            </FeatureBlock>

            <FeatureBlock icon={UserCheck} title="3. Mod&egrave;le Hybride" delay={0.4}>
              <p>L&apos;alliance parfaite entre vitesse et contr&ocirc;le humain.</p>
              <ul className="list-disc list-inside mt-2 text-[var(--text-muted)]">
                <li><span className="text-[var(--text-body)]">Escalade Intelligente :</span> Les cas douteux sont marqu&eacute;s &quot;&Agrave; v&eacute;rifier&quot;.</li>
                <li><span className="text-[var(--text-body)]">Validation Swipe :</span> Interface rapide pour l&apos;admin.</li>
              </ul>
            </FeatureBlock>
          </div>

          {/* Right Content - Visual Demo (stays dark-themed as it's a product mockup) */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative mx-auto w-full max-w-md aspect-[3/4] bg-[#0D1117] rounded-3xl border border-[#7C5CFC]/30 p-4 shadow-2xl overflow-hidden"
            >
              {/* Simulated Image Content */}
              <div className="w-full h-full bg-[#161B22] rounded-xl relative overflow-hidden flex flex-col items-center justify-center border border-white/5">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center grayscale"></div>

                {/* Scanning Beam */}
                <motion.div
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D] shadow-[0_0_20px_rgba(27,111,194,0.8)] z-20"
                />

                {/* Detection Boxes */}
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="absolute top-1/4 left-1/4 w-1/2 h-12 border-2 border-[#1B6FC2] rounded bg-[#1B6FC2]/10 flex items-center justify-center"
                >
                  <span className="bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D] text-white text-[10px] font-bold px-1 absolute -top-2 left-2">MATCH</span>
                </motion.div>

                <div className="relative z-10 bg-[#0D1117]/90 backdrop-blur border border-[#1B6FC2] px-6 py-4 rounded-xl flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D] flex items-center justify-center">
                    <Bot className="text-white w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <div className="text-[#3A8FE0] font-bold uppercase text-lg">Valid&eacute;</div>
                    <div className="text-xs text-gray-400">Confiance IA: 99.8%</div>
                  </div>
                </div>
              </div>

              {/* Decorative Tech Lines */}
              <div className="absolute top-10 right-4 w-2 h-16 bg-[#7C5CFC]/50 rounded-full"></div>
              <div className="absolute bottom-10 left-4 w-2 h-8 bg-[#2EAE6D]/50 rounded-full"></div>
            </motion.div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16">
          {[
            { icon: Zap, label: "Instantan\u00e9", sub: "< 3 sec" },
            { icon: BrainCircuit, label: "Intelligent", sub: "Analyse s\u00e9mantique" },
            { icon: Lock, label: "S\u00e9curis\u00e9", sub: "Anti-doublon" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + (idx * 0.1) }}
              whileHover={{ scale: 1.05 }}
              className="bg-[var(--bg-surface)] dark:bg-[#161B22]/50 border border-[var(--border-default)] p-6 rounded-xl text-center group transition-colors"
            >
              <stat.icon className="w-8 h-8 text-[var(--text-secondary)] group-hover:text-[#1B6FC2] mx-auto mb-3 transition-colors" />
              <div className="font-bold text-[var(--text-primary)] uppercase text-sm">{stat.label}</div>
              <div className="text-[#1B6FC2] text-xs font-mono mt-1">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
