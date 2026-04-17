import Script from 'next/script';

/**
 * Loads /public/consent-boot.js BEFORE any analytics script.
 *
 * The actual Consent Mode v2 bootstrap logic lives in that JS file (external
 * file, no inline script, so no XSS surface). See /public/consent-boot.js.
 */
export function ConsentBoot() {
  return (
    <Script
      id="consent-boot"
      src="/consent-boot.js"
      strategy="beforeInteractive"
    />
  );
}
