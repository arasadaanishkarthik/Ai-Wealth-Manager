import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Eye, EyeOff, ArrowRight, Zap } from 'lucide-react';

export default function Login({ isDark, onToggleTheme }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    navigate('/dashboard');
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-page flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1e1b4b 100%)' }}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white"
              style={{
                width: `${80 + i * 40}px`,
                height: `${80 + i * 40}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 1 - i * 0.045,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-white">AI Wealth Navigator</div>
              <div className="text-xs text-blue-300">Plan Smarter. Spend Better. Build Bigger.</div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Your money,<br />intelligently guided.</h2>
              <p className="text-blue-200 leading-relaxed">
                Explore financial scenarios, simulate what-if decisions, and discover
                opportunities with AI-powered insights — all in one premium dashboard.
              </p>
            </div>

            <div className="space-y-4">
              {[
                'Financial health score & insights',
                'Multi-goal tracking & simulation',
                'AI-powered scenario analysis',
                'Startup & lifestyle impact explorer',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-blue-100">
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[10px]">✓</span>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-blue-400">
          Demo prototype — All data is synthetic. Not financial advice.
        </p>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <TrendingUp size={16} className="text-white" />
            </div>
            <div className="font-bold text-sm text-primary-color">AI Wealth Navigator</div>
          </div>

          <h1 className="text-2xl font-bold text-primary-color mb-1">Welcome back</h1>
          <p className="text-secondary-color text-sm mb-8">Sign in to your wealth dashboard</p>

          {/* Demo quick access */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleDemoLogin}
            disabled={loading}
            id="demo-login-btn"
            className="w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-xl border-2 font-semibold text-sm mb-6 transition-all duration-200 hover:shadow-md"
            style={{ borderColor: '#2563EB', color: '#2563EB', backgroundColor: 'rgba(37, 99, 235, 0.04)' }}
          >
            <Zap size={16} />
            Continue with Demo Account
          </motion.button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border-color" style={{ backgroundColor: 'var(--color-border)' }} />
            <span className="text-xs text-secondary-color">or sign in with credentials</span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="label">Email Address</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="password" className="label">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-color hover:text-primary-color transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 font-medium"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="btn-primary w-full py-3.5 text-base mt-2"
              id="login-submit-btn"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </motion.button>
          </form>

          <p className="text-center text-xs text-secondary-color mt-6">
            Don't have an account?{' '}
            <button onClick={() => navigate('/onboarding')} className="text-blue-600 font-semibold hover:underline">
              Start onboarding
            </button>
          </p>

          <p className="text-center text-[10px] text-secondary-color mt-4">
            Demo prototype — No real authentication. All data is synthetic.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
