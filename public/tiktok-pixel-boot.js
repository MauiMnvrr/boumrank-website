/**
 * BoumRank — TikTok Pixel loader avec gate de consentement.
 *
 * Chargé via <Script src="/tiktok-pixel-boot.js" strategy="lazyOnload" /> avec
 * l'ID dans data-pixel-id. Ne s'initialise QUE si l'utilisateur a accordé le
 * consentement 'ads' (localStorage boumrank_consent_v1). Sinon : inerte.
 */
(function () {
  var scriptTag = document.getElementById('tiktok-pixel');
  var pixelId = scriptTag && scriptTag.getAttribute('data-pixel-id');
  if (!pixelId) return;
  pixelId = pixelId.trim();

  var adsGranted = false;
  try {
    var raw = localStorage.getItem('boumrank_consent_v1');
    if (raw) {
      var c = JSON.parse(raw);
      adsGranted = c && c.ads === 'granted';
    }
  } catch (e) {
    // pas de consentement stocké → rester inerte
  }
  if (!adsGranted) return;

  // Snippet officiel TikTok Pixel
  !(function (w, d, t) {
    w.TiktokAnalyticsObject = t;
    var ttq = (w[t] = w[t] || []);
    ttq.methods = [
      'page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once',
      'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'holdConsent',
      'revokeConsent', 'grantConsent',
    ];
    ttq.setAndDefer = function (obj, method) {
      obj[method] = function () {
        obj.push([method].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
    ttq.instance = function (id) {
      var inst = (ttq._i && ttq._i[id]) || [];
      for (var n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(inst, ttq.methods[n]);
      return inst;
    };
    ttq.load = function (id, opts) {
      var url = 'https://analytics.tiktok.com/i18n/pixel/events.js';
      ttq._i = ttq._i || {};
      ttq._i[id] = [];
      ttq._i[id]._u = url;
      ttq._t = ttq._t || {};
      ttq._t[id] = +new Date();
      ttq._o = ttq._o || {};
      ttq._o[id] = opts || {};
      var script = d.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = url + '?sdkid=' + id + '&lib=' + t;
      var first = d.getElementsByTagName('script')[0];
      first.parentNode.insertBefore(script, first);
    };
    ttq.load(pixelId);
    ttq.page();
  })(window, document, 'ttq');
})();
