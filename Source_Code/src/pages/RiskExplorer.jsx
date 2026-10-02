import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle } from 'lucide-react';

const riskProfiles = [
  {
    id: 'conservative',
    icon: '🛡️',
    label: 'Conservative',
    tagline: 'Stability First',
    color: '#10B981',
    description: 'A conservative approach prioritizes protecting your existing savings, building emergency reserves, and ensuring your core financial goals are met with minimal uncertainty.',
    focus: [
      'Emergency reserve building',
      'Fixed-income goal savings',
      'Minimal market exposure',
      'Lower volatility scenarios',
      'Short-term predictability',
    ],
    hypothetical: {
      savingsRate: '80–100% of available capacity',
      growthAlloc: 'None to minimal',
      timeHorizon: '0–2 years',
      volatility: 'Very low',
    },
    suitableFor: 'Those approaching major life events, with short time horizons, or who prioritize financial security over growth.',
  },
  {
    id: 'moderate',
    icon: '⚖️',
    label: 'Moderate',
    tagline: 'Balanced Growth',
    color: '#2563EB',
    description: 'A moderate approach balances stability with growth. Part of your capacity goes to safe goal savings, while another portion explores diversified growth scenarios over a medium-term horizon.',
    focus: [
      'Balanced savings and growth',
      'Diversified scenario allocation',
      'Medium-term wealth building',
      'Managed uncertainty',
      'Goal + growth coexistence',
    ],
    hypothetical: {
      savingsRate: '50–70% of available capacity',
      growthAlloc: '20–40% to growth scenarios',
      timeHorizon: '2–5 years',
      volatility: 'Moderate',
    },
    suitableFor: 'Most working professionals with a 2–5 year horizon who want both financial security and long-term wealth building.',
  },
  {
    id: 'higher',
    icon: '🚀',
    label: 'Higher Risk',
    tagline: 'Growth Oriented',
    color: '#8B5CF6',
    description: 'A higher-risk approach allocates more toward growth scenarios, equity-linked opportunities, and potentially startup investments. Returns and timelines are highly uncertain.',
    focus: [
      'Higher potential growth (uncertain)',
      'Equity and growth scenarios',
      'Startup opportunity exploration',
      'Greater volatility tolerance',
      'Long-term compounding focus',
    ],
    hypothetical: {
      savingsRate: '30–50% of available capacity',
      growthAlloc: '50%+ to growth/equity scenarios',
      timeHorizon: '5–10 years',
      volatility: 'High',
    },
    suitableFor: 'Younger professionals with long time horizons, stable income, fully funded emergency reserves, and tolerance for significant uncertainty.',
  },
];

export default function RiskExplorer() {
  const [selected, setSelected] = useState('moderate');
  const selectedProfile = riskProfiles.find(r => r.id === selected);

  return (
    <div className="page-container">
      <div className="mb-6">
        <h1 className="section-title flex items-center gap-2"><Shield size={22} /> Risk Explorer</h1>
        <p className="section-subtitle">Explore your risk scenario options and understand what each approach means for your financial journey.</p>
      </div>

      {/* Profile selector */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {riskProfiles.map((profile, i) => (
          <motion.button
            key={profile.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -3 }}
            onClick={() => setSelected(profile.id)}
            id={`risk-${profile.id}`}
            className={`card p-6 text-left transition-all duration-200 ${selected === profile.id ? 'shadow-xl' : 'hover:shadow-md'}`}
            style={{
              borderColor: selected === profile.id ? profile.color : 'var(--color-border)',
              borderWidth: selected === profile.id ? 2 : 1,
              backgroundColor: selected === profile.id ? `${profile.color}06` : 'var(--color-surface)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{profile.icon}</span>
              {selected === profile.id && (
                <CheckCircle size={16} style={{ color: profile.color }} />
              )}
            </div>
            <h3 className="font-bold text-primary-color mb-1">{profile.label}</h3>
            <p className="text-xs font-semibold mb-2" style={{ color: profile.color }}>{profile.tagline}</p>
            <p className="text-xs text-secondary-color line-clamp-3">{profile.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Detail panel */}
      <motion.div
        key={selected}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid lg:grid-cols-2 gap-6"
      >
        {/* Focus areas */}
        <div className="card p-6">
          <h3 className="font-semibold text-primary-color mb-4">
            {selectedProfile.icon} {selectedProfile.label} — Focus Areas
          </h3>
          <div className="space-y-3">
            {selectedProfile.focus.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${selectedProfile.color}15` }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedProfile.color }} />
                </div>
                <span className="text-sm text-primary-color">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg)' }}>
            <p className="text-xs font-semibold text-secondary-color mb-3 uppercase tracking-wider">Suitable For</p>
            <p className="text-sm text-primary-color">{selectedProfile.suitableFor}</p>
          </div>
        </div>

        {/* Hypothetical parameters */}
        <div className="card p-6">
          <h3 className="font-semibold text-primary-color mb-1">Hypothetical Parameters</h3>
          <p className="text-xs text-secondary-color mb-4">Illustrative scenario assumptions — not financial advice</p>

          <div className="space-y-3 mb-6">
            {Object.entries(selectedProfile.hypothetical).map(([key, val]) => {
              const labels = {
                savingsRate: 'Savings Allocation',
                growthAlloc: 'Growth Allocation',
                timeHorizon: 'Time Horizon',
                volatility: 'Volatility Level',
              };
              return (
                <div key={key} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'var(--color-bg)' }}>
                  <span className="text-xs text-secondary-color">{labels[key]}</span>
                  <span className="text-sm font-bold" style={{ color: selectedProfile.color }}>{val}</span>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl" style={{ backgroundColor: `${selectedProfile.color}08`, border: `1px solid ${selectedProfile.color}20` }}>
            <p className="text-xs font-semibold mb-2" style={{ color: selectedProfile.color }}>Key Reminder</p>
            <p className="text-xs text-secondary-color">
              These are <strong>illustrative scenario parameters</strong>, not guaranteed outcomes. All projections are hypothetical
              and depend on many unpredictable factors. The decision about risk tolerance is personal and should involve
              a licensed financial advisor for real implementation.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="disclaimer mt-6">
        ⚠️ Risk profiles shown are scenario frameworks for educational purposes. They do not constitute investment advice or guaranteed returns.
        All data is synthetic and illustrative.
      </div>
    </div>
  );
}
