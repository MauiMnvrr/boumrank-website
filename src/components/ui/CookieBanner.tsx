'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Check, X, Settings as SettingsIcon, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { readConsent, writeConsent, hasChosenConsent, type ConsentState } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type ViewState = 'hidden' | 'banner' | 'settings';

export const CookieBanner = () => {
  const [view, setView] = useState<ViewState>('hidden');
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);
  const [functional, setFunctional] = useState(false);

  // Show banner on first visit only
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Delay slightly to not compete with hero animations
    const timer = setTimeout(() => {
      if (!hasChosenConsent()) setView('banner');
      const c = readConsent();
      setAnalytics(c.analytics === 'granted');
      setAds(c.ads === 'granted');
      setFunctional(c.functional === 'granted');
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const applyAndClose = (state: Omit<ConsentState, 'at'>) => {
    writeConsent(state);
    setView('hidden');
  };

  const acceptAll = () => {
    applyAndClose({ analytics: 'granted', ads: 'granted', functional: 'granted' });
  };

  const refuseAll = () => {
    applyAndClose({ analytics: 'denied', ads: 'denied', functional: 'denied' });
  };

  const saveCustom = () => {
    applyAndClose({
      analytics: analytics ? 'granted' : 'denied',
      ads: ads ? 'granted' : 'denied',
      functional: functional ? 'granted' : 'denied',
    });
  };

  return (
    <AnimatePresence>
      {view !== 'hidden' && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-[200] md:max-w-md"
        >
          <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-highlight)] shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden">
            {/* Top gradient bar */}
            <div className="h-1 bg-[linear-gradient(90deg,#1B6FC2_0%,#1E9DAA_50%,#2EAE6D_100%)]" />

            {view === 'banner' ? (
              <div className="p-5 md:p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[linear-gradient(135deg,#F28C28_0%,#FBAB5C_100%)] flex items-center justify-center text-white">
                    <Cookie size={18} />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-base text-[var(--text-primary)] mb-1">
                      Un peu de transparence sur les cookies
                    </h2>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      On utilise des cookies pour mesurer ce qui marche (anonymisé) et vous proposer
                      la meilleure expérience. Vos données ne sont jamais revendues. Conforme RGPD.{' '}
                      <Link
                        href="/politique-de-confidentialite"
                        className="text-[var(--primary-blue)] font-semibold hover:underline"
                      >
                        En savoir plus
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button onClick={acceptAll} variant="gradient" size="md" className="w-full">
                    <Check size={16} />
                    Tout accepter
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={refuseAll}
                      variant="subtle"
                      size="sm"
                      className="w-full"
                    >
                      <X size={14} />
                      Tout refuser
                    </Button>
                    <Button
                      onClick={() => setView('settings')}
                      variant="ghost"
                      size="sm"
                      className="w-full"
                    >
                      <SettingsIcon size={14} />
                      Personnaliser
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 md:p-6">
                <div className="flex items-start gap-3 mb-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)] flex items-center justify-center text-white">
                    <SettingsIcon size={18} />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-base text-[var(--text-primary)]">
                      Vos préférences cookies
                    </h2>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Choisissez ce qu&apos;on peut mesurer.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mb-5">
                  <ToggleRow
                    label="Essentiels"
                    description="Obligatoires pour le bon fonctionnement du site. Toujours actifs."
                    checked={true}
                    disabled
                    onChange={() => {}}
                  />
                  <ToggleRow
                    label="Analytics"
                    description="Mesure anonyme du trafic via GA4 + Vercel Analytics. Nous aide à améliorer le site."
                    checked={analytics}
                    onChange={setAnalytics}
                  />
                  <ToggleRow
                    label="Publicité & retargeting"
                    description="Meta Pixel + Google Ads pour nos campagnes publicitaires. Aucun partage avec des tiers."
                    checked={ads}
                    onChange={setAds}
                  />
                  <ToggleRow
                    label="Fonctionnels"
                    description="Chatbot Chatbase + préférences UI (thème, langue). Aucune tracking."
                    checked={functional}
                    onChange={setFunctional}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Button onClick={saveCustom} variant="gradient" size="md" className="w-full">
                    Sauvegarder mes préférences
                  </Button>
                  <button
                    onClick={() => setView('banner')}
                    className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center justify-center gap-1"
                  >
                    <ChevronRight size={12} className="rotate-180" />
                    Retour
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

type ToggleRowProps = {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
};

function ToggleRow({ label, description, checked, disabled, onChange }: ToggleRowProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 p-3 rounded-xl border transition-colors',
        checked
          ? 'bg-[linear-gradient(135deg,rgba(27,111,194,0.04)_0%,rgba(46,174,109,0.04)_100%)] border-[var(--border-highlight)]'
          : 'bg-[var(--bg-elevated)] border-[var(--border-default)]'
      )}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-sm text-[var(--text-primary)]">
            {label}
          </span>
          {disabled && (
            <span className="text-[9px] font-display font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--primary-green)] text-white">
              Requis
            </span>
          )}
        </div>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-0.5">
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'flex-shrink-0 relative mt-0.5 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:ring-offset-2',
          checked
            ? 'bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]'
            : 'bg-[var(--border-default)]',
          disabled && 'opacity-60 cursor-not-allowed'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200',
            checked && 'translate-x-5'
          )}
        />
      </button>
    </div>
  );
}
