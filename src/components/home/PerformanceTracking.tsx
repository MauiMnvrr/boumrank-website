'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useInView } from 'framer-motion';
import { QrCode, Star, TrendingUp, UserCheck, Layout, Download, LogOut, FileSpreadsheet, Calendar, MoreHorizontal, Receipt, Ticket, BarChart2 } from 'lucide-react';

interface KPICardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub: string;
  delay: number;
  iconBg: string;
}

const AnimatedNumber = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [spring]);

  return <span ref={ref}>{displayValue.toLocaleString()}{suffix}</span>;
};

const KPICard: React.FC<KPICardProps> = ({ icon: Icon, label, value, sub, delay, iconBg }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '').trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-[#1C2333] border border-white/10 p-6 rounded-2xl hover:border-[#1B6FC2]/30 transition-all group"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform ${iconBg}`}>
          <Icon className="text-white w-5 h-5" />
        </div>
        <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">{label}</span>
      </div>
      <div className="text-4xl font-extrabold text-white mb-1">
        <AnimatedNumber value={numericValue} suffix={suffix} />
      </div>
      <p className="text-gray-500 text-[10px] font-medium leading-tight h-8 overflow-hidden">{sub}</p>
    </motion.div>
  );
};

export const PerformanceTracking = () => {
  return (
    <section id="analytics" className="py-24 bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#2EAE6D]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-1 gap-16 items-center">

          {/* Header Area */}
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-[var(--bg-surface)] dark:bg-[#161B22] border border-[var(--border-highlight)] px-4 py-1.5 rounded-full mb-6">
                <BarChart2 className="w-4 h-4 text-[#1B6FC2]" />
                <span className="text-[#1B6FC2] text-xs font-bold uppercase tracking-widest">Pilotage Business</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold uppercase mb-6 leading-tight text-[var(--text-primary)]">
                Pilotez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B6FC2] via-[#1E9DAA] to-[#2EAE6D]">croissance</span> en temps r&eacute;el
              </h2>
              <p className="text-[var(--text-secondary)] text-lg">
                Acc&eacute;dez &agrave; un tableau de bord intuitif pour mesurer l&apos;impact de vos jeux sur votre business.
              </p>
            </motion.div>
          </div>

          {/* Full Mockup Dashboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full max-w-6xl mx-auto"
          >
            {/* Main Admin Interface Mockup */}
            <div className="bg-[#1C2333] rounded-[2rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden">

              {/* Dashboard Header/Navbar */}
              <div className="bg-[#0D1117] p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <button className="bg-[#161B22] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 border border-white/10">
                    <Layout size={14} /> Vue Groupe
                  </button>
                  <button className="bg-[#161B22]/50 text-gray-400 px-4 py-2 rounded-lg text-xs font-bold border border-white/5">
                    Plateforme joueur
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <button className="bg-gradient-to-r from-[#1B6FC2] to-[#2EAE6D] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <FileSpreadsheet size={14} /> Export CSV
                  </button>
                  <button className="bg-[#161B22] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 border border-white/10">
                    <LogOut size={14} /> D&eacute;connexion
                  </button>
                </div>
              </div>

              {/* Page Title & Subtitle */}
              <div className="p-8 text-center bg-[#1C2333]">
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#3A8FE0] uppercase mb-2 tracking-tight">Dashboard Admin</h3>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">Vue d&apos;ensemble de votre campagne</p>
              </div>

              {/* Tabs Menu */}
              <div className="px-8 pb-4 flex justify-center">
                <div className="bg-[#1a1a1a] rounded-xl p-1 flex flex-wrap justify-center gap-1 border border-white/5">
                  {['Stats', 'Jeux et R\u00e9compenses', 'Liens', 'Preuves', 'Tickets', 'Param\u00e8tres'].map((tab, idx) => (
                    <button key={tab} className={`px-6 py-2.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest transition-all ${idx === 0 ? 'bg-[#161B22] text-white' : 'text-gray-500 hover:text-white'}`}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Filter */}
              <div className="px-8 py-4 flex justify-start">
                <button className="bg-[#1a1a1a] text-white px-4 py-2 rounded-lg text-[10px] font-extrabold uppercase flex items-center gap-3 border border-white/10">
                  <Calendar size={14} className="text-[#3A8FE0]" />
                  Tout le temps
                  <MoreHorizontal size={14} />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                <KPICard
                  icon={TrendingUp}
                  label="Parties jou\u00e9es"
                  value="1284"
                  sub="Le nombre de clients qui ont jou\u00e9 aujourd'hui."
                  delay={0.1}
                  iconBg="bg-[#1B6FC2]/80 shadow-[0_0_15px_rgba(27,111,194,0.3)]"
                />
                <KPICard
                  icon={Star}
                  label="Actions marketing"
                  value="452"
                  sub="+452 nouveaux avis Google, +84 abonnements Instagram."
                  delay={0.2}
                  iconBg="bg-[#00CEC9]/80 shadow-[0_0_15px_rgba(0,206,201,0.3)]"
                />
                <KPICard
                  icon={Download}
                  label="R\u00e9compenses gagn\u00e9es"
                  value="128"
                  sub="Nombre de coupons de r\u00e9duction g\u00e9n\u00e9r\u00e9s par les joueurs."
                  delay={0.3}
                  iconBg="bg-[#2EAE6D]/80 shadow-[0_0_15px_rgba(46,174,109,0.3)]"
                />
                <KPICard
                  icon={UserCheck}
                  label="Emails collect\u00e9s"
                  value="842"
                  sub="Base de donn\u00e9es qualifi\u00e9e pour votre marketing direct."
                  delay={0.4}
                  iconBg="bg-[#1B6FC2]/80 shadow-[0_0_15px_rgba(27,111,194,0.3)]"
                />

                {/* Second Row Large Cards */}
                <div className="md:col-span-1">
                  <KPICard
                    icon={Receipt}
                    label="Montant total additions"
                    value="12450 \u20AC"
                    sub="Chiffre d'affaires estim\u00e9 g\u00e9n\u00e9r\u00e9 par vos r\u00e9compenses."
                    delay={0.5}
                    iconBg="bg-orange-500/80 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="md:col-span-3 bg-gradient-to-r from-[#1B6FC2] to-[#7C5CFC] p-8 rounded-3xl relative overflow-hidden group border border-white/10 shadow-[0_20px_40px_rgba(27,111,194,0.3)]"
                >
                  <div className="relative z-10 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                      <Ticket size={32} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-extrabold uppercase tracking-widest mb-1 opacity-80">Tickets r&eacute;cup&eacute;r&eacute;s</h4>
                      <div className="text-5xl font-extrabold text-white">
                        <AnimatedNumber value={152} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700">
                    <Ticket size={120} />
                  </div>
                </motion.div>

                {/* Graph Area */}
                <div className="md:col-span-4 mt-8">
                  <div className="bg-[#1a1a1a] rounded-[2.5rem] p-10 border border-white/5">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="text-red-500 w-5 h-5" />
                          <h4 className="text-white text-xl font-extrabold uppercase tracking-wide">Courbe d&apos;Engagement</h4>
                          <span className="text-gray-500 text-[10px] font-bold uppercase">(30 derniers jours)</span>
                        </div>
                        <p className="text-gray-500 text-xs font-medium">Nombre de scans QR Code par jour</p>
                      </div>
                      <div className="flex items-center gap-2 bg-[#161B22]/50 px-4 py-2 rounded-full border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-white opacity-40"></div>
                        <span className="text-white text-[10px] font-extrabold uppercase tracking-widest">Stable vs semaine pr&eacute;c&eacute;dente</span>
                      </div>
                    </div>

                    {/* Chart Mockup */}
                    <div className="relative h-64 w-full">
                      {/* Grid lines */}
                      <div className="absolute inset-0 flex flex-col justify-between opacity-5">
                        {[0, 1, 2, 3, 4].map(i => <div key={i} className="w-full h-px bg-white"></div>)}
                      </div>

                      <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#1B6FC2" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#1B6FC2" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <motion.path
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                          d="M0,130 C100,140 150,115 200,110 S350,115 400,95 S550,85 600,75 S750,65 800,55 S950,45 1000,35"
                          fill="none"
                          stroke="#3A8FE0"
                          strokeWidth="4"
                          className="drop-shadow-[0_0_10px_rgba(27,111,194,0.8)]"
                        />
                        <motion.path
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 1, duration: 1 }}
                          d="M0,130 C100,140 150,115 200,110 S350,115 400,95 S550,85 600,75 S750,65 800,55 S950,45 1000,35 V200 H0 Z"
                          fill="url(#chartGradient)"
                        />
                      </svg>

                      {/* Timeline Labels */}
                      <div className="flex justify-between mt-4 text-[8px] font-extrabold text-gray-600 uppercase tracking-widest px-2">
                        <span>22/11</span>
                        <span>25/11</span>
                        <span>28/11</span>
                        <span>1/12</span>
                        <span>4/12</span>
                        <span>7/12</span>
                        <span>10/12</span>
                        <span>13/12</span>
                        <span>16/12</span>
                        <span>20/12</span>
                        <span>22/12</span>
                      </div>
                    </div>

                    {/* Footer Stats Grid */}
                    <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/5">
                      <div className="text-center">
                        <div className="text-[#3A8FE0] text-2xl font-extrabold mb-1">
                          <AnimatedNumber value={242} />
                        </div>
                        <div className="text-gray-500 text-[9px] font-extrabold uppercase tracking-widest">Total scans</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white text-2xl font-extrabold mb-1">
                          <AnimatedNumber value={8} />
                        </div>
                        <div className="text-gray-500 text-[9px] font-extrabold uppercase tracking-widest">Moyenne / jour</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[#3A8FE0] text-2xl font-extrabold mb-1">
                          <AnimatedNumber value={14} />
                        </div>
                        <div className="text-gray-500 text-[9px] font-extrabold uppercase tracking-widest">Pic le dim. 14</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Accents */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#7C5CFC]/20 rounded-full blur-[60px] pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#2EAE6D]/20 rounded-full blur-[60px] pointer-events-none"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
