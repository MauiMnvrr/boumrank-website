export type ThreatLevel = 'haute' | 'moyenne' | 'faible';

export type PriceTier = {
  label: string;
  monthlyPrice: string;
  annualPrice?: string;
  commitment: string;
  note?: string;
};

export type Competitor = {
  slug: string;
  name: string;
  url: string;
  positioning: string;
  threat: ThreatLevel;
  rank: number;
  pricing: {
    entryPrice: string;
    tiers: PriceTier[];
    setupFee?: string;
    freeTrial: string;
    publicPricing: boolean;
  };
  features: {
    games: string;
    gameCount: number | string;
    marketingActions: string[];
    branding: string;
    multiLocation: string;
    antiFraud: string;
  };
  target: {
    segment: string;
    geography: string;
    language: string;
  };
  strategicNote: string;
  sources: string[];
};

export const BOUMRANK_REFERENCE = {
  name: 'BoumRank',
  pricing: {
    essentiel: { monthly: '65 €', annual: '52 €' },
    performance: { monthly: '79 €', annual: '63 €' },
    enterprise: 'Sur devis',
    commitment: 'Aucun',
    freeTrial: 'Oui, sans CB',
  },
  features: {
    games: 'Roue, slot, blackjack',
    gameCount: 3,
    marketingActions: ['Avis Google', 'Instagram', 'Facebook', 'TikTok'],
  },
};

export const competitors: Competitor[] = [
  {
    slug: 'dokaa',
    name: 'Dokaa',
    url: 'https://www.dokaa.app',
    positioning: 'Suite e-réputation et gamification pour restaurateurs FR',
    threat: 'haute',
    rank: 1,
    pricing: {
      entryPrice: '59 €',
      tiers: [
        {
          label: 'Pilotage',
          monthlyPrice: '59 € HT',
          annualPrice: '50 € HT',
          commitment: 'Aucun',
          note: '2 mois offerts en annuel',
        },
        {
          label: 'Performance',
          monthlyPrice: '79 € HT',
          annualPrice: '65 € HT',
          commitment: 'Aucun',
          note: '2 mois offerts en annuel',
        },
        {
          label: 'Roue Cadeau (à la carte)',
          monthlyPrice: '49 € HT',
          commitment: 'Aucun',
        },
        {
          label: 'Enterprise',
          monthlyPrice: 'Sur devis',
          commitment: 'Sur devis',
        },
      ],
      freeTrial: 'Démo uniquement',
      publicPricing: true,
    },
    features: {
      games: 'Mini-jeux via QR code, Roue Cadeau',
      gameCount: 2,
      marketingActions: ['Avis Google', 'Réseaux sociaux', 'Formulaires d\'info'],
      branding: 'Account manager dédié, landing personnalisée',
      multiLocation: 'Oui, plan Enterprise dédié',
      antiFraud: 'Non documenté publiquement',
    },
    target: {
      segment: 'Restaurants (TPE/PME, chaînes)',
      geography: 'France',
      language: 'FR',
    },
    strategicNote:
      'Positionnement quasi-jumeau de BoumRank (mêmes prix 59-79 €, gamme d\'engagements similaire). Menace n°1. Sortir par la richesse des jeux (slot/blackjack) et l\'expérience client.',
    sources: ['https://www.dokaa.app/tarifs', 'https://www.dokaa.app/booster-davis-clients'],
  },
  {
    slug: 'cadeo',
    name: 'Cadeo',
    url: 'https://cadeo.io',
    positioning: 'SaaS de gamification par QR pour commerces physiques et e-commerce, focus avis Google',
    threat: 'haute',
    rank: 2,
    pricing: {
      entryPrice: '42 €',
      tiers: [
        {
          label: 'Roue Boost',
          monthlyPrice: '50 € HT',
          commitment: 'Aucun',
        },
        {
          label: 'Roue Boost 6 mois',
          monthlyPrice: '≈ 42 € HT',
          commitment: '6 mois',
          note: '250 € HT total, 1 mois offert',
        },
        {
          label: 'Roue Boost 12 mois',
          monthlyPrice: '≈ 42 € HT',
          commitment: '12 mois',
          note: '500 € HT total, 2 mois offerts',
        },
        {
          label: 'Réponses IA avis (option)',
          monthlyPrice: '20 € HT',
          commitment: 'Aucun',
          note: 'Bundle Roue + IA = -20 €/mois',
        },
      ],
      freeTrial: 'Non documenté',
      publicPricing: true,
    },
    features: {
      games: 'Roue de la fortune (focus unique)',
      gameCount: 1,
      marketingActions: ['Avis Google', 'Trustpilot', 'Réseaux sociaux'],
      branding: 'Landing personnalisée, flyers QR, règles custom',
      multiLocation: 'Oui',
      antiFraud: 'Participations illimitées paramétrables',
    },
    target: {
      segment: 'Restos, bars, retail, e-commerce',
      geography: 'France',
      language: 'FR + EN',
    },
    strategicNote:
      'Le moins cher du segment direct (50 €/mois), mais offre limitée à un seul jeu (roue) + option IA avis. BoumRank doit jouer la carte "3 jeux différents" (roue, slot, blackjack) au même tarif.',
    sources: ['https://cadeo.io/tarifs/', 'https://cadeo.io/fonctionnalites/'],
  },
  {
    slug: 'heypulse',
    name: 'HeyPulse',
    url: 'https://www.heypulse.fr',
    positioning: 'Roue de la fortune et flyer marketing pour resto/retail FR',
    threat: 'haute',
    rank: 3,
    pricing: {
      entryPrice: '29 €',
      tiers: [
        {
          label: 'Starter',
          monthlyPrice: '49,99 € HT',
          commitment: 'Aucun',
          note: '50 SMS + 100 emails inclus',
        },
        {
          label: 'Growth annuel',
          monthlyPrice: '≈ 29 € HT',
          commitment: '12 mois',
          note: '349 € HT/an, 100 SMS + 150 emails inclus',
        },
      ],
      freeTrial: '14 jours sans CB',
      publicPricing: true,
    },
    features: {
      games: 'Roue de la fortune (jeu unique)',
      gameCount: 1,
      marketingActions: ['Avis Google', 'Instagram', 'Facebook', 'TikTok', 'Snapchat'],
      branding: 'Flyer personnalisé visuel',
      multiLocation: 'Non documenté',
      antiFraud: 'Non documenté',
    },
    target: {
      segment: 'Restos, fast-food, pizzerias, pâtisseries, retail',
      geography: 'France',
      language: 'FR',
    },
    strategicNote:
      'Le plus proche de BoumRank en messaging et cible. Trial 14 jours sans CB = standard à matcher. SMS inclus = différentiateur intéressant à considérer pour BoumRank.',
    sources: ['https://www.heypulse.fr/'],
  },
  {
    slug: 'kadow-club',
    name: 'Kadow Club',
    url: 'https://kadow.club',
    positioning: 'Plateforme premium de gamification au point de vente via QR, ciblée enseignes et franchises',
    threat: 'moyenne',
    rank: 4,
    pricing: {
      entryPrice: '149 €',
      tiers: [
        {
          label: '12 mois',
          monthlyPrice: '229 € HT',
          commitment: '12 mois',
        },
        {
          label: '24 mois',
          monthlyPrice: '183 € HT',
          commitment: '24 mois',
        },
        {
          label: '36 mois',
          monthlyPrice: '149 € HT',
          commitment: '36 mois',
        },
      ],
      freeTrial: 'Non, ROI garanti ou remboursé',
      publicPricing: true,
    },
    features: {
      games:
        'Roue, machines à sous, cartes à gratter, boîtes mystère, jeux d\'adresse, quiz, dés, jeux saisonniers (Noël, St-Valentin)',
      gameCount: '10+',
      marketingActions: ['Avis Google', 'Réseaux sociaux'],
      branding: 'Personnalisation thématique poussée',
      multiLocation: 'Oui, taillé pour chaînes/franchises',
      antiFraud: 'Cartes de progression, leaderboards, jackpots partagés',
    },
    target: {
      segment: 'Enseignes et franchises avec budget marketing significatif',
      geography: 'France',
      language: 'FR + EN',
    },
    strategicNote:
      '3× plus cher que BoumRank, vise un autre segment (enseignes vs commerces indé). Catalogue de jeux le plus riche du marché. BoumRank doit communiquer "même qualité de jeux, sans engagement 12 mois, 3× moins cher".',
    sources: [
      'https://kadow.club/en',
      'https://kdokdo.com/blog/grow-lot-vs-kadow-club/',
      'https://www.laretailtech.com/fr/annuaire-entreprises/societe/83/kadow-club',
    ],
  },
  {
    slug: 'up-review',
    name: 'Up Review',
    url: 'https://up-review.co/fr',
    positioning: 'Booster d\'avis Google et campagnes SMS pour commerces locaux et franchises',
    threat: 'moyenne',
    rank: 5,
    pricing: {
      entryPrice: '29 €',
      tiers: [
        {
          label: 'Free',
          monthlyPrice: '0 €',
          commitment: 'Aucun',
          note: '1 QR, 50 scans/mois, sans jeux',
        },
        {
          label: 'Starter',
          monthlyPrice: '29 € HT',
          annualPrice: '≈ 22 € HT',
          commitment: 'Mensuel ou annuel',
          note: '-25 % en annuel (348 €/an)',
        },
        {
          label: 'Pro (recommandé)',
          monthlyPrice: '89 € HT',
          annualPrice: '≈ 67 € HT',
          commitment: 'Mensuel ou annuel',
          note: 'Jeux concours débloqués ici · 1 068 €/an',
        },
        {
          label: 'Enterprise',
          monthlyPrice: 'Sur devis',
          commitment: 'Sur devis',
          note: '10+ établissements',
        },
      ],
      freeTrial: 'Plan Free permanent',
      publicPricing: true,
    },
    features: {
      games: 'Jeux concours uniquement à partir du plan Pro (89 €)',
      gameCount: '1+',
      marketingActions: ['Avis Google', 'SMS', 'Email'],
      branding: 'Marque blanche dès Starter',
      multiLocation: 'Oui, Enterprise pour franchises',
      antiFraud: 'IA réponses (30 tokens Starter / 100 Pro)',
    },
    target: {
      segment: 'Restos, hôtels, bars, opticiens, retail, agences',
      geography: 'France',
      language: 'FR',
    },
    strategicNote:
      'Pricing très agressif (29 €/mois entry) mais jeux verrouillés à 89 €. BoumRank à partir de 59 €/mois avec tous les jeux inclus = meilleur rapport qualité/prix.',
    sources: [
      'https://up-review.co/fr',
      'https://up-review.co/fr/articles/meilleurs-outils-booster-avis-google',
    ],
  },
  {
    slug: 'zerosix',
    name: 'Zerosix',
    url: 'https://www.zerosix.com',
    positioning: 'Programme de fidélité digital pour commerçants et restaurateurs indépendants',
    threat: 'moyenne',
    rank: 6,
    pricing: {
      entryPrice: '49 €',
      tiers: [
        {
          label: 'Par établissement',
          monthlyPrice: '49 € HT',
          commitment: 'Aucun',
          note: 'Dégressif dès 4 établissements',
        },
      ],
      setupFee: '190 € HT one-shot',
      freeTrial: 'Démo uniquement',
      publicPricing: true,
    },
    features: {
      games: 'Roue de la fortune en module add-on',
      gameCount: 1,
      marketingActions: ['SMS ciblés', 'Campagnes automatisées', 'Avis client', 'Parrainage'],
      branding: 'Carte virtuelle Apple/Google Wallet',
      multiLocation: 'Oui, dégressif dès 4 établissements',
      antiFraud: 'Intégration 60+ logiciels de caisse',
    },
    target: {
      segment: '4 000+ commerçants/restaurateurs indé, 12M+ membres actifs',
      geography: 'France',
      language: 'FR',
    },
    strategicNote:
      'Ils sont sur la fidélité (carte points classique) plutôt que la gamification one-shot. Concurrent indirect mais ils ont la masse (4 000 clients) et les intégrations caisse. BoumRank doit attaquer côté divertissement/UX moderne.',
    sources: [
      'https://www.zerosix.com/tarifs-programme-fidelite',
      'https://www.appvizer.fr/relation-client/fidelite-client/zerosix',
    ],
  },
  {
    slug: 'adictiz',
    name: 'Adictiz',
    url: 'https://www.adictiz.com',
    positioning: 'Plateforme N°1 de jeux marketing en Europe pour équipes marketing de marques',
    threat: 'faible',
    rank: 7,
    pricing: {
      entryPrice: '99 €',
      tiers: [
        {
          label: 'Tirage au sort',
          monthlyPrice: 'Gratuit',
          commitment: 'Licence annuelle',
        },
        {
          label: 'More (instant gagnant, quiz, etc.)',
          monthlyPrice: 'À partir de 99 €',
          commitment: 'Licence annuelle',
        },
        {
          label: 'Pro',
          monthlyPrice: 'Sur devis',
          commitment: 'Licence annuelle',
        },
        {
          label: 'Enterprise',
          monthlyPrice: 'Sur devis',
          commitment: 'Licence annuelle',
        },
      ],
      freeTrial: 'Non documenté',
      publicPricing: false,
    },
    features: {
      games:
        '65+ mécaniques (instant gagnant, quiz, juste prix, memory, calendrier de l\'avent, etc.)',
      gameCount: '65+',
      marketingActions: ['Collecte zero-party data', 'Facebook', 'Web', 'Point de vente'],
      branding: 'Éditeur visuel, multi-langue',
      multiLocation: 'Adapté grandes marques nationales',
      antiFraud: 'Connecteur CRM natif (More), avancé (Pro), illimité (Enterprise), RGPD',
    },
    target: {
      segment: 'Marques nationales, équipes marketing, agences',
      geography: 'Europe',
      language: 'FR + EN',
    },
    strategicNote:
      'Pas concurrent direct (cible marques nationales, pas commerces locaux), mais référence du marché FR gamification. Catalogue le plus large (65 jeux). Inspiration pour roadmap jeux BoumRank.',
    sources: [
      'https://www.adictiz.com/en/adictiz-pricing/',
      'https://www.adictiz.com/en/all-the-mechanics/',
    ],
  },
  {
    slug: 'malou',
    name: 'Malou',
    url: 'https://malou.io',
    positioning: 'Plateforme tout-en-un local SEO, e-réputation et social media pour groupes hospitality',
    threat: 'faible',
    rank: 8,
    pricing: {
      entryPrice: '99 €',
      tiers: [
        {
          label: 'Essential',
          monthlyPrice: '100 € HT',
          commitment: 'Annuel ou mensuel sur demande',
          note: 'Par établissement',
        },
        {
          label: 'Premium',
          monthlyPrice: '140 € HT',
          commitment: 'Annuel ou mensuel sur demande',
          note: 'Par établissement',
        },
        {
          label: 'Multi-location 2-14',
          monthlyPrice: 'À partir de 99 €',
          commitment: 'Annuel',
          note: 'Par établissement',
        },
        {
          label: 'Enterprise 15+',
          monthlyPrice: 'Sur devis',
          commitment: 'Annuel',
        },
        {
          label: 'Copilot Premium (service managé)',
          monthlyPrice: '549 € HT',
          commitment: 'Annuel',
        },
      ],
      freeTrial: 'Non explicite',
      publicPricing: true,
    },
    features: {
      games: 'Aucun (pas de gamification)',
      gameCount: 0,
      marketingActions: ['Local SEO 50+ plateformes', 'Avis', 'Réseaux sociaux', 'IA réponses'],
      branding: 'Non documenté',
      multiLocation: 'Forte spécialisation chaînes/franchises',
      antiFraud: 'Non applicable',
    },
    target: {
      segment: '3 000+ groupes resto/hospitality',
      geography: 'France et international',
      language: 'FR + EN',
    },
    strategicNote:
      'Concurrent indirect, ils font de la visibilité/SEO sans gamification. Souvent complémentaire plutôt que substitut. Risque qu\'ils ajoutent un module jeux.',
    sources: ['https://malou.io/tarifs', 'https://www.malou.io/en-us'],
  },
  {
    slug: 'loyoly',
    name: 'Loyoly',
    url: 'https://www.loyoly.io',
    positioning: 'Plateforme d\'engagement post-achat (fidélité, parrainage, UGC) pour marques e-commerce et retail',
    threat: 'faible',
    rank: 9,
    pricing: {
      entryPrice: '92 €',
      tiers: [
        {
          label: 'Lite Loyalty',
          monthlyPrice: '≈ 92 € (99 $)',
          commitment: 'Mensuel',
        },
        {
          label: 'Lite Referral',
          monthlyPrice: '≈ 80 € (87 $)',
          commitment: 'Mensuel',
        },
        {
          label: 'Lite Wallet',
          monthlyPrice: '≈ 34 € (37 $)',
          commitment: 'Mensuel',
        },
        {
          label: 'Premium Loyalty',
          monthlyPrice: '≈ 416 € (449 $)',
          commitment: 'Mensuel',
          note: 'Bundle Loyalty + Referral : -20 %',
        },
        {
          label: 'Enterprise',
          monthlyPrice: 'Sur devis',
          commitment: 'Sur devis',
        },
      ],
      freeTrial: '7 jours',
      publicPricing: true,
    },
    features: {
      games:
        '40+ mécaniques d\'engagement (achats, parrainage, UGC, avis, partages Insta/TikTok) · pas de jeux d\'argent style roue',
      gameCount: '40+',
      marketingActions: ['Avis', 'UGC', 'Parrainage', 'Partages sociaux'],
      branding: 'Intégration Shopify',
      multiLocation: 'Surtout e-com',
      antiFraud: 'Non documenté',
    },
    target: {
      segment: 'Marques e-commerce et retail premium',
      geography: 'France et international',
      language: 'FR + EN',
    },
    strategicNote:
      'Concurrent indirect (e-com first, prix supérieur). Intéressant : leurs 40+ mécaniques d\'engagement = roadmap inspirante pour BoumRank.',
    sources: ['https://www.loyoly.io/plans', 'https://apps.shopify.com/wewiink'],
  },
  {
    slug: 'guest-suite',
    name: 'Guest Suite',
    url: 'https://www.guest-suite.com',
    positioning: 'Solution centralisée d\'avis clients, présence locale et satisfaction pour grandes enseignes multi-site',
    threat: 'faible',
    rank: 10,
    pricing: {
      entryPrice: 'Sur devis',
      tiers: [
        {
          label: 'Pack Présence',
          monthlyPrice: 'Sur devis',
          commitment: 'Non public',
        },
        {
          label: 'Pack Veille',
          monthlyPrice: 'Sur devis',
          commitment: 'Non public',
        },
        {
          label: 'Pack Étoiles',
          monthlyPrice: 'Sur devis',
          commitment: 'Non public',
        },
        {
          label: 'Pack Visibilité',
          monthlyPrice: 'Sur devis',
          commitment: 'Non public',
          note: 'Dégressif par nombre de sites',
        },
      ],
      freeTrial: '7-14 jours sur demande',
      publicPricing: false,
    },
    features: {
      games: 'Aucun (pas de gamification)',
      gameCount: 0,
      marketingActions: [
        'Collecte d\'avis',
        'Enquêtes satisfaction',
        'Distribution multi-plateforme (Google, Tripadvisor, etc.)',
        'IA réponses',
      ],
      branding: 'Non documenté',
      multiLocation: 'Oui, leur force',
      antiFraud: 'Non applicable',
    },
    target: {
      segment: '10 000+ points de vente, 3 000+ clients (banque, tourisme, immo, retail, auto)',
      geography: 'France',
      language: 'FR',
    },
    strategicNote:
      'Concurrent indirect entreprise. Pas de jeux, mais énorme parc client multi-site. Quand un commerce indé grossit en franchise, risque de basculer chez eux.',
    sources: [
      'https://www.guest-suite.com/offres',
      'https://www.appvizer.fr/marketing/gestion-feedback/guest-suite',
    ],
  },
];

export const KEY_INSIGHTS = [
  {
    title: 'Pricing',
    body: 'BoumRank à 65-79 € est dans la moyenne haute du segment indé (Cadeo 50 €, HeyPulse 50 €, Up Review 29 €, Zerosix 49 €, Dokaa 59-79 €). Justifier par la richesse des jeux (3 vs 1 chez les concurrents directs) et l\'absence de frais setup (Zerosix : 190 €).',
  },
  {
    title: 'Engagement',
    body: '"Sans engagement" est le standard du marché indé (Dokaa, Cadeo, Zerosix). Différenciation faible. Kadow est l\'anomalie (12 mois min).',
  },
  {
    title: 'Essai gratuit',
    body: 'Standard 7-14 jours sans CB (HeyPulse 14j, Loyoly 7j, Localranker 7j). BoumRank doit matcher 14 jours sans CB.',
  },
  {
    title: 'Catalogue de jeux',
    body: 'Vraie différenciation possible. 1 jeu : Cadeo, HeyPulse, Up Review, Zerosix. 3 jeux (BoumRank) : médian. 10+ : Kadow (3× plus cher). 40-65 : Adictiz, Loyoly (hors segment).',
  },
  {
    title: 'Actions marketing',
    body: 'Tous couvrent avis Google + RS. BoumRank et HeyPulse seuls à couvrir TikTok + Snapchat. À mettre en avant.',
  },
  {
    title: 'Gap marché identifié',
    body: 'Aucun acteur indé n\'a simultanément (1) 3+ types de jeux différents, (2) prix entrée <80 €, (3) sans engagement, (4) 14j essai gratuit. C\'est exactement le positionnement BoumRank. Communiquer cette équation.',
  },
];
