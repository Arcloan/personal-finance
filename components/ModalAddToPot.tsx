'use client';

import { Modal } from './Modal';
import { useParams, useRouter } from 'next/navigation';
import { usePotsState } from '@/context/pots/PotsStateContext';
import { usePotsDispatch } from '@/context/pots/PotsDispatchContext';
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/context/toast/ToastContext';

export default function ModalAddToPot() {
  const { name }: { name: string } = useParams();
  const decodedName = decodeURIComponent(name);
  const pots = usePotsState();
  const dispatch = usePotsDispatch();
  const { showToast } = useToast();
  const router = useRouter();

  const pot = pots.find(p => p.name === decodedName);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [oldAmount, setOldAmount] = useState(pot!.total);
  const [amountToAdd, setAmountToAdd] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current.focus();
    }
  }, [error]);

  if (!pot) return <Modal><p>Pot not found</p></Modal>;

  const newAmount = pot.total + parseFloat(amountToAdd || '0');
  const oldProgress = Math.min((oldAmount / pot.target) * 100, 100);
  const progress = Math.min((newAmount / pot.target) * 100, 100) - oldProgress;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(amountToAdd);
    if (isNaN(value) || value <= 0) {
      setError('Enter a valid positive number.');
      return;
    }
    dispatch({ type: 'UPDATE_POT_AMOUNT', payload: { name: decodedName, newAmount: pot.total + value } });
    showToast('Money added successfully!', 'success');
    router.back();
  };

  return (
    <Modal>
      <h2 className="text-2xl font-bold mb-2">Add to &apos;{pot.name}&apos;</h2>
      <p className="text-right font-bold text-2xl mb-1">${newAmount.toFixed(2)}</p>
      <div className="w-full h-3 bg-Grey100 rounded-full mb-2">
        <div className='h-3 rounded-full w-full flex gap-1'>
          <div
            className="h-3 rounded-l-full"
            style={{ width: `${oldProgress}%`, backgroundColor: pot.theme }}
          ></div>
          <div
            className="h-3 rounded-r-full"
            style={{ width: `${progress}%`, backgroundColor: '#277C78' }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-Grey500 mb-4">
        <span style={{ color: '#277C78' }}>{progress.toFixed(2)}%</span>
        <span>Target of ${pot.target}</span>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='amount' className="text-xs text-Grey500 block mb-1">Amount to Add</label>
        <input
          ref={inputRef}
          type="text"
          id='amount'
          value={amountToAdd}
          onChange={(e) => setAmountToAdd(e.target.value)}
          placeholder="$ e.g. 400"
          className="border rounded-lg px-4 py-2 text-sm text-black block w-full mb-2 hover:cursor-pointer"
        />
        {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
        <button type="submit" className="bg-Grey900 text-white py-2 rounded-lg w-full hover:cursor-pointer">Confirm Addition</button>
      </form>
    </Modal>
  );
}