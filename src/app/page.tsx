import { Hero } from '@/components/home/Hero';
import { ActionShowcase } from '@/components/home/ActionShowcase';
import { CompetitiveAdvantages } from '@/components/home/CompetitiveAdvantages';
import { HowItWorks } from '@/components/home/HowItWorks';
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
    question: 'Puis-je changer de plan \u00e0 tout moment ?',
    answer:
      "Absolument. Vous pouvez passer \u00e0 l'offre sup\u00e9rieure \u00e0 tout moment pour d\u00e9bloquer plus de fonctionnalit\u00e9s. Le changement est instantan\u00e9.",
  },
  {
    question: 'Comment fonctionne la validation par IA ?',
    answer:
      "Lorsqu'un client r\u00e9alise une action (ex: un avis Google), il soumet une capture d'\u00e9cran. Notre IA analyse l'image en moins de 3 secondes pour v\u00e9rifier la conformit\u00e9 avec vos crit\u00e8res.",
  },
  {
    question: "L'engagement est-il obligatoire ?",
    answer:
      'Nos plans mensuels sont sans engagement. Vous pouvez arr\u00eater quand vous le souhaitez.',
  },
  {
    question: 'Offrez-vous une d\u00e9mo personnalis\u00e9e ?',
    answer:
      "Oui ! Cliquez sur le bouton 'Voir la d\u00e9mo' ou contactez notre \u00e9quipe commerciale pour une pr\u00e9sentation adapt\u00e9e \u00e0 votre secteur d'activit\u00e9.",
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
      <HowItWorks />
      <ActionShowcase />
      <CompetitiveAdvantages />
      <CTA />
    </>
  );
}
