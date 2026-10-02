import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

export function WelcomeBanner({ name, subtitle }) {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <h1 className="text-2xl font-bold text-primary-color">
        {greeting}, {name} 👋
      </h1>
      <p className="text-secondary-color text-sm mt-1">{subtitle}</p>

      {/* AI insight banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:shadow-sm transition-all duration-200"
        style={{ backgroundColor: 'rgba(37, 99, 235, 0.04)', borderColor: 'rgba(37, 99, 235, 0.2)' }}
        onClick={() => navigate('/ai')}
      >
        <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
          <Zap size={13} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-primary-color">AI Insight available</p>
          <p className="text-xs text-secondary-color truncate">Allocating ₹5,000 more/month could shorten your goal timeline by ~2 months</p>
        </div>
        <ArrowRight size={14} className="text-secondary-color flex-shrink-0" />
      </motion.div>
    </motion.div>
  );
}
