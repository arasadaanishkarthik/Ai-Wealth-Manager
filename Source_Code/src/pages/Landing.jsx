import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  TrendingUp, Target, Sliders, Shield, FlaskConical, Sparkles,
  Brain, ArrowRight, CheckCircle, ChevronDown, BarChart3,
  Zap, Star, Sun, Moon
} from 'lucide-react';

const features = [
  { icon: TrendingUp, title: 'Financial Health', desc: 'Understand your complete financial position in one glance.', color: '#2563EB' },
  { icon: Target, title: 'Goal Planning', desc: 'Set, track, and simulate multiple financial goals simultaneously.', color: '#10B981' },
  { icon: Sliders, title: 'What-If Simulator', desc: 'Explore scenarios and see how decisions impact your timeline.', color: '#8B5CF6' },
  { icon: Shield, title: 'Risk Explorer', desc: 'Navigate conservative to growth-oriented scenario options.', color: '#38BDF8' },
  { icon: FlaskConical, title: 'Startup Lab', desc: 'Explore synthetic startup opportunities as investor or builder.', color: '#F59E0B' },
  { icon: Sparkles, title: 'Lifestyle Impact', desc: 'See how spending decisions affect your financial goals.', color: '#EF4444' },
  { icon: Brain, title: 'AI Assistant', desc: 'Ask any financial scenario question and get instant insights.', color: '#06B6D4' },
];

const steps = [
  { step: '01', title: 'Understand', desc: 'Get a complete view of your financial position, income, expenses, and capacity.', icon: '🔍' },
  { step: '02', title: 'Simulate', desc: 'Run what-if scenarios to see how changes affect your goals and timeline.', icon: '⚡' },
  { step: '03', title: 'Explore', desc: 'Discover investment scenarios, risk profiles, and startup opportunities.', icon: '🧭' },
  { step: '04', title: 'Decide', desc: 'Review AI insights and make informed decisions with full context.', icon: '✅' },
];

// Mini dashboard preview component
function DashboardPreview() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20" style={{ background: '#111827' }}>
        {/* Top bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <div className="flex-1 mx-4 h-5 rounded bg-white/10 text-[10px] text-white/40 flex items-center px-2">
            AI Wealth Navigator — Dashboard
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Greeting */}
          <div className="text-white/80 text-xs font-medium">Good evening, Anish 👋</div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Monthly Income', value: '₹1,00,000', color: '#2563EB' },
              { label: 'Available', value: '₹30,000', color: '#10B981' },
              { label: 'Savings', value: '₹3,40,000', color: '#8B5CF6' },
              { label: 'Health Score', value: '78/100', color: '#F59E0B' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl p-3" style={{ background: '#1f2937' }}>
                <p className="text-[9px] text-white/50 mb-1">{item.label}</p>
                <p className="text-sm font-bold" style={{ color: item.color }}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Chart mockup */}
          <div className="rounded-xl p-3" style={{ background: '#1f2937' }}>
            <p className="text-[9px] text-white/50 mb-2">Savings Trend</p>
            <div className="flex items-end gap-1 h-14">
              {[40, 55, 48, 65, 72, 80, 85].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{ backgroundColor: '#2563EB', opacity: 0.3 + i * 0.1 }}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                />
              ))}
            </div>
          </div>

          {/* AI insight */}
          <div className="rounded-xl p-3 flex items-center gap-2" style={{ background: 'rgba(37,99,235,0.2)' }}>
            <Zap size={12} className="text-blue-400 flex-shrink-0" />
            <p className="text-[9px] text-blue-300">AI: Save ₹5K more/month → reach goals 2 months sooner</p>
          </div>
        </div>
      </div>

      {/* Floating cards */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-8 top-12 rounded-xl shadow-2xl p-3 text-xs"
        style={{ background: '#10B981', color: 'white', minWidth: 120 }}
      >
        <p className="font-semibold">Emergency Fund</p>
        <p className="text-green-100">60% complete ✓</p>
      </motion.div>

      <motion.div
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-6 bottom-16 rounded-xl shadow-2xl p-3 text-xs"
        style={{ background: '#8B5CF6', color: 'white', minWidth: 130 }}
      >
        <p className="font-semibold">AI Scenario Ready</p>
        <p className="text-purple-200">View what-if analysis</p>
      </motion.div>
    </div>
  );
}

export default function Landing({ isDark, onToggleTheme }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-page">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <TrendingUp size={16} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-sm text-primary-color leading-none">AI Wealth</div>
              <div className="text-[10px] text-secondary-color">Navigator</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="btn-ghost p-2 rounded-xl"
            >
              {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
            </button>
            <button onClick={() => navigate('/login')} className="btn-secondary text-sm px-4 py-2">
              Sign In
            </button>
            <button onClick={() => navigate('/onboarding')} className="btn-primary text-sm px-4 py-2">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
                style={{ backgroundColor: 'rgba(37, 99, 235, 0.06)', borderColor: 'rgba(37, 99, 235, 0.2)', color: '#2563EB' }}>
                <Star size={11} />
                Hackathon Demo — 100% Synthetic Data
              </div>

              <h1 className="text-5xl sm:text-6xl font-extrabold text-primary-color leading-tight mb-4">
                AI Wealth<br />
                <span style={{ background: 'linear-gradient(135deg, #2563EB, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Navigator
                </span>
              </h1>

              <p className="text-xl font-semibold text-secondary-color mb-3">
                Plan Smarter. Spend Better. Build Bigger.
              </p>

              <p className="text-base text-secondary-color max-w-md mb-10 leading-relaxed">
                Understand your financial position, explore what-if scenarios, discover opportunities,
                and make informed decisions with AI-powered financial insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/login')}
                  className="btn-primary px-8 py-3.5 text-base"
                  id="hero-explore-cta"
                >
                  Explore Your Wealth <ArrowRight size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                  className="btn-secondary px-8 py-3.5 text-base"
                  id="hero-how-cta"
                >
                  See How It Works
                </motion.button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 text-xs text-secondary-color">
                {['No real transactions', 'Synthetic data only', 'Frontend prototype'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle size={12} className="text-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <DashboardPreview />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-primary-color mb-3">How It Works</h2>
            <p className="text-secondary-color max-w-lg mx-auto">
              A structured four-step journey from financial clarity to confident decision-making.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 text-center hover:shadow-lg transition-all duration-200"
              >
                <div className="text-3xl mb-4">{step.icon}</div>
                <div className="text-xs font-bold text-secondary-color mb-2 uppercase tracking-widest">{step.step}</div>
                <h3 className="text-lg font-bold text-primary-color mb-2">{step.title}</h3>
                <p className="text-sm text-secondary-color">{step.desc}</p>

                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-full z-10">
                    <ArrowRight size={16} className="text-secondary-color" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-primary-color mb-3">Core Features</h2>
            <p className="text-secondary-color max-w-lg mx-auto">
              Seven powerful modules working together to give you complete financial clarity.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="card-hover p-5"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feat.color}15` }}
                >
                  <feat.icon size={18} style={{ color: feat.color }} />
                </div>
                <h3 className="font-semibold text-sm text-primary-color mb-1">{feat.title}</h3>
                <p className="text-xs text-secondary-color">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsible AI */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-10 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.04), rgba(139,92,246,0.04))' }}
          >
            <div className="text-4xl mb-4">🤝</div>
            <h2 className="text-2xl font-bold text-primary-color mb-3">Responsible AI</h2>
            <p className="text-secondary-color max-w-2xl mx-auto mb-6 leading-relaxed">
              AI provides decision-support insights. Users review all assumptions and recommendations before taking any action.
              Every projection is clearly labeled as illustrative, hypothetical, or scenario-based — never as guaranteed outcomes.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              {[
                { icon: '🔍', title: 'Transparent Assumptions', desc: 'Every AI suggestion shows its reasoning and assumptions.' },
                { icon: '👤', title: 'Human-in-the-Loop', desc: 'You approve, modify, or reject every recommended action.' },
                { icon: '⚠️', title: 'Clear Disclaimers', desc: 'All data is synthetic. No real financial advice is provided.' },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bg)' }}>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-semibold text-sm text-primary-color mb-1">{item.title}</h3>
                  <p className="text-xs text-secondary-color">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-primary-color mb-4">Ready to navigate your wealth?</h2>
            <p className="text-secondary-color mb-8">Experience the complete demo with Anish Sharma's synthetic financial profile.</p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/login')}
              className="btn-primary px-10 py-4 text-base"
              id="bottom-explore-cta"
            >
              Start the Demo <ArrowRight size={18} />
            </motion.button>
            <p className="text-xs text-secondary-color mt-4">No registration required. 100% synthetic data.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-color py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary-color">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded gradient-primary flex items-center justify-center">
              <TrendingUp size={10} className="text-white" />
            </div>
            <span>AI Wealth Navigator — Hackathon Prototype</span>
          </div>
          <span>All data is synthetic. Not financial advice. © 2024</span>
        </div>
      </footer>
    </div>
  );
}
