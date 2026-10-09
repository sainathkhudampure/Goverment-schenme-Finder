import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  FileText, 
  LogOut, 
  ShieldCheck, 
  Bookmark
} from 'lucide-react';
import { apiService } from '../services/api';

export function CitizenDashboardModal({ 
  isOpen, 
  onClose, 
  user, 
  onLogout,
  onOpenSaved,
  savedCount
}) {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (isOpen && user) {
      apiService.getApplications(user.id).then(data => {
        setApplications(data || []);
      });
    }
  }, [isOpen, user]);

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tricolor Header Bar */}
        <div className="h-1.5 w-full grid grid-cols-3">
          <div className="bg-[#FF9933]"></div>
          <div className="bg-white"></div>
          <div className="bg-[#138808]"></div>
        </div>

        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
              🇮🇳
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Citizen Welfare Dashboard
              </h3>
              <p className="text-xs text-slate-500">
                Logged in as <strong>{user.fullName}</strong> • ID: <span className="font-mono text-blue-700">{user.citizenId}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Profile Card */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-xl p-4 sm:p-5 shadow">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider block">
                  Verified Citizen Identity
                </span>
                <div className="text-xl font-black text-white">{user.fullName}</div>
                <div className="text-xs text-slate-300 mt-1">
                  Mobile: +91 {user.mobile} • State: {user.state} • Category: {user.category}
                </div>
              </div>

              <div className="bg-white/10 px-3 py-2 rounded-lg border border-white/20 text-center">
                <span className="text-[10px] text-slate-300 block">Aadhaar e-KYC</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 justify-center">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{user.aadhaarMasked || 'Verified'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block mb-0.5">Submitted Applications</span>
              <span className="text-xl font-black text-blue-900">{applications.length}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block mb-0.5">Saved Schemes</span>
              <span className="text-xl font-black text-amber-700">{savedCount}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
              <span className="text-slate-500 block mb-0.5">DBT Bank Status</span>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>NPCI Seeding Active</span>
              </span>
            </div>
          </div>

          {/* Applications List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-700" />
                <span>My Welfare Scheme Applications</span>
              </h4>
              <button
                onClick={() => { onClose(); onOpenSaved(); }}
                className="text-xs text-blue-700 hover:underline font-semibold flex items-center gap-1"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>View Bookmarks ({savedCount})</span>
              </button>
            </div>

            {applications.length === 0 ? (
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                No active scheme applications submitted yet. Browse schemes to apply online.
              </div>
            ) : (
              <div className="space-y-2.5">
                {applications.map((app, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-mono text-[10px] text-slate-500 block">
                        {app.applicationId}
                      </span>
                      <div className="font-bold text-slate-900">{app.schemeName}</div>
                      <span className="text-[11px] text-slate-500">
                        Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-300">
                        <Clock className="w-3 h-3 text-amber-700" />
                        <span>{app.status.replace('_', ' ')}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="text-xs font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 bg-white hover:bg-rose-50 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={onClose}
            className="bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold px-4 py-2 rounded-lg shadow"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
