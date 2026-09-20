import React, { useState } from 'react';
import { TripProvider, useTrip } from './context/TripContext';
import { BudgetProvider } from './context/BudgetContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { BudgetDashboard } from './components/budget/BudgetDashboard';
import { StayTravelHub } from './components/booking/StayTravelHub';
import { HeritageExplorer } from './components/heritage/HeritageExplorer';
import { EmergencyHub } from './components/safety/EmergencyHub';
import { GroupSplit } from './components/split/GroupSplit';
import { TripAssistant } from './components/chatbot/TripAssistant';
import { InscriptionAudioGuide } from './components/audio/InscriptionAudioGuide';
import { GovDashboard } from './components/gov/GovDashboard';
import { CrowdAlertModal } from './components/crowd/CrowdAlertModal';
import { EvaluatorModal } from './components/evaluator/EvaluatorModal';
import { UserRole } from './data/schema';

function MainAppShell() {
  const { role } = useTrip();
  const [activeTab, setActiveTab] = useState('budget');
  const [isEvalOpen, setIsEvalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080C16] text-slate-100 flex flex-col font-sans selection:bg-[#00D06C] selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar onOpenEvaluatorModal={() => setIsEvalOpen(true)} />

      {/* Main View Area */}
      <main className="flex-1 w-full">
        {role === UserRole.GOV_ADMIN ? (
          <GovDashboard />
        ) : (
          <>
            {activeTab === 'budget' && <BudgetDashboard />}
            {activeTab === 'stays' && <StayTravelHub />}
            {activeTab === 'heritage' && <HeritageExplorer />}
            {activeTab === 'safety' && <EmergencyHub />}
            {activeTab === 'audio' && <InscriptionAudioGuide />}
            {activeTab === 'crowd' && (
              <div className="p-4 max-w-md mx-auto space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Crowd Heatmap & Diverter</h3>
                <div className="p-4 rounded-2xl smart-card border border-white/10 space-y-2 text-xs">
                  <span className="text-amber-400 font-bold">GPS Proximity Monitor:</span>
                  <p className="text-slate-300">
                    Your location is tracked against historical peak windows (11 AM - 3 PM). High-traffic hotspots trigger automatic alternative routes.
                  </p>
                </div>
              </div>
            )}
            {activeTab === 'split' && <GroupSplit />}
            {activeTab === 'assistant' && <TripAssistant />}
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Proactive GPS Crowd Alert Modal */}
      <CrowdAlertModal />

      {/* Jury Defense Modal */}
      <EvaluatorModal isOpen={isEvalOpen} onClose={() => setIsEvalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <TripProvider>
      <BudgetProvider>
        <LanguageProvider>
          <MainAppShell />
        </LanguageProvider>
      </BudgetProvider>
    </TripProvider>
  );
}
