import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Sliders, Info, RefreshCw, TrendingUp, Sparkles,
  ArrowRight, AlertTriangle, CheckCircle2, Clock
} from 'lucide-react';
import { RangeSlider } from '../components/ui/Slider';
import { formatCurrency, formatMonths } from '../utils/formatters';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

const BASELINE_MONTHLY_SAVINGS = 20000;
const AVAILABLE_CAPACITY = 30000;
const BASELINE_EMERGENCY_REMAINING = 120000; // Remaining needed for emergency fund

function ResultCard({ label, value, sub, color = '#2563EB', highlight = false, badge }) {
  return (
    <div
      className="p-4 rounded-xl transition-all"
      style={{
        backgroundColor: highlight ? `${color}10` : 'var(--color-bg)',
        border: highlight ? `1px solid ${color}35` : '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-secondary-color">{label}</p>
        {badge && (
          <span
            className="text-[10px] px-1.5 py-0.5 rounded font-bold"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {badge}
          </span>
        )}
      </div>
      <p className="text-xl font-bold" style={{ color: highlight ? color : 'var(--color-text)' }}>
        {value}
      </p>
      {sub && <p className="text-[11px] text-secondary-color mt-1 leading-tight">{sub}</p>}
    </div>
  );
}

export default function Simulator() {
  const [monthlySavings, setMonthlySavings] = useState(25000);
  const [lifestyleSpending, setLifestyleSpending] = useState(3000);
  const [oneTimeExpense, setOneTimeExpense] = useState(0);
  const [goalContribution, setGoalContribution] = useState(15000);
  const [growthAllocation, setGrowthAllocation] = useState(2000);

  const results = useMemo(() => {
    const monthlyDiff = monthlySavings - BASELINE_MONTHLY_SAVINGS;
    const annualDiff = monthlyDiff * 12;

    const totalAllocatedMonthly = monthlySavings + lifestyleSpending + growthAllocation;
    const remainingCapacity = AVAILABLE_CAPACITY - totalAllocatedMonthly;
    const isOverCapacity = totalAllocatedMonthly > AVAILABLE_CAPACITY;

    // Emergency goal impact with one-time expense subtracted from start
    const effectiveGoalTarget = BASELINE_EMERGENCY_REMAINING + oneTimeExpense;
    const projectedMonths = monthlySavings > 0 ? Math.ceil(effectiveGoalTarget / monthlySavings) : 999;
    const baselineMonths = Math.ceil(BASELINE_EMERGENCY_REMAINING / BASELINE_MONTHLY_SAVINGS);
    const monthsSaved = baselineMonths - projectedMonths; // positive = faster

    // Generate 12-month trajectory comparison chart
    const chartData = [];
    let simAcc = 180000 - oneTimeExpense; // starting emergency savings
    let baseAcc = 180000;

    for (let m = 0; m <= 12; m++) {
      const d = new Date();
      d.setMonth(d.getMonth() + m);
      const label = d.toLocaleString('default', { month: 'short' });

      chartData.push({
        month: label,
        Simulated: Math.min(300000, Math.round(Math.max(0, simAcc))),
        Baseline: Math.min(300000, Math.round(baseAcc)),
        Target: 300000,
      });

      simAcc += monthlySavings;
      baseAcc += BASELINE_MONTHLY_SAVINGS;
    }

    return {
      monthlyDiff,
      annualDiff,
      totalAllocatedMonthly,
      remainingCapacity,
      isOverCapacity,
      projectedMonths,
      baselineMonths,
      monthsSaved,
      chartData,
    };
  }, [monthlySavings, lifestyleSpending, oneTimeExpense, goalContribution, growthAllocation]);

  const reset = () => {
    setMonthlySavings(20000);
    setLifestyleSpending(5000);
    setOneTimeExpense(0);
    setGoalContribution(10000);
    setGrowthAllocation(5000);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="section-title flex items-center gap-2">
            <Sliders size={22} className="text-blue-600" /> What-If Decision Simulator
          </h1>
          <p className="section-subtitle">
            Change your savings, spending, or growth allocations and immediately see how your goals and timelines adapt.
          </p>
        </div>
        <button onClick={reset} className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5 self-start sm:self-auto">
          <RefreshCw size={13} /> Reset to Defaults
        </button>
      </div>

      {/* Baseline Context Pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl mb-6 flex items-center justify-between gap-4 border"
        style={{ backgroundColor: 'rgba(37, 99, 235, 0.05)', borderColor: 'rgba(37, 99, 235, 0.25)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
            <Info size={16} />
          </div>
          <div>
            <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Baseline Available Financial Capacity</p>
            <p className="text-xs text-secondary-color">
              After ₹60,000 essential expenses from ₹1,00,000 monthly income, you have{' '}
              <strong className="text-primary-color">₹30,000/month</strong> unallocated capacity.
            </p>
          </div>
        </div>

        <div className="hidden md:flex text-right text-xs">
          <div>
            <span className="text-secondary-color block">Baseline Savings</span>
            <strong className="text-primary-color font-bold">₹20,000 / mo</strong>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left 2 cols: Controls & Sliders */}
        <div className="lg:col-span-2 card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-primary-color">Simulate Financial Levers</h2>
            <span className="text-[11px] text-secondary-color">Interactive Controls</span>
          </div>

          <RangeSlider
            id="sim-monthly-savings"
            label="Monthly Savings"
            value={monthlySavings}
            min={5000}
            max={35000}
            step={1000}
            onChange={setMonthlySavings}
            formatValue={formatCurrency}
            color="#10B981"
          />

          <RangeSlider
            id="sim-lifestyle-spending"
            label="Monthly Lifestyle / Discretionary"
            value={lifestyleSpending}
            min={0}
            max={15000}
            step={500}
            onChange={setLifestyleSpending}
            formatValue={formatCurrency}
            color="#F59E0B"
          />

          <RangeSlider
            id="sim-onetime-expense"
            label="One-Time Immediate Expense (e.g., Vacation / Tech)"
            value={oneTimeExpense}
            min={0}
            max={60000}
            step={5000}
            onChange={setOneTimeExpense}
            formatValue={formatCurrency}
            color="#EF4444"
          />

          <RangeSlider
            id="sim-growth-allocation"
            label="Growth / Investment Allocation"
            value={growthAllocation}
            min={0}
            max={15000}
            step={1000}
            onChange={setGrowthAllocation}
            formatValue={formatCurrency}
            color="#2563EB"
          />

          {results.isOverCapacity && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3.5 rounded-xl text-xs flex items-start gap-2.5"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                color: '#EF4444',
                border: '1px solid rgba(239, 68, 68, 0.25)',
              }}
            >
              <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
              <span>
                Total monthly allocations (<strong>{formatCurrency(results.totalAllocatedMonthly)}</strong>) exceed
                your available monthly capacity (<strong>{formatCurrency(AVAILABLE_CAPACITY)}</strong>). Adjust
                sliders to maintain a balanced budget.
              </span>
            </motion.div>
          )}
        </div>

        {/* Right 3 cols: Results, Difference Indicators & Animated Trajectory Chart */}
        <div className="lg:col-span-3 space-y-6">
          {/* Key Simulation Differences Display */}
          <div className="card p-6">
            <h2 className="font-bold text-sm text-primary-color mb-4">
              "If I Change X, What Happens to Y?" — Live Impact
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <ResultCard
                label="Monthly Difference"
                value={`${results.monthlyDiff >= 0 ? '+' : ''}${formatCurrency(results.monthlyDiff)}`}
                sub={`vs ₹20K baseline savings`}
                color={results.monthlyDiff >= 0 ? '#10B981' : '#EF4444'}
                highlight
                badge={results.monthlyDiff >= 0 ? 'Surplus' : 'Deficit'}
              />

              <ResultCard
                label="Annual Difference"
                value={`${results.annualDiff >= 0 ? '+' : ''}${formatCurrency(results.annualDiff)}`}
                sub={`Accumulated across 12 months`}
                color={results.annualDiff >= 0 ? '#10B981' : '#EF4444'}
                highlight
                badge="1 Year"
              />

              <ResultCard
                label="Goal Timeline Impact"
                value={
                  results.monthsSaved > 0
                    ? `-${results.monthsSaved} mo faster`
                    : results.monthsSaved < 0
                    ? `+${Math.abs(results.monthsSaved)} mo slower`
                    : 'Pace unchanged'
                }
                sub={`Emergency fund completion`}
                color={results.monthsSaved >= 0 ? '#2563EB' : '#F59E0B'}
                highlight
                badge="Timeline"
              />

              <ResultCard
                label="Total Monthly Outflow"
                value={formatCurrency(results.totalAllocatedMonthly)}
                sub="Savings + Lifestyle + Growth"
                color="#8B5CF6"
              />

              <ResultCard
                label="Remaining Buffer"
                value={formatCurrency(Math.max(0, results.remainingCapacity))}
                sub={results.remainingCapacity < 0 ? 'Exceeds budget' : 'Unallocated liquidity'}
                color={results.remainingCapacity >= 0 ? '#10B981' : '#EF4444'}
              />

              <ResultCard
                label="Est. Goal Duration"
                value={formatMonths(results.projectedMonths)}
                sub={`vs ${results.baselineMonths} mo baseline`}
                color="#2563EB"
              />
            </div>
          </div>

          {/* Animated Trajectory Chart */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold text-sm text-primary-color">Savings Growth: Simulated vs Baseline</h3>
                <p className="text-xs text-secondary-color">12-Month Emergency Reserve Projections</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-secondary-color">Simulated</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-1.5 rounded-full bg-slate-400" />
                  <span className="text-secondary-color">Baseline</span>
                </div>
              </div>
            </div>

            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="simColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--color-text-secondary)" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="var(--color-text-secondary)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    formatter={(v, name) => [formatCurrency(v), name]}
                    contentStyle={{
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Baseline"
                    stroke="#94A3B8"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fill="transparent"
                  />
                  <Area
                    type="monotone"
                    dataKey="Simulated"
                    stroke="#10B981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#simColor)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="disclaimer mt-8">
        ⚠️ Simulation algorithms use deterministic synthetic calculations for decision-support. Not real financial advice.
      </div>
    </div>
  );
}
