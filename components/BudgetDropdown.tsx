'use client';

import { useState, useRef, useEffect } from 'react';

interface BudgetDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function BudgetDropdown({ onEdit, onDelete }: BudgetDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button "..." */}
      <button
        onClick={() => setOpen(!open)}
        className="cursor-pointer text-grey-500 hover:text-grey-900 text-2xl px-2 py-1 rounded-full focus:outline-none"
      >
        ...
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg z-50 p-2">
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-grey-900 hover:bg-grey-100 rounded-lg cursor-pointer"
          >
            Edit Budget
          </button>
          <div className="border-t border-grey-100 my-2"></div>
          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-grey-100 rounded-lg cursor-pointer"
          >
            Delete Budget
          </button>
        </div>
      )}
    </div>
  );
}
