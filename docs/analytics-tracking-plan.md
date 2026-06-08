# Plan de tracking & guide d'analyse du parcours utilisateur

Site vitrine **boumrank.com** (`website/`). Ce document décrit tous les événements posés, les plateformes destinataires, les identifiants à configurer, et comment réaliser des analyses complètes du parcours.

> La landing publicitaire `/campagne` a son propre tracking isolé (Meta + TikTok + GA4) et n'est PAS concernée par ce document.

---

## 1. Architecture (rappel)

Modèle **hybride**, tout sous Consent Mode v2 (rien ne se charge avant consentement) :

- **Le code** (`src/lib/events.ts` → `trackEvent()`) diffuse chaque événement vers **GA4 + Meta Pixel + TikTok Pixel**, et pousse aussi le `dataLayer`.
- **GTM** sert uniquement aux **conversions Google Ads + LinkedIn**, déclenchées sur les événements du `dataLayer`.
- **Règle d'or anti-double-comptage : ne jamais ajouter de tag GA4 dans GTM.** GA4 est chargé en direct par le code.

Source de vérité du routage : la table `EVENTS` dans `src/lib/events.ts`. Pour ajouter/retirer une plateforme sur un événement, modifier cette table (et ce document).

---

## 2. Taxonomie des événements

### 2.1 Événements automatiques (composant `JourneyTracking`, GA4 + dataLayer)

| Événement GA4 | Déclencheur | Paramètres |
|---|---|---|
| `page_view` | chaque navigation SPA (hors 1er chargement, déjà compté au boot) | `page_location`, `page_path`, `page_title`, `locale` (+ Meta `PageView`, TikTok `page`) |
| `scroll_depth` | seuils 25 / 50 / 75 / 90 % (réarmés à chaque page) | `percent_scrolled` |
| `section_view` | section `[data-section]` visible à 40 % (1×/section/page) | `section_id` |
| `cta_click` | clic sur un `[data-cta]` | `cta_id`, `cta_location` |
| `outbound_click` | clic vers un domaine externe (app., cal.com…) | `link_url`, `link_domain` |
| `file_download` | clic vers un fichier (.pdf, .zip, .csv, .xlsx, .docx, .pptx) | `file_name` |
| `form_start` | 1er focus dans un `<form>` (1×/formulaire/page) | `form_id` |

`section_id` actuellement posés : `hero`, `how_it_works`, `pricing`, `faq`, `sectors`, `final_cta`, `lead_magnet` (home) et `tarifs_plans` (page tarifs). `cta_id` Navbar : `signup`, `login` (location `navbar`).

### 2.2 Événements de conversion (explicites, via `trackEvent`)

| Événement GA4 | Meta | TikTok | Sens | Où |
|---|---|---|---|---|
| `signup_click` | `Lead` | `Contact` | clic vers inscription | hero, pricing, tarifs, final-cta, how-it-works, a-propos, secteurs |
| `demo_click` | `ViewContent` | `ViewContent` | ouverture démo | hero |
| `pricing_tier_click` | `ViewContent` | `ViewContent` | clic sur un plan | pricing teaser, page tarifs |
| `contact_form_submitted` | `Lead` | `SubmitForm` | formulaire contact envoyé | page contact |
| `contact_click` | `Contact` | `Contact` | clic vers contact | faq, sectors, final-cta |
| `lead_magnet_submitted` | — | `SubmitForm` | formulaire lead magnet | home |
| `lead_magnet_download` | `Lead` | `Download` | téléchargement ressource | home |

Payloads utiles transmis : `cta_location`, `content_name`, `pricing_tier`, `content_category`, etc. (visibles dans GA4 comme paramètres d'événement).

---

## 3. Variables d'environnement (état réel en production)

Vérifié le 2026-06-09 via `vercel env ls production` (projet `boumrank-website`).

| Variable | Rôle | Présente en prod ? |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (`G-XXXX…`) | ✅ Oui |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager (`GTM-XXXX`) | ✅ Oui |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta/Facebook Pixel | ✅ Oui |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity (heatmaps/replays) | ✅ Oui |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | LinkedIn Insight Tag | ✅ Oui |
| `NEXT_PUBLIC_METRICOOL_HASH` | Metricool | ✅ Oui |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | TikTok Pixel (site entier) | ❌ **MANQUANTE** |

### Action requise : ajouter le pixel TikTok

Le code TikTok site-wide est en place mais **inerte tant que la variable n'existe pas en production**. Pour l'activer :

1. Récupérer l'ID dans TikTok Ads Manager → Outils → Événements → Pixel web (format type `D8J9QEJC77UDLID6AKI0`, l'ID déjà utilisé sur `/campagne`).
2. L'ajouter dans **Vercel → Projet `boumrank-website` → Settings → Environment Variables** :
   - Name : `NEXT_PUBLIC_TIKTOK_PIXEL_ID`
   - Value : l'ID du pixel
   - Environments : **Production** (et Preview si tu veux tester en preview)
3. **Redéployer** (un nouveau déploiement est nécessaire pour qu'une variable `NEXT_PUBLIC_*` soit intégrée au build).

> Astuce CLI : `vercel env add NEXT_PUBLIC_TIKTOK_PIXEL_ID production` puis `vercel --prod`.

---

## 4. Réglages obligatoires côté plateformes

### 4.1 GA4 — éviter le double comptage des pages (IMPORTANT)

Les `page_view` des navigations internes (SPA) sont émis par le code (`JourneyTracking`). Pour ne pas les compter deux fois :

- GA4 → **Admin → Flux de données → (le flux web) → Mesure améliorée → roue crantée → désactiver « Modifications de page basées sur les événements de l'historique du navigateur »**.

Le `page_view` du 1er chargement reste géré par le tag GA4 standard ; le code ne réémet qu'à partir de la 2ᵉ page.

### 4.2 GA4 — marquer les conversions (key events)

GA4 → **Admin → Événements clés** → marquer comme clés :
- `signup_click` (intention d'inscription, le signal n°1)
- `contact_form_submitted`
- `lead_magnet_download`
- (optionnel) `demo_click`, `pricing_tier_click`

Ces événements remontent automatiquement après ~24 h une fois reçus ; on peut aussi les créer manuellement par nom.

### 4.3 GTM — Google Ads + LinkedIn uniquement

Dans GTM (conteneur `GTM-…`) :
1. Déclencheurs « Événement personnalisé » sur `signup_click`, `contact_form_submitted`, `lead_magnet_download` (noms exacts du `dataLayer`).
2. Tags : **Google Ads Conversion** (avec l'ID + libellé de conversion fournis par Google Ads) et **LinkedIn Insight / conversion** rattachés à ces déclencheurs.
3. **NE PAS** ajouter de tag « Google Analytics : GA4 Configuration/Event » dans GTM → GA4 est déjà chargé en direct, un tag GTM doublerait tout.

---

## 5. Comment analyser le parcours (GA4)

### 5.1 Entonnoir (Funnel exploration)
GA4 → **Explorer → Exploration en entonnoir**, étapes suggérées :
1. `page_view`
2. `section_view` avec `section_id = pricing`
3. `pricing_tier_click`
4. `signup_click`

On voit où les visiteurs décrochent entre « voir les prix » et « cliquer pour s'inscrire ».

### 5.2 Chemin (Path exploration)
GA4 → **Explorer → Exploration de chemin**, point de départ `page_view` → visualise les enchaînements de pages et d'événements réels.

### 5.3 Engagement par page
Segmenter `scroll_depth` et `section_view` par `page_path` pour voir quelles sections sont réellement vues et jusqu'où les gens lisent.

### 5.4 Heatmaps / replays
Microsoft Clarity (déjà actif après consentement « analytics ») : cartes de chaleur, enregistrements de sessions, détection de rage-clicks. Complément qualitatif au quantitatif GA4.

### 5.5 Côté régies
- **Meta Events Manager** : vérifier la réception de `PageView`, `ViewContent`, `Lead`, `Contact`, `SubmitForm` (Test Events pour le live).
- **TikTok Events Manager** : vérifier `page`, `ViewContent`, `Contact`, `SubmitForm`, `Download` (une fois la variable ajoutée).

---

## 6. Pour aller plus loin (hors périmètre actuel)

- **Conversions serveur** (Meta CAPI / TikTok Events API) : capter aussi les visiteurs qui refusent les cookies. À envisager si le taux de refus est élevé.
- **Webapp `app.boumrank.com`** : étendre le même modèle d'événements au produit (signup réel, parties de jeu, dashboard) pour un parcours bout-en-bout.
