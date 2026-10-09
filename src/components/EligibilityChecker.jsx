import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Eye, 
  Bookmark, 
  Check, 
  ExternalLink
} from 'lucide-react';

export function EligibilityChecker({ 
  schemes, 
  savedSchemes, 
  onToggleSave, 
  onSelectScheme,
  t: _t 
}) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    age: 38,
    gender: 'Male',
    socialCategory: 'OBC',
    maritalStatus: 'Married',
    isPwD: false,
    area: 'Rural',
    state: 'Uttar Pradesh',
    occupation: 'Small Farmer',
    annualIncome: 'under_1_lakh',
    rationCard: 'BPL',
    needsHousing: true,
    needsHealth: true,
    needsCash: true,
    needsFood: true,
    hasGirlChild: false
  });

  const [hasEvaluated, setHasEvaluated] = useState(false);
  const [matchedSchemes, setMatchedSchemes] = useState([]);

  const statesList = [
    "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Gujarat", 
    "Haryana", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", 
    "Telangana", "Uttar Pradesh", "West Bengal", "Delhi (NCT)"
  ];

  const occupationsList = [
    "Small Farmer",
    "Marginal Farmer",
    "Landless Labor",
    "Daily Wage Worker",
    "Street Vendor",
    "Artisan / Craftsperson",
    "Homemaker",
    "Unemployed",
    "Senior Citizen",
    "Other Informal Worker"
  ];

  const handleEvaluate = () => {
    // Evaluation matching algorithm
    const results = schemes.map(scheme => {
      let score = 0;
      let matchedReasons = [];

      // Age check
      if (profile.age >= scheme.minAge && profile.age <= scheme.maxAge) {
        score += 20;
        matchedReasons.push(`Age (${profile.age} yrs) satisfies scheme eligibility`);
      }

      // Gender check
      if (scheme.gender === 'All' || scheme.gender === profile.gender) {
        score += 15;
      } else if (scheme.gender === 'Female' && profile.gender !== 'Female') {
        score -= 50; // Gender disqualified
      }

      // Area check
      if (scheme.area === 'Both' || scheme.area === profile.area) {
        score += 15;
        matchedReasons.push(`Area (${profile.area}) fits scheme mandate`);
      }

      // Occupation check
      if (scheme.occupations.includes("All occupations") || 
          scheme.occupations.some(occ => occ.toLowerCase().includes(profile.occupation.toLowerCase()) || profile.occupation.toLowerCase().includes(occ.toLowerCase()))) {
        score += 25;
        matchedReasons.push(`Occupation (${profile.occupation}) is actively targeted`);
      }

      // Ration card / Income check
      if (scheme.rationCardTypes.includes("Any") || scheme.rationCardTypes.includes(profile.rationCard)) {
        score += 25;
        matchedReasons.push(`Ration Card (${profile.rationCard}) qualifies for welfare bracket`);
      }

      // Special priority boosts
      if (profile.needsHousing && scheme.category === 'Housing & Shelter') score += 10;
      if (profile.needsHealth && scheme.category === 'Health & Life Cover') score += 10;
      if (profile.hasGirlChild && scheme.category === 'Girl Child & Education') score += 20;
      if (profile.isPwD && scheme.id === 'nsap-pension') score += 25;

      const matchPercentage = Math.min(100, Math.max(30, score));

      return {
        ...scheme,
        matchPercentage,
        matchedReasons,
        isEligible: matchPercentage >= 65
      };
    });

    const eligibleOnly = results
      .filter(r => r.isEligible)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    setMatchedSchemes(eligibleOnly);
    setHasEvaluated(true);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  const totalAnnualPotentialValue = matchedSchemes.reduce((acc, curr) => acc + (curr.annualCashValue || 0), 0);
  const totalHealthCoverage = matchedSchemes.reduce((acc, curr) => acc + (curr.healthCoverValue || 0), 0);

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wizard Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI-Assisted Welfare Eligibility Engine</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Know Your Schemes (पात्रता जांचें)
              </h2>
              <p className="text-sm text-slate-600">
                Answer 3 simple questions to determine which central & state poverty-relief programs you and your family qualify for.
              </p>
            </div>

            {hasEvaluated && (
              <button
                onClick={() => {
                  setHasEvaluated(false);
                  setStep(1);
                }}
                className="flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-900 font-semibold bg-blue-50 px-3 py-2 rounded-lg border border-blue-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Check for Another Person</span>
              </button>
            )}
          </div>

          {/* Stepper Indicator */}
          {!hasEvaluated && (
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs font-medium border-t border-slate-100 pt-4 mb-6">
              <div className={`flex items-center gap-2 p-2 rounded-lg ${step === 1 ? 'bg-blue-50 text-blue-900 border border-blue-200 font-bold' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'}`}>1</span>
                <span className="hidden sm:inline">Personal Profile</span>
                <span className="sm:hidden">Personal</span>
              </div>
              <div className={`flex items-center gap-2 p-2 rounded-lg ${step === 2 ? 'bg-blue-50 text-blue-900 border border-blue-200 font-bold' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'}`}>2</span>
                <span className="hidden sm:inline">Socio-Economic</span>
                <span className="sm:hidden">Economic</span>
              </div>
              <div className={`flex items-center gap-2 p-2 rounded-lg ${step === 3 ? 'bg-blue-50 text-blue-900 border border-blue-200 font-bold' : 'text-slate-500'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 3 ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'}`}>3</span>
                <span className="hidden sm:inline">Priority Needs</span>
                <span className="sm:hidden">Needs</span>
              </div>
            </div>
          )}

          {/* Step 1: Personal Profile */}
          {!hasEvaluated && step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Citizen Age: <span className="text-blue-700 font-bold">{profile.age} Years</span>
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="90" 
                    value={profile.age} 
                    onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                    className="w-full accent-blue-700 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>Child (1-17)</span>
                    <span>Working Age (18-59)</span>
                    <span>Elderly (60+)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Male', 'Female', 'Other'].map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setProfile({ ...profile, gender: g })}
                        className={`py-2 px-3 text-xs rounded-lg border font-medium transition ${profile.gender === g ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Social Category</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {['General', 'OBC', 'SC', 'ST'].map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setProfile({ ...profile, socialCategory: cat })}
                        className={`py-2 text-xs rounded-lg border font-medium transition ${profile.socialCategory === cat ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Person with Disability (PwD / दिव्यांग)?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setProfile({ ...profile, isPwD: true })}
                      className={`py-2 text-xs rounded-lg border font-medium transition ${profile.isPwD ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-700 border-slate-300'}`}
                    >
                      Yes (40%+ Disability)
                    </button>
                    <button
                      type="button"
                      onClick={() => setProfile({ ...profile, isPwD: false })}
                      className={`py-2 text-xs rounded-lg border font-medium transition ${!profile.isPwD ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-700 border-slate-300'}`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-blue-800 hover:bg-blue-900 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg flex items-center gap-1.5 transition"
                >
                  <span>Next: Socio-Economic Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Socio-Economic Data */}
          {!hasEvaluated && step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State / Union Territory</label>
                  <select 
                    value={profile.state} 
                    onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statesList.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Residential Area</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Rural', 'Urban'].map(ar => (
                      <button
                        key={ar}
                        type="button"
                        onClick={() => setProfile({ ...profile, area: ar })}
                        className={`py-2 text-xs rounded-lg border font-medium transition ${profile.area === ar ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-700 border-slate-300'}`}
                      >
                        {ar === 'Rural' ? '🌾 Rural (गांव)' : '🏙️ Urban (शहर)'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Household Occupation</label>
                  <select 
                    value={profile.occupation} 
                    onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {occupationsList.map(occ => (
                      <option key={occ} value={occ}>{occ}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ration Card Category</label>
                  <select 
                    value={profile.rationCard} 
                    onChange={(e) => setProfile({ ...profile, rationCard: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="AAY">Antyodaya Anna Yojana (AAY - Poorest of Poor)</option>
                    <option value="BPL">Below Poverty Line (BPL Card)</option>
                    <option value="PHH">Priority Household (PHH Card)</option>
                    <option value="APL">Above Poverty Line (APL / White Card)</option>
                    <option value="None">No Ration Card currently</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Annual Household Income</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'under_1_lakh', label: 'Under ₹1,00,000 / year (Destitute / BPL)' },
                      { id: '1_to_2_5_lakh', label: '₹1,00,000 - ₹2,50,000 / year' },
                      { id: 'above_2_5_lakh', label: 'Above ₹2,50,000 / year' }
                    ].map(inc => (
                      <button
                        key={inc.id}
                        type="button"
                        onClick={() => setProfile({ ...profile, annualIncome: inc.id })}
                        className={`p-2.5 text-xs text-left rounded-lg border font-medium transition ${profile.annualIncome === inc.id ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-slate-700 border-slate-300'}`}
                      >
                        {inc.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-blue-800 hover:bg-blue-900 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg flex items-center gap-1.5 transition"
                >
                  <span>Next: Priority Needs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Priority Needs */}
          {!hasEvaluated && step === 3 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs text-slate-600 mb-3">
                  Select the key welfare needs and requirements for your household:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'needsHousing', label: 'Pucca House Construction Support (PMAY)', desc: 'Living in kutcha house or unhoused' },
                    { key: 'needsHealth', label: 'Free Hospitalization & Health Shield (Ayushman Bharat)', desc: 'Cashless treatment up to ₹5 Lakh' },
                    { key: 'needsCash', label: 'Direct Cash Income Support (PM-KISAN / Pensions)', desc: 'Direct bank account transfer' },
                    { key: 'needsFood', label: 'Free Monthly Foodgrains Ration (PMGKAY)', desc: 'Free rice, wheat, and coarse grains' },
                    { key: 'hasGirlChild', label: 'Girl Child Savings & Higher Education (Sukanya Samriddhi)', desc: 'Daughter under 10 years of age' }
                  ].map(need => (
                    <label 
                      key={need.key} 
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${profile[need.key] ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                    >
                      <input 
                        type="checkbox" 
                        checked={profile[need.key]} 
                        onChange={(e) => setProfile({ ...profile, [need.key]: e.target.checked })}
                        className="mt-1 accent-emerald-600 w-4 h-4 rounded cursor-pointer"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{need.label}</div>
                        <div className="text-[11px] text-slate-500">{need.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleEvaluate}
                  className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Find My Eligible Schemes Now</span>
                </button>
              </div>
            </div>
          )}

          {/* Results Screen */}
          {hasEvaluated && (
            <div>
              {/* Impact Banner */}
              <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-blue-950 text-white rounded-xl p-5 mb-6 shadow-md border border-emerald-700">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold mb-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>ASSESSMENT COMPLETE • ELIGIBILITY VERIFIED</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      Congratulations! You qualify for {matchedSchemes.length} Government Schemes
                    </h3>
                    <p className="text-xs text-emerald-100 mt-1">
                      Based on: {profile.occupation} • {profile.area} • {profile.state} • {profile.rationCard} Card
                    </p>
                  </div>

                  <div className="flex items-center gap-4 bg-emerald-950/60 p-3 rounded-lg border border-emerald-600/40">
                    <div>
                      <div className="text-[10px] text-emerald-300 uppercase font-semibold">Potential Annual Benefit</div>
                      <div className="text-xl font-black text-amber-300">
                        ₹{totalAnnualPotentialValue.toLocaleString('en-IN')}
                      </div>
                    </div>
                    {totalHealthCoverage > 0 && (
                      <div className="border-l border-emerald-700/60 pl-3">
                        <div className="text-[10px] text-emerald-300 uppercase font-semibold">Health Shield</div>
                        <div className="text-xl font-black text-teal-200">
                          ₹5,00,000 Free
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Matched Schemes List */}
              <div className="space-y-4">
                {matchedSchemes.map((scheme) => {
                  const isSaved = savedSchemes.includes(scheme.id);
                  return (
                    <div 
                      key={scheme.id}
                      className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition relative group"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                            <Check className="w-3 h-3 text-emerald-700" />
                            <span>{scheme.matchPercentage}% Match</span>
                          </span>
                          <span className="text-xs bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded">
                            {scheme.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onToggleSave(scheme.id)}
                            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 font-medium transition ${isSaved ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                            title="Save for later"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-700 text-blue-700' : ''}`} />
                            <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
                          </button>

                          <button
                            onClick={() => onSelectScheme(scheme)}
                            className="bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Guidelines</span>
                          </button>
                        </div>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-900 transition">
                        {scheme.name}
                      </h4>
                      <p className="text-xs text-slate-500 mb-2">
                        {scheme.nameHi} • {scheme.ministry}
                      </p>

                      <p className="text-xs text-slate-700 line-clamp-2 mb-3">
                        {scheme.benefitDetails}
                      </p>

                      {/* Matching reasons pill tags */}
                      <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 flex flex-wrap gap-2 text-[11px]">
                        <span className="text-slate-500 font-semibold">Matched because:</span>
                        {scheme.matchedReasons.map((reason, idx) => (
                          <span key={idx} className="bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                            ✓ {reason}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
                        <div className="font-bold text-emerald-700">
                          Benefit: {scheme.benefitAmount}
                        </div>
                        <a 
                          href={scheme.officialUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-blue-700 hover:underline inline-flex items-center gap-1 text-xs font-medium"
                        >
                          <span>Official Portal ({scheme.officialUrl.replace('https://', '')})</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
