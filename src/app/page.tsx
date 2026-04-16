import { Hero } from '@/components/home/Hero';
import { Problem } from '@/components/home/Problem';
import { Solution } from '@/components/home/Solution';
import { DemoWheel } from '@/components/home/DemoWheel';
import { HowItWorks } from '@/components/home/HowItWorks';
import { RoiCalculator } from '@/components/home/RoiCalculator';
import { Sectors } from '@/components/home/Sectors';
import { Differentiators } from '@/components/home/Differentiators';
import { Vision } from '@/components/home/Vision';
import { PricingTeaser } from '@/components/home/PricingTeaser';
import { LeadMagnet } from '@/components/home/LeadMagnet';
import { FAQ } from '@/components/home/FAQ';
import { HOME_FAQS } from '@/data/home-faqs';
import { FinalCTA } from '@/components/home/FinalCTA';
import {
  SchemaOrg,
  organizationSchema,
  softwareApplicationSchema,
  websiteSchema,
  faqPageSchema,
} from '@/components/seo/SchemaOrg';

export default function HomePage() {
  return (
    <>
      <SchemaOrg
        schemas={[
          organizationSchema(),
          softwareApplicationSchema(),
          websiteSchema(),
          faqPageSchema(HOME_FAQS),
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
      <Vision />
      <PricingTeaser />
      <LeadMagnet />
      <FAQ />
      <FinalCTA />
    </>
  );
}
