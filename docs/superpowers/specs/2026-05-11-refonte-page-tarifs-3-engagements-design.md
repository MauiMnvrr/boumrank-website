# Refonte page /tarifs — 1 service, 3 engagements

**Date** : 2026-05-11
**Site** : `boumrank-next/` (boumrank.com)
**Page** : `/tarifs`
**Statut** : Design validé, prêt pour implémentation

---

## Contexte

La page `/tarifs` actuelle propose **3 plans différenciés par features** (Essentiel 65€, Performance 79€, Enterprise sur devis). Ce modèle "feature gating" crée de la friction commerciale, complique l'argumentaire et masque la vraie valeur du produit complet.

La nouvelle stratégie pivote vers un **modèle "commitment gating"** : un seul service complet (toutes les features débloquées dès le jour 1), avec 3 offres qui ne diffèrent que par la durée d'engagement et le tarif associé.

## Objectifs

1. Simplifier le message commercial à "1 service, 3 manières de s'engager".
2. Augmenter le LTV moyen en poussant le commitment 12 mois (mis en avant à 59€).
3. Garder une porte d'entrée sans friction avec l'offre 79€ sans engagement.
4. Éliminer le feature gating qui crée des frustrations utilisateur.
5. Conserver une porte d'entrée discrète pour les chaînes/multi-établissements (sans polluer le message principal).

## Pricing model

### Les 3 offres (toutes incluent 100% du service)

| Offre | Prix mensuel | Total période | Économies vs sans engagement | Engagement |
|---|---|---|---|---|
| **Sans engagement** | 79€/mois HT | 948€/an | — | Aucun, résiliation 1 clic |
| **6 mois** | 69€/mois HT | 414€/6 mois | 120€/an | 6 mois minimum |
| **1 an** ⭐ | 59€/mois HT | 708€/an | **240€/an** | 12 mois minimum |

### Mécanisme de facturation

- **Paiement mensuel récurrent** dans tous les cas (pas de paiement à l'avance).
- **Engagement contractuel** sur 6 et 12 mois : si rupture anticipée, le client doit régler les mensualités restantes.
- **Renouvellement automatique** à la fin du cycle, au même tarif. Un email/appel de "check-in" est envoyé avant l'échéance pour permettre au client de revoir son offre.
- **Essai gratuit 14 jours** présent sur les 3 offres, sans carte bancaire requise.
- **Affichage prix** : prix mensuel en gros, total période en petit en dessous.

### Offre mise en avant

**1 an à 59€** mise en avant via :
- Carte centrale surélevée (translateY -12px)
- Bordure gradient bleu→teal→vert (2px)
- Ombre portée gradient
- Ruban orange/rose "⭐ Le meilleur deal"
- Badge "Économisez 240€/an" en vert
- CTA gradient (vs outline pour les 2 autres)

### Ordre d'affichage

Gauche → Droite : **79€ → 69€ → 59€** (du moins engagé au plus engagé). Ancrage prix : la plus chère d'abord rend les autres moins chères, l'œil termine sur l'offre highlightée.

## Architecture des sections de la page

Structure minimaliste validée :

1. **Hero** (TarifsHero refait)
2. **Features centrales** (nouveau composant TarifsFeaturesCentral)
3. **Les 3 offres** (TarifsPlansDetail refait)
4. **Bandeau multi-établissements** (nouveau composant TarifsMultiBanner)
5. **FAQ** (TarifsFaq conservé, données refondues)
6. **Final CTA** (FinalCTA existant, conservé)

Suppressions du flux : `PricingTeaser` (retiré de `/tarifs`, reste sur la home dans sa nouvelle version), `TarifsNoExtras` (info dispatchée), `TarifsPayment` (info dispatchée dans la FAQ et footer).

### Section 1 — TarifsHero (refonte)

**H1** :
> Un service. Trois engagements. À partir de 59€/mois.

Avec "Trois engagements" en gradient bleu→teal→vert.

**Sous-titre** :
> Le même service, débloqué entièrement dès le jour 1. **Vous choisissez juste combien de temps vous voulez rester.**

Pas de CTA dans le hero. Padding `pt-32 pb-16 md:pt-40 md:pb-20`. Background décoratif radial existant conservé.

### Section 2 — TarifsFeaturesCentral (nouveau composant)

Bloc unique centré au-dessus des cartes prix, fond `var(--bg-surface)`, border `var(--border-default)`, padding généreux, shadow douce.

**Eyebrow** : "Ce que vous obtenez"
**H2** : "Toutes les features. **Tout le temps.**" (le "Tout le temps" en gradient)
**Lead** : "Peu importe l'offre choisie, vous avez 100% du service. Pas de feature gating, pas d'upsell caché."

**Grille de 6 features (3×2 desktop, 1×6 mobile)** :

1. **🎰 Les 3 jeux débloqués** — Roue, Slots, Blackjack — tous activables à volonté
2. **🎨 Branding 100% custom** — 13 templates + palette illimitée + illustrations
3. **📊 Dashboard Performance** — Taux scan, conversion, retour caisse, temps moyen
4. **📱 QR codes illimités** — 3 formats imprimables fournis, swipe caissier illimité
5. **⚡ Campagnes séquentielles** — Happy hour, week-end, anniversaire client
6. **💬 Support FR prioritaire** — Réponse en chat sous 2h, hébergement RGPD en Europe

Les icônes sont des emojis sur fond rond vert clair `rgba(46,174,109,0.1)` (pour préserver le ton ludique BoumRank). À implémenter en composant React avec icônes `lucide-react` équivalentes au choix : `Gamepad2, Palette, BarChart3, QrCode, Zap, MessageCircle`.

**Bandeau du bas (séparateur intégré)** :
> ✓ Setup en 5 minutes · ✓ Essai 14 jours sans CB · ✓ Export CSV + Zapier · ✓ Mises à jour à vie

(Ce bandeau remplace `TarifsNoExtras` en l'absorbant.)

### Section 3 — TarifsPlansDetail (refonte complète)

**Eyebrow** : "Le prix"
**H2** : "Plus vous vous engagez. **Moins vous payez.**" (avec "Moins vous payez" en gradient)
**Lead** : "Le même service. Trois durées d'engagement. C'est tout."

**Grille 3 colonnes desktop, 1 colonne mobile**, gap 16px, max-width 980px.

#### Carte 1 : Sans engagement

- Badge invisible (placeholder pour alignement)
- **Titre** : "Sans engagement"
- **Prix** : `79€` (taille 48px) + `/mois HT` (12px gris)
- **Total** : "Soit 948€ sur 12 mois"
- **Encadré gris** (`commit-note`) : "Liberté maximale. Résiliable en 1 clic, à tout moment."
- **CTA** : `outline`, "Démarrer 14j gratuits"
- **Micro-texte** : "Sans carte bancaire"

#### Carte 2 : 6 mois

- **Badge** : "Économisez 120€/an" (vert)
- **Titre** : "6 mois"
- **Prix** : `69€` + `/mois HT`
- **Total** : "Soit 414€ tous les 6 mois"
- **Encadré gris** : "Engagement 6 mois minimum. Renouvellement automatique au même tarif."
- **CTA** : `outline`, "Démarrer 14j gratuits"
- **Micro-texte** : "Sans carte bancaire"

#### Carte 3 : 1 an (FEATURED)

- **Ruban** : "⭐ Le meilleur deal" (gradient orange→rose, position top centrée)
- **Badge** : "Économisez 240€/an" (vert)
- **Titre** : "1 an" (en gradient bleu→vert)
- **Prix** : `59€` + `/mois HT`
- **Total** : "Soit 708€ sur 12 mois"
- **Encadré gris** : "Engagement 12 mois. Point bilan avant chaque renouvellement."
- **CTA** : `gradient` (bouton plein avec gradient brand), "Démarrer 14j gratuits"
- **Micro-texte** : "Sans carte bancaire"
- **Carte surélevée** (`-translate-y-3` desktop, retour à 0 mobile)
- **Bordure** : 2px gradient via `border-color: var(--primary-blue)` + `shadow-[0_20px_50px_rgba(27,111,194,0.12)]`
- **Background** : `linear-gradient(180deg, rgba(27,111,194,0.04) 0%, rgba(46,174,109,0.04) 100%)`

**Comportement** : Chaque CTA ouvre la modal d'onboarding (`useOnboarding().openModal()`) en passant en paramètre l'offre sélectionnée (à confirmer côté onboarding modal si elle accepte un préselect).

### Section 4 — TarifsMultiBanner (nouveau composant)

Bandeau horizontal max-width 980px, padding `28px 32px`, border-radius 20px.

**Background** : `linear-gradient(135deg, rgba(124,92,252,0.04) 0%, rgba(232,67,147,0.04) 100%)` avec border `rgba(124,92,252,0.15)`.

**Layout flex** :
- À gauche :
  - **H3** : "Plusieurs établissements ? Franchise ?"
  - **Body** : "Multi-établissements, API, account manager dédié, SLA. On vous fait un devis sur-mesure en 48h."
- À droite : CTA `Link href="/contact"`, gradient violet→rose, "Parler à Liam"

Mobile : `flex-direction: column`, text-center, CTA pleine largeur.

### Section 5 — TarifsFaq + tarifs-faqs.ts (refonte des données)

Composant `TarifsFaq.tsx` **conservé tel quel** (accordion). Seules les données changent.

**Nouveau contenu des 6 FAQs** (`src/data/tarifs-faqs.ts`) :

1. **Q01 — Que se passe-t-il si je résilie avant la fin de mon engagement ?**
   > Sur les offres 6 mois et 1 an, vous vous engagez sur la durée choisie. En cas de résiliation anticipée, vous payez les mensualités restantes. Sur la formule sans engagement (79€), vous résiliez en 1 clic, quand vous voulez, sans pénalité.

2. **Q02 — Comment se passe le renouvellement à la fin de mon engagement ?**
   > Votre abonnement se renouvelle automatiquement au même tarif. Avant chaque échéance, on vous contacte pour faire un point sur vos résultats et confirmer (ou ajuster) votre formule. Aucune surprise, aucun piège.

3. **Q03 — L'essai gratuit 14 jours, il marche pour les 3 offres ?**
   > Oui, les 3 offres démarrent par 14 jours gratuits, sans carte bancaire à l'inscription. Toutes les features débloquées, aucune limite de scans. Au jour 14, vous choisissez votre offre (ou vous partez, sans reproche).

4. **Q04 — Je peux passer d'une offre à une autre en cours de route ?**
   > Upgrade vers une offre plus engageante (donc moins chère) : instantané, à tout moment. Downgrade vers une offre moins engageante : effectif à la fin de votre cycle d'engagement en cours. Tout se fait en 1 clic depuis votre dashboard.

5. **Q05 — Les features sont vraiment toutes incluses, même dans la formule à 79€ ?**
   > Oui. Les 3 jeux, le branding 100% custom, le dashboard Performance, les campagnes séquentielles, l'export CSV, Zapier, le support prioritaire FR : tout est débloqué dès le jour 1, peu importe l'offre. Les 3 offres ne diffèrent que par la durée d'engagement et le tarif associé.

6. **Q06 — Comment ça se passe pour les paiements et la facturation ?**
   > Paiement mensuel récurrent via Stripe (PCI-DSS niveau 1). Facture PDF émise chaque mois, téléchargeable depuis votre dashboard. Hébergement européen, RGPD, aucune revente de données. Le 1er prélèvement intervient à la fin de votre essai 14j.

**Schéma JSON-LD** : `faqPageSchema(TARIFS_FAQS)` continue de fonctionner automatiquement.

### Section 6 — FinalCTA (existant, conservé)

Aucun changement.

## Refonte parallèle : PricingTeaser (homepage)

Le composant `src/components/home/PricingTeaser.tsx` doit être refondu pour refléter la même structure (3 offres par engagement). Il sera **retiré de `/tarifs`** mais reste sur la home (`/`).

Structure simplifiée pour la home :
- H2 : "Plus vous vous engagez. **Moins vous payez.**"
- Lead : "Un service complet. Trois engagements. À partir de 59€/mois."
- Mêmes 3 cartes que `TarifsPlansDetail` (composant partagé ou pattern dupliqué, voir Architecture)
- Lien bas : "Voir les détails et la FAQ →" vers `/tarifs`

## Constantes & data

### `src/lib/constants.ts`

Ajouter :

```ts
export const PRICING = {
  flex: { price: 79, label: 'Sans engagement', commitMonths: 0 },
  sixMonths: { price: 69, label: '6 mois', commitMonths: 6, yearlySaving: 120 },
  yearly: { price: 59, label: '1 an', commitMonths: 12, yearlySaving: 240 },
} as const;
```

Retirer les anciennes références à Essentiel/Performance/Enterprise dans `lib/constants.ts` si présentes.

### Schema Org (`src/app/tarifs/page.tsx`)

Le tableau `plansForSchema` change pour décrire 3 offres du même produit :

```ts
const plansForSchema = [
  {
    name: 'Sans engagement',
    price: '79',
    description: 'Service complet BoumRank, sans engagement, résiliable à tout moment.',
  },
  {
    name: '6 mois',
    price: '69',
    description: 'Service complet BoumRank avec engagement 6 mois (économisez 120€/an).',
  },
  {
    name: '1 an',
    price: '59',
    description: "Service complet BoumRank avec engagement 12 mois (économisez 240€/an), notre meilleur deal.",
  },
];
```

### Metadata SEO

```ts
export const metadata: Metadata = {
  title: 'Tarifs — Un service, trois engagements, à partir de 59€/mois',
  description:
    "Un seul service BoumRank, toutes les features incluses. Trois offres : sans engagement à 79€/mois, 6 mois à 69€/mois, 1 an à 59€/mois. Essai gratuit 14 jours sans CB.",
  alternates: { canonical: `${SITE_URL}/tarifs` },
};
```

### `src/app/llms.txt/route.ts`

Mettre à jour la section pricing pour refléter le nouveau modèle :

```
## Pricing
- Service unique BoumRank, toutes les features incluses dès le jour 1.
- 3 offres au choix :
  - Sans engagement : 79€/mois HT, résiliable à tout moment
  - 6 mois : 69€/mois HT (économisez 120€/an)
  - 1 an : 59€/mois HT (économisez 240€/an) — recommandé
- Essai gratuit 14 jours, sans carte bancaire.
- Pour multi-établissements/franchises : devis sur-mesure (contact).
```

## Architecture des fichiers

### Fichiers créés

- `src/components/tarifs/TarifsFeaturesCentral.tsx` — Liste centrale des 6 features
- `src/components/tarifs/TarifsMultiBanner.tsx` — Bandeau multi-établissements

### Fichiers modifiés

- `src/app/tarifs/page.tsx` — Nouvelle composition (retire PricingTeaser, NoExtras, Payment ; ajoute FeaturesCentral, MultiBanner)
- `src/components/tarifs/TarifsHero.tsx` — Nouveau H1 + sous-titre
- `src/components/tarifs/TarifsPlansDetail.tsx` — Refonte complète (3 offres par engagement)
- `src/data/tarifs-faqs.ts` — 6 nouvelles questions
- `src/lib/constants.ts` — Ajout objet `PRICING`
- `src/components/home/PricingTeaser.tsx` — Refonte pour mirror la nouvelle structure
- `src/app/llms.txt/route.ts` — Update du résumé pricing
- `src/components/home/Pricing.tsx` — Si utilisé ailleurs, audit + refonte cohérente (à confirmer)
- `src/components/seo/SchemaOrg.tsx` — Vérifier que `productSchema` accepte 3 offres avec ce format
- Autres pages qui mentionnent 65€/Essentiel/Performance/Enterprise : `contact/page.tsx`, `technologie/page.tsx`, `a-propos/AProposMission.tsx`, `PerformanceTracking.tsx`, `CookieBanner.tsx`, `BenchmarkClient.tsx`, `competitors.ts` — audit et mise à jour cohérente

### Fichiers supprimés

- `src/components/tarifs/TarifsNoExtras.tsx`
- `src/components/tarifs/TarifsPayment.tsx`

(Conserver dans `_Archive/` du repo si demandé, sinon `git rm`.)

### Composants UI réutilisés

- `Card` (`@/components/ui/Card`) avec variantes existantes
- `Button` (`@/components/ui/Button`) avec variants `gradient`, `outline`
- `useOnboarding()` pour les CTA → modal
- Icônes `lucide-react` : `Gamepad2`, `Palette`, `BarChart3`, `QrCode`, `Zap`, `MessageCircle`, `Check`, `ArrowRight`
- Framer Motion pour les animations d'entrée (`initial`/`whileInView` + stagger par index)

## Conventions de copy

- Toutes les copies en **français**.
- Ton **direct, énergique, business-friendly** (charte BoumRank existante).
- **Aucun tiret cadratin `—`** dans le user-facing : utiliser virgules, points, parenthèses, deux-points.
- Mots-clés à respecter : "1 service", "Trois engagements", "À partir de 59€/mois", "Toutes les features", "Essai 14j sans CB".

## Design tokens

Tous les visuels utilisent les variables CSS du design system 2026 :

- Gradient brand : `linear-gradient(135deg, #1B6FC2 0%, #1E9DAA 50%, #2EAE6D 100%)`
- Gradient orange/rose (ruban) : `linear-gradient(135deg, #F28C28 0%, #E84393 100%)`
- Gradient violet/rose (multi-banner) : `linear-gradient(135deg, #7C5CFC 0%, #E84393 100%)`
- Badge succès : background `rgba(46,174,109,0.12)`, color `var(--primary-green)`
- Tous textes via `var(--text-primary/body/muted)`, surfaces via `var(--bg-primary/surface/elevated)`

## Critères de succès

1. La page `/tarifs` affiche 3 offres avec la nouvelle structure (79/69/59) sans aucune référence à Essentiel/Performance/Enterprise.
2. Le ratio de clic sur le CTA "Démarrer 14j gratuits" augmente vs la version actuelle (à mesurer post-déploiement).
3. Le build passe (`npm run build`), TypeScript clean, ESLint clean.
4. Aucune référence aux anciens noms de plans nulle part dans le site (audit grep).
5. Le JSON-LD `productSchema` valide via le Rich Results Test Google.
6. La page est responsive (3 cartes côte à côte ≥ 900px, empilées en dessous).
7. La modal d'onboarding s'ouvre toujours correctement depuis les 3 CTA.
8. Les badges "Économisez 120/240€/an" sont visibles et lisibles.
9. La FAQ contient les 6 nouvelles questions, schéma FAQPage valide.
10. PricingTeaser sur homepage reflète la même structure.

## Hors scope (à traiter ailleurs)

- Implémentation backend des règles d'engagement (paiements bloqués/frais de résiliation) → côté Stripe/app, pas dans ce repo marketing.
- Modal d'onboarding préselectionnant l'offre choisie → à vérifier/adapter ultérieurement.
- Page séparée `/multi-etablissements` ou `/enterprise` → non créée pour cette task (CTA pointe vers `/contact`).
- Refonte des copies des autres pages mentionnant l'ancien pricing (contact, technologie, a-propos) → audit fait, refonte dans une task séparée si le scope est trop large.
- Pas d'A/B test mis en place dans cette task. Mesure simple via analytics existantes (Vercel Analytics + Speed Insights).

## Suite

Une fois ce spec validé, on passe au **plan d'implémentation détaillé** (writing-plans skill) qui découpe le travail en étapes commitables avec critères de validation à chaque étape.
