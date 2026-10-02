import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle, ShieldCheck, Brain, Lock, CheckCircle2,
  ChevronDown, ChevronUp, Sparkles, AlertTriangle, ArrowRight,
  Cpu, FileText, UserCheck, Layers, ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const responsibleAiPrinciples = [
  {
    icon: <UserCheck size={20} className="text-blue-600" />,
    title: 'Decision-Support, Not Automated Decision-Making',
    desc: 'AI Wealth Navigator is designed exclusively to inform and simulate. It will NEVER execute financial transactions or transfer funds automatically. The user is always the final decision-maker.',
  },
  {
    icon: <FileText size={20} className="text-purple-600" />,
    title: 'Transparent Assumptions & Explainability',
    desc: 'Every AI output displays the underlying mathematical formulas, baseline expenses, income levels, and assumptions used to generate the scenario. No black-box advice.',
  },
  {
    icon: <Lock size={20} className="text-emerald-600" />,
    title: 'Synthetic Data & Privacy by Default',
    desc: 'All financial balances, scenarios, and startup ventures in this MVP are 100% synthetic demo artifacts. No real banking credentials or PAN cards are accessed or stored.',
  },
  {
    icon: <AlertTriangle size={20} className="text-amber-600" />,
    title: 'No Guaranteed Returns or Predictions',
    desc: 'Financial markets and life expenses are unpredictable. All simulated trajectories represent hypothetical educational models, not promises or warranties of future performance.',
  },
];

const faqs = [
  {
    q: 'How does AI Wealth Navigator calculate "Available Capacity"?',
    a: 'Available Financial Capacity = Monthly Income (₹1,00,000) minus Essential Living Expenses (₹60,000) minus Discretionary Buffer (₹10,000) = ₹30,000. This ₹30,000 represents the unallocated surplus you can safely direct toward goal funding, what-if simulations, lifestyle expenses, or growth allocations.',
  },
  {
    q: 'Can I afford a ₹10,000 vacation expense?',
    a: 'AI Wealth Navigator will not tell you a simple "yes" or "no". Instead, it shows you the exact trade-off: A ₹10,000 expense consumes 33% of your ₹30,000 available capacity for the month, leaving ₹20,000. This could extend your vacation or emergency fund timeline by approximately 1–2 months unless funded from your discretionary buffer.',
  },
  {
    q: 'What happens when I Approve, Modify, or Reject a Recommendation in the Action Plan?',
    a: 'Approving an action marks it as an agreed personal commitment in your Action Plan roadmap. It modifies your internal simulation baselines. It NEVER triggers bank transfers or third-party trades. You retain full autonomy.',
  },
  {
    q: 'Are the startups in Startup Lab real investment opportunities?',
    a: 'No. Every startup listed in Startup Lab (e.g., EcoDrop, SkillBridge, MediRoute, TasteCraft) is a synthetic, fictional concept created specifically for hackathon demonstration. They illustrate how personal wealth navigation can simulate both investor allocations and founder bootstrapping runways.',
  },
  {
    q: 'How is this application architected for future Amazon Bedrock integration?',
    a: 'All AI logic is decoupled through `src/services/aiService.js`. The `sendMessage()`, `generateBusinessPlan()`, and `analyzeLifestyleImpact()` functions use an async promise contract that will directly pipe into an AWS API Gateway -> AWS Lambda -> Amazon Bedrock Anthropic Claude / Titan pipeline without changing any UI components.',
  },
];

export default function Help() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="page-container">
      {/* Hero Header */}
      <div className="mb-8">
        <h1 className="section-title flex items-center gap-2">
          <HelpCircle size={22} className="text-blue-600" /> Responsible AI & User Guide
        </h1>
        <p className="section-subtitle">
          Learn how AI Wealth Navigator provides explainable, human-in-the-loop financial decision support.
        </p>
      </div>

      {/* Core AI Principles Grid */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck size={18} className="text-emerald-500" />
          <h2 className="text-base font-bold text-primary-color">Responsible AI Framework</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {responsibleAiPrinciples.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="card p-5 flex items-start gap-4 border border-color hover:shadow-md transition-all"
            >
              <div className="p-2.5 rounded-xl bg-page border border-color flex-shrink-0">
                {principle.icon}
              </div>
              <div>
                <h3 className="font-bold text-sm text-primary-color mb-1.5">{principle.title}</h3>
                <p className="text-xs text-secondary-color leading-relaxed">{principle.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Multi-Step Conceptual AI Pipeline */}
      <div className="card p-6 mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-primary-color flex items-center gap-2">
              <Cpu size={18} className="text-blue-600" /> AI Recommendation Architecture
            </h2>
            <p className="text-xs text-secondary-color">
              The 8-step decision-support pipeline behind every insight and simulation:
            </p>
          </div>
          <span className="badge-info text-xs">Explainable AI</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mt-4 text-center">
          {[
            { step: '1', title: 'User Question', desc: 'Query / Decision', color: '#2563EB' },
            { step: '2', title: 'Financial Analysis', desc: 'Income & Costs', color: '#38BDF8' },
            { step: '3', title: 'Goal Analysis', desc: 'Timelines & Gaps', color: '#10B981' },
            { step: '4', title: 'Scenario Calc', desc: 'Capacity Impact', color: '#F59E0B' },
            { step: '5', title: 'Opportunity', desc: 'Trade-off Modeling', color: '#8B5CF6' },
            { step: '6', title: 'Recommendation', desc: 'Action Formulation', color: '#EC4899' },
            { step: '7', title: 'Explanation', desc: 'Why & Assumptions', color: '#14B8A6' },
            { step: '8', title: 'Human Review', desc: 'Approve / Reject', color: '#10B981' },
          ].map((s) => (
            <div
              key={s.step}
              className="p-3 rounded-xl border flex flex-col items-center justify-center relative group"
              style={{
                backgroundColor: `${s.color}08`,
                borderColor: `${s.color}25`,
              }}
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white mb-1.5"
                style={{ backgroundColor: s.color }}
              >
                {s.step}
              </span>
              <p className="text-[11px] font-bold text-primary-color leading-tight">{s.title}</p>
              <p className="text-[9px] text-secondary-color mt-0.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive FAQ Accordion */}
      <div className="card p-6 mb-8">
        <h2 className="text-base font-bold text-primary-color mb-4 flex items-center gap-2">
          <Brain size={18} className="text-purple-600" /> Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-color rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 bg-surface hover:bg-page transition-colors"
              >
                <span className="text-sm font-semibold text-primary-color">{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp size={16} className="text-secondary-color flex-shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-secondary-color flex-shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 pt-0 text-xs text-secondary-color leading-relaxed border-t border-color/40 bg-page"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory & Hackathon Disclaimer Banner */}
      <div
        className="card p-5 flex items-start gap-4 border border-amber-500/30"
        style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)' }}
      >
        <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-secondary-color leading-relaxed">
          <p className="font-bold text-primary-color mb-1 text-sm">Regulatory Notice & Educational Disclaimer</p>
          AI Wealth Navigator is a software prototype created for hackathon demonstration. It is not registered with SEBI, RBI, SEC, or FINRA as a financial advisory service. All simulations, returns, goal durations, and startup metrics are illustrative models driven by predefined synthetic algorithms. Users should always consult a certified professional financial planner before making real-world financial commitments.
        </div>
      </div>
    </div>
  );
}
