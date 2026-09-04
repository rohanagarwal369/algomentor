import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Terminal, Lock, Mail, User, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, loginWithGoogle } = useApp();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('rohanagarwal082005@gmail.com');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: typeof errors = {};
    if (isSignUp && !name.trim()) {
      errs.name = 'Please enter your full name';
    }
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    if (isSignUp && password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // TODO: backend - implement real authentication logic (OAuth/JWT/Firebase)
    setTimeout(() => {
      login(email, isSignUp ? name : undefined);
      setLoading(false);
      if (isSignUp) {
        localStorage.removeItem('algomentor_has_onboarded');
        navigate('/onboarding');
      } else {
        const hasOnboarded = localStorage.getItem('algomentor_has_onboarded');
        if (!hasOnboarded) {
          navigate('/onboarding');
        } else {
          navigate('/');
        }
      }
    }, 450);
  };

  const handleGoogleAuth = () => {
    // TODO: backend - initiate real Google OAuth 2.0 flow
    setLoading(true);
    setTimeout(() => {
      loginWithGoogle();
      setLoading(false);
      const hasOnboarded = localStorage.getItem('algomentor_has_onboarded');
      if (!hasOnboarded) {
        navigate('/onboarding');
      } else {
        navigate('/');
      }
    }, 450);
  };

  return (
    <div className="min-h-screen w-full bg-[#0d1117] text-[#e6edf3] flex flex-col items-center justify-center p-4 selection:bg-[#58a6ff]/30">
      {/* Background glowing gradient element */}
      <div className="absolute top-1/4 w-96 h-96 bg-[#58a6ff]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Centered card on dark background */}
      <div 
        id="login-card"
        className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* AlgoMentor Logo Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#1c2128] border border-[#30363d] mb-3 shadow-inner">
            <Terminal className="w-6 h-6 text-[#58a6ff]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#e6edf3]">AlgoMentor</h1>
          <p className="text-xs text-[#8b949e] mt-1">
            {isSignUp 
              ? 'Create your developer account to begin DSA mastery' 
              : 'Sign in to access your DSA curriculum and AI tutor'}
          </p>
        </div>

        {/* Continue with Google Button (Light button standing out against dark bg) */}
        <button
          id="btn-google-login"
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full py-2.5 px-4 bg-[#f6f8fa] hover:bg-white text-[#24292f] font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-3 shadow-sm cursor-pointer disabled:opacity-50"
        >
          {/* Google G Logo SVG */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="border-t border-[#30363d] w-full" />
          <span className="bg-[#161b22] px-3 text-[11px] text-[#8b949e] uppercase font-mono absolute">
            or
          </span>
        </div>

        {/* Manual Login / Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Name field (if signing up) */}
          {isSignUp && (
            <div>
              <label className="block text-[#e6edf3] font-medium mb-1">Full Name</label>
              <div className="relative">
                <input
                  id="input-login-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rohan Agarwal"
                  className={`w-full bg-[#0d1117] border rounded-lg px-3 py-2 pl-9 text-xs text-[#e6edf3] placeholder-[#8b949e] focus:outline-none transition-colors ${
                    errors.name ? 'border-[#f85149] focus:border-[#f85149]' : 'border-[#30363d] focus:border-[#58a6ff]'
                  }`}
                />
                <User className="w-4 h-4 text-[#8b949e] absolute left-2.5 top-2.5" />
              </div>
              {errors.name && (
                <p className="text-[11px] text-[#f85149] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>
          )}

          {/* Email input */}
          <div>
            <label className="block text-[#e6edf3] font-medium mb-1">Email Address</label>
            <div className="relative">
              <input
                id="input-login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@algomentor.dev"
                className={`w-full bg-[#0d1117] border rounded-lg px-3 py-2 pl-9 text-xs text-[#e6edf3] placeholder-[#8b949e] focus:outline-none transition-colors ${
                  errors.email ? 'border-[#f85149] focus:border-[#f85149]' : 'border-[#30363d] focus:border-[#58a6ff]'
                }`}
              />
              <Mail className="w-4 h-4 text-[#8b949e] absolute left-2.5 top-2.5" />
            </div>
            {errors.email && (
              <p className="text-[11px] text-[#f85149] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </p>
            )}
          </div>

          {/* Password input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[#e6edf3] font-medium">Password</label>
              {!isSignUp && (
                <span className="text-[10px] text-[#58a6ff] hover:underline cursor-pointer">
                  Forgot password?
                </span>
              )}
            </div>
            <div className="relative">
              <input
                id="input-login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full bg-[#0d1117] border rounded-lg px-3 py-2 pl-9 text-xs text-[#e6edf3] placeholder-[#8b949e] focus:outline-none transition-colors ${
                  errors.password ? 'border-[#f85149] focus:border-[#f85149]' : 'border-[#30363d] focus:border-[#58a6ff]'
                }`}
              />
              <Lock className="w-4 h-4 text-[#8b949e] absolute left-2.5 top-2.5" />
            </div>
            {errors.password && (
              <p className="text-[11px] text-[#f85149] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password (if signing up) */}
          {isSignUp && (
            <div>
              <label className="block text-[#e6edf3] font-medium mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  id="input-login-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full bg-[#0d1117] border rounded-lg px-3 py-2 pl-9 text-xs text-[#e6edf3] placeholder-[#8b949e] focus:outline-none transition-colors ${
                    errors.confirmPassword ? 'border-[#f85149] focus:border-[#f85149]' : 'border-[#30363d] focus:border-[#58a6ff]'
                  }`}
                />
                <Lock className="w-4 h-4 text-[#8b949e] absolute left-2.5 top-2.5" />
              </div>
              {errors.confirmPassword && (
                <p className="text-[11px] text-[#f85149] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
                </p>
              )}
            </div>
          )}

          {/* Sign In / Sign Up Button */}
          <button
            id="btn-login-submit"
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 bg-[#58a6ff] hover:bg-[#388bfd] text-[#0d1117] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
          >
            <span>{isSignUp ? 'Create Account' : 'Sign In to AlgoMentor'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Toggle between Sign in and Sign up */}
        <div className="mt-6 pt-4 border-t border-[#30363d] text-center text-xs text-[#8b949e]">
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setErrors({});
                }}
                className="text-[#58a6ff] hover:underline font-semibold cursor-pointer"
              >
                Sign in
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setErrors({});
                }}
                className="text-[#58a6ff] hover:underline font-semibold cursor-pointer"
              >
                Sign up
              </button>
            </p>
          )}
        </div>

        {/* Mock flow indicator */}
        <div className="mt-3 text-center">
          <span className="text-[10px] text-[#8b949e]/60 font-mono">
            // UI Mock Flow • Instant One-Click Login
          </span>
        </div>
      </div>
    </div>
  );
};
