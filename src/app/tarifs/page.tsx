import { Metadata } from 'next';
import { SchemaOrg, faqPageSchema, productSchema } from '@/components/seo/SchemaOrg';
import { Pricing } from '@/components/home/Pricing';
import { CTA } from '@/components/home/CTA';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Tarifs',
  description:
    "D\u00e9couvrez les tarifs BoumRank : des plans adapt\u00e9s \u00e0 chaque commerce pour gamifier vos avis clients et fid\u00e9liser vos clients.",
  alternates: { canonical: `${SITE_URL}/tarifs` },
};

const faqs = [
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

const plans = [
  {
    name: "L'Essentiel",
    price: '65\u20ac',
    description:
      'Le pack id\u00e9al pour d\u00e9marrer sereinement avec des scans illimit\u00e9s.',
  },
  {
    name: 'Performance',
    price: '79\u20ac',
    description:
      "La solution compl\u00e8te pour automatiser la r\u00e9colte d'avis et la fid\u00e9lisation.",
  },
  {
    name: 'Enterprise',
    price: 'Sur Mesure',
    description:
      'Solution sur mesure pour les franchises et les r\u00e9seaux multi-points.',
  },
];

export default function TarifsPage() {
  return (
    <>
      <SchemaOrg schemas={[faqPageSchema(faqs), productSchema(plans)]} />
      <Pricing />
      <CTA />
    </>
  );
}
