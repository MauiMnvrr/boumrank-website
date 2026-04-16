import { Hero } from '@/components/home/Hero';
import { Problem } from '@/components/home/Problem';
import { Solution } from '@/components/home/Solution';
import { DemoWheel } from '@/components/home/DemoWheel';
import { HowItWorks } from '@/components/home/HowItWorks';
import { RoiCalculator } from '@/components/home/RoiCalculator';
import { Sectors } from '@/components/home/Sectors';
import { Differentiators } from '@/components/home/Differentiators';
import { CTA } from '@/components/home/CTA';
import {
  SchemaOrg,
  organizationSchema,
  softwareApplicationSchema,
  websiteSchema,
  faqPageSchema,
} from '@/components/seo/SchemaOrg';

const homePageFaqs = [
  {
    question: 'Comment fonctionne BoumRank exactement ?',
    answer:
      "Vos clients scannent un QR code, choisissent une action marketing à réaliser (avis Google, follow Instagram, inscription newsletter), puis lancent un mini-jeu de casino (roue, slots ou blackjack) pour gagner un coupon. Ils reviennent en boutique avec leur coupon, votre caissier vérifie le minimum d'achat que vous avez fixé, swipe le coupon : il devient inutilisable. Anti-fraude par design, sans app à télécharger.",
  },
  {
    question: 'En combien de temps puis-je lancer ma première campagne ?',
    answer:
      "5 minutes chrono. Vous choisissez votre jeu (roue, slots ou blackjack), configurez vos lots et le minimum d'achat pour les récupérer, personnalisez le branding aux couleurs de votre commerce, et nous vous envoyons les supports imprimables prêts à poser en caisse ou sur table.",
  },
  {
    question: 'Puis-je changer de plan à tout moment ?',
    answer:
      "Absolument. Vous pouvez passer à l'offre supérieure à tout moment pour débloquer plus de fonctionnalités. Le changement est instantané, sans engagement.",
  },
  {
    question: "L'engagement est-il obligatoire ?",
    answer:
      'Non. Tous nos plans mensuels sont sans engagement. Vous pouvez arrêter quand vous le souhaitez, en un clic depuis votre dashboard.',
  },
  {
    question: 'Mes clients doivent-ils télécharger une app ?',
    answer:
      "Jamais. Tout se passe dans le navigateur du smartphone. Le client scanne le QR, joue, gagne — sans aucune installation. Et côté commerçant, votre dashboard est aussi 100% web.",
  },
  {
    question: 'Comment évitez-vous la fraude sur les coupons ?',
    answer:
      "Le coupon est physique : votre client doit revenir en boutique pour le récupérer. Votre caissier vérifie le minimum d'achat (paramétrable, ex: 5€), puis swipe le coupon dans le dashboard pour l'invalider définitivement. Plus jamais utilisable. Pas de fraude possible.",
  },
];

export default function HomePage() {
  return (
    <>
      <SchemaOrg
        schemas={[
          organizationSchema(),
          softwareApplicationSchema(),
          websiteSchema(),
          faqPageSchema(homePageFaqs),
        ]}
      />
      <Hero />
      <Problem />
      <Solution />
      <DemoWheel />
      <HowItWorks />
      <RoiCalculator />
      <Sectors />
      <Differentiators />
      <CTA />
    </>
  );
}
