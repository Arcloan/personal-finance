'use client';

import { Modal } from './Modal';
import { useParams, useRouter } from 'next/navigation';

export default function ModalDeleteBudget() {
  const { slug } = useParams();
  const router = useRouter();

  const handleDelete = () => {
    router.back();
  };

  return (
    <Modal>
      <h2 className="text-2xl font-bold mb-2">Delete {slug}?</h2>
      <p className="text-grey-500 mb-6">Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.</p>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white w-full py-2 rounded-lg mb-2"
      >
        Yes, Confirm Deletion
      </button>
      <button
        onClick={() => router.back()}
        className="w-full py-2 text-grey-500"
      >
        No, Go Back
      </button>
    </Modal>
  );
}
