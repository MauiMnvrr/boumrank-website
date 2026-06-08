import { Header } from '@/components/campagne/Header';
import { Hero } from '@/components/campagne/Hero';
import { Loop } from '@/components/campagne/Loop';
import { Benefits } from '@/components/campagne/Benefits';
import { Sectors } from '@/components/campagne/Sectors';
import { FinalCta } from '@/components/campagne/FinalCta';
import { Footer } from '@/components/campagne/Footer';
import { MotionProvider } from '@/components/campagne/primitives';
import { OfferProvider, OfferButton } from '@/components/campagne/OfferModal';

export default function CampagnePage() {
  return (
    <MotionProvider>
      <OfferProvider>
        <Header />
        <main>
          <Hero />
          <Loop />
          <Benefits />

          {/* CTA mi-parcours : capter les leads convaincus avant le bas de page */}
          <section style={{ padding: '4px 16px 28px', textAlign: 'center' }}>
            <OfferButton size="lg" pulse source="campagne_mid">
              Débloquer mon mois offert
            </OfferButton>
          </section>

          <Sectors />
          <FinalCta />
        </main>
        <Footer />
      </OfferProvider>
    </MotionProvider>
  );
}
