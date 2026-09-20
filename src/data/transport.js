export const TRANSPORT_MODES = [
  {
    id: 'e_rickshaw',
    name: 'Shared Electric E-Rickshaw',
    badge: '100% Zero Emission',
    icon: 'Zap',
    eco_friendly: true,
    ecoBadge: 'Clean EV Mobility',
    baseFare: 10,
    perKmRate: 5,
    description: 'Zero carbon footprint for inner Walled City routes (Johari Bazaar / Hawa Mahal)',
    timings: '07:00 AM - 10:00 PM',
    dataSource: 'Municipal Corporation Electric Feeder Tariff'
  },
  {
    id: 'metro',
    name: 'Jaipur Metro (Pink Line)',
    badge: 'Green Electric Rail',
    icon: 'Train',
    eco_friendly: true,
    ecoBadge: 'Solar-Powered Stations (JMRC)',
    baseFare: 12,
    perKmRate: 4,
    description: 'Mansarovar to Badi Chaupar via Railway Station & Sindhi Camp',
    timings: '06:20 AM - 09:49 PM (Every 10 mins)',
    dataSource: 'Jaipur Metro Rail Corporation GTFS Schedule'
  },
  {
    id: 'auto_rickshaw',
    name: 'Prepaid Auto-Rickshaw (CNG)',
    badge: 'Official Tariff',
    icon: 'Car',
    eco_friendly: false,
    ecoBadge: null,
    baseFare: 30,
    perKmRate: 15,
    description: 'Official Rajasthan Transport Department (RTO) prepaid rate card',
    timings: '24/7 Stand across city',
    dataSource: 'Rajasthan RTO Tariff Card'
  },
  {
    id: 'app_cab',
    name: 'Ola / Uber Mini Cab',
    badge: 'On-Demand AC',
    icon: 'Compass',
    eco_friendly: false,
    ecoBadge: null,
    baseFare: 60,
    perKmRate: 18,
    description: 'Doorstep AC cab with live GPS tracking & safety verification',
    timings: '24/7 App Dispatch',
    dataSource: 'Aggregated App API Estimate Formula'
  }
];

export const POPULAR_ROUTES = [
  {
    id: 'route-1',
    from: 'Sindhi Camp / Central Hostels',
    to: 'Amer Fort & Panna Meena Kund',
    distanceKm: 11.5,
    options: [
      { mode: 'Shared Electric Auto + E-Feeder', estFare: 60, estMinutes: 40, eco: true },
      { mode: 'Prepaid Auto-Rickshaw', estFare: 210, estMinutes: 32, eco: false },
      { mode: 'Ola / Uber Mini Cab', estFare: 290, estMinutes: 28, eco: false }
    ]
  },
  {
    id: 'route-2',
    from: 'Jaipur Junction Railway Station',
    to: 'Hawa Mahal & Johari Bazaar',
    distanceKm: 4.8,
    options: [
      { mode: 'Jaipur Metro (JMRC Pink)', estFare: 18, estMinutes: 12, eco: true },
      { mode: 'Electric Tuk-Tuk', estFare: 35, estMinutes: 16, eco: true },
      { mode: 'Prepaid Auto', estFare: 90, estMinutes: 18, eco: false }
    ]
  }
];
