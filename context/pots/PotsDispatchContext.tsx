'use client';
import { createContext, useContext } from 'react';
import { PotAction } from './potsTypes';

export const PotsDispatchContext = createContext<React.Dispatch<PotAction> | undefined>(undefined);

export const usePotsDispatch = () => {
  const context = useContext(PotsDispatchContext);
  if (!context) {
    throw new Error('usePotsDispatch must be used within a PotsProvider');
  }
  return context;
};