import React from 'react';
import { useTrip } from '../../context/TripContext';
import { UserRole } from '../../data/schema';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  ShieldAlert, 
  Globe2, 
  ArrowDownRight, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Leaf 
} from 'lucide-react';

export function GovDashboard() {
  const { setRole } = useTrip();

  const FOOTFALL_METRICS = [
    { name: 'Amer Fort (Imperial Citadel)', footfall: 14820, capacity: 15000, status: 'Near Capacity (98%)', isSaturated: true },
    { name: 'Panna Meena ka Kund (Hidden Stepwell)', footfall: 4120, capacity: 10000, status: 'Optimal Flow (41%)', isSaturated: false, divertedGains: '+34%' },
    { name: 'Anokhi Museum of Hand Printing', footfall: 1980, capacity: 6000, status: 'Comfortable (33%)', isSaturated: false, divertedGains: '+22%' },
    { name: 'Gaitore Ki Chhatriyan (Marble Cenotaphs)', footfall: 1250, capacity: 8000, status: 'Low Traffic (15%)', isSaturated: false, divertedGains: '+18%' }
  ];

  const SOS_LOGS = [
    { id: 'sos-101', time: '14:22 Today', loc: 'Amer Fort Western Gate', tourist: 'John D. (UK)', type: 'Medical Dehydration', status: 'Resolved (PCR Unit 4 Dispatched)' },
    { id: 'sos-102', time: '11:05 Today', loc: 'Johari Bazaar Crossing', tourist: 'Sneha M. (India)', type: 'Bag Lost / Pickpocket Attempt', status: 'FIR Filed (Tourist Police Paryatan Thana)' }
  ];

  const LANGUAGE_DEMAND = [
    { name: 'Hindi (हिंदी)', pct: 38, count: '14,210 sessions' },
    { name: 'Tamil (தமிழ்)', pct: 26, count: '9,740 sessions' },
    { name: 'Kannada (ಕನ್ನಡ)', pct: 21, count: '7,860 sessions' },
    { name: 'English', pct: 15, count: '5,610 sessions' }
  ];

  return (
    <div className="pb-24 pt-2 px-3.5 max-w-md mx-auto space-y-4 animate-fadeIn">
      {/* Header with Switcher back */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950 via-[#0E1729] to-[#080C16] border border-purple-600/50 shadow-xl space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-extrabold text-purple-400 uppercase tracking-wider">
              Module 9 • Department Administration
            </span>
            <h2 className="text-base font-black text-white flex items-center gap-1.5 mt-0.5">
              <Building2 className="w-4 h-4 text-purple-400" />
              <span>Rajasthan Tourism Dept Portal</span>
            </h2>
            <p className="text-[11px] text-slate-300">
              Department Telemetry • Footfall & Over-Tourism Reduction Analytics
            </p>
          </div>
          <button
            onClick={() => setRole(UserRole.TOURIST)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-white/10"
          >
            Exit to Tourist Mode
          </button>
        </div>

        {/* Highlight Banner on Sustainability & Over-tourism */}
        <div className="p-2.5 rounded-xl bg-purple-900/30 border border-purple-500/30 text-[10px] text-purple-200 flex items-center gap-2">
          <Leaf className="w-4 h-4 text-[#00D06C] shrink-0" />
          <span>
            <strong>Over-Tourism Mitigation Active:</strong> SmartTour360 GPS algorithms have diverted <strong>38% of tourist flow</strong> away from saturated sites to verified local heritage spots.
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-3 rounded-xl smart-card border border-white/5 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-[10px]">
            <span>Total Tourist Footfall</span>
            <Users className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-lg font-black text-white">22,170</div>
          <div className="text-[9px] text-[#00D06C] font-semibold">+14% vs yesterday</div>
        </div>

        <div className="p-3 rounded-xl smart-card border border-white/5 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-[10px]">
            <span>Hidden Gem Diversion</span>
            <TrendingUp className="w-3.5 h-3.5 text-[#00D06C]" />
          </div>
          <div className="text-lg font-black text-[#00D06C]">7,350</div>
          <div className="text-[9px] text-slate-400">Visitors saved from congestion</div>
        </div>
      </div>

      {/* Footfall by Monument */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Live Site Capacity & Footfall</span>
        </h3>

        <div className="space-y-2">
          {FOOTFALL_METRICS.map((site, i) => (
            <div key={i} className="p-3 rounded-xl smart-card border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <div className="font-bold text-white text-[11px] truncate max-w-[200px]">{site.name}</div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-black ${site.isSaturated ? 'bg-rose-950 text-rose-400 border border-rose-600/40' : 'bg-emerald-950 text-[#00D06C]'}`}>
                  {site.status}
                </span>
              </div>

              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Current: <strong className="text-white">{site.footfall.toLocaleString()}</strong> / {site.capacity.toLocaleString()}</span>
                {site.divertedGains && <span className="text-[#00D06C] font-bold">Diverted traffic: {site.divertedGains}</span>}
              </div>

              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${site.isSaturated ? 'bg-rose-500' : 'bg-[#00D06C]'}`}
                  style={{ width: `${Math.min(100, Math.round((site.footfall / site.capacity) * 100))}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Incident & SOS Trigger Monitor */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>Emergency SOS Dispatch Monitor</span>
        </h3>

        <div className="space-y-1.5">
          {SOS_LOGS.map(log => (
            <div key={log.id} className="p-3 rounded-xl smart-card border border-white/5 space-y-1 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-[11px]">{log.tourist}</span>
                <span className="text-[10px] text-slate-400">{log.time}</span>
              </div>
              <div className="text-[10px] text-slate-300">📍 {log.loc} • <span className="text-rose-300">{log.type}</span></div>
              <div className="text-[10px] text-[#00D06C] font-semibold flex items-center gap-1 mt-1 pt-1 border-t border-white/5">
                <CheckCircle className="w-3 h-3" />
                <span>{log.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Language Demand Demographics */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Regional Tourist Language Distribution</span>
        </h3>

        <div className="p-3.5 rounded-xl smart-card border border-white/5 space-y-2 text-xs">
          {LANGUAGE_DEMAND.map((langItem, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-bold text-white">{langItem.name}</span>
                <span className="text-slate-400">{langItem.pct}% ({langItem.count})</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#0084FF] h-full rounded-full" style={{ width: `${langItem.pct}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
