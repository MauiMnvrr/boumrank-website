export async function GET() {
  const content = `# BoumRank
> Plateforme SaaS de gamification pour les commerces locaux. Transforme les avis clients en jeux et recompenses.

## Qu'est-ce que BoumRank ?
BoumRank est une plateforme qui aide les commerces locaux (restaurants, salons, hotels, etc.) a collecter plus d'avis Google, fideliser leurs clients et augmenter leur chiffre d'affaires grace a la gamification. Les clients scannent un QR Code, jouent a des mini-jeux (machine a sous, roue de la fortune, blackjack) et gagnent des recompenses en echange d'un avis ou d'une action sur les reseaux sociaux. Une IA valide automatiquement les preuves en moins de 3 secondes.

## Pages principales
- [Accueil](https://www.boumrank.com) - Presentation de la plateforme
- [Tarifs](https://www.boumrank.com/tarifs) - Plans a partir de 65 euros/mois
- [Comment ca marche](https://www.boumrank.com/comment-ca-marche) - Guide etape par etape
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
- L'Essentiel : 65 euros/mois - Scans illimites, 1 jeu, dashboard
- Performance : 79 euros/mois - Tous les jeux, IA, branding complet, support 24/7
- Enterprise : Sur mesure - Multi-comptes, white-label, API custom

## Contact
- Site : https://www.boumrank.com
- App : https://app.boumrank.com
- Email : contact@boumrank.com
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
