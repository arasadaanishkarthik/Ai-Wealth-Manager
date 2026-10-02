import React from 'react';

export function ProgressBar({ value, max = 100, color, className = '', height = 'h-1.5', showLabel = false }) {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100);

  const getColor = () => {
    if (color) return color;
    if (percent >= 80) return '#10B981';
    if (percent >= 50) return '#2563EB';
    if (percent >= 30) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-secondary-color">{Math.round(percent)}%</span>
        </div>
      )}
      <div className={`w-full ${height} rounded-full overflow-hidden`} style={{ backgroundColor: 'var(--color-border)' }}>
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percent}%`, backgroundColor: getColor() }}
        />
      </div>
    </div>
  );
}
