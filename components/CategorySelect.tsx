'use client';

import { useState, useEffect } from 'react';
import { useBudgetsState } from '@/context/budgets/BudgetsStateContext';


interface CategorySelectProps {
  selected: string;
  setSelected: (color: string) => void;
}

const categories = [
    {label: 'Entertainment', value: 'Entertainment'},
    {label: 'Bills', value: 'Bills'},
    {label: 'Dining Out', value: 'Dining Out'},
    {label: 'Personal Care', value: 'Personal Care'},
    {label: 'General', value: 'General'},
    {label: 'Groceries', value: 'Groceries'},
    {label: 'Transportation', value: 'Transportation'},
    {label: 'Lifestle', value: 'Lifestyle'},
    {label: 'Education', value: 'Education'},
    {label: 'Shopping', value: 'Shopping'}
]

export function CategorySelect({ selected, setSelected }: CategorySelectProps) {
  const [open, setOpen] = useState(false);
  const budgets = useBudgetsState();
  const selectedCategories = budgets.map((budget) => budget.category);
  const freeCategories = categories.filter((cat) => selectedCategories.indexOf(cat.label) === -1);

  useEffect(() => {
    console.log(selected);
    setSelected(selected);
  });

  return (
    <div className="relative py-1 hover:cursor-pointer">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="border rounded-lg px-4 py-2 w-full text-left flex items-center justify-between gap-2 hover:cursor-pointer"
      >
        <div className='flex text-sm text-black'>
          {categories.find(c => c.value === selected)?.label || freeCategories[0].label}
        </div>
       <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-black" />
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {freeCategories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => {
                setSelected(cat.value);
                setOpen(false);
              }}
              className="flex items-center justify-between gap-2 px-4 py-2 hover:bg-Grey100 w-full text-left hover:cursor-pointer"
            >
              <div className='flex gap-2'>
                {cat.label}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}