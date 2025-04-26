import React from 'react';
import { useTransactions } from '@/context/TransactionsContext';
import clsx from 'clsx';

export default function RecurringSection() {
  const { transactions } = useTransactions();

  return (
    <div className="bg-white p-4 rounded-lg 2xl:col-span-2 2xl:order-3 2xl:row-start-3 2xl:row-end-4 2xl:py-10 2xl:px-8">
      <div className="flex justify-between mb-4">
        <p className="font-bold text-xl">Recurring Bills</p>
        <button className="text-sm text-grey-500">View All →</button>
      </div>
      
    </div>
  );
}