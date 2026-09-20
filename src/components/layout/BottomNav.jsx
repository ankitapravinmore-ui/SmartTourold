import React from 'react';
import { 
  Wallet, 
  BedDouble, 
  Landmark, 
  ShieldAlert, 
  Headphones, 
  Users, 
  Bot, 
  Compass, 
  Building2 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';
import { UserRole } from '../../data/schema';

export function BottomNav({ activeTab, setActiveTab }) {
  const { t } = useLanguage();
  const { role, activeCrowdAlert } = useTrip();

  const TOURIST_NAV = [
    { id: 'budget', label: 'Budget', icon: Wallet },
    { id: 'stays', label: 'Stays', icon: BedDouble },
    { id: 'heritage', label: 'Gems', icon: Landmark },
    { id: 'safety', label: 'SOS', icon: ShieldAlert, alertBadge: true },
    { id: 'audio', label: 'Audio', icon: Headphones },
    { id: 'crowd', label: 'Crowd', icon: Compass, hasCrowd: !!activeCrowdAlert },
    { id: 'split', label: 'Split', icon: Users },
    { id: 'assistant', label: 'AI', icon: Bot, highlight: true }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#080C16]/95 backdrop-blur-lg border-t border-white/10 pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-between py-1.5 px-1">
        {TOURIST_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition ${
                isActive
                  ? 'text-[#00D06C] font-extrabold scale-105'
                  : item.highlight
                  ? 'text-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {item.alertBadge && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                )}
                {item.hasCrowd && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 bg-amber-400 rounded-full animate-bounce"></span>
                )}
              </div>
              <span className="text-[9px] mt-0.5 tracking-tight truncate max-w-[45px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
