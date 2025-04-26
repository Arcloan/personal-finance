'use client';
import { createContext, useContext } from 'react';
import { Transaction } from './transactionsReducer';

export const TransactionsStateContext = createContext<Transaction[] | undefined>(undefined);

export const useTransactionsState = () => {
  const context = useContext(TransactionsStateContext);
  if (!context) {
    throw new Error('useTransactionsState must be used within a TransactionsProvider');
  }
  return context;
};