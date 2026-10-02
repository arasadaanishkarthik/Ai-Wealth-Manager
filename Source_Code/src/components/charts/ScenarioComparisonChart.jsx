import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="card p-3 shadow-xl text-xs">
        <p className="font-semibold text-primary-color mb-2">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-secondary-color">{entry.name}:</span>
            <span className="font-semibold text-primary-color">{formatCurrency(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => (
  <div className="flex items-center justify-center gap-4 mt-2">
    {payload.map((entry) => (
      <div key={entry.value} className="flex items-center gap-1.5">
        <div className="w-3 h-0.5 rounded" style={{ backgroundColor: entry.color }} />
        <span className="text-xs text-secondary-color">{entry.value}</span>
      </div>
    ))}
  </div>
);

export function ScenarioComparisonChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-secondary)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} width={50} />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
        <Line type="monotone" dataKey="Current" stroke="#64748B" strokeWidth={2} dot={false} strokeDasharray="6 4" />
        <Line type="monotone" dataKey="ScenarioA" stroke="#10B981" strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="ScenarioB" stroke="#2563EB" strokeWidth={2.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
