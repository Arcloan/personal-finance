'use client';

import { ReactNode, useReducer } from 'react';
import { TransactionsStateContext } from './transactions/TransactionsStateContext';
import { TransactionsDispatchContext } from "./transactions/TransactionsDispatchContext";
import { transactionsReducer } from './transactions/transactionsReducer';
import { PotsStateContext } from './pots/PotsStateContext';
import { PotsDispatchContext } from "./pots/PotsDispatchContext";
import { potsReducer } from './pots/potsReducer';
import { BudgetsStateContext } from './budgets/BudgetsStateContext';
import { BudgetsDispatchContext } from "./budgets/BudgetsDispatchContext";
import { budgetsReducer } from './budgets/budgetsReducer';
import { ToastProvider } from './toast/ToastContext';
import { useEffect } from 'react';
import data from '@/data.json';

interface DashboardProviderProps {
  children: ReactNode;
}

export default function DashboardProvider({ children }: DashboardProviderProps) {
  const [transactions, dispatchTransactions] = useReducer(transactionsReducer, data.transactions);
  const [budgets, dispatchBudgets] = useReducer(budgetsReducer, [], () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('budgets');
      return stored ? JSON.parse(stored) : data.budgets;
    }
    return data.budgets;
  });

  const [pots, dispatchPots] = useReducer(potsReducer, [], () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pots');
      return stored ? JSON.parse(stored) : data.pots;
    }
    return data.pots;
  });

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
    localStorage.setItem('pots', JSON.stringify(pots))
  }, [budgets, pots]);

  return (
    <TransactionsStateContext.Provider value={transactions}>
      <TransactionsDispatchContext.Provider value={dispatchTransactions}>
        <PotsStateContext.Provider value={pots}>
          <PotsDispatchContext.Provider value={dispatchPots}>
            <BudgetsStateContext.Provider value={budgets}>
              <BudgetsDispatchContext.Provider value={dispatchBudgets}>
                <ToastProvider>
                  {children}
                </ToastProvider>
              </BudgetsDispatchContext.Provider>
            </BudgetsStateContext.Provider>
          </PotsDispatchContext.Provider>
        </PotsStateContext.Provider>
      </TransactionsDispatchContext.Provider>
    </TransactionsStateContext.Provider>
  );
}