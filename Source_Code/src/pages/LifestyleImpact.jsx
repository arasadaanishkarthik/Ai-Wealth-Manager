import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingDown, Clock, AlertCircle } from 'lucide-react';
import { analyzeLifestyleImpact } from '../services/aiService';
import { formatCurrency, formatPercent } from '../utils/formatters';

const categories = [
  { id: 'vacation', label: 'Vacation', emoji: '✈️', suggested: 10000 },
  { id: 'dining', label: 'Dining Out', emoji: '🍽️', suggested: 3000 },
  { id: 'movies', label: 'Movie Night', emoji: '🎬', suggested: 1500 },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️', suggested: 5000 },
  { id: 'gaming', label: 'Gaming', emoji: '🎮', suggested: 2000 },
  { id: 'entertainment', label: 'Entertainment', emoji: '🎭', suggested: 4000 },
  { id: 'custom', label: 'Custom', emoji: '✏️', suggested: 0 },
];

const AVAILABLE_CAPACITY = 30000;

function ImpactMeter({ percent }) {
  const color = percent <= 20 ? '#10B981' : percent <= 50 ? '#F59E0B' : '#EF4444';
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-secondary-color">Impact on Capacity</span>
        <span className="font-bold" style={{ color }}>{percent}%</span>
      </div>
      <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percent, 100)}%` }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-secondary-color mt-1">
        <span>Low impact</span>
        <span>High impact</span>
      </div>
    </div>
  );
}

export default function LifestyleImpact() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [amount, setAmount] = useState(10000);
  const [customAmount, setCustomAmount] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const effectiveAmount = selectedCategory.id === 'custom' ? (Number(customAmount) || 0) : amount;

  const liveResult = useMemo(() => {
    if (!effectiveAmount) return null;
    const pct = Math.round((effectiveAmount / AVAILABLE_CAPACITY) * 100);
    return {
      expense: effectiveAmount,
      percentOfCapacity: pct,
      remainingCapacity: Math.max(0, AVAILABLE_CAPACITY - effectiveAmount),
      goalImpactMonths: Math.ceil(effectiveAmount / 10000),
      savingsImpact: -effectiveAmount,
    };
  }, [effectiveAmount]);

  const handleAnalyze = async () => {
    if (!effectiveAmount) return;
    setLoading(true);
    const res = await analyzeLifestyleImpact(effectiveAmount, selectedCategory.label, { availableCapacity: AVAILABLE_CAPACITY });
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="mb-6">
        <h1 className="section-title flex items-center gap-2"><Sparkles size={22} /> Lifestyle Impact</h1>
        <p className="section-subtitle">Enjoy your money while understanding its impact on your goals. The decision is always yours.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left — Input */}
        <div className="space-y-5">
          {/* Category picker */}
          <div className="card p-5">
            <h3 className="font-semibold text-sm text-primary-color mb-4">Choose a Category</h3>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCategory(cat);
                    if (cat.suggested) setAmount(cat.suggested);
                    setResult(null);
                  }}
                  id={`category-${cat.id}`}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl text-center transition-all duration-200 border ${selectedCategory.id === cat.id
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/20'
                    : 'border-color hover:border-blue-400'
                    }`}
                >
                  <span className="text-2xl">{cat.emoji}</span>
                  <span className={`text-[10px] font-semibold ${selectedCategory.id === cat.id ? 'text-blue-600' : 'text-secondary-color'}`}>
                    {cat.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Amount input */}
          <div className="card p-5">
            <h3 className="font-semibold text-sm text-primary-color mb-4">
              {selectedCategory.emoji} {selectedCategory.label} — Expense Amount
            </h3>

            {selectedCategory.id === 'custom' ? (
              <div>
                <label htmlFor="custom-amount" className="label">Enter Custom Amount (₹)</label>
                <input
                  id="custom-amount"
                  type="number"
                  className="input-field text-lg font-bold"
                  placeholder="e.g. 8000"
                  value={customAmount}
                  onChange={e => { setCustomAmount(e.target.value); setResult(null); }}
                />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="label">Amount</label>
                  <span className="text-xl font-bold text-blue-600">{formatCurrency(amount)}</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={50000}
                  step={500}
                  value={amount}
                  onChange={e => { setAmount(Number(e.target.value)); setResult(null); }}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer mb-2"
                  style={{ background: `linear-gradient(to right, #2563EB 0%, #2563EB ${(amount - 500) / (50000 - 500) * 100}%, var(--color-border) ${(amount - 500) / (50000 - 500) * 100}%, var(--color-border) 100%)` }}
                />
                <div className="flex justify-between text-xs text-secondary-color">
                  <span>₹500</span><span>₹50,000</span>
                </div>

                {selectedCategory.suggested > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {[selectedCategory.suggested / 2, selectedCategory.suggested, selectedCategory.suggested * 1.5].map(v => (
                      <button key={v} onClick={() => { setAmount(Math.round(v)); setResult(null); }}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${amount === Math.round(v) ? 'bg-blue-600 text-white border-blue-600' : 'btn-secondary'}`}>
                        {formatCurrency(Math.round(v))}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleAnalyze}
              disabled={!effectiveAmount || loading}
              className="btn-primary w-full mt-4"
              id="analyze-impact-btn"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : null}
              Analyze Impact
            </motion.button>
          </div>
        </div>

        {/* Right — Results */}
        <div className="space-y-5">
          {/* Live preview */}
          {liveResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-5"
            >
              <h3 className="font-semibold text-sm text-primary-color mb-4">Live Preview</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
                  <p className="text-[10px] text-secondary-color mb-0.5">Expense</p>
                  <p className="text-lg font-bold text-red-500">{formatCurrency(liveResult.expense)}</p>
                </div>
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                  <p className="text-[10px] text-secondary-color mb-0.5">Remaining Capacity</p>
                  <p className="text-lg font-bold text-emerald-500">{formatCurrency(liveResult.remainingCapacity)}</p>
                </div>
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--color-bg)' }}>
                  <p className="text-[10px] text-secondary-color mb-0.5">Savings Impact</p>
                  <p className="text-lg font-bold text-red-500">-{formatCurrency(effectiveAmount)}</p>
                </div>
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--color-bg)' }}>
                  <p className="text-[10px] text-secondary-color mb-0.5">Est. Goal Impact</p>
                  <p className="text-lg font-bold text-amber-500">+{liveResult.goalImpactMonths}m</p>
                </div>
              </div>
              <ImpactMeter percent={liveResult.percentOfCapacity} />
            </motion.div>
          )}

          {/* Detailed analysis result */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="card p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle size={16} className="text-blue-600" />
                  <h3 className="font-semibold text-sm text-primary-color">Impact Analysis</h3>
                </div>

                <p className="text-sm text-primary-color mb-4 leading-relaxed">{result.message}</p>

                <div className="p-3 rounded-xl text-xs" style={{ backgroundColor: 'rgba(37, 99, 235, 0.06)', borderLeft: '3px solid #2563EB' }}>
                  <p className="font-semibold text-blue-600 mb-1">ℹ️ You're in control</p>
                  <p className="text-secondary-color">This analysis shows the potential impact on your goals. How you choose to spend your money is entirely your decision. AI provides information, not instructions.</p>
                </div>

                <div className="disclaimer mt-3">{result.disclaimer}</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {!liveResult && (
            <div className="card p-8 text-center">
              <div className="text-4xl mb-4">💡</div>
              <p className="font-semibold text-primary-color mb-2">Pick a category and amount</p>
              <p className="text-xs text-secondary-color">Select an expense category above and set an amount to see how it would affect your available financial capacity and goal timeline.</p>
            </div>
          )}
        </div>
      </div>

      <div className="disclaimer mt-6">
        ⚠️ Lifestyle impact analysis is illustrative and based on synthetic demo data. Never says "don't spend" — you make the call.
      </div>
    </div>
  );
}
