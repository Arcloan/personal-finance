'use client';
import { createContext, useContext } from 'react';
import { PotsAction } from './potsReducer';

export const PotsDispatchContext = createContext<React.Dispatch<PotsAction> | undefined>(undefined);

export const usePotsDispatch = () => {
  const context = useContext(PotsDispatchContext);
  if (!context) {
    throw new Error('usePotsDispatch must be used within a PotsProvider');
  }
  return context;
};