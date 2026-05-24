export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  const content =
    locale === 'en'
      ? `# BoumRank
> SaaS gamification platform for local businesses. Turns customer reviews into games and rewards.

## What is BoumRank?
BoumRank is a platform that helps local businesses (restaurants, salons, hotels, retail) collect more Google reviews, retain customers, and grow revenue through gamification. Customers scan a QR code, play mini-games (slot machine, fortune wheel, blackjack) and earn rewards in exchange for a review or a social media action. An AI auto-validates proofs in under 3 seconds.

## Main pages
- [Home](https://www.boumrank.com/en) - Platform overview
- [Pricing](https://www.boumrank.com/en/pricing) - One service, three commitments, starting at €59/month
- [Features](https://www.boumrank.com/en/features) - Menu, games, coupons, and dashboard
- [About](https://www.boumrank.com/en/about) - Mission and team
- [Blog](https://www.boumrank.com/en/blog) - Articles on gamification and local marketing
- [Contact](https://www.boumrank.com/en/contact) - Contact form and demo

## Key features
- Customizable mini-games (Slot Machine, Fortune Wheel, Blackjack)
- AI auto-validation (99.8% accuracy)
- QR code, no app to download
- Real-time performance dashboard
- 100% custom branding
- Anti-fraud (duplicates and photo composites detection)
- GDPR-compliant marketing data collection

## Pricing
Single BoumRank service, all features included from day 1 (3 games, 100% custom branding, performance dashboard, sequential campaigns, CSV export, Zapier, priority French support).
3 plans, differing only in commitment length:
- No commitment: €79/month excl. VAT, cancel anytime in one click
- 6 months: €69/month excl. VAT (save €120/year)
- 1 year: €59/month excl. VAT (save €240/year), our best deal

14-day free trial on all plans, no credit card at signup. Monthly recurring Stripe billing, monthly PDF invoice, European GDPR-compliant hosting. For multi-location, franchises, or chains: custom quote via /en/contact (API, dedicated account manager, SLA).

## Contact
- Site: https://www.boumrank.com
- App: https://app.boumrank.com
- Email: support@boumrank.com
`
      : `# BoumRank
> Plateforme SaaS de gamification pour les commerces locaux. Transforme les avis clients en jeux et récompenses.

## Qu'est-ce que BoumRank ?
BoumRank est une plateforme qui aide les commerces locaux (restaurants, salons, hôtels, retail) à collecter plus d'avis Google, fidéliser leurs clients et augmenter leur chiffre d'affaires grâce à la gamification. Les clients scannent un QR code, jouent à des mini-jeux (machine à sous, roue de la fortune, blackjack) et gagnent des récompenses en échange d'un avis ou d'une action sur les réseaux sociaux. Une IA valide automatiquement les preuves en moins de 3 secondes.

## Pages principales
- [Accueil](https://www.boumrank.com) — Présentation de la plateforme
- [Tarifs](https://www.boumrank.com/tarifs) — Un service, trois engagements, à partir de 59 €/mois
- [Fonctionnalités](https://www.boumrank.com/fonctionnalites) — Le menu, les jeux, les coupons et le dashboard
- [À propos](https://www.boumrank.com/a-propos) — Mission et équipe
- [Blog](https://www.boumrank.com/blog) — Articles sur la gamification et le marketing local
- [Contact](https://www.boumrank.com/contact) — Formulaire de contact et démo

## Fonctionnalités clés
- Mini-jeux personnalisables (Machine à Sous, Roue de la Fortune, Blackjack)
- Validation automatique par IA (précision 99,8 %)
- QR code sans application à télécharger
- Dashboard de performance en temps réel
- Branding 100 % personnalisable aux couleurs du commerce
- Anti-fraude (détection de doublons et de montages photo)
- Collecte de données marketing conforme RGPD

## Tarification
Service unique BoumRank, toutes les fonctionnalités incluses dès le jour 1 (les 3 jeux, branding 100 % custom, dashboard Performance, campagnes séquentielles, export CSV, Zapier, support FR prioritaire).
3 offres au choix, qui ne diffèrent que par la durée d'engagement :
- Sans engagement : 79 €/mois HT, résiliable à tout moment en 1 clic
- 6 mois : 69 €/mois HT (économisez 120 €/an)
- 1 an : 59 €/mois HT (économisez 240 €/an), recommandé, meilleur deal

Essai gratuit 14 jours sur les 3 offres, sans carte bancaire à l'inscription. Paiement mensuel récurrent via Stripe, facture PDF mensuelle, hébergement européen conforme RGPD. Pour multi-établissements, franchises, chaînes : devis sur-mesure via /contact (API, account manager dédié, SLA).

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
