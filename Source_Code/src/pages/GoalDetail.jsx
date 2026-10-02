import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Target, Calendar, TrendingUp, Sliders,
  Sparkles, CheckCircle2, AlertCircle, Clock, ShieldCheck
} from 'lucide-react';
import { demoGoals } from '../data/goals';
import { demoUser } from '../data/userData';
import { formatCurrency, formatDate, formatMonths } from '../utils/formatters';
import { ProgressBar } from '../components/ui/ProgressBar';
import { RangeSlider } from '../components/ui/Slider';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';

export default function GoalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const goal = demoGoals.find((g) => g.id === id) || demoGoals[0];
  const [contribution, setContribution] = useState(goal.monthlyContribution);

  // Dynamic projection calculations based on adjusted contribution
  const projection = useMemo(() => {
    const remaining = Math.max(0, goal.target - goal.current);
    const monthsNeeded = contribution > 0 ? Math.ceil(remaining / contribution) : 999;
    const baselineMonths = goal.monthsToGoal;
    const monthsDiff = baselineMonths - monthsNeeded; // positive = faster

    // Generate monthly projection chart points
    const chartData = [];
    const maxMonths = Math.min(24, Math.max(12, monthsNeeded + 3));
    let accumulated = goal.current;

    for (let m = 0; m <= maxMonths; m++) {
      const date = new Date();
      date.setMonth(date.getMonth() + m);
      const monthLabel = date.toLocaleString('default', { month: 'short', year: '2-digit' });

      chartData.push({
        month: monthLabel,
        monthIndex: m,
        projectedSavings: Math.min(goal.target, Math.round(accumulated)),
        target: goal.target,
        baseline: Math.min(goal.target, Math.round(goal.current + m * goal.monthlyContribution)),
      });

      accumulated += contribution;
    }

    const projectedTargetDate = new Date();
    projectedTargetDate.setMonth(projectedTargetDate.getMonth() + monthsNeeded);

    return {
      remaining,
      monthsNeeded,
      baselineMonths,
      monthsDiff,
      chartData,
      projectedDateStr: projectedTargetDate.toLocaleDateString('en-IN', {
        month: 'short',
        year: 'numeric',
      }),
      capacityPercent: Math.round((contribution / demoUser.availableCapacity) * 100),
    };
  }, [goal, contribution]);

  return (
    <div className="page-container">
      {/* Back Link */}
      <div className="mb-4">
        <button
          onClick={() => navigate('/goals')}
          className="btn-ghost text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 -ml-2 text-secondary-color hover:text-primary-color"
        >
          <ArrowLeft size={14} /> Back to Goals
        </button>
      </div>

      {/* Goal Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 mb-6"
        style={{
          background: `linear-gradient(135deg, ${goal.color}0D, var(--color-surface))`,
          borderLeft: `5px solid ${goal.color}`,
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ backgroundColor: `${goal.color}18` }}
            >
              {goal.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: `${goal.color}15`, color: goal.color }}
                >
                  {goal.category}
                </span>
                <span className="badge-neutral text-[10px]">{goal.priority} Priority</span>
                <span className="badge-success text-[10px] flex items-center gap-1">
                  <CheckCircle2 size={10} /> {goal.status}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-primary-color">{goal.name}</h1>
              <p className="text-xs text-secondary-color mt-0.5 max-w-xl">{goal.description}</p>
            </div>
          </div>

          <div className="flex flex-row md:flex-col items-end justify-between md:justify-center border-t md:border-t-0 pt-3 md:pt-0 border-color">
            <div className="text-left md:text-right">
              <span className="text-xs text-secondary-color">Current Progress</span>
              <div className="text-2xl font-black" style={{ color: goal.color }}>
                {goal.progress}%
              </div>
            </div>
            <div className="text-right text-xs text-secondary-color mt-1">
              Target: <strong className="text-primary-color">{formatCurrency(goal.target)}</strong>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <ProgressBar value={goal.progress} color={goal.color} height="h-3" />
          <div className="flex justify-between text-xs text-secondary-color mt-2">
            <span>Saved: <strong className="text-primary-color">{formatCurrency(goal.current)}</strong></span>
            <span>Remaining: <strong style={{ color: goal.color }}>{formatCurrency(projection.remaining)}</strong></span>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Interactive Contribution Simulator & Chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* Interactive Simulator */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-base text-primary-color flex items-center gap-2">
                  <Sliders size={18} className="text-blue-600" /> Contribution & Timeline Simulator
                </h2>
                <p className="text-xs text-secondary-color">
                  Adjust monthly allocation to see how fast you can achieve this goal.
                </p>
              </div>
              <button
                onClick={() => setContribution(goal.monthlyContribution)}
                className="btn-ghost text-xs px-2.5 py-1"
              >
                Reset to Baseline
              </button>
            </div>

            <div className="p-4 rounded-xl mb-5" style={{ backgroundColor: 'var(--color-bg)' }}>
              <RangeSlider
                id="goal-contribution-slider"
                label="Monthly Goal Contribution"
                value={contribution}
                min={1000}
                max={25000}
                step={500}
                onChange={setContribution}
                formatValue={formatCurrency}
                color={goal.color}
              />
              <div className="flex justify-between text-[11px] text-secondary-color mt-2">
                <span>Baseline: {formatCurrency(goal.monthlyContribution)}/mo</span>
                <span>Uses {projection.capacityPercent}% of Available Capacity (₹30K)</span>
              </div>
            </div>

            {/* Impact Metric Chips */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div
                className="p-3.5 rounded-xl border"
                style={{
                  backgroundColor: `${goal.color}08`,
                  borderColor: `${goal.color}25`,
                }}
              >
                <span className="text-[11px] text-secondary-color block mb-0.5">Est. Timeline</span>
                <span className="text-lg font-bold" style={{ color: goal.color }}>
                  {formatMonths(projection.monthsNeeded)}
                </span>
                <span className="text-[10px] text-secondary-color block mt-0.5">
                  Target: ~{projection.projectedDateStr}
                </span>
              </div>

              <div
                className="p-3.5 rounded-xl border"
                style={{
                  backgroundColor:
                    projection.monthsDiff > 0
                      ? 'rgba(16, 185, 129, 0.08)'
                      : projection.monthsDiff < 0
                      ? 'rgba(239, 68, 68, 0.08)'
                      : 'var(--color-bg)',
                  borderColor:
                    projection.monthsDiff > 0
                      ? 'rgba(16, 185, 129, 0.25)'
                      : projection.monthsDiff < 0
                      ? 'rgba(239, 68, 68, 0.25)'
                      : 'var(--color-border)',
                }}
              >
                <span className="text-[11px] text-secondary-color block mb-0.5">Timeline Delta</span>
                <span
                  className="text-lg font-bold"
                  style={{
                    color:
                      projection.monthsDiff > 0
                        ? '#10B981'
                        : projection.monthsDiff < 0
                        ? '#EF4444'
                        : 'var(--color-text)',
                  }}
                >
                  {projection.monthsDiff > 0
                    ? `-${projection.monthsDiff} mo faster`
                    : projection.monthsDiff < 0
                    ? `+${Math.abs(projection.monthsDiff)} mo slower`
                    : 'On baseline pace'}
                </span>
                <span className="text-[10px] text-secondary-color block mt-0.5">
                  vs {goal.monthsToGoal} mo baseline
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-page border border-color">
                <span className="text-[11px] text-secondary-color block mb-0.5">Monthly Delta</span>
                <span className="text-lg font-bold text-primary-color">
                  {contribution - goal.monthlyContribution >= 0 ? '+' : ''}
                  {formatCurrency(contribution - goal.monthlyContribution)}
                </span>
                <span className="text-[10px] text-secondary-color block mt-0.5">
                  vs ₹{(goal.monthlyContribution / 1000).toFixed(1)}K initial
                </span>
              </div>
            </div>
          </div>

          {/* Projection Chart */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold text-sm text-primary-color">Cumulative Savings Trajectory</h3>
                <p className="text-xs text-secondary-color">Simulated progress to target: Adjusted vs Baseline</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-1.5 rounded-full" style={{ backgroundColor: goal.color }} />
                  <span className="text-secondary-color">Adjusted</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-1.5 rounded-full bg-slate-400" />
                  <span className="text-secondary-color">Baseline</span>
                </div>
              </div>
            </div>

            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projection.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="goalGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={goal.color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={goal.color} stopOpacity={0.0} />
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
                    formatter={(v, name) => [
                      formatCurrency(v),
                      name === 'projectedSavings' ? 'Adjusted Simulation' : name === 'baseline' ? 'Baseline Pace' : 'Target',
                    ]}
                    contentStyle={{
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <ReferenceLine
                    y={goal.target}
                    stroke="#EF4444"
                    strokeDasharray="4 4"
                    label={{ value: 'Target Goal', fill: '#EF4444', fontSize: 10, position: 'insideTopRight' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="baseline"
                    stroke="#94A3B8"
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
                    fill="transparent"
                  />
                  <Area
                    type="monotone"
                    dataKey="projectedSavings"
                    stroke={goal.color}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#goalGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right col: Goal Details, Sensitivity & AI Insight */}
        <div className="space-y-6">
          {/* Key Facts */}
          <div className="card p-5">
            <h3 className="font-bold text-sm text-primary-color mb-3">Goal Parameters</h3>
            <div className="space-y-2.5">
              {[
                { label: 'Target Amount', value: formatCurrency(goal.target) },
                { label: 'Current Savings', value: formatCurrency(goal.current) },
                { label: 'Remaining Needed', value: formatCurrency(projection.remaining) },
                { label: 'Baseline Contribution', value: `${formatCurrency(goal.monthlyContribution)}/mo` },
                { label: 'Target Completion Date', value: formatDate(goal.targetDate) },
                { label: 'Priority Tier', value: `${goal.priority} Priority` },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between p-2.5 rounded-lg text-xs"
                  style={{ backgroundColor: 'var(--color-bg)' }}
                >
                  <span className="text-secondary-color">{label}</span>
                  <span className="font-semibold text-primary-color">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Decision Insight */}
          <div
            className="card p-5"
            style={{
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(139, 92, 246, 0.05))',
              border: '1px solid rgba(37, 99, 235, 0.2)',
            }}
          >
            <div className="flex items-center gap-2 mb-2 text-blue-600">
              <Sparkles size={16} />
              <h3 className="font-bold text-sm text-primary-color">AI Navigator Insight</h3>
            </div>
            <p className="text-xs text-secondary-color leading-relaxed mb-3">
              Allocating <strong className="text-primary-color">{formatCurrency(contribution)}/mo</strong> allows you to
              reach your <strong className="text-primary-color">{goal.name}</strong> in{' '}
              <strong className="text-blue-600 font-semibold">{formatMonths(projection.monthsNeeded)}</strong> while
              leaving <strong className="text-emerald-600 font-semibold">{formatCurrency(Math.max(0, 30000 - contribution))}/mo</strong> in available capacity for other goals.
            </p>

            <div className="p-2.5 rounded-lg bg-surface text-[11px] space-y-1 border border-color">
              <div className="flex items-center gap-1.5 text-secondary-color">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span>Emergency fund buffer remains protected.</span>
              </div>
              <div className="flex items-center gap-1.5 text-secondary-color">
                <Clock size={12} className="text-blue-500" />
                <span>No impact on regular EMI/rent essential obligations.</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Link
                to="/simulator"
                className="btn-primary text-xs px-3 py-2 flex-1 text-center"
              >
                Test in Simulator
              </Link>
              <Link
                to="/ai"
                className="btn-secondary text-xs px-3 py-2 flex-1 text-center"
              >
                Ask AI Assistant
              </Link>
            </div>
          </div>

          {/* Milestone checklist */}
          <div className="card p-5">
            <h3 className="font-bold text-sm text-primary-color mb-3">Milestone Progress</h3>
            <div className="space-y-3">
              {[
                { pct: 25, amount: goal.target * 0.25, label: 'Kickoff Milestone' },
                { pct: 50, amount: goal.target * 0.5, label: 'Halfway Mark' },
                { pct: 75, amount: goal.target * 0.75, label: 'Final Stretch' },
                { pct: 100, amount: goal.target, label: 'Goal Completed 🎉' },
              ].map((m) => {
                const reached = goal.current >= m.amount;
                return (
                  <div key={m.pct} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          reached ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-secondary-color'
                        }`}
                      >
                        {reached ? '✓' : `${m.pct}%`}
                      </div>
                      <span className={reached ? 'font-medium text-primary-color' : 'text-secondary-color'}>
                        {m.label} ({formatCurrency(m.amount)})
                      </span>
                    </div>
                    <span className={`text-[10px] ${reached ? 'text-emerald-600 font-semibold' : 'text-secondary-color'}`}>
                      {reached ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="disclaimer mt-6">
        ⚠️ All milestone forecasts and simulation timelines are illustrative and generated from synthetic demo data.
        Actual results depend on market conditions, consistency, and unforeseen financial events.
      </div>
    </div>
  );
}
