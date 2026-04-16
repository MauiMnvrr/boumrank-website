/**
 * BoumRank — Home FAQ
 *
 * Plain data module (no 'use client' directive) so it can be safely imported by
 * both Server Components (page.tsx → SchemaOrg JSON-LD) and Client Components
 * (FAQ.tsx → accordion).
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const HOME_FAQS: FaqItem[] = [
  {
    question: 'Je suis nul en tech. Est-ce que je vais y arriver ?',
    answer:
      "Oui, et sans transpirer. Le setup prend 5 minutes chrono : vous choisissez votre jeu dans une liste, vous glissez votre logo, vous cliquez sur « Activer ». Nous vous envoyons le QR code imprimable par mail. Si vous savez poster sur Instagram, vous savez utiliser BoumRank.",
  },
  {
    question: "Combien d'avis Google je peux espérer par mois ?",
    answer:
      "Ça dépend de votre flux client, mais nos clients beta génèrent entre 15 et 60 avis supplémentaires par mois dès les 4 premières semaines. Le calculateur ROI plus haut vous donne une estimation personnalisée selon votre volume de clients et votre ticket moyen.",
  },
  {
    question: 'Mes clients vont-ils vraiment jouer ? Ils ne sont pas des gamers.',
    answer:
      "C'est justement le point. Le jeu n'est pas pour les gamers — c'est pour tout le monde. Une roue qui tourne, ça parle à votre grand-mère comme à l'ado de 14 ans. 89 % des scans aboutissent à une partie lancée sur nos données beta.",
  },
  {
    question: "Et si un client triche avec une capture d'écran du coupon ?",
    answer:
      "Impossible. Le coupon est validé en caisse par un swipe physique sur votre dashboard : le caissier vérifie le minimum d'achat, swipe, et le coupon passe en statut « consommé » définitivement. Une capture d'écran d'un coupon déjà consommé ne fait rien — c'est un bout de pixels inerte.",
  },
  {
    question: "Je peux configurer le minimum d'achat pour que le coupon soit valable ?",
    answer:
      "Oui, c'est même obligatoire pour activer un lot. Vous définissez le seuil (ex : 5 €, 15 €, 30 €) selon la valeur du lot. Le caissier voit le minimum affiché à l'écran au moment du swipe et valide en 2 secondes.",
  },
  {
    question: 'Est-ce que je peux personnaliser le jeu aux couleurs de mon commerce ?',
    answer:
      "C'est même notre signature. 13 templates de départ, palette de couleurs 100 % custom, votre logo, votre typo, vos illustrations. Vos clients jouent chez vous, pas chez BoumRank.",
  },
  {
    question: 'Combien de lots différents je peux mettre en jeu ?',
    answer:
      "Autant que vous voulez, avec les probabilités que vous choisissez. Café offert (30 %), dessert offert (20 %), -10 % (15 %), rien du tout (35 %) — vous pilotez chaque case. Vous pouvez changer la config à tout moment, elle se met à jour en temps réel.",
  },
  {
    question: "L'abonnement m'engage combien de temps ?",
    answer:
      "Zéro engagement. Vous résiliez en un clic depuis votre dashboard, à tout moment. On préfère qu'un client parte content qu'il reste coincé et frustré.",
  },
  {
    question: 'Il faut une appli à télécharger pour mes clients ?',
    answer:
      "Aucune. Le client scanne le QR code, le jeu s'ouvre direct dans son navigateur mobile (Safari, Chrome, peu importe). Zéro friction, zéro téléchargement, zéro perte de clients à l'étape 1.",
  },
  {
    question: 'Ça marche pour les commerces sans fiche Google bien remplie ?',
    answer:
      "Ça marche encore mieux. Vous pouvez démarrer BoumRank même avec 5 avis Google, et en ajouter 40 en un mois. C'est souvent nos clients qui ont le moins d'avis au départ qui voient les plus grosses progressions.",
  },
  {
    question: 'Mes données client sont chez qui ? Vous les revendez ?',
    answer:
      "Jamais. Vos données clients sont chez vous, hébergées en Europe, conformes RGPD. Zéro revente, zéro partage. Vous exportez votre base en CSV quand vous voulez.",
  },
  {
    question: 'Je peux voir les stats de qui a joué, qui a gagné, qui est revenu ?',
    answer:
      "Oui, c'est le dashboard Performance. Nombre de scans, taux de conversion en avis, coupons émis, coupons consommés, temps moyen entre le scan et le retour en caisse. Tout est là, sans Excel.",
  },
  {
    question: 'Si ma connexion internet tombe, le caissier peut quand même valider un coupon ?',
    answer:
      "Le swipe caissier nécessite une connexion. Sur coupure réseau, vous validez manuellement à la remise en ligne (en moins de 30 secondes). Aucun coupon ne se perd.",
  },
  {
    question: 'Vous avez un essai gratuit ?',
    answer:
      "Oui, 14 jours pour tester la bête en conditions réelles, sans carte bancaire demandée au départ. Vous activez, vous mesurez, vous décidez.",
  },
  {
    question: "Vous êtes qui, en fait ? Startup française ? Équipe à l'étranger ?",
    answer:
      "Équipe 100 % française, basés à Marseille, programme Pépite Aix-Marseille Université. Support en français, facturation en français, fondateurs joignables sur WhatsApp. Pas de hotline à Bangalore.",
  },
];
