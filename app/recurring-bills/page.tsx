'use client';

import { useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTransactionsState } from '@/context/transactions/TransactionsStateContext';
import { calculateDueSoon } from '@/libraries/recurringHelpers';
import { calculatePaid } from '@/libraries/recurringHelpers';
import { calculateTotalUpcoming } from '@/libraries/recurringHelpers';
import { checkIfInside } from '@/libraries/recurringHelpers';
import { isPaid } from '@/libraries/recurringHelpers';
import { isDueSoon } from '@/libraries/recurringHelpers';
import SelectWithImage from '@/components/SelectWithImage';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'atoz', label: 'A to Z' },
  { value: 'ztoa', label: 'Z to A' },
  { value: 'highest', label: 'Highest' },
  { value: 'lowest', label: 'Lowest' },
];

export default function RecurringBillsPage() {
  const transactions = useTransactionsState();
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'newest';

  const recurringTransaction = [];
    for (const tr of transactions) {
      if (tr.recurring && !(checkIfInside(recurringTransaction, tr))) {
        recurringTransaction.push(tr);
      }
    }

  const bills = useMemo(() => {
    const recurringTransaction = [];
    for (const tr of transactions) {
      if (tr.recurring && !(checkIfInside(recurringTransaction, tr))) {
        recurringTransaction.push(tr);
      }
    }
    return recurringTransaction;
  }, [transactions]);

  const filteredBills = useMemo(() => {
    const filtered = bills.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase())
    );
    switch (sort) {
      case 'newest':
        return filtered.sort((a, b) => new Date(b.date).getDate() - new Date(a.date).getDate());
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate());
      case 'atoz':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'ztoa':
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      case 'highest':
        return filtered.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
      case 'lowest':
        return filtered.sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
      default:
        return filtered;
    }
  }, [bills, search, sort]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`/recurring-bills?${params.toString()}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-Grey900 mb-6">Recurring Bills</h1>

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Left Summary Boxes */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          <div className="bg-Grey900 text-white p-6 rounded-2xl flex flex-col gap-2">
            <div className="flex md:flex-col max-md:items-center max-md:gap-4 gap-2">
              <img className='size-10' src="/assets/images/icon-recurring-bills.svg" alt="" />
                <div className='flex flex-col gap-1'>
                    <p>Total Bills</p>
                    <p className="text-3xl font-bold">{`$${(Number(recurringTransaction.reduce(calculatePaid, 0).toFixed(2)) + Number(recurringTransaction.reduce(calculateTotalUpcoming, 0).toFixed(2))).toFixed(2)}`}</p>
                </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl flex flex-col gap-4">
            <p className="font-semibold text-Grey900">Summary</p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <p>Paid Bills</p>
                <p className="font-semibold">{`${recurringTransaction.filter(isPaid).length}($${recurringTransaction.reduce(calculatePaid, 0).toFixed(2)})`}</p>
              </div>
              <div className="flex justify-between">
                <p>Total Upcoming</p>
                <p className="font-semibold">{`${recurringTransaction.filter((t) => !isPaid(t)).length}($${recurringTransaction.reduce(calculateTotalUpcoming, 0).toFixed(2)})`}</p>
              </div>
              <div className="flex justify-between text-Red">
                <p>Due Soon</p>
                <p className="font-semibold">{`${recurringTransaction.filter(isDueSoon).length}($${transactions.reduce(calculateDueSoon, 0).toFixed(2)})`}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Table Section */}
        <div className="flex-1 bg-white rounded-lg shadow overflow-x-auto p-4">
          {/* Controls */}
          <div className="flex gap-4 max-md:gap-8 mb-4">
            <input
              type="text"
              placeholder="Search bills"
              aria-label='Search'
              value={search}
              onChange={(e) => updateParam('search', e.target.value)}
              className="border rounded-lg px-4 py-2 w-full md:w-1/2 hover:cursor-pointer"
            />
            <SelectWithImage imageUrl="/assets/images/icon-sort-mobile.svg" type="sort" options={[
                        { value: 'newest', label: 'Newest' },
                        { value: 'oldest', label: 'Oldest' },
                        { value: 'atoz', label: 'A to Z' },
                        { value: 'ztoa', label: 'Z to A' },
                        { value: 'highest', label: 'Highest' },
                        { value: 'lowest', label: 'Lowest' },
                        ]} updateParam={updateParam}></SelectWithImage>
            <div className="ml-auto flex gap-2 items-center max-md:hidden">
              <label htmlFor='sort' className="text-Grey500">Sort by</label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="border rounded-lg px-4 py-2 hover:cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bills Table */}
          <div>
            <table className="min-w-full">
              <thead className="text-left text-sm text-Grey500">
                <tr className='max-md:hidden'>
                  <th className="p-4">Bill Title</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.map((bill, idx) => (
                  <tr key={idx} className="border-t border-Grey100 max-md:flex max-md:flex-col">
                    <td className="p-4 flex items-center gap-3 max-md:font-semibold">
                      <img src={bill.avatar?.slice(1)} alt="Image of the bill entity" className='size-10 rounded-full' />
                      {bill.name}
                    </td>
                    <td className={`p-4 max-md:flex max-md:justify-between ${isPaid(bill) ? 'text-Green' : "text-Grey500"}`}>
                        <div className='flex gap-2 items-center'>
                          <p>Monthly - {new Date(bill.date).getDate()}th</p>
                          {isPaid(bill) ? <img src="/assets/images/icon-bill-paid.svg" alt="Paid bill icon" /> : ""}
                          {isDueSoon(bill) ? <img  src="/assets/images/icon-bill-due.svg" alt="Due Soon bill icon" /> : ""}
                        </div>
                        <p className='md:hidden text-black font-semibold'>${Math.abs(bill.amount).toFixed(2)}</p>
                    </td>
                    <td className={`p-4 font-semibold max-md:hidden ${isDueSoon(bill) ? "text-Red": ""}`}>${Math.abs(bill.amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
