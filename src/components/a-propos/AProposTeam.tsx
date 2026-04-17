'use client';

import { motion } from 'framer-motion';
import { Code2, Megaphone, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';

type Founder = {
  name: string;
  role: string;
  tag: string;
  icon: React.ReactNode;
  emoji: string;
  gradient: string;
  accent: string;
  bio: string;
  highlights: string[];
};

const founders: Founder[] = [
  {
    name: 'Maui',
    role: 'CEO & Dev',
    tag: 'Co-fondateur · CEO · Tech Lead',
    icon: <Code2 size={22} />,
    emoji: '👨‍💻',
    gradient: 'linear-gradient(135deg, #1B6FC2 0%, #1E9DAA 100%)',
    accent: '#1B6FC2',
    bio: "Maui, c'est la moitié gaming de la boîte. Passionné de game design depuis l'ado (il connaît la courbe de dopamine d'une machine à sous par cœur) et dev full-stack de formation, il pilote le produit, l'architecture technique et la vision long terme. C'est lui qui a codé la première version de la Roue en un week-end de janvier 2026, quand l'idée a germé.",
    highlights: [
      'A codé la première Roue en 1 week-end',
      'Teste personnellement chaque nouveau jeu auprès de restos du Vieux-Port',
      "Obsession : que chaque interaction soit aussi satisfaisante qu'un jackpot de Vegas",
    ],
  },
  {
    name: 'Liam',
    role: 'Commercial & Marketing',
    tag: 'Co-fondateur · Head of Commercial & Marketing',
    icon: <Megaphone size={22} />,
    emoji: '📣',
    gradient: 'linear-gradient(135deg, #2EAE6D 0%, #F28C28 100%)',
    accent: '#2EAE6D',
    bio: "Liam, c'est l'arme de contact avec le terrain. Il a passé les 10 dernières années à côtoyer les commerçants du Sud — restos, bars, salons, boutiques — et il connaît leurs galères par cœur : les formations marketing chiantes, les outils qui demandent un doctorat, les devis qui n'arrivent jamais.",
    highlights: [
      "Onboarde chaque nouveau client BoumRank personnellement",
      "Pousse Maui à simplifier encore et encore le produit",
      "Joignable en direct sur WhatsApp (pas de hotline à Bangalore)",
    ],
  },
];

export const AProposTeam = () => {
  return (
    <section className="relative py-20 md:py-24 bg-[var(--bg-primary)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(27,111,194,0.06),transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Eyebrow variant="subtle" size="md" className="mb-5">
            L&apos;équipe
          </Eyebrow>
          <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-4 text-[var(--text-primary)]">
            Deux fondateurs, un objectif,{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]">
              zéro bullshit
            </span>
            .
          </h2>
          <p className="text-lg text-[var(--text-secondary)] italic">
            Les cerveaux derrière BoumRank, joignables direct sur WhatsApp.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card variant="solid" padding="lg" className="h-full relative overflow-hidden">
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: founder.gradient }}
                />

                {/* Emoji background */}
                <div className="absolute top-6 right-6 text-7xl opacity-15 select-none pointer-events-none">
                  {founder.emoji}
                </div>

                {/* Icon + name */}
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                    style={{ background: founder.gradient }}
                  >
                    {founder.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold uppercase text-2xl text-[var(--text-primary)] leading-tight">
                      {founder.name}
                    </h3>
                    <div
                      className="text-sm font-display font-semibold"
                      style={{ color: founder.accent }}
                    >
                      {founder.role}
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-display font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4 pb-4 border-b border-[var(--border-default)]">
                  {founder.tag}
                </div>

                {/* Bio */}
                <p className="text-sm text-[var(--text-body)] leading-relaxed mb-5">
                  {founder.bio}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-5">
                  {founder.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                      <span
                        className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
                        style={{ background: founder.accent }}
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Contact */}
                <div className="mt-auto pt-4 border-t border-[var(--border-default)] flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <MessageCircle size={14} style={{ color: founder.accent }} />
                  <span>
                    <span style={{ color: founder.accent }} className="font-semibold">
                      {founder.name.toLowerCase()}@boumrank.com
                    </span>{' '}
                    · WhatsApp direct
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
