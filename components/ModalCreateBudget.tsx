'use client';

import { Modal } from './Modal';
import { ColorSelect } from './ColorSelect';
import { CategorySelect } from './CategorySelect';
import { useState, useRef, useEffect } from 'react';
import { useBudgetsState } from '@/context/budgets/BudgetsStateContext';
import { useBudgetsDispatch } from '@/context/budgets/BudgetsDispatchContext';
import { useToast } from '@/context/toast/ToastContext';

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

export default function ModalCreateBudget() {
  const budgets = useBudgetsState();
  const selectedCategories = budgets.map((budget) => budget.category);
  const freeCategories = categories.filter((cat) => selectedCategories.indexOf(cat.label) === -1);
  const [selectedColor, setSelectedColor] = useState('#277C78');
  const [selectedcategory, setSelectedcategory] = useState(freeCategories[0].value);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const amountRef = useRef<HTMLInputElement>(null);
  const dispatch = useBudgetsDispatch();
  const { showToast } = useToast();

  useEffect(() => {
    if (error && amountRef.current) {
      amountRef.current.focus();
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid positive number.');
      return;
    }

    setError('');
    dispatch({
      type: 'ADD_BUDGET',
      payload: {
        category: selectedcategory,
        maximum: Number(parsedAmount.toFixed(2)),
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
            ref={amountRef}
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="$ e.g. 2000"
            className="border rounded-lg px-4 py-2 mt-1 text-sm text-black block w-full hover:cursor-pointer"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </label>
        <label className='text-xs text-Grey500' htmlFor="">Theme
          <ColorSelect selected={selectedColor} setSelected={setSelectedColor} />
        </label>
        <button type="submit" className="bg-Grey900 text-white py-2 rounded-lg mt-4 hover:cursor-pointer">Add Budget</button>
      </form>
    </Modal>
  );
}