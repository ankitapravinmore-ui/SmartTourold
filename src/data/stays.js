export const STAYS_DATA = {
  jaipur: [
    {
      id: 'stay-zostel-jaipur',
      name: 'Zostel Jaipur (M.I. Road)',
      type: 'Backpacker Hostel',
      rating: 4.8,
      reviewsCount: 1420,
      eco_friendly: true,
      ecoBadge: 'Solar Water Heaters & Refill Stations',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
      address: 'Tulsi Marg, Sindhi Camp, Jaipur',
      distanceToCenter: '1.2 km from Hawa Mahal',
      coordinates: [26.9239, 75.7983],
      dataSource: 'Hostelworld / OpenStreetMap Verified',
      amenities: ['Solar Power', 'Filtered Water Refills', 'Rooftop Cafe', 'High-Speed Wi-Fi', 'Common Lounge'],
      options: [
        { id: 'opt-1', title: '6-Bed Mixed Dorm', pricePerNight: 649, badge: 'Eco Backpacker' },
        { id: 'opt-2', title: '4-Bed Female Dorm', pricePerNight: 749, badge: 'Female Sanctuary' },
        { id: 'opt-3', title: 'Private King Ensuite', pricePerNight: 2199, badge: 'Private Comfort' }
      ]
    },
    {
      id: 'stay-horn-ok-please',
      name: 'Horn OK Please Boutique Hostel',
      type: 'Boutique Hostel',
      rating: 4.9,
      reviewsCount: 820,
      eco_friendly: true,
      ecoBadge: 'Zero Single-Use Plastics Certified',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
      address: 'Moti Lal Atal Rd, Opp. Ganpati Plaza, Jaipur',
      distanceToCenter: '0.8 km from Railway Station',
      coordinates: [26.9205, 75.7958],
      dataSource: 'Direct Host Verified Layer',
      amenities: ['Custom Bunk Pods', 'Composting Cafe', 'Curtains for Privacy', 'Artisan Coffee'],
      options: [
        { id: 'opt-4', title: 'Custom Pod Dorm Bed', pricePerNight: 799, badge: 'Privacy Pod' },
        { id: 'opt-5', title: 'Private Suite with Balcony', pricePerNight: 2850, badge: 'Airy Suite' }
      ]
    },
    {
      id: 'stay-moustache-jaipur',
      name: 'Moustache Jaipur (Park House)',
      type: 'Social Backpacker Hostel',
      rating: 4.7,
      reviewsCount: 980,
      eco_friendly: false,
      ecoBadge: null,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
      address: 'Park House Mews, Near MI Road, Jaipur',
      distanceToCenter: '1.8 km from City Palace',
      coordinates: [26.9182, 75.8045],
      dataSource: 'Booking.com Open Directory',
      amenities: ['Terrace Pool', 'Rooftop Lounge', 'Daily Chai Sessions', 'Tour Desk'],
      options: [
        { id: 'opt-6', title: '8-Bed Dorm Bed', pricePerNight: 550, badge: 'Value Choice' },
        { id: 'opt-7', title: 'Heritage Private Room', pricePerNight: 2499, badge: 'King Size' }
      ]
    }
  ],
  varanasi: [
    {
      id: 'stay-zostel-varanasi',
      name: 'Zostel Varanasi (Assi Ghat)',
      type: 'Backpacker Hostel',
      rating: 4.8,
      reviewsCount: 1100,
      eco_friendly: true,
      ecoBadge: 'Ganga Clean-up Host Partner',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
      address: 'Sigra-Mahmoorganj Road, Varanasi',
      distanceToCenter: '1.5 km from Dashashwamedh',
      coordinates: [25.3050, 82.9900],
      dataSource: 'Hostelworld Verified Data',
      amenities: ['Ghat View Terrace', 'Morning Yoga', 'Free Wi-Fi'],
      options: [
        { id: 'opt-v1', title: '8-Bed Mixed Dorm', pricePerNight: 599, badge: 'Top Seller' }
      ]
    }
  ]
};
