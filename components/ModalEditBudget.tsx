'use client';

import { Modal } from './Modal';
import { ColorSelect } from './ColorSelect';
import { CategorySelect } from './CategorySelect';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useBudgetsState } from '@/context/budgets/BudgetsStateContext';
import { useBudgetsDispatch } from '@/context/budgets/BudgetsDispatchContext';
import { useToast } from '@/context/toast/ToastContext';

export default function ModalEditBudget() {
  const { category } : {category : string} = useParams();
  const budgets = useBudgetsState();
  const dispatch = useBudgetsDispatch();
  const { showToast } = useToast();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialBudget, setInitialBudget] = useState(budgets.find((budget) => budget.category === decodeURIComponent(category)))
  const [selectedColor, setSelectedColor] = useState(initialBudget!.theme);
  const [selectedCategory, setSelectedCategory] = useState(initialBudget!.category);
  const [amount, setAmount] = useState(initialBudget!.maximum);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(initialBudget!.category);
    dispatch({
      type: 'UPDATE_BUDGET',
      payload: {
        oldCategory: initialBudget!.category,
        newBudget: {
          category: selectedCategory,
          maximum: Number(amount.toFixed(2)),
          theme: selectedColor,
        },
      },
    });
    showToast("Budget updated succesfully", "success");
    window.history.back();
  };


  return (
    <Modal>
      <h2 className="text-2xl font-bold mb-2">Edit Budget</h2>
      <p className="text-Grey500 mb-6 text-sm">As your budgets changes, feel free to update your spending limits.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className='text-xs text-Grey500' htmlFor="">Budget Category
          <CategorySelect selected={selectedCategory} setSelected={setSelectedCategory}></CategorySelect>
        </label>
        <label htmlFor="" className='text-xs text-Grey500'>Maximum Spending
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="$ e.g. 2000"
            className="border rounded-lg px-4 py-2 mt-1 text-sm text-black block w-full"
          />
        </label>
        <label className='text-xs text-Grey500' htmlFor="">Theme
          <ColorSelect selected={selectedColor} setSelected={setSelectedColor} />
        </label>
        <button type="submit" className="bg-Grey900 text-white py-2 rounded-lg mt-4">Save Changes</button>
      </form>
    </Modal>
  );
}