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
    question: "Que se passe-t-il si je résilie avant la fin de mon engagement ?",
    answer:
      "Sur les offres 6 mois et 1 an, vous vous engagez sur la durée choisie. En cas de résiliation anticipée, vous payez les mensualités restantes. Sur la formule sans engagement (79€), vous résiliez en 1 clic, quand vous voulez, sans pénalité.",
  },
  {
    question: "Comment se passe le renouvellement à la fin de mon engagement ?",
    answer:
      "Votre abonnement se renouvelle automatiquement au même tarif. Avant chaque échéance, on vous contacte pour faire un point sur vos résultats et confirmer (ou ajuster) votre formule. Aucune surprise, aucun piège.",
  },
  {
    question: "L'essai gratuit 14 jours, il marche pour les 3 offres ?",
    answer:
      "Oui, les 3 offres démarrent par 14 jours gratuits, sans carte bancaire à l'inscription. Toutes les features débloquées, aucune limite de scans. Au jour 14, vous choisissez votre offre (ou vous partez, sans reproche).",
  },
  {
    question: "Je peux passer d'une offre à une autre en cours de route ?",
    answer:
      "Upgrade vers une offre plus engageante (donc moins chère) : instantané, à tout moment. Downgrade vers une offre moins engageante : effectif à la fin de votre cycle d'engagement en cours. Tout se fait en 1 clic depuis votre dashboard.",
  },
  {
    question: "Les features sont vraiment toutes incluses, même dans la formule à 79€ ?",
    answer:
      "Oui. Les 3 jeux, le branding 100% custom, le dashboard Performance, les campagnes séquentielles, l'export CSV, Zapier, le support prioritaire FR : tout est débloqué dès le jour 1, peu importe l'offre. Les 3 offres ne diffèrent que par la durée d'engagement et le tarif associé.",
  },
  {
    question: "Comment ça se passe pour les paiements et la facturation ?",
    answer:
      "Paiement mensuel récurrent via Stripe (PCI-DSS niveau 1). Facture PDF émise chaque mois, téléchargeable depuis votre dashboard. Hébergement européen, RGPD, aucune revente de données. Le 1er prélèvement intervient à la fin de votre essai 14 jours.",
  },
];
