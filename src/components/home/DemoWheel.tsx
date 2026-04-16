'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Zap,
  Gift,
  Coffee,
  Crown,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useOnboarding } from '@/components/ui/OnboardingProvider';
import { cn } from '@/lib/utils';

// =====================================================
// Segment data — 8 segments, weighted random
// =====================================================

type Segment = {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  code: string;
  description: string;
  weight: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'jackpot';
};

const SEGMENTS: Segment[] = [
  {
    id: 'reduc-10-a',
    label: '-10€ sur le 1er mois',
    shortLabel: '-10€',
    icon: <Gift size={20} />,
    color: '#1B6FC2',
    gradient: 'linear-gradient(135deg, #1B6FC2 0%, #144F8C 100%)',
    code: 'BOUM10',
    description: '10€ de réduction sur votre premier mois d\'abonnement BoumRank.',
    weight: 3,
    rarity: 'common',
  },
  {
    id: 'cafe',
    label: 'Café offert',
    shortLabel: 'CAFÉ ☕',
    icon: <Coffee size={20} />,
    color: '#1E9DAA',
    gradient: 'linear-gradient(135deg, #1E9DAA 0%, #177A85 100%)',
    code: 'CAFEBOUM',
    description: 'Un café offert lors de votre démo personnalisée à Marseille (ou en visio).',
    weight: 2,
    rarity: 'uncommon',
  },
  {
    id: 'reduc-10-b',
    label: '-10€ sur le 1er mois',
    shortLabel: '-10€',
    icon: <Gift size={20} />,
    color: '#1B6FC2',
    gradient: 'linear-gradient(135deg, #3A8FE0 0%, #1B6FC2 100%)',
    code: 'BOUM10',
    description: '10€ de réduction sur votre premier mois d\'abonnement BoumRank.',
    weight: 3,
    rarity: 'common',
  },
  {
    id: 'jackpot',
    label: '-20€ JACKPOT',
    shortLabel: '-20€ 🎰',
    icon: <Sparkles size={20} />,
    color: '#F28C28',
    gradient: 'linear-gradient(135deg, #F28C28 0%, #D47318 100%)',
    code: 'JACKPOT20',
    description: 'Le gros lot ! 20€ de réduction sur votre premier mois.',
    weight: 1,
    rarity: 'jackpot',
  },
  {
    id: 'reduc-10-c',
    label: '-10€ sur le 1er mois',
    shortLabel: '-10€',
    icon: <Gift size={20} />,
    color: '#1B6FC2',
    gradient: 'linear-gradient(135deg, #1B6FC2 0%, #144F8C 100%)',
    code: 'BOUM10',
    description: '10€ de réduction sur votre premier mois d\'abonnement BoumRank.',
    weight: 3,
    rarity: 'common',
  },
  {
    id: 'guide',
    label: 'Guide PDF gratuit',
    shortLabel: 'GUIDE',
    icon: <BookOpen size={20} />,
    color: '#7C5CFC',
    gradient: 'linear-gradient(135deg, #7C5CFC 0%, #5B3FE0 100%)',
    code: 'GUIDE2026',
    description: 'Le guide "50 avis Google en 30 jours" envoyé par email immédiatement.',
    weight: 2,
    rarity: 'uncommon',
  },
  {
    id: 'mois-offert',
    label: '1 mois 100% offert',
    shortLabel: '1 MOIS',
    icon: <Zap size={20} />,
    color: '#2EAE6D',
    gradient: 'linear-gradient(135deg, #2EAE6D 0%, #1E8A52 100%)',
    code: 'FREEMONTH',
    description: 'Votre premier mois 100% offert, sans aucune carte bancaire requise.',
    weight: 1,
    rarity: 'rare',
  },
  {
    id: 'demo-vip',
    label: 'Démo VIP avec Liam',
    shortLabel: 'VIP',
    icon: <Crown size={20} />,
    color: '#E84393',
    gradient: 'linear-gradient(135deg, #E84393 0%, #B91D6E 100%)',
    code: 'DEMOVIP',
    description: 'Une démo personnalisée d\'1h avec Liam (co-fondateur) pour penser votre stratégie.',
    weight: 1,
    rarity: 'rare',
  },
];

// =====================================================
// SVG geometry helpers
// =====================================================

const SEGMENT_COUNT = SEGMENTS.length;
const SEGMENT_ANGLE = 360 / SEGMENT_COUNT;
const WHEEL_VB = 400; // viewBox size
const CENTER = WHEEL_VB / 2;
const RADIUS = WHEEL_VB / 2 - 4; // small inset for stroke

function polarToCartesian(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function getSegmentPath(index: number): string {
  const startAngle = index * SEGMENT_ANGLE - SEGMENT_ANGLE / 2;
  const endAngle = startAngle + SEGMENT_ANGLE;
  const start = polarToCartesian(startAngle, RADIUS);
  const end = polarToCartesian(endAngle, RADIUS);
  const largeArc = SEGMENT_ANGLE > 180 ? 1 : 0;
  return [
    `M ${CENTER} ${CENTER}`,
    `L ${start.x} ${start.y}`,
    `A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y}`,
    'Z',
  ].join(' ');
}

function pickWeightedRandom<T extends { weight: number }>(items: T[]): { item: T; index: number } {
  const total = items.reduce((s, it) => s + it.weight, 0);
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= items[i].weight;
    if (r <= 0) return { item: items[i], index: i };
  }
  return { item: items[items.length - 1], index: items.length - 1 };
}

const STORAGE_KEY = 'boumrank_demo_wheel_v1';

// =====================================================
// Component
// =====================================================

export const DemoWheel = () => {
  const { openModal } = useOnboarding();
  const wheelControls = useAnimation();
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<Segment | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);
  const rotationRef = useRef(0);

  // Restore previous result from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored) as { resultId: string; at: number };
        const seg = SEGMENTS.find((s) => s.id === data.resultId);
        if (seg) {
          setResult(seg);
          setHasPlayed(true);
        }
      }
    } catch {
      // localStorage unavailable or corrupted — ignore
    }
  }, []);

  const trackEvent = (name: string, payload: Record<string, unknown> = {}) => {
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.gtag) w.gtag('event', name, payload);
    if (w.dataLayer) w.dataLayer.push({ event: name, ...payload });
  };

  const handleSpin = async () => {
    if (isSpinning || hasPlayed) return;
    setIsSpinning(true);
    setShowResult(false);
    trackEvent('demo_played', { component: 'demo_wheel' });

    const { item: picked, index } = pickWeightedRandom(SEGMENTS);

    // Calculate target rotation
    // Pointer is at top (angle 0). Segment 0 is centered at top.
    // We want segment `index` to land at top → rotate by -(index * SEGMENT_ANGLE)
    // Add 5 full turns for visual drama, plus a small random offset within segment for variety.
    const fullTurns = 5;
    const baseRotation = fullTurns * 360;
    const targetSegment = -(index * SEGMENT_ANGLE);
    const jitter = (Math.random() - 0.5) * (SEGMENT_ANGLE * 0.6); // ±27% of segment width
    const finalRotation = rotationRef.current + baseRotation + targetSegment + jitter;
    rotationRef.current = finalRotation;

    await wheelControls.start({
      rotate: finalRotation,
      transition: { duration: 4.5, ease: [0.17, 0.67, 0.16, 0.99] },
    });

    setResult(picked);
    setHasPlayed(true);
    setIsSpinning(false);
    setShowResult(true);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ resultId: picked.id, at: Date.now() })
      );
    } catch {
      // ignore storage errors
    }

    trackEvent('demo_won_segment', {
      segment_id: picked.id,
      segment_label: picked.shortLabel,
      rarity: picked.rarity,
    });
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setResult(null);
    setHasPlayed(false);
    setShowResult(false);
    setCopied(false);
    rotationRef.current = 0;
    wheelControls.set({ rotate: 0 });
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.code);
      setCopied(true);
      trackEvent('demo_code_copied', { code: result.code });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — silent fail
    }
  };

  const handleClaim = () => {
    trackEvent('demo_claim_clicked', { code: result?.code });
    openModal();
  };

  return (
    <section
      id="demo-roue"
      className="relative py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,92,252,0.06),transparent_60%)]" />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(232,67,147,0.08),transparent_70%)] -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(46,174,109,0.08),transparent_70%)] translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Eyebrow variant="orange" size="md" withDot className="mb-5">
            Démo live · Idée audacieuse #1
          </Eyebrow>
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            Tournez la roue.
            <br />
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#F28C28_0%,#E84393_50%,#7C5CFC_100%)]">
              On vous offre un café.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            Sérieusement. Testez le jeu comme le ferait un de vos clients.
            <br />
            <span className="text-[var(--text-primary)] font-semibold">
              Pas de signup, pas de mail, juste un clic.
            </span>
          </p>
        </motion.div>

        {/* Wheel + result layout */}
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* WHEEL */}
          <div className="relative mx-auto w-full max-w-[480px] aspect-square">
            {/* Pointer (fixed, points down at top of wheel) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-30 pointer-events-none">
              <svg width="44" height="56" viewBox="0 0 44 56" fill="none">
                <defs>
                  <linearGradient id="pointerGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F28C28" />
                    <stop offset="100%" stopColor="#D47318" />
                  </linearGradient>
                </defs>
                <path
                  d="M22 56 L4 14 Q4 4 14 4 L30 4 Q40 4 40 14 Z"
                  fill="url(#pointerGradient)"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <circle cx="22" cy="16" r="4" fill="white" />
              </svg>
            </div>

            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_50%,#2EAE6D_100%)] blur-2xl opacity-30 -z-10" />

            {/* Wheel container — rotates */}
            <motion.div
              animate={wheelControls}
              initial={{ rotate: 0 }}
              className="relative w-full h-full rounded-full overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.18)]"
              style={{ willChange: 'transform' }}
            >
              <svg viewBox={`0 0 ${WHEEL_VB} ${WHEEL_VB}`} className="w-full h-full">
                <defs>
                  {SEGMENTS.map((seg, i) => (
                    <linearGradient
                      key={`grad-${i}`}
                      id={`seg-grad-${i}`}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={seg.color} stopOpacity="1" />
                      <stop offset="100%" stopColor={seg.color} stopOpacity="0.78" />
                    </linearGradient>
                  ))}
                </defs>

                {/* Outer rim */}
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={RADIUS + 2}
                  fill="white"
                  stroke="white"
                  strokeWidth="4"
                />

                {/* Segments */}
                {SEGMENTS.map((seg, i) => (
                  <g key={seg.id + i}>
                    <path
                      d={getSegmentPath(i)}
                      fill={`url(#seg-grad-${i})`}
                      stroke="white"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                  </g>
                ))}

                {/* Segment labels */}
                {SEGMENTS.map((seg, i) => {
                  const labelAngle = i * SEGMENT_ANGLE;
                  const labelPos = polarToCartesian(labelAngle, RADIUS * 0.62);
                  // Rotate text so it reads radially outward from center
                  const textRotation = labelAngle;
                  return (
                    <g
                      key={`label-${seg.id}-${i}`}
                      transform={`translate(${labelPos.x} ${labelPos.y}) rotate(${textRotation})`}
                    >
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="white"
                        fontWeight="800"
                        fontSize="20"
                        letterSpacing="1"
                        style={{
                          fontFamily: 'var(--font-plus-jakarta), system-ui',
                          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                        }}
                      >
                        {seg.shortLabel}
                      </text>
                    </g>
                  );
                })}

                {/* Decorative outer dots (around the rim) */}
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = i * 15;
                  const pos = polarToCartesian(angle, RADIUS - 8);
                  return (
                    <circle
                      key={`dot-${i}`}
                      cx={pos.x}
                      cy={pos.y}
                      r="2.5"
                      fill="white"
                      opacity="0.7"
                    />
                  );
                })}
              </svg>

              {/* Center hub overlay (does NOT counter-rotate — keeps simple wheel feel) */}
            </motion.div>

            {/* Center hub — stays still, sits on top of rotating wheel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.2)] border-4 border-[var(--bg-primary)] flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_50%,#2EAE6D_100%)] flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* CONTROL PANEL — spin button + result */}
          <div className="w-full lg:w-[360px] flex flex-col items-stretch justify-center gap-5">
            {!hasPlayed && !isSpinning && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <Card variant="glass" padding="lg" className="text-center">
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[linear-gradient(135deg,#F28C28_0%,#E84393_100%)] text-white mb-3 shadow-[0_8px_24px_rgba(242,140,40,0.3)]">
                      <Sparkles size={24} />
                    </div>
                    <h3 className="font-display font-extrabold text-2xl uppercase text-[var(--text-primary)] mb-2">
                      Prêt à jouer ?
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      Vous gagnez à tous les coups. Code promo à utiliser
                      sur votre essai BoumRank.
                    </p>
                  </div>
                  <Button
                    onClick={handleSpin}
                    variant="gradient"
                    size="lg"
                    className="w-full"
                  >
                    <Zap size={18} />
                    Tourner la roue
                  </Button>
                </Card>
              </motion.div>
            )}

            {isSpinning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <Card variant="glass" padding="lg" className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--bg-elevated)] mb-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles size={24} className="text-[var(--secondary-orange)]" />
                    </motion.div>
                  </div>
                  <h3 className="font-display font-extrabold text-2xl uppercase text-[var(--text-primary)] mb-2">
                    La chance tourne...
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Restez bien sage 🤞
                  </p>
                </Card>
              </motion.div>
            )}

            {hasPlayed && result && !isSpinning && (
              <ResultCard
                segment={result}
                copied={copied}
                onCopy={handleCopy}
                onClaim={handleClaim}
                onReset={handleReset}
                showAnimation={showResult}
              />
            )}
          </div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12 max-w-2xl mx-auto"
        >
          <p className="text-sm text-[var(--text-muted)] italic">
            Vous venez de vivre exactement ce que vivront vos clients après avoir scanné votre QR code.{' '}
            <span className="text-[var(--text-secondary)] not-italic font-semibold">
              C&apos;est ce qui les fait revenir.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// =====================================================
// Result card sub-component
// =====================================================

type ResultCardProps = {
  segment: Segment;
  copied: boolean;
  showAnimation: boolean;
  onCopy: () => void;
  onClaim: () => void;
  onReset: () => void;
};

const rarityLabels: Record<Segment['rarity'], { label: string; color: string }> = {
  common: { label: 'Bien joué', color: '#1B6FC2' },
  uncommon: { label: 'Joli !', color: '#2EAE6D' },
  rare: { label: 'Excellent !', color: '#7C5CFC' },
  jackpot: { label: 'JACKPOT 🎰', color: '#F28C28' },
};

function ResultCard({ segment, copied, showAnimation, onCopy, onClaim, onReset }: ResultCardProps) {
  const rarityInfo = rarityLabels[segment.rarity];

  return (
    <AnimatePresence>
      <motion.div
        initial={showAnimation ? { opacity: 0, y: 20, scale: 0.95 } : false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative"
      >
        {/* Confetti-ish glow behind */}
        <div
          className="absolute inset-0 rounded-2xl blur-2xl opacity-50 -z-10"
          style={{ background: segment.gradient }}
        />

        <Card
          variant="solid"
          padding="lg"
          className={cn(
            'border-2',
            'shadow-[0_16px_48px_rgba(0,0,0,0.12)]'
          )}
          style={{ borderColor: segment.color }}
        >
          {/* Reset button (top right, discreet) */}
          <button
            onClick={onReset}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Rejouer"
            title="Rejouer (reset)"
          >
            <RotateCcw size={12} />
          </button>

          {/* Rarity tag + icon */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
              style={{ background: segment.gradient }}
            >
              {segment.icon}
            </div>
            <div>
              <div
                className="text-[10px] font-display font-extrabold uppercase tracking-widest"
                style={{ color: rarityInfo.color }}
              >
                {rarityInfo.label}
              </div>
              <div className="text-xs text-[var(--text-muted)]">Vous avez gagné</div>
            </div>
          </div>

          {/* Prize label */}
          <h3 className="font-display font-extrabold text-2xl text-[var(--text-primary)] mb-2 leading-tight">
            {segment.label}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
            {segment.description}
          </p>

          {/* Promo code box */}
          <div className="mb-5">
            <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-display font-bold mb-2">
              Votre code promo
            </div>
            <button
              onClick={onCopy}
              className={cn(
                'group w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border-2 border-dashed transition-all',
                'bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)]',
                copied
                  ? 'border-[var(--primary-green)]'
                  : 'border-[var(--border-highlight)] hover:border-[var(--primary-blue)]'
              )}
            >
              <span className="font-mono font-bold text-lg text-[var(--text-primary)] tracking-wider">
                {segment.code}
              </span>
              <span
                className={cn(
                  'flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider transition-colors',
                  copied ? 'text-[var(--primary-green)]' : 'text-[var(--text-muted)] group-hover:text-[var(--primary-blue)]'
                )}
              >
                {copied ? (
                  <>
                    <Check size={14} /> Copié !
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copier
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Claim CTA */}
          <Button onClick={onClaim} variant="gradient" size="md" className="w-full">
            Utiliser mon code maintenant
            <ArrowRight size={16} />
          </Button>

          <p className="mt-3 text-[11px] text-[var(--text-muted)] text-center leading-relaxed">
            Code valable 30 jours sur votre premier mois d&apos;abonnement BoumRank.
          </p>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
