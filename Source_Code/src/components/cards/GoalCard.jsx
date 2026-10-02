import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, TrendingUp, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, formatDate, formatMonths } from '../../utils/formatters';
import { ProgressBar } from '../ui/ProgressBar';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export function GoalCard({ goal, index = 0 }) {
  const navigate = useNavigate();
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
        className="card p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
      >
        <div>
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{goal.icon}</span>
              <div>
                <h3 className="font-semibold text-sm text-primary-color">{goal.name}</h3>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: `${goal.color}15`, color: goal.color }}
                >
                  {goal.category}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary-color">{goal.progress}%</div>
              <div className="text-[10px] text-secondary-color">{goal.status}</div>
            </div>
          </div>

          {/* Progress */}
          <ProgressBar value={goal.progress} color={goal.color} className="mb-4" />

          {/* Amounts */}
          <div className="flex justify-between text-xs mb-4">
            <div>
              <p className="text-secondary-color">Saved</p>
              <p className="font-bold text-primary-color">{formatCurrency(goal.current)}</p>
            </div>
            <div className="text-center">
              <p className="text-secondary-color">Remaining</p>
              <p className="font-bold" style={{ color: goal.color }}>{formatCurrency(goal.target - goal.current)}</p>
            </div>
            <div className="text-right">
              <p className="text-secondary-color">Target</p>
              <p className="font-bold text-primary-color">{formatCurrency(goal.target)}</p>
            </div>
          </div>
        </div>

        {/* Footer with Deep Analysis & Quick Modal */}
        <div className="flex items-center justify-between pt-3 border-t border-color mt-2">
          <div className="flex items-center gap-1 text-xs text-secondary-color">
            <Calendar size={11} />
            <span>{formatDate(goal.targetDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/goals/${goal.id}`)}
              className="flex items-center gap-1 text-xs font-semibold hover:gap-1.5 transition-all duration-200"
              style={{ color: goal.color }}
              title="Open full timeline analysis"
            >
              Simulate <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Goal Detail Modal */}
      <Modal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        title={`${goal.icon} ${goal.name}`}
        size="md"
        footer={
          <div className="flex gap-3 w-full">
            <Button variant="secondary" onClick={() => setShowDetail(false)} fullWidth>Close</Button>
            <Button variant="primary" onClick={() => navigate(`/goals/${goal.id}`)} fullWidth>
              Full Analysis & Simulator
            </Button>
          </div>
        }
      >
        <div className="space-y-5">
          <p className="text-sm text-secondary-color">{goal.description}</p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Target Amount', value: formatCurrency(goal.target) },
              { label: 'Current Savings', value: formatCurrency(goal.current) },
              { label: 'Remaining', value: formatCurrency(goal.target - goal.current) },
              { label: 'Monthly Contribution', value: formatCurrency(goal.monthlyContribution) },
              { label: 'Target Date', value: formatDate(goal.targetDate) },
              { label: 'Est. Months Left', value: formatMonths(goal.monthsToGoal) },
            ].map(({ label, value }) => (
              <div key={label} className="p-3 rounded-xl" style={{ backgroundColor: 'var(--color-bg)' }}>
                <p className="text-xs text-secondary-color mb-1">{label}</p>
                <p className="font-bold text-sm text-primary-color">{value}</p>
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-xs text-secondary-color">Progress</span>
              <span className="text-xs font-bold" style={{ color: goal.color }}>{goal.progress}%</span>
            </div>
            <ProgressBar value={goal.progress} color={goal.color} height="h-2.5" />
          </div>

          <div className="flex items-center gap-2 text-xs p-3 rounded-xl" style={{ backgroundColor: `${goal.color}10`, color: goal.color }}>
            <TrendingUp size={14} />
            <span>At ₹{(goal.monthlyContribution/1000).toFixed(0)}K/month, you'll reach this goal in ~{goal.monthsToGoal} months (illustrative)</span>
          </div>
        </div>
      </Modal>
    </>
  );
}
