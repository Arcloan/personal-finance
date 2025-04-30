'use client';

import { Modal } from './Modal';
import { useParams, useRouter } from 'next/navigation';
import { usePotsDispatch } from '@/context/pots/PotsDispatchContext';
import { useToast } from '@/context/toast/ToastContext';

export default function ModalDeletePot() {
  let { name }: { name: string } = useParams();
  name = decodeURIComponent(name);
  const router = useRouter();
  const dispatch = usePotsDispatch();
  const { showToast } = useToast();

  const handleDelete = () => {
    dispatch({
      type: 'DELETE_POT',
      payload: { name },
    });
    showToast('Pot deleted successfully', 'success');
    router.back();
  };

  return (
    <Modal>
      <h2 className="text-2xl font-bold mb-2">Delete &apos;{name}&apos;?</h2>
      <p className="text-Grey500 mb-6 text-sm">
        Are you sure you want to delete this pot? This action cannot be reversed.
      </p>
      <button
        onClick={handleDelete}
        className="bg-Red text-white w-full text-sm py-2 rounded-lg mb-2 hover:cursor-pointer"
      >
        Yes, Confirm Deletion
      </button>
      <button
        onClick={() => router.back()}
        className="w-full py-2 text-sm text-Grey500 hover:cursor-pointer"
      >
        No, Go Back
      </button>
    </Modal>
  );
}
