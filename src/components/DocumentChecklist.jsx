import React, { useState } from 'react';
import { 
  FileCheck2, 
  Printer, 
  CheckSquare, 
  Square, 
  AlertCircle
} from 'lucide-react';

export function DocumentChecklist({ schemes, t }) {
  const [selectedSchemes, setSelectedSchemes] = useState([
    'pm-kisan',
    'pmay-g',
    'pmjay-ayushman',
    'pmgkay'
  ]);

  const [checkedDocs, setCheckedDocs] = useState({
    'Aadhaar Card of all adult family members': true,
    'Active Mobile Number linked to Aadhaar': true,
    'Bank Account Passbook (Aadhaar & NPCI linked)': true
  });

  const toggleSchemeSelection = (id) => {
    if (selectedSchemes.includes(id)) {
      setSelectedSchemes(selectedSchemes.filter(s => s !== id));
    } else {
      setSelectedSchemes([...selectedSchemes, id]);
    }
  };

  const toggleDocChecked = (docName) => {
    setCheckedDocs(prev => ({
      ...prev,
      [docName]: !prev[docName]
    }));
  };

  // Aggregate all unique documents from selected schemes
  const activeSchemes = schemes.filter(s => selectedSchemes.includes(s.id));
  const allDocuments = Array.from(new Set(activeSchemes.flatMap(s => s.documents)));

  const handlePrint = () => {
    window.print();
  };

  const completedCount = allDocuments.filter(d => checkedDocs[d]).length;
  const readinessPercentage = allDocuments.length > 0 ? Math.round((completedCount / allDocuments.length) * 100) : 0;

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-semibold mb-2">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Application Readiness Tool</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Citizen Document Checklist Generator
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Select the welfare schemes you intend to apply for. We generate an aggregated, zero-redundancy checklist for your visit to the CSC Seva Kendra or Gram Panchayat.
              </p>
            </div>

            <button
              onClick={handlePrint}
              className="bg-blue-800 hover:bg-blue-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow flex items-center gap-2 transition"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printChecklist}</span>
            </button>
          </div>

          {/* Scheme Selection Pills */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-700 block mb-2">
              Select Schemes To Combine ({selectedSchemes.length} chosen):
            </span>
            <div className="flex flex-wrap gap-2">
              {schemes.map(scheme => {
                const isSelected = selectedSchemes.includes(scheme.id);
                return (
                  <button
                    key={scheme.id}
                    onClick={() => toggleSchemeSelection(scheme.id)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition ${isSelected ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
                  >
                    {scheme.badge}: {scheme.name.split('(')[0]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Readiness Meter Card */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-xl p-5 mb-6 shadow-md border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-0.5">
              Application Readiness Score
            </div>
            <div className="text-2xl font-black">
              {completedCount} of {allDocuments.length} Documents Ready ({readinessPercentage}%)
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Ensure your Bank Account has NPCI Direct Benefit Transfer (DBT) enabled to prevent disbursement failures.
            </p>
          </div>

          <div className="w-full sm:w-48 bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-700">
            <div 
              className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all duration-300"
              style={{ width: `${readinessPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Aggregated Checklist Container */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Consolidated Documents Required ({allDocuments.length})
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Click checkboxes to track what you have
            </span>
          </div>

          <div className="space-y-3">
            {allDocuments.map((doc, idx) => {
              const isChecked = !!checkedDocs[doc];
              return (
                <div
                  key={idx}
                  onClick={() => toggleDocChecked(doc)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${isChecked ? 'bg-emerald-50/50 border-emerald-300' : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'}`}
                >
                  <button type="button" className="mt-0.5 flex-shrink-0 text-emerald-700">
                    {isChecked ? <CheckSquare className="w-5 h-5 text-emerald-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                  </button>

                  <div className="flex-1">
                    <span className={`text-xs sm:text-sm font-medium ${isChecked ? 'text-slate-900 line-through text-slate-400' : 'text-slate-800'}`}>
                      {doc}
                    </span>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Needed by: {activeSchemes.filter(s => s.documents.includes(doc)).map(s => s.name.split('(')[0]).join(', ')}
                    </div>
                  </div>

                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${isChecked ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {isChecked ? 'Ready' : 'Pending'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CSC & e-Mitra Advisory */}
          <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold mb-0.5">Important Citizen Guidance:</div>
              <p className="leading-relaxed text-blue-800">
                Government scheme applications do NOT require fee payment to unauthorized middlemen. Common Service Centres (CSC) charge only nominal government-regulated fee (typically ₹20 - ₹50) for online submission and biometric e-KYC.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
