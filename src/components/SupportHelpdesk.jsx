import React, { useState } from 'react';
import { 
  PhoneCall, 
  Copy, 
  Check, 
  MapPin, 
  Smartphone, 
  ExternalLink, 
  AlertTriangle
} from 'lucide-react';
import { HELPLINE_DIRECTORY } from '../data/analyticsData';

export function SupportHelpdesk({ t: _t }) {
  const [copiedNumber, setCopiedNumber] = useState(null);

  const handleCopy = (number) => {
    navigator.clipboard.writeText(number);
    setCopiedNumber(number);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen" id="helpline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Official Citizen Assistance & Redressal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Citizen Helpdesks, CSC Locator & Anti-Fraud Advisory
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Direct access to 24x7 toll-free helpline numbers, village Common Service Centres (CSC), and guidance on verifying genuine government communications.
            </p>
          </div>
        </div>

        {/* Anti-Fraud Citizen Advisory Warning */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 mb-8 text-amber-950">
          <div className="flex items-start gap-3.5">
            <AlertTriangle className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="text-base font-bold text-amber-900">
                Beware of Unauthorized Agents, Middlemen & Fake Websites
              </h3>
              <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-amber-900/90 leading-relaxed">
                <li>
                  <strong>Official URL Verification:</strong> All genuine central government websites strictly end with <code>.gov.in</code> or <code>.nic.in</code>. Never enter Aadhaar OTP or bank details on unauthorized <code>.com</code> or <code>.org</code> domains.
                </li>
                <li>
                  <strong>Direct Benefit Transfer (DBT):</strong> Subsidies are credited directly to your bank account via NPCI. No government official will ever ask you to pay advance fees or deposit money to release funds.
                </li>
                <li>
                  <strong>Common Service Centres (CSCs):</strong> Only pay authorized government user charges (maximum ₹20-50) for online forms. Always demand a printed receipt with Application ID.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Official Helpline Grid */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
            Official 24x7 Ministry Helpline Directory
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {HELPLINE_DIRECTORY.map((hl, idx) => (
              <div 
                key={idx}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-blue-900 mb-1">
                    {hl.name}
                  </div>
                  <div className="text-base font-black text-slate-900 flex items-center justify-between gap-2 my-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-blue-950">{hl.number}</span>
                    <button
                      onClick={() => handleCopy(hl.number)}
                      className="text-xs text-slate-500 hover:text-slate-800 p-1 rounded"
                      title="Copy phone number"
                    >
                      {copiedNumber === hl.number ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">
                    {hl.desc}
                  </p>
                </div>

                <div className="text-[11px] font-semibold text-emerald-700 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span>⏰ {hl.time}</span>
                  <a href={`tel:${hl.number.split('/')[0].trim()}`} className="text-blue-700 hover:underline">
                    Call Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Village & CSC Seva Support */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>Nearest Common Service Centre (CSC) Locator</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              India has over 5.5 lakh Common Service Centres (VLEs) operating across Gram Panchayats. They assist senior citizens, illiterate applicants, and rural workers with online forms, biometric eKYC, and PVC card printing.
            </p>
            <a
              href="https://locator.csccloud.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-100 transition"
            >
              <span>Locate CSC in your Gram Panchayat / PIN Code</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-600" />
              <span>UMANG All-in-One Government App</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Access all central and state welfare services directly on your smartphone. Track PF, PM-KISAN, Ayushman Bharat, PMAY, and NFSA ration cards on a single unified platform.
            </p>
            <a
              href="https://web.umang.gov.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition"
            >
              <span>Access Unified UMANG Web Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
