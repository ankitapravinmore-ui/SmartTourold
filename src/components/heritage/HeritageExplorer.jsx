import React, { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import { useBudget } from '../../context/BudgetContext';
import { useLanguage } from '../../context/LanguageContext';
import { DESTINATIONS } from '../../data/destinations';
import { 
  Landmark, 
  Clock, 
  Navigation, 
  Sparkles, 
  Volume2, 
  VolumeX,
  Layers, 
  Map as MapIcon, 
  Check, 
  AlertTriangle,
  Sun
} from 'lucide-react';
import { HeritageMap } from './HeritageMap';

export function HeritageExplorer() {
  const { trip, addToItinerary, currentWeather } = useTrip();
  const { addHeritageActivity, fmt } = useBudget();
  const { speakText, stopSpeaking, isSpeaking, lang } = useLanguage();

  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'map'
  const [activeFilter, setActiveFilter] = useState('all');
  const [toast, setToast] = useState('');

  const dest = DESTINATIONS[trip.destinationId] || DESTINATIONS.jaipur;
  const spots = dest.spots || [];

  const filteredSpots = spots.filter(s => {
    if (activeFilter === 'gems') return s.hidden_gem;
    if (activeFilter === 'indoor') return !s.weatherOutdoor;
    return true;
  });

  const handleAdd = (spot) => {
    const res = addHeritageActivity(spot);
    setToast(`Added ${spot.name} to itinerary! Deducted ${fmt(res.cost)}.`);
    setTimeout(() => setToast(''), 4000);
  };

  const handleAudio = (spot) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(spot.audioGuide, lang);
    }
  };

  return (
    <div className="pb-24 pt-2 px-3.5 max-w-md mx-auto space-y-3.5 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-extrabold text-[#A855F7] uppercase tracking-wider">
            Module 3 • Culture & Hidden Heritage
          </span>
          <h2 className="text-lg font-black text-white">{dest.name} Heritage Layer</h2>
          <p className="text-[11px] text-slate-400">Curated open data • Offbeat stepwells & craft workshops</p>
        </div>

        <div className="flex rounded-xl bg-[#131D33] p-1 border border-white/10">
          <button
            onClick={() => setViewMode('cards')}
            className={`p-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'cards' ? 'bg-[#0084FF] text-white' : 'text-slate-400'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`p-1.5 rounded-lg text-xs font-bold transition ${
              viewMode === 'map' ? 'bg-[#0084FF] text-white' : 'text-slate-400'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar text-xs font-bold">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition ${
            activeFilter === 'all' ? 'bg-[#0084FF] text-white' : 'bg-[#131D33] text-slate-400 border border-white/5'
          }`}
        >
          All Spots ({spots.length})
        </button>
        <button
          onClick={() => setActiveFilter('gems')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition ${
            activeFilter === 'gems' ? 'bg-[#00D06C] text-slate-950' : 'bg-[#131D33] text-slate-400 border border-white/5'
          }`}
        >
          💎 Hidden Gems Only
        </button>
        <button
          onClick={() => setActiveFilter('indoor')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition flex items-center gap-1 ${
            activeFilter === 'indoor' ? 'bg-amber-500 text-slate-950' : 'bg-[#131D33] text-slate-400 border border-white/5'
          }`}
          title="Indoor museums safe from extreme heat or rain"
        >
          <Sun className="w-3 h-3" />
          <span>Indoor Retreats</span>
        </button>
      </div>

      {toast && (
        <div className="p-2.5 rounded-xl bg-purple-950 border border-purple-600 text-purple-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* VIEW MODE */}
      {viewMode === 'map' ? (
        <HeritageMap spots={filteredSpots} center={dest.centerCoordinates} />
      ) : (
        <div className="space-y-3">
          {filteredSpots.map((spot) => {
            const isAdded = trip.itinerary.some(i => i.id === spot.id);

            return (
              <div key={spot.id} className="rounded-2xl smart-card border border-white/10 overflow-hidden shadow-lg">
                <div className="relative h-36 w-full">
                  <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1729] via-transparent"></div>

                  <div className="absolute top-2 left-2 flex gap-1">
                    {spot.hidden_gem && (
                      <span className="px-2 py-0.5 rounded-full bg-[#00D06C]/90 text-slate-950 text-[9px] font-black uppercase">
                        Hidden Gem
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full bg-slate-900/80 text-cyan-300 text-[9px] font-bold border border-white/10">
                      {spot.category}
                    </span>
                  </div>

                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/80 text-emerald-300 text-[10px] font-black">
                    {spot.entryFee === 0 ? 'FREE ENTRY' : fmt(spot.entryFee)}
                  </span>

                  <div className="absolute bottom-2 left-3 right-3">
                    <h3 className="font-bold text-white text-sm drop-shadow">{spot.name}</h3>
                  </div>
                </div>

                <div className="p-3 space-y-2 text-xs">
                  <p className="text-slate-300 text-[11px] leading-relaxed">{spot.shortDesc}</p>

                  <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-400 pt-1 border-t border-white/5">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">{spot.bestTimeToVisit}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{spot.nearestTransport}</span>
                    </div>
                  </div>

                  {/* Crowd Indicator */}
                  <div className="p-2 rounded-lg bg-[#080C16] border border-white/5 flex justify-between items-center text-[10px]">
                    <span className="text-slate-400">Crowd Level:</span>
                    <span className={`font-bold ${spot.isCrowdedNow ? 'text-rose-400 animate-pulse' : 'text-[#00D06C]'}`}>
                      {spot.crowd_level}
                    </span>
                  </div>

                  {/* Audio & Add Action */}
                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <button
                      onClick={() => handleAudio(spot)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition ${
                        isSpeaking ? 'bg-rose-950 border-rose-500 text-rose-300' : 'bg-[#131D33] border-white/10 text-slate-200'
                      }`}
                    >
                      {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-cyan-400" />}
                      <span>{isSpeaking ? 'Stop Audio' : 'Play Audio Guide'}</span>
                    </button>

                    {isAdded ? (
                      <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-950 border border-purple-600 text-purple-300 font-bold text-[11px]">
                        <Check className="w-3 h-3" /> In Itinerary
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAdd(spot)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#A855F7] hover:bg-purple-700 text-white font-bold text-[11px] shadow"
                      >
                        <Sparkles className="w-3 h-3" /> Add to Trip
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
