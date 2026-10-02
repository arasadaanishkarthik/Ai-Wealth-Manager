import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, TrendingUp, CheckCircle, User, DollarSign, Target, Shield, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const TOTAL_STEPS = 5;

const riskProfiles = [
  {
    id: 'conservative',
    label: 'Conservative',
    icon: '🛡️',
    color: '#10B981',
    desc: 'Stability first. Focus on protecting what you have, building emergency reserves, and predictable goal savings with lower volatility scenarios.',
    traits: ['Capital preservation', 'Emergency reserves', 'Low uncertainty', 'Predictable outcomes'],
  },
  {
    id: 'moderate',
    label: 'Moderate',
    icon: '⚖️',
    color: '#2563EB',
    desc: 'Balance between stability and growth. Diversified approach across goal savings and growth scenarios with medium-term horizon.',
    traits: ['Balanced approach', 'Diversification', 'Medium uncertainty', 'Growth + safety'],
  },
  {
    id: 'higher',
    label: 'Higher Risk',
    icon: '🚀',
    color: '#8B5CF6',
    desc: 'Growth-oriented scenarios with higher uncertainty. Suitable for longer time horizons including startup opportunities and equity scenarios.',
    traits: ['Growth focused', 'Higher uncertainty', 'Long-term horizon', 'Greater variability'],
  },
];

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className="transition-all duration-300 rounded-full"
          style={{
            width: i + 1 === currentStep ? 24 : 8,
            height: 8,
            backgroundColor: i + 1 <= currentStep ? '#2563EB' : 'var(--color-border)',
          }}
        />
      ))}
    </div>
  );
}

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Anish Sharma',
    age: '28',
    occupation: 'Software Engineer',
    income: '100000',
    expenses: '60000',
    savings: '340000',
    goalName: 'Emergency Fund',
    goalAmount: '300000',
    goalDate: '2025-03-31',
    risk: 'moderate',
  });

  const update = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  const next = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));
  const prev = () => setStep(s => Math.max(s - 1, 1));

  const stepContent = {
    1: {
      icon: <User size={20} />,
      title: 'About You',
      subtitle: "Let's start with the basics",
    },
    2: {
      icon: <DollarSign size={20} />,
      title: 'Financial Snapshot',
      subtitle: 'Your monthly financial picture',
    },
    3: {
      icon: <Target size={20} />,
      title: 'Financial Goals',
      subtitle: "What are you working toward?",
    },
    4: {
      icon: <Shield size={20} />,
      title: 'Risk Preference',
      subtitle: 'How do you approach financial uncertainty?',
    },
    5: {
      icon: <Sparkles size={20} />,
      title: 'Your Profile',
      subtitle: "Here's your financial summary",
    },
  };

  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <TrendingUp size={16} className="text-white" />
            </div>
            <span className="font-bold text-primary-color">AI Wealth Navigator</span>
          </div>
          <StepIndicator currentStep={step} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="card p-8"
          >
            {/* Step header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white flex-shrink-0">
                {stepContent[step].icon}
              </div>
              <div>
                <div className="text-xs text-secondary-color font-medium">Step {step} of {TOTAL_STEPS}</div>
                <h2 className="text-xl font-bold text-primary-color">{stepContent[step].title}</h2>
                <p className="text-xs text-secondary-color">{stepContent[step].subtitle}</p>
              </div>
            </div>

            {/* Step 1 — About You */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="ob-name" className="label">Full Name</label>
                  <input id="ob-name" className="input-field" value={formData.name} onChange={e => update('name', e.target.value)} placeholder="Your name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ob-age" className="label">Age</label>
                    <input id="ob-age" type="number" className="input-field" value={formData.age} onChange={e => update('age', e.target.value)} placeholder="28" />
                  </div>
                  <div>
                    <label htmlFor="ob-occ" className="label">Occupation</label>
                    <input id="ob-occ" className="input-field" value={formData.occupation} onChange={e => update('occupation', e.target.value)} placeholder="Software Engineer" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 — Financial Snapshot */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="ob-income" className="label">Monthly Income (₹)</label>
                  <input id="ob-income" type="number" className="input-field" value={formData.income} onChange={e => update('income', e.target.value)} placeholder="100000" />
                </div>
                <div>
                  <label htmlFor="ob-expenses" className="label">Monthly Expenses (₹)</label>
                  <input id="ob-expenses" type="number" className="input-field" value={formData.expenses} onChange={e => update('expenses', e.target.value)} placeholder="60000" />
                </div>
                <div>
                  <label htmlFor="ob-savings" className="label">Current Savings (₹)</label>
                  <input id="ob-savings" type="number" className="input-field" value={formData.savings} onChange={e => update('savings', e.target.value)} placeholder="340000" />
                </div>
                <div className="p-3 rounded-xl text-sm" style={{ backgroundColor: 'rgba(37, 99, 235, 0.06)', borderLeft: '3px solid #2563EB' }}>
                  <p className="font-semibold text-blue-600 text-xs mb-0.5">Available Capacity</p>
                  <p className="text-primary-color font-bold">
                    {formatCurrency(Math.max(0, Number(formData.income) - Number(formData.expenses)))} / month
                  </p>
                </div>
              </div>
            )}

            {/* Step 3 — Goals */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="ob-goal" className="label">Primary Goal</label>
                  <input id="ob-goal" className="input-field" value={formData.goalName} onChange={e => update('goalName', e.target.value)} placeholder="e.g. Emergency Fund" />
                </div>
                <div>
                  <label htmlFor="ob-goalamt" className="label">Target Amount (₹)</label>
                  <input id="ob-goalamt" type="number" className="input-field" value={formData.goalAmount} onChange={e => update('goalAmount', e.target.value)} placeholder="300000" />
                </div>
                <div>
                  <label htmlFor="ob-goaldate" className="label">Target Date</label>
                  <input id="ob-goaldate" type="date" className="input-field" value={formData.goalDate} onChange={e => update('goalDate', e.target.value)} />
                </div>
                <p className="text-xs text-secondary-color">
                  You can add more goals from the Goals page after onboarding.
                </p>
              </div>
            )}

            {/* Step 4 — Risk */}
            {step === 4 && (
              <div className="space-y-3">
                {riskProfiles.map((profile) => (
                  <motion.button
                    key={profile.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => update('risk', profile.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${formData.risk === profile.id ? 'shadow-md' : ''}`}
                    style={{
                      borderColor: formData.risk === profile.id ? profile.color : 'var(--color-border)',
                      backgroundColor: formData.risk === profile.id ? `${profile.color}08` : 'var(--color-bg)',
                    }}
                    id={`risk-${profile.id}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{profile.icon}</span>
                        <span className="font-bold text-sm text-primary-color">{profile.label}</span>
                      </div>
                      {formData.risk === profile.id && (
                        <CheckCircle size={16} style={{ color: profile.color }} />
                      )}
                    </div>
                    <p className="text-xs text-secondary-color mb-2">{profile.desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {profile.traits.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: `${profile.color}15`, color: profile.color }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Step 5 — Summary */}
            {step === 5 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Name', value: formData.name },
                    { label: 'Occupation', value: formData.occupation },
                    { label: 'Monthly Income', value: formatCurrency(Number(formData.income)) },
                    { label: 'Monthly Expenses', value: formatCurrency(Number(formData.expenses)) },
                    { label: 'Available Capacity', value: formatCurrency(Math.max(0, Number(formData.income) - Number(formData.expenses))) },
                    { label: 'Current Savings', value: formatCurrency(Number(formData.savings)) },
                    { label: 'Primary Goal', value: formData.goalName },
                    { label: 'Risk Preference', value: riskProfiles.find(r => r.id === formData.risk)?.label },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-3 rounded-xl" style={{ backgroundColor: 'var(--color-bg)' }}>
                      <p className="text-[10px] text-secondary-color mb-0.5">{label}</p>
                      <p className="text-sm font-bold text-primary-color">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl text-xs" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <p className="font-semibold mb-1">✓ Profile ready</p>
                  <p style={{ color: 'var(--color-text-secondary)' }}>Your financial profile has been created with synthetic demo data. You can explore all features of the dashboard.</p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button onClick={prev} className="btn-secondary flex-1">
                  <ArrowLeft size={16} /> Back
                </button>
              )}
              {step < TOTAL_STEPS ? (
                <button onClick={next} className="btn-primary flex-1" id={`onboarding-next-${step}`}>
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/dashboard')}
                  className="btn-primary flex-1 py-3.5"
                  id="onboarding-complete-btn"
                >
                  Enter My Wealth Dashboard <ArrowRight size={16} />
                </motion.button>
              )}
            </div>

            {step < TOTAL_STEPS && (
              <div className="text-center mt-4">
                <button onClick={() => navigate('/dashboard')} className="text-xs text-secondary-color hover:text-primary-color underline">
                  Skip onboarding →
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
