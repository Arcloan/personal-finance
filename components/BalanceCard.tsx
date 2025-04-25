import React from 'react';

interface BalanceCardProps {
  label: string;
  amount: number;
  dark?: boolean;
}

export default function BalanceCard({ label, amount, dark }: BalanceCardProps) {
  return (
    <div className={`p-4 rounded-lg ${dark ? 'bg-Grey900 text-white' : 'bg-white text-Grey900'}`}>
      <p className="text-sm mb-1">{label}</p>
      <p className="text-2xl font-semibold">${amount.toFixed(2)}</p>
    </div>
  );
}