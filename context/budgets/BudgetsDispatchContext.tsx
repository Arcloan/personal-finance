'use client';
import { createContext, useContext } from 'react';
import { BudgetsAction } from './budgetsReducer';

export const BudgetsDispatchContext = createContext<React.Dispatch<BudgetsAction> | undefined>(undefined);

export const useBudgetsDispatch = () => {
  const context = useContext(BudgetsDispatchContext);
  if (!context) {
    throw new Error('useBudgetsDispatch must be used within a BudgetsProvider');
  }
  return context;
};