import React from 'react';
import { motion } from 'framer-motion';
import { demoGoals } from '../data/goals';
import { GoalCard } from '../components/cards/GoalCard';
import { GoalProgressChart } from '../components/charts/GoalProgressChart';
import { goalProgressData } from '../data/goals';
import { formatCurrency } from '../utils/formatters';
import { Target, Plus } from 'lucide-react';

export default function Goals() {
  const totalTarget = demoGoals.reduce((s, g) => s + g.target, 0);
  const totalCurrent = demoGoals.reduce((s, g) => s + g.current, 0);
  const overallProgress = Math.round((totalCurrent / totalTarget) * 100);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="section-title flex items-center gap-2"><Target size={22} /> Financial Goals</h1>
          <p className="section-subtitle">Track your progress and simulate adjustments to reach each goal.</p>
        </div>
        <button className="btn-primary text-sm px-4 py-2">
          <Plus size={15} /> Add Goal
        </button>
      </div>

      {/* Summary bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-5 mb-6"
      >
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Target', value: formatCurrency(totalTarget), color: '#2563EB' },
            { label: 'Total Saved', value: formatCurrency(totalCurrent), color: '#10B981' },
            { label: 'Remaining', value: formatCurrency(totalTarget - totalCurrent), color: '#F59E0B' },
            { label: 'Overall Progress', value: `${overallProgress}%`, color: '#8B5CF6' },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-center">
              <p className="text-xs text-secondary-color mb-1">{label}</p>
              <p className="text-xl font-bold" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Goals grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {demoGoals.map((goal, i) => (
          <GoalCard key={goal.id} goal={goal} index={i} />
        ))}
      </div>

      {/* Progress chart */}
      <div className="card p-6">
        <h2 className="section-title text-base mb-1">Goal Progress Overview</h2>
        <p className="text-xs text-secondary-color mb-4">Saved vs remaining for each goal (illustrative)</p>
        <GoalProgressChart data={goalProgressData} />
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-sm bg-emerald-500" />
            <span className="text-secondary-color">Amount saved</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: 'var(--color-border)' }} />
            <span className="text-secondary-color">Remaining</span>
          </div>
        </div>
      </div>

      <div className="disclaimer mt-6">
        Goal projections are illustrative and based on synthetic demo data. Actual outcomes depend on many factors.
        This is not financial advice.
      </div>
    </div>
  );
}
