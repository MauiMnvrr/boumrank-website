import { Header } from '@/components/campagne/Header';
import { Hero } from '@/components/campagne/Hero';
import { Loop } from '@/components/campagne/Loop';
import { Benefits } from '@/components/campagne/Benefits';
import { Sectors } from '@/components/campagne/Sectors';
import { FinalCta } from '@/components/campagne/FinalCta';
import { Footer } from '@/components/campagne/Footer';
import { MotionProvider, CalCta } from '@/components/campagne/primitives';

export default function CampagnePage() {
  return (
    <MotionProvider>
      <Header />
      <main>
        <Hero />
        <Loop />
        <Benefits />

        {/* CTA mi-parcours : capter les leads convaincus avant le bas de page */}
        <section style={{ padding: '4px 16px 28px', textAlign: 'center' }}>
          <CalCta size="lg" pulse source="campagne_mid">
            Réserver mon appel de 15 min
          </CalCta>
        </section>

        <Sectors />
        <FinalCta />
      </main>
      <Footer />
    </MotionProvider>
  );
}
