import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { BudgetCategory, CategoryLabels } from '../data/schema';
import { convertFromINR, formatCurrency } from '../data/currency';
import { useTrip } from './TripContext';

const BudgetContext = createContext();

const INITIAL_TOTAL_BUDGET = 18000;

const INITIAL_EXPENSES = [
  {
    id: 'exp_1',
    title: 'Prepaid Taxi to Central Hostel',
    category: BudgetCategory.TRAVEL,
    amount: 320,
    paidBy: 'm1',
    splitAmong: ['m1', 'm2', 'm3'],
    date: '2026-09-19T09:30:00Z',
    isAutoLogged: true
  },
  {
    id: 'exp_2',
    title: 'Lassiwala Traditional Clay Kulhad (MI Road)',
    category: BudgetCategory.FOOD,
    amount: 270,
    paidBy: 'm2',
    splitAmong: ['m1', 'm2', 'm3'],
    date: '2026-09-19T11:15:00Z',
    isAutoLogged: false
  },
  {
    id: 'exp_3',
    title: 'Panna Meena ka Kund Camera & Entry Fee',
    category: BudgetCategory.ACTIVITIES,
    amount: 150,
    paidBy: 'm3',
    splitAmong: ['m1', 'm2', 'm3'],
    date: '2026-09-19T14:00:00Z',
    isAutoLogged: true
  }
];

export function BudgetProvider({ children }) {
  const { trip, currency, setBookedStay, addToItinerary } = useTrip();

  const [totalBudget, setTotalBudget] = useState(() => {
    try {
      const s = localStorage.getItem('smarttour360_total_budget');
      return s ? Number(s) : INITIAL_TOTAL_BUDGET;
    } catch {
      return INITIAL_TOTAL_BUDGET;
    }
  });

  const [expenses, setExpenses] = useState(() => {
    try {
      const s = localStorage.getItem('smarttour360_expenses');
      return s ? JSON.parse(s) : INITIAL_EXPENSES;
    } catch {
      return INITIAL_EXPENSES;
    }
  });

  useEffect(() => {
    localStorage.setItem('smarttour360_total_budget', totalBudget.toString());
  }, [totalBudget]);

  useEffect(() => {
    localStorage.setItem('smarttour360_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const allocations = useMemo(() => {
    const stay = Math.round(totalBudget * 0.35);
    const travel = Math.round(totalBudget * 0.20);
    const food = Math.round(totalBudget * 0.20);
    const activities = Math.round(totalBudget * 0.15);
    const buffer = totalBudget - (stay + travel + food + activities);

    return {
      [BudgetCategory.STAY]: stay,
      [BudgetCategory.TRAVEL]: travel,
      [BudgetCategory.FOOD]: food,
      [BudgetCategory.ACTIVITIES]: activities,
      [BudgetCategory.BUFFER]: buffer
    };
  }, [totalBudget]);

  const categorySpent = useMemo(() => {
    const spent = {
      [BudgetCategory.STAY]: 0,
      [BudgetCategory.TRAVEL]: 0,
      [BudgetCategory.FOOD]: 0,
      [BudgetCategory.ACTIVITIES]: 0,
      [BudgetCategory.BUFFER]: 0
    };

    expenses.forEach((exp) => {
      const cat = exp.category || BudgetCategory.FOOD;
      if (spent[cat] !== undefined) spent[cat] += Number(exp.amount) || 0;
      else spent[BudgetCategory.BUFFER] += Number(exp.amount) || 0;
    });

    return spent;
  }, [expenses]);

  const totalSpent = useMemo(() => {
    return Object.values(categorySpent).reduce((a, b) => a + b, 0);
  }, [categorySpent]);

  const remainingBudget = useMemo(() => {
    return Math.max(0, totalBudget - totalSpent);
  }, [totalBudget, totalSpent]);

  const safeDailyAllowance = Math.round(remainingBudget / Math.max(1, trip.totalDays || 3));

  const burnRateStatus =
    totalSpent > (totalBudget / 3) * 1.3
      ? 'High Burn'
      : totalSpent > (totalBudget / 3) * 0.85
      ? 'Optimal'
      : 'Frugal';

  // Currency helpers
  const fmt = (amtInINR) => formatCurrency(amtInINR, currency);

  // Real-time Booking & Logging hooks
  const bookStayItem = ({ stayName, optionTitle, pricePerNight, nights = 2 }) => {
    const cost = pricePerNight * nights;
    const newExp = {
      id: `exp_stay_${Date.now()}`,
      title: `${stayName} (${optionTitle} - ${nights}N)`,
      category: BudgetCategory.STAY,
      amount: cost,
      paidBy: trip.members[0]?.id || 'm1',
      splitAmong: trip.members.map(m => m.id),
      date: new Date().toISOString(),
      isAutoLogged: true
    };
    setExpenses(prev => [newExp, ...prev]);
    setBookedStay({ name: stayName, room: optionTitle, cost });
    return { success: true, cost };
  };

  const bookTransportItem = ({ modeName, from, to, fare }) => {
    const newExp = {
      id: `exp_tr_${Date.now()}`,
      title: `${modeName}: ${from} → ${to}`,
      category: BudgetCategory.TRAVEL,
      amount: fare,
      paidBy: trip.members[0]?.id || 'm1',
      splitAmong: trip.members.map(m => m.id),
      date: new Date().toISOString(),
      isAutoLogged: true
    };
    setExpenses(prev => [newExp, ...prev]);
    return { success: true, fare };
  };

  const addHeritageActivity = (spot) => {
    const cost = (spot.entryFee || 0) * (trip.travelersCount || 1) + (spot.cameraFee || 0);
    if (cost > 0) {
      const newExp = {
        id: `exp_act_${Date.now()}`,
        title: `Tickets: ${spot.name}`,
        category: BudgetCategory.ACTIVITIES,
        amount: cost,
        paidBy: trip.members[0]?.id || 'm1',
        splitAmong: trip.members.map(m => m.id),
        date: new Date().toISOString(),
        isAutoLogged: true
      };
      setExpenses(prev => [newExp, ...prev]);
    }
    addToItinerary(spot);
    return { success: true, cost };
  };

  const addExpense = ({ title, category, amount, paidBy }) => {
    const newExp = {
      id: `exp_${Date.now()}`,
      title,
      category: category || BudgetCategory.FOOD,
      amount: Number(amount),
      paidBy: paidBy || trip.members[0]?.id || 'm1',
      splitAmong: trip.members.map(m => m.id),
      date: new Date().toISOString(),
      isAutoLogged: false
    };
    setExpenses(prev => [newExp, ...prev]);
  };

  const deleteExpense = (id) => setExpenses(prev => prev.filter(e => e.id !== id));

  return (
    <BudgetContext.Provider
      value={{
        totalBudget,
        allocations,
        categorySpent,
        totalSpent,
        remainingBudget,
        safeDailyAllowance,
        burnRateStatus,
        expenses,
        fmt,
        bookStayItem,
        bookTransportItem,
        addHeritageActivity,
        addExpense,
        deleteExpense,
        updateBudgetTotal: (t) => setTotalBudget(Number(t))
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  return useContext(BudgetContext);
}
