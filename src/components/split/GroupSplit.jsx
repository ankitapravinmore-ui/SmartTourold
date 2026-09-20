import React, { useState, useMemo } from 'react';
import { useTrip } from '../../context/TripContext';
import { useBudget } from '../../context/BudgetContext';
import { 
  Users, 
  UserPlus, 
  ArrowRight, 
  CheckCircle2, 
  QrCode, 
  Trash2, 
  Scale 
} from 'lucide-react';

export function GroupSplit() {
  const { trip, addMember, removeMember } = useTrip();
  const { expenses, totalSpent, fmt } = useBudget();

  const [newMemName, setNewMemName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(null);

  const members = trip.members;

  // Splitwise Greedy Debt Solver
  const { balances, debts } = useMemo(() => {
    const bal = {};
    members.forEach(m => bal[m.id] = 0);

    expenses.forEach(exp => {
      const amt = Number(exp.amount) || 0;
      const payer = exp.paidBy;
      const split = exp.splitAmong && exp.splitAmong.length > 0 ? exp.splitAmong : members.map(m => m.id);

      if (bal[payer] !== undefined) bal[payer] += amt;
      const share = amt / split.length;
      split.forEach(id => {
        if (bal[id] !== undefined) bal[id] -= share;
      });
    });

    const debtors = [];
    const creditors = [];
    Object.entries(bal).forEach(([id, net]) => {
      const r = Math.round(net);
      if (r < -1) debtors.push({ id, amt: -r });
      else if (r > 1) creditors.push({ id, amt: r });
    });

    const simplified = [];
    let d = 0, c = 0;
    while (d < debtors.length && c < creditors.length) {
      const min = Math.min(debtors[d].amt, creditors[c].amt);
      simplified.push({
        from: debtors[d].id,
        to: creditors[c].id,
        amount: Math.round(min)
      });
      debtors[d].amt -= min;
      creditors[c].amt -= min;
      if (debtors[d].amt <= 1) d++;
      if (creditors[c].amt <= 1) c++;
    }

    return { balances: bal, debts: simplified };
  }, [members, expenses]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (newMemName.trim()) {
      addMember(newMemName.trim());
      setNewMemName('');
      setShowAddModal(false);
    }
  };

  const avgPerPerson = members.length > 0 ? Math.round(totalSpent / members.length) : 0;

  return (
    <div className="pb-24 pt-2 px-3.5 max-w-md mx-auto space-y-4 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-extrabold text-[#00D06C] uppercase tracking-wider">
            Module 6 • Group Expense Engine
          </span>
          <h2 className="text-lg font-black text-white">Group Splitwise & Debts</h2>
          <p className="text-[11px] text-slate-400">{members.length} Members • Minimizes debt transfers</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl bg-[#0084FF] text-white font-bold shadow"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Add Traveler</span>
        </button>
      </div>

      {/* Average Card */}
      <div className="p-4 rounded-2xl smart-card border border-white/10 flex justify-between items-center">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Average Spend Per Person</span>
          <div className="text-lg font-black text-white mt-0.5">{fmt(avgPerPerson)}</div>
          <span className="text-[9px] text-slate-400">Total Group Pool: {fmt(totalSpent)}</span>
        </div>
        <div className="w-9 h-9 rounded-xl bg-[#00D06C]/20 text-[#00D06C] flex items-center justify-center font-bold">
          <Scale className="w-5 h-5" />
        </div>
      </div>

      {/* Simplified Debts */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#00D06C]" />
          <span>Optimal Settlement Graph</span>
        </h3>
        {debts.length === 0 ? (
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center text-xs text-[#00D06C] font-bold">
            🎉 Everyone is squared up! Zero outstanding balances.
          </div>
        ) : (
          <div className="space-y-2">
            {debts.map((d, i) => {
              const debtor = members.find(m => m.id === d.from) || { name: 'Member' };
              const creditor = members.find(m => m.id === d.to) || { name: 'Member' };
              return (
                <div key={i} className="p-3 rounded-xl smart-card border border-white/5 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="text-rose-300">{debtor.name}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                    <span className="text-[#00D06C]">{creditor.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-amber-400 text-sm">{fmt(d.amount)}</span>
                    <button
                      onClick={() => setShowQrModal({ debtor, creditor, amount: d.amount })}
                      className="flex items-center gap-1 px-2 py-1 rounded bg-[#131D33] hover:bg-slate-700 text-[10px] font-bold text-slate-200 border border-white/10"
                    >
                      <QrCode className="w-3 h-3 text-cyan-400" />
                      <span>Settle UPI</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Member Balances */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Member Balances</h3>
        <div className="space-y-1.5">
          {members.map(m => {
            const net = Math.round(balances[m.id] || 0);
            return (
              <div key={m.id} className="p-2.5 rounded-xl bg-[#131D33]/60 border border-white/5 flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{m.avatar}</span>
                  <span className="font-bold text-white">{m.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-black ${net > 0 ? 'text-[#00D06C]' : net < 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                    {net > 0 ? `+${fmt(net)}` : net < 0 ? `-${fmt(Math.abs(net))}` : '₹0'}
                  </span>
                  {!m.isUser && members.length > 2 && (
                    <button onClick={() => removeMember(m.id)} className="text-slate-500 hover:text-rose-400 p-1">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* UPI QR Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1729] border border-white/10 rounded-3xl p-5 max-w-sm w-full text-center space-y-3">
            <h4 className="text-sm font-bold text-white">Instant UPI Settlement</h4>
            <div className="bg-white p-3 rounded-2xl inline-block mx-auto">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=smarttour360@upi%26pn=${encodeURIComponent(showQrModal.creditor.name)}%26am=${showQrModal.amount}`}
                alt="UPI QR Code"
                className="w-36 h-36"
              />
            </div>
            <div className="text-xs text-white">
              Pay <strong>{fmt(showQrModal.amount)}</strong> to <strong>{showQrModal.creditor.name}</strong>
            </div>
            <button
              onClick={() => setShowQrModal(null)}
              className="w-full py-2 bg-[#00D06C] text-slate-950 font-bold text-xs rounded-xl"
            >
              Done / Settled
            </button>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0E1729] border border-white/10 rounded-2xl p-5 max-w-sm w-full space-y-3">
            <h4 className="font-bold text-white text-sm">Add Traveler to Group</h4>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="e.g. Vikramaditya"
                value={newMemName}
                onChange={(e) => setNewMemName(e.target.value)}
                className="w-full bg-[#080C16] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
              />
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2 bg-slate-800 text-slate-300 text-xs rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-[#0084FF] text-white font-bold text-xs rounded-lg">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
