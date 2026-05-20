'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import {
  Smartphone,
  Star,
  Gift,
  LayoutDashboard,
  TrendingUp,
  Users,
  ArrowRight,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useOnboarding } from '@/components/ui/OnboardingProvider';

export const Solution = () => {
  const { openModal } = useOnboarding();
  const locale = useLocale();
  const isEn = locale === 'en';

  const scrollToDemo = () => {
    const target = document.getElementById('demo-roue');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative py-24 md:py-32 bg-[var(--bg-elevated)] overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(27,111,194,0.12),transparent_70%)] -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(46,174,109,0.12),transparent_70%)] translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            {isEn ? 'Turn every' : 'Transformez chaque'}{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_100%)]">
              {isEn ? 'customer into a player' : 'client en joueur'}
            </span>
            .
            <br />
            {isEn ? 'Every' : 'Chaque'}{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1E9DAA_0%,#2EAE6D_100%)]">
              {isEn ? 'player into an advocate' : 'joueur en ambassadeur'}
            </span>
            .
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            {isEn ? 'A QR code on the table. A game. A coupon.' : 'Un QR code sur la table. Un jeu. Un coupon.'}{' '}
            <span className="font-semibold text-[var(--text-primary)]">{isEn ? 'The winning combo.' : 'Le combo gagnant.'}</span>
          </p>
        </motion.div>

        {/* Split-screen : Joueur ↔ Commerçant */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-4 items-stretch">
            {/* LEFT : côté joueur (smartphone) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Card variant="glass" padding="lg" className="h-full flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[linear-gradient(135deg,#1B6FC2_0%,#1E9DAA_100%)] flex items-center justify-center text-white shadow-[0_8px_24px_rgba(27,111,194,0.3)]">
                    <Smartphone size={22} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-display font-bold">{isEn ? 'Player side' : 'Côté joueur'}</div>
                    <div className="font-display font-bold text-lg text-[var(--text-primary)]">{isEn ? 'Your customer' : 'Votre client'}</div>
                  </div>
                </div>

                <ul className="space-y-4 mb-6 flex-1">
                  {(isEn ? [
                    { icon: <Smartphone size={16} />, text: 'Scans the QR code at the table' },
                    { icon: <Star size={16} />, text: 'Leaves a Google review (or follows on Insta, or subscribes)' },
                    { icon: <Gift size={16} />, text: 'Spins the wheel, hits the slots or plays blackjack' },
                    { icon: <Users size={16} />, text: 'Leaves with a coupon to redeem later' },
                  ] : [
                    { icon: <Smartphone size={16} />, text: 'Scanne le QR code à table' },
                    { icon: <Star size={16} />, text: 'Laisse un avis Google (ou Insta, ou newsletter)' },
                    { icon: <Gift size={16} />, text: 'Lance la roue, les slots ou le blackjack' },
                    { icon: <Users size={16} />, text: 'Repart avec un coupon à utiliser plus tard' },
                  ]).map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[linear-gradient(135deg,rgba(27,111,194,0.15)_0%,rgba(30,157,170,0.15)_100%)] flex items-center justify-center text-[var(--primary-blue)] mt-0.5">
                        {step.icon}
                      </div>
                      <span className="text-[var(--text-body)] leading-relaxed pt-0.5">{step.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-5 border-t border-[var(--border-default)]">
                  <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed">
                    {isEn ? '"I left a 5★ review and won a free coffee. I\'ve been telling everyone."' : "« J'ai laissé un avis 5★ et j'ai gagné un café gratuit. Je raconte à tout le monde. »"}
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* RIGHT : côté commerçant (dashboard) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <Card variant="glass" padding="lg" className="h-full flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[linear-gradient(135deg,#1E9DAA_0%,#2EAE6D_100%)] flex items-center justify-center text-white shadow-[0_8px_24px_rgba(46,174,109,0.3)]">
                    <LayoutDashboard size={22} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-display font-bold">{isEn ? 'Merchant side' : 'Côté commerçant'}</div>
                    <div className="font-display font-bold text-lg text-[var(--text-primary)]">{isEn ? 'You' : 'Vous'}</div>
                  </div>
                </div>

                <ul className="space-y-4 mb-6 flex-1">
                  {(isEn ? [
                    { icon: <LayoutDashboard size={16} />, text: 'Set up your game in 5 minutes' },
                    { icon: <Star size={16} />, text: 'Your Google reviews climb week after week' },
                    { icon: <TrendingUp size={16} />, text: 'Your Insta followers take off (without posting more)' },
                    { icon: <Users size={16} />, text: 'Customers come back to redeem their prize (minimum spend you set)' },
                  ] : [
                    { icon: <LayoutDashboard size={16} />, text: 'Configurez votre jeu en 5 minutes' },
                    { icon: <Star size={16} />, text: 'Vos avis Google grimpent semaine après semaine' },
                    { icon: <TrendingUp size={16} />, text: 'Vos abonnés Insta décollent (sans publier plus)' },
                    { icon: <Users size={16} />, text: 'Vos clients reviennent encaisser leur récompense (achat min que vous fixez)' },
                  ]).map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[linear-gradient(135deg,rgba(30,157,170,0.15)_0%,rgba(46,174,109,0.15)_100%)] flex items-center justify-center text-[var(--primary-green)] mt-0.5">
                        {step.icon}
                      </div>
                      <span className="text-[var(--text-body)] leading-relaxed pt-0.5">{step.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-5 border-t border-[var(--border-default)]">
                  <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed">
                    {isEn ? '"47 new Google reviews in 6 weeks, without changing a thing about my service."' : '« +47 avis Google en 6 semaines, sans rien changer à mon service. »'}
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Animated connecting arrows (desktop only) */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="w-14 h-14 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--border-highlight)] flex items-center justify-center shadow-[0_8px_24px_rgba(27,111,194,0.2)]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6 rounded-full bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)] flex items-center justify-center"
              >
                <ArrowRight size={14} className="text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom : full-flow recap + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <Card variant="gradient" padding="xl" className="text-center">
            <p className="text-base md:text-lg text-[var(--text-body)] leading-relaxed max-w-3xl mx-auto mb-6">
              <span className="font-semibold text-[var(--text-primary)]">{isEn ? '5-minute setup,' : 'Setup en 5 minutes,'}</span> {isEn ? 'zero app to download,' : 'zéro app à télécharger,'}{' '}
              <span className="font-semibold text-[var(--text-primary)]">{isEn ? '100% autonomous.' : '100% autonome.'}</span> {isEn ? 'You multiply your reviews, followers, and customer returns. BoumRank does the work while you run your business.' : 'Vous décuplez vos avis, vos abonnés et vos retours client. BoumRank fait le boulot pendant que vous gérez votre commerce.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={openModal} variant="gradient" size="lg">
                {isEn ? 'Start my free demo' : 'Lancer ma démo gratuite'}
              </Button>
              <Button onClick={scrollToDemo} variant="outline" size="lg">
                {isEn ? 'Spin the wheel now' : 'Jouer à la roue maintenant'}
                <ArrowRight size={18} />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
