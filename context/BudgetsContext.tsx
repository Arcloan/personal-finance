'use client';

import { createContext, useContext } from 'react';

interface Budget {
  category: string;
  maximum: number;
  theme: string;
}

interface BudgetsContextType {
  budgets: Budget[];
}

export const BudgetsContext = createContext<BudgetsContextType | undefined>(undefined);

export const useBudgets = () => {
  const context = useContext(BudgetsContext);
  if (!context) {
    throw new Error('useBudgets must be used within a BudgetsProvider');
  }
  return context;
};