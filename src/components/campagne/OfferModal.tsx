'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CAL_URL } from '@/lib/constants';
import { track } from '@/lib/analytics';
import { trackBookCall } from './tracking';
import { ArrowIcon } from './primitives';

/* ============================================================================
   Popup d'offre : le CTA "Débloquer mon mois offert" ouvre cette modale, qui
   explique l'appel de paramétrage et renvoie vers cal.com. Le clic cal.com (le
   vrai signal de conversion) déclenche trackBookCall (Lead/Contact/GA).
   ============================================================================ */

const OfferCtx = createContext<{ open: (source?: string) => void }>({
  open: () => {},
});
export const useOffer = () => useContext(OfferCtx);

export function OfferProvider({ children }: { children: ReactNode }) {
  const [source, setSource] = useState<string | null>(null);

  const open = (s = 'campagne') => {
    setSource(s);
    track('offer_open', { source: s });
  };
  const close = () => setSource(null);

  return (
    <OfferCtx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {source && <OfferModalCard source={source} onClose={close} />}
      </AnimatePresence>
    </OfferCtx.Provider>
  );
}

function OfferModalCard({
  source,
  onClose,
}: {
  source: string;
  onClose: () => void;
}) {
  const calRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    // focus le bouton principal pour l'accessibilité clavier
    calRef.current?.focus();
    // bloque le scroll de fond
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'rgba(8, 15, 26, 0.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 420,
          background: 'var(--bg-surface)',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(8,15,26,0.4)',
        }}
      >
        <div style={{ height: 5, background: 'var(--gradient-primary)' }} />

        {/* Fermer */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            width: 34,
            height: 34,
            borderRadius: 9999,
            border: 'none',
            background: 'var(--bg-elevated)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        <div style={{ padding: '30px 26px 26px', textAlign: 'center' }}>
          <div
            style={{
              width: 64,
              height: 64,
              margin: '0 auto 16px',
              borderRadius: 18,
              background: 'var(--gradient-subtle)',
              border: '1px solid var(--border-highlight)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
            }}
            aria-hidden
          >
            🎁
          </div>

          <h2
            id="offer-title"
            className="cmp-h3"
            style={{ fontSize: 'clamp(1.3rem, 4.5vw, 1.6rem)' }}
          >
            Votre 1er mois offert
          </h2>

          <p
            style={{
              marginTop: 12,
              fontSize: 15,
              lineHeight: 1.55,
              color: 'var(--text-body)',
            }}
          >
            Réservez un appel de 15 minutes : on paramètre votre compte ensemble et
            on active votre mois offert.
          </p>

          <a
            ref={calRef}
            href={`${CAL_URL}?utm_source=${source}_popup`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackBookCall(`${source}_popup`)}
            className="cmp-cta cmp-cta-lg"
            style={{ marginTop: 24, width: '100%' }}
          >
            Réserver mon appel de 15 min
            <ArrowIcon size={20} />
            <span className="cmp-sr-only"> (ouvre un nouvel onglet)</span>
          </a>

          <p
            style={{
              marginTop: 14,
              fontSize: 12.5,
              color: 'var(--text-secondary)',
            }}
          >
            Sans engagement. 15 minutes en visio.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* CTA qui ouvre la popup (remplace le lien direct vers cal.com). */
export function OfferButton({
  children,
  size = 'lg',
  pulse = false,
  variant = 'gradient',
  className = '',
  style,
  source = 'campagne',
}: {
  children: ReactNode;
  size?: 'md' | 'lg';
  pulse?: boolean;
  variant?: 'gradient' | 'invert';
  className?: string;
  style?: CSSProperties;
  source?: string;
}) {
  const { open } = useOffer();
  return (
    <button
      type="button"
      onClick={() => open(source)}
      data-cta={source}
      className={`cmp-cta cmp-cta-${size} ${variant === 'invert' ? 'cmp-cta-invert' : ''} ${pulse ? 'cmp-cta-pulse' : ''} ${className}`}
      style={style}
    >
      {children}
      <ArrowIcon size={size === 'lg' ? 20 : 16} />
    </button>
  );
}
