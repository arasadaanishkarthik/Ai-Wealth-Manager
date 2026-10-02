import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, CheckCircle, Edit3, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { demoRecommendations } from '../data/recommendations';
import { formatCurrency } from '../utils/formatters';

const statusConfig = {
  Pending: { color: '#64748B', bg: 'rgba(100, 116, 139, 0.1)', label: 'Pending' },
  Approved: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', label: 'Approved ✓' },
  Modified: { color: '#2563EB', bg: 'rgba(37, 99, 235, 0.1)', label: 'Modified' },
  Rejected: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', label: 'Rejected' },
};

const impactColors = {
  High: '#EF4444',
  Medium: '#F59E0B',
  Low: '#10B981',
};

function RecommendationCard({ rec, index, onAction }) {
  const [expanded, setExpanded] = useState(false);
  const [showModify, setShowModify] = useState(false);
  const [note, setNote] = useState('');
  const status = statusConfig[rec.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`card transition-all duration-200 ${rec.status !== 'Pending' ? 'opacity-80' : ''}`}
      style={{ borderLeft: `4px solid ${rec.color}` }}
    >
      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ backgroundColor: `${rec.color}15` }}>
              {rec.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-secondary-color">Priority {rec.priority}</span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: `${impactColors[rec.impact]}15`, color: impactColors[rec.impact] }}
                >
                  {rec.impact} Impact
                </span>
              </div>
              <h3 className="font-bold text-sm text-primary-color">{rec.title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
              style={{ backgroundColor: status.bg, color: status.color }}
            >
              {status.label}
            </span>
            <button
              onClick={() => setExpanded(!expanded)}
              className="btn-ghost p-1.5 rounded-lg"
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </div>

        <p className="text-xs text-secondary-color mb-3">{rec.description}</p>

        {/* Monthly action */}
        {rec.monthlyAction > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-secondary-color">Suggested monthly action:</span>
            <span className="text-sm font-bold" style={{ color: rec.color }}>{formatCurrency(rec.monthlyAction)}</span>
          </div>
        )}

        {/* Action buttons */}
        {rec.status === 'Pending' && (
          <div className="flex gap-2 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAction(rec.id, 'Approved')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all"
              style={{ backgroundColor: '#10B981' }}
              id={`approve-${rec.id}`}
            >
              <CheckCircle size={12} /> Approve
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowModify(!showModify)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all"
              id={`modify-${rec.id}`}
            >
              <Edit3 size={12} /> Modify
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onAction(rec.id, 'Rejected')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
              id={`reject-${rec.id}`}
            >
              <XCircle size={12} /> Reject
            </motion.button>
          </div>
        )}

        {/* Modify textarea */}
        <AnimatePresence>
          {showModify && rec.status === 'Pending' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3"
            >
              <label className="label">Your modification note</label>
              <textarea
                rows={2}
                className="input-field resize-none text-xs"
                placeholder="Describe how you'd like to modify this recommendation..."
                value={note}
                onChange={e => setNote(e.target.value)}
              />
              <button
                onClick={() => { onAction(rec.id, 'Modified'); setShowModify(false); }}
                className="btn-primary text-xs px-3 py-1.5 mt-2"
              >
                Save Modification
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded detail */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-color space-y-2"
            >
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Reason', value: rec.reason },
                  { label: 'Impact Detail', value: rec.impactDetail },
                  { label: 'Category', value: rec.category },
                  { label: 'Timeline', value: rec.estimatedTimeline },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 rounded-xl text-xs" style={{ backgroundColor: 'var(--color-bg)' }}>
                    <p className="text-secondary-color mb-0.5">{label}</p>
                    <p className="font-medium text-primary-color">{value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-1 flex-wrap">
                {rec.tags.map(t => <span key={t} className="badge-neutral text-[10px]">{t}</span>)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ActionPlan() {
  const [recs, setRecs] = useState(demoRecommendations);

  const handleAction = (id, newStatus) => {
    setRecs(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const approved = recs.filter(r => r.status === 'Approved').length;
  const pending = recs.filter(r => r.status === 'Pending').length;

  return (
    <div className="page-container">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="section-title flex items-center gap-2"><ClipboardList size={22} /> Your Financial Action Plan</h1>
          <p className="section-subtitle">AI-generated recommendations. You review, approve, modify, or reject each one. Human-in-the-loop by design.</p>
        </div>
      </div>

      {/* Summary bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-4 mb-6"
      >
        <div className="grid grid-cols-4 gap-4 text-center">
          {[
            { label: 'Total Actions', value: recs.length, color: '#2563EB' },
            { label: 'Approved', value: approved, color: '#10B981' },
            { label: 'Pending Review', value: pending, color: '#F59E0B' },
            { label: 'Rejected/Modified', value: recs.length - approved - pending, color: '#64748B' },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <p className="text-2xl font-bold" style={{ color }}>{value}</p>
              <p className="text-xs text-secondary-color">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI principle banner */}
      <div className="card p-4 mb-6 flex items-start gap-3"
        style={{ backgroundColor: 'rgba(37, 99, 235, 0.04)', borderColor: 'rgba(37, 99, 235, 0.2)' }}>
        <span className="text-xl">🤝</span>
        <div>
          <p className="text-sm font-semibold text-primary-color mb-0.5">Human-in-the-Loop AI</p>
          <p className="text-xs text-secondary-color">Every recommendation is reviewed by you before any action is taken. AI suggests; you decide. Approving a recommendation here does not execute any real financial transaction.</p>
        </div>
      </div>

      {/* Recommendation cards */}
      <div className="space-y-4">
        {recs.map((rec, i) => (
          <RecommendationCard key={rec.id} rec={rec} index={i} onAction={handleAction} />
        ))}
      </div>

      <div className="disclaimer mt-6">
        ⚠️ All action plan recommendations are AI-generated from synthetic demo data. No real financial actions are performed.
        This demonstrates human-in-the-loop AI decision support. Not financial advice.
      </div>
    </div>
  );
}
