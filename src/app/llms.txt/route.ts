export async function GET() {
  const content = `# BoumRank
> Plateforme SaaS de gamification pour les commerces locaux. Transforme les avis clients en jeux et recompenses.

## Qu'est-ce que BoumRank ?
BoumRank est une plateforme qui aide les commerces locaux (restaurants, salons, hotels, etc.) a collecter plus d'avis Google, fideliser leurs clients et augmenter leur chiffre d'affaires grace a la gamification. Les clients scannent un QR Code, jouent a des mini-jeux (machine a sous, roue de la fortune, blackjack) et gagnent des recompenses en echange d'un avis ou d'une action sur les reseaux sociaux. Une IA valide automatiquement les preuves en moins de 3 secondes.

## Pages principales
- [Accueil](https://www.boumrank.com) - Presentation de la plateforme
- [Tarifs](https://www.boumrank.com/tarifs) - Un service, trois engagements, a partir de 59 euros/mois
- [Fonctionnalités](https://www.boumrank.com/fonctionnalites) - Le menu, les jeux, les coupons et le dashboard
- [A propos](https://www.boumrank.com/a-propos) - Mission et equipe
- [Blog](https://www.boumrank.com/blog) - Articles sur la gamification et le marketing local
- [Contact](https://www.boumrank.com/contact) - Formulaire de contact et demo

## Fonctionnalites cles
- Mini-jeux personnalisables (Machine a Sous, Roue de la Fortune, Blackjack)
- Validation automatique par IA (precision 99.8%)
- QR Code sans application a telecharger
- Dashboard de performance en temps reel
- Branding personnalisable aux couleurs du commerce
- Anti-fraude (detection de doublons et montages)
- Collecte de donnees marketing (RGPD)

## Tarification
Service unique BoumRank, toutes les features incluses des le jour 1 (les 3 jeux, branding 100% custom, dashboard Performance, campagnes sequentielles, export CSV, Zapier, support FR prioritaire).
3 offres au choix, qui ne different que par la duree d'engagement :
- Sans engagement : 79 euros/mois HT, resiliable a tout moment en 1 clic
- 6 mois : 69 euros/mois HT (economisez 120 euros/an)
- 1 an : 59 euros/mois HT (economisez 240 euros/an), recommande, meilleur deal

Essai gratuit 14 jours sur les 3 offres, sans carte bancaire a l'inscription. Paiement mensuel recurrent via Stripe, facture PDF mensuelle, hebergement europeen RGPD. Pour multi-etablissements, franchises, chaines : devis sur-mesure via /contact (API, account manager dedie, SLA).

## Contact
- Site : https://www.boumrank.com
- App : https://app.boumrank.com
- Email : support@boumrank.com
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
