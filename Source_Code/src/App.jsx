import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import FinancialProfile from './pages/FinancialProfile';
import Goals from './pages/Goals';
import GoalDetail from './pages/GoalDetail';
import Simulator from './pages/Simulator';
import RiskExplorer from './pages/RiskExplorer';
import InvestmentExplorer from './pages/InvestmentExplorer';
import StartupLab from './pages/StartupLab';
import StartupDetail from './pages/StartupDetail';
import LifestyleImpact from './pages/LifestyleImpact';
import AIAssistant from './pages/AIAssistant';
import ActionPlan from './pages/ActionPlan';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Help from './pages/Help';

function AppWithLayout({ isDark, onToggleTheme }) {
  return (
    <AppLayout isDark={isDark} onToggleTheme={onToggleTheme}>
      <Routes>
        {/* Core routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<FinancialProfile />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/goals/:id" element={<GoalDetail />} />
        <Route path="/simulator" element={<Simulator />} />

        {/* Risk explorer (standard and aliases) */}
        <Route path="/risk-explorer" element={<RiskExplorer />} />
        <Route path="/risk" element={<RiskExplorer />} />

        {/* Investment explorer */}
        <Route path="/investments" element={<InvestmentExplorer />} />

        {/* Startup lab (standard and aliases) */}
        <Route path="/startup-lab" element={<StartupLab />} />
        <Route path="/startup-lab/:id" element={<StartupDetail />} />
        <Route path="/startup" element={<StartupLab />} />
        <Route path="/startup/:id" element={<StartupDetail />} />

        {/* Lifestyle impact (standard and aliases) */}
        <Route path="/lifestyle-impact" element={<LifestyleImpact />} />
        <Route path="/lifestyle" element={<LifestyleImpact />} />

        {/* AI Assistant (standard and aliases) */}
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/ai" element={<AIAssistant />} />

        {/* Action plan, Notifications, Settings, Help */}
        <Route path="/action-plan" element={<ActionPlan />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Routes>
      {/* Public landing & auth routes */}
      <Route path="/" element={<Landing isDark={isDark} onToggleTheme={toggleTheme} />} />
      <Route path="/login" element={<Login isDark={isDark} onToggleTheme={toggleTheme} />} />
      <Route path="/onboarding" element={<Onboarding />} />

      {/* App routes wrapped in AppLayout */}
      <Route
        path="/*"
        element={<AppWithLayout isDark={isDark} onToggleTheme={toggleTheme} />}
      />
    </Routes>
  );
}
