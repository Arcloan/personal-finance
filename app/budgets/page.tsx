'use client';

import { useBudgetsState } from '@/context/budgets/BudgetsStateContext';
import { useTransactionsState } from '@/context/transactions/TransactionsStateContext';
import Link from 'next/link';

export default function BudgetsPage() {
  const budgets = useBudgetsState();
  const transactions = useTransactionsState();

  const getSpentAmount = (category: string) => {
    return transactions
      .filter((t) => t.category === category)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  };

  const totalLimit = budgets.reduce((sum, b) => sum + b.maximum, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + getSpentAmount(b.category), 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-Grey900">Budgets</h1>
        <button className="bg-Grey900 text-white px-4 py-2 rounded-lg md:mt-0">
          + Add New Budget
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Chart and Summary */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow flex flex-col items-center">
            <div className="w-48 h-48 bg-Grey100 rounded-full flex items-center justify-center">
              <p className="text-xl font-bold">${totalSpent} / ${totalLimit}</p>
            </div>
            <div className="mt-4 w-full">
              <p className="text-Grey500 font-semibold mb-2">Spending Summary</p>
              <div className="flex flex-col gap-2">
                {budgets.map((b) => (
                  <div key={b.category} className="flex justify-between text-sm">
                    <span>{b.category}</span>
                    <span>${getSpentAmount(b.category)} / ${b.maximum}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right List of Budgets */}
        <div className="flex-1 flex flex-col gap-6">
          {budgets.map((b) => {
            const spent = getSpentAmount(b.category);
            const remaining = b.maximum - spent;
            const latestTransactions = transactions
              .filter((t) => t.category === b.category)
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 3);

            return (
                <div key={b.category} className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full`} style={{backgroundColor: b.theme}} />
                      {b.category}
                    </h2>
                    <Link href={`/budgets/${encodeURIComponent(b.category)}`}>...</Link>
                  </div>
                  <p className="text-sm text-Grey500 mb-2">Maximum of ${b.maximum.toFixed(2)}</p>
                  <div className="w-full h-3 bg-Grey100 rounded-full mb-2">
                    <div
                      className="h-3 rounded-full"
                      style={{ width: `${Math.min(((spent / b.maximum) * 100), 100)}%`, backgroundColor: b.theme || '#277C78' }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <p>Spent <span className="font-semibold">${spent.toFixed(2)}</span></p>
                    <p>Remaining <span className="font-semibold">${remaining > 0 ? remaining.toFixed(2) : '0.00'}</span></p>
                  </div>
                  <div className="bg-Grey100 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-Grey900 font-semibold">Latest Spending</p>
                      <p className="text-sm text-Grey500">See All</p>
                    </div>
                    <div className="flex flex-col divide-y-2 divide-Grey300/50 gap-2">
                      {latestTransactions.map((t, idx) => (
                        <div key={idx} className="flex justify-between text-sm py-4">
                          <div className="flex items-center gap-2">
                            <img src={t.avatar?.slice(1)} alt='' className="size-8 rounded-full" />
                            <span className='font-semibold'>{t.name}</span>
                          </div>
                          <div className='flex flex-col gap-2 text-right'>
                            <p className='font-semibold'>${Math.abs(t.amount).toFixed(2)}</p>
                            <p className='text-Grey500'>{new Date(t.date).toLocaleString().split(",")[0].split("/").map((component, idx) => {
                                if (idx == 1) {
                                    return ["Jan", "Feb", "Mar", "Apr", " May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"][Number(component) - 1]
                                }
                                return component;
                                }).join(" ")}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
