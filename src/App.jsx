import React, { useState } from 'react';
import { SCHEMES_DATA } from './data/schemesData';
import { TRANSLATIONS } from './data/translations';
import { apiService } from './services/api';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SchemeCatalog } from './components/SchemeCatalog';
import { EligibilityChecker } from './components/EligibilityChecker';
import { ImpactCalculator } from './components/ImpactCalculator';
import { DocumentChecklist } from './components/DocumentChecklist';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { SupportHelpdesk } from './components/SupportHelpdesk';
import { SchemeDetailModal } from './components/SchemeDetailModal';
import { SavedSchemesDrawer } from './components/SavedSchemesDrawer';
import { AuthModal } from './components/AuthModal';
import { CitizenDashboardModal } from './components/CitizenDashboardModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [fontSize, setFontSize] = useState('md');
  const [highContrast, setHighContrast] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedAudience, setSelectedAudience] = useState('All Groups');
  const [savedSchemes, setSavedSchemes] = useState(['pm-kisan', 'pmay-g', 'pmjay-ayushman']);
  const [selectedSchemeModal, setSelectedSchemeModal] = useState(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Authentication & Citizen Profile State
  const [currentUser, setCurrentUser] = useState(() => apiService.getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

  const toggleSaveScheme = (id) => {
    if (savedSchemes.includes(id)) {
      setSavedSchemes(savedSchemes.filter(s => s !== id));
    } else {
      setSavedSchemes([...savedSchemes, id]);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setTimeout(() => {
      const el = document.getElementById('main-content');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleQuickCategorySelect = (category) => {
    setSelectedCategory(category);
    handleTabChange('explore');
    setTimeout(() => {
      const el = document.getElementById('scheme-finder-results');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleQuickFinderApply = (category, audience) => {
    setSelectedCategory(category);
    setSelectedAudience(audience);
    handleTabChange('explore');
    setTimeout(() => {
      const el = document.getElementById('scheme-finder-results');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    apiService.logout();
    setCurrentUser(null);
  };

  // Font size multiplier class
  const getFontSizeClass = () => {
    if (fontSize === 'sm') return 'text-[0.92rem]';
    if (fontSize === 'lg') return 'text-[1.12rem]';
    return 'text-base';
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${getFontSizeClass()} ${highContrast ? 'bg-black text-white contrast-125' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Official Top & Accessibility Navigation */}
      <Header
        currentLang={currentLang}
        setLang={setCurrentLang}
        t={t}
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        savedCount={savedSchemes.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenDashboard={() => setIsDashboardModalOpen(true)}
      />

      {/* Hero Section or Compact Active Tab Banner */}
      {activeTab === 'explore' ? (
        <Hero
          t={t}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setActiveTab={handleTabChange}
          onQuickCategorySelect={handleQuickCategorySelect}
          onQuickFinderApply={handleQuickFinderApply}
        />
      ) : (
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white py-5 px-4 sm:px-8 border-b border-blue-800 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <div>
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  SDG 1: NO POVERTY • GOVERNMENT SCHEME PLATFORM
                </div>
                <h2 className="text-lg sm:text-2xl font-black text-white">
                  {activeTab === 'eligibility' && 'Interactive Scheme Finder Wizard (पात्रता जांचें)'}
                  {activeTab === 'calculator' && 'DBT Benefit & Financial Impact Calculator (लाभ गणना)'}
                  {activeTab === 'checklist' && 'Document Checklist & Application Readiness (दस्तावेज़ सूची)'}
                  {activeTab === 'analytics' && 'SDG 1 Impact & Leakage-Free Analytics Dashboard (डैशबोर्ड)'}
                  {activeTab === 'support' && 'Citizen Helpdesk, CSC Locator & Anti-Fraud Advisory (हेल्पलाइन)'}
                </h2>
              </div>
            </div>

            <button
              onClick={() => handleTabChange('explore')}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-200 hover:text-white bg-slate-800/90 hover:bg-slate-700 px-3.5 py-2 rounded-lg border border-slate-700 shadow-sm transition cursor-pointer"
            >
              <span>← All Schemes Directory</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Tab Content */}
      <main className="flex-1" id="main-content">
        {activeTab === 'explore' && (
          <SchemeCatalog
            schemes={SCHEMES_DATA}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedAudience={selectedAudience}
            setSelectedAudience={setSelectedAudience}
            savedSchemes={savedSchemes}
            onToggleSave={toggleSaveScheme}
            onSelectScheme={(scheme) => setSelectedSchemeModal(scheme)}
            t={t}
          />
        )}

        {activeTab === 'eligibility' && (
          <EligibilityChecker
            schemes={SCHEMES_DATA}
            savedSchemes={savedSchemes}
            onToggleSave={toggleSaveScheme}
            onSelectScheme={(scheme) => setSelectedSchemeModal(scheme)}
            t={t}
          />
        )}

        {activeTab === 'calculator' && (
          <ImpactCalculator
            schemes={SCHEMES_DATA}
            t={t}
          />
        )}

        {activeTab === 'checklist' && (
          <DocumentChecklist
            schemes={SCHEMES_DATA}
            t={t}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard
            t={t}
          />
        )}

        {activeTab === 'support' && (
          <SupportHelpdesk
            t={t}
          />
        )}
      </main>

      {/* Scheme Detail Modal */}
      {selectedSchemeModal && (
        <SchemeDetailModal
          scheme={selectedSchemeModal}
          onClose={() => setSelectedSchemeModal(null)}
          isSaved={savedSchemes.includes(selectedSchemeModal.id)}
          onToggleSave={toggleSaveScheme}
          t={t}
        />
      )}

      {/* Saved Bookmarks Drawer */}
      <SavedSchemesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedSchemes={savedSchemes}
        schemes={SCHEMES_DATA}
        onToggleSave={toggleSaveScheme}
        onSelectScheme={(scheme) => setSelectedSchemeModal(scheme)}
        t={t}
      />

      {/* Citizen Authentication Modal (Sign In / Sign Up) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Citizen Profile Dashboard Modal */}
      <CitizenDashboardModal
        isOpen={isDashboardModalOpen}
        onClose={() => setIsDashboardModalOpen(false)}
        user={currentUser}
        onLogout={handleLogout}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        savedCount={savedSchemes.length}
      />

      {/* National Portal Footer */}
      <Footer t={t} />

    </div>
  );
}
