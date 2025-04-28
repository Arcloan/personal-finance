'use client';

import { Modal } from './Modal';
import { ColorSelect } from './ColorSelect';
import { CategorySelect } from './CategorySelect';
import { useState } from 'react';

export default function ModalCreateBudget() {
  const [selectedColor, setSelectedColor] = useState('#277C78');
  const [selectedcategory, setSelectedcategory] = useState('');

  return (
    <Modal>
      <h2 className="text-2xl font-bold mb-2">Add New Budget</h2>
      <p className="text-Grey500 mb-6 text-sm">Choose a category to set a spending budget. These categories can help you monitor spending.</p>
      <form className="flex flex-col gap-4">
        <CategorySelect selected={selectedcategory} setSelected={setSelectedcategory}></CategorySelect>
        <label htmlFor="" className='text-xs text-Grey500'>Maximum Spending
          <input
            type="text"
            placeholder="$ e.g. 2000"
            className="border rounded-lg px-4 py-2 mt-1 text-base text-black block w-full"
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