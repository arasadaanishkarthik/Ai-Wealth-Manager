import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, TrendingUp, Hammer, AlertTriangle, Brain,
  CheckCircle, DollarSign, Users, BarChart3
} from 'lucide-react';
import { demoStartups, aiBusinessPlanTemplate } from '../data/startups';
import { formatCurrency, riskColor } from '../utils/formatters';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function StartupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState('overview'); // 'overview' | 'invest' | 'build'
  const [showBizPlan, setShowBizPlan] = useState(false);
  const [planLoading, setPlanLoading] = useState(false);
  const [bizPlan, setBizPlan] = useState(null);

  const startup = demoStartups.find(s => s.id === id);

  if (!startup) {
    return (
      <div className="page-container text-center py-20">
        <p className="text-secondary-color">Startup not found.</p>
        <button onClick={() => navigate('/startup')} className="btn-primary mt-4">Back to Startup Lab</button>
      </div>
    );
  }

  const capitalData = Object.entries(startup.capitalBreakdown).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
    value,
    color: ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'][Object.keys(startup.capitalBreakdown).indexOf(key)],
  }));

  const handleGeneratePlan = async () => {
    setPlanLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setBizPlan(aiBusinessPlanTemplate(startup));
    setPlanLoading(false);
    setShowBizPlan(true);
  };

  return (
    <div className="page-container">
      {/* Back button */}
      <button onClick={() => navigate('/startup')} className="btn-ghost mb-6 -ml-2">
        <ArrowLeft size={16} /> Back to Startup Lab
      </button>

      {/* Header */}
      <div className="card p-6 mb-6">
        <div className="flex items-start gap-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{ backgroundColor: `${startup.color}15` }}
          >
            {startup.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h1 className="text-2xl font-bold text-primary-color">{startup.name}</h1>
                <p className="text-sm text-secondary-color">{startup.tagline}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className="text-xs px-3 py-1 rounded-full font-semibold flex-shrink-0"
                  style={{ backgroundColor: `${startup.color}15`, color: startup.color }}
                >
                  {startup.sector}
                </span>
                <span
                  className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{ backgroundColor: `${riskColor(startup.riskLevel)}15`, color: riskColor(startup.riskLevel) }}
                >
                  {startup.riskLevel} Risk
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-lg w-fit border border-amber-200 dark:border-amber-800">
              <AlertTriangle size={11} />
              <span>{startup.syntheticNote}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'invest', label: 'Invest Mode', icon: TrendingUp },
          { id: 'build', label: 'Build Mode', icon: Hammer },
        ].map(({ id: mId, label, icon: Icon }) => (
          <button
            key={mId}
            onClick={() => setMode(mId)}
            id={`startup-tab-${mId}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${mode === mId ? 'bg-blue-600 text-white shadow-sm' : 'btn-secondary'}`}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {mode === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid lg:grid-cols-2 gap-6">
          <div className="card p-6 space-y-4">
            {[
              { label: 'Problem', value: startup.problem, icon: '❗' },
              { label: 'Solution', value: startup.solution, icon: '💡' },
              { label: 'Target Customers', value: startup.targetCustomers, icon: '👥' },
              { label: 'Business Model', value: startup.businessModel, icon: '🏗️' },
              { label: 'Revenue Model', value: startup.revenueModel, icon: '💰' },
              { label: 'Growth Scenario', value: startup.growthScenario, icon: '📈' },
            ].map(({ label, value, icon }) => (
              <div key={label} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg)' }}>
                <p className="text-xs font-semibold text-secondary-color uppercase tracking-wider mb-1">{icon} {label}</p>
                <p className="text-sm text-primary-color">{value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-5">
            <div className="card p-5">
              <h3 className="font-semibold text-sm text-primary-color mb-3">Financials (Illustrative)</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Initial Capital', value: formatCurrency(startup.initialCapital) },
                  { label: 'Monthly Operating', value: formatCurrency(startup.monthlyOperating) },
                  { label: 'Stage', value: startup.stage },
                  { label: 'Risk Level', value: startup.riskLevel },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 rounded-xl" style={{ backgroundColor: 'var(--color-bg)' }}>
                    <p className="text-[10px] text-secondary-color">{label}</p>
                    <p className="text-sm font-bold text-primary-color">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-semibold text-sm text-primary-color mb-3">⚠️ Risk Factors</h3>
              <div className="space-y-2">
                {startup.riskFactors.map((rf) => (
                  <div key={rf} className="flex items-start gap-2">
                    <AlertTriangle size={12} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-secondary-color">{rf}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Invest Mode */}
      {mode === 'invest' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="font-semibold text-primary-color mb-1">Capital Allocation Breakdown</h3>
            <p className="text-xs text-secondary-color mb-5">Hypothetical capital deployment scenario</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={capitalData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {capitalData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="transparent" />)}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 12, fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {capitalData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-secondary-color">{item.name}</span>
                  </div>
                  <span className="font-semibold text-primary-color">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-primary-color mb-4">Hypothetical Investment Summary</h3>
            <div className="space-y-3">
              {[
                { label: 'Total Investment', value: formatCurrency(startup.initialCapital), color: startup.color },
                { label: 'Risk Level', value: startup.riskLevel, color: riskColor(startup.riskLevel) },
                { label: 'Business Model', value: startup.businessModel },
                { label: 'Break-even Scenario', value: startup.growthScenario },
              ].map(({ label, value, color }) => (
                <div key={label} className="p-3 rounded-xl" style={{ backgroundColor: 'var(--color-bg)' }}>
                  <p className="text-[10px] text-secondary-color mb-0.5">{label}</p>
                  <p className="text-sm font-semibold" style={{ color: color || 'var(--color-text)' }}>{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <p className="text-xs font-semibold text-red-600 mb-1">⚠️ High Risk Disclaimer</p>
              <p className="text-xs text-secondary-color">Startup investments are among the highest-risk financial decisions. Most startups fail within 3 years. This is a hypothetical simulation — not real investment advice.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Build Mode */}
      {mode === 'build' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-primary-color">Simulated Launch Plan</h3>
                <p className="text-xs text-secondary-color">AI-generated implementation roadmap for {startup.name}</p>
              </div>
              <Button
                variant="primary"
                onClick={handleGeneratePlan}
                loading={planLoading}
                icon={<Brain size={14} />}
                id="generate-bizplan-btn"
              >
                Generate AI Business Plan
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {capitalData.map((item) => (
                <div key={item.name} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg)', borderLeft: `3px solid ${item.color}` }}>
                  <p className="text-xs text-secondary-color mb-1">{item.name}</p>
                  <p className="text-lg font-bold" style={{ color: item.color }}>{formatCurrency(item.value)}</p>
                  <p className="text-[10px] text-secondary-color">{Math.round((item.value / startup.initialCapital) * 100)}% of budget</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { phase: 'Phase 1 (0–3 months)', focus: 'MVP Development & Beta Testing', icon: '🛠️' },
              { phase: 'Phase 2 (3–6 months)', focus: 'Pilot Launch & Early Customers', icon: '🚀' },
              { phase: 'Phase 3 (6–12 months)', focus: 'Scale & Marketing Push', icon: '📣' },
              { phase: 'Phase 4 (12–18 months)', focus: 'Growth & Fundraising Prep', icon: '📈' },
            ].map((p) => (
              <div key={p.phase} className="card p-4 flex items-start gap-3">
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-primary-color">{p.phase}</p>
                  <p className="text-xs text-secondary-color mt-0.5">{p.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* AI Business Plan Modal */}
      <Modal
        isOpen={showBizPlan}
        onClose={() => setShowBizPlan(false)}
        title="🤖 AI-Generated Business Plan"
        size="lg"
        footer={<Button variant="secondary" onClick={() => setShowBizPlan(false)} fullWidth>Close</Button>}
      >
        {bizPlan && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(37, 99, 235, 0.06)', borderLeft: '3px solid #2563EB' }}>
              <p className="text-xs font-semibold text-blue-600 mb-1">Executive Summary</p>
              <p className="text-sm text-secondary-color">{bizPlan.executiveSummary}</p>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-primary-color mb-3">Launch Phases</h4>
              <div className="space-y-2">
                {bizPlan.phases.map((phase) => (
                  <div key={phase.phase} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: 'var(--color-bg)' }}>
                    <div>
                      <p className="text-xs font-semibold text-primary-color">{phase.phase}</p>
                      <p className="text-xs text-secondary-color">{phase.focus}</p>
                    </div>
                    <p className="text-sm font-bold text-blue-600 flex-shrink-0 ml-4">{formatCurrency(phase.budget)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-primary-color mb-3">Key Metrics to Track</h4>
              <div className="flex flex-wrap gap-2">
                {bizPlan.keyMetrics.map((m) => (
                  <span key={m} className="badge-info text-xs">{m}</span>
                ))}
              </div>
            </div>

            <div className="disclaimer">
              {bizPlan.disclaimer}
            </div>
          </div>
        )}
      </Modal>

      <div className="disclaimer mt-6">
        ⚠️ {startup.syntheticNote} All projections and plans are illustrative only. Not business or financial advice.
      </div>
    </div>
  );
}
