'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Check, BookOpen, Sparkles, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { cn } from '@/lib/utils';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LeadMagnet = () => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [error, setError] = useState<string | null>(null);

  const trackEvent = (name: string, payload: Record<string, unknown> = {}) => {
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.gtag) w.gtag('event', name, payload);
    if (w.dataLayer) w.dataLayer.push({ event: name, ...payload });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!EMAIL_REGEX.test(email.trim())) {
      setError('Merci de saisir un email valide.');
      setState('error');
      return;
    }

    setState('submitting');
    trackEvent('lead_magnet_submitted', { source: 'home_lead_magnet' });

    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error ?? 'Envoi impossible.');
      }

      setState('success');
      trackEvent('lead_magnet_download', {
        source: 'home_lead_magnet',
        magnet: '50-lots-qui-font-revenir',
      });
      // Fire Meta Pixel Lead event (consent-gated inside the wrapper)
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const w = window as any;
        if (typeof w.fbq === 'function') {
          w.fbq('track', 'Lead', {
            content_name: 'Playbook BoumRank',
            content_category: 'lead-magnet',
          });
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Une erreur est survenue.';
      setError(msg);
      setState('error');
    }
  };

  return (
    <section
      id="lead-magnet"
      className="relative py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden"
    >
      {/* Background decorative */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(124,92,252,0.06),transparent_60%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <Card
            variant="solid"
            padding="xl"
            className="relative overflow-hidden border-2 border-[var(--border-highlight)]"
          >
            {/* Accent gradient top bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[linear-gradient(90deg,#7C5CFC_0%,#1B6FC2_50%,#2EAE6D_100%)]" />

            <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center">
              {/* LEFT : PDF mockup visual */}
              <motion.div
                initial={{ opacity: 0, rotate: -6, scale: 0.9 }}
                whileInView={{ opacity: 1, rotate: -3, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative mx-auto md:mx-0"
              >
                {/* PDF Card Mockup */}
                <div className="relative w-[200px] h-[260px] bg-white rounded-lg shadow-[0_20px_48px_rgba(0,0,0,0.18)] overflow-hidden border border-[var(--border-default)]">
                  {/* Top strip gradient */}
                  <div className="h-20 bg-[linear-gradient(135deg,#7C5CFC_0%,#1B6FC2_100%)] relative overflow-hidden">
                    <div className="absolute top-3 left-4 text-white text-[10px] font-display font-bold uppercase tracking-widest opacity-90">
                      BoumRank · Playbook
                    </div>
                    <BookOpen className="absolute bottom-3 left-4 text-white/30" size={40} />
                  </div>
                  {/* Body mock */}
                  <div className="p-4 space-y-2">
                    <div className="h-2.5 bg-[var(--text-primary)] rounded w-full" />
                    <div className="h-2.5 bg-[var(--text-primary)] rounded w-4/5" />
                    <div className="h-2 bg-[var(--text-muted)] rounded w-full mt-3" />
                    <div className="h-2 bg-[var(--text-muted)] rounded w-5/6" />
                    <div className="h-2 bg-[var(--text-muted)] rounded w-3/4" />
                    <div className="h-2 bg-[var(--text-muted)] rounded w-full" />
                    <div className="h-2 bg-[var(--text-muted)] rounded w-4/5" />
                    {/* Page number */}
                    <div className="absolute bottom-3 right-4 text-[9px] font-display font-bold text-[var(--text-muted)]">
                      1 / 28
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-3 -right-3 bg-[linear-gradient(135deg,#F28C28_0%,#E84393_100%)] text-white text-[10px] font-display font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-[0_8px_20px_rgba(242,140,40,0.4)] rotate-6">
                  Gratuit · 28 pages
                </div>

                {/* Floating sparkles */}
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-2 -left-4 text-[#F28C28]"
                >
                  <Sparkles size={22} />
                </motion.div>
              </motion.div>

              {/* RIGHT : Copy + form */}
              <div className="flex flex-col">
                <Eyebrow variant="subtle" size="sm" className="mb-4 self-start">
                  <Download size={12} />
                  Lead magnet · Gratuit
                </Eyebrow>

                <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl leading-[1.1] mb-4 text-[var(--text-primary)]">
                  Le <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#7C5CFC_0%,#1B6FC2_100%)]">Playbook BoumRank</span> :
                  <br />
                  50 idées de lots qui font revenir vos clients.
                </h2>

                <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                  Le PDF de <span className="font-semibold text-[var(--text-primary)]">28 pages</span>{' '}
                  que vos concurrents vont télécharger à votre place si vous ne le faites pas.
                  <br />
                  <span className="text-[var(--text-primary)] font-semibold">
                    Gratuit, sans spam, livré direct dans votre boîte.
                  </span>
                </p>

                {/* Form states */}
                {state !== 'success' ? (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1 relative">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                          size={16}
                        />
                        <input
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (state === 'error') setState('idle');
                          }}
                          placeholder="votre@email.com"
                          required
                          disabled={state === 'submitting'}
                          className={cn(
                            'w-full h-14 pl-11 pr-4 rounded-xl border-2 font-display font-medium',
                            'bg-[var(--bg-surface)] text-[var(--text-primary)]',
                            'placeholder:text-[var(--text-muted)]',
                            'focus:outline-none focus:border-[var(--primary-blue)] focus:ring-4 focus:ring-[rgba(27,111,194,0.15)]',
                            'transition-all',
                            state === 'error'
                              ? 'border-[var(--error)]'
                              : 'border-[var(--border-default)] hover:border-[var(--border-highlight)]'
                          )}
                        />
                      </div>
                      <Button
                        type="submit"
                        variant="gradient"
                        size="lg"
                        disabled={state === 'submitting'}
                        className="sm:w-auto whitespace-nowrap"
                      >
                        {state === 'submitting' ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <Sparkles size={16} />
                            </motion.div>
                            Envoi...
                          </>
                        ) : (
                          <>
                            <Download size={16} />
                            Recevoir mon playbook
                          </>
                        )}
                      </Button>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-sm text-[var(--error)]"
                      >
                        <AlertCircle size={14} />
                        {error}
                      </motion.div>
                    )}

                    <p className="text-xs text-[var(--text-muted)]">
                      Zéro spam. Zéro revente. Désabonnement en 1 clic à tout moment. Conforme RGPD.
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-start gap-4 p-5 rounded-xl bg-[linear-gradient(135deg,rgba(46,174,109,0.1)_0%,rgba(30,157,170,0.1)_100%)] border-2 border-[var(--primary-green)]"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--primary-green)] flex items-center justify-center text-white">
                      <Check size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-display font-bold text-[var(--text-primary)] mb-1">
                        C&apos;est envoyé ! 🎉
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        Le Playbook BoumRank arrive dans votre boîte sous quelques minutes (pensez à
                        regarder les spams si ça tarde). Et gardez un œil sur vos emails — on vous partage des
                        astuces tous les 15 jours pour booster vos avis.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
