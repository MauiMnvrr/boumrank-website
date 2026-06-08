'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { writeConsent, hasChosenConsent } from '@/lib/analytics';
import { enableCampagneTracking } from './tracking';

/**
 * Analytics + consentement RGPD pour la landing /campagne.
 * - Vercel Analytics : cookieless, toujours actif (sans donnée perso).
 * - GA4 + Meta Pixel + TikTok Pixel : modèle "prior consent", rien n'est
 *   chargé tant que l'utilisateur n'a pas accepté (conforme CNIL/RGPD).
 * - Bandeau de consentement léger, autonome (sans next-intl).
 *
 * Le consentement est partagé avec le site principal (même clé localStorage),
 * donc un visiteur qui a déjà accepté n'a pas à re-accepter ici.
 */
export function CampagneTracking() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Visiteur déjà consentant : on active le tracking tout de suite.
    enableCampagneTracking();
    // Sinon, on propose le bandeau (léger délai pour ne pas gêner le hero).
    const timer = setTimeout(() => {
      if (!hasChosenConsent()) setShowBanner(true);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const accept = () => {
    writeConsent({ analytics: 'granted', ads: 'granted', functional: 'granted' });
    enableCampagneTracking();
    setShowBanner(false);
  };

  const refuse = () => {
    writeConsent({ analytics: 'denied', ads: 'denied', functional: 'denied' });
    setShowBanner(false);
  };

  return (
    <>
      <Analytics />
      <SpeedInsights />
      {showBanner && <ConsentBanner onAccept={accept} onRefuse={refuse} />}
    </>
  );
}

function ConsentBanner({
  onAccept,
  onRefuse,
}: {
  onAccept: () => void;
  onRefuse: () => void;
}) {
  return (
    <div
      role="region"
      aria-label="Consentement aux cookies"
      style={{
        position: 'fixed',
        left: 12,
        right: 12,
        bottom: 12,
        zIndex: 200,
        maxWidth: 440,
        margin: '0 auto',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-highlight)',
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(15,23,42,0.2)',
      }}
    >
      <div style={{ height: 4, background: 'var(--gradient-primary)' }} />
      <div style={{ padding: '16px 18px' }}>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.5,
            color: 'var(--text-body)',
            margin: '0 0 14px',
          }}
        >
          On utilise des cookies pour mesurer l’efficacité de nos publicités
          (anonymisé, jamais revendu). Conforme RGPD.{' '}
          <a
            href="https://boumrank.com/politique-de-confidentialite"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--primary-blue)', fontWeight: 600 }}
          >
            En savoir plus
          </a>
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="button"
            onClick={onRefuse}
            style={{
              flex: 1,
              height: 44,
              borderRadius: 9999,
              border: '1px solid var(--border-default)',
              background: 'var(--bg-surface)',
              color: 'var(--text-body)',
              fontFamily: 'var(--font-plus-jakarta), sans-serif',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="cmp-cta cmp-cta-md"
            style={{ flex: 1, height: 44 }}
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
