/**
 * Currency and number formatting utilities
 * Uses Indian locale (en-IN) and INR currency by default
 */

/**
 * Formats a number as Indian Rupee currency
 * @param {number} value
 * @param {boolean} compact - Use compact notation (e.g., ₹3.4L)
 * @returns {string}
 */
export function formatCurrency(value, compact = false) {
  if (value === undefined || value === null) return '₹0';

  if (compact) {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formats a number with Indian commas (e.g., 1,00,000)
 * @param {number} value
 * @returns {string}
 */
export function formatNumber(value) {
  if (value === undefined || value === null) return '0';
  return new Intl.NumberFormat('en-IN').format(value);
}

/**
 * Formats a percentage value
 * @param {number} value - 0–100
 * @param {number} decimals
 * @returns {string}
 */
export function formatPercent(value, decimals = 0) {
  if (value === undefined || value === null) return '0%';
  return `${Number(value).toFixed(decimals)}%`;
}

/**
 * Formats a date string to readable format
 * @param {string} dateStr - ISO date string
 * @returns {string}
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateStr));
}

/**
 * Formats months into human-readable duration
 * @param {number} months
 * @returns {string}
 */
export function formatMonths(months) {
  if (months < 1) return 'Less than a month';
  if (months === 1) return '1 month';
  if (months < 12) return `${months} months`;
  const years = Math.floor(months / 12);
  const remaining = months % 12;
  if (remaining === 0) return `${years} year${years > 1 ? 's' : ''}`;
  return `${years}y ${remaining}m`;
}

/**
 * Clamps a value between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Returns a color based on a progress percentage
 */
export function progressColor(percent) {
  if (percent >= 80) return '#10B981';
  if (percent >= 50) return '#2563EB';
  if (percent >= 30) return '#F59E0B';
  return '#EF4444';
}

/**
 * Returns a risk level color
 */
export function riskColor(risk) {
  const map = {
    Low: '#10B981',
    Minimal: '#10B981',
    Medium: '#F59E0B',
    'Medium-High': '#F59E0B',
    High: '#EF4444',
    Moderate: '#2563EB',
  };
  return map[risk] || '#64748B';
}
