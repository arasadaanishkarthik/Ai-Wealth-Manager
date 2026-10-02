import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { demoUser } from '../../data/userData';

function CircularProgress({ value, size = 120, strokeWidth = 10, color = '#2563EB' }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FinancialHealthCard() {
  const { financialHealth } = demoUser;

  const metrics = [
    { label: 'Savings Rate', value: `${financialHealth.savingsRate}%`, color: '#10B981' },
    { label: 'Emergency Cover', value: `${financialHealth.emergencyCoverageMonths} months`, color: '#2563EB' },
    { label: 'Goal Progress', value: `${financialHealth.goalProgress}%`, color: '#8B5CF6' },
    { label: 'Debt Load', value: financialHealth.debtLoad, color: '#F59E0B' },
  ];

  const scoreColor = financialHealth.score >= 80 ? '#10B981' : financialHealth.score >= 60 ? '#2563EB' : '#F59E0B';

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="section-title">Financial Health</h2>
          <p className="text-xs text-secondary-color">Demo wellness indicator — not a real financial assessment</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-secondary-color bg-amber-50 dark:bg-amber-950/20 px-2 py-1 rounded-lg border border-amber-200 dark:border-amber-800">
          <Info size={11} className="text-amber-500" />
          <span>Illustrative</span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        {/* Circular progress */}
        <div className="relative flex-shrink-0">
          <CircularProgress value={financialHealth.score} color={scoreColor} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-primary-color">{financialHealth.score}</span>
            <span className="text-[10px] text-secondary-color font-medium">/ 100</span>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="flex-1 grid grid-cols-2 gap-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="p-3 rounded-xl" style={{ backgroundColor: 'var(--color-bg)' }}>
              <p className="text-[10px] text-secondary-color mb-1">{metric.label}</p>
              <p className="text-sm font-bold" style={{ color: metric.color }}>{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 rounded-xl flex items-center gap-2" style={{ backgroundColor: `${scoreColor}10` }}>
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: scoreColor }} />
        <p className="text-xs font-semibold" style={{ color: scoreColor }}>{financialHealth.label}</p>
        <p className="text-xs text-secondary-color">— Your financial foundation is solid. Keep building on it.</p>
      </div>
    </div>
  );
}
