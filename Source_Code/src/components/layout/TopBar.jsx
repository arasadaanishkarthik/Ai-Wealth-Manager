import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, Search, Bell, Sun, Moon, User, X,
  CheckCircle, Info, Zap, Trophy, ArrowRight, Settings
} from 'lucide-react';
import { notifications } from '../../data/userData';

const pageNames = {
  '/dashboard': 'Dashboard',
  '/profile': 'Financial Profile',
  '/goals': 'Goal Planner',
  '/simulator': 'What-If Simulator',
  '/risk-explorer': 'Risk Explorer',
  '/risk': 'Risk Explorer',
  '/investments': 'Investment Explorer',
  '/startup-lab': 'Startup Lab',
  '/startup': 'Startup Lab',
  '/lifestyle-impact': 'Lifestyle Impact',
  '/lifestyle': 'Lifestyle Impact',
  '/ai-assistant': 'AI Assistant',
  '/ai': 'AI Assistant',
  '/action-plan': 'Action Plan',
  '/notifications': 'Notifications Hub',
  '/settings': 'Settings',
  '/help': 'Help & Responsible AI',
};

const notifIcons = {
  success: <CheckCircle size={14} className="text-emerald-500" />,
  info: <Info size={14} className="text-blue-500" />,
  ai: <Zap size={14} className="text-purple-500" />,
  milestone: <Trophy size={14} className="text-amber-500" />,
};

export function TopBar({ onMenuClick, isDark, onToggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifList, setNotifList] = useState(notifications);
  const [searchFocused, setSearchFocused] = useState(false);
  const notifRef = useRef(null);

  const unreadCount = notifList.filter(n => !n.read).length;
  
  // Extract matching page name for dynamic routes like /goals/goal_001
  let pageName = pageNames[location.pathname];
  if (!pageName) {
    if (location.pathname.startsWith('/goals/')) pageName = 'Goal Details';
    else if (location.pathname.startsWith('/startup/')) pageName = 'Startup Details';
    else if (location.pathname.startsWith('/startup-lab/')) pageName = 'Startup Details';
    else pageName = 'Financial Decision Cockpit';
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifList(notifList.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="h-16 bg-surface border-b border-color flex items-center gap-4 px-4 lg:px-6 flex-shrink-0">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        className="btn-ghost p-2 rounded-lg lg:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Page name (mobile) */}
      <span className="font-semibold text-sm text-primary-color lg:hidden">{pageName}</span>

      {/* Desktop Search / Quick Jump */}
      <div className={`hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl border border-color bg-page text-xs transition-all duration-200 ${searchFocused ? 'ring-2 ring-blue-500 border-blue-500' : ''}`}>
        <Search size={14} className="text-secondary-color" />
        <input
          type="search"
          placeholder="Search simulator, goals, AI..."
          aria-label="Search features"
          className="bg-transparent outline-none text-primary-color placeholder:text-secondary-color w-52 text-xs"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Theme toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="btn-ghost p-2 rounded-xl text-secondary-color hover:text-primary-color"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isDark ? 'moon' : 'sun'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        {/* Notifications Dropdown */}
        <div ref={notifRef} className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label={`Notifications — ${unreadCount} unread`}
            className="btn-ghost p-2 rounded-xl relative text-secondary-color hover:text-primary-color"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-84 sm:w-96 card shadow-2xl z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-color flex items-center justify-between bg-surface">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-primary-color">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="badge-info text-[10px]">{unreadCount} unread</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-xs text-blue-600 hover:underline">
                        Mark all read
                      </button>
                    )}
                    <button onClick={() => setShowNotifications(false)} className="btn-ghost p-1 rounded">
                      <X size={14} />
                    </button>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto no-scrollbar">
                  {notifList.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3.5 border-b border-color last:border-0 transition-colors ${!notif.read ? 'bg-blue-50/60 dark:bg-blue-950/20' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex-shrink-0">{notifIcons[notif.type] || <Info size={14} className="text-blue-500" />}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-primary-color">{notif.title}</p>
                          <p className="text-xs text-secondary-color mt-0.5 leading-snug">{notif.message}</p>
                          <p className="text-[10px] text-secondary-color mt-1">{notif.time}</p>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t border-color bg-page text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/notifications');
                    }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1.5 w-full py-1"
                  >
                    View All in Notifications Hub <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User avatar / profile button */}
        <Link
          to="/profile"
          className="flex items-center gap-2 pl-2 border-l border-color ml-1 hover:opacity-90 transition-opacity"
          title="View Financial Profile"
        >
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shadow-sm">
            <span className="text-white text-xs font-bold">AS</span>
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-primary-color leading-tight">Anish Sharma</div>
            <div className="text-[10px] text-secondary-color leading-none">Demo Cockpit</div>
          </div>
        </Link>
      </div>
    </header>
  );
}
