import React, { useEffect, useRef } from 'react';
import { STAYS_DATA } from '../../data/stays';
import { EMERGENCY_SERVICES } from '../../data/emergency';
import { useTrip } from '../../context/TripContext';

export function HeritageMap({ spots, center }) {
  const mapRef = useRef(null);
  const leafletInstance = useRef(null);
  const { trip } = useTrip();

  useEffect(() => {
    if (!mapRef.current || !window.L) return;

    if (leafletInstance.current) {
      leafletInstance.current.remove();
    }

    const map = window.L.map(mapRef.current).setView(center || [26.9124, 75.7873], 12);
    leafletInstance.current = map;

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    const pin = (color, emoji) => window.L.divIcon({
      html: `<div style="background:${color}; width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid white; box-shadow:0 3px 6px rgba(0,0,0,0.5); font-size:12px;">${emoji}</div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });

    // 1. Spots
    spots.forEach(s => {
      if (s.coordinates) {
        window.L.marker(s.coordinates, { icon: pin(s.hidden_gem ? '#00D06C' : '#A855F7', s.hidden_gem ? '💎' : '🏛️') })
          .addTo(map)
          .bindPopup(`<b>${s.name}</b><br><span style="color:#A855F7">${s.category}</span><br>Fee: ${s.entryFee === 0 ? 'Free' : '₹' + s.entryFee}`);
      }
    });

    // 2. Stays
    const stays = STAYS_DATA[trip.destinationId] || STAYS_DATA.jaipur;
    stays.forEach(st => {
      if (st.coordinates) {
        window.L.marker(st.coordinates, { icon: pin('#0084FF', '🏨') })
          .addTo(map)
          .bindPopup(`<b>${st.name}</b><br>⭐ ${st.rating}`);
      }
    });

    // 3. Hospitals
    const hosp = EMERGENCY_SERVICES.jaipur?.hospitals || [];
    hosp.forEach(h => {
      if (h.coordinates) {
        window.L.marker(h.coordinates, { icon: pin('#EF4444', '🏥') })
          .addTo(map)
          .bindPopup(`<b>${h.name}</b><br>📞 ${h.emergencyPhone}`);
      }
    });

    return () => {
      if (leafletInstance.current) {
        leafletInstance.current.remove();
        leafletInstance.current = null;
      }
    };
  }, [spots, center, trip.destinationId]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[11px] text-slate-400 px-1">
        <span>🟢 Hidden Gems</span>
        <span>🟣 Major Sites</span>
        <span>🔵 Stays</span>
        <span>🔴 Emergency</span>
      </div>
      <div ref={mapRef} className="w-full h-80 rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-slate-900"></div>
    </div>
  );
}
