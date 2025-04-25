'use client';

import { ReactNode } from 'react';
import { TransactionsContext } from './TransactionsContext';
import { PotsContext } from './PotsContext';
import { BudgetsContext } from './BudgetsContext';
import data from '@/data.json'; // <-- Supponiamo sempre che i dati siano lì

interface DashboardProviderProps {
  children: ReactNode;
}

export default function DashboardProvider({ children }: DashboardProviderProps) {
  return (
    <TransactionsContext.Provider value={{ transactions: data.transactions }}>
      <PotsContext.Provider value={{ pots: data.pots }}>
        <BudgetsContext.Provider value={{ budgets: data.budgets }}>
          {children}
        </BudgetsContext.Provider>
      </PotsContext.Provider>
    </TransactionsContext.Provider>
  );
}