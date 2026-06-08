/**
 * Tracking dédié à la landing /campagne.
 *
 * Particularité : sur une landing single-page, le pixel doit s'initialiser
 * AU MOMENT où le consentement est accordé (pas seulement au chargement comme
 * le fait /meta-pixel-boot.js qui reste inerte si refusé). On gère donc
 * l'init dynamique de Meta + TikTok ici, en réutilisant le stockage de
 * consentement partagé (lib/analytics).
 *
 * IDs lus depuis les variables d'env publiques (no-op si absentes) :
 *   NEXT_PUBLIC_META_PIXEL_ID
 *   NEXT_PUBLIC_TIKTOK_PIXEL_ID
 *   NEXT_PUBLIC_GA_ID  (GA4, câblé dans CampagneTracking)
 */
/* eslint-disable @typescript-eslint/no-explicit-any, prefer-rest-params, prefer-spread, @typescript-eslint/no-unused-expressions */
/* Les snippets fbq (Meta) et ttq (TikTok) sont les bootstraps officiels des
   fournisseurs : on les garde verbatim (idiomes `arguments`/`.apply`). */

import { track, readConsent } from '@/lib/analytics';

let gaInited = false;
let metaInited = false;
let tiktokInited = false;

/** GA4 (gtag.js) : chargé seulement après consentement. */
export function initGA(gaId?: string): void {
  if (gaInited || !gaId || typeof window === 'undefined') return;
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  function gtag() {
    w.dataLayer.push(arguments);
  }
  w.gtag = w.gtag || gtag;
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
  document.head.appendChild(s);
  w.gtag('js', new Date());
  w.gtag('config', gaId, { anonymize_ip: true });
  gaInited = true;
}

/** Meta Pixel : bootstrap fbq + init + PageView. */
export function initMetaPixel(pixelId?: string): void {
  if (metaInited || !pixelId || typeof window === 'undefined') return;
  const w = window as any;
  /* Snippet officiel Meta (https://developers.facebook.com/docs/meta-pixel) */
  (function (f: any, b: any, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    const t = b.createElement(e);
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(w, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  w.fbq('init', pixelId);
  w.fbq('track', 'PageView');
  metaInited = true;
}

/** TikTok Pixel : bootstrap ttq + load + page view. */
export function initTikTokPixel(pixelId?: string): void {
  if (tiktokInited || !pixelId || typeof window === 'undefined') return;
  const w = window as any;
  /* Snippet officiel TikTok Pixel */
  (function (win: any, doc: any, t: string) {
    win.TiktokAnalyticsObject = t;
    const ttq: any = (win[t] = win[t] || []);
    ttq.methods = [
      'page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once',
      'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'holdConsent',
      'revokeConsent', 'grantConsent',
    ];
    ttq.setAndDefer = function (obj: any, method: string) {
      obj[method] = function () {
        obj.push([method].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    for (let i = 0; i < ttq.methods.length; i++)
      ttq.setAndDefer(ttq, ttq.methods[i]);
    ttq.instance = function (id: string) {
      const inst = (ttq._i && ttq._i[id]) || [];
      for (let n = 0; n < ttq.methods.length; n++)
        ttq.setAndDefer(inst, ttq.methods[n]);
      return inst;
    };
    ttq.load = function (id: string, opts?: any) {
      const url = 'https://analytics.tiktok.com/i18n/pixel/events.js';
      ttq._i = ttq._i || {};
      ttq._i[id] = [];
      ttq._i[id]._u = url;
      ttq._t = ttq._t || {};
      ttq._t[id] = +new Date();
      ttq._o = ttq._o || {};
      ttq._o[id] = opts || {};
      const script = doc.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = url + '?sdkid=' + id + '&lib=' + t;
      const first = doc.getElementsByTagName('script')[0];
      first.parentNode.insertBefore(script, first);
    };
    ttq.load(pixelId);
    ttq.page();
  })(w, document, 'ttq');

  tiktokInited = true;
}

/**
 * Active le tracking selon le consentement stocké (modèle "prior consent" :
 * rien n'est chargé avant l'acceptation). GA = catégorie analytics ;
 * Meta + TikTok = catégorie ads. Idempotent (gardes internes).
 */
export function enableCampagneTracking(): void {
  const c = readConsent();
  if (c.analytics === 'granted') initGA(process.env.NEXT_PUBLIC_GA_ID);
  if (c.ads === 'granted') {
    initMetaPixel(process.env.NEXT_PUBLIC_META_PIXEL_ID);
    initTikTokPixel(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID);
  }
}

/**
 * Conversion : clic sur un CTA de réservation d'appel.
 * GA4 via Consent Mode (gating automatique), Meta + TikTok seulement si init.
 */
export function trackBookCall(source: string): void {
  track('book_call_click', { source });
  if (typeof window === 'undefined') return;
  const w = window as any;
  if (metaInited && typeof w.fbq === 'function') {
    w.fbq('track', 'Lead', { content_name: 'campagne', source });
  }
  if (tiktokInited && typeof w.ttq?.track === 'function') {
    w.ttq.track('Contact', { content_name: 'campagne', source });
  }
}
