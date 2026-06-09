/**
 * BoumRank — Meta Pixel loader with Consent Mode gate.
 *
 * Loaded via <Script src="/meta-pixel-boot.js" strategy="lazyOnload" />.
 * Reads the Meta Pixel ID from the script tag's data-pixel-id attribute.
 *
 * Le Pixel ne se charge que si le consentement 'ads' est accordé. Si l'accord
 * arrive APRÈS le chargement (clic sur la bannière), on écoute l'événement
 * 'boumrank-consent-update' et on initialise à ce moment-là, sans recharger la
 * page. Sinon il reste totalement inerte (aucune requête, aucun cookie).
 */
(function () {
  var scriptTag = document.getElementById('meta-pixel');
  var pixelId = scriptTag && scriptTag.getAttribute('data-pixel-id');
  if (!pixelId) return;
  pixelId = pixelId.trim();

  function adsGranted() {
    try {
      var raw = localStorage.getItem('boumrank_consent_v1');
      if (!raw) return false;
      var c = JSON.parse(raw);
      return !!(c && c.ads === 'granted');
    } catch (e) {
      return false;
    }
  }

  function initPixel() {
    if (window.fbq) return; // idempotent : déjà initialisé

    // Standard Meta Pixel bootstrap
    // @see https://developers.facebook.com/docs/meta-pixel/get-started
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    );

    if (typeof window.fbq === 'function') {
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
    }
  }

  if (adsGranted()) {
    initPixel();
  } else {
    // Consentement accordé en cours de session → init sans rechargement.
    window.addEventListener('boumrank-consent-update', function handler() {
      if (adsGranted()) {
        window.removeEventListener('boumrank-consent-update', handler);
        initPixel();
      }
    });
  }
})();
