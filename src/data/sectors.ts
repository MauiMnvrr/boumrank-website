/**
 * Sector-specific landing page data.
 *
 * Each entry powers `/secteurs/{slug}` (FR) and `/en/sectors/{slug}` (EN).
 * Adding a new sector here + restarting dev is enough — the dynamic route
 * picks it up via generateStaticParams.
 */

export type SectorData = {
  slug: string;
  emoji: string;
  gradient: string;
  accent: string;
  fr: SectorLocale;
  en: SectorLocale;
};

export type SectorLocale = {
  name: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  problemTitle: string;
  problems: string[];
  solutionTitle: string;
  solutions: { title: string; body: string }[];
  stats: { value: string; label: string }[];
  testimonial: { quote: string; author: string; role: string };
  ctaTitle: string;
  ctaSubtitle: string;
  seo: { title: string; description: string };
};

export const SECTORS: SectorData[] = [
  {
    slug: 'restaurants',
    emoji: '🍔',
    gradient: 'linear-gradient(135deg, #1B6FC2 0%, #1E9DAA 100%)',
    accent: '#1B6FC2',
    fr: {
      name: 'Restaurants & bars',
      heroTitle: 'Transformez la fin du repas en ',
      heroHighlight: 'machine à avis Google',
      heroSubtitle:
        'Bistros, pizzerias, brasseries, food trucks : vos clients scannent le QR code, jouent, laissent un avis et reviennent pour leur récompense.',
      problemTitle: 'Ce que vivent les restaurateurs',
      problems: [
        'Les clients satisfaits partent sans laisser d\'avis',
        'Les flyers et cartes de fidélité finissent à la poubelle',
        'Impossible de rivaliser en visibilité locale avec les chaînes',
        'Le bouche-à-oreille reste invisible sur Google',
      ],
      solutionTitle: 'Comment BoumRank résout ça',
      solutions: [
        {
          title: 'QR code sur table ou addition',
          body: 'Le client scanne en fin de repas, quand la satisfaction est au sommet. Zéro app à télécharger.',
        },
        {
          title: 'Mini-jeu (roue, slots, blackjack)',
          body: 'Le jeu déclenche un pic d\'endorphine qui mène naturellement à l\'avis Google.',
        },
        {
          title: 'Récompense à récupérer en boutique',
          body: 'Café offert, dessert, réduction : le client revient sous 7 jours pour l\'encaisser.',
        },
        {
          title: 'Dashboard temps réel',
          body: 'Suivez vos avis, votre note moyenne et votre taux de retour depuis un seul écran.',
        },
      ],
      stats: [
        { value: '+47', label: 'avis Google en 6 semaines' },
        { value: '25%', label: 'de clients qui reviennent' },
        { value: '4.7', label: 'note Google moyenne' },
      ],
      testimonial: {
        quote:
          'On est passé de 3 avis par mois à 12 par semaine. Les clients adorent jouer en attendant l\'addition.',
        author: 'Marco T.',
        role: 'Gérant de pizzeria, Marseille',
      },
      ctaTitle: 'Remplissez votre salle grâce à Google',
      ctaSubtitle: 'Essai gratuit 14 jours, setup en 5 minutes, sans carte bancaire.',
      seo: {
        title: 'BoumRank pour restaurants | Avis Google et fidélisation par le jeu',
        description:
          'Transformez chaque fin de repas en avis Google et en client fidèle. QR code, mini-jeu, récompense : +47 avis en 6 semaines pour votre restaurant.',
      },
    },
    en: {
      name: 'Restaurants & bars',
      heroTitle: 'Turn the end of every meal into a ',
      heroHighlight: 'Google review machine',
      heroSubtitle:
        'Bistros, pizzerias, pubs, food trucks: your customers scan a QR code, play a game, leave a review, and come back for their reward.',
      problemTitle: 'What restaurant owners deal with',
      problems: [
        'Happy customers leave without posting a review',
        'Loyalty cards and flyers end up in the bin',
        'Impossible to compete on local visibility with chains',
        'Word-of-mouth stays invisible on Google',
      ],
      solutionTitle: 'How BoumRank fixes this',
      solutions: [
        {
          title: 'QR code on the table or bill',
          body: 'The customer scans at the end of the meal, when satisfaction peaks. Zero app to download.',
        },
        {
          title: 'Mini-game (wheel, slots, blackjack)',
          body: 'The game triggers an endorphin spike that naturally leads to a Google review.',
        },
        {
          title: 'Reward to collect in-store',
          body: 'Free coffee, dessert, discount: the customer returns within 7 days to redeem it.',
        },
        {
          title: 'Real-time dashboard',
          body: 'Track your reviews, average rating, and return rate from a single screen.',
        },
      ],
      stats: [
        { value: '+47', label: 'Google reviews in 6 weeks' },
        { value: '25%', label: 'of customers who return' },
        { value: '4.7', label: 'average Google rating' },
      ],
      testimonial: {
        quote:
          'We went from 3 reviews a month to 12 a week. Customers love playing while waiting for the bill.',
        author: 'Marco T.',
        role: 'Pizzeria owner, Marseille',
      },
      ctaTitle: 'Fill your restaurant with Google',
      ctaSubtitle: '14-day free trial, 5-minute setup, no credit card.',
      seo: {
        title: 'BoumRank for restaurants | Google reviews and gamified loyalty',
        description:
          'Turn every meal into a Google review and a returning customer. QR code, mini-game, reward: +47 reviews in 6 weeks for your restaurant.',
      },
    },
  },
  {
    slug: 'salons-beaute',
    emoji: '💇',
    gradient: 'linear-gradient(135deg, #E84393 0%, #7C5CFC 100%)',
    accent: '#E84393',
    fr: {
      name: 'Salons & beauté',
      heroTitle: 'Capturez l\'avis de la cliente heureuse ',
      heroHighlight: 'avant qu\'elle repasse la porte',
      heroSubtitle:
        'Coiffure, barbier, esthétique, onglerie : activez vos clientes en sortie de prestation, au pic de satisfaction.',
      problemTitle: 'Ce que vivent les gérants de salons',
      problems: [
        'Les clientes satisfaites oublient de laisser un avis',
        'Les rappels SMS/email sont ignorés ou jugés intrusifs',
        'La concurrence locale joue sur le volume d\'avis',
        'Les no-shows coûtent cher sans levier de fidélisation',
      ],
      solutionTitle: 'Comment BoumRank résout ça',
      solutions: [
        {
          title: 'QR code au miroir ou à l\'accueil',
          body: 'La cliente scanne en sortie de fauteuil, cheveux parfaits, sourire aux lèvres. Timing idéal.',
        },
        {
          title: 'Mini-jeu fun et rapide',
          body: 'Un tour de roue de 15 secondes qui transforme l\'attente du rendu en moment de plaisir.',
        },
        {
          title: 'Récompense personnalisable',
          body: 'Soin offert, réduction prochaine visite, produit : vous choisissez ce qui fait revenir.',
        },
        {
          title: 'Boost Instagram intégré',
          body: 'Les clientes partagent leur gain sur Insta, vos followers décollent organiquement.',
        },
      ],
      stats: [
        { value: '+38', label: 'avis Google en 8 semaines' },
        { value: '+1', label: 'prestation supplémentaire par mois' },
        { value: '2x', label: 'followers Instagram' },
      ],
      testimonial: {
        quote:
          'Mes clientes jouent en attendant que la couleur pose. Résultat : 5 étoiles et elles reviennent 10 jours plus tôt.',
        author: 'Sarah M.',
        role: 'Gérante de salon, Lyon',
      },
      ctaTitle: 'Remplissez votre agenda grâce aux avis',
      ctaSubtitle: 'Essai gratuit 14 jours, setup en 5 minutes, sans carte bancaire.',
      seo: {
        title: 'BoumRank pour salons de beauté | Avis Google et fidélisation gamifiée',
        description:
          'Capturez l\'avis de vos clientes au pic de satisfaction. QR code, mini-jeu, récompense : +38 avis en 8 semaines pour votre salon.',
      },
    },
    en: {
      name: 'Salons & beauty',
      heroTitle: 'Capture the happy client\'s review ',
      heroHighlight: 'before she walks out the door',
      heroSubtitle:
        'Hair salons, barbershops, aesthetics, nail studios: engage your clients at the end of their appointment, when satisfaction peaks.',
      problemTitle: 'What salon owners deal with',
      problems: [
        'Happy clients forget to leave a review',
        'SMS/email reminders get ignored or feel intrusive',
        'Local competition plays the review volume game',
        'No-shows are costly with no loyalty lever',
      ],
      solutionTitle: 'How BoumRank fixes this',
      solutions: [
        {
          title: 'QR code at the mirror or front desk',
          body: 'The client scans right after the service, hair perfect, smile on. Perfect timing.',
        },
        {
          title: 'Quick and fun mini-game',
          body: 'A 15-second wheel spin that turns the wait into a delight moment.',
        },
        {
          title: 'Customizable reward',
          body: 'Free treatment, next-visit discount, product sample: you choose what brings them back.',
        },
        {
          title: 'Built-in Instagram boost',
          body: 'Clients share their win on Insta, your followers grow organically.',
        },
      ],
      stats: [
        { value: '+38', label: 'Google reviews in 8 weeks' },
        { value: '+1', label: 'extra appointment per month' },
        { value: '2x', label: 'Instagram followers' },
      ],
      testimonial: {
        quote:
          'My clients play while the color sets. Result: 5 stars and they come back 10 days earlier.',
        author: 'Sarah M.',
        role: 'Salon owner, Lyon',
      },
      ctaTitle: 'Fill your calendar with reviews',
      ctaSubtitle: '14-day free trial, 5-minute setup, no credit card.',
      seo: {
        title: 'BoumRank for beauty salons | Google reviews and gamified loyalty',
        description:
          'Capture your clients\' reviews at peak satisfaction. QR code, mini-game, reward: +38 reviews in 8 weeks for your salon.',
      },
    },
  },
  {
    slug: 'boutiques-retail',
    emoji: '🛍️',
    gradient: 'linear-gradient(135deg, #2EAE6D 0%, #1E9DAA 100%)',
    accent: '#2EAE6D',
    fr: {
      name: 'Boutiques & retail',
      heroTitle: 'Remplacez la carte de fidélité par un ',
      heroHighlight: 'jackpot qui fait revenir',
      heroSubtitle:
        'Concept store, caviste, fleuriste, librairie, déco : gamifiez la fidélité et doublez votre liste d\'abonnés en 6 semaines.',
      problemTitle: 'Ce que vivent les commerçants',
      problems: [
        'Les cartes de fidélité papier sont perdues ou oubliées',
        'Le client achète une fois et ne revient pas',
        'Pas de visibilité en ligne face aux pure players',
        'Le programme fidélité digital coûte cher et demande du dev',
      ],
      solutionTitle: 'Comment BoumRank résout ça',
      solutions: [
        {
          title: 'QR code en caisse ou sur le sac',
          body: 'Le client scanne après l\'achat, quand il est content de sa trouvaille. Naturel et fluide.',
        },
        {
          title: 'Mini-jeu addictif',
          body: 'Roue, slots ou blackjack : le client parle de son gain à ses amis, qui viennent essayer.',
        },
        {
          title: 'Récompense physique',
          body: 'Bon d\'achat, article offert, accès vente privée : le client revient dans la semaine.',
        },
        {
          title: 'Croissance organique',
          body: 'Chaque partie générée = un avis Google + un potentiel partage sur les réseaux.',
        },
      ],
      stats: [
        { value: '+18%', label: 'de panier moyen' },
        { value: '2x', label: 'abonnés Insta en 6 semaines' },
        { value: '+32', label: 'avis Google en 2 mois' },
      ],
      testimonial: {
        quote:
          'La carte de fidélité, personne ne la sortait. Le jeu BoumRank, tout le monde le demande.',
        author: 'Julie R.',
        role: 'Gérante concept store, Aix-en-Provence',
      },
      ctaTitle: 'Fidélisez sans carte, avec du jeu',
      ctaSubtitle: 'Essai gratuit 14 jours, setup en 5 minutes, sans carte bancaire.',
      seo: {
        title: 'BoumRank pour boutiques | Fidélisation gamifiée et avis Google',
        description:
          'Remplacez la carte de fidélité par un mini-jeu qui fait revenir vos clients. +18% de panier moyen, +32 avis Google en 2 mois.',
      },
    },
    en: {
      name: 'Boutiques & retail',
      heroTitle: 'Replace the loyalty card with a ',
      heroHighlight: 'jackpot that brings them back',
      heroSubtitle:
        'Concept stores, wine shops, florists, bookshops, home decor: gamify loyalty and double your subscriber list in 6 weeks.',
      problemTitle: 'What shop owners deal with',
      problems: [
        'Paper loyalty cards get lost or forgotten',
        'Customers buy once and never return',
        'No online visibility against e-commerce giants',
        'Digital loyalty programs are expensive and require dev work',
      ],
      solutionTitle: 'How BoumRank fixes this',
      solutions: [
        {
          title: 'QR code at checkout or on the bag',
          body: 'The customer scans after purchase, happy with their find. Natural and seamless.',
        },
        {
          title: 'Addictive mini-game',
          body: 'Wheel, slots, or blackjack: the customer tells friends about their win, who come to try.',
        },
        {
          title: 'Physical reward',
          body: 'Store credit, free item, private sale access: the customer returns within the week.',
        },
        {
          title: 'Organic growth',
          body: 'Every game played = a Google review + a potential social share.',
        },
      ],
      stats: [
        { value: '+18%', label: 'average basket size' },
        { value: '2x', label: 'Insta followers in 6 weeks' },
        { value: '+32', label: 'Google reviews in 2 months' },
      ],
      testimonial: {
        quote:
          'Nobody ever took out the loyalty card. The BoumRank game, everyone asks for it.',
        author: 'Julie R.',
        role: 'Concept store owner, Aix-en-Provence',
      },
      ctaTitle: 'Loyalty without cards, with play',
      ctaSubtitle: '14-day free trial, 5-minute setup, no credit card.',
      seo: {
        title: 'BoumRank for retail | Gamified loyalty and Google reviews',
        description:
          'Replace the loyalty card with a mini-game that brings customers back. +18% average basket, +32 Google reviews in 2 months.',
      },
    },
  },
];

export const SECTOR_SLUGS = SECTORS.map((s) => s.slug);

export function getSectorBySlug(slug: string): SectorData | undefined {
  return SECTORS.find((s) => s.slug === slug);
}
