export const SITE_URL = 'https://boumrank.com';
export const SITE_NAME = 'BoumRank';
export const SITE_DESCRIPTION =
  'BoumRank transforme chaque visite en avis Google. Vos clients scannent un QR code, jouent à un mini-jeu (roue, slots, blackjack) et reviennent gagner leur récompense en boutique. Setup en 5 minutes, à partir de 59€/mois.';
export const SITE_LOCALE = 'fr_FR';

export const APP_URL = 'https://app.boumrank.com';
export const SIGNUP_URL = `${APP_URL}/signup`;
export const AUTH_URL = `${APP_URL}/auth`;
export const DEMO_URL = `${APP_URL}/c/default`;

// Lien de réservation d'appel (campagnes réseaux sociaux, landing /campagne)
export const CAL_URL = 'https://cal.com/maui-manavarere-l1o9dv/15min';

export const COMPANY = {
  name: 'BoumRank',
  foundingYear: 2024,
  email: 'support@boumrank.com',
  socials: {
    twitter: '', // réactiver quand le compte @boumrank sera créé sur X
    linkedin: 'https://linkedin.com/company/boumrank',
    instagram: 'https://www.instagram.com/we_are_boumrank',
  },
} as const;

export const PRICING = {
  flex: {
    id: 'flex',
    label: 'Sans engagement',
    price: 79,
    priceUnit: '€/mois HT',
    commitMonths: 0,
    totalLabel: 'Soit 948€ sur 12 mois',
    commitNote: 'Liberté maximale. Résiliable en 1 clic, à tout moment.',
    yearlySaving: 0,
    highlighted: false,
  },
  sixMonths: {
    id: 'six-months',
    label: '6 mois',
    price: 69,
    priceUnit: '€/mois HT',
    commitMonths: 6,
    totalLabel: 'Soit 414€ tous les 6 mois',
    commitNote: 'Engagement 6 mois minimum. Point bilan avant chaque renouvellement.',
    yearlySaving: 120,
    highlighted: false,
  },
  yearly: {
    id: 'yearly',
    label: '1 an',
    price: 59,
    priceUnit: '€/mois HT',
    commitMonths: 12,
    totalLabel: 'Soit 708€ sur 12 mois',
    commitNote: 'Engagement 12 mois. Point bilan avant chaque renouvellement.',
    yearlySaving: 240,
    highlighted: true,
  },
} as const;

export type PricingOffer = (typeof PRICING)[keyof typeof PRICING];
export const PRICING_OFFERS: readonly PricingOffer[] = [
  PRICING.flex,
  PRICING.sixMonths,
  PRICING.yearly,
];
