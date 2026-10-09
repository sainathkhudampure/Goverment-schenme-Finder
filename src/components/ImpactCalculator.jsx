import React, { useState } from 'react';
import { 
  Coins, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';

export function ImpactCalculator({ schemes, t: _t }) {
  // Preset household profiles
  const [selectedSchemes, setSelectedSchemes] = useState({
    'pm-kisan': true,
    'pmgkay': true,
    'pmjay-ayushman': true,
    'mgnrega': true,
    'pmay-g': false,
    'pm-ujjwala': true,
    'pm-surya-ghar': false,
    'day-nrlm': false,
    'nsap-pension': false
  });

  const toggleScheme = (id) => {
    setSelectedSchemes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeSchemesList = schemes.filter(s => selectedSchemes[s.id]);

  // Aggregate values
  const totalAnnualCash = activeSchemesList.reduce((acc, curr) => acc + (curr.annualCashValue || 0), 0);
  const totalHealthCoverage = activeSchemesList.reduce((acc, curr) => acc + (curr.healthCoverValue || 0), 0);
  const monthlyEquivalent = Math.round(totalAnnualCash / 12);

  // Poverty Threshold comparison: Rangarajan rural poverty line ~₹32/day/person or ~₹4,800/month/household of 5
  const estimatedPovertyLineAnnual = 60000; // ~₹60,000/yr
  const povertyLiftPercentage = Math.min(250, Math.round((totalAnnualCash / estimatedPovertyLineAnnual) * 100));

  const applyPreset = (presetType) => {
    if (presetType === 'rural_farmer') {
      setSelectedSchemes({
        'pm-kisan': true,
        'pmgkay': true,
        'pmjay-ayushman': true,
        'mgnrega': true,
        'pm-ujjwala': true,
        'pmay-g': false,
        'pm-surya-ghar': false,
        'day-nrlm': false,
        'nsap-pension': false
      });
    } else if (presetType === 'houseless_destitute') {
      setSelectedSchemes({
        'pmay-g': true,
        'pmgkay': true,
        'pmjay-ayushman': true,
        'mgnrega': true,
        'pm-ujjwala': true,
        'pm-kisan': false,
        'pm-surya-ghar': false,
        'day-nrlm': false,
        'nsap-pension': true
      });
    } else if (presetType === 'women_shg') {
      setSelectedSchemes({
        'day-nrlm': true,
        'pm-ujjwala': true,
        'pmgkay': true,
        'pmjay-ayushman': true,
        'pm-kisan': true,
        'mgnrega': false,
        'pmay-g': false,
        'pm-surya-ghar': false,
        'nsap-pension': false
      });
    }
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <Coins className="w-3.5 h-3.5" />
              <span>Direct Benefit Transfer (DBT) Financial Impact Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Poverty Alleviation Benefit Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Simulate how multiple convergent government welfare schemes combine to lift a vulnerable household out of poverty into financial resilience.
            </p>
          </div>

          {/* Quick Archetype Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100 text-xs">
            <span className="font-semibold text-slate-500">Quick Archetypes:</span>
            <button
              onClick={() => applyPreset('rural_farmer')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg font-medium transition"
            >
              🌾 Small Farmer Family
            </button>
            <button
              onClick={() => applyPreset('houseless_destitute')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg font-medium transition"
            >
              🏠 Houseless Rural Laborer
            </button>
            <button
              onClick={() => applyPreset('women_shg')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg font-medium transition"
            >
              👩 Women SHG / Lakhpati Didi
            </button>
          </div>
        </div>

        {/* Two Column Layout: Schemes Toggle & Live Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Scheme Toggle Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Select Schemes in Household Basket ({activeSchemesList.length} Active)
            </h3>

            {schemes.slice(0, 10).map((scheme) => {
              const isChecked = !!selectedSchemes[scheme.id];
              return (
                <div
                  key={scheme.id}
                  onClick={() => toggleScheme(scheme.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between gap-3 ${isChecked ? 'bg-white border-blue-500 shadow-sm ring-1 ring-blue-500/20' : 'bg-slate-100/70 border-slate-200 opacity-70 hover:opacity-100'}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // handled by parent div
                      className="accent-blue-700 w-4 h-4 rounded cursor-pointer"
                    />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        {scheme.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {scheme.category} • {scheme.badge}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-black text-emerald-700">
                      {scheme.annualCashValue > 0 ? `+ ₹${scheme.annualCashValue.toLocaleString('en-IN')}/yr` : (scheme.healthCoverValue > 0 ? `+ ₹5,00,000 Cover` : 'Entitlement')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Aggregation Summary & Poverty Lift Score (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Total Annual Value Card */}
            <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl border border-blue-800">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                Net Annual Welfare Entitlement
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white mb-1">
                ₹{totalAnnualCash.toLocaleString('en-IN')}
                <span className="text-sm font-normal text-slate-300"> / year</span>
              </div>
              <div className="text-xs text-slate-300">
                Equivalent to approx <span className="font-bold text-amber-300">₹{monthlyEquivalent.toLocaleString('en-IN')}</span> per month in direct income and subsidy savings.
              </div>

              {/* Health Shield Indicator */}
              {totalHealthCoverage > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-teal-300 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                    <span>Free Hospitalization Shield</span>
                  </div>
                  <div className="text-sm font-black text-teal-300">
                    ₹5,00,000 / family
                  </div>
                </div>
              )}
            </div>

            {/* Poverty Line Lift Scorecard */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Poverty Alleviation Impact
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {povertyLiftPercentage}% of Poverty Line
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden border border-slate-200">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, povertyLiftPercentage)}%` }}
                ></div>
              </div>

              <div className="text-[11px] text-slate-500 leading-relaxed">
                {totalAnnualCash >= estimatedPovertyLineAnnual ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>This safety net provides coverage exceeding the national subsistence threshold, shielding the family against catastrophic shock.</span>
                  </span>
                ) : (
                  <span>Add schemes like PMAY or MGNREGA to reach the 100% full poverty-resilience threshold.</span>
                )}
              </div>
            </div>

            {/* Breakdown Component Stack */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Welfare Category Contribution
              </h4>
              <div className="space-y-2 text-xs">
                {activeSchemesList.map(s => (
                  <div key={s.id} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                    <span className="text-slate-700 truncate pr-2">{s.name}</span>
                    <span className="font-bold text-slate-900 whitespace-nowrap">
                      {s.annualCashValue > 0 ? `₹${s.annualCashValue.toLocaleString('en-IN')}` : 'In-kind'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
