import React from 'react';
import { 
  Globe2, 
  Bookmark, 
  Sun, 
  Moon, 
  PhoneCall, 
  Layers, 
  Calculator, 
  FileCheck2, 
  BarChart3, 
  Search,
  User
} from 'lucide-react';

export function Header({ 
  currentLang, 
  setLang, 
  t, 
  fontSize, 
  setFontSize, 
  highContrast, 
  setHighContrast, 
  savedCount, 
  onOpenSaved,
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onOpenDashboard
}) {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'bn', label: 'বাংলা' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b border-slate-200">
      {/* Official Government of India Tricolor Ribbon */}
      <div className="h-1.5 w-full grid grid-cols-3">
        <div className="bg-[#FF9933]"></div>
        <div className="bg-white border-y border-slate-200"></div>
        <div className="bg-[#138808]"></div>
      </div>

      {/* GIGW Accessibility & Utility Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 sm:px-8 py-1.5 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-amber-400">🇮🇳 भारत सरकार</span>
            <span className="text-slate-400">|</span>
            <span className="font-medium">Government of India</span>
          </div>
          <span className="hidden md:inline text-slate-500">•</span>
          <div className="hidden md:flex items-center gap-1.5 text-slate-300">
            <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-800">
              UN SDG-1 NO POVERTY
            </span>
            <span className="text-slate-400">Viksit Bharat @ 2047 Target</span>
          </div>
        </div>

        {/* Accessibility & Language Controls */}
        <div className="flex items-center gap-3">
          {/* Font Size Adjusters */}
          <div className="flex items-center bg-slate-800 rounded px-1.5 py-0.5 border border-slate-700">
            <span className="text-[10px] text-slate-400 mr-1 hidden sm:inline">Text:</span>
            <button 
              onClick={() => setFontSize('sm')} 
              className={`px-1.5 py-0.5 hover:text-white rounded ${fontSize === 'sm' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
              title="Decrease Font Size (A-)"
            >
              A-
            </button>
            <button 
              onClick={() => setFontSize('md')} 
              className={`px-1.5 py-0.5 hover:text-white rounded ${fontSize === 'md' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
              title="Standard Font Size (A)"
            >
              A
            </button>
            <button 
              onClick={() => setFontSize('lg')} 
              className={`px-1.5 py-0.5 hover:text-white rounded ${fontSize === 'lg' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
              title="Increase Font Size (A+)"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button 
            onClick={() => setHighContrast(!highContrast)}
            className="flex items-center gap-1 px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 border border-slate-700"
            title="Toggle High Contrast"
          >
            {highContrast ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[11px]">{highContrast ? 'Standard' : 'Contrast'}</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            <Globe2 className="w-3.5 h-3.5 text-blue-400" />
            <select 
              value={currentLang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              {languages.map(l => (
                <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Branding Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3.5">
          {/* Ashoka Stambh Emblem Representation */}
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 text-amber-100 rounded-full shadow-inner border-2 border-amber-500/50 flex-shrink-0">
            <div className="text-center font-serif text-lg leading-none font-bold">
              <span>🏛️</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                SDG-1 NO POVERTY
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">
                MyScheme & DBT Bharat Unified
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              {t.portalName}
            </h1>
            <p className="text-xs text-slate-600 hidden sm:block">
              {t.subTitle}
            </p>
          </div>
        </div>

        {/* Quick Citizen Action Badges */}
        <div className="flex items-center gap-2.5">
          {currentUser ? (
            <button
              onClick={onOpenDashboard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900 text-white hover:bg-blue-800 text-xs font-bold transition shadow-sm"
              title="Open Citizen Dashboard"
            >
              <User className="w-3.5 h-3.5 text-amber-300" />
              <span>{currentUser.fullName}</span>
              <span className="text-[10px] bg-blue-800 px-1.5 py-0.5 rounded text-blue-200 hidden sm:inline">
                {currentUser.citizenId}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-emerald-200" />
              <span>Citizen Sign In / Register</span>
            </button>
          )}

          <button
            onClick={onOpenSaved}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-medium transition"
          >
            <Bookmark className="w-4 h-4 text-blue-700" />
            <span className="hidden sm:inline">{t.savedSchemes}</span>
            <span className="bg-blue-600 text-white rounded-full text-[11px] px-1.5 py-0.2 font-bold ml-0.5">
              {savedCount}
            </span>
          </button>

          <a 
            href="#helpline"
            onClick={() => setActiveTab('support')}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium hover:bg-emerald-100 transition"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
            <span>1800-11-0001</span>
          </a>
        </div>
      </div>

      {/* Navigation Ribbon Tabs */}
      <nav className="bg-blue-950 text-white px-4 sm:px-8 border-t border-blue-900 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none text-xs sm:text-sm font-medium">
          <button 
            onClick={() => setActiveTab('explore')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md whitespace-nowrap transition ${activeTab === 'explore' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-200 hover:bg-blue-900'}`}
          >
            <Layers className="w-4 h-4" />
            <span>{t.allSchemes}</span>
          </button>

          <button 
            onClick={() => setActiveTab('eligibility')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md whitespace-nowrap transition ${activeTab === 'eligibility' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-200 hover:bg-blue-900'}`}
          >
            <Search className="w-4 h-4" />
            <span>{t.checkEligibility}</span>
          </button>

          <button 
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md whitespace-nowrap transition ${activeTab === 'calculator' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-200 hover:bg-blue-900'}`}
          >
            <Calculator className="w-4 h-4" />
            <span>{t.calculateBenefits}</span>
          </button>

          <button 
            onClick={() => setActiveTab('checklist')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md whitespace-nowrap transition ${activeTab === 'checklist' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-200 hover:bg-blue-900'}`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>{t.documentChecklist}</span>
          </button>

          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md whitespace-nowrap transition ${activeTab === 'analytics' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-200 hover:bg-blue-900'}`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{t.analytics}</span>
          </button>

          <button 
            onClick={() => setActiveTab('support')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md whitespace-nowrap transition ${activeTab === 'support' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-200 hover:bg-blue-900'}`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t.helplines}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
