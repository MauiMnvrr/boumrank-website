'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Database, UserCheck, RefreshCw, FileKey, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';

type Safeguard = {
  icon: React.ReactNode;
  title: string;
  body: string;
};

const safeguards: Safeguard[] = [
  {
    icon: <Database size={20} />,
    title: "Le coupon n'est pas une image, c'est un état serveur",
    body: "Pas de QR code qu'on duplique, pas de code qu'on devine. Chaque coupon vit dans notre base de données comme un statut temps réel — jamais comme un pixel qu'on s'envoie par SMS.",
  },
  {
    icon: <UserCheck size={20} />,
    title: "Le minimum d'achat est vérifié par un humain",
    body: "Votre caissier valide visuellement le ticket avant de swiper. Aucun algo à contourner. C'est votre équipe, sur le terrain, qui garde le contrôle.",
  },
  {
    icon: <RefreshCw size={20} />,
    title: 'Le swipe est synchronisé en temps réel',
    body: "Si vous avez 3 caisses en simultané, un coupon consommé en caisse 1 est immédiatement invalide en caisse 2 et 3. Pas de fenêtre d'abus, pas de latence exploitable.",
  },
  {
    icon: <FileKey size={20} />,
    title: 'Un coupon, un client, un usage',
    body: 'Le coupon est nominatif (lié au compte du joueur) et à usage unique. Une fois swipé, il disparaît de la base pour toujours.',
  },
  {
    icon: <Clock size={20} />,
    title: "L'historique est traçable à la seconde",
    body: 'Qui a gagné quoi, qui a consommé quand, avec quel ticket — tout est horodaté et exportable. Vous pouvez auditer chaque coupon de la distribution à la consommation.',
  },
];

export const CommentCaMarcheCoupon = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(46,174,109,0.08),transparent_60%)]" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(27,111,194,0.08),transparent_70%)] translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Eyebrow variant="gradient" size="md" className="mb-5">
            <ShieldCheck size={14} />
            Section bonus · Anti-fraude
          </Eyebrow>
          <h2 className="font-display font-extrabold uppercase text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5 text-[var(--text-primary)]">
            Le coupon physique anti-fraude :{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#2EAE6D_0%,#1B6FC2_100%)]">
              notre arme secrète
            </span>
            .
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
            Pourquoi personne ne peut tricher,{' '}
            <span className="text-[var(--text-primary)] font-semibold">
              même en essayant.
            </span>
          </p>
        </motion.div>

        {/* Intro body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <Card variant="glass" padding="lg">
            <p className="text-[var(--text-body)] leading-relaxed">
              La plupart des plateformes de gamification se font baiser par le premier ado qui fait
              une capture d&apos;écran du coupon et le passe à ses copains. Résultat :{' '}
              <span className="font-semibold text-[var(--text-primary)]">
                30 coupons pour le prix d&apos;un, votre marge qui se casse la gueule
              </span>
              , et vous qui vous demandez pourquoi vous avez signé. BoumRank a construit l&apos;inverse :
              le coupon n&apos;est pas une image,{' '}
              <span className="font-semibold text-[var(--primary-green)]">
                c&apos;est un état dans notre base de données
              </span>
              . Quand le client arrive en caisse, votre caissier ouvre le coupon sur son dashboard,
              vérifie que le minimum d&apos;achat est respecté, puis « swipe » le coupon d&apos;un geste.
              À la seconde où il swipe, le coupon passe en statut « consommé » dans la base,
              synchronisé en temps réel sur tous les appareils.
            </p>
          </Card>
        </motion.div>

        {/* 5 safeguards */}
        <div className="max-w-5xl mx-auto mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center font-display font-extrabold uppercase text-2xl md:text-3xl text-[var(--text-primary)] mb-8"
          >
            Les{' '}
            <span className="text-[var(--primary-green)]">5 garde-fous</span>{' '}
            qui rendent la fraude impossible
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-4">
            {safeguards.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={i === safeguards.length - 1 ? 'md:col-span-2' : ''}
              >
                <Card variant="solid" padding="md" className="h-full flex gap-4 border-l-4 border-[var(--primary-green)]">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[linear-gradient(135deg,rgba(46,174,109,0.12)_0%,rgba(30,157,170,0.12)_100%)] flex items-center justify-center text-[var(--primary-green)]">
                    {s.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-[var(--text-primary)] mb-1 leading-tight">
                      {s.title}
                    </h4>
                    <p className="text-sm text-[var(--text-body)] leading-relaxed">{s.body}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Exemple concret */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card variant="gradient" padding="xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[linear-gradient(135deg,#F28C28_0%,#E84393_100%)] flex items-center justify-center text-white">
                👤
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-display font-bold">
                  Exemple concret
                </div>
                <div className="font-display font-bold text-lg text-[var(--text-primary)]">
                  Paul joue à la Roue dans votre restaurant
                </div>
              </div>
            </div>

            <div className="space-y-4 text-[var(--text-body)] leading-relaxed">
              <p>
                Imaginons que Paul joue à la Roue dans votre restaurant. Il gagne{' '}
                <span className="font-semibold text-[var(--text-primary)]">
                  « 1 dessert offert, minimum d&apos;achat 15€ »
                </span>
                . Paul revient trois jours plus tard avec sa copine, ils commandent deux plats pour
                42€.
              </p>
              <p>
                À la fin du repas, Paul montre son coupon au serveur. Le serveur ouvre le dashboard
                BoumRank sur sa tablette, voit{' '}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/70 border border-[var(--border-highlight)] text-sm font-mono">
                  1 dessert offert — min 15€ — ticket de Paul = 42€ ✓
                </span>
                , swipe. Le dessert est offert, le coupon disparaît.
              </p>
              <p>
                Si Paul essaie de revenir la semaine suivante avec la même capture d&apos;écran, le
                dashboard affichera{' '}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[rgba(231,76,60,0.1)] border border-[rgba(231,76,60,0.3)] text-sm font-mono text-[var(--error)]">
                  Coupon déjà consommé le 12 mai à 21h43
                </span>
                .{' '}
                <span className="font-semibold text-[var(--text-primary)]">Fin de la partie.</span>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
