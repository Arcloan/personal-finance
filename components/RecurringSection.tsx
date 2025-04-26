import React from 'react';
import { useTransactionsState } from '@/context/transactions/TransactionsStateContext';

interface Transaction {
  name: string;
  amount: number;
  category: string;
  date: string;
  avatar?: string;
  recurring: boolean;
}


function checkIfInside(recurringTransaction: Transaction[], transaction: Transaction) {
  for (const recurTransaction of recurringTransaction) {
    if (recurTransaction.name == transaction.name) {
      return true;
    }
  }
  return false;
}

export default function RecurringSection() {
  const transactions = useTransactionsState();
  const recurringTransaction = [];
  for (const tr of transactions) {
    if (tr.recurring && !(checkIfInside(recurringTransaction, tr))) {
      recurringTransaction.push(tr);
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg 2xl:col-span-2 2xl:order-3 2xl:row-start-3 2xl:row-end-4 2xl:py-6 2xl:px-8">
      <div className="flex justify-between mb-4">
        <p className="font-bold text-xl">Recurring Bills</p>
        <button className="text-sm text-grey-500">View All →</button>
      </div>
      <div className='grid gap-4'>
        <div className='flex justify-between px-4 py-5 rounded-xl bg-Grey100 border-l-6 border-Green'>
          <h3>Paid Bills</h3>
          <p className='font-semibold'>{`$${recurringTransaction.reduce((acc, transaction) => {
            if (! transaction.recurring) {
              return acc;
            }
            if (new Date().getDate() - new Date(transaction.date).getDate() >= 0) {
              return Number((acc + Number(Math.abs(transaction.amount))).toFixed(2));
            }
            return acc;
          }, 0).toFixed(2)}`}</p>
        </div>
        <div className='flex justify-between px-4 py-5 rounded-xl bg-Grey100 border-l-6 border-Gold'>
          <h3>Total Upcoming</h3>
          <p className='font-semibold'>{`$${recurringTransaction.reduce((acc, transaction) => {
            if (! transaction.recurring) {
              return acc;
            }
            if (new Date().getDate() - new Date(transaction.date).getDate() < 0) {
              return Number((acc + Math.abs(transaction.amount)).toFixed(2));
            }
            return acc;
          }, 0).toFixed(2)}`}</p>
        </div>
        <div className='flex justify-between px-4 py-5 rounded-xl bg-Grey100 border-l-6 border-Cyan'>
          <h3>Due Soon</h3>
          <p className='font-semibold'>{`$${transactions.reduce((acc, transaction) => {
            if (! transaction.recurring) {
              return acc;
            }
            if (new Date().getDate() - new Date(transaction.date).getDate() < 0 && new Date().getDate() - new Date(transaction.date).getDate() > -10) {
              return Number((acc + Math.abs(transaction.amount)).toFixed(2));
            }
            return acc;
          }, 0).toFixed(2)}`}</p>
        </div>

      </div>
    </div>
  );
}