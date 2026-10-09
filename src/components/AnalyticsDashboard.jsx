import React from 'react';
import { 
  TrendingDown, 
  Award, 
  MapPin, 
  ShieldCheck
} from 'lucide-react';
import { MPI_ANALYTICS } from '../data/analyticsData';

export function AnalyticsDashboard({ t: _t }) {
  const { nationalPovertyDecline, topPovertyReductionStates, sdg1Indicators, dbtTransferSummary } = MPI_ANALYTICS;

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>NITI Aayog & United Nations SDG-1 Progress Report</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              India's Multidimensional Poverty Index (MPI) Analytics
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Tracking nationwide multidimensional poverty alleviation across 12 vital deprivation indicators spanning health, education, and living standards.
            </p>
          </div>
        </div>

        {/* 1. National Poverty Decline Trend Graph */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Multidimensional Headcount Poverty Ratio (% of Population)
              </h3>
              <p className="text-xs text-slate-500">
                Data Source: NITI Aayog National MPI Reports (Based on NFHS Rounds)
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
              <TrendingDown className="w-4 h-4 text-emerald-600" />
              <span>Reduced by over 21.7% in one decade</span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 items-end pt-6 pb-2">
            {nationalPovertyDecline.map((item, idx) => {
              const heightPct = Math.round((item.percentage / 30) * 100);
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-xs font-black text-slate-900 mb-1">
                    {item.percentage}%
                  </div>
                  <div className="text-[10px] text-slate-500 mb-2 font-medium">
                    {item.populationCrore} Cr people
                  </div>
                  <div className="w-full bg-slate-100 rounded-t-lg h-44 flex items-end p-1">
                    <div 
                      className={`w-full rounded-t-md transition-all duration-700 ${idx === nationalPovertyDecline.length - 1 ? 'bg-gradient-to-t from-emerald-600 to-teal-400' : 'bg-gradient-to-t from-blue-700 to-indigo-500'}`}
                      style={{ height: `${heightPct}%` }}
                    ></div>
                  </div>
                  <div className="text-xs font-bold text-slate-700 mt-2 text-center">
                    {item.year}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Top Performing States in Poverty Reduction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>Highest Number of Citizens Lifted from Poverty (By State)</span>
            </h3>

            <div className="space-y-3">
              {topPovertyReductionStates.map((st, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{st.state}</div>
                      <div className="text-[11px] text-slate-500">Poverty Headcount Drop</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs sm:text-sm font-black text-emerald-700">
                      {st.liftedCount}
                    </div>
                    <div className="text-[11px] font-bold text-slate-600">
                      {st.dropPercentage}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 12 Deprivation Indicator Tracker */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SDG 1 Key Parameter Achievement Scores</span>
            </h3>

            <div className="space-y-3">
              {sdg1Indicators.map((ind, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{ind.name}</span>
                    <span className="font-bold text-emerald-700">{ind.score}% ({ind.change})</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${ind.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. DBT Disbursal Breakdown by Welfare Pillars */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
            Direct Benefit Transfer Cumulative Disbursal
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dbtTransferSummary.map((dbt, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-blue-900 mb-1">{dbt.sector}</div>
                <div className="text-lg font-black text-slate-900">{dbt.amount}</div>
                <div className="text-[11px] text-slate-600 mt-1">Beneficiaries: {dbt.beneficiaries}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
