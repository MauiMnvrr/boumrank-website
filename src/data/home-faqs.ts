/**
 * BoumRank, Home FAQ types.
 *
 * Actual FAQ content lives in `messages/{fr,en}.json` under `faqs.home`.
 * Server components: `getTranslations({ locale, namespace: 'faqs' })`.
 * Client components: `useTranslations('faqs')`.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const HOME_FAQ_COUNT = 6;
