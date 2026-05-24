import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SITE_URL } from '@/lib/constants';
import { Hero } from '@/components/home/Hero';
import { SocialProof } from '@/components/home/SocialProof';
import { Problem } from '@/components/home/Problem';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Activate } from '@/components/home/Activate';
import { RoiCalculator } from '@/components/home/RoiCalculator';
import { FAQ } from '@/components/home/FAQ';
import { FinalCTA } from '@/components/home/FinalCTA';
import {
  SchemaOrg,
  organizationSchema,
  softwareApplicationSchema,
  websiteSchema,
  faqPageSchema,
} from '@/components/seo/SchemaOrg';
import { HOME_FAQ_COUNT, type FaqItem } from '@/data/home-faqs';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = locale === 'fr' ? SITE_URL : `${SITE_URL}/en`;
  return {
    alternates: {
      canonical,
      languages: {
        fr: SITE_URL,
        en: `${SITE_URL}/en`,
        'x-default': SITE_URL,
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'faqs' });
  const tSeo = await getTranslations({ locale, namespace: 'seo.home' });

  const faqs: FaqItem[] = Array.from({ length: HOME_FAQ_COUNT }, (_, i) => ({
    question: t(`home.${i}.question`),
    answer: t(`home.${i}.answer`),
  }));

  return (
    <>
      <SchemaOrg
        schemas={[
          organizationSchema(),
          softwareApplicationSchema(),
          websiteSchema(locale, tSeo('description')),
          faqPageSchema(faqs),
        ]}
      />
      <Hero />
      <SocialProof />
      <Problem />
      <HowItWorks />
      <Activate />
      <RoiCalculator />
      <FAQ />
      <FinalCTA />
    </>
  );
}
