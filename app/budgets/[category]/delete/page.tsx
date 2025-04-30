'use client';

import { useBudgetsState } from '@/context/budgets/BudgetsStateContext';
import { useTransactionsState } from '@/context/transactions/TransactionsStateContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import BudgetDropdown from '@/components/BudgetDropdown';
import ModalDeleteBudget from '@/components/ModalDeleteBudget';

export default function BudgetsPage() {
  const budgets = useBudgetsState();
  const transactions = useTransactionsState();
  const categories = budgets.map((budget) => budget.category);

  const getSpentAmount = (category: string) => {
    return transactions
      .filter((t) => t.category === category && new Date(t.date).getMonth() == 7)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  };

  return (
    <div className="p-6">
      <ModalDeleteBudget></ModalDeleteBudget>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-Grey900">Budgets</h1>
        <button className="bg-Grey900 text-white px-4 py-2 rounded-lg md:mt-0">
          + Add New Budget
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        
        <div className="xl:w-1/3 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow flex flex-col md:max-lg:flex-row md:max-lg:gap-8 md:max-lg:pl-8 items-center">
            <div className="w-full h-64 max-sm:h-92 flex mt-4 items-center max-sm:flex-col md:max-lg:w-64 md:max-lg:shrink-0">
              {/*// @ts-expect-error It seems the responsive container want only one child but it does work perfect with two child*/}
              <ResponsiveContainer className={"relative"}>
                <div className='absolute grid top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
                  {<p className='font-semibold text-3xl'>{`$${transactions.filter((transaction) => {
                    return (categories.some((cat) => cat === transaction.category)) && (transaction.date.split("-")[1] == "08");
                    }).reduce((acc, transactionRemained) => acc + Math.abs(transactionRemained.amount), 0).toFixed(2)}`}
                  </p>}
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
            </div>
            <div className="mt-4 w-full">
              <p className="text-Grey500 font-semibold mb-2">Spending Summary</p>
              <div className='grid gap-2 text-sm'>
                {budgets.map((budget, idx) => {
                  return (
                    <div key={idx} className="flex flex-row gap-3 items-center w-full">
                      <div className='w-2 h-8 rounded' style={{ backgroundColor: budget.theme }}></div>
                        <div className='flex justify-between w-full'>
                          <p className='text-Grey500 text-nowrap'>{budget.category}</p>
                          <p className='font-semibold'>{`$${getSpentAmount(budget.category).toFixed(2)}`}<span className='font-normal text-Grey500'>{` of $${budget.maximum.toFixed(2)}`}</span></p>
                        </div>
                      </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

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
                    <BudgetDropdown name='Budget' onDelete={() => null} onEdit={() => null}></BudgetDropdown>
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
                            <img src={t.avatar?.slice(1)} alt='Avatar image' className="size-8 rounded-full" />
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
