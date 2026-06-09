/**
 * BoumRank — Consent Mode v2 bootstrap
 *
 * Loaded via <Script src="/consent-boot.js" strategy="beforeInteractive" />
 * from src/app/layout.tsx. Runs BEFORE GA4/GTM/Meta Pixel scripts so every
 * tracking event is buffered or discarded according to the default-denied
 * consent state.
 *
 * Gère aussi l'EXCLUSION DES APPAREILS INTERNES (admins) :
 *   - visiter ?interne=1 marque durablement cet appareil (localStorage)
 *   - visiter ?interne=0 le réactive
 * Un appareil marqué est exclu de GA4 (drapeau ga-disable), et les pixels
 * Meta/TikTok ne se chargent pas (voir *-pixel-boot.js), et track()/trackMeta()/
 * trackTikTok() sont no-op (voir lib/analytics.ts).
 *
 * 1. Gère le drapeau "interne" + désactive GA4 si interne
 * 2. Initialise `dataLayer` (GTM)
 * 3. Définit `gtag()`
 * 4. Pose le consentement par défaut = refusé (exigence UE depuis mars 2024)
 * 5. Rejoue le choix de consentement stocké pour ne pas perdre d'événements
 */
(function () {
  // --- Exclusion des appareils internes (admins) ---
  try {
    var qs = window.location.search || '';
    if (qs.indexOf('interne=1') !== -1) {
      localStorage.setItem('boumrank_internal', 'true');
      alert('Cet appareil ne sera plus compté dans les statistiques BoumRank.');
    } else if (qs.indexOf('interne=0') !== -1) {
      localStorage.removeItem('boumrank_internal');
      alert('Cet appareil est de nouveau compté dans les statistiques BoumRank.');
    }
  } catch (e) {
    // localStorage indisponible — on continue normalement
  }

  var isInternal = false;
  try {
    isInternal = localStorage.getItem('boumrank_internal') === 'true';
  } catch (e) {}

  // Désactive complètement GA4 pour cet appareil (drapeau natif gtag).
  if (isInternal) {
    try {
      var bootTag = document.getElementById('consent-boot');
      var gaId = bootTag && bootTag.getAttribute('data-ga-id');
      if (gaId) {
        window['ga-disable-' + gaId] = true;
      }
    } catch (e) {}
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500,
  });

  try {
    var raw = localStorage.getItem('boumrank_consent_v1');
    if (raw) {
      var c = JSON.parse(raw);
      if (c && c.at > 0) {
        gtag('consent', 'update', {
          analytics_storage: c.analytics === 'granted' ? 'granted' : 'denied',
          ad_storage: c.ads === 'granted' ? 'granted' : 'denied',
          ad_user_data: c.ads === 'granted' ? 'granted' : 'denied',
          ad_personalization: c.ads === 'granted' ? 'granted' : 'denied',
          functionality_storage:
            c.functional === 'granted' ? 'granted' : 'denied',
          security_storage: 'granted',
        });
      }
    }
  } catch (e) {
    // localStorage unavailable — stay on default-denied
  }
})();
