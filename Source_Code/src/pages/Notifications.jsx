import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Bell, CheckCircle2, Info, Zap, Trophy,
  Clock, Check, Trash2, Filter, ArrowRight,
  ShieldAlert, Sparkles, Target, Sliders
} from 'lucide-react';

const initialNotifications = [
  {
    id: 'notif_1',
    category: 'goals',
    type: 'success',
    title: 'Vacation Fund Milestone Reached',
    message: 'Your Vacation Fund is now at 56% (₹45,000 / ₹80,000). On track for December 2024 target!',
    time: '2 hours ago',
    timestamp: 'Today, 11:15 AM',
    read: false,
    priority: 'Medium',
    actionLabel: 'View Goal Progress',
    actionRoute: '/goals/goal_002',
    icon: '✈️',
  },
  {
    id: 'notif_2',
    category: 'scenario',
    type: 'info',
    title: 'Available Financial Capacity Updated',
    message: 'Your monthly available capacity is calculated at ₹30,000 after ₹60,000 essential expenses.',
    time: '5 hours ago',
    timestamp: 'Today, 08:30 AM',
    read: false,
    priority: 'Normal',
    actionLabel: 'Run What-If Simulation',
    actionRoute: '/simulator',
    icon: '⚡',
  },
  {
    id: 'notif_3',
    category: 'ai',
    type: 'ai',
    title: 'AI Scenario Insight: Savings Boost Opportunity',
    message: 'Saving ₹5,000 more per month could accelerate your emergency fund completion by ~2.5 months.',
    time: '1 day ago',
    timestamp: 'Yesterday, 04:45 PM',
    read: false,
    priority: 'High',
    actionLabel: 'Review AI Insight',
    actionRoute: '/ai',
    icon: '🤖',
  },
  {
    id: 'notif_4',
    category: 'action_plan',
    type: 'action',
    title: 'Action Plan Item: Emergency Reserve Review',
    message: 'AI recommended increasing monthly emergency allocation to ₹10,000. Review human oversight status.',
    time: '1 day ago',
    timestamp: 'Yesterday, 02:10 PM',
    read: true,
    priority: 'High',
    actionLabel: 'Open Action Plan',
    actionRoute: '/action-plan',
    icon: '📋',
  },
  {
    id: 'notif_5',
    category: 'goals',
    type: 'milestone',
    title: 'Emergency Fund Safety Buffer at 60%',
    message: 'Your emergency fund has reached ₹1,80,000 — 3 full months of living expenses are now covered!',
    time: '2 days ago',
    timestamp: 'Sep 20, 10:00 AM',
    read: true,
    priority: 'High',
    actionLabel: 'View Emergency Goal',
    actionRoute: '/goals/goal_001',
    icon: '🛡️',
  },
  {
    id: 'notif_6',
    category: 'scenario',
    type: 'info',
    title: 'Lifestyle Spending Sensitivity Alert',
    message: 'Simulating a ₹10,000 vacation expense uses 33% of your monthly available capacity.',
    time: '3 days ago',
    timestamp: 'Sep 19, 06:20 PM',
    read: true,
    priority: 'Normal',
    actionLabel: 'Explore Lifestyle Impact',
    actionRoute: '/lifestyle',
    icon: '🎭',
  },
];

const filterCategories = [
  { id: 'all', label: 'All Notifications' },
  { id: 'goals', label: 'Goal Milestones' },
  { id: 'scenario', label: 'Scenario Insights' },
  { id: 'ai', label: 'AI Recommendations' },
  { id: 'action_plan', label: 'Action Plan Updates' },
];

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState('all');
  const [onlyUnread, setOnlyUnread] = useState(false);

  const filteredNotifications = notifications.filter((item) => {
    if (onlyUnread && item.read) return false;
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="section-title flex items-center gap-2">
            <Bell size={22} className="text-blue-600" /> Notifications & Insights Hub
          </h1>
          <p className="section-subtitle">
            Stay informed on goal milestones, simulation triggers, AI scenario insights, and action approvals.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"
            >
              <Check size={14} /> Mark All Read ({unreadCount})
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="btn-ghost text-xs px-2.5 py-2 text-secondary-color hover:text-red-500 flex items-center gap-1"
            >
              <Trash2 size={13} /> Clear All
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs & Unread Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-2 border-b border-color">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeFilter === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'btn-secondary text-secondary-color'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs text-secondary-color cursor-pointer select-none">
          <input
            type="checkbox"
            checked={onlyUnread}
            onChange={(e) => setOnlyUnread(e.target.checked)}
            className="rounded border-color text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
          />
          <span>Show Unread Only ({unreadCount})</span>
        </label>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif, index) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.04 }}
                className={`card p-4 transition-all duration-200 ${
                  !notif.read
                    ? 'border-l-4 border-l-blue-600 bg-blue-50/50 dark:bg-blue-950/20'
                    : 'opacity-90 hover:opacity-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Emoji / Icon Container */}
                  <div className="w-10 h-10 rounded-xl bg-surface border border-color flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
                    {notif.icon}
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-sm text-primary-color">{notif.title}</h3>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                        )}
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            notif.priority === 'High'
                              ? 'bg-red-500/10 text-red-600 dark:text-red-400'
                              : 'bg-slate-500/10 text-secondary-color'
                          }`}
                        >
                          {notif.priority} Priority
                        </span>
                      </div>

                      <span className="text-[11px] text-secondary-color whitespace-nowrap flex items-center gap-1">
                        <Clock size={11} /> {notif.time}
                      </span>
                    </div>

                    <p className="text-xs text-secondary-color leading-relaxed mb-3">
                      {notif.message}
                    </p>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-color/60 text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(notif.actionRoute)}
                          className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1"
                        >
                          {notif.actionLabel} <ArrowRight size={12} />
                        </button>
                        <button
                          onClick={() => toggleRead(notif.id)}
                          className="btn-ghost text-xs px-2.5 py-1.5 text-secondary-color hover:text-primary-color"
                        >
                          {notif.read ? 'Mark as Unread' : 'Mark as Read'}
                        </button>
                      </div>

                      <button
                        onClick={() => deleteNotification(notif.id)}
                        className="btn-ghost p-1.5 rounded-lg text-secondary-color hover:text-red-500"
                        title="Dismiss notification"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card p-12 text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 mb-3">
                <Bell size={24} />
              </div>
              <h3 className="font-bold text-base text-primary-color mb-1">No notifications found</h3>
              <p className="text-xs text-secondary-color max-w-sm mx-auto mb-4">
                {onlyUnread
                  ? 'You have read all notifications. Uncheck "Show Unread Only" to view past updates.'
                  : 'You have no notifications in this category. New simulation triggers and goal updates will appear here.'}
              </p>
              {onlyUnread && (
                <button
                  onClick={() => setOnlyUnread(false)}
                  className="btn-secondary text-xs px-4 py-2"
                >
                  Show All Notifications
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="disclaimer mt-8">
        ⚠️ Notifications are simulated in-app alerts based on your synthetic financial profile and active what-if simulations.
      </div>
    </div>
  );
}
