'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { readConsent, isInternalTraffic, type ConsentState } from '@/lib/analytics';

/**
 * Charge Microsoft Clarity et LinkedIn Insight UNIQUEMENT après consentement.
 *
 * Contrairement à GA4 / Meta (gérés par Consent Mode v2), ces deux traceurs
 * ne respectent pas Consent Mode : il faut donc gater leur chargement nous-mêmes.
 * - Clarity (mesure / session replay) -> consentement "analytics"
 * - LinkedIn Insight (publicité / retargeting) -> consentement "ads"
 *
 * Le composant réagit aux changements de consentement via l'événement
 * "boumrank-consent-update" émis par writeConsent() (lib/analytics.ts).
 */
export function ConsentGatedTrackers({
  clarityId,
  linkedinPartnerId,
  metricoolHash,
}: {
  clarityId?: string;
  linkedinPartnerId?: string;
  metricoolHash?: string;
}) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [internal, setInternal] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setInternal(isInternalTraffic());
    const handler = () => setConsent(readConsent());
    window.addEventListener('boumrank-consent-update', handler);
    return () => window.removeEventListener('boumrank-consent-update', handler);
  }, []);

  // Appareils internes (admins) : on ne charge AUCUN traceur.
  const analyticsGranted = consent?.analytics === 'granted' && !internal;
  const adsGranted = consent?.ads === 'granted' && !internal;

  return (
    <>
      {/* Microsoft Clarity, chargé seulement si l'analytics est accepté */}
      {clarityId && analyticsGranted && (
        <Script id="ms-clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}

      {/* Metricool, chargé seulement si l'analytics est accepté */}
      {metricoolHash && analyticsGranted && (
        <Script id="metricool" strategy="lazyOnload">
          {`function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"${metricoolHash}"})});`}
        </Script>
      )}

      {/* LinkedIn Insight Tag, chargé seulement si la publicité est acceptée */}
      {linkedinPartnerId && adsGranted && (
        <>
          <Script id="linkedin-insight" strategy="lazyOnload">
            {`_linkedin_partner_id = "${linkedinPartnerId}";window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];window._linkedin_data_partner_ids.push(_linkedin_partner_id);(function(l) {if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s = document.getElementsByTagName("script")[0];var b = document.createElement("script");b.type = "text/javascript";b.async = true;b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b, s);})(window.lintrk);`}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              alt=""
              src={`https://px.ads.linkedin.com/collect/?pid=${linkedinPartnerId}&fmt=gif`}
            />
          </noscript>
        </>
      )}
    </>
  );
}
