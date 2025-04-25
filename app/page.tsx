// app/page.tsx
'use client';

import BalanceCard from '@/components/BalanceCard';
import TransactionsList from '@/components/TransactionsList';
import PotsSection from '@/components/PotsSection';
import BudgetsChart from '@/components/BudgetsChart';
import data from '@/data.json';
import DashboardProvider from '@/context/DashboardProvider';

export default function Home() {
  return (
    <DashboardProvider>
      <div className="space-y-6 2xl:grid 2xl:grid-cols-5 gap-x-4 auto-rows-min">
        <h1 className="text-2xl font-bold text-grey-900 lg:col-span-5">Overview</h1>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 2xl:col-span-5">
          <BalanceCard label="Current Balance" amount={data.balance.current} dark />
          <BalanceCard label="Income" amount={data.balance.income} />
          <BalanceCard label="Expenses" amount={data.balance.expenses} />
        </div>

        <div className='2xl:grid max-2xl:flex max-2xl:flex-col max-2xl:gap-y-6 2xl:grid-cols-subgrid 2xl:col-span-5 2xl:gap-y-6 grid-rows-[218px_192px_327px]'>
          {/* Pot Section */}
          <PotsSection />

          {/* Transactions List */}
          <TransactionsList />

          {/* Budgets Chart */}
          <BudgetsChart />
        </div>
      </div>
    </DashboardProvider>
  );
}
