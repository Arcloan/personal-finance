import React from 'react';
import { useTransactionsState } from '@/context/transactions/TransactionsStateContext';
import { calculateDueSoon } from '@/libraries/recurringHelpers';
import { calculatePaid } from '@/libraries/recurringHelpers';
import { calculateTotalUpcoming } from '@/libraries/recurringHelpers';
import { checkIfInside } from '@/libraries/recurringHelpers';
import Link from 'next/link';

export default function RecurringSection() {
  const transactions = useTransactionsState();
  const recurringTransaction = [];
  for (const tr of transactions) {
    if (tr.recurring && !(checkIfInside(recurringTransaction, tr))) {
      recurringTransaction.push(tr);
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg xl:col-start-2 xl:order-3 xl:row-start-3 xl:row-end-4 xl:py-6 xl:px-8">
      <div className="flex justify-between mb-4">
        <p className="font-bold text-xl">Recurring Bills</p>
        <Link href={"/recurring-bills"} className="text-sm text-grey-500">View All →</Link>
      </div>
      <div className='grid gap-4'>
        <div className='flex justify-between px-4 py-5 rounded-xl bg-Grey100 border-l-6 border-Green'>
          <h3>Paid Bills</h3>
          <p className='font-semibold'>{`$${recurringTransaction.reduce(calculatePaid, 0).toFixed(2)}`}</p>
        </div>
        <div className='flex justify-between px-4 py-5 rounded-xl bg-Grey100 border-l-6 border-Gold'>
          <h3>Total Upcoming</h3>
          <p className='font-semibold'>{`$${recurringTransaction.reduce(calculateTotalUpcoming, 0).toFixed(2)}`}</p>
        </div>
        <div className='flex justify-between px-4 py-5 rounded-xl bg-Grey100 border-l-6 border-Cyan'>
          <h3>Due Soon</h3>
          <p className='font-semibold'>{`$${transactions.reduce(calculateDueSoon, 0).toFixed(2)}`}</p>
        </div>

      </div>
    </div>
  );
}