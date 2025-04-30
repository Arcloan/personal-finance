'use client';

import { usePotsState } from '@/context/pots/PotsStateContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BudgetDropdown from '@/components/BudgetDropdown';
import ModalDeletePot from '@/components/ModalDeletePot';

export default function PotsPage() {
  const pots = usePotsState();
  const router = useRouter();

  return (
    <div className="p-6">
      <ModalDeletePot></ModalDeletePot>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-Grey900">Pots</h1>
        <Link href="/pots/create" className="bg-Grey900 text-white px-4 py-2 rounded-lg">
          + Add New Pot
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {pots.map((pot) => {
          const percentage = Math.min((pot.total / pot.target) * 100, 100);

          return (
            <div
              key={pot.name}
              className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pot.theme }} />
                  {pot.name}
                </h2>
                <BudgetDropdown
                  onEdit={() => router.push(`/pots/${encodeURIComponent(pot.name)}/edit`)}
                  onDelete={() => router.push(`/pots/${encodeURIComponent(pot.name)}/delete`)}
                  name='Pot'
                />
              </div>
              <div className="flex justify-between items-end mb-2">
                <div className="text-sm text-Grey500">Total Saved</div>
                <div className="text-xl font-bold text-right">${pot.total.toFixed(2)}</div>
              </div>
              <div className="w-full h-3 bg-Grey100 rounded-full mb-1">
                <div
                  className="h-3 rounded-full"
                  style={{ width: `${percentage}%`, backgroundColor: pot.theme || '#277C78' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-Grey500 mb-4">
                <span>{percentage.toFixed(1)}%</span>
                <span>Target of ${pot.target.toLocaleString()}</span>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 py-2 rounded-lg bg-Grey100 text-Grey900 font-medium">
                  + Add Money
                </button>
                <button className="flex-1 py-2 rounded-lg bg-Grey100 text-Grey900 font-medium">
                  Withdraw
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
