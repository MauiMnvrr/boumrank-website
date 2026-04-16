import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SchemaOrg, organizationSchema } from '@/components/seo/SchemaOrg';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: '\u00c0 propos',
  description:
    "D\u00e9couvrez l'\u00e9quipe et la mission de BoumRank, la plateforme qui transforme les avis clients en exp\u00e9riences ludiques.",
  alternates: { canonical: `${SITE_URL}/a-propos` },
};

const values = [
  {
    title: 'Innovation',
    description:
      "Nous repoussons les limites de la technologie pour offrir des exp\u00e9riences uniques \u00e0 vos clients.",
    icon: '\u2728',
  },
  {
    title: 'Transparence',
    description:
      'Tarifs clairs, donn\u00e9es ouvertes, communication honn\u00eate. Pas de zones grises.',
    icon: '🔍',
  },
  {
    title: 'Impact Local',
    description:
      'Chaque fonctionnalit\u00e9 est pens\u00e9e pour aider les commerces de proximit\u00e9 \u00e0 prosp\u00e9rer.',
    icon: '🏪',
  },
  {
    title: 'Simplicit\u00e9',
    description:
      'Une interface intuitive que n\'importe quel commer\u00e7ant peut ma\u00eetriser en 5 minutes.',
    icon: '\u26a1',
  },
];

const stats = [
  { value: '500+', label: 'Commerces accompagn\u00e9s' },
  { value: '50k+', label: 'Avis g\u00e9n\u00e9r\u00e9s' },
  { value: '99.8%', label: 'Pr\u00e9cision IA' },
  { value: '<3s', label: 'Validation moyenne' },
];

const team = [
  { name: 'Mau\u00ef M.', role: 'CEO & Co-fondateur', initials: 'MM' },
  { name: 'Alexandre D.', role: 'CTO & Co-fondateur', initials: 'AD' },
  { name: 'Sophie L.', role: 'Head of Product', initials: 'SL' },
];

export default function AProposPage() {
  return (
    <>
      <SchemaOrg schemas={[organizationSchema()]} />

      {/* Header */}
      <section className="pt-32 pb-16 bg-[var(--bg-primary)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7C5CFC]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1B6FC2]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Accueil', href: '/' },
              { label: '\u00c0 propos' },
            ]}
          />

          <div className="text-center mt-12">
            <span className="text-[#1B6FC2] font-bold uppercase tracking-widest text-sm">
              Notre histoire
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase mt-4 mb-6 leading-none text-[var(--text-primary)]">
              La mission{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">
                BoumRank
              </span>
            </h1>
            <p className="text-lg text-[var(--text-body)] max-w-2xl mx-auto leading-relaxed">
              Nous croyons que chaque commerce local m&eacute;rite les meilleurs outils
              digitaux pour transformer ses clients en ambassadeurs.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <div>
              <span className="text-[#1B6FC2] font-bold uppercase tracking-widest text-xs">
                Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold uppercase mt-3 mb-6 text-[var(--text-primary)]">
                R&eacute;volutionner l&apos;engagement client{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D]">
                  par le jeu
                </span>
              </h2>
              <div className="space-y-4 text-[var(--text-body)] leading-relaxed">
                <p>
                  BoumRank est n&eacute; d&apos;un constat simple : les commerces locaux
                  peinent &agrave; r&eacute;colter des avis clients alors que ceux-ci sont
                  devenus le premier crit&egrave;re de choix des consommateurs.
                </p>
                <p>
                  Notre solution transforme cette corv&eacute;e en moment de plaisir.
                  Gr&acirc;ce &agrave; la gamification, chaque interaction devient un jeu
                  o&ugrave; le client est r&eacute;compens&eacute; pour son engagement, et le
                  commerce gagne en visibilit&eacute; et en fid&eacute;lisation.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-[var(--glass-bg)] backdrop-blur-[16px] border border-[var(--glass-border)] rounded-3xl p-8 shadow-[var(--glass-shadow)]">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-extrabold uppercase text-[var(--text-primary)] mb-3">
                  Notre ambition
                </h3>
                <p className="text-[var(--text-body)] leading-relaxed">
                  Devenir la r&eacute;f&eacute;rence europ&eacute;enne de la gamification
                  pour les commerces locaux, en aidant 10 000 entreprises d&apos;ici 2027.
                </p>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#1B6FC2] to-[#2EAE6D] rounded-2xl opacity-20 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-[var(--bg-primary)] relative">
        <div className="absolute inset-0 bg-[var(--gradient-subtle)]" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <span className="text-[#1B6FC2] font-bold uppercase tracking-widest text-xs">
            Vision
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase mt-3 mb-6 text-[var(--text-primary)]">
            Un monde o&ugrave; chaque commerce local{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">
              prosp&egrave;re gr&acirc;ce au digital
            </span>
          </h2>
          <p className="text-lg text-[var(--text-body)] leading-relaxed max-w-2xl mx-auto">
            Nous imaginons un futur o&ugrave; la technologie n&apos;est plus un obstacle
            mais un acc&eacute;l&eacute;rateur pour les entrepreneurs de proximit&eacute;.
            Un futur o&ugrave; chaque avis client se transforme en opportunit&eacute; de
            croissance et chaque visite en exp&eacute;rience m&eacute;morable.
          </p>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#1B6FC2] font-bold uppercase tracking-widest text-xs">
              Nos valeurs
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase mt-3 text-[var(--text-primary)]">
              Ce qui nous{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D]">
                guide
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-[var(--glass-bg)] backdrop-blur-[16px] border border-[var(--glass-border)] rounded-2xl p-6 shadow-[var(--glass-shadow)] hover:translate-y-[-4px] transition-transform duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-extrabold uppercase text-[var(--text-primary)] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiffres cl&eacute;s */}
      <section className="py-20 bg-[var(--bg-primary)] relative">
        <div className="absolute inset-0 bg-[var(--gradient-subtle)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#1B6FC2] font-bold uppercase tracking-widest text-xs">
              En chiffres
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase mt-3 text-[var(--text-primary)]">
              Chiffres{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D]">
                cl&eacute;s
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center bg-[var(--glass-bg)] backdrop-blur-[16px] border border-[var(--glass-border)] rounded-2xl p-8 shadow-[var(--glass-shadow)]"
              >
                <div
                  className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] mb-2"
                  style={{ fontFamily: 'var(--font-space-grotesk), "Space Grotesk", sans-serif' }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--text-secondary)] font-bold uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* &Eacute;quipe */}
      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#1B6FC2] font-bold uppercase tracking-widest text-xs">
              L&apos;&eacute;quipe
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase mt-3 mb-4 text-[var(--text-primary)]">
              Rencontrez les{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D]">
                visionnaires
              </span>
            </h2>
            <p className="text-[var(--text-body)] max-w-xl mx-auto">
              Rencontrez les visionnaires derri&egrave;re BoumRank
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-[var(--glass-bg)] backdrop-blur-[16px] border border-[var(--glass-border)] rounded-2xl p-8 shadow-[var(--glass-shadow)] text-center hover:translate-y-[-4px] transition-transform duration-300"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] flex items-center justify-center shadow-[0_0_30px_rgba(27,111,194,0.3)]">
                  <span className="text-white text-2xl font-extrabold tracking-wider">
                    {member.initials}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold uppercase text-[var(--text-primary)] mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-medium">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
