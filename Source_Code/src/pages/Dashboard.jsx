import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Wallet, CreditCard, TrendingUp, PiggyBank, ShieldCheck,
  ArrowRight, Sparkles, Brain, CheckCircle2, AlertCircle,
  HelpCircle, Sliders, Target, BarChart3, Compass
} from 'lucide-react';
import { demoUser, expenseBreakdown } from '../data/userData';
import { goalProgressData, demoGoals } from '../data/goals';
import { MetricCard } from '../components/cards/MetricCard';
import { FinancialHealthCard } from '../components/dashboard/FinancialHealthCard';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { SavingsTrendChart, CashFlowChart } from '../components/charts/SavingsTrendChart';
import { ExpenseDonutChart } from '../components/charts/ExpenseDonutChart';
import { GoalProgressChart } from '../components/charts/GoalProgressChart';
import { formatCurrency } from '../utils/formatters';

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    name,
    monthlyIncome,
    essentialExpenses,
    availableCapacity,
    currentSavings,
    emergencyFund,
    savingsTrend,
    cashFlowHistory,
  } = demoUser;

  const topMetrics = [
    {
      label: 'Monthly Income',
      value: monthlyIncome,
      icon: Wallet,
      color: '#2563EB',
      trend: 'neutral',
      trendLabel: 'Stable',
      description: 'Fixed monthly salary',
    },
    {
      label: 'Essential Expenses',
      value: essentialExpenses.total,
      icon: CreditCard,
      color: '#EF4444',
      trend: 'neutral',
      trendLabel: '60% of income',
      description: 'EMI, rent, food, utilities',
    },
    {
      label: 'Available Capacity',
      value: availableCapacity,
      icon: TrendingUp,
      color: '#10B981',
      trend: 'up',
      trendLabel: '30% of income',
      description: 'For goals & growth',
    },
    {
      label: 'Current Savings',
      value: currentSavings,
      icon: PiggyBank,
      color: '#8B5CF6',
      trend: 'up',
      trendLabel: '+₹30K this month',
      description: 'Total savings accumulated',
    },
    {
      label: 'Emergency Fund',
      value: emergencyFund,
      icon: ShieldCheck,
      color: '#F59E0B',
      trend: 'up',
      trendLabel: '3.0 months coverage',
      description: 'Target: ₹3,00,000 (60%)',
    },
  ];

  const nextActions = [
    {
      id: 'act_1',
      title: 'Build Emergency Buffer',
      tag: 'Safety Foundation',
      color: '#10B981',
      icon: '🛡️',
      why: 'Your emergency fund currently covers 3.0 months (₹1,80,000). Increasing allocation by ₹5,000/mo reaches the 6-month safety buffer ₹1.2L faster.',
      impact: 'High Security Impact',
      actionLabel: 'Simulate Emergency Plan',
      route: '/simulator',
    },
    {
      id: 'act_2',
      title: 'Increase Goal Contribution',
      tag: 'Timeline Acceleration',
      color: '#2563EB',
      icon: '✈️',
      why: 'Your ₹30,000 monthly capacity has ₹5,000 in unallocated surplus. Adding ₹2,500/mo to Vacation Fund achieves the goal 2 months earlier.',
      impact: 'Target Dec 2024 Achieved',
      actionLabel: 'Adjust Goal Allocation',
      route: '/goals/goal_002',
    },
    {
      id: 'act_3',
      title: 'Review Lifestyle Spending',
      tag: 'Trade-off Analysis',
      color: '#F59E0B',
      icon: '🎭',
      why: 'Before spending ₹10,000 on dining, entertainment, or travel, see how it impacts your remaining capacity and target completion dates.',
      impact: 'Avoid Lifestyle Creep',
      actionLabel: 'Test Lifestyle Impact',
      route: '/lifestyle-impact',
    },
    {
      id: 'act_4',
      title: 'Explore Growth Scenarios',
      tag: 'Compounding Potential',
      color: '#8B5CF6',
      icon: '📈',
      why: 'With essential expenses stable, exploring balanced simulated market allocations could compound medium-term surplus over a 3–5 year horizon.',
      impact: 'Illustrative 10-14% Range',
      actionLabel: 'Explore Risk Models',
      route: '/risk-explorer',
    },
  ];

  return (
    <div className="page-container">
      {/* Welcome Banner */}
      <WelcomeBanner
        name={name}
        subtitle="Financial Decision Cockpit — Before You Spend, Save, Invest, or Build — See the Impact."
      />

      {/* Top 5 Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {topMetrics.map((m, i) => (
          <MetricCard key={m.label} {...m} index={i} />
        ))}
      </div>

      {/* "What Should I Do Next?" Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600">
              <Compass size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-primary-color">What Should I Do Next?</h2>
              <p className="text-xs text-secondary-color">
                AI-driven recommendations explaining exactly <strong className="text-primary-color">WHY</strong> they appear based on your financial position.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/action-plan')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Full Action Plan <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nextActions.map((action, i) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.3 }}
              className="card p-5 flex flex-col justify-between border-t-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              style={{ borderTopColor: action.color }}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-2xl">{action.icon}</span>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{ backgroundColor: `${action.color}15`, color: action.color }}
                  >
                    {action.tag}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-primary-color mb-1">{action.title}</h3>

                <div className="p-2.5 rounded-lg bg-page border border-color my-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
                    Why this appears:
                  </span>
                  <p className="text-[11px] text-secondary-color leading-relaxed">{action.why}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-color/60">
                <div className="text-[10px] font-semibold text-emerald-600 mb-2 flex items-center gap-1">
                  <Sparkles size={11} /> {action.impact}
                </div>
                <button
                  onClick={() => navigate(action.route)}
                  className="btn-secondary w-full text-xs py-1.5 flex items-center justify-center gap-1 font-semibold hover:border-blue-500"
                >
                  {action.actionLabel} <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Financial Health + Savings Trend */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <FinancialHealthCard />
        </div>

        <div className="card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-sm text-primary-color">Savings Trend</h3>
              <span className="badge-success text-[10px]">+₹90K in 6 months</span>
            </div>
            <p className="text-xs text-secondary-color mb-3">Cumulative growth across accounts</p>
          </div>
          <SavingsTrendChart data={savingsTrend} />
        </div>
      </div>

      {/* Expense breakdown + Goal Progress + Cash Flow */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Expense Breakdown */}
        <div className="card p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-primary-color mb-0.5">Expense Breakdown</h3>
            <p className="text-xs text-secondary-color mb-3">Monthly essentials (₹60,000 total)</p>
            <ExpenseDonutChart data={expenseBreakdown} />
          </div>
          <div className="space-y-1.5 mt-3 pt-3 border-t border-color">
            {expenseBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-secondary-color">{item.name}</span>
                </div>
                <span className="font-semibold text-primary-color">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Goal Progress */}
        <div className="card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-0.5">
              <h3 className="font-bold text-sm text-primary-color">Active Goals</h3>
              <button
                onClick={() => navigate('/goals')}
                className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
              >
                All Goals <ArrowRight size={11} />
              </button>
            </div>
            <p className="text-xs text-secondary-color mb-3">Overall progress: 64% funded</p>
            <GoalProgressChart data={goalProgressData} />
          </div>

          <div className="space-y-2 mt-3 pt-3 border-t border-color">
            {demoGoals.slice(0, 2).map((g) => (
              <div
                key={g.id}
                onClick={() => navigate(`/goals/${g.id}`)}
                className="p-2 rounded-lg bg-page hover:bg-surface border border-color cursor-pointer transition-colors flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span>{g.icon}</span>
                  <span className="font-medium text-primary-color">{g.name}</span>
                </div>
                <span className="font-bold" style={{ color: g.color }}>{g.progress}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cash Flow */}
        <div className="card p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-primary-color mb-0.5">Monthly Cash Flow</h3>
            <p className="text-xs text-secondary-color mb-3">Income vs Expenses (6 months)</p>
            <CashFlowChart data={cashFlowHistory} />
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-color text-xs">
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-1 rounded bg-emerald-500" />
                <span className="text-secondary-color">Income (₹1.0L)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-1 rounded bg-red-500" />
                <span className="text-secondary-color">Expenses (₹60K-70K)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Launchpad Buttons */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'What-If Simulator', desc: 'Simulate savings and timeline shifts', path: '/simulator', color: '#2563EB', emoji: '⚡' },
          { label: 'Lifestyle Impact', desc: 'Assess spending before you buy', path: '/lifestyle-impact', color: '#F59E0B', emoji: '🎭' },
          { label: 'AI Assistant', desc: 'Ask natural scenario questions', path: '/ai-assistant', color: '#8B5CF6', emoji: '🤖' },
          { label: 'Startup Lab', desc: 'Explore investing or building ventures', path: '/startup-lab', color: '#10B981', emoji: '🚀' },
        ].map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
            whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
            onClick={() => navigate(action.path)}
            className="card p-4 text-left hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <span className="text-2xl mb-2.5 block">{action.emoji}</span>
            <p className="font-bold text-sm text-primary-color mb-0.5">{action.label}</p>
            <p className="text-xs text-secondary-color">{action.desc}</p>
          </motion.button>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="disclaimer mt-8">
        ⚠️ All financial figures shown are synthetic and for hackathon demonstration. This is not financial advice. Real banking APIs and transactions are not connected.
      </div>
    </div>
  );
}
