import React, { useState } from 'react';
import { useBudget } from '../../context/BudgetContext';
import { useTrip } from '../../context/TripContext';
import { BudgetCategory, CategoryLabels } from '../../data/schema';
import { 
  TrendingUp, 
  AlertTriangle, 
  Receipt, 
  Trash2, 
  Edit3, 
  PlusCircle, 
  Hotel, 
  Navigation, 
  Utensils, 
  Sparkles, 
  ShieldAlert,
  Coins
} from 'lucide-react';

const CATEGORY_ICONS = {
  [BudgetCategory.STAY]: Hotel,
  [BudgetCategory.TRAVEL]: Navigation,
  [BudgetCategory.FOOD]: Utensils,
  [BudgetCategory.ACTIVITIES]: Sparkles,
  [BudgetCategory.BUFFER]: ShieldAlert
};

export function BudgetDashboard() {
  const { 
    totalBudget, 
    allocations, 
    categorySpent, 
    totalSpent, 
    remainingBudget, 
    safeDailyAllowance, 
    burnRateStatus, 
    expenses,
    fmt,
    addExpense,
    deleteExpense,
    updateBudgetTotal
  } = useBudget();

  const { trip, currency } = useTrip();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditTotalModal, setShowEditTotalModal] = useState(false);
  const [budgetInput, setBudgetInput] = useState(totalBudget);

  const [expTitle, setExpTitle] = useState('');
  const [expCat, setExpCat] = useState(BudgetCategory.FOOD);
  const [expAmt, setExpAmt] = useState('');

  const percentSpent = Math.min(100, Math.round((totalSpent / totalBudget) * 100));

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!expTitle || !expAmt || Number(expAmt) <= 0) return;
    addExpense({
      title: expTitle,
      category: expCat,
      amount: Number(expAmt),
      paidBy: trip.members[0]?.id || 'm1'
    });
    setExpTitle('');
    setExpAmt('');
    setShowAddModal(false);
  };

  return (
    <div className="pb-24 pt-2 px-3.5 max-w-md mx-auto space-y-4 animate-fadeIn">
      {/* Financial Spine Hero Card */}
      <div className="p-5 rounded-2xl smart-card smart-border-glow shadow-2xl relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-1 text-[10px] font-extrabold text-cyan-400 uppercase tracking-wider">
              <span>Module 1 • Financial Spine</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400">{currency} Multi-Currency</span>
            </div>
            <h2 className="text-lg font-black text-white mt-0.5">{trip.destinationName} Budget Dashboard</h2>
            <p className="text-[11px] text-slate-400">{trip.totalDays} Days • {trip.travelersCount} Travelers • Live Sync</p>
          </div>
          <button
            onClick={() => {
              setBudgetInput(totalBudget);
              setShowEditTotalModal(true);
            }}
            className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-[#131D33] hover:bg-slate-700 text-slate-200 border border-white/10"
          >
            <Edit3 className="w-3 h-3 text-cyan-400" />
            <span>Pool</span>
          </button>
        </div>

        {/* Hero Numbers */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-center">
          <div className="p-2 rounded-xl bg-[#080C16]/60 border border-white/5">
            <span className="text-[9px] text-slate-400 uppercase font-semibold">Total Pool</span>
            <div className="text-sm font-black text-white mt-0.5">{fmt(totalBudget)}</div>
          </div>
          <div className="p-2 rounded-xl bg-[#080C16]/60 border border-white/5">
            <span className="text-[9px] text-slate-400 uppercase font-semibold">Spent</span>
            <div className="text-sm font-black text-rose-400 mt-0.5">{fmt(totalSpent)}</div>
          </div>
          <div className="p-2 rounded-xl bg-[#080C16]/60 border border-white/5">
            <span className="text-[9px] text-slate-400 uppercase font-semibold">Remaining</span>
            <div className="text-sm font-black text-[#00D06C] mt-0.5">{fmt(remainingBudget)}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3.5">
          <div className="flex justify-between text-[10px] font-bold mb-1">
            <span className="text-slate-300">Total Spend Ratio</span>
            <span className={percentSpent > 90 ? 'text-rose-400' : 'text-cyan-400'}>{percentSpent}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentSpent > 90 ? 'bg-rose-500' : percentSpent > 75 ? 'bg-amber-500' : 'bg-gradient-to-r from-cyan-500 to-[#00D06C]'
              }`}
              style={{ width: `${percentSpent}%` }}
            ></div>
          </div>
        </div>

        {/* Daily Allowance & Burn Rate */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#080C16]/60 border border-white/5">
            <TrendingUp className="w-4 h-4 text-[#00D06C]" />
            <div>
              <div className="text-[9px] text-slate-400">Safe Daily Allowance</div>
              <div className="font-bold text-white text-[11px]">{fmt(safeDailyAllowance)} / day</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#080C16]/60 border border-white/5">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-[9px] text-slate-400">Burn Status</div>
              <div className="font-bold text-amber-300 text-[11px]">{burnRateStatus}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Category Buckets */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">5 Auto-Balanced Buckets</h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 text-[11px] font-bold text-[#00D06C] hover:underline"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Log Expense</span>
          </button>
        </div>

        <div className="space-y-2">
          {Object.entries(CategoryLabels).map(([catKey, meta]) => {
            const Icon = CATEGORY_ICONS[catKey] || Hotel;
            const allocated = allocations[catKey] || 0;
            const spent = categorySpent[catKey] || 0;
            const rem = Math.max(0, allocated - spent);
            const p = allocated > 0 ? Math.min(100, Math.round((spent / allocated) * 100)) : 0;
            const isOver = spent > allocated;

            return (
              <div key={catKey} className="p-3 rounded-xl smart-card border border-white/5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${meta.color}20`, color: meta.color }}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white">{meta.name}</span>
                      <div className="text-[9px] text-slate-400">{meta.defaultPercent}% Target Allocation</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-extrabold text-white">
                      {fmt(spent)} <span className="text-slate-400 font-normal text-[10px]">/ {fmt(allocated)}</span>
                    </div>
                    <span className={`text-[9px] font-bold ${isOver ? 'text-rose-400' : 'text-[#00D06C]'}`}>
                      {isOver ? `Over by ${fmt(spent - allocated)}` : `${fmt(rem)} left`}
                    </span>
                  </div>
                </div>
                <div className="mt-2 w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${p}%`, backgroundColor: isOver ? '#EF4444' : meta.color }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transaction Ledger */}
      <div>
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Receipt className="w-3.5 h-3.5 text-cyan-400" />
          <span>Live Expense Ledger ({expenses.length})</span>
        </h3>
        <div className="space-y-1.5">
          {expenses.slice(0, 6).map((exp) => {
            const meta = CategoryLabels[exp.category] || { color: '#0084FF' };
            const Icon = CATEGORY_ICONS[exp.category] || Receipt;
            return (
              <div key={exp.id} className="p-2.5 rounded-xl bg-[#131D33]/60 border border-white/5 flex justify-between items-center text-xs">
                <div className="flex items-center gap-2 truncate">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: `${meta.color}20`, color: meta.color }}>
                    <Icon className="w-3 h-3" />
                  </div>
                  <div className="truncate">
                    <div className="font-semibold text-white truncate">{exp.title}</div>
                    <div className="text-[9px] text-slate-400">
                      {exp.category} {exp.isAutoLogged && <span className="text-[#00D06C]">(Auto-Deducted)</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-extrabold text-white">{fmt(exp.amount)}</span>
                  <button onClick={() => deleteExpense(exp.id)} className="text-slate-500 hover:text-rose-400 p-1">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1729] border border-white/10 rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <h4 className="font-bold text-white text-sm">Log Expense to Live Spine</h4>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Masala Chai & Bun Maska"
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  className="w-full bg-[#080C16] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Amount (INR)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="120"
                    value={expAmt}
                    onChange={(e) => setExpAmt(e.target.value)}
                    className="w-full bg-[#080C16] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Category</label>
                  <select
                    value={expCat}
                    onChange={(e) => setExpCat(e.target.value)}
                    className="w-full bg-[#080C16] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-white"
                  >
                    <option value={BudgetCategory.STAY}>Stay</option>
                    <option value={BudgetCategory.TRAVEL}>Travel</option>
                    <option value={BudgetCategory.FOOD}>Food</option>
                    <option value={BudgetCategory.ACTIVITIES}>Heritage</option>
                    <option value={BudgetCategory.BUFFER}>Buffer</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2 bg-slate-800 text-slate-300 text-xs rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-[#00D06C] text-slate-950 font-bold text-xs rounded-lg">Add & Deduct</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Total Modal */}
      {showEditTotalModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1729] border border-white/10 rounded-2xl p-5 max-w-sm w-full space-y-3">
            <h4 className="font-bold text-white text-sm">Update Total Budget Pool</h4>
            <input
              type="number"
              min="2000"
              step="500"
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              className="w-full bg-[#080C16] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-bold"
            />
            <div className="flex gap-2 pt-2">
              <button onClick={() => setShowEditTotalModal(false)} className="flex-1 py-2 bg-slate-800 text-slate-300 text-xs rounded-lg">Cancel</button>
              <button
                onClick={() => {
                  updateBudgetTotal(budgetInput);
                  setShowEditTotalModal(false);
                }}
                className="flex-1 py-2 bg-[#0084FF] text-white font-bold text-xs rounded-lg"
              >
                Rebalance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
