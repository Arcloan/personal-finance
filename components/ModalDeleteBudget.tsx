'use client';

import { Modal } from './Modal';
import { useParams, useRouter } from 'next/navigation';
import { useBudgetsDispatch } from '@/context/budgets/BudgetsDispatchContext';
import { useToast } from '@/context/toast/ToastContext';

export default function ModalDeleteBudget() {
  let { category } : {category: string} = useParams();
  category = decodeURIComponent(category);
  const router = useRouter();
  const dispatch = useBudgetsDispatch();
  const { showToast } = useToast();

  const handleDelete = () => {
    dispatch({
      type: 'DELETE_BUDGET',
      payload: {
        category,
      },
    });
    showToast("Budget deleted successfully", "success");
    router.back();
  };


  return (
    <Modal>
      <h2 className="text-2xl font-bold mb-2">Delete &apos;{category}&apos;?</h2>
      <p className="text-Grey500 mb-6 text-sm">Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.</p>
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
