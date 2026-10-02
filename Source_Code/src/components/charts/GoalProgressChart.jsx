import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="card p-3 shadow-xl text-xs">
        <p className="font-semibold text-primary-color mb-1">{label}</p>
        <p className="text-secondary-color">Saved: <span className="font-semibold text-emerald-500">{formatCurrency(payload[0]?.value)}</span></p>
        <p className="text-secondary-color">Remaining: <span className="font-semibold text-blue-500">{formatCurrency(payload[1]?.value)}</span></p>
      </div>
    );
  }
  return null;
};

export function GoalProgressChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }} barSize={10}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fontSize: 10, fill: 'var(--color-text-secondary)' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 10, fill: 'var(--color-text-secondary)' }}
          axisLine={false}
          tickLine={false}
          width={110}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="current" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
        <Bar dataKey="remaining" stackId="a" fill="var(--color-border)" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
