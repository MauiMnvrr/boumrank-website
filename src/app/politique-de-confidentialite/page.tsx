import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SITE_URL, SITE_NAME, COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Politique de confidentialit\u00e9',
  description:
    'Politique de confidentialit\u00e9 de BoumRank - Comment nous collectons, utilisons et prot\u00e9geons vos donn\u00e9es personnelles.',
  alternates: { canonical: `${SITE_URL}/politique-de-confidentialite` },
};

export default function PolitiqueDeConfidentialitePage() {
  return (
    <section className="pt-32 pb-24 bg-[var(--bg-primary)] min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <Breadcrumbs
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Politique de confidentialit\u00e9' },
          ]}
        />

        <div className="mt-12 mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase mb-4 text-[var(--text-primary)]">
            Politique de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">
              confidentialit&eacute;
            </span>
          </h1>
          <p className="text-[var(--text-secondary)]">
            Derni&egrave;re mise &agrave; jour : 16 avril 2026
          </p>
        </div>

        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-6 mb-12">
          <p className="text-[var(--text-body)] leading-relaxed">
            La pr&eacute;sente politique de confidentialit&eacute; d&eacute;crit comment{' '}
            {SITE_NAME} (&laquo; nous &raquo;, &laquo; notre &raquo;, &laquo; nos &raquo;)
            collecte, utilise et prot&egrave;ge vos donn&eacute;es personnelles
            lorsque vous utilisez notre site web{' '}
            <a href={SITE_URL} className="text-[#1B6FC2] hover:underline font-medium">
              {SITE_URL}
            </a>{' '}
            et nos services. Cette politique est conforme au R&egrave;glement
            G&eacute;n&eacute;ral sur la Protection des Donn&eacute;es (RGPD) et &agrave; la
            loi Informatique et Libert&eacute;s.
          </p>
        </div>

        <div className="space-y-12 text-[var(--text-body)] leading-relaxed">
          {/* 1. Responsable du traitement */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              1. Responsable du traitement
            </h2>
            <p>
              Le responsable du traitement des donn&eacute;es personnelles est :
            </p>
            <div className="bg-[var(--bg-elevated)] rounded-xl p-4 mt-3">
              <p className="font-medium text-[var(--text-primary)]">
                {SITE_NAME}
              </p>
              <p>Email : {COMPANY.email}</p>
              <p>Adresse : [Adresse du si&egrave;ge social]</p>
            </div>
          </div>

          {/* 2. Donn&eacute;es collect&eacute;es */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              2. Donn&eacute;es collect&eacute;es
            </h2>
            <p className="mb-3">
              Nous collectons les cat&eacute;gories de donn&eacute;es suivantes :
            </p>
            <div className="space-y-4">
              <div className="bg-[var(--bg-elevated)] rounded-xl p-4">
                <h3 className="font-bold text-[var(--text-primary)] mb-2">
                  Donn&eacute;es d&apos;identification
                </h3>
                <p>
                  Nom, pr&eacute;nom, adresse email, nom de l&apos;entreprise, num&eacute;ro
                  de t&eacute;l&eacute;phone (le cas &eacute;ch&eacute;ant).
                </p>
              </div>
              <div className="bg-[var(--bg-elevated)] rounded-xl p-4">
                <h3 className="font-bold text-[var(--text-primary)] mb-2">
                  Donn&eacute;es de navigation
                </h3>
                <p>
                  Adresse IP, type de navigateur, pages visit&eacute;es, dur&eacute;e des
                  visites, provenance du trafic, appareil utilis&eacute;.
                </p>
              </div>
              <div className="bg-[var(--bg-elevated)] rounded-xl p-4">
                <h3 className="font-bold text-[var(--text-primary)] mb-2">
                  Donn&eacute;es d&apos;utilisation du service
                </h3>
                <p>
                  Interactions avec les jeux, captures d&apos;&eacute;cran soumises pour
                  validation IA, historique des r&eacute;compenses, statistiques
                  d&apos;engagement.
                </p>
              </div>
              <div className="bg-[var(--bg-elevated)] rounded-xl p-4">
                <h3 className="font-bold text-[var(--text-primary)] mb-2">
                  Cookies et traceurs
                </h3>
                <p>
                  Cookies techniques, cookies analytiques, cookies de
                  pr&eacute;f&eacute;rences (voir section 7).
                </p>
              </div>
            </div>
          </div>

          {/* 3. Finalit&eacute;s du traitement */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              3. Finalit&eacute;s du traitement
            </h2>
            <p className="mb-3">
              Vos donn&eacute;es personnelles sont trait&eacute;es pour les finalit&eacute;s
              suivantes :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Gestion de votre compte et acc&egrave;s &agrave; la plateforme {SITE_NAME}
              </li>
              <li>
                Fourniture et am&eacute;lioration de nos services de gamification
              </li>
              <li>
                Validation automatique des actions clients par notre intelligence
                artificielle
              </li>
              <li>
                Communication relative &agrave; votre compte (notifications,
                mises &agrave; jour, support)
              </li>
              <li>
                Analyse statistique et am&eacute;lioration de l&apos;exp&eacute;rience
                utilisateur
              </li>
              <li>
                Envoi d&apos;informations commerciales (uniquement avec votre
                consentement)
              </li>
              <li>
                Respect de nos obligations l&eacute;gales et r&eacute;glementaires
              </li>
            </ul>
          </div>

          {/* 4. Base l&eacute;gale */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              4. Base l&eacute;gale
            </h2>
            <p className="mb-3">
              Le traitement de vos donn&eacute;es repose sur les bases l&eacute;gales
              suivantes :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Ex&eacute;cution du contrat :</strong> traitement
                n&eacute;cessaire &agrave; la fourniture de nos services
              </li>
              <li>
                <strong>Consentement :</strong> pour l&apos;envoi de communications
                commerciales et l&apos;utilisation de certains cookies
              </li>
              <li>
                <strong>Int&eacute;r&ecirc;t l&eacute;gitime :</strong> am&eacute;lioration
                de nos services, s&eacute;curit&eacute; de la plateforme, pr&eacute;vention
                de la fraude
              </li>
              <li>
                <strong>Obligation l&eacute;gale :</strong> conservation des
                donn&eacute;es de facturation
              </li>
            </ul>
          </div>

          {/* 5. Dur&eacute;e de conservation */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              5. Dur&eacute;e de conservation
            </h2>
            <p className="mb-3">
              Vos donn&eacute;es personnelles sont conserv&eacute;es pendant les
              dur&eacute;es suivantes :
            </p>
            <div className="bg-[var(--bg-elevated)] rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-start border-b border-[var(--border-default)] pb-3">
                <span className="font-medium text-[var(--text-primary)]">
                  Donn&eacute;es de compte
                </span>
                <span className="text-[var(--text-secondary)]">
                  Dur&eacute;e du contrat + 3 ans
                </span>
              </div>
              <div className="flex justify-between items-start border-b border-[var(--border-default)] pb-3">
                <span className="font-medium text-[var(--text-primary)]">
                  Donn&eacute;es de facturation
                </span>
                <span className="text-[var(--text-secondary)]">10 ans</span>
              </div>
              <div className="flex justify-between items-start border-b border-[var(--border-default)] pb-3">
                <span className="font-medium text-[var(--text-primary)]">
                  Donn&eacute;es de navigation
                </span>
                <span className="text-[var(--text-secondary)]">13 mois</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="font-medium text-[var(--text-primary)]">
                  Cookies
                </span>
                <span className="text-[var(--text-secondary)]">
                  13 mois maximum
                </span>
              </div>
            </div>
          </div>

          {/* 6. Vos droits */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              6. Vos droits
            </h2>
            <p className="mb-3">
              Conform&eacute;ment au RGPD, vous disposez des droits suivants
              concernant vos donn&eacute;es personnelles :
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Droit d'acc\u00e8s",
                  desc: 'Obtenir la confirmation que vos donn\u00e9es sont trait\u00e9es et en recevoir une copie.',
                },
                {
                  title: 'Droit de rectification',
                  desc: 'Demander la correction de donn\u00e9es inexactes ou incompl\u00e8tes.',
                },
                {
                  title: "Droit \u00e0 l'effacement",
                  desc: 'Demander la suppression de vos donn\u00e9es personnelles.',
                },
                {
                  title: 'Droit \u00e0 la portabilit\u00e9',
                  desc: 'Recevoir vos donn\u00e9es dans un format structur\u00e9 et lisible par machine.',
                },
                {
                  title: "Droit d'opposition",
                  desc: 'Vous opposer au traitement de vos donn\u00e9es pour des motifs l\u00e9gitimes.',
                },
                {
                  title: 'Droit \u00e0 la limitation',
                  desc: 'Demander la limitation du traitement de vos donn\u00e9es dans certains cas.',
                },
              ].map((right) => (
                <div
                  key={right.title}
                  className="bg-[var(--bg-elevated)] rounded-xl p-4"
                >
                  <h3 className="font-bold text-[var(--text-primary)] mb-1">
                    {right.title}
                  </h3>
                  <p className="text-sm">{right.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous &agrave; l&apos;adresse :{' '}
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-[#1B6FC2] hover:underline font-medium"
              >
                {COMPANY.email}
              </a>
              . Vous disposez &eacute;galement du droit d&apos;introduire une
              r&eacute;clamation aupr&egrave;s de la CNIL (
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1B6FC2] hover:underline font-medium"
              >
                www.cnil.fr
              </a>
              ).
            </p>
          </div>

          {/* 7. Cookies et traceurs */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              7. Cookies et traceurs
            </h2>
            <p className="mb-3">
              Notre site utilise des cookies pour assurer son bon fonctionnement
              et am&eacute;liorer votre exp&eacute;rience. Les types de cookies
              utilis&eacute;s sont :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Cookies strictement n&eacute;cessaires :</strong> essentiels au
                fonctionnement du site, ils ne peuvent pas &ecirc;tre d&eacute;sactiv&eacute;s.
              </li>
              <li>
                <strong>Cookies analytiques :</strong> nous permettent de mesurer
                l&apos;audience et d&apos;analyser la navigation pour am&eacute;liorer nos
                services.
              </li>
              <li>
                <strong>Cookies de pr&eacute;f&eacute;rences :</strong> permettent de
                m&eacute;moriser vos choix (th&egrave;me sombre, langue, etc.).
              </li>
            </ul>
            <p className="mt-3">
              Vous pouvez g&eacute;rer vos pr&eacute;f&eacute;rences de cookies &agrave; tout
              moment via les param&egrave;tres de votre navigateur.
            </p>
          </div>

          {/* 8. Transferts de donn&eacute;es */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              8. Transferts de donn&eacute;es
            </h2>
            <p>
              Certaines de vos donn&eacute;es peuvent &ecirc;tre transf&eacute;r&eacute;es vers
              des pays situ&eacute;s hors de l&apos;Union europ&eacute;enne, notamment dans
              le cadre de l&apos;h&eacute;bergement de notre plateforme (Vercel Inc.,
              &Eacute;tats-Unis). Ces transferts sont encadr&eacute;s par des garanties
              appropri&eacute;es conform&eacute;ment au RGPD, incluant les clauses
              contractuelles types de la Commission europ&eacute;enne.
            </p>
          </div>

          {/* 9. S&eacute;curit&eacute; des donn&eacute;es */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              9. S&eacute;curit&eacute; des donn&eacute;es
            </h2>
            <p>
              Nous mettons en &oelig;uvre des mesures techniques et
              organisationnelles appropri&eacute;es pour assurer la s&eacute;curit&eacute; de
              vos donn&eacute;es personnelles, notamment : le chiffrement des
              donn&eacute;es en transit (HTTPS/TLS), le contr&ocirc;le d&apos;acc&egrave;s
              strict, la surveillance continue de notre infrastructure, et la
              sensibilisation de nos &eacute;quipes &agrave; la protection des
              donn&eacute;es.
            </p>
          </div>

          {/* 10. Modifications */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              10. Modifications de la politique
            </h2>
            <p>
              Nous nous r&eacute;servons le droit de modifier la pr&eacute;sente politique
              de confidentialit&eacute; &agrave; tout moment. Toute modification sera
              publi&eacute;e sur cette page avec une date de mise &agrave; jour. Nous vous
              encourageons &agrave; consulter r&eacute;guli&egrave;rement cette page pour
              rester inform&eacute; de notre politique de protection des donn&eacute;es.
            </p>
          </div>

          {/* 11. Contact DPO */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              11. Contact DPO
            </h2>
            <p>
              Pour toute question relative &agrave; la protection de vos donn&eacute;es
              personnelles ou pour exercer vos droits, vous pouvez contacter
              notre D&eacute;l&eacute;gu&eacute; &agrave; la Protection des Donn&eacute;es
              (DPO) :
            </p>
            <div className="bg-[var(--bg-elevated)] rounded-xl p-4 mt-3">
              <p>
                Email :{' '}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-[#1B6FC2] hover:underline font-medium"
                >
                  {COMPANY.email}
                </a>
              </p>
              <p>Adresse : [Adresse du si&egrave;ge social]</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
