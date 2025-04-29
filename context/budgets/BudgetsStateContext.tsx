'use client';
import { createContext, useContext } from 'react';
import { Budget } from './budgetsTypes';

export const BudgetsStateContext = createContext<Budget[] | undefined>(undefined);

export const useBudgetsState = () => {
  const context = useContext(BudgetsStateContext);
  if (!context) {
    throw new Error('useBudgetsState must be used within a BudgetsProvider');
  }
  return context;
};