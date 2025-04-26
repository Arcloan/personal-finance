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
import data from '@/data.json';

interface DashboardProviderProps {
  children: ReactNode;
}

export default function DashboardProvider({ children }: DashboardProviderProps) {
  const [transactions, dispatchTransactions] = useReducer(transactionsReducer, data.transactions);
  const [pots, dispatchPots] = useReducer(potsReducer, data.pots);
  const [budgets, dispatchBudgets] = useReducer(budgetsReducer, data.budgets);

  return (
    <TransactionsStateContext.Provider value={transactions}>
      <TransactionsDispatchContext.Provider value={dispatchTransactions}>
        <PotsStateContext.Provider value={pots}>
          <PotsDispatchContext.Provider value={dispatchPots}>
            <BudgetsStateContext.Provider value={budgets}>
              <BudgetsDispatchContext.Provider value={dispatchBudgets}>
                {children}
              </BudgetsDispatchContext.Provider>
            </BudgetsStateContext.Provider>
          </PotsDispatchContext.Provider>
        </PotsStateContext.Provider>
      </TransactionsDispatchContext.Provider>
    </TransactionsStateContext.Provider>
  );
}