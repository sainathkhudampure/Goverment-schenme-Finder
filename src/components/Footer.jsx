import React from 'react';
import { ExternalLink } from 'lucide-react';

export function Footer({ t: _t }) {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t-4 border-[#FF9933]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800">
          
          {/* Col 1: Portal Overview */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span className="text-xl">🏛️</span>
              <span>भारत सरकार | Govt of India</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              National Poverty Alleviation Portal aligned with United Nations Sustainable Development Goal 1 (SDG-1: No Poverty). Dedicated to transparent, leakage-free delivery of welfare benefits to 1.4 billion citizens.
            </p>
            <div className="inline-block bg-emerald-950 border border-emerald-800 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-semibold">
              VIKSIT BHARAT @ 2047 MISSION
            </div>
          </div>

          {/* Col 2: Priority Welfare Pillars */}
          <div className="space-y-2">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              Priority Welfare Schemes
            </div>
            <ul className="space-y-1.5 text-[11px]">
              <li><a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1"><span>PM-KISAN (Farmer Support)</span><ExternalLink className="w-3 h-3 text-slate-600" /></a></li>
              <li><a href="https://pmayg.nic.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1"><span>PMAY-Gramin (Pucca Housing)</span><ExternalLink className="w-3 h-3 text-slate-600" /></a></li>
              <li><a href="https://pmjay.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1"><span>Ayushman Bharat (PM-JAY Health)</span><ExternalLink className="w-3 h-3 text-slate-600" /></a></li>
              <li><a href="https://nfsa.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1"><span>PM Garib Kalyan Anna Yojana</span><ExternalLink className="w-3 h-3 text-slate-600" /></a></li>
              <li><a href="https://nrega.nic.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1"><span>MGNREGA Rural Employment</span><ExternalLink className="w-3 h-3 text-slate-600" /></a></li>
            </ul>
          </div>

          {/* Col 3: Key Government Portals */}
          <div className="space-y-2">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              Related National Portals
            </div>
            <ul className="space-y-1.5 text-[11px]">
              <li><a href="https://www.myscheme.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1"><span>MyScheme Portal (Unified)</span><ExternalLink className="w-3 h-3 text-slate-600" /></a></li>
              <li><a href="https://dbtbharat.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1"><span>DBT Bharat Official Gateway</span><ExternalLink className="w-3 h-3 text-slate-600" /></a></li>
              <li><a href="https://www.india.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1"><span>National Portal of India</span><ExternalLink className="w-3 h-3 text-slate-600" /></a></li>
              <li><a href="https://niti.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1"><span>NITI Aayog SDG Index</span><ExternalLink className="w-3 h-3 text-slate-600" /></a></li>
              <li><a href="https://www.digitalindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1"><span>Digital India Initiative</span><ExternalLink className="w-3 h-3 text-slate-600" /></a></li>
            </ul>
          </div>

          {/* Col 4: National Helplines */}
          <div className="space-y-2">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              Emergency Toll-Free Help
            </div>
            <div className="space-y-1 text-[11px]">
              <div><strong>Citizen Welfare:</strong> 1800-11-0001</div>
              <div><strong>Ayushman Bharat:</strong> 14555</div>
              <div><strong>Kisan Call Centre:</strong> 1800-180-1551</div>
              <div><strong>Women Helpline:</strong> 181 / 1091</div>
              <div><strong>PMAY Housing:</strong> 1800-11-6446</div>
            </div>
          </div>

        </div>

        {/* NIC & GIGW Bottom Disclaimer */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            Portal content owned, administered, and updated in accordance with the Guidelines for Indian Government Websites (GIGW 3.0).
            <div className="text-slate-400 mt-0.5">
              Hosted securely on National Informatics Centre (NIC) MeghRaj Cloud Infrastructure.
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="hover:text-slate-300 cursor-pointer">Accessibility Statement</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Hyperlinking Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Use</span>
          </div>
        </div>

        <div className="text-center text-[10px] text-slate-600 mt-6 pt-4 border-t border-slate-900">
          © 2026 Government of India. All rights reserved. Last Reviewed and Updated: October 2026.
        </div>
      </div>
    </footer>
  );
}
