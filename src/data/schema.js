/**
 * SmartTour360 Standardized Internal Data Schema
 * Evaluator-grade 3-layer architecture contracts.
 */

export const BudgetCategory = {
  STAY: 'stay',
  TRAVEL: 'travel',
  FOOD: 'food',
  ACTIVITIES: 'activities',
  BUFFER: 'buffer'
};

export const CategoryLabels = {
  [BudgetCategory.STAY]: { name: 'Stay & Lodging', defaultPercent: 35, color: '#0084FF', icon: 'Hotel' },
  [BudgetCategory.TRAVEL]: { name: 'Local Transport', defaultPercent: 20, color: '#00D06C', icon: 'Navigation' },
  [BudgetCategory.FOOD]: { name: 'Food & Dining', defaultPercent: 20, color: '#F59E0B', icon: 'Utensils' },
  [BudgetCategory.ACTIVITIES]: { name: 'Heritage & Gems', defaultPercent: 15, color: '#A855F7', icon: 'Sparkles' },
  [BudgetCategory.BUFFER]: { name: 'Safety Reserve', defaultPercent: 10, color: '#EF4444', icon: 'ShieldAlert' }
};

export const UserRole = {
  TOURIST: 'tourist',
  GOV_ADMIN: 'gov_admin'
};

export function createTrip({
  id = `trip_${Date.now()}`,
  destination = 'Jaipur',
  state = 'Rajasthan',
  startDate = '2026-09-19',
  endDate = '2026-09-22',
  travelersCount = 3,
  totalBudget = 18000,
  currency = 'INR',
  members = [
    { id: 'm1', name: 'You (Admin)', avatar: '👤', isUser: true },
    { id: 'm2', name: 'Aarav Sharma', avatar: '🎒', isUser: false },
    { id: 'm3', name: 'Priya Patel', avatar: '📷', isUser: false }
  ]
} = {}) {
  const stayAlloc = Math.round(totalBudget * 0.35);
  const travelAlloc = Math.round(totalBudget * 0.20);
  const foodAlloc = Math.round(totalBudget * 0.20);
  const activitiesAlloc = Math.round(totalBudget * 0.15);
  const bufferAlloc = totalBudget - (stayAlloc + travelAlloc + foodAlloc + activitiesAlloc);

  return {
    id,
    destination,
    state,
    startDate,
    endDate,
    travelersCount,
    totalBudget,
    currency,
    members,
    allocations: {
      stay: stayAlloc,
      travel: travelAlloc,
      food: foodAlloc,
      activities: activitiesAlloc,
      buffer: bufferAlloc
    },
    itinerary: []
  };
}
