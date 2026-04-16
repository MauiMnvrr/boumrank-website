import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SITE_URL, SITE_NAME, COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Conditions g\u00e9n\u00e9rales de vente',
  description:
    "Conditions g\u00e9n\u00e9rales de vente et d'utilisation de la plateforme BoumRank.",
  alternates: { canonical: `${SITE_URL}/conditions-generales` },
};

export default function ConditionsGeneralesPage() {
  return (
    <section className="pt-32 pb-24 bg-[var(--bg-primary)] min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <Breadcrumbs
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Conditions g\u00e9n\u00e9rales' },
          ]}
        />

        <div className="mt-12 mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase mb-4 text-[var(--text-primary)]">
            Conditions g&eacute;n&eacute;rales{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">
              de vente
            </span>
          </h1>
          <p className="text-[var(--text-secondary)]">
            Derni&egrave;re mise &agrave; jour : 16 avril 2026
          </p>
        </div>

        <div className="space-y-12 text-[var(--text-body)] leading-relaxed">
          {/* 1. Objet */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              1. Objet
            </h2>
            <p>
              Les pr&eacute;sentes Conditions G&eacute;n&eacute;rales de Vente (ci-apr&egrave;s
              &laquo; CGV &raquo;) ont pour objet de d&eacute;finir les conditions dans
              lesquelles {SITE_NAME} (ci-apr&egrave;s &laquo; le Prestataire &raquo;)
              fournit ses services de gamification et de gestion d&apos;avis clients
              (ci-apr&egrave;s &laquo; les Services &raquo;) &agrave; ses clients
              professionnels (ci-apr&egrave;s &laquo; le Client &raquo;).
            </p>
          </div>

          {/* 2. Acceptation des conditions */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              2. Acceptation des conditions
            </h2>
            <p>
              L&apos;inscription sur la plateforme {SITE_NAME} et/ou l&apos;utilisation
              des Services implique l&apos;acceptation pleine et enti&egrave;re des
              pr&eacute;sentes CGV. Le Client reconna&icirc;t en avoir pris connaissance
              et les accepter sans r&eacute;serve.
            </p>
            <p className="mt-3">
              {SITE_NAME} se r&eacute;serve le droit de modifier les pr&eacute;sentes CGV
              &agrave; tout moment. Les modifications entrent en vigueur d&egrave;s leur
              publication sur le site. Le Client sera inform&eacute; par email de
              toute modification substantielle.
            </p>
          </div>

          {/* 3. Description du service */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              3. Description du service
            </h2>
            <p className="mb-3">
              {SITE_NAME} est une plateforme SaaS (Software as a Service) qui
              permet aux commerces de :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Gamifier la collecte d&apos;avis clients via des jeux interactifs
                (machine &agrave; sous, roue de la fortune, blackjack)
              </li>
              <li>
                G&eacute;n&eacute;rer des QR Codes personnalis&eacute;s pour l&apos;acc&egrave;s aux
                jeux
              </li>
              <li>
                Valider automatiquement les actions clients gr&acirc;ce &agrave;
                l&apos;intelligence artificielle
              </li>
              <li>
                Suivre les performances via un tableau de bord d&eacute;di&eacute;
              </li>
              <li>
                Personnaliser l&apos;exp&eacute;rience aux couleurs de la marque du Client
              </li>
            </ul>
          </div>

          {/* 4. Inscription et compte */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              4. Inscription et compte
            </h2>
            <p>
              Pour acc&eacute;der aux Services, le Client doit cr&eacute;er un compte sur
              la plateforme en fournissant des informations exactes et
              compl&egrave;tes. Le Client est responsable de la confidentialit&eacute; de
              ses identifiants de connexion et de toutes les activit&eacute;s
              effectu&eacute;es sous son compte.
            </p>
            <p className="mt-3">
              Le Client s&apos;engage &agrave; informer imm&eacute;diatement {SITE_NAME} de
              toute utilisation non autoris&eacute;e de son compte ou de toute
              atteinte &agrave; la s&eacute;curit&eacute;.
            </p>
          </div>

          {/* 5. Tarifs et paiement */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              5. Tarifs et paiement
            </h2>
            <p>
              Les tarifs applicables sont ceux en vigueur au moment de la
              souscription, tels qu&apos;indiqu&eacute;s sur la page{' '}
              <a
                href="/tarifs"
                className="text-[#1B6FC2] hover:underline font-medium"
              >
                Tarifs
              </a>{' '}
              du site.
            </p>
            <p className="mt-3">
              Les prix sont indiqu&eacute;s en euros hors taxes (HT). La TVA
              applicable sera ajout&eacute;e au moment de la facturation
              conform&eacute;ment &agrave; la l&eacute;gislation en vigueur.
            </p>
            <p className="mt-3">
              Le paiement s&apos;effectue par carte bancaire via notre prestataire de
              paiement s&eacute;curis&eacute;. Le Client autorise le pr&eacute;l&egrave;vement
              automatique &agrave; chaque &eacute;ch&eacute;ance (mensuelle ou annuelle selon
              le plan choisi).
            </p>
            <p className="mt-3">
              En cas de retard de paiement, des p&eacute;nalit&eacute;s de retard seront
              appliqu&eacute;es au taux annuel de trois fois le taux d&apos;int&eacute;r&ecirc;t
              l&eacute;gal, ainsi qu&apos;une indemnit&eacute; forfaitaire de 40 euros pour
              frais de recouvrement.
            </p>
          </div>

          {/* 6. Dur&eacute;e et r&eacute;siliation */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              6. Dur&eacute;e et r&eacute;siliation
            </h2>
            <p>
              Les abonnements mensuels sont conclus pour une dur&eacute;e
              ind&eacute;termin&eacute;e, sans engagement minimum. Le Client peut
              r&eacute;silier son abonnement &agrave; tout moment depuis son espace
              client. La r&eacute;siliation prend effet &agrave; la fin de la p&eacute;riode
              de facturation en cours.
            </p>
            <p className="mt-3">
              Les abonnements annuels sont conclus pour une dur&eacute;e de 12 mois
              renouvelable tacitement. Le Client peut s&apos;opposer au
              renouvellement en notifiant {SITE_NAME} au moins 30 jours avant
              l&apos;&eacute;ch&eacute;ance.
            </p>
            <p className="mt-3">
              {SITE_NAME} se r&eacute;serve le droit de suspendre ou r&eacute;silier le
              compte du Client en cas de violation des pr&eacute;sentes CGV, sans
              pr&eacute;judice de tout dommage et int&eacute;r&ecirc;t.
            </p>
          </div>

          {/* 7. Obligations de l&apos;utilisateur */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              7. Obligations de l&apos;utilisateur
            </h2>
            <p className="mb-3">Le Client s&apos;engage &agrave; :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Utiliser les Services conform&eacute;ment &agrave; leur destination et aux
                lois en vigueur
              </li>
              <li>
                Ne pas utiliser les Services &agrave; des fins frauduleuses ou
                contraires aux bonnes m&oelig;urs
              </li>
              <li>
                Respecter les droits de propri&eacute;t&eacute; intellectuelle de{' '}
                {SITE_NAME} et des tiers
              </li>
              <li>
                Ne pas tenter de contourner les mesures de s&eacute;curit&eacute; de la
                plateforme
              </li>
              <li>
                Fournir des informations exactes et &agrave; jour lors de
                l&apos;inscription et de l&apos;utilisation des Services
              </li>
              <li>
                Ne pas inciter &agrave; la publication de faux avis ou de
                t&eacute;moignages trompeurs
              </li>
            </ul>
          </div>

          {/* 8. Propri&eacute;t&eacute; intellectuelle */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              8. Propri&eacute;t&eacute; intellectuelle
            </h2>
            <p>
              La plateforme {SITE_NAME}, son code source, son design, ses
              fonctionnalit&eacute;s et son contenu sont la propri&eacute;t&eacute; exclusive
              de {SITE_NAME}. L&apos;abonnement conf&egrave;re au Client un droit
              d&apos;utilisation non exclusif, non transf&eacute;rable et limit&eacute; &agrave;
              la dur&eacute;e de l&apos;abonnement.
            </p>
            <p className="mt-3">
              Le Client conserve la propri&eacute;t&eacute; de ses donn&eacute;es et contenus
              import&eacute;s sur la plateforme (logo, branding, etc.). Il accorde
              &agrave; {SITE_NAME} une licence limit&eacute;e d&apos;utilisation de ces
              contenus dans le cadre de la fourniture des Services.
            </p>
          </div>

          {/* 9. Responsabilit&eacute; */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              9. Responsabilit&eacute;
            </h2>
            <p>
              {SITE_NAME} s&apos;engage &agrave; fournir les Services avec diligence et
              selon les r&egrave;gles de l&apos;art. Il s&apos;agit d&apos;une obligation de
              moyens et non de r&eacute;sultat.
            </p>
            <p className="mt-3">
              {SITE_NAME} ne saurait &ecirc;tre tenu responsable des dommages
              indirects, tels que la perte de chiffre d&apos;affaires, de clients ou
              de donn&eacute;es, r&eacute;sultant de l&apos;utilisation ou de
              l&apos;impossibilit&eacute; d&apos;utiliser les Services.
            </p>
            <p className="mt-3">
              La responsabilit&eacute; totale de {SITE_NAME} est limit&eacute;e au montant
              des sommes effectivement pay&eacute;es par le Client au cours des 12
              derniers mois pr&eacute;c&eacute;dant l&apos;&eacute;v&eacute;nement donnant lieu &agrave;
              responsabilit&eacute;.
            </p>
          </div>

          {/* 10. Donn&eacute;es personnelles */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              10. Donn&eacute;es personnelles
            </h2>
            <p>
              {SITE_NAME} traite les donn&eacute;es personnelles du Client
              conform&eacute;ment &agrave; sa{' '}
              <a
                href="/politique-de-confidentialite"
                className="text-[#1B6FC2] hover:underline font-medium"
              >
                Politique de confidentialit&eacute;
              </a>
              , accessible depuis le site. Le Client est invit&eacute; &agrave; en
              prendre connaissance.
            </p>
          </div>

          {/* 11. Droit applicable et juridiction */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              11. Droit applicable et juridiction
            </h2>
            <p>
              Les pr&eacute;sentes CGV sont r&eacute;gies par le droit fran&ccedil;ais. En
              cas de litige relatif &agrave; l&apos;interpr&eacute;tation ou &agrave;
              l&apos;ex&eacute;cution des pr&eacute;sentes, les parties s&apos;efforceront de
              trouver une solution amiable. &Agrave; d&eacute;faut, les tribunaux
              comp&eacute;tents de Paris seront seuls comp&eacute;tents.
            </p>
            <p className="mt-3">
              Si une clause des pr&eacute;sentes CGV est d&eacute;clar&eacute;e nulle ou
              inapplicable, les autres dispositions resteront en vigueur.
            </p>
          </div>

          {/* 12. Contact */}
          <div>
            <h2 className="text-2xl font-extrabold uppercase text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
              12. Contact
            </h2>
            <p>
              Pour toute question relative aux pr&eacute;sentes CGV, vous pouvez nous
              contacter :
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
              <p>
                Courrier : [Adresse du si&egrave;ge social]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
