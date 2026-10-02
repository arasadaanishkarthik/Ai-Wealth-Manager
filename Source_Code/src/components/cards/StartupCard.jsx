import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';
import { riskColor } from '../../utils/formatters';

export function StartupCard({ startup, index = 0 }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="card p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
      onClick={() => navigate(`/startup/${startup.id}`)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ backgroundColor: `${startup.color}15` }}
          >
            {startup.emoji}
          </div>
          <div>
            <h3 className="font-bold text-sm text-primary-color">{startup.name}</h3>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: `${startup.color}15`, color: startup.color }}
            >
              {startup.sector}
            </span>
          </div>
        </div>
        <span
          className="text-[10px] px-2 py-1 rounded-full font-semibold"
          style={{ backgroundColor: `${riskColor(startup.riskLevel)}15`, color: riskColor(startup.riskLevel) }}
        >
          {startup.riskLevel} Risk
        </span>
      </div>

      <p className="text-xs text-secondary-color mb-4 line-clamp-2">{startup.tagline}</p>

      {/* Metrics */}
      <div className="flex justify-between text-xs mb-4 p-3 rounded-xl" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div>
          <p className="text-secondary-color">Initial Capital</p>
          <p className="font-bold text-primary-color">{formatCurrency(startup.initialCapital, true)}</p>
        </div>
        <div className="text-right">
          <p className="text-secondary-color">Stage</p>
          <p className="font-bold text-primary-color">{startup.stage}</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-center gap-1.5 text-[10px] text-secondary-color mb-4">
        <AlertTriangle size={10} className="text-amber-500 flex-shrink-0" />
        <span>Simulated opportunity — not real investment advice</span>
      </div>

      <button className="flex items-center gap-1 text-xs font-semibold hover:gap-2 transition-all duration-200" style={{ color: startup.color }}>
        Explore <ArrowRight size={12} />
      </button>
    </motion.div>
  );
}
