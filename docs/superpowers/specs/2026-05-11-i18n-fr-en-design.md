# Spec: Internationalization FR/EN for boumrank-next

**Date:** 2026-05-11
**Owner:** Maui
**Status:** Approved, ready to implement

## Goal

Ship a bilingual French/English version of boumrank.com. French is the default and primary language; English is fully supported with creative, idiomatic adaptation (not literal translation) that preserves BoumRank's playful, punchy brand voice.

## Scope

- All static marketing pages, navbar, footer, UI components, FAQ data, SEO metadata, OG, schema.org, sitemap, llms.txt, contact emails.
- Blog: infrastructure wired for a second Notion database (EN). If the EN database is empty, `/en/blog` renders a "Coming soon" state.
- `/interne/*` routes stay French-only (internal benchmark page).

Out of scope:
- Auto-translating Notion blog articles via LLM.
- Adding more languages (architecture leaves room, but only FR + EN ship).
- Translating `phone-mockup/` (separate side project).

## Stack

- **Library:** `next-intl` v3 (Server Components compatible, App Router native).
- **Routing:** `src/app/[locale]/...` with locale-prefix `"as-needed"` (FR no prefix, EN under `/en`).
- **Detection:** Cookie `NEXT_LOCALE` first, fallback `Accept-Language`, final fallback `fr`.
- **Slugs:** Translated pathnames via `next-intl`'s `pathnames` config.

## Pathname mapping

| French (default, no prefix) | English (`/en` prefix) |
| --- | --- |
| `/` | `/en` |
| `/tarifs` | `/en/pricing` |
| `/a-propos` | `/en/about` |
| `/comment-ca-marche` | `/en/how-it-works` |
| `/fonctionnalites` | `/en/features` |
| `/contact` | `/en/contact` |
| `/blog`, `/blog/[slug]` | `/en/blog`, `/en/blog/[slug]` |
| `/experience` | `/en/experience` |
| `/technologie` | `/en/technology` |
| `/mentions-legales` | `/en/legal-notice` |
| `/politique-de-confidentialite` | `/en/privacy-policy` |
| `/conditions-generales` | `/en/terms` |
| `/llms.txt` | `/en/llms.txt` |
| `/interne/*` | FR only (no EN equivalent) |

## File layout

```
boumrank-next/
├── messages/
│   ├── fr.json
│   └── en.json
├── src/
│   ├── i18n/
│   │   ├── routing.ts      # locales + pathnames map
│   │   ├── navigation.ts   # Link, useRouter, redirect wrapped
│   │   └── request.ts      # getRequestConfig for server components
│   ├── middleware.ts       # next-intl middleware
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx          # NextIntlClientProvider wrapper, fonts, dark mode, analytics
│   │   │   ├── page.tsx            # home
│   │   │   ├── tarifs/page.tsx
│   │   │   ├── a-propos/page.tsx
│   │   │   ├── comment-ca-marche/page.tsx
│   │   │   ├── fonctionnalites/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── blog/page.tsx
│   │   │   ├── blog/[slug]/page.tsx
│   │   │   ├── experience/page.tsx
│   │   │   ├── technologie/page.tsx
│   │   │   ├── mentions-legales/page.tsx
│   │   │   ├── politique-de-confidentialite/page.tsx
│   │   │   ├── conditions-generales/page.tsx
│   │   │   ├── llms.txt/route.ts
│   │   │   ├── sitemap.ts
│   │   │   ├── robots.ts
│   │   │   ├── loading.tsx
│   │   │   └── not-found.tsx
│   │   ├── interne/
│   │   │   └── benchmark/page.tsx   # FR only, untouched
│   │   ├── api/contact/route.ts     # locale-aware emails
│   │   └── layout.tsx               # html/body root, locale unaware
│   ├── components/
│   │   ├── ui/LanguageToggle.tsx    # NEW — pills FR | EN
│   │   ├── layout/Navbar.tsx        # MODIFIED — toggle + useTranslations
│   │   ├── layout/Footer.tsx        # MODIFIED
│   │   ├── layout/Breadcrumbs.tsx   # MODIFIED
│   │   ├── home/*.tsx               # ALL — useTranslations
│   │   ├── seo/*.tsx                # MODIFIED — locale-aware schema
│   │   └── ui/ContactForm.tsx       # MODIFIED — sends locale to /api/contact
│   └── lib/
│       ├── notion.ts                # MODIFIED — accepts locale param
│       ├── emails/contact-fr.ts     # NEW
│       ├── emails/contact-en.ts     # NEW
│       └── constants.ts             # adds NOTION_BLOG_DATABASE_ID_EN reference
├── next.config.ts                   # adds createNextIntlPlugin
└── .env.template                    # adds NOTION_BLOG_DATABASE_ID_EN
```

## Translation file structure (messages/{fr,en}.json)

Namespaces:
- `common` — CTAs, generic labels (back, next, close, learn more), navbar links, footer links, social, legal labels.
- `home.hero`, `home.problem`, `home.solution`, `home.features`, `home.howItWorks`, `home.pricing`, `home.roi`, `home.faq`, `home.cta`, `home.gameShowcase`, `home.sectors`, `home.competitiveAdvantages`, `home.differentiators`, `home.activate`, `home.vision`, `home.aiValidation`, `home.actionShowcase`, `home.performanceTracking`, `home.gameScenario`, `home.leadMagnet`, `home.finalCta`.
- `pricing`, `about`, `howItWorks`, `features`, `contact`, `experience`, `technology`, `blog`, `legalNotice`, `privacyPolicy`, `terms`.
- `seo` — per-route `title`/`description`/`ogTitle`/`ogDescription`.
- `emails.contact` — subject, greeting, body, signature, internal notification.
- `errors`, `cookieBanner`, `onboarding`, `darkMode`.

ICU MessageFormat for plurals and interpolation (e.g. `"{count, plural, one {# avis} other {# avis}}"`).

## Translation voice

US English, punchy, brand-aligned. Goals:
- Preserve playful casino/game energy ("Boom", "Spin", "Win").
- Action-oriented CTAs ("Get started", "See it live", "Claim your free trial").
- No em dashes (`—`) anywhere — per project rule, use commas/periods/colons.
- Keep numbers, prices, and email addresses identical to FR.

Examples:
- "Boum, c'est gagné !" → "Boom, you nailed it!"
- "Transformez vos clients en super-fans" → "Turn customers into superfans"
- "Le QR code qui rapporte" → "The QR code that pays off"
- "Essentiel / Performance / Sur mesure" → "Essential / Performance / Custom"
- "Sans engagement, sans frais cachés" → "No commitment, no hidden fees"

## Language toggle component

`src/components/ui/LanguageToggle.tsx`:
- Two adjacent pills: `🇫🇷 FR` and `🇬🇧 EN`.
- Active pill uses brand gradient background + white text; inactive uses ghost style with hover.
- `onClick` switches locale via `useRouter` from `@/i18n/navigation`, which preserves the current pathname (mapping handled by next-intl).
- Sets `NEXT_LOCALE` cookie (1 year, `SameSite=Lax`, path=`/`).
- Sizes: compact in desktop navbar (h-8), full-width in mobile hamburger menu.
- Visible on every page.

## Notion bilingual blog

`src/lib/notion.ts`:
- `getBlogPosts({ locale })` and `getBlogPostBySlug(slug, { locale })`.
- Reads `NOTION_BLOG_DATABASE_ID` (FR) or `NOTION_BLOG_DATABASE_ID_EN` (EN) from env.
- If EN var is missing or returns zero posts, `/en/blog` renders a centered "Coming soon" state with CTA "Read in French" linking to `/blog`.
- Cache: keep existing `revalidate = 3600` per page.

`.env.template` adds:
```
NOTION_BLOG_DATABASE_ID_EN=
```

## SEO

- `generateMetadata({ params: { locale } })` per route reads `seo` namespace via `getTranslations`.
- `alternates.languages` populated with `fr` and `en` URLs for every page.
- `metadata.openGraph.locale` set per locale (`fr_FR` / `en_US`).
- `src/app/[locale]/sitemap.ts` emits both FR and EN URLs with `alternates.languages`.
- `robots.ts` unchanged.
- `src/app/[locale]/llms.txt/route.ts` outputs locale-specific content.
- Schema.org JSON-LD: `Organization`, `LocalBusiness`, `FAQPage`, `BreadcrumbList` regenerated per locale, with `inLanguage` field.

## Emails

`src/app/api/contact/route.ts`:
- Accepts a `locale` field in the JSON body (sent by `ContactForm`, defaults to `fr`).
- Picks the email template from `src/lib/emails/contact-{fr,en}.ts`.
- Sends visitor confirmation and internal notification in the chosen language.

`ContactForm.tsx`:
- Uses `useLocale()` to read current locale and includes it in the POST body.
- All visible text via `useTranslations('contact')`.

## Middleware

`src/middleware.ts`:
```ts
import createMiddleware from 'next-intl/middleware';
import {routing} from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

Excludes `/api`, `/_next`, static files. `/interne/*` matched and passed through with `fr` locale.

## Build & deploy

- Add `createNextIntlPlugin('./src/i18n/request.ts')` wrapping `next.config.ts`.
- `npm run build` must pass without warnings.
- `npm run lint` clean.
- Push to `staging` branch automatically on completion.
- Verify on `https://staging.boumrank.com/` (FR) and `https://staging.boumrank.com/en` (EN).

## Acceptance criteria

1. Visiting `https://staging.boumrank.com/` shows full French site (current behavior preserved).
2. Visiting `https://staging.boumrank.com/en` shows full English version with translated routes.
3. Clicking the EN toggle on `/tarifs` lands on `/en/pricing` with the same content translated.
4. Cookie `NEXT_LOCALE=en` persists across page loads.
5. `/en/blog` either shows English articles (if Notion EN DB populated) or a "Coming soon" state — never crashes.
6. Contact form submitted from `/en/contact` sends English confirmation email.
7. `<html lang="">` attribute is `fr` on FR pages, `en` on EN pages.
8. Sitemap includes both FR and EN URLs with hreflang alternates.
9. Schema.org `inLanguage` matches the page locale.
10. No em dashes (`—`) in EN copy.
11. No raw hardcoded user-facing strings remain in components (all via `useTranslations`).

## Non-goals (explicitly)

- We do NOT auto-translate Notion blog articles. The EN database stays empty until Maui populates it.
- We do NOT add a third language now.
- We do NOT modify `/interne/*` pages.
- We do NOT change the visual design system or brand palette.
