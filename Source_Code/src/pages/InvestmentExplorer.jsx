import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, Info, TrendingUp, AlertTriangle,
  Sliders, Shield, Sparkles, CheckCircle2, RefreshCw
} from 'lucide-react';
import { RangeSlider } from '../components/ui/Slider';
import { formatCurrency, formatPercent } from '../utils/formatters';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const categories = {
  stable: {
    id: 'stable',
    name: 'Stable Growth',
    icon: '🛡️',
    color: '#10B981',
    annualizedExpected: 7.5,
    lowRange: 6.0,
    highRange: 9.0,
    volatility: 'Low',
    riskLevel: 'Conservative',
    tagline: 'Capital preservation with steady real return',
    description: 'Prioritizes capital protection with fixed-income, debt funds, and sovereign-backed securities.',
    allocation: [
      { name: 'Sovereign Debt / G-Sec', value: 45, color: '#10B981' },
      { name: 'High-Grade Corporate Debt', value: 35, color: '#34D399' },
      { name: 'Large-Cap Quality Equity', value: 15, color: '#6EE7B7' },
      { name: 'Liquid Cash Buffer', value: 5, color: '#A7F3D0' },
    ],
    assumptions: [
      'Low equity exposure minimizes drawdowns during market corrections',
      'Assumes steady interest rate environment across medium horizon',
      'Lower compounding rate compared to equity-heavy strategies',
    ],
    uncertainty: 'Interest rate fluctuations and inflation risk may erode real purchasing power over 5+ years.',
  },
  balanced: {
    id: 'balanced',
    name: 'Balanced Growth',
    icon: '⚖️',
    color: '#2563EB',
    annualizedExpected: 11.5,
    lowRange: 8.5,
    highRange: 14.5,
    volatility: 'Moderate',
    riskLevel: 'Moderate',
    tagline: 'Optimal balance of wealth compounding and risk management',
    description: 'A classic 60/40 blend of diversified equities and stabilizing debt instruments.',
    allocation: [
      { name: 'Diversified Index Equity', value: 40, color: '#2563EB' },
      { name: 'Mid-Cap Growth Funds', value: 20, color: '#38BDF8' },
      { name: 'Corporate & Short Debt', value: 25, color: '#818CF8' },
      { name: 'Gold / Hedging Assets', value: 15, color: '#F59E0B' },
    ],
    assumptions: [
      'Equities provide long-term capital appreciation beat inflation',
      'Fixed income portion rebalances during market downturns',
      'Moderate cyclical volatility (10–15% historical drawdowns)',
    ],
    uncertainty: 'Subject to standard business cycle volatility. Requires at least 3–5 year holding discipline.',
  },
  higher: {
    id: 'higher',
    name: 'Higher Growth',
    icon: '🚀',
    color: '#8B5CF6',
    annualizedExpected: 15.0,
    lowRange: 9.0,
    highRange: 21.0,
    volatility: 'High',
    riskLevel: 'Higher Risk',
    tagline: 'Aggressive equity accumulation for long-term compounders',
    description: 'High allocation to growth equities, thematic sectors, and emerging market opportunities.',
    allocation: [
      { name: 'Large & Mid-Cap Equities', value: 45, color: '#8B5CF6' },
      { name: 'Small-Cap High Growth', value: 25, color: '#A855F7' },
      { name: 'Global Tech & Innovation', value: 20, color: '#EC4899' },
      { name: 'Opportunistic Cash Reserve', value: 10, color: '#C084FC' },
    ],
    assumptions: [
      'High beta to broader economic and tech sector expansion',
      'High tolerance for drawdowns of 20–30% in bear cycles',
      'Compounding accelerated over 5–10+ year time horizons',
    ],
    uncertainty: 'Substantial market volatility and potential temporary capital losses during adverse economic periods.',
  },
};

export default function InvestmentExplorer() {
  const [selectedProfileKey, setSelectedProfileKey] = useState('balanced');
  const [monthlyContribution, setMonthlyContribution] = useState(10000);
  const [initialCapital, setInitialCapital] = useState(50000);
  const [timeHorizonYears, setTimeHorizonYears] = useState(5);

  const currentProfile = categories[selectedProfileKey];

  // Calculate compound projections
  const projection = useMemo(() => {
    const rExpected = currentProfile.annualizedExpected / 100 / 12;
    const rLow = currentProfile.lowRange / 100 / 12;
    const rHigh = currentProfile.highRange / 100 / 12;

    const totalMonths = timeHorizonYears * 12;
    const chartData = [];

    let totalInvested = initialCapital;
    let expectedVal = initialCapital;
    let lowVal = initialCapital;
    let highVal = initialCapital;

    for (let y = 0; y <= timeHorizonYears; y++) {
      const months = y * 12;

      // Cumulative calculations
      if (y === 0) {
        chartData.push({
          year: 'Start',
          Invested: Math.round(initialCapital),
          Low: Math.round(initialCapital),
          Expected: Math.round(initialCapital),
          High: Math.round(initialCapital),
        });
      } else {
        // Compound interest with monthly addition
        let expAcc = initialCapital;
        let lowAcc = initialCapital;
        let highAcc = initialCapital;
        let invAcc = initialCapital;

        for (let m = 1; m <= months; m++) {
          expAcc = (expAcc + monthlyContribution) * (1 + rExpected);
          lowAcc = (lowAcc + monthlyContribution) * (1 + rLow);
          highAcc = (highAcc + monthlyContribution) * (1 + rHigh);
          invAcc += monthlyContribution;
        }

        chartData.push({
          year: `Yr ${y}`,
          Invested: Math.round(invAcc),
          Low: Math.round(lowAcc),
          Expected: Math.round(expAcc),
          High: Math.round(highAcc),
        });

        if (y === timeHorizonYears) {
          totalInvested = invAcc;
          expectedVal = expAcc;
          lowVal = lowAcc;
          highVal = highAcc;
        }
      }
    }

    const hypotheticalGain = expectedVal - totalInvested;

    return {
      totalInvested: Math.round(totalInvested),
      expectedVal: Math.round(expectedVal),
      lowVal: Math.round(lowVal),
      highVal: Math.round(highVal),
      hypotheticalGain: Math.round(hypotheticalGain),
      gainPercent: Math.round((hypotheticalGain / totalInvested) * 100),
      chartData,
    };
  }, [selectedProfileKey, monthlyContribution, initialCapital, timeHorizonYears]);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-6">
        <h1 className="section-title flex items-center gap-2">
          <BarChart3 size={22} className="text-blue-600" /> Simulated Investment Explorer
        </h1>
        <p className="section-subtitle">
          Explore hypothetical portfolio scenarios. Model growth ranges and understand the relationship between risk, time, and returns.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {Object.values(categories).map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedProfileKey(cat.id)}
            className={`p-5 rounded-2xl text-left border transition-all duration-200 ${
              selectedProfileKey === cat.id
                ? 'shadow-lg ring-2 bg-surface'
                : 'border-color hover:border-slate-400 bg-surface/60'
            }`}
            style={{
              borderColor: selectedProfileKey === cat.id ? cat.color : 'var(--color-border)',
              boxShadow: selectedProfileKey === cat.id ? `0 8px 24px ${cat.color}18` : 'none',
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">{cat.icon}</span>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase"
                style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
              >
                {cat.riskLevel}
              </span>
            </div>
            <h3 className="font-bold text-sm text-primary-color">{cat.name}</h3>
            <p className="text-xs font-semibold mb-1" style={{ color: cat.color }}>
              ~{cat.annualizedExpected}% Expected Return
            </p>
            <p className="text-[11px] text-secondary-color line-clamp-2 leading-relaxed">
              {cat.tagline}
            </p>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6 mb-8">
        {/* Left 2 Cols: Simulation Parameters */}
        <div className="lg:col-span-2 card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-primary-color flex items-center gap-2">
              <Sliders size={16} className="text-blue-600" /> Simulation Controls
            </h2>
            <span className="text-[10px] badge-info">Illustrative</span>
          </div>

          <RangeSlider
            id="invest-initial-capital"
            label="Starting Lumpsum Capital"
            value={initialCapital}
            min={0}
            max={200000}
            step={10000}
            onChange={setInitialCapital}
            formatValue={formatCurrency}
            color={currentProfile.color}
          />

          <RangeSlider
            id="invest-monthly-contrib"
            label="Monthly Simulated Contribution"
            value={monthlyContribution}
            min={2000}
            max={30000}
            step={1000}
            onChange={setMonthlyContribution}
            formatValue={formatCurrency}
            color={currentProfile.color}
          />

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-medium text-secondary-color">Time Horizon</label>
              <span className="text-sm font-bold text-primary-color">{timeHorizonYears} Years</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 3, 5, 10].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setTimeHorizonYears(yr)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                    timeHorizonYears === yr
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'btn-secondary text-secondary-color'
                  }`}
                >
                  {yr} {yr === 1 ? 'Year' : 'Years'}
                </button>
              ))}
            </div>
          </div>

          {/* Asset Allocation Donut for profile */}
          <div className="pt-4 border-t border-color">
            <h3 className="font-semibold text-xs text-primary-color mb-3">Simulated Asset Allocation</h3>
            <div className="space-y-2">
              {currentProfile.allocation.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-secondary-color">{item.name}</span>
                  </div>
                  <span className="font-bold text-primary-color">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 3 Cols: Projected Outcomes & Range Cone */}
        <div className="lg:col-span-3 space-y-6">
          {/* Outcome Summary Cards */}
          <div className="card p-6">
            <h2 className="font-bold text-sm text-primary-color mb-4">
              Hypothetical {timeHorizonYears}-Year Outcome
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-page border border-color">
                <span className="text-[10px] text-secondary-color block mb-0.5">Total Capital Invested</span>
                <span className="text-base font-bold text-primary-color">
                  {formatCurrency(projection.totalInvested)}
                </span>
                <span className="text-[10px] text-secondary-color block mt-0.5">Principal amount</span>
              </div>

              <div
                className="p-3.5 rounded-xl border"
                style={{
                  backgroundColor: `${currentProfile.color}10`,
                  borderColor: `${currentProfile.color}30`,
                }}
              >
                <span className="text-[10px] text-secondary-color block mb-0.5">Expected Outcome</span>
                <span className="text-lg font-bold" style={{ color: currentProfile.color }}>
                  {formatCurrency(projection.expectedVal)}
                </span>
                <span className="text-[10px] font-semibold text-emerald-600 block mt-0.5">
                  +{formatCurrency(projection.hypotheticalGain)} ({projection.gainPercent}%)
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-page border border-color">
                <span className="text-[10px] text-secondary-color block mb-0.5">Simulated Range Cone</span>
                <span className="text-xs font-bold text-primary-color block">
                  {formatCurrency(projection.lowVal)} – {formatCurrency(projection.highVal)}
                </span>
                <span className="text-[10px] text-secondary-color block mt-0.5">
                  {currentProfile.lowRange}% – {currentProfile.highRange}% bounds
                </span>
              </div>
            </div>
          </div>

          {/* Area Growth Cone Chart */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-bold text-sm text-primary-color">Hypothetical Growth Range Cone</h3>
                <p className="text-xs text-secondary-color">Simulated compound trajectories: Low, Expected, and High</p>
              </div>
            </div>

            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projection.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rangeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={currentProfile.color} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={currentProfile.color} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="year" stroke="var(--color-text-secondary)" fontSize={11} tickLine={false} />
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
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Area
                    type="monotone"
                    dataKey="High"
                    stroke="#8B5CF6"
                    strokeDasharray="3 3"
                    fill="transparent"
                    name="High (Bull Case)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Expected"
                    stroke={currentProfile.color}
                    strokeWidth={2.5}
                    fill="url(#rangeGrad)"
                    name="Expected Scenario"
                  />
                  <Area
                    type="monotone"
                    dataKey="Low"
                    stroke="#EF4444"
                    strokeDasharray="3 3"
                    fill="transparent"
                    name="Low (Bear Case)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Invested"
                    stroke="#94A3B8"
                    strokeWidth={1.5}
                    fill="transparent"
                    name="Capital Invested"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Assumptions & Risk Explanation Card */}
          <div className="card p-5 space-y-3">
            <div className="flex items-center gap-2 text-primary-color font-bold text-sm">
              <Info size={16} className="text-blue-600" />
              <span>Assumptions & Risk Factors</span>
            </div>

            <div className="space-y-1.5">
              {currentProfile.assumptions.map((a) => (
                <div key={a} className="flex items-start gap-2 text-xs text-secondary-color">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: currentProfile.color }} />
                  <span>{a}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
              <strong>Uncertainty Note:</strong> {currentProfile.uncertainty}
            </div>
          </div>
        </div>
      </div>

      <div className="disclaimer mt-8">
        ⚠️ All calculations are illustrative educational simulations and do not guarantee future performance. No actual investment accounts are linked.
      </div>
    </div>
  );
}
