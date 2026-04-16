'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { OnboardingModal } from './OnboardingModal';

interface OnboardingContextType {
  isOpen: boolean;
  openModal: (e?: React.MouseEvent) => void;
  closeModal: () => void;
}

const OnboardingContext = createContext<OnboardingContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function useOnboarding() {
  return useContext(OnboardingContext);
}

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <OnboardingContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <OnboardingModal isOpen={isOpen} onClose={closeModal} />
    </OnboardingContext.Provider>
  );
}
