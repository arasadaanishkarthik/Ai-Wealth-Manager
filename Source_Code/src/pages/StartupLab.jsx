import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, TrendingUp, Hammer } from 'lucide-react';
import { demoStartups } from '../data/startups';
import { StartupCard } from '../components/cards/StartupCard';
import { useNavigate } from 'react-router-dom';

export default function StartupLab() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const sectors = ['All', ...new Set(demoStartups.map(s => s.sector))];

  const filtered = filter === 'All' ? demoStartups : demoStartups.filter(s => s.sector === filter);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-6">
        <h1 className="section-title flex items-center gap-2">
          <FlaskConical size={22} /> Startup Lab
        </h1>
        <p className="section-subtitle">
          Explore startup ideas — as a simulated investment opportunity or as a business you could build.
        </p>
      </div>

      {/* Intro banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid sm:grid-cols-2 gap-4 mb-8"
      >
        <div className="card p-5 flex items-start gap-4"
          style={{ backgroundColor: 'rgba(37, 99, 235, 0.04)', borderColor: 'rgba(37, 99, 235, 0.2)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(37, 99, 235, 0.15)' }}>
            <TrendingUp size={18} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-primary-color mb-1">Invest Mode</h3>
            <p className="text-xs text-secondary-color">Explore hypothetical allocation scenarios — how much capital and what risk you'd take on as a simulated investor.</p>
          </div>
        </div>
        <div className="card p-5 flex items-start gap-4"
          style={{ backgroundColor: 'rgba(16, 185, 129, 0.04)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)' }}>
            <Hammer size={18} className="text-emerald-600" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-primary-color mb-1">Build Mode</h3>
            <p className="text-xs text-secondary-color">Get an AI-generated startup plan including phases, budget breakdown, and key metrics to launch the idea yourself.</p>
          </div>
        </div>
      </motion.div>

      {/* Sector filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {sectors.map((sector) => (
          <button
            key={sector}
            onClick={() => setFilter(sector)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${filter === sector
              ? 'bg-blue-600 text-white shadow-sm'
              : 'btn-secondary'
            }`}
          >
            {sector}
          </button>
        ))}
      </div>

      {/* Startup cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {filtered.map((startup, i) => (
          <StartupCard key={startup.id} startup={startup} index={i} />
        ))}
      </div>

      <div className="disclaimer mt-6">
        ⚠️ All startups shown are entirely fictional and synthetic. They are not real investment opportunities.
        This feature is for educational and demonstration purposes only. Not financial or business advice.
      </div>
    </div>
  );
}
