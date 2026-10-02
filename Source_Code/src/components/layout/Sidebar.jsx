import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Target, Sliders, Shield, FlaskConical,
  Sparkles, Brain, ClipboardList, TrendingUp, User,
  Settings, X, ChevronLeft, ChevronRight, LogOut,
  BarChart3, Bell, HelpCircle
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/profile', label: 'Financial Profile', icon: User },
  { path: '/goals', label: 'Goal Planner', icon: Target },
  { path: '/simulator', label: 'What-If Simulator', icon: Sliders },
  { path: '/lifestyle-impact', label: 'Lifestyle Impact', icon: Sparkles },
  { path: '/risk-explorer', label: 'Risk Explorer', icon: Shield },
  { path: '/investments', label: 'Investment Explorer', icon: BarChart3 },
  { path: '/startup-lab', label: 'Startup Lab', icon: FlaskConical },
  { path: '/ai-assistant', label: 'AI Assistant', icon: Brain },
  { path: '/action-plan', label: 'Action Plan', icon: ClipboardList },
  { path: '/notifications', label: 'Notifications', icon: Bell },
];

const secondaryNavItems = [
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/help', label: 'Help & Responsible AI', icon: HelpCircle },
];

export function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: 0,
          width: isCollapsed ? 72 : 260,
        }}
        className={`
          fixed top-0 left-0 h-full z-50 bg-surface border-r border-color
          flex flex-col overflow-hidden
          lg:relative lg:translate-x-0 lg:flex
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transition-transform lg:transition-none
        `}
        style={{ minWidth: isCollapsed ? 72 : 260 }}
      >
        {/* Logo Header */}
        <div className={`flex items-center gap-3 p-4 border-b border-color flex-shrink-0 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 shadow-md">
            <TrendingUp size={16} className="text-white" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <div className="font-bold text-sm text-primary-color whitespace-nowrap">AI Wealth</div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-blue-600 whitespace-nowrap">Navigator</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile close */}
          <button onClick={onClose} className="ml-auto btn-ghost p-1.5 rounded-lg lg:hidden" aria-label="Close menu">
            <X size={16} />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1 no-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center px-2' : ''}`
              }
              title={isCollapsed ? item.label : ''}
            >
              <item.icon size={18} className="flex-shrink-0" />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden whitespace-nowrap text-xs font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        {/* Secondary Navigation & Footer */}
        <div className="p-3 border-t border-color space-y-1 flex-shrink-0 bg-surface/50">
          {secondaryNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center px-2' : ''}`
              }
              title={isCollapsed ? item.label : ''}
            >
              <item.icon size={18} className="flex-shrink-0" />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden whitespace-nowrap text-xs font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            className={`sidebar-link w-full hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 ${isCollapsed ? 'justify-center px-2' : ''}`}
            title={isCollapsed ? 'Sign Out' : ''}
          >
            <LogOut size={18} className="flex-shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden whitespace-nowrap text-xs font-medium"
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Collapse toggle — desktop only */}
          <button
            onClick={onToggleCollapse}
            className={`hidden lg:flex sidebar-link w-full ${isCollapsed ? 'justify-center px-2' : ''}`}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden whitespace-nowrap text-xs font-medium"
                >
                  Collapse Sidebar
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>
    </>
  );
}
