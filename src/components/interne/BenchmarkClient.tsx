'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Filter,
  Lock,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';
import {
  BOUMRANK_REFERENCE,
  KEY_INSIGHTS,
  competitors,
  type Competitor,
  type ThreatLevel,
} from '@/data/competitors';
import { cn } from '@/lib/utils';

const threatStyles: Record<ThreatLevel, { label: string; classes: string; dot: string }> = {
  haute: {
    label: 'Menace haute',
    classes: 'bg-[color:var(--error)]/10 text-[color:var(--error)] border-[color:var(--error)]/30',
    dot: 'bg-[color:var(--error)]',
  },
  moyenne: {
    label: 'Menace moyenne',
    classes:
      'bg-[color:var(--warning)]/10 text-[color:var(--warning)] border-[color:var(--warning)]/30',
    dot: 'bg-[color:var(--warning)]',
  },
  faible: {
    label: 'Menace faible',
    classes:
      'bg-[color:var(--success)]/10 text-[color:var(--success)] border-[color:var(--success)]/30',
    dot: 'bg-[color:var(--success)]',
  },
};

type Filter = 'all' | ThreatLevel;

export function BenchmarkClient() {
  const [filter, setFilter] = useState<Filter>('all');
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return competitors;
    return competitors.filter((c) => c.threat === filter);
  }, [filter]);

  const counts = useMemo(
    () => ({
      all: competitors.length,
      haute: competitors.filter((c) => c.threat === 'haute').length,
      moyenne: competitors.filter((c) => c.threat === 'moyenne').length,
      faible: competitors.filter((c) => c.threat === 'faible').length,
    }),
    []
  );

  return (
    <main className="min-h-screen bg-[color:var(--bg-primary)] pb-32 pt-24 text-[color:var(--text-primary)]">
      <div className="mx-auto max-w-7xl px-6">
        <InternalBanner />
        <Header />
        <Insights />
        <FilterBar filter={filter} setFilter={setFilter} counts={counts} />
        <MatrixTable competitors={filtered} />
        <DetailedCards
          competitors={filtered}
          openSlug={openSlug}
          setOpenSlug={setOpenSlug}
        />
        <Footer />
      </div>
    </main>
  );
}

function InternalBanner() {
  return (
    <div className="mb-8 flex items-center gap-3 rounded-2xl border border-[color:var(--warning)]/30 bg-[color:var(--warning)]/5 px-5 py-3 text-sm text-[color:var(--text-body)]">
      <Lock className="h-4 w-4 flex-shrink-0 text-[color:var(--warning)]" />
      <span>
        <strong className="text-[color:var(--text-primary)]">Document interne.</strong> Veille
        stratégique BoumRank. Page non indexée, ne pas partager publiquement.
      </span>
    </div>
  );
}

function Header() {
  return (
    <header className="mb-16 max-w-3xl">
      <p className="font-data mb-3 text-sm uppercase tracking-[0.2em] text-[color:var(--primary-teal)]">
        Mai 2026 · 10 concurrents
      </p>
      <h1 className="font-display text-5xl font-bold leading-tight tracking-tight md:text-6xl">
        Benchmark <span className="text-gradient">concurrentiel</span>
      </h1>
      <p className="mt-6 text-lg text-[color:var(--text-body)]">
        Cartographie des 10 acteurs face à BoumRank sur la gamification marketing pour commerce
        local. Tarifs publics, engagement, fonctionnalités. Sources citées en bas de chaque fiche.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Concurrents" value="10" sub="scannés" />
        <StatCard label="Menace haute" value="3" sub="Dokaa, Cadeo, HeyPulse" highlight />
        <StatCard
          label="BoumRank"
          value="65-79€"
          sub="sans engagement"
          accent
        />
        <StatCard label="Gap marché" value="0" sub="acteur sur les 4 critères" />
      </div>
    </header>
  );
}

function StatCard({
  label,
  value,
  sub,
  highlight = false,
  accent = false,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border bg-[color:var(--bg-surface)] p-5',
        highlight && 'border-[color:var(--error)]/30 bg-[color:var(--error)]/5',
        accent && 'border-[color:var(--primary-teal)]/40 bg-[color:var(--primary-teal)]/5',
        !highlight && !accent && 'border-[color:var(--border-default)]'
      )}
    >
      <p className="font-data text-xs uppercase tracking-wider text-[color:var(--text-muted)]">
        {label}
      </p>
      <p className="font-display mt-2 text-3xl font-bold text-[color:var(--text-primary)]">
        {value}
      </p>
      <p className="mt-1 text-xs text-[color:var(--text-secondary)]">{sub}</p>
    </div>
  );
}

function Insights() {
  return (
    <section className="mb-20">
      <div className="mb-8 flex items-center gap-3">
        <Sparkles className="h-5 w-5 text-[color:var(--primary-green)]" />
        <h2 className="font-display text-2xl font-bold">Lecture stratégique</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {KEY_INSIGHTS.map((insight, i) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-[color:var(--border-default)] bg-[color:var(--bg-surface)] p-6"
          >
            <h3 className="font-display mb-3 text-base font-semibold text-[color:var(--text-primary)]">
              {insight.title}
            </h3>
            <p className="text-sm leading-relaxed text-[color:var(--text-body)]">{insight.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FilterBar({
  filter,
  setFilter,
  counts,
}: {
  filter: Filter;
  setFilter: (f: Filter) => void;
  counts: { all: number; haute: number; moyenne: number; faible: number };
}) {
  const filters: { value: Filter; label: string; count: number }[] = [
    { value: 'all', label: 'Tous', count: counts.all },
    { value: 'haute', label: 'Menace haute', count: counts.haute },
    { value: 'moyenne', label: 'Menace moyenne', count: counts.moyenne },
    { value: 'faible', label: 'Menace faible', count: counts.faible },
  ];

  return (
    <div className="mb-8 flex flex-wrap items-center gap-2">
      <div className="mr-2 flex items-center gap-2 text-sm text-[color:var(--text-secondary)]">
        <Filter className="h-4 w-4" />
        <span>Filtrer</span>
      </div>
      {filters.map((f) => (
        <button
          key={f.value}
          type="button"
          onClick={() => setFilter(f.value)}
          className={cn(
            'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all',
            filter === f.value
              ? 'border-[color:var(--primary-teal)] bg-[color:var(--primary-teal)]/10 text-[color:var(--primary-teal)]'
              : 'border-[color:var(--border-default)] bg-[color:var(--bg-surface)] text-[color:var(--text-body)] hover:border-[color:var(--primary-teal)]/40'
          )}
        >
          {f.label}
          <span className="font-data text-xs opacity-70">{f.count}</span>
        </button>
      ))}
    </div>
  );
}

function MatrixTable({ competitors }: { competitors: Competitor[] }) {
  return (
    <section className="mb-20">
      <div className="mb-6 flex items-center gap-3">
        <Target className="h-5 w-5 text-[color:var(--primary-blue)]" />
        <h2 className="font-display text-2xl font-bold">Matrice synthèse</h2>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-[color:var(--border-default)] bg-[color:var(--bg-surface)]">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-[color:var(--bg-elevated)]">
            <tr className="text-left">
              <Th>Acteur</Th>
              <Th>Prix entrée</Th>
              <Th>Engagement</Th>
              <Th>Essai</Th>
              <Th>Jeux</Th>
              <Th>Cible</Th>
              <Th>Menace</Th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-y-2 border-[color:var(--primary-teal)]/30 bg-[color:var(--primary-teal)]/5">
              <Td>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-[color:var(--primary-teal)]">
                    {BOUMRANK_REFERENCE.name}
                  </span>
                  <span className="rounded-full bg-[color:var(--primary-teal)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Nous
                  </span>
                </div>
              </Td>
              <Td>
                <strong>{BOUMRANK_REFERENCE.pricing.essentiel.monthly}</strong>
                <span className="block text-xs text-[color:var(--text-muted)]">
                  jusqu&apos;à {BOUMRANK_REFERENCE.pricing.performance.monthly}
                </span>
              </Td>
              <Td>
                <span className="font-semibold text-[color:var(--success)]">
                  {BOUMRANK_REFERENCE.pricing.commitment}
                </span>
              </Td>
              <Td>
                <span className="text-[color:var(--success)]">
                  {BOUMRANK_REFERENCE.pricing.freeTrial}
                </span>
              </Td>
              <Td>
                <strong>{BOUMRANK_REFERENCE.features.gameCount} jeux</strong>
                <span className="block text-xs text-[color:var(--text-muted)]">
                  {BOUMRANK_REFERENCE.features.games}
                </span>
              </Td>
              <Td>Commerce local FR</Td>
              <Td>
                <span className="text-xs font-semibold text-[color:var(--primary-teal)]">
                  Référence
                </span>
              </Td>
            </tr>
            {competitors.map((c) => (
              <tr
                key={c.slug}
                className="border-b border-[color:var(--border-default)] last:border-0 transition-colors hover:bg-[color:var(--bg-elevated)]/50"
              >
                <Td>
                  <span className="font-semibold">{c.name}</span>
                </Td>
                <Td>
                  <strong>{c.pricing.entryPrice}</strong>
                  {c.pricing.setupFee && (
                    <span className="block text-xs text-[color:var(--warning)]">
                      + {c.pricing.setupFee} setup
                    </span>
                  )}
                </Td>
                <Td>
                  <CommitmentBadge tiers={c.pricing.tiers} />
                </Td>
                <Td>
                  <span className="text-xs">{c.pricing.freeTrial}</span>
                </Td>
                <Td>
                  <strong>{c.features.gameCount}</strong>
                  <span className="ml-1 text-xs text-[color:var(--text-muted)]">
                    {c.features.gameCount === 0 ? 'aucun' : 'jeu(x)'}
                  </span>
                </Td>
                <Td>
                  <span className="text-xs">{truncate(c.target.segment, 40)}</span>
                </Td>
                <Td>
                  <ThreatPill threat={c.threat} />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-[color:var(--text-muted)]">
        Tarifs en € HT/mois sauf mention contraire. Faites défiler horizontalement sur mobile.
      </p>
    </section>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="font-data px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[color:var(--text-secondary)]">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-4 py-4 align-top text-[color:var(--text-body)]">{children}</td>
  );
}

function CommitmentBadge({ tiers }: { tiers: Competitor['pricing']['tiers'] }) {
  const commitments = Array.from(new Set(tiers.map((t) => t.commitment)));
  const hasNone = commitments.some((c) => c.toLowerCase().includes('aucun'));
  const hasLong = commitments.some(
    (c) =>
      c.includes('12 mois') ||
      c.includes('24 mois') ||
      c.includes('36 mois') ||
      c.toLowerCase().includes('licence annuelle') ||
      c.toLowerCase().includes('annuel')
  );

  if (hasNone && !hasLong) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--success)]">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Aucun
      </span>
    );
  }
  if (hasLong && !hasNone) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--error)]">
        <AlertTriangle className="h-3.5 w-3.5" />
        {commitments.find((c) =>
          ['12 mois', '24 mois', '36 mois', 'annuel', 'Licence annuelle'].some((k) =>
            c.toLowerCase().includes(k.toLowerCase())
          )
        )}
      </span>
    );
  }
  return <span className="text-xs">Mixte</span>;
}

function ThreatPill({ threat }: { threat: ThreatLevel }) {
  const style = threatStyles[threat];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold',
        style.classes
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', style.dot)} />
      {threat.charAt(0).toUpperCase() + threat.slice(1)}
    </span>
  );
}

function DetailedCards({
  competitors,
  openSlug,
  setOpenSlug,
}: {
  competitors: Competitor[];
  openSlug: string | null;
  setOpenSlug: (s: string | null) => void;
}) {
  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <TrendingUp className="h-5 w-5 text-[color:var(--primary-green)]" />
        <h2 className="font-display text-2xl font-bold">Fiches détaillées</h2>
      </div>
      <div className="space-y-3">
        {competitors.map((c, i) => (
          <CompetitorCard
            key={c.slug}
            competitor={c}
            index={i}
            isOpen={openSlug === c.slug}
            onToggle={() => setOpenSlug(openSlug === c.slug ? null : c.slug)}
          />
        ))}
      </div>
    </section>
  );
}

function CompetitorCard({
  competitor: c,
  index,
  isOpen,
  onToggle,
}: {
  competitor: Competitor;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className="overflow-hidden rounded-2xl border border-[color:var(--border-default)] bg-[color:var(--bg-surface)]"
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-[color:var(--bg-elevated)]/50"
      >
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <span className="font-data text-xs font-semibold text-[color:var(--text-muted)]">
              #{c.rank}
            </span>
            <h3 className="font-display text-xl font-bold">{c.name}</h3>
            <ThreatPill threat={c.threat} />
          </div>
          <p className="text-sm text-[color:var(--text-body)]">{c.positioning}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <KV label="Prix entrée" value={c.pricing.entryPrice} />
            <KV label="Jeux" value={String(c.features.gameCount)} />
            <KV label="Essai" value={c.pricing.freeTrial} />
          </div>
        </div>
        <ChevronDown
          className={cn(
            'h-5 w-5 flex-shrink-0 text-[color:var(--text-secondary)] transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-[color:var(--border-default)] bg-[color:var(--bg-elevated)]/30 p-6"
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <SectionTitle>Tarification</SectionTitle>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-left text-[color:var(--text-muted)]">
                      <th className="pb-2 pr-3 font-medium">Plan</th>
                      <th className="pb-2 pr-3 font-medium">Mensuel</th>
                      <th className="pb-2 pr-3 font-medium">Annuel</th>
                      <th className="pb-2 font-medium">Engagement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.pricing.tiers.map((tier, idx) => (
                      <tr
                        key={idx}
                        className="border-t border-[color:var(--border-default)] align-top"
                      >
                        <td className="py-2 pr-3 font-semibold">
                          {tier.label}
                          {tier.note && (
                            <span className="block text-[10px] font-normal text-[color:var(--text-muted)]">
                              {tier.note}
                            </span>
                          )}
                        </td>
                        <td className="py-2 pr-3">{tier.monthlyPrice}</td>
                        <td className="py-2 pr-3">{tier.annualPrice ?? '—'}</td>
                        <td className="py-2">{tier.commitment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {c.pricing.setupFee && (
                <p className="mt-3 text-xs text-[color:var(--warning)]">
                  ⚠ Frais de setup : {c.pricing.setupFee}
                </p>
              )}
              <p className="mt-2 text-xs text-[color:var(--text-muted)]">
                Essai gratuit : {c.pricing.freeTrial}
                {!c.pricing.publicPricing && ' · Pricing non public'}
              </p>
            </div>

            <div>
              <SectionTitle>Fonctionnalités</SectionTitle>
              <dl className="space-y-3 text-xs">
                <Field label="Jeux">{c.features.games}</Field>
                <Field label="Actions marketing">
                  <div className="flex flex-wrap gap-1">
                    {c.features.marketingActions.map((a) => (
                      <span
                        key={a}
                        className="rounded-full bg-[color:var(--bg-primary)] px-2 py-0.5 text-[10px]"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </Field>
                <Field label="Branding">{c.features.branding}</Field>
                <Field label="Multi-établissement">{c.features.multiLocation}</Field>
                <Field label="Anti-fraude / sécurité">{c.features.antiFraud}</Field>
              </dl>
            </div>
          </div>

          <div className="mt-6 grid gap-4 border-t border-[color:var(--border-default)] pt-6 md:grid-cols-2">
            <div>
              <SectionTitle>Cible</SectionTitle>
              <dl className="space-y-2 text-xs">
                <Field label="Segment">{c.target.segment}</Field>
                <Field label="Géographie">{c.target.geography}</Field>
                <Field label="Langue">{c.target.language}</Field>
              </dl>
            </div>
            <div>
              <SectionTitle>Lecture stratégique</SectionTitle>
              <p className="text-xs leading-relaxed text-[color:var(--text-body)]">
                {c.strategicNote}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[color:var(--border-default)] pt-6">
            <Link
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary-teal)] px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              Visiter le site
              <ExternalLink className="h-3 w-3" />
            </Link>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="font-medium text-[color:var(--text-muted)]">Sources :</span>
              {c.sources.map((s, idx) => (
                <Link
                  key={idx}
                  href={s}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[color:var(--primary-blue)] underline-offset-2 hover:underline"
                >
                  [{idx + 1}]
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.article>
  );
}

function KV({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="text-xs text-[color:var(--text-muted)]">{label}</span>
      <strong className="text-sm text-[color:var(--text-primary)]">{value}</strong>
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-data mb-3 text-xs font-semibold uppercase tracking-wider text-[color:var(--text-muted)]">
      {children}
    </h4>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3">
      <dt className="text-[color:var(--text-muted)]">{label}</dt>
      <dd className="text-[color:var(--text-body)]">{children}</dd>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-20 rounded-2xl border border-[color:var(--border-default)] bg-[color:var(--bg-surface)] p-6 text-xs text-[color:var(--text-muted)]">
      <p>
        <strong className="text-[color:var(--text-body)]">Méthodologie :</strong> données tarifaires
        et fonctionnelles collectées depuis les sites officiels et Appvizer/G2/Capterra en mai 2026.
        Tarifs marqués &quot;Sur devis&quot; quand non publics. Mention &quot;HT&quot; explicite
        quand disponible.
      </p>
      <p className="mt-3">
        <strong className="text-[color:var(--text-body)]">Concurrents écartés :</strong> Wheelio
        (100 % Shopify e-commerce), Drimify (cible marques nationales, pas de tarif public),
        Trustfolio (B2B services pro), Fidelidad (signal SaaS non identifiable).
      </p>
      <p className="mt-3">
        Document interne BoumRank · Page non indexée · Veille stratégique uniquement.
      </p>
    </footer>
  );
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}
