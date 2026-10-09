import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Eye, 
  Bookmark, 
  Landmark, 
  Tractor, 
  Home, 
  HeartPulse, 
  Utensils, 
  Briefcase, 
  Store, 
  Users, 
  ShieldAlert, 
  Flame, 
  Sun, 
  GraduationCap, 
  Wrench, 
  Coins, 
  ShieldCheck,
  X
} from 'lucide-react';
import { CATEGORIES, BENEFICIARY_TYPES } from '../data/schemesData';

// Dynamic icon resolver
const iconMap = {
  Tractor: Tractor,
  Home: Home,
  HeartPulse: HeartPulse,
  Utensils: Utensils,
  Briefcase: Briefcase,
  Store: Store,
  Users: Users,
  ShieldAlert: ShieldAlert,
  Flame: Flame,
  Sun: Sun,
  GraduationCap: GraduationCap,
  Wrench: Wrench,
  Landmark: Landmark,
  ShieldCheck: ShieldCheck,
  Coins: Coins
};

export function SchemeCatalog({ 
  schemes, 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  selectedAudience: propAudience,
  setSelectedAudience: propSetAudience,
  savedSchemes, 
  onToggleSave, 
  onSelectScheme,
  t 
}) {
  const [localAudience, setLocalAudience] = useState("All Groups");
  const selectedAudience = propAudience !== undefined ? propAudience : localAudience;
  const setSelectedAudience = propSetAudience !== undefined ? propSetAudience : setLocalAudience;
  const [sortBy, setSortBy] = useState("default");

  // Filtering logic
  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = 
      !searchQuery ||
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.nameHi.includes(searchQuery) ||
      scheme.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.targetAudience.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      selectedCategory === "All Categories" || 
      scheme.category === selectedCategory;

    const matchesAudience = 
      selectedAudience === "All Groups" || 
      scheme.targetAudience.toLowerCase().includes(selectedAudience.toLowerCase().split(' ')[0]) ||
      (selectedAudience.includes("Farmer") && scheme.category === "Agriculture & Farmers") ||
      (selectedAudience.includes("Houseless") && scheme.category === "Housing & Shelter") ||
      (selectedAudience.includes("Women") && (scheme.category === "Women & Micro-Credit" || scheme.gender === "Female")) ||
      (selectedAudience.includes("Vendor") && scheme.category === "Micro-Credit & Livelihood") ||
      (selectedAudience.includes("Senior") && scheme.category === "Social Security & Pensions") ||
      (selectedAudience.includes("Artisan") && scheme.category === "Artisans & Traditional Crafts") ||
      (selectedAudience.includes("Girl") && scheme.category === "Girl Child & Education");

    return matchesSearch && matchesCategory && matchesAudience;
  }).sort((a, b) => {
    if (sortBy === 'benefit_high') {
      return (b.annualCashValue || 0) - (a.annualCashValue || 0);
    }
    if (sortBy === 'name_asc') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <div className="py-8 bg-slate-50 min-h-screen" id="scheme-finder-results">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-100 inline-block px-2.5 py-0.5 rounded-full mb-1">
              🔍 Live Scheme Finder • SDG 1 Alleviation
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Government Scheme Finder ({filteredSchemes.length} Schemes Available)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Filter by beneficiary group, welfare pillar, or keyword to instantly find genuine central and state welfare benefits.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="default">Default Priority</option>
              <option value="benefit_high">Highest Financial Benefit</option>
              <option value="name_asc">Scheme Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2 px-3 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Beneficiary Audience Filter */}
            <div>
              <select
                value={selectedAudience}
                onChange={(e) => setSelectedAudience(e.target.value)}
                className="w-full py-2 px-3 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {BENEFICIARY_TYPES.map(aud => (
                  <option key={aud} value={aud}>{aud}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Tags */}
          {(selectedCategory !== "All Categories" || selectedAudience !== "All Groups" || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-400 font-medium">Active filters:</span>
              {selectedCategory !== "All Categories" && (
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-200 flex items-center gap-1">
                  <span>{selectedCategory}</span>
                  <button onClick={() => setSelectedCategory("All Categories")}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedAudience !== "All Groups" && (
                <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md border border-purple-200 flex items-center gap-1">
                  <span>{selectedAudience}</span>
                  <button onClick={() => setSelectedAudience("All Groups")}><X className="w-3 h-3" /></button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-200 flex items-center gap-1">
                  <span>"{searchQuery}"</span>
                  <button onClick={() => setSearchQuery("")}><X className="w-3 h-3" /></button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedCategory("All Categories");
                  setSelectedAudience("All Groups");
                  setSearchQuery("");
                }}
                className="text-slate-500 hover:text-slate-800 underline text-[11px] ml-2"
              >
                {t.resetFilter}
              </button>
            </div>
          )}
        </div>

        {/* Scheme Cards Grid */}
        {filteredSchemes.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Schemes Found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
              We couldn't find any schemes matching your query. Try resetting your search filters or browse all categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Categories");
                setSelectedAudience("All Groups");
                setSearchQuery("");
              }}
              className="bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSchemes.map((scheme) => {
              const IconComponent = iconMap[scheme.icon] || Landmark;
              const isSaved = savedSchemes.includes(scheme.id);

              return (
                <div 
                  key={scheme.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition flex flex-col justify-between group overflow-hidden"
                >
                  {/* Card Header Banner */}
                  <div className="p-4 sm:p-5 flex-1">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center border border-blue-200 flex-shrink-0 group-hover:bg-blue-700 group-hover:text-white transition">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-semibold text-slate-500 block leading-tight">
                            {scheme.category}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-0.5">
                            {scheme.badge}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onToggleSave(scheme.id)}
                        className={`p-1.5 rounded-lg border transition ${isSaved ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`}
                        title={isSaved ? "Remove bookmark" : "Bookmark scheme"}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-700 text-blue-700' : ''}`} />
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition line-clamp-2 mb-1">
                      {scheme.name}
                    </h3>
                    <div className="text-xs text-slate-500 font-medium mb-3">
                      {scheme.nameHi}
                    </div>

                    {/* Benefit Highlight Box */}
                    <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 mb-3">
                      <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        {t.benefit}
                      </div>
                      <div className="text-sm font-extrabold text-blue-950 mt-0.5">
                        {scheme.benefitAmount}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 mb-3">
                      {scheme.benefitDetails}
                    </p>

                    {/* Target Audience Pill */}
                    <div className="text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700">Target Group: </span>
                      <span>{scheme.targetAudience}</span>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectScheme(scheme)}
                      className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.viewDetails}</span>
                    </button>

                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] font-semibold text-slate-600 hover:text-blue-800 flex items-center gap-1 bg-white px-2.5 py-1 rounded border border-slate-200 hover:border-slate-300 transition"
                    >
                      <span>{t.applyNow}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
