import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaOrg, organizationSchema } from '@/components/seo/SchemaOrg';
import { ContactForm } from '@/components/ui/ContactForm';
import { SITE_URL, DEMO_URL } from '@/lib/constants';
import { Mail, Calendar, MapPin, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Contactez l'\u00e9quipe BoumRank pour une d\u00e9mo personnalis\u00e9e ou toute question sur notre plateforme de gamification.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <SchemaOrg schemas={[organizationSchema()]} />

      <section className="pt-32 pb-24 bg-[var(--bg-primary)] relative overflow-hidden min-h-screen">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1B6FC2]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2EAE6D]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Contact' },
            ]}
          />

          <div className="text-center mt-12 mb-16">
            <span className="text-[#1B6FC2] font-bold uppercase tracking-widest text-sm">
              Parlons de votre projet
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase mt-4 mb-6 leading-none text-[var(--text-primary)]">
              Contactez{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">
                notre &eacute;quipe
              </span>
            </h1>
            <p className="text-lg text-[var(--text-body)] max-w-2xl mx-auto leading-relaxed">
              Une question, une d&eacute;mo, un partenariat ? Nous sommes &agrave; votre
              &eacute;coute et r&eacute;pondons sous 24 heures.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left: Contact info */}
            <div className="space-y-6">
              <div className="bg-[var(--glass-bg)] backdrop-blur-[16px] border border-[var(--glass-border)] rounded-2xl p-8 shadow-[var(--glass-shadow)]">
                <h2 className="text-xl font-extrabold uppercase text-[var(--text-primary)] mb-6">
                  Nos coordonn&eacute;es
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center flex-shrink-0">
                      <Mail className="text-[#1B6FC2] w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text-primary)] text-sm uppercase mb-1">
                        Email
                      </h3>
                      <a
                        href="mailto:contact@boumrank.com"
                        className="text-[#1B6FC2] font-bold hover:underline"
                      >
                        contact@boumrank.com
                      </a>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">
                        R&eacute;ponse sous 24h, du lundi au vendredi.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center flex-shrink-0">
                      <Calendar className="text-[#1B6FC2] w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text-primary)] text-sm uppercase mb-1">
                        R&eacute;server une d&eacute;mo
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-3">
                        Prenez rendez-vous pour une pr&eacute;sentation personnalis&eacute;e
                        adapt&eacute;e &agrave; votre secteur.
                      </p>
                      <a
                        href={DEMO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(27,111,194,0.3)] hover:shadow-[0_0_25px_rgba(27,111,194,0.5)] hover:scale-105 transition-all"
                      >
                        Voir la d&eacute;mo
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="text-[#1B6FC2] w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text-primary)] text-sm uppercase mb-1">
                        Support
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Nos clients Performance et Enterprise b&eacute;n&eacute;ficient
                        d&apos;un support prioritaire 24/7.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-[#1B6FC2] w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text-primary)] text-sm uppercase mb-1">
                        Localisation
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Paris, France &mdash; 100% remote.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1B6FC2]/10 to-[#2EAE6D]/10 border border-[var(--border-highlight)] rounded-2xl p-8">
                <h3 className="font-extrabold uppercase text-[var(--text-primary)] mb-3">
                  R&eacute;ponse garantie sous 24h
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Notre &eacute;quipe s&apos;engage &agrave; vous r&eacute;pondre dans les 24
                  heures ouvr&eacute;es. Pour les demandes urgentes, envoyez-nous un
                  email directement.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-[var(--glass-bg)] backdrop-blur-[16px] border border-[var(--glass-border)] rounded-2xl p-8 shadow-[var(--glass-shadow)]">
              <h2 className="text-xl font-extrabold uppercase text-[var(--text-primary)] mb-6">
                Envoyez-nous un message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
