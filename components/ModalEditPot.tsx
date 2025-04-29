'use client';

import { Modal } from './Modal';
import { ColorSelect } from './ColorSelect';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usePotsState } from '@/context/pots/PotsStateContext';
import { usePotsDispatch } from '@/context/pots/PotsDispatchContext';
import { useToast } from '@/context/toast/ToastContext';

export default function ModalEditPot() {
  const { name }: { name: string } = useParams();
  const decodedName = decodeURIComponent(name);
  const pots = usePotsState();
  const dispatch = usePotsDispatch();
  const { showToast } = useToast();

  const pot = pots.find((p) => p.name === decodedName);
  const [color, setColor] = useState(pot?.theme || '#277C78');
  const [potName, setPotName] = useState(pot?.name || '');
  const [target, setTarget] = useState(pot?.target?.toString() || '');
  const [error, setError] = useState('');
  const targetRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error && targetRef.current) {
      targetRef.current.focus();
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTarget = parseFloat(target);
    if (!potName || isNaN(parsedTarget) || parsedTarget <= 0) {
      setError('Please enter valid values.');
      return;
    }

    dispatch({
      type: 'UPDATE_POT',
      payload: {
        oldName: decodedName,
        newPot: {
          name: potName,
          target: parsedTarget,
          color,
          amount: pot?.total || 0,
        },
      },
    });
    showToast('Pot updated successfully', 'success');
    window.history.back();
  };

  return (
    <Modal>
      <h2 className="text-2xl font-bold mb-2">Edit Pot</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-xs text-Grey500">Pot Name
          <input
            type="text"
            value={potName}
            onChange={(e) => setPotName(e.target.value)}
            className="border rounded-lg px-4 py-2 mt-1 text-sm block w-full"
          />
        </label>
        <label className="text-xs text-Grey500">Target Amount
          <input
            ref={targetRef}
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="border rounded-lg px-4 py-2 mt-1 text-sm block w-full"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </label>
        <label className="text-xs text-Grey500">Theme
          <ColorSelect selected={color} setSelected={setColor} />
        </label>
        <button type="submit" className="bg-Grey900 text-white py-2 rounded-lg mt-4">Save Changes</button>
      </form>
    </Modal>
  );
}