import React from 'react';
import { motion } from 'framer-motion';

export function Card({ children, className = '', hover = false, onClick, padding = 'p-6' }) {
  const base = `card ${padding} ${className}`;

  if (hover || onClick) {
    return (
      <motion.div
        className={`card-hover ${padding} ${className}`}
        whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={base}>{children}</div>;
}

export function GradientCard({ children, gradient = 'primary', className = '', padding = 'p-6' }) {
  const gradients = {
    primary: 'gradient-primary',
    emerald: 'gradient-emerald',
    amber: 'gradient-amber',
    purple: 'gradient-purple',
  };

  return (
    <div className={`rounded-2xl ${gradients[gradient]} ${padding} ${className}`}>
      {children}
    </div>
  );
}
