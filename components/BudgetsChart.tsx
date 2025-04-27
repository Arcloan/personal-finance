// components/BudgetsChart.tsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useBudgetsState } from '@/context/budgets/BudgetsStateContext';
import { useTransactionsState } from '@/context/transactions/TransactionsStateContext';

export default function BudgetsChart() {
  const budgets = useBudgetsState();
  const transactions = useTransactionsState();
  const categories = budgets.map((budget) => budget.category);

  return (
    <div className="bg-white p-4 px-8 rounded-lg xl:col-span-2 xl:order-2 xl:row-start-1 xl:row-end-3">
      <div className="flex justify-between mb-4 mt-8">
        <p className="font-semibold">Budgets</p>
        <button className="text-sm text-grey-500">See Details →</button>
      </div>
      <div className="w-full h-64 max-sm:h-92 flex mt-4 items-center max-sm:flex-col">
        {/*// @ts-expect-error It seems the responsive container want only one child but it does work perfect with two child*/}
        <ResponsiveContainer className={"relative"}>
          <div className='absolute grid top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
            {<p className='font-semibold text-4xl'>{`$${transactions.filter((transaction) => {
              return (categories.some((cat) => cat === transaction.category)) && (transaction.date.split("-")[1] == "08");
            }).
              reduce((acc, transactionRemained) => acc + Math.abs(transactionRemained.amount), 0)
            }`}</p>}
            <p className='text-Grey500 text-sm justify-self-center'>{`of ${budgets.reduce((acc, budget) => acc + budget.maximum, 0)} limit`}</p>
          </div>
          <PieChart>
            <Pie
              data={budgets}
              dataKey="maximum"
              nameKey="category"
              innerRadius={70}
              outerRadius={110}
              startAngle={450}
              endAngle={90}
            >
              {budgets.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.theme} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className='w-max'>
            <div className='grid max-sm:grid-cols-2 gap-2 text-sm'>
              {budgets.map((budget, idx) => {
                if (idx > 3) {
                  return null;
                }
                return (
                  <div key={idx} className="flex flex-row gap-8 items-center w-max">
                    <div className='w-2 h-full rounded' style={{ backgroundColor: budget.theme }}></div>
                      <div className='flex flex-col gap-2'>
                        <p className='text-Grey500 text-nowrap'>{budget.category}</p>
                        <p className='font-semibold'>{`$${budget.maximum}`}</p>
                      </div>
                    </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  );
}