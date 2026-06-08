'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { track } from '@/lib/analytics';
import { trackEvent } from '@/lib/events';

/**
 * Instrumentation automatique du parcours (montée 1× dans le layout [locale]).
 *
 * - page_view : à CHAQUE navigation SPA (le 1er chargement est déjà compté par
 *   les scripts de boot gtag/Meta/TikTok → on saute le 1er rendu pour éviter le
 *   double comptage).
 * - scroll_depth : seuils 25/50/75/90 % (1× chacun, throttlé en rAF).
 * - section_view : IntersectionObserver sur [data-section] (1×/section/page).
 * - cta_click / outbound_click / file_download : un listener click délégué.
 * - form_start : un listener focusin délégué (1×/formulaire).
 *
 * Tout passe par track()/trackEvent() → gating par Consent Mode / readConsent().
 */
export function JourneyTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstLoad = useRef(true);

  // --- page_view sur navigation SPA (skip 1er chargement) ---
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    const query = searchParams?.toString();
    trackEvent('page_view', {
      page_location: window.location.href,
      page_path: pathname + (query ? `?${query}` : ''),
      page_title: document.title,
      locale: document.documentElement.lang || 'fr',
    });
  }, [pathname, searchParams]);

  // --- listeners globaux (montés 1×) : scroll / click / focus ---
  useEffect(() => {
    // scroll depth
    const thresholds = [25, 50, 75, 90];
    const fired = new Set<number>();
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - doc.clientHeight;
        if (scrollable <= 0) return;
        const pct = (doc.scrollTop / scrollable) * 100;
        for (const t of thresholds) {
          if (pct >= t && !fired.has(t)) {
            fired.add(t);
            track('scroll_depth', { percent_scrolled: t });
          }
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // clics délégués : cta / file_download / outbound
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const ctaEl = target.closest<HTMLElement>('[data-cta]');
      if (ctaEl) {
        track('cta_click', {
          cta_id: ctaEl.getAttribute('data-cta') || '',
          cta_location: ctaEl.getAttribute('data-cta-location') || '',
        });
      }

      const a = target.closest<HTMLAnchorElement>('a[href]');
      if (a) {
        const href = a.getAttribute('href') || '';
        if (/\.(pdf|zip|csv|xlsx?|docx?|pptx?)(\?|#|$)/i.test(href)) {
          const file = href.split('/').pop()?.split(/[?#]/)[0] || href;
          track('file_download', { file_name: file });
        }
        try {
          const url = new URL(href, window.location.href);
          if (url.origin !== window.location.origin && /^https?:$/.test(url.protocol)) {
            track('outbound_click', { link_url: url.href, link_domain: url.hostname });
          }
        } catch {
          // href relatif / mailto / tel → ignoré
        }
      }
    };
    document.addEventListener('click', onClick, true);

    // form_start : 1er focus dans un <form>
    const startedForms = new Set<string>();
    const onFocusIn = (e: FocusEvent) => {
      const el = e.target as HTMLElement | null;
      const form = el?.closest('form');
      if (!form) return;
      const id =
        form.getAttribute('id') ||
        form.getAttribute('name') ||
        form.getAttribute('data-form') ||
        'form';
      if (startedForms.has(id)) return;
      startedForms.add(id);
      track('form_start', { form_id: id });
    };
    document.addEventListener('focusin', onFocusIn);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('focusin', onFocusIn);
    };
  }, []);

  // --- section_view : ré-observé à chaque page ---
  useEffect(() => {
    const seen = new Set<string>();
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = (entry.target as HTMLElement).getAttribute('data-section') || '';
          if (id && !seen.has(id)) {
            seen.add(id);
            track('section_view', { section_id: id });
          }
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.4 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
