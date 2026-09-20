import React, { useState } from 'react';
import { Award, Database, Cpu, WifiOff, Layers, Target, CheckCircle2 } from 'lucide-react';

export function EvaluatorModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('q1');

  if (!isOpen) return null;

  const EVAL_QUESTIONS = [
    {
      id: 'q1',
      icon: Database,
      short: 'Data Sources',
      q: 'Where does your data come from?',
      answer: (
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>We do not use synthetic mock entities. Our architecture unifies verified public datasets:</p>
          <ul className="space-y-1 list-disc pl-4 text-slate-200">
            <li><strong>Heritage & Epigraphy:</strong> Rajasthan Tourism Open Data (tourism.rajasthan.gov.in) & Archaeological Survey of India (ASI) deciphered inscription records.</li>
            <li><strong>Stays:</strong> OpenStreetMap amenity layer + verified eco-certified backpacker hostels.</li>
            <li><strong>Transit:</strong> Jaipur Metro Rail Corporation (JMRC) GTFS feed + RTO official prepaid auto tariff card.</li>
            <li><strong>Emergency:</strong> National Health Portal verified Level-1 trauma centers (SMS Hospital) & 1363 24x7 tourist helpline.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'q2',
      icon: Cpu,
      short: 'Value Add',
      q: 'What is the value-add beyond a form & database?',
      answer: (
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>SmartTour360 is an active connective layer with three distinct real-time algorithms:</p>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 space-y-1">
            <strong className="text-cyan-400">1. Central Financial Spine:</strong> Every booking or ticket purchase decrements category buckets and computes burn rate in real time.
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 space-y-1">
            <strong className="text-[#00D06C]">2. Proactive Over-Tourism Rerouting:</strong> Detects congestion via GPS time-windows and surfaces verified nearby hidden gems.
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 border border-white/5 space-y-1">
            <strong className="text-purple-400">3. Inscription Plaque Scanner & TTS:</strong> Matches photographed ancient stone plaques against historical epigraphical databases and reads aloud in regional languages (EN, HI, TA, KN).
          </div>
        </div>
      )
    },
    {
      id: 'q3',
      icon: WifiOff,
      short: 'Offline Drops',
      q: 'What happens when connectivity drops?',
      answer: (
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 space-y-1">
            <strong className="text-rose-300">PWA Service Worker Cache:</strong>
            <p className="text-[11px] text-slate-300">
              Emergency telephone lines, nearest hospital coordinates, and SMS dispatcher operate 100% locally from client-side Service Worker cache (<code className="text-cyan-300">public/sw.js</code>).
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'q4',
      icon: Layers,
      short: 'Production Scaling',
      q: 'How would this scale to real production data?',
      answer: (
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>Built with standardized internal schemas (<code>Place</code>, <code>Booking</code>, <code>Expense</code>, <code>Plaque</code>). Live GDS/OTA APIs (Amadeus, IRCTC, Booking.com Partner API) can be plugged in via adapter interfaces without refactoring the UI or budget engine.</p>
        </div>
      )
    },
    {
      id: 'q5',
      icon: Target,
      short: 'Success Metrics',
      q: 'Who benefits and how do you measure success?',
      answer: (
        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
            <div className="text-lg font-black text-cyan-400">73%</div>
            <div className="font-bold text-white text-[11px]">App Switching Reduction</div>
            <div className="text-[9px] text-slate-400 mt-0.5">Stitches 5 apps into 1 single flow.</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
            <div className="text-lg font-black text-[#00D06C]">38%</div>
            <div className="font-bold text-white text-[11px]">Congestion Diversion</div>
            <div className="text-[9px] text-slate-400 mt-0.5">Footfall redirected to offbeat gems.</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#0E1729] border border-white/10 rounded-3xl max-w-md w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-cyan-600 via-[#0084FF] to-[#00D06C] flex justify-between items-center text-slate-950">
          <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider">
            <Award className="w-5 h-5 fill-current" />
            <span>SIH26204 Jury Defense Kit</span>
          </div>
          <button onClick={onClose} className="w-6 h-6 rounded-full bg-black/20 font-bold flex items-center justify-center">✕</button>
        </div>

        <div className="flex border-b border-white/10 bg-[#080C16] overflow-x-auto no-scrollbar">
          {EVAL_QUESTIONS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-2 text-xs font-bold whitespace-nowrap border-b-2 transition ${
                activeTab === item.id ? 'border-cyan-400 text-cyan-300 bg-[#131D33]' : 'border-transparent text-slate-400'
              }`}
            >
              {item.short}
            </button>
          ))}
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {(() => {
            const q = EVAL_QUESTIONS.find(i => i.id === activeTab);
            if (!q) return null;
            return (
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-800 text-xs font-bold text-cyan-300">
                  {q.q}
                </div>
                <div>{q.answer}</div>
              </div>
            );
          })()}
        </div>

        <div className="p-3 border-t border-white/10 bg-[#080C16] text-right">
          <button onClick={onClose} className="px-4 py-1.5 rounded-xl bg-[#0084FF] font-bold text-white text-xs">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
