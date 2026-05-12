import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaOrg, organizationSchema } from '@/components/seo/SchemaOrg';
import { ContactForm } from '@/components/ui/ContactForm';
import { SITE_URL, DEMO_URL } from '@/lib/constants';
import { Mail, Calendar, MapPin, MessageCircle } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.contact' });
  const canonical =
    locale === 'fr' ? `${SITE_URL}/contact` : `${SITE_URL}/en/contact`;
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: { fr: `${SITE_URL}/contact`, en: `${SITE_URL}/en/contact` },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const isEn = locale === 'en';

  return (
    <>
      <SchemaOrg schemas={[organizationSchema()]} />

      <section className="pt-32 pb-24 bg-[var(--bg-primary)] relative overflow-hidden min-h-screen">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1B6FC2]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2EAE6D]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: isEn ? 'Home' : 'Accueil', href: '/' },
              { label: t('contact.title') },
            ]}
          />

          <div className="text-center mt-12 mb-16">
            <span className="text-[#1B6FC2] font-bold uppercase tracking-widest text-sm">
              {isEn ? "Let's talk about your project" : 'Parlons de votre projet'}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase mt-4 mb-6 leading-none text-[var(--text-primary)]">
              {isEn ? 'Contact ' : 'Contactez '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">
                {isEn ? 'our team' : 'notre équipe'}
              </span>
            </h1>
            <p className="text-lg text-[var(--text-body)] max-w-2xl mx-auto leading-relaxed">
              {t('contact.lead')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="bg-[var(--glass-bg)] backdrop-blur-[16px] border border-[var(--glass-border)] rounded-2xl p-8 shadow-[var(--glass-shadow)]">
                <h2 className="text-xl font-extrabold uppercase text-[var(--text-primary)] mb-6">
                  {isEn ? 'Our contact info' : 'Nos coordonnées'}
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
                        href="mailto:support@boumrank.com"
                        className="text-[#1B6FC2] font-bold hover:underline"
                      >
                        support@boumrank.com
                      </a>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">
                        {isEn
                          ? 'Reply within 24h, Monday to Friday.'
                          : 'Réponse sous 24h, du lundi au vendredi.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center flex-shrink-0">
                      <Calendar className="text-[#1B6FC2] w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text-primary)] text-sm uppercase mb-1">
                        {isEn ? 'Book a demo' : 'Réserver une démo'}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-3">
                        {isEn
                          ? 'Get a personalized walkthrough tailored to your industry.'
                          : 'Prenez rendez-vous pour une présentation personnalisée adaptée à votre secteur.'}
                      </p>
                      <a
                        href={DEMO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(27,111,194,0.3)] hover:shadow-[0_0_25px_rgba(27,111,194,0.5)] hover:scale-105 transition-all"
                      >
                        {isEn ? 'See the demo' : 'Voir la démo'}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="text-[#1B6FC2] w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text-primary)] text-sm uppercase mb-1">
                        {isEn ? 'Support' : 'Support'}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {isEn
                          ? "All our clients get priority French and English support, regardless of plan."
                          : "Tous nos clients bénéficient d'un support prioritaire en français, peu importe l'offre choisie."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-[#1B6FC2] w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text-primary)] text-sm uppercase mb-1">
                        {isEn ? 'Location' : 'Localisation'}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {isEn ? 'Marseille, France. 100% remote.' : 'Marseille, France. 100% remote.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1B6FC2]/10 to-[#2EAE6D]/10 border border-[var(--border-highlight)] rounded-2xl p-8">
                <h3 className="font-extrabold uppercase text-[var(--text-primary)] mb-3">
                  {isEn ? 'Guaranteed reply within 24h' : 'Réponse garantie sous 24h'}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {isEn
                    ? "Our team commits to a reply within 24 business hours. For urgent requests, email us directly."
                    : "Notre équipe s'engage à vous répondre dans les 24 heures ouvrées. Pour les demandes urgentes, envoyez-nous un email directement."}
                </p>
              </div>
            </div>

            <div className="bg-[var(--glass-bg)] backdrop-blur-[16px] border border-[var(--glass-border)] rounded-2xl p-8 shadow-[var(--glass-shadow)]">
              <h2 className="text-xl font-extrabold uppercase text-[var(--text-primary)] mb-6">
                {isEn ? 'Send us a message' : 'Envoyez-nous un message'}
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
