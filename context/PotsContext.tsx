'use client';

import { createContext, useContext } from 'react';

interface Pot {
  name: string;
  target: number;
  total: number;
  theme: string;
}

interface PotsContextType {
  pots: Pot[];
}

export const PotsContext = createContext<PotsContextType | undefined>(undefined);

export const usePots = () => {
  const context = useContext(PotsContext);
  if (!context) {
    throw new Error('usePots must be used within a PotsProvider');
  }
  return context;
};