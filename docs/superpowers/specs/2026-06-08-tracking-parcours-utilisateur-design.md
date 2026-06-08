# Spec — Tracking « parcours utilisateur complet » (site vitrine)

- **Date :** 2026-06-08
- **Projet :** `website/` (boumrank.com, Next.js 16 App Router)
- **Objectif :** instrumenter l'ensemble du site vitrine pour permettre des analyses complètes et détaillées du parcours utilisateur, en diffusant des événements normalisés vers GA4, Meta Pixel, TikTok Pixel et Google Ads/LinkedIn (via GTM).

## 1. Contexte et objectif

Le site vitrine convertit des commerçants locaux (parcours : pub → landing/home → exploration → CTA inscription/démo/contact → app.boumrank.com). On veut pouvoir reconstituer ce parcours dans GA4 (funnels, path exploration), Meta, TikTok et les régies pub, sans casser l'existant ni la conformité RGPD.

L'utilisateur a délégué le choix du « pertinent » ; les décisions ci-dessous tranchent.

## 2. État existant (déjà câblé)

- **Consent Mode v2** : `public/consent-boot.js` (chargé `beforeInteractive`), défaut tout `denied`, rejoue le choix stocké (`localStorage boumrank_consent_v1`).
- **Couche événements** : `src/lib/analytics.ts` → `track()` (gtag `event` + `dataLayer.push`), `trackMeta()` (gated `ads`), `readConsent()`/`writeConsent()`/`hasChosenConsent()`.
- **Scripts** : `src/components/analytics/AnalyticsScripts.tsx` câble Vercel Analytics + Speed Insights, GTM + GA4 (`@next/third-parties`), Meta Pixel (`public/meta-pixel-boot.js`, gated ads), Clarity + Metricool (gated analytics), LinkedIn Insight (gated ads).
- **Bannière** : `CookieBanner` appelle `writeConsent` (émet `boumrank-consent-update`).
- **Events déjà émis** : `signup_click`, `demo_click`, `pricing_tier_click`, `contact_form_submitted`, `contact_click`, `lead_magnet_submitted`, `lead_magnet_download`, + Meta `Lead` ponctuels. Composant générique `TrackedLink`.
- **Variables référencées** : `NEXT_PUBLIC_{GTM_ID,GA_ID,META_PIXEL_ID,TIKTOK_PIXEL_ID,LINKEDIN_PARTNER_ID,CLARITY_ID,METRICOOL_HASH,CHATBASE_BOT_ID}` (toutes présentes dans `.env.example`).
- **TikTok** : variable présente mais pixel câblé uniquement sur la landing isolée `/campagne` (route standalone, hors `[locale]`). Le `/campagne` reste **inchangé**.

## 3. Décisions

- **Périmètre :** site vitrine uniquement (`website/`). La webapp est hors périmètre (lot futur).
- **Profondeur :** parcours complet (pageviews SPA, scroll depth, section views, CTA/outbound, form-start, taxonomie normalisée).
- **Plateformes :** GA4 + Meta Pixel + TikTok (site-wide) + Google Ads/LinkedIn (via GTM).
- **Architecture :** C — hybride. Le code diffuse GA4 + Meta + TikTok directement et pousse le `dataLayer` ; GTM ne sert qu'aux conversions Google Ads + LinkedIn.

## 4. Architecture de fan-out

Source de vérité : une **table de correspondance** `src/lib/events.ts`.

```ts
// Forme cible (illustrative)
export type EventKey = 'signup_click' | 'demo_click' | 'pricing_tier_click'
  | 'contact_form_submitted' | 'contact_click' | 'lead_magnet_submitted'
  | 'lead_magnet_download' | 'page_view' | 'scroll_depth' | 'section_view'
  | 'cta_click' | 'outbound_click' | 'form_start' | 'file_download';

interface EventMap { ga: string; meta?: string; tiktok?: string; }
export const EVENTS: Record<EventKey, EventMap> = { /* … cf. §5 */ };

export function trackEvent(key: EventKey, payload?: Record<string, unknown>): void {
  const m = EVENTS[key];
  track(m.ga, payload);                       // GA4 (gtag) + dataLayer  (Consent Mode gère le gating)
  if (m.meta) trackMeta(m.meta, payload);     // gated ads
  if (m.tiktok) trackTikTok(m.tiktok, payload); // gated ads
}
```

- `track()` (GA4 + dataLayer) reste pour les events purement analytiques.
- `trackEvent()` est l'API de haut niveau pour les events à diffuser multi-plateformes.
- **Règle anti-double-comptage :** GA4 est chargé en direct (gtag) par le code. **Aucun tag GA4 ne doit être configuré dans GTM.** GTM = uniquement Google Ads + LinkedIn, déclenchés sur les events `dataLayer` (`signup_click`, `contact_form_submitted`, `lead_magnet_download`, etc.).

## 5. Taxonomie des événements

### 5.1 Couche automatique (émise par `<JourneyTracking/>`, GA4 + dataLayer ; `page_view` diffuse aussi Meta/TiktTok)

| Event | Déclencheur | Paramètres |
|---|---|---|
| `page_view` | navigation SPA (pathname + search change) | `page_path`, `page_title`, `locale` ; + Meta `PageView`, TikTok `page` |
| `scroll_depth` | franchissement 25 / 50 / 75 / 90 % | `percent_scrolled` |
| `section_view` | IntersectionObserver sur `[data-section]` (1×/section/page) | `section_id` |
| `cta_click` | clic délégué sur `[data-cta]` | `cta_id`, `cta_location` |
| `outbound_click` | clic sur `a[href]` vers domaine externe | `link_url`, `link_domain` |
| `form_start` | 1er focus dans un `<form>` (1×/form) | `form_id` |
| `file_download` | clic lien `.pdf`/ressource | `file_name` |

### 5.2 Couche conversion (events explicites existants, passés par `trackEvent`)

| EventKey (GA4) | Meta | TikTok | Sens |
|---|---|---|---|
| `signup_click` | `Lead` | `Contact` | clic vers inscription |
| `demo_click` | `ViewContent` | `ViewContent` | ouverture démo |
| `pricing_tier_click` | `ViewContent` | `ViewContent` | clic sur un plan |
| `contact_form_submitted` | `Lead` | `SubmitForm` | soumission formulaire contact |
| `contact_click` | `Contact` | `Contact` | clic vers contact |
| `lead_magnet_submitted` | — | `SubmitForm` | soumission lead magnet |
| `lead_magnet_download` | `Lead` | `Download` | téléchargement ressource |

Les **noms GA4 existants sont conservés** pour ne pas casser les rapports/conversions déjà configurés ; on ajoute seulement la diffusion Meta/TikTok et la cohérence des paramètres.

## 6. Couche automatique — `<JourneyTracking/>`

- Composant client monté une fois dans `src/app/[locale]/layout.tsx` (dans `<body>`, à côté de `<AnalyticsScripts/>`).
- `page_view` : `usePathname()` + `useSearchParams()` → émet à chaque changement (le 1er chargement reste géré par GA4/Meta/TikTok à l'init pour éviter un double comptage du 1er hit ; voir critères d'acceptation).
- `scroll_depth` : listener `scroll` *passif*, throttlé (rAF), seuils émis une seule fois.
- `section_view` : un seul `IntersectionObserver` (threshold ~0.4) observant les `[data-section]`, `unobserve` après 1er passage.
- `cta_click` / `outbound_click` / `file_download` : **un** listener `click` délégué sur `document` (capture `closest('a')` / `closest('[data-cta]')`).
- `form_start` : un listener `focusin` délégué, mémorise les `form_id` déjà émis.
- Tout passe par `track()` / `trackEvent()` → donc gated par Consent Mode / `readConsent`.

`data-section` à poser sur les sections clés de la home et des pages : `hero`, `how_it_works`, `pricing`, `faq`, `sectors`, `final_cta`, `lead_magnet` (home) + sections équivalentes sur `tarifs`, `fonctionnalites`, `experience`, `secteurs`, `a-propos`, `technologie`, `contact`, `blog`. `data-cta` + `data-cta-location` à généraliser sur les CTA principaux (le Hero en a déjà).

## 7. TikTok site-wide

- Nouveau `public/tiktok-pixel-boot.js` : calqué sur `meta-pixel-boot.js`, lit `data-pixel-id`, ne s'initialise que si `boumrank_consent_v1.ads === 'granted'`, sinon inerte. Snippet officiel `ttq` + `ttq.load(id)` + `ttq.page()`.
- `AnalyticsScripts.tsx` : ajoute le `<Script src="/tiktok-pixel-boot.js" data-pixel-id={tiktokId}>` si `NEXT_PUBLIC_TIKTOK_PIXEL_ID` présent.
- `lib/analytics.ts` : `trackTikTok(name, payload)` gated `ads` (no-op si `ttq` absent).
- `/campagne` conserve son `tracking.ts` autonome (aucun partage de code requis ; éviter les régressions).

## 8. Consentement / RGPD

Modèle inchangé. Défaut `denied`. GA4 via Consent Mode (bufferise/écarte selon état). Meta + TikTok + LinkedIn gated explicitement par `ads`. Clarity/Metricool gated par `analytics`. Les nouveaux events n'introduisent aucun stockage avant consentement.

## 9. Vérification + doc des IDs (livrable)

Document `website/docs/analytics-tracking-plan.md` :
1. Taxonomie + mapping (copie de §5) — référence pour configurer GA4.
2. Tableau de chaque variable `NEXT_PUBLIC_*` : rôle, où récupérer l'ID, où la coller dans Vercel (Project → Settings → Environment Variables, scope Production/Preview).
3. Guide GTM : créer les tags de conversion Google Ads + LinkedIn déclenchés sur les events `dataLayer` ; **ne pas** ajouter de tag GA4.
4. Mini-guide d'analyse GA4 : marquer les key events (`signup_click`, `contact_form_submitted`, `lead_magnet_download`), construire un funnel exploration (page_view → section_view pricing → pricing_tier_click → signup_click) et une path exploration.
5. Résultat de la vérification de l'état réel des variables en production (via Vercel) : présent / manquant, et action requise.

## 10. Fichiers touchés

**Nouveaux**
- `src/lib/events.ts` — table de correspondance + `trackEvent()`.
- `src/components/analytics/JourneyTracking.tsx` — instrumentation automatique.
- `public/tiktok-pixel-boot.js` — loader TikTok consent-gated.
- `website/docs/analytics-tracking-plan.md` — doc taxonomie + IDs + GTM + analyse.

**Modifiés**
- `src/lib/analytics.ts` — `trackTikTok()` ; pas de breaking change sur `track()/trackMeta()`.
- `src/components/analytics/AnalyticsScripts.tsx` — branchement TikTok.
- `src/app/[locale]/layout.tsx` — montage `<JourneyTracking/>`.
- Composants de sections (home + pages) — ajout `data-section`, généralisation `data-cta`/`data-cta-location`.
- Composants émetteurs de conversions (`Hero`, `PricingTeaser`, `TarifsPlansDetail`, `ContactForm`, `LeadMagnet`, `FinalCTA`, `FAQ`, `Sectors`, `AProposCTA`, `SectorPageClient`, `HowItWorks`) — bascule `track()/trackMeta()` → `trackEvent()` pour ajouter TikTok et homogénéiser.

## 11. Hors périmètre (YAGNI)

- Tracking serveur (Meta CAPI / TikTok Events API) — lot futur pour capter les refus cookies.
- Session replay supplémentaire (Clarity couvre déjà).
- Webapp `app.boumrank.com` — lot futur.
- Construction de tableaux de bord GA4 (nécessite accès compte) — on fournit le guide, pas les dashboards.

## 12. Critères d'acceptation

1. `npm run build` et `npm run lint` passent.
2. Sur navigation interne (home → tarifs), un `page_view` est émis pour la nouvelle page (vérifiable dans `dataLayer`/GA DebugView), **sans** double comptage du 1er hit.
3. Le scroll d'une page longue émet `scroll_depth` à 25/50/75/90 une seule fois chacun.
4. Le scroll dans la zone pricing émet `section_view {section_id:'pricing'}` une fois.
5. Un clic sur un CTA `signup` émet `signup_click` (GA4) + `Lead` (Meta) + `Contact` (TikTok) **uniquement après consentement ads**.
6. Avant consentement : aucune requête réseau Meta/TikTok/LinkedIn ; GA4 bufferisé par Consent Mode.
7. TikTok est actif sur les pages du site (pas seulement `/campagne`).
8. La doc `analytics-tracking-plan.md` liste l'état réel des variables Vercel et ce qui manque.

## 13. Risques et mitigations

- **Double `page_view`** (init GA + JourneyTracking) → ne déclencher le `page_view` manuel qu'à partir de la 2ᵉ navigation, ou désactiver l'auto-pageview de `@next/third-parties` et tout piloter manuellement. Décision d'implémentation à valider au plan.
- **Double comptage Meta/TikTok** si quelqu'un ajoute aussi ces tags dans GTM → documenté : GTM = Ads/LinkedIn uniquement.
- **`useSearchParams()` et Suspense** (App Router) → encapsuler `<JourneyTracking/>` dans `<Suspense>` si nécessaire pour éviter le bail-out de rendu statique.
- **Perf** : un seul listener délégué + un seul observer, scroll throttlé en rAF → impact négligeable.
