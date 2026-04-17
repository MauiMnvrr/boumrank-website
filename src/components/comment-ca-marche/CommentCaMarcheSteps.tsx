'use client';

import { motion } from 'framer-motion';
import { Settings, QrCode, Gamepad2, Store, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Eyebrow } from '@/components/ui/Eyebrow';

type Step = {
  number: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  body: string;
  subFeatures: string[];
  gradient: string;
  accent: string;
};

const steps: Step[] = [
  {
    number: '01',
    icon: <Settings size={28} />,
    title: 'Vous configurez',
    subtitle: 'Le jeu prend vos couleurs',
    body:
      "Connectez-vous à votre dashboard BoumRank et choisissez votre arme : la Roue (classique, visuelle, ultra-engageante), les Slots (frisson de la machine à sous, perfect pour l'after-service) ou le Blackjack (pour la clientèle un peu plus fun et joueuse). Sélectionnez un des 13 templates de design prêts à l'emploi, glissez votre logo, ajustez la palette de couleurs à celle de votre commerce. Enfin, configurez les lots : un café offert à 30% de chance, un dessert à 20%, -10% sur l'addition à 15%, une entrée offerte à 5%, et « rejouez la prochaine fois » à 30%. C'est vous qui pilotez chaque probabilité.",
    subFeatures: [
      '3 jeux au choix : Roue, Slots, Blackjack',
      '13 templates de design prêts à l\'emploi',
      'Palette de couleurs 100% personnalisable',
      'Probabilités configurables par lot (vous gardez la marge)',
      "Minimum d'achat défini par lot (ex : lot activable à partir de 5€ de ticket)",
      'Aperçu en direct avant publication',
    ],
    gradient: 'linear-gradient(135deg, #1B6FC2 0%, #144F8C 100%)',
    accent: '#1B6FC2',
  },
  {
    number: '02',
    icon: <QrCode size={28} />,
    title: 'Vous affichez',
    subtitle: 'Vos clients scannent sans réfléchir',
    body:
      "Dès que votre jeu est publié, BoumRank vous envoie par email un pack de QR codes imprimables en trois formats : sticker de table A6, chevalet A5 et affiche vitrine A3. Vous choisissez où les poser — sur chaque table, au comptoir, glissé dans l'addition, collé sur la vitrine ou imprimé au dos du menu. Le QR code est branché à vie à votre jeu : pas de réimpression à chaque changement de lot, pas de rupture. Vous le collez, c'est plié.",
    subFeatures: [
      'Pack QR codes imprimables fourni en 3 formats (A6, A5, A3)',
      'QR code stable : la même image fonctionne à vie, même si vous changez les lots',
      'Supports imprimés papier couché envoyés en option (+9€/mois)',
      'Templates Canva fournis pour ceux qui veulent personnaliser le support',
      'Placement recommandé : 3 points par établissement pour maximiser les scans',
    ],
    gradient: 'linear-gradient(135deg, #1E9DAA 0%, #177A85 100%)',
    accent: '#1E9DAA',
  },
  {
    number: '03',
    icon: <Gamepad2 size={28} />,
    title: 'Vos clients jouent',
    subtitle: 'Ils scannent, ils agissent, ils lancent le jeu',
    body:
      "Votre client scanne le QR code avec son téléphone. La page du jeu s'ouvre direct dans son navigateur — aucune app à télécharger, aucun compte à créer, aucune friction. Avant de jouer, il réalise l'action marketing que vous avez choisie : laisser un avis Google, suivre votre Instagram, s'inscrire à votre newsletter ou cocher plusieurs à la fois. Une fois l'action validée, la Roue tourne, les Slots s'alignent ou le Blackjack distribue les cartes. Le client découvre son lot à l'écran, reçoit son coupon digital, et repart avec l'envie de revenir l'encaisser.",
    subFeatures: [
      'Zéro téléchargement d\'app : jeu ouvert dans le navigateur (Safari, Chrome, etc.)',
      'Actions marketing configurables : avis Google, follow Insta, newsletter, TikTok',
      'Vérification automatique du pseudo Google pour valider l\'avis',
      'Animation de jeu fluide sur mobile, optimisée 4G',
      'Coupon envoyé par SMS et/ou email + affiché dans le navigateur',
      '89% de taux de complétion de partie sur nos données beta',
    ],
    gradient: 'linear-gradient(135deg, #2EAE6D 0%, #1E8A52 100%)',
    accent: '#2EAE6D',
  },
  {
    number: '04',
    icon: <Store size={28} />,
    title: 'Ils reviennent gagner',
    subtitle: 'Vous swipez. Le jackpot se transforme en ticket de caisse',
    body:
      "Le gagnant revient dans votre commerce — parfois le jour-même, parfois la semaine d'après — avec son coupon sur le téléphone. Votre caissier ouvre le dashboard BoumRank sur tablette ou téléphone, le client lui montre son coupon, le caissier vérifie que le montant minimum d'achat est atteint (ex : 5€ minimum pour un café offert), et swipe le coupon d'un geste. Le coupon passe en statut « consommé » définitivement, impossible à réutiliser. Vous venez de transformer un avis Google en client qui dépense chez vous. Et c'est là que la boucle devient magique : il raconte à ses potes « j'ai gagné un truc dans ce resto, trop stylé », et ses potes viennent à leur tour.",
    subFeatures: [
      'Dashboard caissier ultra-simple (2 clics pour valider)',
      "Vérification du montant minimum d'achat à la caisse",
      'Swipe physique : le coupon disparaît, aucune réutilisation possible',
      'Statut temps réel sur toutes les sessions caissier (multi-poste OK)',
      'Historique des coupons consommés consultable à tout moment',
      'Notification automatique au commerçant pour chaque coupon consommé',
    ],
    gradient: 'linear-gradient(135deg, #F28C28 0%, #D47318 100%)',
    accent: '#F28C28',
  },
];

export const CommentCaMarcheSteps = () => {
  return (
    <section className="relative py-20 md:py-24 bg-[var(--bg-elevated)] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Eyebrow variant="subtle" size="md" className="mb-5">
            Le parcours complet
          </Eyebrow>
          <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-[var(--text-primary)]">
            Quatre étapes. Détaillées.{' '}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#1B6FC2_0%,#2EAE6D_100%)]">
              Pas à pas.
            </span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card variant="solid" padding="lg" className="relative overflow-hidden">
                {/* Big faded number */}
                <div
                  className="absolute -top-8 -right-4 font-display font-extrabold text-[14rem] leading-none opacity-[0.05] select-none pointer-events-none"
                  style={{ color: step.accent }}
                >
                  {step.number}
                </div>

                <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 relative z-10">
                  {/* Icon + connector */}
                  <div className="flex md:flex-col items-start md:items-center gap-4">
                    <div
                      className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-white shadow-[0_16px_40px_rgba(0,0,0,0.15)]"
                      style={{ background: step.gradient }}
                    >
                      {step.icon}
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className="hidden md:block w-[3px] flex-1 rounded-full"
                        style={{ background: `linear-gradient(180deg, ${step.accent} 0%, transparent 100%)` }}
                      />
                    )}
                  </div>

                  <div>
                    {/* Step number badge */}
                    <div
                      className="inline-flex items-center gap-2 text-[10px] font-display font-extrabold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
                      style={{
                        color: step.accent,
                        background: `${step.accent}10`,
                        border: `1px solid ${step.accent}33`,
                      }}
                    >
                      Étape {step.number}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-extrabold uppercase text-2xl md:text-3xl text-[var(--text-primary)] mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p
                      className="text-base md:text-lg italic font-display font-semibold mb-5"
                      style={{ color: step.accent }}
                    >
                      {step.subtitle}
                    </p>

                    {/* Body */}
                    <p className="text-[var(--text-body)] leading-relaxed mb-6">{step.body}</p>

                    {/* Sub-features */}
                    <div className="bg-[var(--bg-elevated)] rounded-xl p-5">
                      <div className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-display font-bold mb-3">
                        Inclus dans cette étape
                      </div>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {step.subFeatures.map((feature, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-[var(--text-body)] leading-snug">
                            <Check
                              size={14}
                              className="flex-shrink-0 mt-0.5"
                              style={{ color: step.accent }}
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
