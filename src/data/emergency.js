export const EMERGENCY_SERVICES = {
  nationalHelplines: [
    { id: 'h-112', title: 'National Emergency', number: '112', badge: 'Police / Fire / Medical 24/7', icon: 'PhoneCall' },
    { id: 'h-1363', title: 'National Tourist Helpline', number: '1363', badge: '12 Languages (Toll-Free)', icon: 'Compass' },
    { id: 'h-1090', title: 'Women Safety Helpline', number: '1090', badge: 'Immediate Female Police PCR', icon: 'ShieldCheck' },
    { id: 'h-108', title: 'Critical Care Ambulance', number: '108', badge: 'State Trauma Care (Free)', icon: 'HeartPulse' }
  ],
  jaipur: {
    police: [
      {
        id: 'pol-tourist',
        name: 'Jaipur Tourist Police Station (Paryatan Thana)',
        address: 'Near Jantar Mantar, Walled City, Jaipur',
        phone: '0141-2601934',
        mobile: '+91-9414045555',
        distance: '1.4 km',
        coordinates: [26.9248, 75.8246],
        features: ['English, Hindi & Regional Dialects', 'FIR filing', 'Tourist Harassment Redressal']
      }
    ],
    hospitals: [
      {
        id: 'hosp-sms',
        name: 'Sawai Man Singh (SMS) Govt Hospital & Level-1 Trauma',
        type: 'Government Super-Speciality (Free Emergency)',
        address: 'JLN Marg, Ashok Nagar, Jaipur',
        emergencyPhone: '0141-2518224',
        distance: '2.1 km',
        coordinates: [26.8928, 75.8159],
        bloodBank: '24/7 Available'
      },
      {
        id: 'hosp-fortis',
        name: 'Fortis Escorts Hospital',
        type: 'Private Super-Speciality NABH',
        address: 'Jawahar Lal Nehru Marg, Malviya Nagar, Jaipur',
        emergencyPhone: '0141-2547000',
        distance: '6.4 km',
        coordinates: [26.8521, 75.8083],
        bloodBank: '24/7 Available'
      }
    ],
    embassies: [
      { country: 'United States Embassy (New Delhi)', phone: '+91-11-2419-8000', emergencyLine: '+91-11-2419-8000' },
      { country: 'British High Commission (New Delhi)', phone: '+91-11-2419-2100', emergencyLine: '+91-11-2419-2100' }
    ]
  },
  varanasi: {
    police: [
      {
        id: 'pol-varanasi-tourist',
        name: 'Varanasi Tourist Police Booth',
        address: 'Dashashwamedh Ghat Road, Godowlia, Varanasi',
        phone: '0542-2508077',
        distance: '0.8 km'
      }
    ],
    hospitals: [
      {
        id: 'hosp-bhu-trauma',
        name: 'Sir Sunderlal Hospital (BHU Trauma Centre)',
        type: 'Apex University Medical Hospital',
        address: 'BHU Campus, Varanasi',
        emergencyPhone: '0542-2307500',
        distance: '3.2 km'
      }
    ]
  }
};
