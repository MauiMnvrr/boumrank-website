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
