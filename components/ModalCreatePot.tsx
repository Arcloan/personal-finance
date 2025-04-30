'use client';

import { Modal } from './Modal';
import { ColorSelect } from './ColorSelect';
import { useState, useRef, useEffect } from 'react';
import { usePotsDispatch } from '@/context/pots/PotsDispatchContext';
import { usePotsState } from '@/context/pots/PotsStateContext';
import { useToast } from '@/context/toast/ToastContext';
import { cleanInput } from '@/libraries/sanitizeInput';

export default function ModalCreatePot() {
  const dispatch = usePotsDispatch();
  const pots = usePotsState();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [color, setColor] = useState('#277C78');
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const targetRef = useRef<HTMLInputElement>(null);
  const nameErrorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error && targetRef.current) {
      targetRef.current.focus();
    }
    if (nameError && nameErrorRef.current) {
      nameErrorRef.current.focus();
    }
  }, [error, nameError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTarget = parseFloat(target);
    const selectedName = cleanInput(name)
    if (!name) {
      setNameError("Please enter a valid name.");
      return;
    }
    const usedNamesPots = pots.map((pot) => pot.name);
    if (usedNamesPots.indexOf(selectedName) !== -1) {
      setNameError("This name is alredy used. You should edit the corresponding pot.");
      return;
    }
    if (isNaN(parsedTarget) || parsedTarget <= 0) {
      setError('Please enter a valid name and positive number.');
      return;
    }

    setError('');
    setNameError('');
    dispatch({
      type: 'ADD_POT',
      payload: {
        name: selectedName,
        theme: color,
        target: parsedTarget,
        total: 0,
      },
    });
    showToast('Pot created successfully', 'success');
    window.history.back();
  };

  return (
    <Modal>
      <h2 className="text-2xl font-bold mb-2">Add New Pot</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-xs text-Grey500">Pot Name
          <input
            ref={nameErrorRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Vacation"
            className="border text-black rounded-lg px-4 py-2 mt-1 text-sm block w-full hover:cursor-pointer"
          />
          {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
        </label>
        <label className="text-xs text-Grey500">Target Amount
          <input
            ref={targetRef}
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="$ e.g. 1000"
            className="border rounded-lg px-4 py-2 mt-1 text-black text-sm block w-full hover:cursor-pointer"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </label>
        <label className="text-xs text-Grey500">Theme
          <ColorSelect selected={color} setSelected={setColor} />
        </label>
        <button type="submit" className="bg-Grey900 text-white py-2 rounded-lg mt-4 hover:cursor-pointer">Add Pot</button>
      </form>
    </Modal>
  );
}
