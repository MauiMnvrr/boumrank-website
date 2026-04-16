'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, ExternalLink } from 'lucide-react';
import { SIGNUP_URL } from '@/lib/constants';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0D1117]/95 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full h-full max-w-6xl bg-[#0D1117] md:rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden border border-white/10 flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#161B22]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#3A8FE0] rounded-full animate-pulse shadow-[0_0_10px_rgba(27,111,194,0.6)]"></div>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400">
                  Connexion sécurisée à BoumRank App
                </span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#3A8FE0] transition-colors p-2"
                  title="Ouvrir dans un nouvel onglet"
                >
                  <ExternalLink size={20} />
                </a>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Iframe Area */}
            <div className="flex-1 relative bg-white">
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0D1117] z-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mb-4"
                  >
                    <Loader2 size={48} className="text-[#3A8FE0]" />
                  </motion.div>
                  <p className="text-[#3A8FE0] font-extrabold uppercase tracking-widest text-sm animate-pulse">
                    Préparation du terrain...
                  </p>
                </div>
              )}

              <iframe
                src={SIGNUP_URL}
                className="w-full h-full border-none"
                onLoad={() => setIsLoading(false)}
                title="BoumRank Signup"
                allow="camera; microphone; geolocation"
              />
            </div>

            {/* Subtle Footer */}
            <div className="px-6 py-2 bg-[#161B22] border-t border-white/5 text-center">
              <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                Propulsé par l&apos;écosystème BoumRank &bull; HTTPS Sécurisé
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
