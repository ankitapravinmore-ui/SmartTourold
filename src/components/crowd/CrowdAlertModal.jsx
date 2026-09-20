import React from 'react';
import { useTrip } from '../../context/TripContext';
import { Compass, AlertTriangle, ArrowRight, X, Sparkles, Clock, Check } from 'lucide-react';

export function CrowdAlertModal() {
  const { activeCrowdAlert, dismissCrowdAlert, rerouteToAlternative } = useTrip();

  if (!activeCrowdAlert) return null;

  const { crowdedSpot, alternatives, timestamp } = activeCrowdAlert;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#0E1729] border-2 border-amber-500/80 rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl"></div>

        {/* Top Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 animate-bounce" />
            <span>GPS Proactive Crowd Alert</span>
          </div>
          <button
            onClick={dismissCrowdAlert}
            className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        {/* Alert Notice */}
        <div className="space-y-1">
          <h3 className="text-base font-black text-white leading-tight">
            High Tourist Footfall at {crowdedSpot.name}
          </h3>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Current time window: <strong className="text-amber-300">{crowdedSpot.crowd_level}</strong>. Estimated wait time is ~45–60 mins.
          </p>
        </div>

        {/* Low-Crowd Alternatives (Over-Tourism Rerouting) */}
        <div className="space-y-2 pt-1 border-t border-white/10">
          <span className="text-[10px] font-bold text-[#00D06C] uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Recommended Low-Crowd Alternatives</span>
          </span>

          <div className="space-y-2">
            {alternatives.slice(0, 2).map((alt) => (
              <div
                key={alt.id}
                className="p-3 rounded-2xl smart-card border border-[#00D06C]/30 hover:border-[#00D06C] transition space-y-1.5"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-white text-xs">{alt.name}</h4>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-[#00D06C] font-black uppercase">
                    Low Crowd
                  </span>
                </div>
                <p className="text-[10px] text-slate-300">{alt.shortDesc}</p>
                <div className="flex justify-between items-center pt-1 text-[10px]">
                  <span className="text-slate-400">{alt.nearestTransport}</span>
                  <button
                    onClick={() => rerouteToAlternative(alt)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#00D06C] hover:bg-emerald-400 text-slate-950 font-bold shadow"
                  >
                    <span>Reroute</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={dismissCrowdAlert}
          className="w-full py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
        >
          Continue to {crowdedSpot.name} Anyway
        </button>
      </div>
    </div>
  );
}
