import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';
import { useTrip } from '../../context/TripContext';
import { STAYS_DATA } from '../../data/stays';
import { TRANSPORT_MODES, POPULAR_ROUTES } from '../../data/transport';
import { 
  BedDouble, 
  Car, 
  Leaf, 
  CloudSun, 
  Check, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

export function StayTravelHub() {
  const { trip, currentWeather } = useTrip();
  const { allocations, categorySpent, bookStayItem, bookTransportItem, fmt } = useBudget();

  const [activeTab, setActiveTab] = useState('stays'); // 'stays' or 'transit'
  const [ecoFilterOnly, setEcoFilterOnly] = useState(false);
  const [bookedToast, setBookedToast] = useState('');

  const stays = STAYS_DATA[trip.destinationId] || STAYS_DATA.jaipur;
  const filteredStays = ecoFilterOnly ? stays.filter(s => s.eco_friendly) : stays;

  const stayRem = Math.max(0, (allocations.stay || 0) - (categorySpent.stay || 0));
  const travelRem = Math.max(0, (allocations.travel || 0) - (categorySpent.travel || 0));

  const handleBookStay = (stay, opt) => {
    const res = bookStayItem({
      stayName: stay.name,
      optionTitle: opt.title,
      pricePerNight: opt.pricePerNight,
      nights: 2
    });
    setBookedToast(`Booked ${stay.name}! Deducted ${fmt(res.cost)} from Stay bucket.`);
    setTimeout(() => setBookedToast(''), 4000);
  };

  const handleBookTransit = (route, opt) => {
    const res = bookTransportItem({
      modeName: opt.mode,
      from: route.from,
      to: route.to,
      fare: opt.estFare
    });
    setBookedToast(`Booked ${opt.mode}! Deducted ${fmt(res.fare)} from Travel bucket.`);
    setTimeout(() => setBookedToast(''), 4000);
  };

  return (
    <div className="pb-24 pt-2 px-3.5 max-w-md mx-auto space-y-3.5 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-extrabold text-[#00D06C] uppercase tracking-wider">
            Module 2 • Aggregator & Sustainability
          </span>
          <h2 className="text-lg font-black text-white">Stays & Mobility</h2>
          <p className="text-[11px] text-slate-400">Eco-certified lodging & electric transit with live budget sync</p>
        </div>

        {/* Eco-Friendly Filter Toggle */}
        <button
          onClick={() => setEcoFilterOnly(!ecoFilterOnly)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition ${
            ecoFilterOnly
              ? 'bg-emerald-950 border-[#00D06C] text-[#00D06C]'
              : 'bg-[#131D33] border-white/10 text-slate-400 hover:text-white'
          }`}
          title="Filter for verified eco-certified green stays & EV transit"
        >
          <Leaf className="w-3.5 h-3.5" />
          <span>Eco Only</span>
        </button>
      </div>

      {/* Weather Advisory Banner (Module 9 Weather Integration) */}
      {currentWeather && (
        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5">
          <CloudSun className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-[11px] text-amber-200">
            <span className="font-bold text-amber-300">
              {trip.destinationName} Weather: {currentWeather.temp}°C, {currentWeather.condition}
            </span>
            <p className="text-[10px] text-slate-300 mt-0.5">{currentWeather.advisory}</p>
          </div>
        </div>
      )}

      {/* Live Bucket Status */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2.5 rounded-xl smart-card border border-white/5">
          <span className="text-[9px] text-slate-400 font-semibold uppercase">Stay Bucket</span>
          <div className="text-sm font-black text-white mt-0.5">
            {fmt(stayRem)} <span className="text-[10px] text-slate-400 font-normal">left</span>
          </div>
        </div>
        <div className="p-2.5 rounded-xl smart-card border border-white/5">
          <span className="text-[9px] text-slate-400 font-semibold uppercase">Travel Bucket</span>
          <div className="text-sm font-black text-white mt-0.5">
            {fmt(travelRem)} <span className="text-[10px] text-slate-400 font-normal">left</span>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {bookedToast && (
        <div className="p-2.5 rounded-xl bg-emerald-950 border border-[#00D06C] text-[#00D06C] text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{bookedToast}</span>
        </div>
      )}

      {/* Sub-tab Navigation */}
      <div className="flex rounded-xl bg-[#131D33] p-1 border border-white/10 text-xs font-bold">
        <button
          onClick={() => setActiveTab('stays')}
          className={`flex-1 py-1.5 rounded-lg transition ${
            activeTab === 'stays' ? 'bg-[#0084FF] text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          🏨 Stays ({filteredStays.length})
        </button>
        <button
          onClick={() => setActiveTab('transit')}
          className={`flex-1 py-1.5 rounded-lg transition ${
            activeTab === 'transit' ? 'bg-[#0084FF] text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          🚕 Local Transit & Fares
        </button>
      </div>

      {/* STAYS TAB */}
      {activeTab === 'stays' && (
        <div className="space-y-3">
          {filteredStays.map((stay) => {
            const minOpt = stay.options[0];
            return (
              <div key={stay.id} className="rounded-2xl smart-card border border-white/10 overflow-hidden shadow-lg">
                <div className="relative h-32 w-full">
                  <img src={stay.image} alt={stay.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1729] via-transparent"></div>
                  {stay.eco_friendly && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-emerald-950/90 border border-[#00D06C] text-[#00D06C] text-[9px] font-black flex items-center gap-1">
                      <Leaf className="w-2.5 h-2.5" />
                      <span>{stay.ecoBadge}</span>
                    </span>
                  )}
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/80 text-amber-300 text-[10px] font-bold">
                    ⭐ {stay.rating}
                  </span>
                  <div className="absolute bottom-2 left-3 right-3">
                    <h3 className="font-bold text-white text-sm drop-shadow">{stay.name}</h3>
                    <p className="text-[10px] text-slate-300">{stay.distanceToCenter}</p>
                  </div>
                </div>

                <div className="p-3 space-y-2 text-xs">
                  <div className="flex flex-wrap gap-1">
                    {stay.amenities.slice(0, 3).map((a, i) => (
                      <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-[#080C16] text-slate-300 border border-white/5">
                        {a}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <div>
                      <span className="text-[9px] text-slate-400">From</span>
                      <div className="font-black text-white text-sm">{fmt(minOpt.pricePerNight)} <span className="text-[9px] text-slate-400 font-normal">/ night</span></div>
                    </div>
                    <button
                      onClick={() => handleBookStay(stay, minOpt)}
                      className="px-3 py-1.5 rounded-xl bg-[#0084FF] hover:bg-[#0055D4] text-white font-bold text-[11px] shadow"
                    >
                      Reserve & Deduct
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TRANSIT TAB */}
      {activeTab === 'transit' && (
        <div className="space-y-3">
          {/* Modes */}
          <div className="grid grid-cols-2 gap-2">
            {TRANSPORT_MODES.map((m) => (
              <div key={m.id} className="p-2.5 rounded-xl smart-card border border-white/5 space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${m.eco_friendly ? 'bg-emerald-950 text-[#00D06C] border border-[#00D06C]/40' : 'bg-slate-800 text-slate-300'}`}>
                    {m.badge}
                  </span>
                </div>
                <div className="font-bold text-white text-[11px] mt-1">{m.name}</div>
                <div className="text-[10px] text-cyan-400 font-bold">Base {fmt(m.baseFare)} + {fmt(m.perKmRate)}/km</div>
              </div>
            ))}
          </div>

          {/* Popular Routes Calculator */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Fast Route Booking</h4>
            {POPULAR_ROUTES.map((r) => (
              <div key={r.id} className="p-3 rounded-xl smart-card border border-white/5 space-y-2 text-xs">
                <div className="font-bold text-white text-[11px]">{r.from} → {r.to}</div>
                <div className="space-y-1.5">
                  {r.options.map((opt, i) => (
                    <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-[#080C16] border border-white/5">
                      <div className="flex items-center gap-1.5">
                        {opt.eco && <Zap className="w-3 h-3 text-[#00D06C]" />}
                        <span className="text-[11px] text-slate-200 font-medium">{opt.mode}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-amber-400 text-xs">{fmt(opt.estFare)}</span>
                        <button
                          onClick={() => handleBookTransit(r, opt)}
                          className="px-2 py-1 rounded bg-[#131D33] hover:bg-slate-700 text-slate-200 text-[10px] font-bold border border-white/10"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
