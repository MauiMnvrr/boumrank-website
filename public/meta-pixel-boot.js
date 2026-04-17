/**
 * BoumRank — Meta Pixel loader with Consent Mode gate.
 *
 * Loaded via <Script src="/meta-pixel-boot.js" strategy="lazyOnload" />.
 * Reads the Meta Pixel ID from the script tag's data-pixel-id attribute.
 *
 * The Pixel only tracks if the user has granted 'ads' consent (checked via
 * localStorage boumrank_consent_v1). Otherwise it stays inert — no requests,
 * no cookies, nothing.
 */
(function () {
  var scriptTag = document.getElementById('meta-pixel');
  var pixelId = scriptTag && scriptTag.getAttribute('data-pixel-id');
  if (!pixelId) return;

  // Check consent
  var adsGranted = false;
  try {
    var raw = localStorage.getItem('boumrank_consent_v1');
    if (raw) {
      var c = JSON.parse(raw);
      adsGranted = c && c.ads === 'granted';
    }
  } catch (e) {
    // no consent stored → stay denied
  }
  if (!adsGranted) return;

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
})();
