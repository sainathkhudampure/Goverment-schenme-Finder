import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Coins, 
  SlidersHorizontal,
  FileText
} from 'lucide-react';

export function Hero({ 
  t, 
  searchQuery: _searchQuery, 
  setSearchQuery: _setSearchQuery, 
  setActiveTab,
  onQuickCategorySelect,
  onQuickFinderApply
}) {
  const [quickBeneficiary, setQuickBeneficiary] = useState('All Groups');
  const [quickCategory, setQuickCategory] = useState('All Categories');

  const quickCategories = [
    { label: "Farmers (PM-KISAN)", cat: "Agriculture & Farmers" },
    { label: "Free Housing (PMAY)", cat: "Housing & Shelter" },
    { label: "Health (Ayushman ₹5L)", cat: "Health & Life Cover" },
    { label: "Free Foodgrains (PMGKAY)", cat: "Food & Nutrition" },
    { label: "Women & SHGs", cat: "Women & Micro-Credit" },
    { label: "Solar (Muft Bijli)", cat: "Utilities & Energy" }
  ];

  const handleFinderSubmit = (e) => {
    e.preventDefault();
    if (onQuickFinderApply) {
      onQuickFinderApply(quickCategory, quickBeneficiary);
    } else {
      if (quickCategory !== 'All Categories') onQuickCategorySelect(quickCategory);
      setActiveTab('explore');
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-blue-950 via-slate-900 to-blue-900 text-white overflow-hidden py-10 sm:py-14 border-b border-blue-800">
      {/* Background Indian Motif Patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* SDG 1 Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-semibold mb-4 shadow-lg backdrop-blur-sm">
            <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping"></span>
            <span>🎯 {t.sdgBadge}</span>
            <span className="text-rose-400 font-normal">| {t.viksitBharat}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 leading-tight">
            NO POVERTY — <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-300">
              Government Scheme Finder
            </span>
          </h2>

          <div className="text-xs sm:text-sm font-semibold text-amber-200/90 mb-4 tracking-wide uppercase">
            राष्ट्रीय निर्धनता उन्मूलन — सरकारी योजना खोजकर्ता
          </div>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-3xl mx-auto mb-6 font-normal leading-relaxed">
            {t.tagline}. Find central and state welfare programs tailored to your profile, verify eligibility across housing, nutrition, healthcare, and agriculture, and calculate your family's annual DBT benefits.
          </p>

          {/* Interactive Quick Scheme Finder Bar */}
          <div className="bg-slate-900/90 border-2 border-amber-500/80 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md max-w-3xl mx-auto mb-6 text-left">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span>Smart Scheme Finder (त्वरित योजना खोजक)</span>
            </div>

            <form onSubmit={handleFinderSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* Beneficiary Select */}
              <div className="sm:col-span-5">
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">I am looking for schemes for:</label>
                <select
                  value={quickBeneficiary}
                  onChange={(e) => setQuickBeneficiary(e.target.value)}
                  className="w-full bg-slate-800 text-white text-xs px-3 py-2.5 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="All Groups">All Beneficiary Groups (सभी वर्ग)</option>
                  <option value="Small & Marginal Farmers">Farmers & Cultivators (किसान)</option>
                  <option value="Rural Houseless & Poor">Houseless & Kutcha House Families (बेघर / कच्चा मकान)</option>
                  <option value="Daily Wage & Informal Workers">Daily Wage Laborers & MGNREGA (मजदूर)</option>
                  <option value="Street Vendors & Hawkers">Street Vendors & Hawkers (स्ट्रीट वेंडर)</option>
                  <option value="Women & SHG Members">Women & SHG Members (महिलाएं / स्वयं सहायता समूह)</option>
                  <option value="Senior Citizens & Destitute">Senior Citizens & Widows (वृद्ध / विधवा / दिव्यांग)</option>
                  <option value="Artisans & Craftspersons">Traditional Artisans & Crafts (कारीगर / विश्वकर्मा)</option>
                  <option value="Girl Children">Girl Children & Students (बालिका / शिक्षा)</option>
                </select>
              </div>

              {/* Category Select */}
              <div className="sm:col-span-4">
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Under Category / Benefit:</label>
                <select
                  value={quickCategory}
                  onChange={(e) => setQuickCategory(e.target.value)}
                  className="w-full bg-slate-800 text-white text-xs px-3 py-2.5 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="All Categories">All Categories (सभी श्रेणियां)</option>
                  <option value="Agriculture & Farmers">Agriculture & Farmers (कृषि)</option>
                  <option value="Housing & Shelter">Housing & Shelter (आवास)</option>
                  <option value="Health & Life Cover">Healthcare & Ayushman (स्वास्थ्य)</option>
                  <option value="Food & Nutrition">Food & Free Ration (अन्न योजना)</option>
                  <option value="Livelihood & Employment">Employment (रोजगार / मनरेगा)</option>
                  <option value="Micro-Credit & Livelihood">Loans & Micro-credit (ऋण / स्वनिधि)</option>
                  <option value="Social Security & Pensions">Social Pensions (पेंशन)</option>
                  <option value="Utilities & Energy">Solar & Electricity (बिजली / सोलर)</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-3 sm:self-end">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm py-2.5 px-3 rounded-lg shadow-lg transition flex items-center justify-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Find Schemes</span>
                </button>
              </div>
            </form>

            {/* Quick Filter Tags */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-800 text-xs">
              <span className="text-slate-400 text-[11px] font-medium mr-1">Popular:</span>
              {quickCategories.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onQuickCategorySelect(item.cat);
                    setActiveTab('explore');
                  }}
                  className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 px-2.5 py-0.5 rounded-md border border-slate-700 text-[11px] transition"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveTab('eligibility')}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-5 py-2.5 rounded-lg shadow-lg hover:shadow-emerald-500/20 transition flex items-center gap-2 text-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Interactive Scheme Finder Wizard</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className="bg-blue-800/80 hover:bg-blue-700 border border-blue-600 text-white font-semibold px-4 py-2.5 rounded-lg transition flex items-center gap-2 text-sm"
            >
              <Coins className="w-4 h-4 text-amber-400" />
              <span>{t.calculateBenefits}</span>
            </button>

            <button
              onClick={() => setActiveTab('checklist')}
              className="bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold px-4 py-2.5 rounded-lg transition flex items-center gap-2 text-sm"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>{t.documentChecklist}</span>
            </button>
          </div>

          {/* National Impact Pillars Card Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
            <div className="bg-slate-800/70 border border-slate-700/80 p-3 sm:p-4 rounded-xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Poverty Reduction</span>
                <Users className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">{t.quickStats.beneficiaries}</div>
              <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">{t.quickStats.beneficiariesLabel}</div>
            </div>

            <div className="bg-slate-800/70 border border-slate-700/80 p-3 sm:p-4 rounded-xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Direct Benefit</span>
                <Coins className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">{t.quickStats.dbtDisbursed}</div>
              <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">{t.quickStats.dbtDisbursedLabel}</div>
            </div>

            <div className="bg-slate-800/70 border border-slate-700/80 p-3 sm:p-4 rounded-xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-sky-400 font-semibold uppercase tracking-wider">Schemes Catalog</span>
                <ShieldCheck className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">{t.quickStats.schemesCount}</div>
              <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">{t.quickStats.schemesCountLabel}</div>
            </div>

            <div className="bg-slate-800/70 border border-slate-700/80 p-3 sm:p-4 rounded-xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">Leakage-Free</span>
                <TrendingUp className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">{t.quickStats.satisfaction}</div>
              <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">{t.quickStats.satisfactionLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
