import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import { useLanguage } from '../../context/LanguageContext';
import { CURRENCIES } from '../../data/currency';
import { DESTINATIONS } from '../../data/destinations';
import { UserRole } from '../../data/schema';
import { 
  Wifi, 
  WifiOff, 
  MapPin, 
  Globe, 
  Award, 
  ShieldAlert, 
  UserCheck, 
  Building2,
  DollarSign
} from 'lucide-react';

export function Navbar({ onOpenEvaluatorModal }) {
  const { 
    trip, 
    role, 
    setRole, 
    currency, 
    setCurrency, 
    isOffline, 
    setIsOffline, 
    switchDestination 
  } = useTrip();

  const { lang, setLang, availableLanguages } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-[#080C16]/95 backdrop-blur-md border-b border-white/10 px-3.5 py-2.5">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* User Logo + SmartTour360 Brand */}
        <div className="flex items-center gap-2">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-md shadow-cyan-500/20 border border-cyan-400/40 shrink-0 bg-[#0E1729]">
            <img
              src="/logo.jpg"
              alt="SmartTour360 Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback stylized glyph if image path is unavailable
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-white flex items-center gap-0.5">
                <span className="text-[#00C8FF]">Smart</span>
                <span className="text-[#0084FF]">Tour</span>
                <span className="text-[#00D06C]">360</span>
              </span>
              <span className="text-[9px] px-1 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 font-bold uppercase">
                SIH26204
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-400">
              <MapPin className="w-2.5 h-2.5 text-amber-400 shrink-0" />
              <select
                value={trip.destinationId}
                onChange={(e) => switchDestination(e.target.value)}
                className="bg-transparent font-medium text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="jaipur" className="bg-slate-900 text-white">Jaipur (Pink City)</option>
                <option value="varanasi" className="bg-slate-900 text-white">Varanasi (Kashi)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Currency Switcher */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-[#131D33] border border-white/10 text-[11px] font-bold text-amber-400 rounded-lg px-1.5 py-1 focus:outline-none"
            title="Switch Currency (USD/EUR/INR)"
          >
            {Object.keys(CURRENCIES).map((c) => (
              <option key={c} value={c} className="bg-slate-900 text-white">
                {CURRENCIES[c].symbol} {c}
              </option>
            ))}
          </select>

          {/* Language Selector (EN, HI, TA, KN) */}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-[#131D33] border border-white/10 text-[11px] font-bold text-slate-200 rounded-lg px-1.5 py-1 focus:outline-none"
            title="Language: EN, HI, TA, KN"
          >
            {availableLanguages.map((l) => (
              <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                {l.flag} {l.code.toUpperCase()}
              </option>
            ))}
          </select>

          {/* Role Toggle: Tourist vs Gov Admin */}
          <button
            onClick={() => setRole(role === UserRole.TOURIST ? UserRole.GOV_ADMIN : UserRole.TOURIST)}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition flex items-center gap-1 ${
              role === UserRole.GOV_ADMIN
                ? 'bg-purple-950/80 border-purple-600 text-purple-200'
                : 'bg-[#131D33] border-white/10 text-slate-300 hover:text-white'
            }`}
            title="Toggle between Tourist View and Government Admin Portal"
          >
            {role === UserRole.GOV_ADMIN ? (
              <>
                <Building2 className="w-3 h-3 text-purple-400" />
                <span>Gov</span>
              </>
            ) : (
              <>
                <UserCheck className="w-3 h-3 text-cyan-400" />
                <span>Tourist</span>
              </>
            )}
          </button>

          {/* Offline Toggle */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`p-1.5 rounded-lg border transition ${
              isOffline
                ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-emerald-950/40 border-emerald-700/60 text-emerald-400'
            }`}
            title="Click to test offline PWA cache"
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
          </button>

          {/* Evaluator Defense Kit */}
          <button
            onClick={onOpenEvaluatorModal}
            className="p-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-md hover:from-amber-600 hover:to-orange-600"
            title="Jury Defense Q&A"
          >
            <Award className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
