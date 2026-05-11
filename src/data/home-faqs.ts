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
    question: 'Vous avez un essai gratuit ?',
    answer:
      "Oui, 14 jours pour tester la bête en conditions réelles, sans carte bancaire demandée au départ. Vous activez, vous mesurez, vous décidez.",
  },
  {
    question: 'Mes clients vont-ils vraiment jouer ? Ils ne sont pas des gamers.',
    answer:
      "C'est justement le point. Le jeu n'est pas pour les gamers — c'est pour tout le monde. Une roue qui tourne, ça parle à votre grand-mère comme à l'ado de 14 ans. 89 % des scans aboutissent à une partie lancée sur nos données beta.",
  },
  {
    question: "Est-ce que peux configurer le minimum d'achat pour la récupération des lots ?",
    answer:
      "Oui, vous fixez un seuil unique pour l'ensemble de vos lots. Que ce soit 0 €, 5 € ou 10 €, vous définissez le montant minimum de commande nécessaire pour qu'un client puisse repartir avec son lot.",
  },
  {
    question: 'Est-ce que je peux personnaliser le jeu aux couleurs de mon commerce ?',
    answer:
      "C'est même notre signature. 13 templates de départ, palette de couleurs 100 % custom, votre logo, votre typo, vos illustrations. Vos clients jouent chez vous, pas chez BoumRank.",
  },
  {
    question: "Vous êtes qui, en fait ? Startup française ? Équipe à l'étranger ?",
    answer:
      "Équipe 100 % française, basés à Marseille, programme Pépite Aix-Marseille Université. Support en français, facturation en français, fondateurs joignables sur WhatsApp. Pas de hotline à Bangalore.",
  },
  {
    question: 'Je suis nul en tech. Est-ce que je vais y arriver ?',
    answer:
      "Oui, et sans transpirer. Le setup prend 5 minutes chrono : vous choisissez votre jeu dans une liste, vous glissez votre logo, vous cliquez sur « Activer ». Nous vous envoyons le QR code imprimable par mail. Si vous savez poster sur Instagram, vous savez utiliser BoumRank.",
  },
];
