/**
 * BoumRank — Consent Mode v2 bootstrap
 *
 * Loaded via <Script src="/consent-boot.js" strategy="beforeInteractive" />
 * from src/app/layout.tsx. Runs BEFORE GA4/GTM/Meta Pixel scripts so every
 * tracking event is buffered or discarded according to the default-denied
 * consent state.
 *
 * 1. Initialises `dataLayer` (GTM)
 * 2. Defines `gtag()`
 * 3. Sets default consent = denied (EU requirement since March 2024)
 * 4. Replays any stored consent choice synchronously to not lose events on reload
 */
(function () {
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
