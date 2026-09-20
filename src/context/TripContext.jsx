import React, { createContext, useContext, useState, useEffect } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { UserRole } from '../data/schema';

const TripContext = createContext();

const DEFAULT_TRIP = {
  id: 'trip_smarttour_jaipur',
  destinationId: 'jaipur',
  destinationName: 'Jaipur',
  state: 'Rajasthan',
  travelersCount: 3,
  startDate: '2026-09-19',
  endDate: '2026-09-22',
  totalDays: 3,
  currency: 'INR',
  members: [
    { id: 'm1', name: 'You (Admin)', avatar: '👤', isUser: true },
    { id: 'm2', name: 'Aarav Sharma', avatar: '🎒', isUser: false },
    { id: 'm3', name: 'Priya Patel', avatar: '📷', isUser: false }
  ],
  bookedStay: null,
  itinerary: [
    { id: 'spot-panna-meena', name: 'Panna Meena ka Kund', fee: 0, day: 1 }
  ]
};

export function TripProvider({ children }) {
  const [role, setRole] = useState(UserRole.TOURIST); // 'tourist' or 'gov_admin'
  const [trip, setTrip] = useState(() => {
    try {
      const saved = localStorage.getItem('smarttour360_trip');
      return saved ? JSON.parse(saved) : DEFAULT_TRIP;
    } catch {
      return DEFAULT_TRIP;
    }
  });

  const [currency, setCurrency] = useState('INR');
  const [isOffline, setIsOffline] = useState(false);

  // Simulated GPS position (default: Amer Fort approach point to trigger crowd alert)
  const [currentGps, setCurrentGps] = useState({ lat: 26.9855, lng: 75.8513, locationName: 'Approaching Amer Fort Area' });
  const [activeCrowdAlert, setActiveCrowdAlert] = useState(null);

  useEffect(() => {
    localStorage.setItem('smarttour360_trip', JSON.stringify(trip));
  }, [trip]);

  // Initial check: if approaching Amer Fort between 11 AM and 4 PM, trigger crowd diversion
  useEffect(() => {
    const dest = DESTINATIONS[trip.destinationId] || DESTINATIONS.jaipur;
    const crowdedSpot = dest.spots.find(s => s.isCrowdedNow && !s.hidden_gem);
    if (crowdedSpot && !activeCrowdAlert) {
      // Suggest 2-3 nearby low-crowd alternative hidden gems
      const lowCrowdAlternatives = dest.spots.filter(s => s.hidden_gem);
      setActiveCrowdAlert({
        crowdedSpot,
        alternatives: lowCrowdAlternatives,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
  }, [trip.destinationId]);

  const switchDestination = (destId) => {
    const dest = DESTINATIONS[destId] || DESTINATIONS.jaipur;
    setTrip(prev => ({
      ...prev,
      destinationId: dest.id,
      destinationName: dest.name,
      state: dest.state,
      bookedStay: null,
      itinerary: []
    }));
    setActiveCrowdAlert(null);
  };

  const addMember = (name) => {
    const newM = {
      id: `m_${Date.now()}`,
      name,
      avatar: ['🧭', '⛺', '🧳', '🛵', '🎨'][Math.floor(Math.random() * 5)],
      isUser: false
    };
    setTrip(prev => ({
      ...prev,
      members: [...prev.members, newM],
      travelersCount: prev.travelersCount + 1
    }));
  };

  const removeMember = (id) => {
    setTrip(prev => ({
      ...prev,
      members: prev.members.filter(m => m.id !== id),
      travelersCount: Math.max(1, prev.travelersCount - 1)
    }));
  };

  const addToItinerary = (spot) => {
    setTrip(prev => {
      if (prev.itinerary.some(i => i.id === spot.id)) return prev;
      return {
        ...prev,
        itinerary: [...prev.itinerary, { id: spot.id, name: spot.name, fee: spot.entryFee || 0 }]
      };
    });
  };

  const dismissCrowdAlert = () => setActiveCrowdAlert(null);

  const rerouteToAlternative = (altSpot) => {
    addToItinerary(altSpot);
    setActiveCrowdAlert(null);
  };

  const currentWeather = (DESTINATIONS[trip.destinationId] || DESTINATIONS.jaipur).currentWeather;

  return (
    <TripContext.Provider
      value={{
        trip,
        role,
        setRole,
        currency,
        setCurrency,
        isOffline,
        setIsOffline,
        currentGps,
        setCurrentGps,
        activeCrowdAlert,
        dismissCrowdAlert,
        rerouteToAlternative,
        currentWeather,
        switchDestination,
        addMember,
        removeMember,
        addToItinerary,
        setBookedStay: (stay) => setTrip(p => ({ ...p, bookedStay: stay }))
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  return useContext(TripContext);
}
