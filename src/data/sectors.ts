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
      heroHighlight: 'machine a avis Google',
      heroSubtitle:
        'Bistros, pizzerias, brasseries, food trucks : vos clients scannent le QR code, jouent, laissent un avis et reviennent pour leur recompense.',
      problemTitle: 'Ce que vivent les restaurateurs',
      problems: [
        'Les clients satisfaits partent sans laisser d\'avis',
        'Les flyers et cartes de fidelite finissent a la poubelle',
        'Impossible de rivaliser en visibilite locale avec les chaines',
        'Le bouche-a-oreille reste invisible sur Google',
      ],
      solutionTitle: 'Comment BoumRank resout ca',
      solutions: [
        {
          title: 'QR code sur table ou addition',
          body: 'Le client scanne en fin de repas, quand la satisfaction est au sommet. Zero app a telecharger.',
        },
        {
          title: 'Mini-jeu (roue, slots, blackjack)',
          body: 'Le jeu declenche un pic d\'endorphine qui mene naturellement a l\'avis Google.',
        },
        {
          title: 'Recompense a recuperer en boutique',
          body: 'Cafe offert, dessert, reduction : le client revient sous 7 jours pour l\'encaisser.',
        },
        {
          title: 'Dashboard temps reel',
          body: 'Suivez vos avis, votre note moyenne et votre taux de retour depuis un seul ecran.',
        },
      ],
      stats: [
        { value: '+47', label: 'avis Google en 6 semaines' },
        { value: '25%', label: 'de taux de retour' },
        { value: '4.7', label: 'note moyenne atteinte' },
      ],
      testimonial: {
        quote:
          'On est passe de 3 avis par mois a 12 par semaine. Les clients adorent jouer en attendant l\'addition.',
        author: 'Marco T.',
        role: 'Gerant de pizzeria, Marseille',
      },
      ctaTitle: 'Remplissez votre salle grace a Google',
      ctaSubtitle: 'Essai gratuit 14 jours, setup en 5 minutes, sans carte bancaire.',
      seo: {
        title: 'BoumRank pour restaurants | Avis Google et fidelisation par le jeu',
        description:
          'Transformez chaque fin de repas en avis Google et en client fidele. QR code, mini-jeu, recompense : +47 avis en 6 semaines pour votre restaurant.',
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
        { value: '25%', label: 'return rate' },
        { value: '4.7', label: 'average rating reached' },
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
      name: 'Salons & beaute',
      heroTitle: 'Capturez l\'avis de la cliente heureuse ',
      heroHighlight: 'avant qu\'elle repasse la porte',
      heroSubtitle:
        'Coiffure, barbier, esthetique, onglerie : activez vos clientes en sortie de prestation, au pic de satisfaction.',
      problemTitle: 'Ce que vivent les gerants de salons',
      problems: [
        'Les clientes satisfaites oublient de laisser un avis',
        'Les rappels SMS/email sont ignores ou juges intrusifs',
        'La concurrence locale joue sur le volume d\'avis',
        'Les no-shows coutent cher sans levier de fidelisation',
      ],
      solutionTitle: 'Comment BoumRank resout ca',
      solutions: [
        {
          title: 'QR code au miroir ou a l\'accueil',
          body: 'La cliente scanne en sortie de fauteuil, cheveux parfaits, sourire aux levres. Timing ideal.',
        },
        {
          title: 'Mini-jeu fun et rapide',
          body: 'Un tour de roue de 15 secondes qui transforme l\'attente du rendu en moment de plaisir.',
        },
        {
          title: 'Recompense personnalisable',
          body: 'Soin offert, reduction prochaine visite, produit : vous choisissez ce qui fait revenir.',
        },
        {
          title: 'Boost Instagram integre',
          body: 'Les clientes partagent leur gain sur Insta, vos followers decollent organiquement.',
        },
      ],
      stats: [
        { value: '+38', label: 'avis Google en 8 semaines' },
        { value: '+1', label: 'prestation supplementaire par mois' },
        { value: '2x', label: 'followers Instagram' },
      ],
      testimonial: {
        quote:
          'Mes clientes jouent en attendant que la couleur pose. Resultat : 5 etoiles et elles reviennent 10 jours plus tot.',
        author: 'Sarah M.',
        role: 'Gérante de salon, Lyon',
      },
      ctaTitle: 'Remplissez votre agenda grace aux avis',
      ctaSubtitle: 'Essai gratuit 14 jours, setup en 5 minutes, sans carte bancaire.',
      seo: {
        title: 'BoumRank pour salons de beaute | Avis Google et fidelisation gamifiee',
        description:
          'Capturez l\'avis de vos clientes au pic de satisfaction. QR code, mini-jeu, recompense : +38 avis en 8 semaines pour votre salon.',
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
      heroTitle: 'Remplacez la carte de fidelite par un ',
      heroHighlight: 'jackpot qui fait revenir',
      heroSubtitle:
        'Concept store, caviste, fleuriste, librairie, deco : gamifiez la fidelite et doublez votre liste d\'abonnes en 6 semaines.',
      problemTitle: 'Ce que vivent les commercants',
      problems: [
        'Les cartes de fidelite papier sont perdues ou oubliees',
        'Le client achete une fois et ne revient pas',
        'Pas de visibilite en ligne face aux pure players',
        'Le programme fidelite digital coute cher et demande du dev',
      ],
      solutionTitle: 'Comment BoumRank resout ca',
      solutions: [
        {
          title: 'QR code en caisse ou sur le sac',
          body: 'Le client scanne apres l\'achat, quand il est content de sa trouvaille. Natural et fluide.',
        },
        {
          title: 'Mini-jeu addictif',
          body: 'Roue, slots ou blackjack : le client parle de son gain a ses amis, qui viennent essayer.',
        },
        {
          title: 'Recompense physique',
          body: 'Bon d\'achat, article offert, acces vente privee : le client revient dans la semaine.',
        },
        {
          title: 'Croissance organique',
          body: 'Chaque partie generee = un avis Google + un potentiel partage sur les reseaux.',
        },
      ],
      stats: [
        { value: '+18%', label: 'de panier moyen' },
        { value: '2x', label: 'abonnes Insta en 6 semaines' },
        { value: '+32', label: 'avis Google en 2 mois' },
      ],
      testimonial: {
        quote:
          'La carte de fidelite, personne ne la sortait. Le jeu BoumRank, tout le monde le demande.',
        author: 'Julie R.',
        role: 'Gerante concept store, Aix-en-Provence',
      },
      ctaTitle: 'Fidelisez sans carte, avec du jeu',
      ctaSubtitle: 'Essai gratuit 14 jours, setup en 5 minutes, sans carte bancaire.',
      seo: {
        title: 'BoumRank pour boutiques | Fidelisation gamifiee et avis Google',
        description:
          'Remplacez la carte de fidelite par un mini-jeu qui fait revenir vos clients. +18% de panier moyen, +32 avis Google en 2 mois.',
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
