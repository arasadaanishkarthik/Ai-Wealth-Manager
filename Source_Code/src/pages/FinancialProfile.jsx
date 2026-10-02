import React from 'react';
import { motion } from 'framer-motion';
import { User, Edit3 } from 'lucide-react';
import { demoUser, expenseBreakdown } from '../data/userData';
import { formatCurrency, formatPercent } from '../utils/formatters';
import { ProgressBar } from '../components/ui/ProgressBar';
import { ExpenseDonutChart } from '../components/charts/ExpenseDonutChart';

export default function FinancialProfile() {
  const { financialHealth } = demoUser;

  return (
    <div className="page-container">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="section-title flex items-center gap-2"><User size={22} /> Financial Profile</h1>
          <p className="section-subtitle">Your complete synthetic demo financial snapshot.</p>
        </div>
        <button className="btn-secondary text-sm px-4 py-2">
          <Edit3 size={14} /> Edit Profile
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Personal info */}
        <div className="card p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl font-bold">AS</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary-color">{demoUser.name}</h2>
              <p className="text-sm text-secondary-color">{demoUser.occupation}</p>
              <span className="badge-info text-xs mt-1">Demo Account</span>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Age', value: `${demoUser.age} years` },
              { label: 'Email', value: demoUser.email },
              { label: 'Risk Preference', value: demoUser.riskPreference },
              { label: 'Member Since', value: 'January 2024' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-color last:border-0">
                <span className="text-xs text-secondary-color">{label}</span>
                <span className="text-sm font-semibold text-primary-color">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial overview */}
        <div className="card p-6">
          <h3 className="font-semibold text-primary-color mb-5">Monthly Financials</h3>
          <div className="space-y-4">
            {[
              { label: 'Monthly Income', value: demoUser.monthlyIncome, color: '#10B981', percent: 100 },
              { label: 'Essential Expenses', value: demoUser.essentialExpenses.total, color: '#EF4444', percent: 60 },
              { label: 'Discretionary', value: demoUser.discretionarySpending, color: '#F59E0B', percent: 10 },
              { label: 'Available Capacity', value: demoUser.availableCapacity, color: '#2563EB', percent: 30 },
            ].map(({ label, value, color, percent }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-secondary-color">{label}</span>
                  <span className="font-bold" style={{ color }}>{formatCurrency(value)}</span>
                </div>
                <ProgressBar value={percent} color={color} />
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-2">
            {[
              { label: 'Current Savings', value: formatCurrency(demoUser.currentSavings) },
              { label: 'Emergency Fund', value: formatCurrency(demoUser.emergencyFund) },
              { label: 'Emergency Target', value: formatCurrency(demoUser.emergencyFundTarget) },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between p-2.5 rounded-lg text-xs" style={{ backgroundColor: 'var(--color-bg)' }}>
                <span className="text-secondary-color">{label}</span>
                <span className="font-bold text-primary-color">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expense breakdown + Health */}
        <div className="space-y-5">
          <div className="card p-5">
            <h3 className="font-semibold text-sm text-primary-color mb-1">Expense Breakdown</h3>
            <p className="text-xs text-secondary-color mb-3">Monthly ₹60,000</p>
            <ExpenseDonutChart data={expenseBreakdown} />
            <div className="grid grid-cols-2 gap-2 mt-3">
              {expenseBreakdown.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-secondary-color">{item.name}</span>
                  <span className="font-semibold text-primary-color ml-auto">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-sm text-primary-color mb-4">Health Metrics</h3>
            <div className="space-y-3">
              {[
                { label: 'Savings Rate', value: `${financialHealth.savingsRate}%`, color: '#10B981', percent: financialHealth.savingsRate },
                { label: 'Emergency Coverage', value: `${financialHealth.emergencyCoverageMonths} months`, color: '#2563EB', percent: (financialHealth.emergencyCoverageMonths / 6) * 100 },
                { label: 'Goal Progress', value: `${financialHealth.goalProgress}%`, color: '#8B5CF6', percent: financialHealth.goalProgress },
                { label: 'Health Score', value: `${financialHealth.score}/100`, color: '#2563EB', percent: financialHealth.score },
              ].map(({ label, value, color, percent }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-secondary-color">{label}</span>
                    <span className="font-semibold" style={{ color }}>{value}</span>
                  </div>
                  <ProgressBar value={percent} color={color} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="disclaimer mt-6">
        ⚠️ All profile data is synthetic and for demonstration purposes only. This is Anish Sharma's demo financial profile.
      </div>
    </div>
  );
}
