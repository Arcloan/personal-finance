// components/BudgetsChart.tsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useBudgets } from '@/context/BudgetsContext';

export default function BudgetsChart() {
  const { budgets } = useBudgets();

  return (
    <div className="bg-white p-4 rounded-lg 2xl:col-span-2 2xl:order-2 2xl:row-start-1 2xl:row-end-3">
      <div className="flex justify-between mb-4">
        <p className="font-semibold">Budgets</p>
        <button className="text-sm text-grey-500">See Details →</button>
      </div>
      <div className="w-full h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={budgets}
              dataKey="maximum"
              nameKey="category"
              innerRadius={100}
              outerRadius={120}
              startAngle={450}
              endAngle={90}
            >
              {budgets.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.theme} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}