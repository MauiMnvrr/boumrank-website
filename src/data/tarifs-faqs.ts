/**
 * BoumRank — Tarifs FAQ
 *
 * Plain data module (no 'use client') so it can be safely imported by both
 * Server Components (page.tsx → SchemaOrg JSON-LD) and Client Components
 * (TarifsFaq.tsx → accordion).
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const TARIFS_FAQS: FaqItem[] = [
  {
    question: "Pourquoi un prix fixe et pas un prix au nombre d'avis ?",
    answer:
      "Parce que vous méritez de la prévisibilité, pas une facture qui explose le mois où vous cartonnez. Votre croissance ne doit pas être punie par votre outil marketing. Vous payez un abonnement clair, vous décuplez vos avis sans plafond.",
  },
  {
    question: 'Puis-je changer de plan en cours de route ?',
    answer:
      "Oui, en un clic, à tout moment. Upgrade instantané (proratisé), downgrade effectif au prochain cycle de facturation. Aucun appel à un commercial, aucune attente.",
  },
  {
    question: "Qu'est-ce qui se passe si je résilie ?",
    answer:
      "Vous cliquez sur « Résilier » dans votre dashboard. Votre abonnement reste actif jusqu'à la fin du cycle payé, puis s'arrête net. Vous exportez vos données en CSV, vos QR codes sont désactivés. Aucune pénalité, aucune question.",
  },
  {
    question: "L'essai gratuit 14 jours, c'est une vraie version ?",
    answer:
      "100% vraie version. Toutes les features du plan Performance débloquées, aucune limite de scans, aucune carte bancaire demandée à l'inscription. Vous testez en conditions réelles, avec de vrais clients. Au jour 14, vous choisissez votre plan ou vous partez — sans reproche.",
  },
  {
    question: 'Est-ce que vous proposez une ristourne à l\'année ?',
    answer:
      "Oui : -20% si vous payez 12 mois d'avance (soit 52€/mois en Essentiel ou 63€/mois en Performance). Contactez-nous en chat, la réduction est appliquée manuellement pour garder les choses simples.",
  },
];
