'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Toast {
  message: string;
  type: 'success' | 'error';
}

interface ToastContextType {
  showToast: (message: string, type: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white transition-all duration-500 ease-out ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}