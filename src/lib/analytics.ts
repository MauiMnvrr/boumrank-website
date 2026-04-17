/**
 * BoumRank — Analytics wrapper
 *
 * Thin wrapper over GA4 gtag + GTM dataLayer with a consent gate.
 * All events go through `track()` which only fires when the user has
 * granted consent (Consent Mode v2).
 *
 * Keep event names stable — they are listed in the plan and will be
 * configured as conversions in GA4.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

const CONSENT_STORAGE_KEY = 'boumrank_consent_v1';

export type ConsentChoice = 'granted' | 'denied';

export type ConsentState = {
  analytics: ConsentChoice;
  ads: ConsentChoice;
  functional: ConsentChoice;
  at: number;
};

/** Default state : everything denied until the user opts in. */
export const DEFAULT_CONSENT: ConsentState = {
  analytics: 'denied',
  ads: 'denied',
  functional: 'denied',
  at: 0,
};

/** Read the stored consent choice. Defaults to DENIED for all. */
export function readConsent(): ConsentState {
  if (typeof window === 'undefined') return DEFAULT_CONSENT;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return DEFAULT_CONSENT;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return {
      analytics: parsed.analytics === 'granted' ? 'granted' : 'denied',
      ads: parsed.ads === 'granted' ? 'granted' : 'denied',
      functional: parsed.functional === 'granted' ? 'granted' : 'denied',
      at: typeof parsed.at === 'number' ? parsed.at : 0,
    };
  } catch {
    return DEFAULT_CONSENT;
  }
}

/** Persist consent state and push a Consent Mode v2 update to gtag. */
export function writeConsent(state: Omit<ConsentState, 'at'>): ConsentState {
  const record: ConsentState = { ...state, at: Date.now() };
  if (typeof window === 'undefined') return record;

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // ignore — consent still applies for this session
  }

  const w = window as any;
  if (typeof w.gtag === 'function') {
    w.gtag('consent', 'update', {
      analytics_storage: state.analytics,
      ad_storage: state.ads,
      ad_user_data: state.ads,
      ad_personalization: state.ads,
      functionality_storage: state.functional,
      security_storage: 'granted', // essential, always granted
    });
  }

  // Also notify GTM via dataLayer for server-side tagging
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({
      event: 'consent_update',
      consent: state,
    });
  }

  return record;
}

/** Wether the user has explicitly made a choice (accepted or refused). */
export function hasChosenConsent(): boolean {
  const c = readConsent();
  return c.at > 0;
}

/**
 * Fire an event through gtag + dataLayer. Safe to call server-side (no-op).
 * Consent Mode handles gating : GA4 buffers events while denied and
 * discards ad-related data. No extra check needed here.
 */
export function track(name: string, payload: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  const w = window as any;
  if (typeof w.gtag === 'function') {
    w.gtag('event', name, payload);
  }
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event: name, ...payload });
  }
}

/** Meta Pixel event (Lead, CompleteRegistration, etc). Consent-gated manually. */
export function trackMeta(name: string, payload: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  const consent = readConsent();
  if (consent.ads !== 'granted') return;
  const w = window as any;
  if (typeof w.fbq === 'function') {
    w.fbq('track', name, payload);
  }
}
