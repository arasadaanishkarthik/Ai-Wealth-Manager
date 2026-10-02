import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="card p-3 shadow-xl text-xs">
        <p className="font-semibold text-primary-color">{payload[0].name}</p>
        <p className="text-secondary-color">{formatCurrency(payload[0].value)}</p>
        <p className="text-secondary-color">{payload[0].payload.percent}% of expenses</p>
      </div>
    );
  }
  return null;
};

export function ExpenseDonutChart({ data }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const dataWithPercent = data.map(d => ({
    ...d,
    percent: Math.round((d.value / total) * 100),
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={dataWithPercent}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          {dataWithPercent.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
