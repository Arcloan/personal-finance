'use client';

import { Modal } from './Modal';
import { useParams } from 'next/navigation';

export default function ModalEditBudget() {
  const { slug } = useParams();

  return (
    <Modal>
      <h2 className="text-2xl font-bold mb-2">Edit Budget</h2>
      <p className="text-grey-500 mb-6">As your budgets change, feel free to update your spending limits.</p>
      <form className="flex flex-col gap-4">
        <select className="border rounded-lg px-4 py-2" defaultValue={slug}>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
          <option value="Dining Out">Dining Out</option>
          <option value="Personal Care">Personal Care</option>
        </select>
        <input
          type="number"
          placeholder="$ e.g. 2000"
          className="border rounded-lg px-4 py-2"
          defaultValue={"50.00"}
        />
        <select className="border rounded-lg px-4 py-2">
          <option value="Green">Green</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
        </select>
        <button type="submit" className="bg-grey-900 text-white py-2 rounded-lg mt-4">Save Changes</button>
      </form>
    </Modal>
  );
}