# Refonte page /tarifs — 1 service, 3 engagements — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refondre la page `/tarifs` du site boumrank-next pour basculer du modèle "3 plans par features" vers "1 service unique × 3 engagements" (79€ sans engagement, 69€ × 6 mois, 59€ × 12 mois), avec mise à jour cohérente du PricingTeaser homepage et de toutes les mentions de pricing dans le site.

**Architecture:** Next.js 16 App Router + React 19 + Tailwind v4 + Framer Motion. La page `/tarifs` est composée de Server Component (page.tsx) qui orchestre des Client Components ("use client"). Nouveau modèle de données centralisé dans `lib/constants.ts` (objet `PRICING`). 2 composants supprimés (`TarifsNoExtras`, `TarifsPayment`), 2 nouveaux (`TarifsFeaturesCentral`, `TarifsMultiBanner`), 3 modifiés (`TarifsHero`, `TarifsPlansDetail`, `PricingTeaser`).

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, Framer Motion, lucide-react, @next/font

**Spec source:** `docs/superpowers/specs/2026-05-11-refonte-page-tarifs-3-engagements-design.md`

---

## File Structure

### Création

- `src/components/tarifs/TarifsFeaturesCentral.tsx` — Bloc unique de 6 features au-dessus des cartes prix. Client Component (Framer Motion).
- `src/components/tarifs/TarifsMultiBanner.tsx` — Bandeau horizontal multi-établissements avec CTA contact. Client Component.

### Modification

- `src/lib/constants.ts` — Ajout objet `PRICING` (source unique de vérité). Update `SITE_DESCRIPTION`.
- `src/data/tarifs-faqs.ts` — Remplacement des 5 FAQ par 6 nouvelles (engagement / renouvellement / essai / upgrade / features / paiement).
- `src/components/tarifs/TarifsHero.tsx` — Nouveau H1/sous-titre.
- `src/components/tarifs/TarifsPlansDetail.tsx` — Refonte complète (3 offres par engagement, layout A).
- `src/components/home/PricingTeaser.tsx` — Mirror de la nouvelle structure pour la homepage.
- `src/components/home/Pricing.tsx` — Audit + refonte cohérente (mêmes 3 cartes).
- `src/app/tarifs/page.tsx` — Nouvelle composition (retire PricingTeaser/NoExtras/Payment, ajoute FeaturesCentral/MultiBanner) + metadata + JSON-LD.
- `src/app/llms.txt/route.ts` — Update résumé pricing.

### Suppression

- `src/components/tarifs/TarifsNoExtras.tsx` — Info absorbée dans le footer de `TarifsFeaturesCentral`.
- `src/components/tarifs/TarifsPayment.tsx` — Info répartie dans FAQ et footer site.

### Audit (read-only puis ajustement minimal si nécessaire)

- `src/app/contact/page.tsx`
- `src/app/technologie/page.tsx`
- `src/components/a-propos/AProposMission.tsx`
- `src/components/home/PerformanceTracking.tsx`
- `src/components/ui/CookieBanner.tsx`
- `src/components/interne/BenchmarkClient.tsx`
- `src/data/competitors.ts`

---

## Task 1: Ajout de l'objet PRICING dans constants.ts

**Files:**
- Modify: `boumrank-next/src/lib/constants.ts`

Source unique de vérité pour les prix. Évite les chaînes "59"/"79" éparpillées et facilite les changements futurs.

- [ ] **Step 1: Ouvrir le fichier et localiser la fin du bloc COMPANY**

```bash
cat boumrank-next/src/lib/constants.ts
```

- [ ] **Step 2: Ajouter l'objet PRICING à la fin du fichier**

Ajouter à la fin de `src/lib/constants.ts`, après le `} as const;` du `COMPANY` :

```ts
export const PRICING = {
  flex: {
    id: 'flex',
    label: 'Sans engagement',
    price: 79,
    priceUnit: '€/mois HT',
    commitMonths: 0,
    totalLabel: 'Soit 948€ sur 12 mois',
    commitNote: 'Liberté maximale. Résiliable en 1 clic, à tout moment.',
    yearlySaving: 0,
    highlighted: false,
  },
  sixMonths: {
    id: 'six-months',
    label: '6 mois',
    price: 69,
    priceUnit: '€/mois HT',
    commitMonths: 6,
    totalLabel: 'Soit 414€ tous les 6 mois',
    commitNote: 'Engagement 6 mois minimum. Renouvellement automatique au même tarif.',
    yearlySaving: 120,
    highlighted: false,
  },
  yearly: {
    id: 'yearly',
    label: '1 an',
    price: 59,
    priceUnit: '€/mois HT',
    commitMonths: 12,
    totalLabel: 'Soit 708€ sur 12 mois',
    commitNote: 'Engagement 12 mois. Point bilan avant chaque renouvellement.',
    yearlySaving: 240,
    highlighted: true,
  },
} as const;

export type PricingOffer = typeof PRICING[keyof typeof PRICING];
export const PRICING_OFFERS: PricingOffer[] = [PRICING.flex, PRICING.sixMonths, PRICING.yearly];
```

- [ ] **Step 3: Mettre à jour SITE_DESCRIPTION pour refléter le nouveau prix d'appel**

Remplacer la ligne :

```ts
export const SITE_DESCRIPTION =
  'BoumRank transforme chaque visite en avis Google. Vos clients scannent un QR code, jouent à un mini-jeu (roue, slots, blackjack) et reviennent gagner leur lot en boutique. Setup en 5 minutes, à partir de 65€/mois.';
```

par :

```ts
export const SITE_DESCRIPTION =
  'BoumRank transforme chaque visite en avis Google. Vos clients scannent un QR code, jouent à un mini-jeu (roue, slots, blackjack) et reviennent gagner leur lot en boutique. Setup en 5 minutes, à partir de 59€/mois.';
```

- [ ] **Step 4: Vérifier que TypeScript compile**

Run: `cd boumrank-next && npx tsc --noEmit`
Expected: aucune erreur (l'ajout est purement additif).

- [ ] **Step 5: Commit**

```bash
cd boumrank-next
git add src/lib/constants.ts
git commit -m "feat(tarifs): add PRICING constant for 3-engagement model"
```

---

## Task 2: Refonte des données FAQ

**Files:**
- Modify: `boumrank-next/src/data/tarifs-faqs.ts`

6 nouvelles questions ciblées sur l'engagement, le renouvellement, l'essai, l'upgrade, les features, le paiement.

- [ ] **Step 1: Remplacer intégralement le tableau TARIFS_FAQS**

Le fichier final doit avoir exactement ce contenu :

```ts
/**
 * BoumRank — Tarifs FAQ
 *
 * Plain data module (no 'use client') so it can be safely imported by both
 * Server Components (page.tsx → SchemaOrg JSON-LD) and Client Components
 * (TarifsFaq.tsx → accordion).
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const TARIFS_FAQS: FaqItem[] = [
  {
    question: "Que se passe-t-il si je résilie avant la fin de mon engagement ?",
    answer:
      "Sur les offres 6 mois et 1 an, vous vous engagez sur la durée choisie. En cas de résiliation anticipée, vous payez les mensualités restantes. Sur la formule sans engagement (79€), vous résiliez en 1 clic, quand vous voulez, sans pénalité.",
  },
  {
    question: "Comment se passe le renouvellement à la fin de mon engagement ?",
    answer:
      "Votre abonnement se renouvelle automatiquement au même tarif. Avant chaque échéance, on vous contacte pour faire un point sur vos résultats et confirmer (ou ajuster) votre formule. Aucune surprise, aucun piège.",
  },
  {
    question: "L'essai gratuit 14 jours, il marche pour les 3 offres ?",
    answer:
      "Oui, les 3 offres démarrent par 14 jours gratuits, sans carte bancaire à l'inscription. Toutes les features débloquées, aucune limite de scans. Au jour 14, vous choisissez votre offre (ou vous partez, sans reproche).",
  },
  {
    question: "Je peux passer d'une offre à une autre en cours de route ?",
    answer:
      "Upgrade vers une offre plus engageante (donc moins chère) : instantané, à tout moment. Downgrade vers une offre moins engageante : effectif à la fin de votre cycle d'engagement en cours. Tout se fait en 1 clic depuis votre dashboard.",
  },
  {
    question: "Les features sont vraiment toutes incluses, même dans la formule à 79€ ?",
    answer:
      "Oui. Les 3 jeux, le branding 100% custom, le dashboard Performance, les campagnes séquentielles, l'export CSV, Zapier, le support prioritaire FR : tout est débloqué dès le jour 1, peu importe l'offre. Les 3 offres ne diffèrent que par la durée d'engagement et le tarif associé.",
  },
  {
    question: "Comment ça se passe pour les paiements et la facturation ?",
    answer:
      "Paiement mensuel récurrent via Stripe (PCI-DSS niveau 1). Facture PDF émise chaque mois, téléchargeable depuis votre dashboard. Hébergement européen, RGPD, aucune revente de données. Le 1er prélèvement intervient à la fin de votre essai 14 jours.",
  },
];
```

- [ ] **Step 2: Vérifier TypeScript**

Run: `cd boumrank-next && npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 3: Commit**

```bash
cd boumrank-next
git add src/data/tarifs-faqs.ts
git commit -m "feat(tarifs): rewrite FAQ for 3-engagement model"
```

---

## Task 3: Refonte du composant TarifsHero

**Files:**
- Modify: `boumrank-next/src/components/tarifs/TarifsHero.tsx`

Nouveau H1 et sous-titre, sans CTA. Background décoratif conservé.

- [ ] **Step 1: Remplacer intégralement le contenu du fichier**

Le fichier final doit avoir exactement ce contenu :

```tsx
'use client';

import { motion } from 'framer-motion';

export const TarifsHero = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-[var(--bg-primary)]">
      {/* Background decorative */}
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(46,174,109,0.1),transparent_70%)] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display font-extrabold uppercase text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 text-[var(--text-primary)]">
            Un service.{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_50%,#2EAE6D_100%)]">
              Trois engagements.
            </span>
            <br />
            À partir de 59€/mois.
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            Le même service, débloqué entièrement dès le jour 1.{' '}
            <span className="text-[var(--text-primary)] font-semibold">
              Vous choisissez juste combien de temps vous voulez rester.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Vérifier TypeScript**

Run: `cd boumrank-next && npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 3: Commit**

```bash
cd boumrank-next
git add src/components/tarifs/TarifsHero.tsx
git commit -m "feat(tarifs): refresh hero copy for 3-engagement model"
```

---

## Task 4: Création du composant TarifsFeaturesCentral

**Files:**
- Create: `boumrank-next/src/components/tarifs/TarifsFeaturesCentral.tsx`

Bloc unique de 6 features avec icônes lucide-react sur fond rond vert, suivi d'un bandeau récapitulatif (qui absorbe les "no extras").

- [ ] **Step 1: Créer le fichier avec ce contenu exact**

```tsx
'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Palette, BarChart3, QrCode, Zap, MessageCircle, Check } from 'lucide-react';

type Feature = {
  icon: React.ReactNode;
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    icon: <Gamepad2 size={20} />,
    title: 'Les 3 jeux débloqués',
    body: 'Roue, Slots, Blackjack, tous activables à volonté',
  },
  {
    icon: <Palette size={20} />,
    title: 'Branding 100% custom',
    body: '13 templates, palette illimitée, illustrations',
  },
  {
    icon: <BarChart3 size={20} />,
    title: 'Dashboard Performance',
    body: 'Taux scan, conversion, retour caisse, temps moyen',
  },
  {
    icon: <QrCode size={20} />,
    title: 'QR codes illimités',
    body: '3 formats imprimables, swipe caissier illimité',
  },
  {
    icon: <Zap size={20} />,
    title: 'Campagnes séquentielles',
    body: 'Happy hour, week-end, anniversaire client',
  },
  {
    icon: <MessageCircle size={20} />,
    title: 'Support FR prioritaire',
    body: 'Réponse en chat sous 2h, hébergement RGPD en Europe',
  },
];

const PROMISES = [
  'Setup en 5 minutes',
  'Essai 14 jours sans CB',
  'Export CSV + Zapier',
  'Mises à jour à vie',
];

export const TarifsFeaturesCentral = () => {
  return (
    <section className="relative py-20 md:py-24 bg-[var(--bg-primary)] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            <div className="text-center mb-10">
              <span className="inline-block font-display font-bold uppercase text-[10px] tracking-[0.15em] text-[var(--primary-blue)] bg-[rgba(27,111,194,0.08)] px-3 py-1.5 rounded-full mb-3">
                Ce que vous obtenez
              </span>
              <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-4 text-[var(--text-primary)]">
                Toutes les features.{' '}
                <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]">
                  Tout le temps.
                </span>
              </h2>
              <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                Peu importe l&apos;offre choisie, vous avez 100% du service. Pas de feature gating, pas d&apos;upsell caché.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex gap-3 items-start"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[rgba(46,174,109,0.1)] text-[var(--primary-green)] flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-[var(--text-primary)] text-sm mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-[var(--text-body)] leading-snug">{feature.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-[var(--border-default)] flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs md:text-sm text-[var(--text-muted)]">
              {PROMISES.map((promise, i) => (
                <span key={promise} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-[var(--text-muted)]">·</span>}
                  <Check size={14} className="text-[var(--primary-green)]" />
                  <span className="font-display font-semibold">{promise}</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Vérifier TypeScript**

Run: `cd boumrank-next && npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 3: Commit**

```bash
cd boumrank-next
git add src/components/tarifs/TarifsFeaturesCentral.tsx
git commit -m "feat(tarifs): add central features block component"
```

---

## Task 5: Création du composant TarifsMultiBanner

**Files:**
- Create: `boumrank-next/src/components/tarifs/TarifsMultiBanner.tsx`

Bandeau horizontal multi-établissements, CTA vers `/contact`.

- [ ] **Step 1: Créer le fichier avec ce contenu exact**

```tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Building2, ArrowRight } from 'lucide-react';

export const TarifsMultiBanner = () => {
  return (
    <section className="relative py-12 md:py-16 bg-[var(--bg-primary)] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div
            className="rounded-3xl p-7 md:p-9 border flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6"
            style={{
              background:
                'linear-gradient(135deg, rgba(124,92,252,0.04) 0%, rgba(232,67,147,0.04) 100%)',
              borderColor: 'rgba(124,92,252,0.15)',
            }}
          >
            <div className="flex items-start gap-4 text-center md:text-left">
              <div
                className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-xl items-center justify-center text-white shadow-[0_8px_20px_rgba(124,92,252,0.25)]"
                style={{ background: 'linear-gradient(135deg, #7C5CFC 0%, #E84393 100%)' }}
              >
                <Building2 size={22} />
              </div>
              <div>
                <h3 className="font-display font-extrabold uppercase text-lg md:text-xl text-[var(--text-primary)] mb-1.5 tracking-wide">
                  Plusieurs établissements ? Franchise ?
                </h3>
                <p className="text-sm md:text-base text-[var(--text-body)] leading-snug">
                  Multi-établissements, API, account manager dédié, SLA. On vous fait un devis sur-mesure en 48h.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 flex-shrink-0 font-display font-bold uppercase text-xs md:text-sm tracking-wider text-white px-6 py-3.5 rounded-full shadow-[0_10px_28px_rgba(124,92,252,0.3)] hover:scale-[1.03] transition-transform"
              style={{ background: 'linear-gradient(135deg, #7C5CFC 0%, #E84393 100%)' }}
            >
              Parler à Liam
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Vérifier TypeScript**

Run: `cd boumrank-next && npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 3: Commit**

```bash
cd boumrank-next
git add src/components/tarifs/TarifsMultiBanner.tsx
git commit -m "feat(tarifs): add multi-établissements banner component"
```

---

## Task 6: Refonte complète du composant TarifsPlansDetail

**Files:**
- Modify: `boumrank-next/src/components/tarifs/TarifsPlansDetail.tsx`

3 cartes par engagement (Layout A validé). Utilise `PRICING_OFFERS` de `constants.ts`. La carte 1 an surélevée, ruban, badge économies, CTA gradient.

- [ ] **Step 1: Remplacer intégralement le contenu du fichier**

```tsx
'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useOnboarding } from '@/components/ui/OnboardingProvider';
import { PRICING_OFFERS, type PricingOffer } from '@/lib/constants';
import { cn } from '@/lib/utils';

type OfferCardProps = {
  offer: PricingOffer;
  index: number;
  onCtaClick: () => void;
};

const OfferCard = ({ offer, index, onCtaClick }: OfferCardProps) => {
  const isFeatured = offer.highlighted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn('h-full', isFeatured && 'md:-translate-y-3')}
    >
      <Card
        variant="solid"
        padding="lg"
        className={cn(
          'h-full flex flex-col relative overflow-visible',
          isFeatured
            ? 'border-2 shadow-[0_20px_50px_rgba(27,111,194,0.12)]'
            : 'border border-[var(--border-default)]'
        )}
        style={
          isFeatured
            ? {
                borderColor: 'var(--primary-blue)',
                background:
                  'linear-gradient(180deg, rgba(27,111,194,0.04) 0%, rgba(46,174,109,0.04) 100%)',
              }
            : undefined
        }
      >
        {isFeatured && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-[linear-gradient(135deg,#F28C28_0%,#E84393_100%)] text-white text-[10px] font-display font-extrabold uppercase tracking-[0.12em] px-4 py-1.5 rounded-full whitespace-nowrap shadow-[0_8px_20px_rgba(242,140,40,0.3)]">
              ⭐ Le meilleur deal
            </div>
          </div>
        )}

        {/* Badge économies (ou placeholder pour alignement) */}
        <div className="mb-3 min-h-[26px]">
          {offer.yearlySaving > 0 ? (
            <span className="inline-block font-display font-bold uppercase text-[10px] tracking-[0.1em] px-3 py-1 rounded-full bg-[rgba(46,174,109,0.12)] text-[var(--primary-green)]">
              Économisez {offer.yearlySaving}€/an
            </span>
          ) : (
            <span className="inline-block invisible">.</span>
          )}
        </div>

        {/* Titre = durée */}
        <h3
          className={cn(
            'font-display font-extrabold uppercase text-base tracking-[0.08em] mb-4',
            isFeatured
              ? 'text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]'
              : 'text-[var(--text-primary)]'
          )}
        >
          {offer.label}
        </h3>

        {/* Prix */}
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="font-display font-extrabold text-5xl text-[var(--text-primary)] leading-none">
            {offer.price}€
          </span>
          <span className="text-xs font-display font-semibold text-[var(--text-muted)]">
            /mois HT
          </span>
        </div>
        <div className="text-xs text-[var(--text-muted)] mb-5">{offer.totalLabel}</div>

        {/* Encadré explicatif engagement */}
        <div className="mb-6 text-xs text-[var(--text-body)] bg-[var(--bg-elevated)] rounded-lg px-3 py-2.5 leading-relaxed">
          {offer.commitNote}
        </div>

        <div className="flex-1" />

        <Button
          onClick={onCtaClick}
          variant={isFeatured ? 'gradient' : 'subtle'}
          size="md"
          className="w-full"
        >
          Démarrer 14j gratuits
        </Button>
        <div className="text-[11px] text-[var(--text-muted)] text-center mt-2">
          Sans carte bancaire
        </div>
      </Card>
    </motion.div>
  );
};

export const TarifsPlansDetail = () => {
  const { openModal } = useOnboarding();

  return (
    <section className="relative py-20 md:py-24 bg-[var(--bg-elevated)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(27,111,194,0.06),transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block font-display font-bold uppercase text-[10px] tracking-[0.15em] text-[var(--primary-blue)] bg-[rgba(27,111,194,0.08)] px-3 py-1.5 rounded-full mb-3">
            Le prix
          </span>
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl leading-[1.05] mb-4 text-[var(--text-primary)]">
            Plus vous vous engagez.{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]">
              Moins vous payez.
            </span>
          </h2>
          <p className="text-base md:text-lg text-[var(--text-secondary)]">
            Le même service. Trois durées d&apos;engagement. C&apos;est tout.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
          {PRICING_OFFERS.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} index={i} onCtaClick={openModal} />
          ))}
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Vérifier TypeScript**

Run: `cd boumrank-next && npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 3: Commit**

```bash
cd boumrank-next
git add src/components/tarifs/TarifsPlansDetail.tsx
git commit -m "feat(tarifs): rebuild plans grid for 3-engagement model"
```

---

## Task 7: Refonte de la page /tarifs (orchestration)

**Files:**
- Modify: `boumrank-next/src/app/tarifs/page.tsx`

Nouvelle composition : Hero → FeaturesCentral → PlansDetail → MultiBanner → FAQ → FinalCTA. Retire PricingTeaser, NoExtras, Payment. Met à jour metadata et JSON-LD pour utiliser `PRICING_OFFERS`.

- [ ] **Step 1: Remplacer intégralement le contenu du fichier**

```tsx
import { Metadata } from 'next';
import { SchemaOrg, faqPageSchema, productSchema } from '@/components/seo/SchemaOrg';
import { FinalCTA } from '@/components/home/FinalCTA';
import { TarifsHero } from '@/components/tarifs/TarifsHero';
import { TarifsFeaturesCentral } from '@/components/tarifs/TarifsFeaturesCentral';
import { TarifsPlansDetail } from '@/components/tarifs/TarifsPlansDetail';
import { TarifsMultiBanner } from '@/components/tarifs/TarifsMultiBanner';
import { TarifsFaq } from '@/components/tarifs/TarifsFaq';
import { TARIFS_FAQS } from '@/data/tarifs-faqs';
import { SITE_URL, PRICING_OFFERS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Tarifs — Un service, trois engagements, à partir de 59€/mois',
  description:
    "Un seul service BoumRank, toutes les features incluses. Trois offres : sans engagement à 79€/mois, 6 mois à 69€/mois, 1 an à 59€/mois. Essai gratuit 14 jours sans CB.",
  alternates: { canonical: `${SITE_URL}/tarifs` },
};

const plansForSchema = PRICING_OFFERS.map((offer) => ({
  name: offer.label,
  price: String(offer.price),
  description:
    offer.id === 'yearly'
      ? `Service complet BoumRank avec engagement 12 mois (économisez ${offer.yearlySaving}€/an), notre meilleur deal.`
      : offer.id === 'six-months'
        ? `Service complet BoumRank avec engagement 6 mois (économisez ${offer.yearlySaving}€/an).`
        : 'Service complet BoumRank, sans engagement, résiliable à tout moment.',
}));

export default function TarifsPage() {
  return (
    <>
      <SchemaOrg schemas={[faqPageSchema(TARIFS_FAQS), productSchema(plansForSchema)]} />
      <TarifsHero />
      <TarifsFeaturesCentral />
      <TarifsPlansDetail />
      <TarifsMultiBanner />
      <TarifsFaq />
      <FinalCTA />
    </>
  );
}
```

- [ ] **Step 2: Vérifier TypeScript**

Run: `cd boumrank-next && npx tsc --noEmit`
Expected: aucune erreur. Si erreur sur les imports supprimés (`PricingTeaser`, `TarifsNoExtras`, `TarifsPayment`), elle vient du fait que le fichier ne les importe plus mais les fichiers existent encore — pas grave, on les supprime à la Task 8.

- [ ] **Step 3: Vérifier visuellement en dev**

Run: `cd boumrank-next && npm run dev`

Ouvrir http://localhost:3000/tarifs

**Vérifier** :
- Hero affiche "Un service. Trois engagements. À partir de 59€/mois."
- Bloc features avec 6 features + bandeau "Setup en 5 minutes · ..."
- 3 cartes : 79€ / 69€ / 59€ dans cet ordre
- Carte 59€ surélevée avec ruban "⭐ Le meilleur deal" et badge "Économisez 240€/an"
- Bandeau multi-établissements violet/rose avec CTA "Parler à Liam"
- FAQ avec 6 questions (la 1ère ouverte par défaut)
- Final CTA en bas

Couper le serveur (Ctrl+C) après vérif.

- [ ] **Step 4: Commit**

```bash
cd boumrank-next
git add src/app/tarifs/page.tsx
git commit -m "feat(tarifs): refondre la page tarifs autour de 3 engagements"
```

---

## Task 8: Suppression des composants devenus obsolètes

**Files:**
- Delete: `boumrank-next/src/components/tarifs/TarifsNoExtras.tsx`
- Delete: `boumrank-next/src/components/tarifs/TarifsPayment.tsx`

Vérifier d'abord qu'aucun autre fichier ne les importe.

- [ ] **Step 1: Vérifier l'absence d'imports résiduels**

Run :

```bash
grep -rn "TarifsNoExtras\|TarifsPayment" boumrank-next/src/
```

Expected: aucun résultat (les seuls usages étaient dans `app/tarifs/page.tsx` qu'on vient de modifier).

Si un résultat apparaît, **arrêter** et investiguer avant de supprimer.

- [ ] **Step 2: Supprimer les deux fichiers**

```bash
rm boumrank-next/src/components/tarifs/TarifsNoExtras.tsx
rm boumrank-next/src/components/tarifs/TarifsPayment.tsx
```

- [ ] **Step 3: Vérifier que le build passe**

Run: `cd boumrank-next && npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 4: Commit**

```bash
cd boumrank-next
git add -u src/components/tarifs/
git commit -m "chore(tarifs): remove obsolete NoExtras and Payment components"
```

---

## Task 9: Refonte du PricingTeaser pour la homepage

**Files:**
- Modify: `boumrank-next/src/components/home/PricingTeaser.tsx`

Le PricingTeaser sur la home doit refléter la même structure (3 engagements) avec un H2 différent et un lien vers `/tarifs`.

- [ ] **Step 1: Remplacer intégralement le contenu du fichier**

```tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useOnboarding } from '@/components/ui/OnboardingProvider';
import { PRICING_OFFERS, type PricingOffer } from '@/lib/constants';
import { cn } from '@/lib/utils';

type TeaserCardProps = {
  offer: PricingOffer;
  index: number;
  onCtaClick: () => void;
};

const TeaserCard = ({ offer, index, onCtaClick }: TeaserCardProps) => {
  const isFeatured = offer.highlighted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn('h-full', isFeatured && 'md:-translate-y-3')}
    >
      <Card
        variant="solid"
        padding="lg"
        className={cn(
          'h-full flex flex-col relative overflow-visible',
          isFeatured
            ? 'border-2 shadow-[0_20px_50px_rgba(27,111,194,0.12)]'
            : 'border border-[var(--border-default)]'
        )}
        style={
          isFeatured
            ? {
                borderColor: 'var(--primary-blue)',
                background:
                  'linear-gradient(180deg, rgba(27,111,194,0.04) 0%, rgba(46,174,109,0.04) 100%)',
              }
            : undefined
        }
      >
        {isFeatured && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-[linear-gradient(135deg,#F28C28_0%,#E84393_100%)] text-white text-[10px] font-display font-extrabold uppercase tracking-[0.12em] px-4 py-1.5 rounded-full whitespace-nowrap shadow-[0_8px_20px_rgba(242,140,40,0.3)]">
              ⭐ Le meilleur deal
            </div>
          </div>
        )}

        <div className="mb-3 min-h-[26px]">
          {offer.yearlySaving > 0 ? (
            <span className="inline-block font-display font-bold uppercase text-[10px] tracking-[0.1em] px-3 py-1 rounded-full bg-[rgba(46,174,109,0.12)] text-[var(--primary-green)]">
              Économisez {offer.yearlySaving}€/an
            </span>
          ) : (
            <span className="inline-block invisible">.</span>
          )}
        </div>

        <h3
          className={cn(
            'font-display font-extrabold uppercase text-base tracking-[0.08em] mb-4',
            isFeatured
              ? 'text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]'
              : 'text-[var(--text-primary)]'
          )}
        >
          {offer.label}
        </h3>

        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="font-display font-extrabold text-5xl text-[var(--text-primary)] leading-none">
            {offer.price}€
          </span>
          <span className="text-xs font-display font-semibold text-[var(--text-muted)]">
            /mois HT
          </span>
        </div>
        <div className="text-xs text-[var(--text-muted)] mb-5">{offer.totalLabel}</div>

        <div className="flex-1" />

        <Button
          onClick={onCtaClick}
          variant={isFeatured ? 'gradient' : 'subtle'}
          size="md"
          className="w-full"
        >
          Démarrer 14j gratuits
        </Button>
        <div className="text-[11px] text-[var(--text-muted)] text-center mt-2">
          Sans carte bancaire
        </div>
      </Card>
    </motion.div>
  );
};

export const PricingTeaser = () => {
  const { openModal } = useOnboarding();

  return (
    <section
      id="tarifs-teaser"
      className="relative py-24 md:py-32 bg-[var(--bg-elevated)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(46,174,109,0.08),transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            Plus vous vous engagez.{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]">
              Moins vous payez.
            </span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Un service complet.{' '}
            <span className="font-semibold text-[var(--text-primary)]">
              Trois engagements. À partir de 59€/mois.
            </span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-stretch">
          {PRICING_OFFERS.map((offer, i) => (
            <TeaserCard key={offer.id} offer={offer} index={i} onCtaClick={openModal} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/tarifs"
            className="inline-flex items-center gap-2 font-display font-bold text-sm uppercase tracking-wider text-[var(--primary-blue)] hover:text-[var(--primary-blue-dark)] transition-colors"
          >
            Voir le détail et la FAQ
            <ArrowRight size={14} />
          </Link>
          <p className="text-xs text-[var(--text-muted)] mt-3">
            Toutes les offres incluent : 100% des features · Setup en 5 min · Essai 14 jours sans CB · RGPD
          </p>
        </motion.div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Vérifier TypeScript**

Run: `cd boumrank-next && npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 3: Vérifier visuellement la homepage**

Run: `cd boumrank-next && npm run dev`

Ouvrir http://localhost:3000

**Vérifier** :
- Section PricingTeaser affiche le nouveau H2 "Plus vous vous engagez. Moins vous payez."
- 3 cartes 79/69/59 dans le bon ordre
- Lien "Voir le détail et la FAQ →" en bas pointe vers /tarifs
- Aucune trace de "Essentiel" / "Performance" / "Enterprise" dans la section

Couper le serveur après vérif.

- [ ] **Step 4: Commit**

```bash
cd boumrank-next
git add src/components/home/PricingTeaser.tsx
git commit -m "feat(home): align PricingTeaser with 3-engagement model"
```

---

## Task 10: Audit et refonte du composant home/Pricing.tsx

**Files:**
- Modify (ou Delete): `boumrank-next/src/components/home/Pricing.tsx`

Le grep révèle que ce composant existe aussi avec les anciens noms. Il faut vérifier où il est utilisé puis :
- soit l'aligner sur PRICING_OFFERS,
- soit le supprimer s'il n'est plus utilisé.

- [ ] **Step 1: Vérifier les usages**

Run :

```bash
grep -rn "from '@/components/home/Pricing'" boumrank-next/src/
grep -rn "components/home/Pricing'" boumrank-next/src/
grep -rn "import.*Pricing.*from.*home/Pricing" boumrank-next/src/
```

- [ ] **Step 2: Décision basée sur le résultat**

**Si aucun import trouvé** (le composant est orphelin) :

```bash
rm boumrank-next/src/components/home/Pricing.tsx
```

**Si des imports existent** : ouvrir le fichier et remplacer son contenu par un re-export du PricingTeaser refondu, pour éviter de dupliquer la logique :

```tsx
'use client';

export { PricingTeaser as Pricing } from './PricingTeaser';
```

- [ ] **Step 3: Vérifier que le build passe**

Run: `cd boumrank-next && npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 4: Commit**

Si suppression :

```bash
cd boumrank-next
git add -u src/components/home/Pricing.tsx
git commit -m "chore(home): remove unused legacy Pricing component"
```

Si re-export :

```bash
cd boumrank-next
git add src/components/home/Pricing.tsx
git commit -m "refactor(home): alias Pricing to refactored PricingTeaser"
```

---

## Task 11: Mise à jour de llms.txt

**Files:**
- Modify: `boumrank-next/src/app/llms.txt/route.ts`

Mettre à jour les sections pricing pour refléter le nouveau modèle.

- [ ] **Step 1: Lire le fichier actuel pour localiser la section pricing**

Run :

```bash
cat boumrank-next/src/app/llms.txt/route.ts
```

- [ ] **Step 2: Localiser et remplacer les blocs pricing**

Rechercher toute mention de :
- `Essentiel`
- `Performance` (en tant que plan)
- `Enterprise`
- `65€`
- prix anciens

Et les remplacer par cette section pricing standardisée :

```
## Pricing
- Service unique BoumRank, toutes les features incluses dès le jour 1 (les 3 jeux, branding 100% custom, dashboard Performance, campagnes séquentielles, export CSV, Zapier, support FR prioritaire).
- 3 offres au choix, qui ne diffèrent que par la durée d'engagement :
  - Sans engagement : 79€/mois HT, résiliable à tout moment en 1 clic
  - 6 mois : 69€/mois HT (économisez 120€/an)
  - 1 an : 59€/mois HT (économisez 240€/an) — recommandé, meilleur deal
- Essai gratuit 14 jours sur les 3 offres, sans carte bancaire à l'inscription.
- Paiement mensuel récurrent via Stripe, facture PDF mensuelle, hébergement européen RGPD.
- Pour multi-établissements, franchises, chaînes : devis sur-mesure via /contact (API, account manager dédié, SLA).
```

L'engineer doit lire le fichier, identifier les zones à remplacer (probablement une string template littérale qui contient le markdown), et faire l'édition à la main avec l'outil Edit en s'assurant que la syntaxe TypeScript reste valide (échappement des `${}`, etc.).

- [ ] **Step 3: Vérifier que TypeScript compile et que la route renvoie le nouveau contenu**

Run: `cd boumrank-next && npx tsc --noEmit`

Lancer le dev server : `npm run dev` puis `curl http://localhost:3000/llms.txt` et vérifier que la section Pricing reflète le nouveau modèle.

Couper le serveur.

- [ ] **Step 4: Commit**

```bash
cd boumrank-next
git add src/app/llms.txt/route.ts
git commit -m "docs(llms): update pricing section to 3-engagement model"
```

---

## Task 12: Audit et nettoyage des autres mentions de l'ancien pricing

**Files (audit, puis modification si nécessaire):**
- `boumrank-next/src/app/contact/page.tsx`
- `boumrank-next/src/app/technologie/page.tsx`
- `boumrank-next/src/components/a-propos/AProposMission.tsx`
- `boumrank-next/src/components/home/PerformanceTracking.tsx`
- `boumrank-next/src/components/ui/CookieBanner.tsx`
- `boumrank-next/src/components/interne/BenchmarkClient.tsx`
- `boumrank-next/src/data/competitors.ts`

Ces fichiers contiennent des mentions résiduelles. **Ne pas refondre les pages**, juste corriger les références obsolètes (noms de plans, prix 65€) pour rester cohérent.

- [ ] **Step 1: Identifier toutes les mentions résiduelles**

Run :

```bash
grep -rn "Essentiel\|65€\|à partir de 65" boumrank-next/src/ --include="*.tsx" --include="*.ts"
grep -rn "\"Performance\"\|'Performance'" boumrank-next/src/ --include="*.tsx" --include="*.ts"
grep -rn "Enterprise" boumrank-next/src/ --include="*.tsx" --include="*.ts"
```

Noter chaque ligne à corriger.

- [ ] **Step 2: Pour chaque mention, appliquer la règle suivante**

Cas par cas :

**a) Si la mention est un nom de plan dans une copy marketing** (ex: "le plan Essentiel à 65€") :
→ Remplacer par "BoumRank à partir de 59€/mois" ou "notre offre 1 an à 59€/mois".

**b) Si la mention est dans `src/data/competitors.ts` et concerne **les concurrents**** :
→ Ne pas toucher (ce sont les données des concurrents, pas BoumRank).

**c) Si la mention est dans `src/components/interne/BenchmarkClient.tsx`** :
→ Vérifier si elle décrit BoumRank ou un concurrent. Si BoumRank, mettre à jour le bloc avec "Sans engagement 79€ / 6 mois 69€ / 1 an 59€". Sinon, ne pas toucher.

**d) Si la mention est dans `CookieBanner.tsx`** (probablement un texte d'exemple comme "À partir de 65€/mois") :
→ Remplacer par "À partir de 59€/mois".

**e) Si la mention est dans `PerformanceTracking.tsx`** (probablement un nom de plan utilisé comme exemple visuel) :
→ Remplacer par un nom neutre type "Votre offre BoumRank" ou supprimer la mention.

**f) Si une mention est ambiguë** : la laisser en place et ajouter un commentaire `// TODO: review post-refonte tarifs` dans le fichier.

- [ ] **Step 3: Vérifier que TypeScript compile**

Run: `cd boumrank-next && npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 4: Vérifier qu'il ne reste pas de mention obsolète user-facing**

Run :

```bash
grep -rn "Essentiel\|à partir de 65€" boumrank-next/src/ --include="*.tsx" --include="*.ts" | grep -v "competitors" | grep -v "BenchmarkClient"
```

Expected: aucun résultat (ou uniquement des résultats internes / non user-facing).

- [ ] **Step 5: Commit**

```bash
cd boumrank-next
git add -u src/
git commit -m "chore: align residual pricing mentions with 3-engagement model"
```

---

## Task 13: Build de production, lint, et vérification finale

**Files:** (aucun à modifier — vérifications uniquement)

- [ ] **Step 1: Run du build production**

Run: `cd boumrank-next && npm run build`
Expected: build complet sans erreur. 19+ routes générées. Aucune erreur TypeScript.

Si erreur :
- Lire le message
- Identifier le fichier en cause
- Le corriger
- Re-build
- (Ne pas commit avant qu'il passe)

- [ ] **Step 2: Run du linter**

Run: `cd boumrank-next && npm run lint`
Expected: aucune erreur. Warnings tolérés s'ils ne sont pas dans les fichiers modifiés par cette tâche.

- [ ] **Step 3: Démarrer le dev server et faire un parcours manuel complet**

Run: `cd boumrank-next && npm run dev`

**Checklist visuelle** :
- [ ] `http://localhost:3000/` — homepage avec PricingTeaser refondu (3 cartes 79/69/59)
- [ ] `http://localhost:3000/tarifs` — page complète :
  - Hero "Un service. Trois engagements."
  - Bloc FeaturesCentral avec 6 features
  - 3 cartes prix dans le bon ordre, carte 59€ surélevée + ruban
  - Bandeau multi-établissements
  - FAQ avec 6 nouvelles questions (la 1re ouverte)
  - FinalCTA
- [ ] Clic sur chaque CTA "Démarrer 14j gratuits" → la modal d'onboarding s'ouvre
- [ ] Clic sur "Parler à Liam" → redirige vers `/contact`
- [ ] Toggle dark mode : tous les composants restent lisibles
- [ ] Vue mobile (DevTools 375px) : les 3 cartes s'empilent verticalement, la carte 59€ retrouve sa position normale (pas de translation), bandeau multi s'empile en colonne

Couper le serveur (Ctrl+C).

- [ ] **Step 4: Vérifier le JSON-LD côté code**

Run :

```bash
cd boumrank-next && npm run build && npm start &
```

Attendre 5s, puis :

```bash
curl -s http://localhost:3000/tarifs | grep -A 200 'application/ld+json' | head -100
```

Vérifier que le JSON-LD contient bien les 3 offres avec les prix 79, 69, 59 et que `FAQPage` contient les 6 questions.

Couper le serveur.

- [ ] **Step 5: Vérifier l'absence de références à l'ancien pricing dans le build**

Run :

```bash
grep -rn "Essentiel\|à partir de 65" boumrank-next/.next/server/app/tarifs/ 2>/dev/null
grep -rn "Essentiel" boumrank-next/.next/server/app/page.html 2>/dev/null
```

Expected: aucun résultat sur la page tarifs et la home.

- [ ] **Step 6: Commit final si des ajustements ont été faits**

S'il y a eu des ajustements lors de la vérif :

```bash
cd boumrank-next
git add -A
git commit -m "fix(tarifs): adjustments after final review"
```

Sinon, passer à la Task 14.

---

## Task 14: Push staging et vérification du déploiement

**Files:** (aucun)

CLAUDE.md du repo précise : "Déploiement par défaut : à la fin de chaque tâche touchant `boumrank-next/`, push automatiquement et SANS DEMANDER sur la branche `staging` (GitHub), qui se déploie sur Vercel à l'URL https://staging.boumrank.com/".

- [ ] **Step 1: Vérifier la branche actuelle et l'état**

Run :

```bash
cd /Users/mauimanavarere/Desktop/Boumrank/boumrank-next
git status
git log --oneline -15
```

S'assurer qu'on est sur `staging` (ou se brancher sur `staging` et merger).

- [ ] **Step 2: Push sur staging**

Run :

```bash
git push origin staging
```

- [ ] **Step 3: Attendre le déploiement Vercel (~1-2 minutes)**

Patienter, puis vérifier :

```bash
curl -sI https://staging.boumrank.com/tarifs | head -5
```

Expected: HTTP 200.

- [ ] **Step 4: Vérification manuelle sur staging**

Ouvrir https://staging.boumrank.com/tarifs

Re-dérouler la checklist de la Task 13 step 3 sur la version staging.

- [ ] **Step 5: Communiquer le résultat**

Fournir le lien : **https://staging.boumrank.com/tarifs**

---

## Self-Review

### Spec coverage

| Spec section | Task |
|---|---|
| Pricing model (79/69/59) | Task 1 (PRICING constant) |
| Mécanisme facturation (mensuel, engagement, renouvellement) | Task 2 (FAQ), Task 6 (commitNote) |
| Offre mise en avant (1 an) | Task 6 (isFeatured) |
| Ordre 79 → 69 → 59 | Task 1 (PRICING_OFFERS order) |
| Hero refait | Task 3 |
| TarifsFeaturesCentral | Task 4 |
| TarifsPlansDetail refait | Task 6 |
| TarifsMultiBanner | Task 5 |
| FAQ refondue | Task 2 |
| FinalCTA conservé | Task 7 (présent dans l'orchestration) |
| Suppressions NoExtras + Payment | Task 8 |
| PricingTeaser homepage mirror | Task 9 |
| Pricing.tsx audit | Task 10 |
| llms.txt | Task 11 |
| Constantes PRICING | Task 1 |
| Schema JSON-LD productSchema | Task 7 (plansForSchema) |
| Metadata SEO | Task 7 |
| Autres mentions (contact, technologie, etc.) | Task 12 |
| Critères de succès (build, lint, responsive, JSON-LD) | Task 13 |
| Hors-scope (modal pré-sélection, page enterprise) | Non implémenté, conforme au spec |

✓ Toutes les sections sont couvertes.

### Placeholder scan

Aucun `TBD`, `TODO`, "implement later" ni "similar to". Le seul `TODO` autorisé est dans Task 12 Step 2-f, qui demande explicitement à l'engineer d'**ajouter** un commentaire `// TODO: review post-refonte tarifs` dans des cas ambigus pour audit ultérieur (intentionnel, pas un placeholder du plan).

### Type consistency

- `PricingOffer` typé via `typeof PRICING[keyof typeof PRICING]` (Task 1) — utilisé dans Task 6 et Task 9 sous le même nom.
- Propriétés des offres : `id`, `label`, `price`, `priceUnit`, `commitMonths`, `totalLabel`, `commitNote`, `yearlySaving`, `highlighted` — utilisées partout sous ces mêmes noms.
- `openModal` de `useOnboarding()` — type cohérent partout.
- `productSchema` accepte `Array<{name, price, description}>` — la Task 7 produit exactement ce type via `plansForSchema`.

✓ Consistance OK.

---

## Execution Handoff

Plan complete and saved to `boumrank-next/docs/superpowers/plans/2026-05-11-refonte-page-tarifs-3-engagements.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
