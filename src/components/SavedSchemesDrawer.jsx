import React from 'react';
import { 
  X, 
  Trash2, 
  ExternalLink, 
  Printer, 
  Eye, 
  Bookmark
} from 'lucide-react';

export function SavedSchemesDrawer({ 
  isOpen, 
  onClose, 
  savedSchemes, 
  schemes, 
  onToggleSave, 
  onSelectScheme,
  t 
}) {
  if (!isOpen) return null;

  const savedList = schemes.filter(s => savedSchemes.includes(s.id));
  const totalAnnualValue = savedList.reduce((acc, curr) => acc + (curr.annualCashValue || 0), 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-blue-700" />
            <h3 className="text-base font-bold text-slate-900">
              {t.savedSchemes} ({savedList.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Saved List Content */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {savedList.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-slate-700">No Saved Schemes Yet</h4>
              <p className="text-xs text-slate-500 mt-1">
                Click the bookmark icon on any scheme card to save it to your personal shortlist.
              </p>
            </div>
          ) : (
            <>
              {/* Basket Total Summary */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 mb-2">
                <div className="text-[11px] font-bold text-blue-900 uppercase">
                  Estimated Saved Entitlement
                </div>
                <div className="text-xl font-black text-blue-950 mt-0.5">
                  ₹{totalAnnualValue.toLocaleString('en-IN')} / year
                </div>
              </div>

              {savedList.map(scheme => (
                <div
                  key={scheme.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 shadow-2xs transition flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {scheme.badge}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-1 line-clamp-1">
                        {scheme.name}
                      </h4>
                    </div>

                    <button
                      onClick={() => onToggleSave(scheme.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-xs font-bold text-slate-700 mb-2">
                    {scheme.benefitAmount}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectScheme(scheme);
                      }}
                      className="text-blue-700 hover:underline font-semibold flex items-center gap-1 text-xs"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Details</span>
                    </button>

                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-[11px]"
                    >
                      <span>Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer Actions */}
        {savedList.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 bg-white px-3 py-2 rounded-lg"
            >
              <Printer className="w-4 h-4" />
              <span>Print Shortlist</span>
            </button>

            <button
              onClick={onClose}
              className="bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold px-4 py-2 rounded-lg shadow"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
