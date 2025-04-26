import { createContext, useContext } from 'react';
import { TransactionsAction } from './transactionsReducer';

export const TransactionsDispatchContext = createContext<React.Dispatch<TransactionsAction> | undefined>(undefined);

export const useTransactionsDispatch = () => {
  const context = useContext(TransactionsDispatchContext);
  if (!context) {
    throw new Error('useTransactionsDispatch must be used within a TransactionsProvider');
  }
  return context;
};