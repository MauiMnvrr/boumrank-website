import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SITE_URL, SITE_NAME, COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Mentions l\u00e9gales',
  description:
    "Mentions l\u00e9gales du site BoumRank - informations sur l'\u00e9diteur, l'h\u00e9bergeur et les conditions d'utilisation.",
  alternates: { canonical: `${SITE_URL}/mentions-legales` },
};

export default function MentionsLegalesPage() {
  return (
    <section className="pt-32 pb-24 bg-[var(--bg-primary)] min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <Breadcrumbs
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Mentions l\u00e9gales' },
          ]}
        />

        <div className="mt-12 mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase mb-4 text-[var(--text-primary)]">
            Mentions{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">
              l&eacute;gales
            </span>
          </h1>
          <p className="text-[var(--text-secondary)]">
            Derni&egrave;re mise &agrave; jour : 16 avril 2026
          </p>
        </div>

        <div className="space-y-12 text-[var(--text-body)] leading-relaxed">
          {/* &Eacute;diteur du site */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              1. &Eacute;diteur du site
            </h2>
            <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-6 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Raison sociale
                  </span>
                  <p className="text-[var(--text-primary)] font-medium">
                    [Nom de la soci&eacute;t&eacute;]
                  </p>
                </div>
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Forme juridique
                  </span>
                  <p className="text-[var(--text-primary)] font-medium">
                    [SAS / SARL]
                  </p>
                </div>
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Capital social
                  </span>
                  <p className="text-[var(--text-primary)] font-medium">
                    [Montant] euros
                  </p>
                </div>
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Si&egrave;ge social
                  </span>
                  <p className="text-[var(--text-primary)] font-medium">
                    [Adresse]
                  </p>
                </div>
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    SIRET
                  </span>
                  <p className="text-[var(--text-primary)] font-medium">
                    [Num&eacute;ro]
                  </p>
                </div>
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    RCS
                  </span>
                  <p className="text-[var(--text-primary)] font-medium">
                    [Ville]
                  </p>
                </div>
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Directeur de publication
                  </span>
                  <p className="text-[var(--text-primary)] font-medium">
                    [Nom]
                  </p>
                </div>
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Contact
                  </span>
                  <p className="text-[var(--text-primary)] font-medium">
                    {COMPANY.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* H&eacute;bergeur */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              2. H&eacute;bergeur
            </h2>
            <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-6 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Raison sociale
                  </span>
                  <p className="text-[var(--text-primary)] font-medium">
                    Vercel Inc.
                  </p>
                </div>
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Adresse
                  </span>
                  <p className="text-[var(--text-primary)] font-medium">
                    San Francisco, CA, USA
                  </p>
                </div>
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Site web
                  </span>
                  <p className="text-[var(--text-primary)] font-medium">
                    <a
                      href="https://vercel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1B6FC2] hover:underline"
                    >
                      vercel.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Propri&eacute;t&eacute; intellectuelle */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              3. Propri&eacute;t&eacute; intellectuelle
            </h2>
            <p>
              L&apos;ensemble du contenu du site {SITE_NAME} (textes, images,
              graphismes, logo, ic&ocirc;nes, sons, logiciels, etc.) est la
              propri&eacute;t&eacute; exclusive de {SITE_NAME} ou de ses
              partenaires et est prot&eacute;g&eacute; par les lois fran&ccedil;aises et
              internationales relatives &agrave; la propri&eacute;t&eacute; intellectuelle.
            </p>
            <p className="mt-3">
              Toute reproduction, repr&eacute;sentation, modification, publication,
              adaptation de tout ou partie des &eacute;l&eacute;ments du site, quel que
              soit le moyen ou le proc&eacute;d&eacute; utilis&eacute;, est interdite sauf
              autorisation &eacute;crite pr&eacute;alable de {SITE_NAME}.
            </p>
          </div>

          {/* Limitation de responsabilit&eacute; */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              4. Limitation de responsabilit&eacute;
            </h2>
            <p>
              {SITE_NAME} s&apos;efforce de fournir sur le site des informations
              aussi pr&eacute;cises que possible. Toutefois, {SITE_NAME} ne pourra
              &ecirc;tre tenu responsable des omissions, des inexactitudes et des
              carences dans la mise &agrave; jour, qu&apos;elles soient de son fait ou
              du fait des tiers partenaires qui lui fournissent ces informations.
            </p>
            <p className="mt-3">
              Toutes les informations indiqu&eacute;es sur le site sont donn&eacute;es
              &agrave; titre indicatif et sont susceptibles d&apos;&eacute;voluer.
            </p>
          </div>

          {/* Liens hypertextes */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              5. Liens hypertextes
            </h2>
            <p>
              Le site {SITE_NAME} peut contenir des liens hypertextes vers
              d&apos;autres sites. Cependant, {SITE_NAME} n&apos;a pas la
              possibilit&eacute; de v&eacute;rifier le contenu des sites ainsi
              visit&eacute;s et d&eacute;cline toute responsabilit&eacute; quant aux
              risques &eacute;ventuels de contenus illicites.
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              6. Cookies
            </h2>
            <p>
              Le site {SITE_NAME} peut &ecirc;tre amen&eacute; &agrave; utiliser des
              cookies. Pour en savoir plus sur notre utilisation des cookies,
              veuillez consulter notre{' '}
              <a
                href="/politique-de-confidentialite"
                className="text-[#1B6FC2] hover:underline font-medium"
              >
                politique de confidentialit&eacute;
              </a>
              .
            </p>
          </div>

          {/* Droit applicable */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              7. Droit applicable et juridiction
            </h2>
            <p>
              Les pr&eacute;sentes mentions l&eacute;gales sont r&eacute;gies par le
              droit fran&ccedil;ais. En cas de litige et &agrave; d&eacute;faut de
              r&eacute;solution amiable, les tribunaux fran&ccedil;ais seront
              seuls comp&eacute;tents.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              8. Contact
            </h2>
            <p>
              Pour toute question relative aux mentions l&eacute;gales du site,
              vous pouvez nous contacter &agrave; l&apos;adresse suivante :{' '}
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-[#1B6FC2] hover:underline font-medium"
              >
                {COMPANY.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
