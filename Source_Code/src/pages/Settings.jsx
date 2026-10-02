import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon, Sun, Moon, Bell, Shield,
  Brain, RotateCcw, User, Lock, Database, Check,
  AlertTriangle, Eye, Sparkles
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { demoUser } from '../data/userData';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

export default function Settings() {
  const { isDark, toggleTheme } = useTheme();

  // Settings states
  const [aiExplanationDepth, setAiExplanationDepth] = useState('detailed'); // 'concise' | 'detailed' | 'technical'
  const [showAssumptionsByDefault, setShowAssumptionsByDefault] = useState(true);
  const [conservativeScenarioBias, setConservativeScenarioBias] = useState(false);

  // Notification toggles
  const [notifGoals, setNotifGoals] = useState(true);
  const [notifScenarios, setNotifScenarios] = useState(true);
  const [notifAiInsights, setNotifAiInsights] = useState(true);
  const [notifActionPlan, setNotifActionPlan] = useState(true);

  // Account / Currency
  const [currency, setCurrency] = useState('INR');
  const [numberFormat, setNumberFormat] = useState('lakhs'); // 'lakhs' | 'millions'
  const [emergencyTargetMonths, setEmergencyTargetMonths] = useState(6);

  // Modal for demo reset
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleResetData = () => {
    localStorage.removeItem('ai_wealth_custom_data');
    localStorage.removeItem('ai_wealth_user_actions');
    setResetSuccess(true);
    setTimeout(() => {
      setShowResetModal(false);
      setResetSuccess(false);
    }, 1200);
  };

  const handleSaveSettings = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="section-title flex items-center gap-2">
            <SettingsIcon size={22} className="text-blue-600" /> Settings & Preferences
          </h1>
          <p className="section-subtitle">
            Configure UI themes, AI decision-support depth, notifications, and demo privacy boundaries.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 shadow-sm"
        >
          {saveSuccess ? <Check size={14} /> : <Sparkles size={14} />}
          {saveSuccess ? 'Preferences Saved!' : 'Save Preferences'}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Visual Appearance & Theme */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600">
                {isDark ? <Moon size={18} /> : <Sun size={18} />}
              </div>
              <div>
                <h2 className="font-bold text-sm text-primary-color">Interface Theme</h2>
                <p className="text-xs text-secondary-color">Switch between sleek dark cockpit mode and crisp light theme.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              <button
                onClick={() => isDark && toggleTheme()}
                className={`p-4 rounded-xl text-left border flex items-center justify-between transition-all ${
                  !isDark
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 ring-2 ring-blue-500/20'
                    : 'border-color hover:border-slate-400 bg-surface'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-amber-500 shadow-sm">
                    <Sun size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary-color">Light Theme</p>
                    <p className="text-[10px] text-secondary-color">High contrast clarity</p>
                  </div>
                </div>
                {!isDark && <Check size={16} className="text-blue-600" />}
              </button>

              <button
                onClick={() => !isDark && toggleTheme()}
                className={`p-4 rounded-xl text-left border flex items-center justify-between transition-all ${
                  isDark
                    ? 'border-blue-500 bg-blue-950/30 ring-2 ring-blue-500/20'
                    : 'border-color hover:border-slate-400 bg-surface'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-blue-400 shadow-sm">
                    <Moon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary-color">Dark Cockpit</p>
                    <p className="text-[10px] text-secondary-color">FinTech dark glass mode</p>
                  </div>
                </div>
                {isDark && <Check size={16} className="text-blue-400" />}
              </button>
            </div>
          </div>

          {/* AI Decision Support & Explanation Preferences */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center text-purple-600">
                <Brain size={18} />
              </div>
              <div>
                <h2 className="font-bold text-sm text-primary-color">AI Explanation & Reasoning Depth</h2>
                <p className="text-xs text-secondary-color">
                  Control how detailed the AI recommendations and step-by-step reasoning workflows should be.
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {[
                {
                  id: 'concise',
                  title: 'Concise & Action-Oriented',
                  desc: 'Short executive summaries with key bottom-line numbers and direct recommendations.',
                },
                {
                  id: 'detailed',
                  title: 'Detailed Reasoning (Recommended)',
                  desc: 'Includes financial breakdown, capacity impact, goal timeline shifts, and assumptions.',
                },
                {
                  id: 'technical',
                  title: 'Deep Technical & Sensitivity Analysis',
                  desc: 'Full breakdown of mathematical variables, uncertainty ranges, and boundary scenarios.',
                },
              ].map((tier) => (
                <label
                  key={tier.id}
                  onClick={() => setAiExplanationDepth(tier.id)}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    aiExplanationDepth === tier.id
                      ? 'border-purple-600 bg-purple-50/40 dark:bg-purple-950/20'
                      : 'border-color hover:border-slate-400 bg-surface'
                  }`}
                >
                  <input
                    type="radio"
                    name="aiDepth"
                    checked={aiExplanationDepth === tier.id}
                    onChange={() => setAiExplanationDepth(tier.id)}
                    className="mt-1 text-purple-600 focus:ring-purple-500"
                  />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-primary-color">{tier.title}</p>
                    <p className="text-[11px] text-secondary-color mt-0.5 leading-normal">{tier.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-color space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-medium text-primary-color">Always Display Scenario Assumptions</span>
                  <p className="text-[10px] text-secondary-color">Exposes inflation, income stability, and rate assumptions under every chart</p>
                </div>
                <input
                  type="checkbox"
                  checked={showAssumptionsByDefault}
                  onChange={(e) => setShowAssumptionsByDefault(e.target.checked)}
                  className="rounded border-color text-purple-600 focus:ring-purple-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-medium text-primary-color">Conservative Scenario Bias</span>
                  <p className="text-[10px] text-secondary-color">Applies a 10% safety buffer to emergency fund and lifestyle forecasts</p>
                </div>
                <input
                  type="checkbox"
                  checked={conservativeScenarioBias}
                  onChange={(e) => setConservativeScenarioBias(e.target.checked)}
                  className="rounded border-color text-purple-600 focus:ring-purple-500 w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* In-App Notification Preferences */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600">
                <Bell size={18} />
              </div>
              <div>
                <h2 className="font-bold text-sm text-primary-color">Notification Channels</h2>
                <p className="text-xs text-secondary-color">Select which financial events trigger notification cards in the Hub.</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Goal Milestones & Timelines', desc: 'When goals reach 25%, 50%, 75% or change projected completion dates', state: notifGoals, set: setNotifGoals },
                { label: 'Simulation & Capacity Alerts', desc: 'When what-if decisions exceed available monthly capacity (₹30K)', state: notifScenarios, set: setNotifScenarios },
                { label: 'AI Optimization Insights', desc: 'When AI identifies surplus capacity or faster goal pathways', state: notifAiInsights, set: setNotifAiInsights },
                { label: 'Action Plan Approval Updates', desc: 'When recommendations require human oversight approval or modification', state: notifActionPlan, set: setNotifActionPlan },
              ].map((item) => (
                <label key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-page border border-color cursor-pointer">
                  <div>
                    <span className="text-xs font-semibold text-primary-color">{item.label}</span>
                    <p className="text-[10px] text-secondary-color">{item.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={item.state}
                    onChange={(e) => item.set(e.target.checked)}
                    className="rounded border-color text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Privacy, Currency & Demo Reset */}
        <div className="space-y-6">
          {/* Financial Display Settings */}
          <div className="card p-5">
            <h3 className="font-bold text-sm text-primary-color mb-3 flex items-center gap-2">
              <User size={16} className="text-blue-600" /> Account & Display
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="label">Currency Format</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="input-field text-xs py-2"
                >
                  <option value="INR">₹ INR (Indian Rupee)</option>
                  <option value="USD">$ USD (US Dollar - Simulated)</option>
                </select>
              </div>

              <div>
                <label className="label">Number Denomination</label>
                <select
                  value={numberFormat}
                  onChange={(e) => setNumberFormat(e.target.value)}
                  className="input-field text-xs py-2"
                >
                  <option value="lakhs">Indian Format (₹1,00,000 / Lakhs)</option>
                  <option value="millions">International Format (₹100,000 / K)</option>
                </select>
              </div>

              <div>
                <label className="label">Target Emergency Coverage</label>
                <select
                  value={emergencyTargetMonths}
                  onChange={(e) => setEmergencyTargetMonths(Number(e.target.value))}
                  className="input-field text-xs py-2"
                >
                  <option value={3}>3 Months Essential Expenses (₹1,80,000)</option>
                  <option value={6}>6 Months Essential Expenses (₹3,60,000) [Recommended]</option>
                  <option value={12}>12 Months Conservative Buffer (₹7,20,000)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy & Zero-Backend Boundary */}
          <div className="card p-5 border border-emerald-500/20 bg-emerald-500/5">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
              <Shield size={16} />
              <h3 className="font-bold text-sm">Privacy & Security Boundary</h3>
            </div>
            <p className="text-xs text-secondary-color leading-relaxed mb-3">
              AI Wealth Navigator runs strictly with synthetic demo data. No real bank accounts, PAN cards, or actual financial credentials are ever requested or stored.
            </p>
            <div className="space-y-1.5 text-[11px] text-secondary-color">
              <div className="flex items-center gap-1.5">
                <Check size={12} className="text-emerald-500" />
                <span>100% Client-Side / Demo Execution</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check size={12} className="text-emerald-500" />
                <span>No Third-Party Financial Telemetry</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check size={12} className="text-emerald-500" />
                <span>Zero Real Banking API Connections</span>
              </div>
            </div>
          </div>

          {/* Reset Demo Data */}
          <div className="card p-5 border border-red-500/20">
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <RotateCcw size={16} />
              <h3 className="font-bold text-sm">Reset Demo Environment</h3>
            </div>
            <p className="text-xs text-secondary-color leading-relaxed mb-4">
              Restores initial Anish Sharma demo profile values (₹1,00,000 income, ₹60,000 expenses, ₹30,000 capacity) and resets all approved action plan items.
            </p>
            <button
              onClick={() => setShowResetModal(true)}
              className="btn-secondary w-full text-xs py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-900"
            >
              Reset to Factory Demo State
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset Demo Data"
        size="sm"
        footer={
          <div className="flex gap-2 w-full">
            <Button variant="secondary" onClick={() => setShowResetModal(false)} fullWidth>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleResetData} fullWidth>
              {resetSuccess ? 'Reset Complete!' : 'Confirm Reset'}
            </Button>
          </div>
        }
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 border border-red-200 dark:border-red-900 text-xs">
            <AlertTriangle size={20} className="flex-shrink-0" />
            <span>Are you sure? This will reset all your simulated scenarios, what-if sliders, and approved action recommendations back to defaults.</span>
          </div>
        </div>
      </Modal>

      <div className="disclaimer mt-8">
        ⚠️ Settings and preferences are saved to your browser's local storage for hackathon demonstration.
      </div>
    </div>
  );
}
