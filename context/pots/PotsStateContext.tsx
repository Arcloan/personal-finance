'use client';
import { createContext, useContext } from 'react';
import { Pot } from './potsTypes';

export const PotsStateContext = createContext<Pot[] | undefined>(undefined);

export const usePotsState = () => {
  const context = useContext(PotsStateContext);
  if (!context) {
    throw new Error('usePotsState must be used within a PotsProvider');
  }
  return context;
};