'use client';

import { createContext, useContext } from 'react';

interface Transaction {
  name: string;
  amount: number;
  category: string;
  date: string;
  avatar?: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
}

export const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
};