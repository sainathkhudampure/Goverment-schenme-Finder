import React, { useState } from 'react';
import { 
  X, 
  User, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { apiService } from '../services/api';

export function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  
  // Signup fields
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [state, setState] = useState('Uttar Pradesh');
  const [category, setCategory] = useState('General');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const statesList = [
    "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Gujarat", 
    "Haryana", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", 
    "Telangana", "Uttar Pradesh", "West Bengal", "Delhi (NCT)"
  ];

  const handleDemoFill = () => {
    if (mode === 'login') {
      setIdentifier('9876543210');
      setPassword('password123');
    } else {
      setFullName('Sainath Rao');
      setMobile('9876543210');
      setEmail('sainath@example.com');
      setAadhaar('123456784921');
      setState('Uttar Pradesh');
      setCategory('OBC');
      setPassword('password123');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await apiService.login(identifier, password);
      setSuccessMessage(res.message || 'Login successful!');
      setTimeout(() => {
        onAuthSuccess(res.user);
        onClose();
      }, 700);
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await apiService.register({
        fullName,
        mobile,
        email,
        aadhaar,
        state,
        category,
        password
      });
      setSuccessMessage(res.message || 'Registration successful!');
      setTimeout(() => {
        onAuthSuccess(res.user);
        onClose();
      }, 700);
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tricolor Top Line */}
        <div className="h-1.5 w-full grid grid-cols-3">
          <div className="bg-[#FF9933]"></div>
          <div className="bg-white"></div>
          <div className="bg-[#138808]"></div>
        </div>

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs">
              🏛️
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                MeriPehchaan • Citizen Portal
              </h3>
              <p className="text-[11px] text-slate-500">Government of India Single Sign-On</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs: Sign In / Sign Up */}
        <div className="grid grid-cols-2 border-b border-slate-200 text-xs font-bold">
          <button
            onClick={() => { setMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`py-3 text-center transition ${mode === 'login' ? 'border-b-2 border-blue-800 text-blue-900 bg-white' : 'text-slate-500 bg-slate-50 hover:bg-slate-100'}`}
          >
            Citizen Sign In (लॉग इन)
          </button>
          <button
            onClick={() => { setMode('signup'); setErrorMessage(''); setSuccessMessage(''); }}
            className={`py-3 text-center transition ${mode === 'signup' ? 'border-b-2 border-blue-800 text-blue-900 bg-white' : 'text-slate-500 bg-slate-50 hover:bg-slate-100'}`}
          >
            New Citizen Registration (पंजीकरण)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Quick Demo Fill button */}
          <div className="flex justify-end mb-3">
            <button
              type="button"
              onClick={handleDemoFill}
              className="text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-md flex items-center gap-1 transition"
            >
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Auto-Fill Demo Credentials</span>
            </button>
          </div>

          {errorMessage && (
            <div className="mb-4 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Mode 1: Login Form */}
          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number / Citizen ID / Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 9876543210 or IND-849201"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password / PIN
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs py-2.5 rounded-lg shadow transition flex items-center justify-center gap-1.5"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In to Citizen Portal'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            /* Mode 2: Signup Form */
            <form onSubmit={handleSignup} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Full Name (As per Aadhaar) *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sainath Rao"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10-digit number"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                    State / UT *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    {statesList.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                    Social Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2 rounded-lg shadow transition flex items-center justify-center gap-1.5 mt-2"
              >
                <span>{loading ? 'Registering...' : 'Register as Citizen'}</span>
                <ShieldCheck className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 text-center">
            🔒 Protected under Information Technology Act, 2000 & Digital Personal Data Protection Act.
          </div>
        </div>
      </div>
    </div>
  );
}
