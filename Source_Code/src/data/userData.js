// Demo user profile — replace with API call to /api/user/profile
export const demoUser = {
  id: 'usr_anish_001',
  name: 'Anish Sharma',
  email: 'anish.sharma@example.com',
  age: 28,
  occupation: 'Software Engineer',
  avatar: null,
  riskPreference: 'Moderate',
  currency: 'INR',
  locale: 'en-IN',
  joinedAt: '2024-01-15',

  // Monthly financials
  monthlyIncome: 100000,
  essentialExpenses: {
    emi: 18000,
    rent: 15000,
    food: 10000,
    utilities: 5000,
    transportation: 4000,
    otherEssentials: 8000,
    total: 60000,
  },
  discretionarySpending: 10000,
  availableCapacity: 30000,

  // Savings & reserves
  currentSavings: 340000,
  emergencyFund: 180000,
  emergencyFundTarget: 300000,

  // Financial health metrics (demo)
  financialHealth: {
    score: 78,
    label: 'Strong Foundation',
    savingsRate: 30,
    emergencyCoverageMonths: 3.0,
    goalProgress: 64,
    debtLoad: 'Moderate',
  },

  // Monthly cash flow history (last 6 months)
  cashFlowHistory: [
    { month: 'Apr', income: 100000, expenses: 68000, savings: 32000 },
    { month: 'May', income: 100000, expenses: 72000, savings: 28000 },
    { month: 'Jun', income: 100000, expenses: 65000, savings: 35000 },
    { month: 'Jul', income: 100000, expenses: 70000, savings: 30000 },
    { month: 'Aug', income: 100000, expenses: 63000, savings: 37000 },
    { month: 'Sep', income: 100000, expenses: 70000, savings: 30000 },
  ],

  // Savings trend (last 6 months cumulative)
  savingsTrend: [
    { month: 'Apr', savings: 250000 },
    { month: 'May', savings: 278000 },
    { month: 'Jun', savings: 313000 },
    { month: 'Jul', savings: 325000 },
    { month: 'Aug', savings: 340000 },
    { month: 'Sep', savings: 340000 },
  ],
};

export const expenseBreakdown = [
  { name: 'EMI', value: 18000, color: '#2563EB' },
  { name: 'Rent', value: 15000, color: '#8B5CF6' },
  { name: 'Food', value: 10000, color: '#10B981' },
  { name: 'Utilities', value: 5000, color: '#38BDF8' },
  { name: 'Transport', value: 4000, color: '#F59E0B' },
  { name: 'Other', value: 8000, color: '#64748B' },
];

export const notifications = [
  {
    id: 'n1',
    type: 'success',
    title: 'Vacation goal at 56%',
    message: 'Your vacation fund is progressing well. Keep it up!',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 'n2',
    type: 'info',
    title: 'Monthly savings capacity changed',
    message: 'Your available capacity this month is ₹30,000.',
    time: '5 hours ago',
    read: false,
  },
  {
    id: 'n3',
    type: 'ai',
    title: 'New AI scenario insight',
    message: 'A new what-if scenario is ready for your review.',
    time: '1 day ago',
    read: true,
  },
  {
    id: 'n4',
    type: 'milestone',
    title: 'Emergency fund milestone',
    message: 'Your emergency fund has reached ₹1,80,000 — 60% of your target!',
    time: '2 days ago',
    read: true,
  },
];
