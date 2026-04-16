'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronDown, HelpCircle } from 'lucide-react';
import { useOnboarding } from '@/components/ui/OnboardingProvider';

interface Feature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: Feature[];
  cta: string;
  recommended?: boolean;
  delay: number;
  onCtaClick?: (e?: React.MouseEvent) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ name, price, period, description, features, cta, recommended, delay, onCtaClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`relative p-8 rounded-3xl border ${
        recommended
          ? 'bg-[var(--bg-surface)] dark:bg-gradient-to-b dark:from-[#161B22] dark:to-[#0D1117] border-[#1B6FC2] shadow-[0_0_40px_rgba(27,111,194,0.1)] dark:shadow-[0_0_40px_rgba(27,111,194,0.15)] ring-1 ring-[#1B6FC2]'
          : 'bg-[var(--bg-surface)] dark:bg-white/5 border-[var(--border-default)] backdrop-blur-xl'
      } flex flex-col h-full group hover:translate-y-[-8px] transition-all duration-300`}
    >
      {recommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] text-white text-[10px] font-extrabold uppercase px-4 py-1 rounded-full tracking-widest shadow-[0_0_15px_rgba(27,111,194,0.4)]">
          Conseill&eacute;
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-extrabold uppercase text-[var(--text-primary)] mb-2">{name}</h3>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{description}</p>
      </div>

      <div className="mb-8 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold text-[var(--text-primary)]">{price}</span>
        {period && <span className="text-[var(--text-muted)] font-bold text-sm uppercase">/{period}</span>}
      </div>

      <ul className="space-y-4 mb-10 flex-1">
        {features.map((feature, i) => (
          <li key={i} className={`flex items-start gap-3 text-sm h-10 ${feature.included ? 'text-[var(--text-body)]' : 'text-[var(--text-muted)] italic'}`}>
            {feature.included ? (
              <CheckCircle2 className="w-5 h-5 text-[#2EAE6D] flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400/60 flex-shrink-0 mt-0.5" />
            )}
            <span className="leading-tight">{feature.text}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onCtaClick}
        className={`w-full py-4 rounded-full font-extrabold uppercase text-sm tracking-widest transition-all text-center flex items-center justify-center ${
          recommended
            ? 'bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] text-white shadow-[0_0_20px_rgba(27,111,194,0.4)]'
            : 'bg-[var(--bg-elevated)] dark:bg-white/10 text-[var(--text-primary)] hover:bg-[var(--border-default)] dark:hover:bg-white/20 border border-[var(--border-default)]'
        }`}
      >
        {cta}
      </button>
    </motion.div>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border-default)] last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-[#1B6FC2] transition-colors"
      >
        <span className="font-bold text-lg text-[var(--text-primary)]">{question}</span>
        <ChevronDown className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[var(--text-secondary)] leading-relaxed text-sm">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Pricing = () => {
  const { openModal } = useOnboarding();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      name: "L'Essentiel",
      price: "65\u20ac",
      period: "mois",
      description: "Le pack id\u00e9al pour d\u00e9marrer sereinement avec des scans illimit\u00e9s.",
      features: [
        { text: "Scans QR Code : Illimit\u00e9s", included: true },
        { text: "1 Jeu au choix", included: true },
        { text: "Logo personnalis\u00e9", included: true },
        { text: "Acc\u00e8s au dashboard de performance", included: true },
        { text: "Validation par IA : non inclus", included: false },
        { text: "Branding : Non personnalisable", included: false }
      ],
      cta: "Choisir L'Essentiel",
      delay: 0.1
    },
    {
      name: "Performance",
      price: "79\u20ac",
      period: "mois",
      recommended: true,
      description: "La solution compl\u00e8te pour automatiser la r\u00e9colte d'avis et la fid\u00e9lisation.",
      features: [
        { text: "Scans QR Code : Illimit\u00e9s", included: true },
        { text: "Acc\u00e8s \u00e0 tous les jeux", included: true },
        { text: "Branding : Enti\u00e8rement personnalisable", included: true },
        { text: "Acc\u00e8s au dashboard de performance", included: true },
        { text: "Validation par IA automatique", included: true },
        { text: "Support prioritaire 24/7", included: true }
      ],
      cta: "Choisir Performance",
      delay: 0.2
    },
    {
      name: "Enterprise",
      price: "Sur Mesure",
      period: "",
      description: "Solution sur mesure pour les franchises et les r\u00e9seaux multi-points.",
      features: [
        { text: "Gestion multi-comptes", included: true },
        { text: "White-label total", included: true },
        { text: "API custom", included: true },
        { text: "Account Manager d\u00e9di\u00e9", included: true },
        { text: "Formation des \u00e9quipes", included: true },
        { text: "SLA de performance", included: true }
      ],
      cta: "Nous contacter",
      delay: 0.3
    }
  ];

  const faqs = [
    {
      question: "Puis-je changer de plan \u00e0 tout moment ?",
      answer: "Absolument. Vous pouvez passer \u00e0 l'offre sup\u00e9rieure \u00e0 tout moment pour d\u00e9bloquer plus de fonctionnalit\u00e9s. Le changement est instantan\u00e9."
    },
    {
      question: "Comment fonctionne la validation par IA ?",
      answer: "Lorsqu'un client r\u00e9alise une action (ex: un avis Google), il soumet une capture d'\u00e9cran. Notre IA analyse l'image en moins de 3 secondes pour v\u00e9rifier la conformit\u00e9 avec vos crit\u00e8res."
    },
    {
      question: "L'engagement est-il obligatoire ?",
      answer: "Nos plans mensuels sont sans engagement. Vous pouvez arr\u00eater quand vous le souhaitez."
    },
    {
      question: "Offrez-vous une d\u00e9mo personnalis\u00e9e ?",
      answer: "Oui ! Cliquez sur le bouton 'Voir la d\u00e9mo' ou contactez notre \u00e9quipe commerciale pour une pr\u00e9sentation adapt\u00e9e \u00e0 votre secteur d'activit\u00e9."
    }
  ];

  return (
    <section id="tarifs" className="py-24 bg-[var(--bg-primary)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1B6FC2]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#1B6FC2] font-bold uppercase tracking-widest text-sm">Tarification transparente</span>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase mt-4 mb-6 leading-none text-[var(--text-primary)]">
            Boostez votre <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">r&eacute;putation</span> au juste prix
          </h2>

          <div className="flex items-center justify-center gap-4 mt-12">
            <span className={`text-sm font-bold uppercase tracking-wider ${billingPeriod === 'monthly' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>Mensuel</span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className="w-16 h-8 bg-[var(--bg-elevated)] dark:bg-[#161B22] rounded-full p-1 relative border border-[var(--border-default)]"
            >
              <motion.div
                animate={{ x: billingPeriod === 'monthly' ? 0 : 32 }}
                className="w-6 h-6 bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D] rounded-full shadow-[0_0_10px_rgba(27,111,194,0.5)]"
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold uppercase tracking-wider ${billingPeriod === 'yearly' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>Annuel</span>
              <span className="bg-[#1B6FC2]/10 text-[#1B6FC2] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-[#1B6FC2]/20">-20% OFFERT</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          {plans.map((plan, idx) => (
            <PricingCard key={idx} {...plan} onCtaClick={openModal} />
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[var(--bg-surface)] dark:bg-[#161B22] border border-[var(--border-default)] px-4 py-1.5 rounded-full mb-4">
              <HelpCircle className="w-4 h-4 text-[#1B6FC2]" />
              <span className="text-[var(--text-primary)] text-xs font-bold uppercase tracking-widest">Questions Fr&eacute;quentes</span>
            </div>
            <h3 className="text-3xl font-extrabold uppercase text-[var(--text-primary)]">Besoin d&apos;aide ?</h3>
          </div>

          <div className="bg-[var(--bg-surface)] dark:bg-white/5 border border-[var(--border-default)] rounded-3xl p-8 backdrop-blur-xl">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
