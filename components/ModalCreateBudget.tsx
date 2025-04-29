'use client';

import { Modal } from './Modal';
import { ColorSelect } from './ColorSelect';
import { CategorySelect } from './CategorySelect';
import { useState } from 'react';
import { useBudgetsDispatch } from '@/context/budgets/BudgetsDispatchContext';
import { useToast } from '@/context/toast/ToastContext';

export default function ModalCreateBudget() {
  const [selectedColor, setSelectedColor] = useState('#277C78');
  const [selectedcategory, setSelectedcategory] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useBudgetsDispatch();
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_BUDGET',
      payload: {
        category: selectedcategory,
        maximum: parseFloat(amount),
        theme: selectedColor,
      },
    });
    showToast('Budget created successfully', 'success');
    window.history.back();
  };

  return (
    <Modal>
      <h2 className="text-2xl font-bold mb-2">Add New Budget</h2>
      <p className="text-Grey500 mb-6 text-sm">Choose a category to set a spending budget. These categories can help you monitor spending.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className='text-xs text-Grey500' htmlFor="">Budget Category
          <CategorySelect selected={selectedcategory} setSelected={setSelectedcategory}></CategorySelect>
        </label>
        <label htmlFor="" className='text-xs text-Grey500'>Maximum Spending
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="$ e.g. 2000"
            className="border rounded-lg px-4 py-2 mt-1 text-sm text-black block w-full"
          />
        </label>
        <label className='text-xs text-Grey500' htmlFor="">Theme
          <ColorSelect selected={selectedColor} setSelected={setSelectedColor} />
        </label>
        <button type="submit" className="bg-Grey900 text-white py-2 rounded-lg mt-4">Add Budget</button>
      </form>
    </Modal>
  );
}