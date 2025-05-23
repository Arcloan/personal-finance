'use client';

import BalanceCard from '@/components/BalanceCard';
import TransactionsList from '@/components/TransactionsList';
import PotsSection from '@/components/PotsSection';
import BudgetsChart from '@/components/BudgetsChart';
import RecurringSection from '@/components/RecurringSection'
import data from '@/data.json';
import DashboardProvider from '@/context/DashboardProvider';

export default function Home() {
  return (
    <DashboardProvider>
      <div className="space-y-6 xl:grid xl:grid-cols-5 gap-x-4 auto-rows-min">
        <h1 className="text-2xl font-bold text-grey-900 lg:col-span-5">Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xl:col-span-5">
          <BalanceCard label="Current Balance" amount={data.balance.current} dark />
          <BalanceCard label="Income" amount={data.balance.income} />
          <BalanceCard label="Expenses" amount={data.balance.expenses} />
        </div>

        <div className='xl:grid max-xl:flex max-xl:flex-col max-xl:gap-y-6 xl:grid-cols-[1fr_40%] xl:gap-x-6 xl:col-span-5 xl:gap-y-6 grid-rows-[218px_168px_327px]'>
          
          <PotsSection />

          <TransactionsList />

          <BudgetsChart />

          <RecurringSection />
        </div>
      </div>
    </DashboardProvider>
  );
}
