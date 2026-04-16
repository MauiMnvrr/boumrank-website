import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaOrg, organizationSchema } from '@/components/seo/SchemaOrg';
import { SITE_URL, DEMO_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Comment \u00e7a marche',
  description:
    'D\u00e9couvrez comment BoumRank transforme vos avis clients en jeux et r\u00e9compenses en 4 \u00e9tapes simples.',
  alternates: { canonical: `${SITE_URL}/comment-ca-marche` },
};

const steps = [
  {
    number: '01',
    title: 'Configurez votre espace',
    description:
      'Personnalisez vos jeux, r\u00e9compenses et branding en quelques clics depuis votre dashboard.',
    details: [
      'Choisissez parmi nos jeux : machine \u00e0 sous, roue de la fortune, blackjack',
      'Personnalisez les couleurs, le logo et le branding \u00e0 l\u2019image de votre marque',
      'D\u00e9finissez vos r\u00e9compenses et les conditions de gains',
      'G\u00e9n\u00e9rez votre QR Code unique en un clic',
    ],
    icon: '\u2699\ufe0f',
  },
  {
    number: '02',
    title: 'Vos clients scannent le QR Code',
    description:
      'Un QR Code sur table, au comptoir ou sur le ticket \u2014 le client scanne et acc\u00e8de instantan\u00e9ment au jeu.',
    details: [
      'QR Code imprimable ou affichable sur \u00e9cran',
      'Aucune application \u00e0 t\u00e9l\u00e9charger pour le client',
      'Acc\u00e8s imm\u00e9diat via le navigateur mobile',
      'Exp\u00e9rience optimis\u00e9e pour tous les smartphones',
    ],
    icon: '\ud83d\udcf1',
  },
  {
    number: '03',
    title: 'Le client joue et gagne',
    description:
      'Machine \u00e0 sous, roue de la fortune ou blackjack \u2014 le fun d\u00e9clenche l\u2019engagement et la fid\u00e9lisation.',
    details: [
      'Jeux interactifs et ludiques con\u00e7us pour maximiser l\u2019engagement',
      'R\u00e9compenses instantan\u00e9es : r\u00e9ductions, produits gratuits, avantages exclusifs',
      'Exp\u00e9rience m\u00e9morable qui diff\u00e9rencie votre commerce',
      'Le client est motiv\u00e9 \u00e0 laisser un avis en \u00e9change de sa chance de gagner',
    ],
    icon: '\ud83c\udfb0',
  },
  {
    number: '04',
    title: "L'IA valide automatiquement",
    description:
      'Le client poste un avis, soumet sa preuve, et notre IA v\u00e9rifie en moins de 3 secondes.',
    details: [
      'Le client soumet une capture d\u2019\u00e9cran de son avis Google, Instagram ou Facebook',
      'Notre IA analyse l\u2019image et v\u00e9rifie la conformit\u00e9 en <3 secondes',
      'Pr\u00e9cision de validation de 99.8%',
      'La r\u00e9compense est d\u00e9bloqu\u00e9e automatiquement apr\u00e8s validation',
    ],
    icon: '\ud83e\udd16',
  },
];

export default function CommentCaMarchePage() {
  return (
    <>
      <SchemaOrg schemas={[organizationSchema()]} />

      {/* Header */}
      <section className="pt-32 pb-16 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#1B6FC2]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#2EAE6D]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Comment \u00e7a marche' },
            ]}
          />

          <div className="text-center mt-12">
            <span className="text-[#1B6FC2] font-bold uppercase tracking-widest text-sm">
              Simple et efficace
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase mt-4 mb-6 leading-none text-[var(--text-primary)]">
              Comment{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">
                &ccedil;a marche ?
              </span>
            </h1>
            <p className="text-lg text-[var(--text-body)] max-w-2xl mx-auto leading-relaxed">
              En 4 &eacute;tapes simples, transformez chaque visite client en
              opportunit&eacute; de croissance. Aucune comp&eacute;tence technique requise.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-20">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-[39px] top-[100px] bottom-[-60px] w-[2px] bg-gradient-to-b from-[#1B6FC2]/30 to-transparent" />
                )}

                <div className="grid lg:grid-cols-[80px_1fr] gap-8">
                  {/* Number circle */}
                  <div className="flex lg:flex-col items-center gap-4 lg:gap-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] flex items-center justify-center shadow-[0_0_30px_rgba(27,111,194,0.3)] flex-shrink-0">
                      <span
                        className="text-white text-2xl font-extrabold"
                        style={{
                          fontFamily:
                            'var(--font-space-grotesk), "Space Grotesk", sans-serif',
                        }}
                      >
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-[var(--glass-bg)] backdrop-blur-[16px] border border-[var(--glass-border)] rounded-2xl p-8 shadow-[var(--glass-shadow)] hover:translate-y-[-4px] transition-transform duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-4xl">{step.icon}</span>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-[var(--text-primary)]">
                          {step.title}
                        </h2>
                        <p className="text-[var(--text-body)] mt-2 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-3 mt-6 ml-1">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-body)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D] mt-2 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&eacute;sum&eacute; visuel */}
      <section className="py-20 bg-[var(--bg-primary)] relative">
        <div className="absolute inset-0 bg-[var(--gradient-subtle)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-[var(--text-primary)]">
              Le parcours client{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D]">
                en un coup d&apos;&oelig;il
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: '\ud83d\udcf2', label: 'Scan QR' },
              { icon: '\ud83c\udfae', label: 'Joue' },
              { icon: '\u2b50', label: 'Poste un avis' },
              { icon: '\ud83c\udf81', label: 'Gagne' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-[var(--glass-bg)] backdrop-blur-[16px] border border-[var(--glass-border)] shadow-[var(--glass-shadow)] flex items-center justify-center">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <p className="font-extrabold uppercase text-[var(--text-primary)] text-sm tracking-wider">
                  {item.label}
                </p>
                {i < 3 && (
                  <div className="hidden lg:block absolute mt-[-52px] ml-[calc(100%+4px)]">
                    <span className="text-[var(--text-muted)] text-2xl">
                      &rarr;
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B6FC2]/10 dark:from-[#1B6FC2]/20 to-transparent" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase mb-6 text-[var(--text-primary)]">
            Pr&ecirc;t &agrave;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">
              d&eacute;marrer ?
            </span>
          </h2>
          <p className="text-lg text-[var(--text-body)] max-w-xl mx-auto mb-10 leading-relaxed">
            Cr&eacute;ez votre compte en 2 minutes et lancez votre premi&egrave;re
            campagne de gamification d&egrave;s aujourd&apos;hui.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] text-white px-10 py-4 rounded-full font-bold text-lg uppercase shadow-[0_0_25px_rgba(27,111,194,0.4)] hover:shadow-[0_0_35px_rgba(27,111,194,0.6)] hover:scale-105 transition-all"
            >
              Voir la d&eacute;mo
            </a>
            <Link
              href="/tarifs"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--bg-elevated)] uppercase transition-colors"
            >
              D&eacute;couvrir les tarifs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
