'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { SIGNUP_URL } from '@/lib/constants';

interface OnboardingContextType {
  isOpen: boolean;
  openModal: (e?: React.MouseEvent, plan?: string) => void;
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

  const openModal = useCallback((e?: React.MouseEvent, plan?: string) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Full-page redirect to the signup app (no iframe) to avoid cross-origin
    // auth / storage partitioning issues. Carries the chosen plan when present.
    if (typeof window !== 'undefined') {
      window.location.href = plan
        ? `${SIGNUP_URL}?plan=${encodeURIComponent(plan)}`
        : SIGNUP_URL;
      return;
    }
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <OnboardingContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </OnboardingContext.Provider>
  );
}
