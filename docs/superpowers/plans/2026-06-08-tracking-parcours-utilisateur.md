# Tracking « parcours utilisateur complet » — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Instrumenter le site vitrine (boumrank.com) pour des analyses complètes du parcours utilisateur, en diffusant une taxonomie d'événements normalisée vers GA4, Meta Pixel, TikTok Pixel (site-wide) et Google Ads/LinkedIn via GTM.

**Architecture:** Hybride (décision « C »). Une table de correspondance `events.ts` + `trackEvent()` diffuse en code vers GA4 + Meta + TikTok ; le `dataLayer` reste poussé pour que GTM gère uniquement les conversions Google Ads/LinkedIn. Un composant client `<JourneyTracking/>` capture automatiquement pageviews SPA, scroll depth, vues de sections, clics CTA/sortants, début de formulaire. Tout reste sous Consent Mode v2.

**Tech Stack:** Next.js 16 (App Router) · React 19 · TypeScript · `@next/third-parties/google` (GTM+GA4) · Meta Pixel · TikTok Pixel · `next/script`.

**Branche de travail :** `staging` (repo `boumrank-website`). Convention projet : commits sur staging, push staging en fin de tâche.

**Vérification (pas de test-runner dans ce repo) :**
- `npm run build` (typecheck + build prod)
- `npm run lint`
- Runtime : `npm run dev` puis inspection `window.dataLayer` / onglet Network (requêtes `google-analytics`, `facebook`, `tiktok`) avant/après consentement.

---

## File Structure

**Nouveaux fichiers**
- `src/lib/events.ts` — table de correspondance `EVENTS` + `trackEvent()` (source de vérité du mapping multi-plateformes).
- `src/components/analytics/JourneyTracking.tsx` — instrumentation automatique (client, monté 1×).
- `public/tiktok-pixel-boot.js` — loader TikTok consent-gated (calqué sur `meta-pixel-boot.js`).
- `docs/analytics-tracking-plan.md` — doc livrable : taxonomie, IDs/Vercel, GTM, guide d'analyse GA4.

**Fichiers modifiés**
- `src/lib/analytics.ts` — ajout `trackTikTok()` (pas de breaking change).
- `src/components/analytics/AnalyticsScripts.tsx` — branchement du loader TikTok.
- `src/app/[locale]/layout.tsx` — montage `<JourneyTracking/>` dans un `<Suspense>`.
- Composants sections (home + pages) — attributs `data-section` + `data-cta`/`data-cta-location`.
- Composants émetteurs de conversions — bascule `track()/trackMeta()` → `trackEvent()`.

---

## Task 1: Couche analytics — `trackTikTok()` + table d'événements

**Files:**
- Modify: `src/lib/analytics.ts` (ajout d'une fonction après `trackMeta`)
- Create: `src/lib/events.ts`

- [ ] **Step 1: Ajouter `trackTikTok()` dans `src/lib/analytics.ts`**

Insérer après la fonction `trackMeta` (fin du fichier) :

```ts
/** TikTok Pixel event (Contact, ViewContent, SubmitForm…). Consent-gated manually. */
export function trackTikTok(name: string, payload: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  const consent = readConsent();
  if (consent.ads !== 'granted') return;
  const w = window as any;
  if (!w.ttq) return;
  // TikTok page view uses ttq.page(), pas ttq.track('page')
  if (name === 'page') {
    if (typeof w.ttq.page === 'function') w.ttq.page();
    return;
  }
  if (typeof w.ttq.track === 'function') w.ttq.track(name, payload);
}
```

- [ ] **Step 2: Créer `src/lib/events.ts`**

```ts
/**
 * BoumRank — Table de correspondance des événements (source de vérité).
 *
 * Un seul appel `trackEvent(key, payload)` diffuse vers les bonnes plateformes :
 *   - GA4   : toujours (via track() → gtag + dataLayer ; Consent Mode gère le gating)
 *   - Meta  : si `meta` défini et consentement ads accordé
 *   - TikTok: si `tiktok` défini et consentement ads accordé
 *
 * Les noms GA4 sont STABLES (configurés en conversions GA4) : ne pas les renommer
 * sans mettre à jour GA4 + docs/analytics-tracking-plan.md.
 */
import { track, trackMeta, trackTikTok } from './analytics';

export type EventKey =
  | 'signup_click'
  | 'demo_click'
  | 'pricing_tier_click'
  | 'contact_form_submitted'
  | 'contact_click'
  | 'lead_magnet_submitted'
  | 'lead_magnet_download'
  | 'page_view'
  | 'scroll_depth'
  | 'section_view'
  | 'cta_click'
  | 'outbound_click'
  | 'form_start'
  | 'file_download';

interface EventMap {
  /** Nom de l'event GA4 (aussi poussé dans le dataLayer pour GTM). */
  ga: string;
  /** Nom d'event standard Meta, si l'event doit atteindre le Pixel Meta. */
  meta?: string;
  /** Nom d'event standard TikTok ('page' = pageview), si l'event doit atteindre TikTok. */
  tiktok?: string;
}

export const EVENTS: Record<EventKey, EventMap> = {
  signup_click:           { ga: 'signup_click',           meta: 'Lead',        tiktok: 'Contact' },
  demo_click:             { ga: 'demo_click',             meta: 'ViewContent', tiktok: 'ViewContent' },
  pricing_tier_click:     { ga: 'pricing_tier_click',     meta: 'ViewContent', tiktok: 'ViewContent' },
  contact_form_submitted: { ga: 'contact_form_submitted', meta: 'Lead',        tiktok: 'SubmitForm' },
  contact_click:          { ga: 'contact_click',          meta: 'Contact',     tiktok: 'Contact' },
  lead_magnet_submitted:  { ga: 'lead_magnet_submitted',                       tiktok: 'SubmitForm' },
  lead_magnet_download:   { ga: 'lead_magnet_download',   meta: 'Lead',        tiktok: 'Download' },
  page_view:              { ga: 'page_view',              meta: 'PageView',    tiktok: 'page' },
  scroll_depth:           { ga: 'scroll_depth' },
  section_view:           { ga: 'section_view' },
  cta_click:              { ga: 'cta_click' },
  outbound_click:         { ga: 'outbound_click' },
  form_start:             { ga: 'form_start' },
  file_download:          { ga: 'file_download' },
};

/** Diffuse un événement normalisé vers toutes ses plateformes mappées. */
export function trackEvent(key: EventKey, payload: Record<string, unknown> = {}): void {
  const m = EVENTS[key];
  if (!m) return;
  track(m.ga, payload);
  if (m.meta) trackMeta(m.meta, payload);
  if (m.tiktok) trackTikTok(m.tiktok, payload);
}
```

- [ ] **Step 3: Vérifier le typecheck**

Run: `cd /Users/mauimanavarere/Desktop/Boumrank/website && npm run build`
Expected: build OK, pas d'erreur TS sur `events.ts` / `analytics.ts`.

- [ ] **Step 4: Lint**

Run: `cd /Users/mauimanavarere/Desktop/Boumrank/website && npm run lint`
Expected: pas d'erreur (le `as any` est déjà toléré via `eslint-disable` en tête de `analytics.ts`).

- [ ] **Step 5: Commit**

```bash
cd /Users/mauimanavarere/Desktop/Boumrank/website
git add src/lib/analytics.ts src/lib/events.ts
git commit -m "feat(analytics): trackTikTok + table d'événements multi-plateformes

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2: TikTok Pixel site-wide (loader + branchement)

**Files:**
- Create: `public/tiktok-pixel-boot.js`
- Modify: `src/components/analytics/AnalyticsScripts.tsx`

- [ ] **Step 1: Créer `public/tiktok-pixel-boot.js`**

```js
/**
 * BoumRank — TikTok Pixel loader avec gate de consentement.
 *
 * Chargé via <Script src="/tiktok-pixel-boot.js" strategy="lazyOnload" /> avec
 * l'ID dans data-pixel-id. Ne s'initialise QUE si l'utilisateur a accordé le
 * consentement 'ads' (localStorage boumrank_consent_v1). Sinon : inerte.
 */
(function () {
  var scriptTag = document.getElementById('tiktok-pixel');
  var pixelId = scriptTag && scriptTag.getAttribute('data-pixel-id');
  if (!pixelId) return;
  pixelId = pixelId.trim();

  var adsGranted = false;
  try {
    var raw = localStorage.getItem('boumrank_consent_v1');
    if (raw) {
      var c = JSON.parse(raw);
      adsGranted = c && c.ads === 'granted';
    }
  } catch (e) {
    // pas de consentement stocké → rester inerte
  }
  if (!adsGranted) return;

  // Snippet officiel TikTok Pixel
  !(function (w, d, t) {
    w.TiktokAnalyticsObject = t;
    var ttq = (w[t] = w[t] || []);
    ttq.methods = [
      'page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once',
      'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'holdConsent',
      'revokeConsent', 'grantConsent',
    ];
    ttq.setAndDefer = function (obj, method) {
      obj[method] = function () {
        obj.push([method].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
    ttq.instance = function (id) {
      var inst = (ttq._i && ttq._i[id]) || [];
      for (var n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(inst, ttq.methods[n]);
      return inst;
    };
    ttq.load = function (id, opts) {
      var url = 'https://analytics.tiktok.com/i18n/pixel/events.js';
      ttq._i = ttq._i || {};
      ttq._i[id] = [];
      ttq._i[id]._u = url;
      ttq._t = ttq._t || {};
      ttq._t[id] = +new Date();
      ttq._o = ttq._o || {};
      ttq._o[id] = opts || {};
      var script = d.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = url + '?sdkid=' + id + '&lib=' + t;
      var first = d.getElementsByTagName('script')[0];
      first.parentNode.insertBefore(script, first);
    };
    ttq.load(pixelId);
    ttq.page();
  })(window, document, 'ttq');
})();
```

- [ ] **Step 2: Brancher le loader dans `AnalyticsScripts.tsx`**

Dans `src/components/analytics/AnalyticsScripts.tsx`, ajouter la lecture de l'ID (après `const metaPixelId = …`) :

```tsx
  const tiktokPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
```

Puis, juste après le bloc `{metaPixelId && ( … )}`, ajouter :

```tsx
      {/* TikTok Pixel — gated par consentement ads dans /tiktok-pixel-boot.js */}
      {tiktokPixelId && (
        <Script
          id="tiktok-pixel"
          strategy="lazyOnload"
          src="/tiktok-pixel-boot.js"
          data-pixel-id={tiktokPixelId}
        />
      )}
```

- [ ] **Step 3: Build**

Run: `cd /Users/mauimanavarere/Desktop/Boumrank/website && npm run build`
Expected: build OK.

- [ ] **Step 4: Commit**

```bash
cd /Users/mauimanavarere/Desktop/Boumrank/website
git add public/tiktok-pixel-boot.js src/components/analytics/AnalyticsScripts.tsx
git commit -m "feat(analytics): TikTok Pixel site-wide, consent-gated

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 3: Composant `<JourneyTracking/>` (instrumentation automatique)

**Files:**
- Create: `src/components/analytics/JourneyTracking.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Créer `src/components/analytics/JourneyTracking.tsx`**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { track } from '@/lib/analytics';
import { trackEvent } from '@/lib/events';

/**
 * Instrumentation automatique du parcours (montée 1× dans le layout [locale]).
 *
 * - page_view : à CHAQUE navigation SPA (le 1er chargement est déjà compté par
 *   les scripts de boot gtag/Meta/TikTok → on saute le 1er rendu pour éviter le
 *   double comptage).
 * - scroll_depth : seuils 25/50/75/90 % (1× chacun, throttlé en rAF).
 * - section_view : IntersectionObserver sur [data-section] (1×/section/page).
 * - cta_click / outbound_click / file_download : un listener click délégué.
 * - form_start : un listener focusin délégué (1×/formulaire).
 *
 * Tout passe par track()/trackEvent() → gating par Consent Mode / readConsent().
 */
export function JourneyTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstLoad = useRef(true);

  // --- page_view sur navigation SPA (skip 1er chargement) ---
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    const query = searchParams?.toString();
    trackEvent('page_view', {
      page_location: window.location.href,
      page_path: pathname + (query ? `?${query}` : ''),
      page_title: document.title,
      locale: document.documentElement.lang || 'fr',
    });
  }, [pathname, searchParams]);

  // --- listeners globaux (montés 1×) : scroll / click / focus ---
  useEffect(() => {
    // scroll depth
    const thresholds = [25, 50, 75, 90];
    const fired = new Set<number>();
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - doc.clientHeight;
        if (scrollable <= 0) return;
        const pct = (doc.scrollTop / scrollable) * 100;
        for (const t of thresholds) {
          if (pct >= t && !fired.has(t)) {
            fired.add(t);
            track('scroll_depth', { percent_scrolled: t });
          }
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // clics délégués : cta / file_download / outbound
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const ctaEl = target.closest<HTMLElement>('[data-cta]');
      if (ctaEl) {
        track('cta_click', {
          cta_id: ctaEl.getAttribute('data-cta') || '',
          cta_location: ctaEl.getAttribute('data-cta-location') || '',
        });
      }

      const a = target.closest<HTMLAnchorElement>('a[href]');
      if (a) {
        const href = a.getAttribute('href') || '';
        if (/\.(pdf|zip|csv|xlsx?|docx?|pptx?)(\?|#|$)/i.test(href)) {
          const file = href.split('/').pop()?.split(/[?#]/)[0] || href;
          track('file_download', { file_name: file });
        }
        try {
          const url = new URL(href, window.location.href);
          if (url.origin !== window.location.origin && /^https?:$/.test(url.protocol)) {
            track('outbound_click', { link_url: url.href, link_domain: url.hostname });
          }
        } catch {
          // href relatif / mailto / tel → ignoré
        }
      }
    };
    document.addEventListener('click', onClick, true);

    // form_start : 1er focus dans un <form>
    const startedForms = new Set<string>();
    const onFocusIn = (e: FocusEvent) => {
      const el = e.target as HTMLElement | null;
      const form = el?.closest('form');
      if (!form) return;
      const id =
        form.getAttribute('id') ||
        form.getAttribute('name') ||
        form.getAttribute('data-form') ||
        'form';
      if (startedForms.has(id)) return;
      startedForms.add(id);
      track('form_start', { form_id: id });
    };
    document.addEventListener('focusin', onFocusIn);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('focusin', onFocusIn);
    };
  }, []);

  // --- section_view : ré-observé à chaque page ---
  useEffect(() => {
    const seen = new Set<string>();
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = (entry.target as HTMLElement).getAttribute('data-section') || '';
          if (id && !seen.has(id)) {
            seen.add(id);
            track('section_view', { section_id: id });
          }
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.4 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
```

- [ ] **Step 2: Monter `<JourneyTracking/>` dans le layout (avec Suspense)**

Dans `src/app/[locale]/layout.tsx` :

1. Ajouter les imports en tête :
```tsx
import { Suspense } from 'react';
import { JourneyTracking } from '@/components/analytics/JourneyTracking';
```

2. Remplacer la ligne `<AnalyticsScripts />` (juste avant `</body>`) par :
```tsx
        <AnalyticsScripts />
        <Suspense fallback={null}>
          <JourneyTracking />
        </Suspense>
```

> `useSearchParams()` impose un `<Suspense>` pour ne pas faire bail-out le rendu statique.

- [ ] **Step 3: Build**

Run: `cd /Users/mauimanavarere/Desktop/Boumrank/website && npm run build`
Expected: build OK, pas d'erreur « useSearchParams should be wrapped in a suspense boundary ».

- [ ] **Step 4: Vérification runtime (dataLayer)**

Run: `cd /Users/mauimanavarere/Desktop/Boumrank/website && npm run dev`
Dans le navigateur (http://localhost:3000) :
1. Accepter les cookies (bannière).
2. Naviguer home → /tarifs : `window.dataLayer` doit contenir un `{event:'page_view', page_path:'/tarifs', …}` (et un seul, pas de doublon du 1er hit).
3. Scroller : `scroll_depth` à 25/50/75/90 une fois chacun.
4. La zone pricing visible : `section_view {section_id:'pricing'}` (après Task 4).
Expected: events présents dans `dataLayer`, sans doublon.

- [ ] **Step 5: Commit**

```bash
cd /Users/mauimanavarere/Desktop/Boumrank/website
git add src/components/analytics/JourneyTracking.tsx "src/app/[locale]/layout.tsx"
git commit -m "feat(analytics): JourneyTracking (pageview SPA, scroll, sections, CTA, form-start)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 4: Annotations `data-section` + `data-cta` sur les sections clés

**Files (Modify) :** poser l'attribut `data-section="<id>"` sur l'élément racine `<section>`/wrapper de chaque section, et `data-cta="<id>" data-cta-location="<zone>"` sur les CTA principaux non déjà typés. Lire chaque fichier puis ajouter l'attribut sur l'élément racine.

Cartographie des `data-section` (home + pages) :

| Fichier | `data-section` |
|---|---|
| `src/components/home/Hero.tsx` | `hero` |
| `src/components/home/HowItWorks.tsx` | `how_it_works` |
| `src/components/home/PricingTeaser.tsx` | `pricing` |
| `src/components/home/FAQ.tsx` | `faq` |
| `src/components/home/Sectors.tsx` | `sectors` |
| `src/components/home/FinalCTA.tsx` | `final_cta` |
| `src/components/home/LeadMagnet.tsx` | `lead_magnet` |
| `src/components/tarifs/TarifsPlansDetail.tsx` | `tarifs_plans` |

- [ ] **Step 1: Poser les `data-section`**

Pour chaque fichier du tableau, lire le fichier, repérer l'élément racine de la section (souvent `<section …>` ou `<motion.section …>`) et y ajouter l'attribut, ex. pour `PricingTeaser.tsx` :
```tsx
// avant
<section className="...">
// après
<section data-section="pricing" className="...">
```
Répéter avec l'`id` correspondant pour chacun des 8 fichiers.

- [ ] **Step 2: Généraliser `data-cta` sur les CTA secondaires non typés**

Les CTA de conversion gardent leur `trackEvent` (Task 5). Pour les CTA de navigation importants sans tracking (ex. boutons Navbar « Connexion » / « Essai gratuit », liens « Voir la démo » secondaires), ajouter `data-cta` + `data-cta-location`. Exemple Navbar (`src/components/layout/Navbar.tsx`) sur le bouton principal :
```tsx
<a href={SIGNUP_URL} data-cta="signup" data-cta-location="navbar" ...>
```
> Le Hero a déjà `data-cta="demo"`. `cta_click` est GA4-only (pas de Meta/TikTok) → aucun risque de double comptage de conversion.

- [ ] **Step 3: Build**

Run: `cd /Users/mauimanavarere/Desktop/Boumrank/website && npm run build`
Expected: build OK.

- [ ] **Step 4: Vérification runtime (section_view)**

`npm run dev`, scroller la home : `dataLayer` reçoit `section_view` pour `hero`, `how_it_works`, `pricing`, `faq`, `sectors`, `final_cta`, `lead_magnet` (une fois chacun).

- [ ] **Step 5: Commit**

```bash
cd /Users/mauimanavarere/Desktop/Boumrank/website
git add src/components
git commit -m "feat(analytics): data-section + data-cta sur les sections et CTA clés

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 5: Router les conversions via `trackEvent` (ajout TikTok)

**Objectif :** remplacer les paires `track()/trackMeta()` de conversion par un seul `trackEvent()` pour ajouter la diffusion TikTok et homogénéiser. Fusionner les `content_name`/`pricing_tier` dans le payload unique.

**Files (Modify) :** `Hero.tsx`, `PricingTeaser.tsx`, `TarifsPlansDetail.tsx`, `ContactForm.tsx`, `LeadMagnet.tsx`, `FinalCTA.tsx`, `FAQ.tsx`, `Sectors.tsx`, `AProposCTA.tsx`, `SectorPageClient.tsx`, `HowItWorks.tsx`.

- [ ] **Step 1: Mettre à jour les imports**

Dans chaque fichier listé, remplacer l'import `{ track }` et/ou `{ track, trackMeta }` depuis `@/lib/analytics` par un import de `trackEvent` depuis `@/lib/events`. Conserver `track` SEULEMENT si le fichier émet aussi un event non-conversion. Exemple :
```tsx
// avant
import { track, trackMeta } from '@/lib/analytics';
// après
import { trackEvent } from '@/lib/events';
```

- [ ] **Step 2: Remplacer les appels — Hero**

`src/components/home/Hero.tsx`
- demo (2 occurrences, hero-slot / hero-wheel) :
```tsx
// avant
onClick={() => track('demo_click', { cta_location: 'hero-slot' })}
// après
onClick={() => trackEvent('demo_click', { cta_location: 'hero-slot' })}
```
(idem `hero-wheel`)
- signup (lignes ~331-332) :
```tsx
// avant
track('signup_click', { cta_location: 'hero' });
trackMeta('Lead', { content_name: 'signup_hero' });
// après
trackEvent('signup_click', { cta_location: 'hero', content_name: 'signup_hero' });
```

- [ ] **Step 3: Remplacer les appels — PricingTeaser**

`src/components/home/PricingTeaser.tsx` (lignes ~94-96) :
```tsx
// avant
track('pricing_tier_click', { pricing_tier: offer.id });
track('signup_click', { cta_location: `pricing-${offer.id}` });
trackMeta('Lead', { content_name: `signup_pricing_${offer.id}` });
// après
trackEvent('pricing_tier_click', { pricing_tier: offer.id });
trackEvent('signup_click', { cta_location: `pricing-${offer.id}`, content_name: `signup_pricing_${offer.id}` });
```

- [ ] **Step 4: Remplacer les appels — TarifsPlansDetail**

`src/components/tarifs/TarifsPlansDetail.tsx` (lignes ~96-98) :
```tsx
// avant
track('pricing_tier_click', { pricing_tier: offer.id });
track('signup_click', { cta_location: `tarifs-${offer.id}` });
trackMeta('Lead', { content_name: `signup_tarifs_${offer.id}` });
// après
trackEvent('pricing_tier_click', { pricing_tier: offer.id });
trackEvent('signup_click', { cta_location: `tarifs-${offer.id}`, content_name: `signup_tarifs_${offer.id}` });
```

- [ ] **Step 5: Remplacer les appels — ContactForm**

`src/components/ui/ContactForm.tsx` (lignes ~73-76) :
```tsx
// avant
track('contact_form_submitted', { ... });
trackMeta('Lead', { content_name: 'contact_form' });
// après  (conserver le payload existant du 1er appel ; fusionner content_name)
trackEvent('contact_form_submitted', { /* …payload existant… */ content_name: 'contact_form' });
```
> Lire les lignes 73-76 pour reprendre exactement le payload d'origine de `track('contact_form_submitted', {...})`.

- [ ] **Step 6: Remplacer les appels — LeadMagnet**

`src/components/home/LeadMagnet.tsx` (lignes ~34, 52-56) :
```tsx
// submit (~34)
trackEvent('lead_magnet_submitted', { source: 'home_lead_magnet' });
// download (~52-56) : fusionner le payload de track('lead_magnet_download', {...}) + content_name de trackMeta('Lead', {...})
trackEvent('lead_magnet_download', { /* …payload existant… */ });
```
> Lire les lignes 52-56 pour reprendre le payload exact ; supprimer l'appel `trackMeta('Lead', …)` séparé (désormais inclus via le mapping `lead_magnet_download → Lead`).

- [ ] **Step 7: Remplacer les appels — FinalCTA**

`src/components/home/FinalCTA.tsx` (lignes ~63-64, 76) :
```tsx
// avant
track('signup_click', { cta_location: 'final-cta' });
trackMeta('Lead', { content_name: 'signup_final_cta' });
// après
trackEvent('signup_click', { cta_location: 'final-cta', content_name: 'signup_final_cta' });
// ligne 76 (contact)
onClick={() => trackEvent('contact_click', { cta_location: 'final-cta' })}
```

- [ ] **Step 8: Remplacer les appels — FAQ / Sectors / AProposCTA / SectorPageClient / HowItWorks**

```tsx
// FAQ.tsx ~144
onClick={() => trackEvent('contact_click', { cta_location: 'faq' })}

// Sectors.tsx ~267
onClick={() => trackEvent('contact_click', { cta_location: 'sectors' })}

// AProposCTA.tsx ~53
trackEvent('signup_click', { cta_location: 'apropos-cta' });

// SectorPageClient.tsx ~22-23
trackEvent('signup_click', { cta_location: `sector-${sector.slug}`, content_name: `signup_sector_${sector.slug}` });

// HowItWorks.tsx ~175
onClick={() => { trackEvent('signup_click', { cta_location: 'how-it-works' }); openModal(); }}
```

- [ ] **Step 9: Vérifier qu'aucun import mort ne subsiste**

Run:
```bash
cd /Users/mauimanavarere/Desktop/Boumrank/website && grep -rn "trackMeta(" src --include="*.tsx" | grep -v "lib/analytics.ts"
```
Expected: aucune occurrence hors de la définition (toutes basculées vers `trackEvent`). Vérifier aussi que chaque fichier modifié n'importe plus `track`/`trackMeta` s'ils ne servent plus.

- [ ] **Step 10: Build + lint**

Run: `cd /Users/mauimanavarere/Desktop/Boumrank/website && npm run build && npm run lint`
Expected: OK, aucun import inutilisé.

- [ ] **Step 11: Vérification runtime (conversion + TikTok)**

`npm run dev`, accepter les cookies, cliquer un CTA signup : Network montre une requête GA (`signup_click`), Meta (`Lead`) et TikTok (`Contact`). Sans consentement : aucune requête Meta/TikTok.

- [ ] **Step 12: Commit**

```bash
cd /Users/mauimanavarere/Desktop/Boumrank/website
git add src/components
git commit -m "refactor(analytics): conversions via trackEvent (GA4+Meta+TikTok)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 6: Vérifier l'état Vercel + écrire la doc livrable

**Files:**
- Create: `docs/analytics-tracking-plan.md`

- [ ] **Step 1: Vérifier les variables présentes en production**

Tenter via le MCP Vercel (lister les env vars du projet `boumrank-website`, scope Production) pour savoir lesquelles parmi `NEXT_PUBLIC_{GA_ID,GTM_ID,META_PIXEL_ID,TIKTOK_PIXEL_ID,LINKEDIN_PARTNER_ID,CLARITY_ID,METRICOOL_HASH}` sont définies. Si le MCP ne donne pas accès aux env vars, le noter et demander à l'utilisateur de confirmer dans Vercel → Settings → Environment Variables. Consigner le résultat (présent/manquant) à l'étape suivante.

- [ ] **Step 2: Écrire `docs/analytics-tracking-plan.md`**

Contenu (sections) :
1. **Taxonomie & mapping** : copier les tableaux §5 du spec (auto + conversion, GA4/Meta/TikTok).
2. **Variables d'environnement** : tableau `Variable | Rôle | Où récupérer l'ID | Statut prod (présent/manquant)`, avec instruction « Vercel → Project boumrank-website → Settings → Environment Variables → scope Production + Preview, puis redeploy ».
3. **GTM (Google Ads + LinkedIn uniquement)** : créer dans GTM des tags Google Ads Conversion + LinkedIn Insight déclenchés par des triggers « Custom Event » sur `signup_click`, `contact_form_submitted`, `lead_magnet_download`. **Avertissement : ne PAS ajouter de tag GA4 dans GTM** (GA4 est chargé en direct ; double comptage sinon).
4. **Réglage GA4 obligatoire** : Admin → Data Streams → Enhanced measurement → désactiver « Page changes based on browser history events » (les page_views SPA viennent de `JourneyTracking`, sinon doublons).
5. **Marquer les key events / conversions GA4** : `signup_click`, `contact_form_submitted`, `lead_magnet_download` (+ `demo_click` si voulu).
6. **Guide d'analyse parcours** : Explorations GA4 → Funnel (`page_view` → `section_view{pricing}` → `pricing_tier_click` → `signup_click`) + Path exploration depuis `page_view`. Clarity pour heatmaps/replays. Dashboards Meta/TikTok pour le ROAS.

- [ ] **Step 3: Commit**

```bash
cd /Users/mauimanavarere/Desktop/Boumrank/website
git add docs/analytics-tracking-plan.md
git commit -m "docs(analytics): plan de tracking, IDs/Vercel, GTM, guide d'analyse GA4

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 7: Vérification end-to-end + push staging

- [ ] **Step 1: Build + lint final**

Run: `cd /Users/mauimanavarere/Desktop/Boumrank/website && npm run build && npm run lint`
Expected: tout vert.

- [ ] **Step 2: Vérification consentement (critère d'acceptation #6)**

`npm run dev`, profil navigateur neuf (ou localStorage vidé) :
1. Avant choix cookies : onglet Network → AUCUNE requête vers `facebook`, `tiktok`, `clarity`, `linkedin`. `dataLayer` contient `consent default … denied`.
2. Refuser : idem, rien ne charge.
3. Accepter : `gtag consent update granted`, puis Meta/TikTok/Clarity/LinkedIn se chargent ; un CTA signup déclenche GA4 + Meta + TikTok.

- [ ] **Step 3: Vérifier page_view sans doublon (critère #2)**

Toujours en dev : recharger la home (1 seul page_view à l'init via gtag/boot), puis naviguer vers /tarifs (1 seul page_view supplémentaire dans `dataLayer`). Pas de doublon.

- [ ] **Step 4: Push staging**

```bash
cd /Users/mauimanavarere/Desktop/Boumrank/website
git push origin staging
```
Expected: déploiement Vercel sur https://staging.boumrank.com/. Fournir ce lien à l'utilisateur.

- [ ] **Step 5: Récapitulatif à l'utilisateur**

Lister : events posés (auto + conversion), TikTok site-wide actif, fichiers créés/modifiés, état des IDs Vercel (présents/manquants), et les 2 réglages manuels requis (GA4 enhanced-measurement off + GTM Ads/LinkedIn + marquage des conversions), avec le lien vers `docs/analytics-tracking-plan.md`.

---

## Self-Review (effectué)

**Couverture du spec :** §4 (fan-out) → T1 ; §5.1 auto + §6 JourneyTracking → T3 ; §5.2 conversions → T5 ; §7 TikTok → T2 ; §8 consentement → vérifié T7 ; §9 doc/IDs → T6 ; §10 fichiers → couverts T1-T6 ; §12 critères → vérifiés T3/T5/T7. Aucune section orpheline.

**Placeholders :** les rares « payload existant » (T5 ContactForm/LeadMagnet) renvoient à des lignes précises à lire car le payload d'origine n'est pas reproduit ici — instruction exacte (numéro de ligne + action), pas un TODO. Le reste est du code complet.

**Cohérence des types :** `EventKey`, `EVENTS`, `trackEvent(key, payload)`, `track`, `trackMeta`, `trackTikTok` cohérents entre T1, T3, T5. `data-section`/`data-cta` lus de la même façon dans JourneyTracking (T3) et posés en T4.
