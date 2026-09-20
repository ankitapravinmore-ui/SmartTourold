import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import { EMERGENCY_SERVICES } from '../../data/emergency';
import { 
  ShieldAlert, 
  PhoneCall, 
  MapPin, 
  WifiOff, 
  Wifi, 
  Send, 
  HeartPulse, 
  Building2, 
  Copy, 
  Check, 
  AlertOctagon 
} from 'lucide-react';

export function EmergencyHub() {
  const { trip, isOffline, setIsOffline, currentGps } = useTrip();
  const [sosActive, setSosActive] = useState(false);
  const [copied, setCopied] = useState(false);

  const emergencyData = EMERGENCY_SERVICES[trip.destinationId] || EMERGENCY_SERVICES.jaipur;

  const getSmsBody = () => {
    const coordStr = `${currentGps.lat},${currentGps.lng}`;
    return encodeURIComponent(
      `SOS EMERGENCY! Tourist distress at ${trip.destinationName}. Live GPS: https://maps.google.com/?q=${coordStr}. Immediate assistance required.`
    );
  };

  const handleCopyGps = () => {
    navigator.clipboard.writeText(`https://maps.google.com/?q=${currentGps.lat},${currentGps.lng}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="pb-24 pt-2 px-3.5 max-w-md mx-auto space-y-4 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-[10px] font-extrabold text-rose-400 uppercase tracking-wider">
          Module 4 • Emergency & Safety Hub
        </span>
        <h2 className="text-lg font-black text-white">One-Tap Safety SOS</h2>
        <p className="text-[11px] text-slate-400">Offline-first local cache • Broadcasts GPS coordinates to 112</p>
      </div>

      {/* Offline Status */}
      <div className={`p-3 rounded-2xl border flex justify-between items-center ${isOffline ? 'bg-rose-950/60 border-rose-500 text-rose-200' : 'smart-card border-white/10 text-slate-200'}`}>
        <div className="flex items-center gap-2.5">
          {isOffline ? <WifiOff className="w-4 h-4 text-rose-400 animate-pulse" /> : <Wifi className="w-4 h-4 text-[#00D06C]" />}
          <div>
            <div className="text-xs font-bold">{isOffline ? 'Offline Emergency Mode' : 'Online Telemetry Active'}</div>
            <div className="text-[9px] text-slate-400">PWA Service Worker caches hospital & police contacts</div>
          </div>
        </div>
        <button
          onClick={() => setIsOffline(!isOffline)}
          className="text-[10px] font-bold px-2 py-1 rounded-lg bg-[#131D33] border border-white/10 text-amber-300"
        >
          {isOffline ? 'Go Online' : 'Simulate Offline'}
        </button>
      </div>

      {/* High-Impact SOS Button */}
      <div className="rounded-2xl bg-gradient-to-br from-rose-950 via-[#0E1729] to-[#080C16] border-2 border-rose-600/70 p-5 text-center space-y-3 shadow-2xl relative overflow-hidden">
        <div className="text-[11px] font-black text-rose-400 uppercase tracking-wider flex items-center justify-center gap-1.5 animate-pulse">
          <AlertOctagon className="w-4 h-4" />
          <span>Emergency Tourist Beacon</span>
        </div>

        <button
          onClick={() => setSosActive(true)}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-base shadow-xl shadow-rose-600/40 active:scale-95 transition flex items-center justify-center gap-2"
        >
          <ShieldAlert className="w-6 h-6 animate-pulse" />
          <span>TRIGGER ONE-TAP SOS</span>
        </button>

        <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-rose-900/40">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-rose-400" />
            <span>GPS: {currentGps.lat}° N, {currentGps.lng}° E</span>
          </span>
          <button onClick={handleCopyGps} className="text-slate-300 hover:text-white font-bold flex items-center gap-1">
            {copied ? <Check className="w-3 h-3 text-[#00D06C]" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy Link'}</span>
          </button>
        </div>
      </div>

      {/* SOS Modal */}
      {sosActive && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1729] border-2 border-rose-500 rounded-3xl p-5 max-w-sm w-full space-y-3 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-600/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="font-black text-white text-base">EMERGENCY ASSISTANCE TRIGGERED</h3>
            <p className="text-[11px] text-slate-300">Choose quick dispatch. GPS coordinates pre-packaged.</p>

            <div className="space-y-2 text-left pt-2">
              <a href="tel:112" className="flex justify-between items-center p-3 rounded-xl bg-rose-600 text-white font-bold text-xs">
                <span className="flex items-center gap-2"><PhoneCall className="w-4 h-4" /> Call 112 (National Helpline)</span>
                <span className="text-[9px] bg-black/30 px-1.5 py-0.5 rounded">Toll-free</span>
              </a>
              <a href={`tel:${emergencyData.police[0]?.phone || '112'}`} className="flex justify-between items-center p-3 rounded-xl bg-slate-800 text-slate-100 font-bold text-xs border border-white/10">
                <span className="flex items-center gap-2"><PhoneCall className="w-4 h-4 text-cyan-400" /> Call Jaipur Tourist Police</span>
                <span className="text-[9px] text-slate-400">Desk</span>
              </a>
              <a href={`sms:112?body=${getSmsBody()}`} className="flex justify-between items-center p-3 rounded-xl bg-slate-800 text-slate-100 font-bold text-xs border border-white/10">
                <span className="flex items-center gap-2"><Send className="w-4 h-4 text-[#00D06C]" /> Dispatch GPS SMS</span>
                <span className="text-[9px] text-[#00D06C]">Pre-filled</span>
              </a>
            </div>

            <button onClick={() => setSosActive(false)} className="w-full py-2 bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold rounded-xl">
              Dismiss Modal
            </button>
          </div>
        </div>
      )}

      {/* Helplines */}
      <div className="grid grid-cols-2 gap-2">
        {EMERGENCY_SERVICES.nationalHelplines.map(h => (
          <a key={h.id} href={`tel:${h.number}`} className="p-2.5 rounded-xl smart-card border border-white/5 flex justify-between items-center text-xs">
            <div>
              <div className="font-bold text-white text-[11px] truncate max-w-[100px]">{h.title}</div>
              <div className="text-[10px] text-amber-400 font-bold">📞 {h.number}</div>
            </div>
            <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
          </a>
        ))}
      </div>

      {/* Hospitals */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
          <span>Nearest 24/7 Trauma Hospitals</span>
        </h4>
        {emergencyData.hospitals.map(h => (
          <div key={h.id} className="p-3 rounded-xl smart-card border border-white/5 flex justify-between items-center text-xs">
            <div>
              <div className="font-bold text-white text-[11px]">{h.name}</div>
              <div className="text-[10px] text-rose-300">{h.type} • {h.distance}</div>
              <div className="text-[9px] text-slate-400 mt-0.5">{h.address}</div>
            </div>
            <a href={`tel:${h.emergencyPhone}`} className="p-2 rounded-lg bg-rose-600 text-white font-bold text-xs shrink-0">
              <PhoneCall className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
