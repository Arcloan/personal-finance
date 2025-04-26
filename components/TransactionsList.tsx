import React from 'react';
import { useTransactionsState } from '@/context/transactions/TransactionsStateContext';
import clsx from 'clsx';

export default function TransactionsList() {
  const transactions = useTransactionsState();

  return (
    <div className="bg-white p-4 rounded-lg 2xl:col-span-3 2xl:order-3 2xl:row-start-2 2xl:row-end-4 2xl:py-10 2xl:px-8">
      <div className="flex justify-between mb-4">
        <p className="font-semibold">Transactions</p>
        <button className="text-sm text-grey-500">View All →</button>
      </div>
      <ul className="divide-y divide-Grey100 text-sm flex flex-col gap-4">
        {transactions.slice(0, 5).map((t, idx) => (
          <li key={idx} className="flex justify-between py-3">
            <div className='flex gap-4 items-center'>
              <img src={t.avatar?.slice(1)} alt="Picture profile" className='rounded-[50%] 2xl:size-12 w-8 h-8'></img>
              <p>{t.name}</p>
            </div>
            <div className='flex flex-col gap-2 items-end'>
              <p className={clsx("font-semibold",
                {"text-Green": t.amount > 0,
                  "text-black": t.amount < 0
                }
               )}>
                {t.amount > 0 ? '+' : ''}${t.amount.toFixed(2)}
              </p>
              <p className='text-Grey500'>{new Date(t.date).toLocaleString().split(",")[0].split("/").map((component, idx) => {
                if (idx == 1) {
                  return ["Jan", "Feb", "Mar", "Apr", " May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"][Number(component) - 1]
                }
                return component;
              }).join(" ")}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}