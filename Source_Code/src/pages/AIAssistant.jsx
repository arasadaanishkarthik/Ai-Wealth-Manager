import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Send, User, Zap, ChevronRight, Info,
  Sparkles, CheckCircle2, ArrowRight, Sliders, Shield,
  Layers, CheckSquare
} from 'lucide-react';
import { sendMessage } from '../services/aiService';
import { Link, useNavigate } from 'react-router-dom';

const suggestedPrompts = [
  "Can I afford a ₹10,000 vacation?",
  "What happens if I save ₹5,000 more every month?",
  "How can I reach my education goal faster?",
  "What happens if I reduce my monthly spending?",
  "Should I explore a higher-growth scenario?",
  "What happens if I start a business with ₹5 Lakhs?",
];

function TypingIndicator() {
  return (
    <div className="flex gap-1.5 items-center px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-blue-500"
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
      <span className="text-xs text-secondary-color ml-2">Analyzing financial model & scenarios...</span>
    </div>
  );
}

function WorkflowStepPills() {
  const steps = [
    'Financial Analysis',
    'Goal Timeline Impact',
    'Scenario Calculation',
    'Opportunity Trade-off',
    'Actionable Recommendation',
  ];

  return (
    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1 text-[10px] text-secondary-color">
      {steps.map((s, idx) => (
        <React.Fragment key={s}>
          <span className="px-2 py-0.5 rounded-full bg-page border border-color font-medium text-primary-color whitespace-nowrap">
            ✓ {s}
          </span>
          {idx < steps.length - 1 && <span className="text-slate-400">→</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

function ChatBubble({ message, isTyping = false }) {
  const isAI = message.role === 'assistant';
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isAI ? '' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm ${
          isAI ? 'gradient-primary text-white' : 'bg-slate-200 dark:bg-slate-700 text-secondary-color'
        }`}
      >
        {isAI ? <Brain size={14} /> : <User size={14} />}
      </div>

      {/* Content */}
      <div className={`flex-1 max-w-[85%] ${isAI ? '' : 'flex flex-col items-end'}`}>
        {isTyping ? (
          <div className="card rounded-2xl rounded-tl-none inline-block">
            <TypingIndicator />
          </div>
        ) : (
          <>
            <div
              className={`rounded-2xl p-4 text-sm leading-relaxed ${
                isAI ? 'card rounded-tl-none border border-color' : 'text-white rounded-tr-none shadow-md'
              }`}
              style={!isAI ? { background: 'linear-gradient(135deg, #2563EB, #8B5CF6)' } : {}}
            >
              {message.content}
            </div>

            {/* Multi-Step Workflow Trace */}
            {isAI && message.reasoning && (
              <div className="mt-2.5 card p-3.5 text-xs space-y-2.5" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="flex items-center justify-between border-b border-color pb-2">
                  <div className="flex items-center gap-1.5 text-blue-600 font-bold">
                    <Zap size={12} />
                    <span>Explainable Reasoning Workflow</span>
                  </div>
                  <span className="text-[10px] text-secondary-color">8-Step Engine</span>
                </div>

                <WorkflowStepPills />

                <div className="grid grid-cols-2 gap-2 pt-1">
                  {message.reasoning.map(({ label, value }) => (
                    <div key={label} className="p-2 rounded-lg bg-surface border border-color">
                      <p className="text-[10px] text-secondary-color">{label}</p>
                      <p className="font-bold text-xs text-primary-color">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Quick actions for user */}
                <div className="flex gap-2 pt-2 border-t border-color flex-wrap">
                  <button
                    onClick={() => navigate('/simulator')}
                    className="btn-secondary text-[11px] px-2.5 py-1 flex items-center gap-1"
                  >
                    <Sliders size={11} /> Test in Simulator
                  </button>
                  <button
                    onClick={() => navigate('/action-plan')}
                    className="btn-secondary text-[11px] px-2.5 py-1 flex items-center gap-1"
                  >
                    <CheckSquare size={11} /> Review in Action Plan
                  </button>
                </div>
              </div>
            )}

            {/* Assumptions */}
            {isAI && message.assumptions && (
              <div
                className="mt-2 p-2.5 rounded-xl text-[10px] space-y-1 border"
                style={{ backgroundColor: 'rgba(245, 158, 11, 0.06)', borderColor: 'rgba(245, 158, 11, 0.2)' }}
              >
                <p className="font-bold text-amber-600 flex items-center gap-1">
                  <Info size={11} /> Scenario Assumptions:
                </p>
                {message.assumptions.map((a) => (
                  <p key={a} className="text-secondary-color pl-2">• {a}</p>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hello Anish! I'm your AI Wealth Assistant. Ask me practical financial questions like \"Can I afford this vacation?\", \"What happens if I save ₹5,000 more?\", or \"How will a purchase affect my goals?\". Every answer provides explainable reasoning and transparent assumptions. 💡",
      reasoning: [
        { label: 'Monthly Income', value: '₹1,00,000' },
        { label: 'Essential Expenses', value: '₹60,000' },
        { label: 'Available Capacity', value: '₹30,000' },
        { label: 'Current Savings', value: '₹3,40,000' },
      ],
      assumptions: [
        'Baseline figures derived from your active demo profile',
        'Human-in-the-loop decision support (no automated execution)',
        'Simulated illustrative values — not financial advice',
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    const msg = text || input.trim();
    if (!msg || isTyping) return;

    setInput('');
    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', content: msg }]);
    setIsTyping(true);

    try {
      const res = await sendMessage(msg);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: res.response,
          reasoning: res.reasoning,
          assumptions: res.assumptions,
        },
      ]);
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: 'Sorry, I encountered an error processing your query. Please try again.',
          reasoning: null,
          assumptions: null,
        },
      ]);
    }

    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="page-container flex flex-col h-[calc(100vh-4rem)]" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3 flex-shrink-0">
        <div>
          <h1 className="section-title flex items-center gap-2">
            <Brain size={22} className="text-blue-600" /> AI Wealth Assistant
          </h1>
          <p className="section-subtitle">
            Explainable conversational AI decision cockpit. Powered by Bedrock-ready abstractions.
          </p>
        </div>
        <div
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border shadow-sm"
          style={{
            backgroundColor: 'rgba(37, 99, 235, 0.08)',
            color: '#2563EB',
            borderColor: 'rgba(37, 99, 235, 0.2)',
          }}
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-[11px]">Bedrock Pipeline Ready</span>
        </div>
      </div>

      <div className="flex flex-col flex-1 min-h-0 gap-3">
        {/* Suggested Prompts Carousel */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 flex-shrink-0">
          {suggestedPrompts.map((prompt) => (
            <motion.button
              key={prompt}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSend(prompt)}
              disabled={isTyping}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-color hover:border-blue-500 hover:text-blue-600 transition-all duration-200 disabled:opacity-50 whitespace-nowrap bg-surface shadow-sm"
            >
              <Sparkles size={11} className="text-blue-500" /> {prompt}
            </motion.button>
          ))}
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 no-scrollbar">
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
          {isTyping && <ChatBubble message={{ role: 'assistant' }} isTyping={true} />}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="flex-shrink-0 pt-2 border-t border-color">
          <div className="flex gap-3 items-end">
            <div className="flex-1 card p-1.5 flex items-end gap-2 border border-color focus-within:ring-2 focus-within:ring-blue-500">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about spending impact, saving scenarios, or startup runways... (Enter to send)"
                aria-label="Message the AI assistant"
                rows={1}
                className="flex-1 px-3 py-2 text-xs bg-transparent outline-none resize-none text-primary-color placeholder:text-secondary-color"
                style={{ maxHeight: 100, minHeight: 38 }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 disabled:opacity-40 shadow-sm"
                id="ai-send-btn"
              >
                <Send size={14} className="text-white" />
              </motion.button>
            </div>
          </div>
          <p className="text-[10px] text-secondary-color mt-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Info size={10} />
              AI provides decision support with human oversight. Not financial advice.
            </span>
            <Link to="/help" className="text-blue-600 hover:underline">
              Responsible AI Guide →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
