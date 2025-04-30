'use client';

import { useState } from 'react';
import { useBudgetsState } from '@/context/budgets/BudgetsStateContext';

const colors = [
  { label: 'Grey900', value: '#201F24'},
  { label: 'Grey500', value: '#696868'},
  { label: 'Grey300', value: '#B3B3B3'},
  { label: 'Grey100', value: '#F2F2F2'},
  { label: 'Green', value: '#277C78'},
  { label: 'Yellow', value: '#F2CDAC'},
  { label: 'Cyan', value: '#82C9D7'},
  { label: 'Navy', value: '#626070'},
  { label: 'Red', value: '#C94736'},
  { label: 'Purple', value: '#826CB0'},
  { label: 'LighterPurple', value: '#AF81BA'},
  { label: 'Turquoise', value: '#597C7C'},
  { label: 'Brown', value: '#93674F'},
  { label: 'Magenta', value: '#934F6F'},
  { label: 'Blue', value: '#3F82B2'},
  { label: 'NavyGrey', value: '#97A0AC'},
  { label: 'ArmyGray', value: '#7F9161'},
  { label: 'Gold', value: '#CAB361'},
  { label: 'Orange', value: '#BE6C49'},
  { label: 'White', value: '#FFFFFF'}
];


interface ColorSelectProps {
  selected: string;
  setSelected: (color: string) => void;
}

export function ColorSelect({ selected, setSelected }: ColorSelectProps) {
  const [open, setOpen] = useState(false);
  const budgets = useBudgetsState();
  const selectedColors = budgets.map((budget) => budget.theme);

  return (
    <div className="relative py-1">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="border rounded-lg px-4 py-2 w-full text-left flex items-center justify-between gap-2 hover:cursor-pointer"
      >
        <div className='flex gap-2 text-black'>
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selected }} />
          {colors.find(c => c.value === selected)?.label || 'Select Color'}
        </div>
        {colors.find(c => c.value === selected) && <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-black" />}
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {colors.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => {
                setSelected(color.value);
                setOpen(false);
              }}
              className="flex items-center justify-between gap-2 px-4 py-2 hover:bg-Grey100 w-full text-left hover:cursor-pointer"
            >
              <div className='flex gap-2'>
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color.value }} />
                {color.label}
              </div>
              {selectedColors.indexOf(color.value) !== -1 && <div className='text-Grey500'>Alredy used</div>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}