'use client';

import Script from 'next/script';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

/**
 * Wires up all analytics scripts. All tracking is gated by Consent Mode v2
 * which is bootstrapped by <ConsentBoot /> in the root layout BEFORE this
 * component loads.
 *
 * - GTM : container for managing Meta Pixel, Google Ads, and custom tags
 * - GA4 : standard pageview + event tracking
 * - Meta Pixel : only loads if NEXT_PUBLIC_META_PIXEL_ID is set
 * - Vercel Analytics : first-party pageviews (survives opt-outs, cookieless)
 * - Vercel Speed Insights : real Core Web Vitals from field data
 *
 * Env vars (all optional, components no-op if absent) :
 *   NEXT_PUBLIC_GTM_ID        e.g. GTM-XXXXXXX
 *   NEXT_PUBLIC_GA_ID         e.g. G-XXXXXXXXXX
 *   NEXT_PUBLIC_META_PIXEL_ID e.g. 123456789012345
 */
export function AnalyticsScripts() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {/* Vercel first-party analytics — always on, privacy-respecting */}
      <Analytics />
      <SpeedInsights />

      {/* Google Tag Manager */}
      {gtmId && <GoogleTagManager gtmId={gtmId} />}

      {/* Google Analytics 4 */}
      {gaId && <GoogleAnalytics gaId={gaId} />}

      {/* Microsoft Clarity — heatmaps + session replay, lazy-loaded */}
      {clarityId && (
        <Script id="ms-clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}

      {/* Meta Pixel — gated by Consent Mode via fbq consent commands */}
      {metaPixelId && (
        <Script
          id="meta-pixel"
          strategy="lazyOnload"
          src="/meta-pixel-boot.js"
          data-pixel-id={metaPixelId}
        />
      )}
    </>
  );
}
