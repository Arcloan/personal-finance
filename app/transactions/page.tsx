'use client';

import { useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTransactionsState } from '@/context/transactions/TransactionsStateContext';
// import Link from 'next/link';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'atoz', label: 'A to Z' },
  { value: 'ztoa', label: 'Z to A' },
  { value: 'highest', label: 'Highest' },
  { value: 'lowest', label: 'Lowest' },
];

export default function TransactionsPage() {
  const transactions = useTransactionsState();
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'newest';
  const filter = searchParams.get('filter') || 'all';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const categories = useMemo(() => {
    const unique = new Set(transactions.map((t) => t.category));
    return Array.from(unique);
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    let filtered = transactions.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
    );
    if (filter !== 'all') {
      filtered = filtered.filter((t) => t.category === filter);
    }
    switch (sort) {
      case 'newest':
        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'oldest':
        return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'atoz':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'ztoa':
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      case 'highest':
        return filtered.sort((a, b) => b.amount - a.amount);
      case 'lowest':
        return filtered.sort((a, b) => a.amount - b.amount);
      default:
        return filtered;
    }
  }, [transactions, search, sort, filter]);

  const pageSize = 10;
  const totalPages = Math.ceil(filteredTransactions.length / pageSize);
  const displayedTransactions = filteredTransactions.slice((page - 1) * pageSize, page * pageSize);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    if (key !== 'page') params.set('page', '1');
    router.push(`/transactions?${params.toString()}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-Grey900 mb-6">Transactions</h1>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search transaction"
          value={search}
          onChange={(e) => updateParam('search', e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/3"
        />
        <div className='ml-auto flex gap-4'>
            <div className='flex gap-2 items-center'>
                <p className='text-Grey500 max-md:hidden'>Sort by</p>
                <select
                value={sort}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="border rounded-lg px-4 py-2"
                >
                {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
                ))}
                </select>
            </div>
            <div className='flex gap-2 items-center'>
                <p className='text-Grey500 max-md:hidden'>Category</p>
                <select
                value={filter}
                onChange={(e) => updateParam('filter', e.target.value)}
                className="border rounded-lg px-4 py-2"
                >
                <option value="all">All Transactions</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
                </select>
            </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="text-left text-sm text-Grey500">
            <tr>
              <th className="p-4">Recipient / Sender</th>
              <th className="p-4">Category</th>
              <th className="p-4">Transaction Date</th>
              <th className="p-4 text-right pr-8">Amount</th>
            </tr>
          </thead>
          <tbody>
            {displayedTransactions.map((t, idx) => (
              <tr key={idx} className="border-t border-Grey100">
                <td className="p-4 flex items-center gap-3">
                  <img className="size-10 rounded-full" src={t.avatar?.slice(1)} alt='Profile pic' />
                  {t.name}
                </td>
                <td className="p-4 text-Grey500">{t.category}</td>
                <td className="p-4 text-Grey500">{new Date(t.date).toLocaleDateString()}</td>
                <td className={`p-4 pr-8 font-semibold text-right ${t.amount > 0 ? 'text-Green' : ''}`}>
                  {t.amount > 0 ? '+' : ''}${t.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          disabled={page <= 1}
          onClick={() => updateParam('page', (page - 1).toString())}
          className="px-3 py-1 border rounded disabled:opacity-50 flex gap-4"
        >
            <img src="/assets/images/icon-caret-left.svg" alt="" />
          Prev
        </button>
        <div className='m-auto flex gap-2'>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => updateParam('page', (idx + 1).toString())}
            className={`px-3 py-1 border rounded ${page === idx + 1 ? 'bg-Grey900 text-white' : ''}`}
          >
            {idx + 1}
          </button>
        ))}
        </div>
        <button
          disabled={page >= totalPages}
          onClick={() => updateParam('page', (page + 1).toString())}
          className="px-3 py-1 border rounded disabled:opacity-50 flex gap-4"
        >
          Next
          <img src="/assets/images/icon-caret-right.svg" alt="" />
        </button>
      </div>
    </div>
  );
}
