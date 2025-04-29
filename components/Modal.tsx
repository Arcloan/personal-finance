'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface ModalProps {
  children: ReactNode;
}

export function Modal({ children }: ModalProps) {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 relative max-w-md w-full">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 cursor-pointer text-Grey500 hover:text-Grey900 text-2xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
