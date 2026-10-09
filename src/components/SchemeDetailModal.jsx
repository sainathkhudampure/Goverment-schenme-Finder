import React from 'react';
import { 
  X, 
  ExternalLink, 
  Bookmark, 
  CheckCircle2, 
  FileText, 
  PhoneCall, 
  Printer, 
  ShieldCheck, 
  Building2, 
  ArrowRight
} from 'lucide-react';

export function SchemeDetailModal({ 
  scheme, 
  onClose, 
  isSaved, 
  onToggleSave,
  t 
}) {
  if (!scheme) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tricolor Modal Header Stripe */}
        <div className="h-1.5 w-full grid grid-cols-3">
          <div className="bg-[#FF9933]"></div>
          <div className="bg-white"></div>
          <div className="bg-[#138808]"></div>
        </div>

        {/* Modal Top Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-3 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              {scheme.category}
            </span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              {scheme.badge}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(scheme.id)}
              className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition ${isSaved ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              title="Bookmark scheme"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-700 text-blue-700' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? t.saved : t.saveScheme}</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
              title="Print Factsheet"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-6 text-slate-800">
          {/* Main Title Banner */}
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {scheme.name}
            </h3>
            <div className="text-sm font-semibold text-slate-600 mt-0.5">
              {scheme.nameHi}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-blue-800 font-medium mt-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>{scheme.ministry}</span>
            </div>
          </div>

          {/* Key Benefit Highlights Box */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 sm:p-5">
            <div className="text-xs uppercase font-extrabold text-blue-900 tracking-wider mb-1">
              Direct Citizen Benefit
            </div>
            <div className="text-xl sm:text-2xl font-black text-blue-950">
              {scheme.benefitAmount}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
              {scheme.benefitDetails}
            </p>
          </div>

          {/* Target Group & Coverage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="font-bold text-slate-600 block mb-0.5">Target Beneficiaries:</span>
              <span className="text-slate-900 font-semibold">{scheme.targetAudience}</span>
            </div>
            <div>
              <span className="font-bold text-slate-600 block mb-0.5">Geographic Coverage:</span>
              <span className="text-slate-900 font-semibold">{scheme.eligibleStates.join(', ')} ({scheme.area})</span>
            </div>
            <div>
              <span className="font-bold text-slate-600 block mb-0.5">Eligible Age Bracket:</span>
              <span className="text-slate-900 font-semibold">{scheme.minAge} to {scheme.maxAge} Years</span>
            </div>
            <div>
              <span className="font-bold text-slate-600 block mb-0.5">Income / Deprivation Criteria:</span>
              <span className="text-slate-900 font-semibold">{scheme.incomeLimit}</span>
            </div>
          </div>

          {/* Detailed Eligibility Checklist */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Eligibility Criteria Checklist</span>
            </h4>
            <div className="space-y-2">
              {scheme.criteria.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents Checklist */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Mandatory Documents Required</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scheme.documents.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0"></div>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step How to Apply */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-amber-600" />
              <span>Step-by-Step Application Procedure</span>
            </h4>
            <div className="space-y-2.5">
              {scheme.applicationSteps.map((stepText, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex-1">
                    {stepText}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Helpline and Grievance */}
          <div className="bg-emerald-50 rounded-xl p-3.5 border border-emerald-200 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-900">
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span><strong>Official Scheme Helpline:</strong> {scheme.helpline}</span>
            </div>
            <span className="text-[11px] text-emerald-800">Toll Free / Working Days</span>
          </div>
        </div>

        {/* Modal Sticky Bottom Actions */}
        <div className="sticky bottom-0 bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Verified with official DBT & Ministry guidelines
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition"
            >
              Close
            </button>
            <a
              href={scheme.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition flex items-center gap-1.5 shadow"
            >
              <span>Visit Official Portal ({scheme.officialUrl.replace('https://', '')})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
