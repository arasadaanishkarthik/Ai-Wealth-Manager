import React from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';
import { formatCurrency } from '../../utils/formatters';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function MetricCard({ label, value, icon: Icon, color = '#2563EB', trend, trendLabel, description, index = 0, isCurrency = true }) {
  const { value: animatedValue, ref } = useCountUp(value, 1000, index * 100);

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend === 'up') return <TrendingUp size={12} className="text-emerald-500" />;
    if (trend === 'down') return <TrendingDown size={12} className="text-red-500" />;
    return <Minus size={12} className="text-secondary-color" />;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="card p-5 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${color}15` }}
        >
          {Icon && <Icon size={18} style={{ color }} />}
        </div>
        {trend && (
          <div className="flex items-center gap-1">
            {getTrendIcon()}
            <span className={`text-xs font-medium ${trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-red-500' : 'text-secondary-color'}`}>
              {trendLabel}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary-color">{label}</p>
        <p className="text-2xl font-bold text-primary-color tracking-tight">
          {isCurrency ? formatCurrency(animatedValue) : animatedValue}
        </p>
        {description && <p className="text-xs text-secondary-color">{description}</p>}
      </div>
    </motion.div>
  );
}
