import React, { useState } from 'react';
import { INSCRIPTIONS_DATABASE } from '../../data/inscriptions';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Camera, 
  Volume2, 
  VolumeX, 
  Mic, 
  Sparkles, 
  ScrollText, 
  Check, 
  Play, 
  Radio 
} from 'lucide-react';

export function InscriptionAudioGuide() {
  const { lang, setLang, speakText, stopSpeaking, isSpeaking, availableLanguages } = useLanguage();

  const [selectedPlaque, setSelectedPlaque] = useState(INSCRIPTIONS_DATABASE[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [translatedMicText, setTranslatedMicText] = useState('');

  const handleScanSimulate = (plaque) => {
    setIsScanning(true);
    setTimeout(() => {
      setSelectedPlaque(plaque);
      setIsScanning(false);
    }, 600);
  };

  const handlePlayPlaqueAudio = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const text = selectedPlaque.audioGuideNarrations[lang] || selectedPlaque.audioGuideNarrations.en;
      speakText(text, lang);
    }
  };

  const handleVoiceMicSimulate = () => {
    if (micActive) {
      setMicActive(false);
      return;
    }
    setMicActive(true);
    setTranslatedMicText('Listening to local guide speech...');

    setTimeout(() => {
      const demoTranslations = {
        en: '"Guide explains: The royal architects built this stepwell 450 years ago for cooling during summer months."',
        hi: '"गाइड विवरण: शाही वास्तुकारों ने 450 वर्ष पूर्व गर्मियों में शीतलता हेतु इस बावड़ी का निर्माण किया था।"',
        ta: '"வழிகாட்டி விளக்கம்: 450 ஆண்டுகளுக்கு முன்பு கோடைகால குளிர்ச்சிக்காக இந்த படிக்கிணறு கட்டப்பட்டது."',
        kn: '"ಮಾರ್ಗದರ್ಶಿ ವಿವರಣೆ: 450 ವರ್ಷಗಳ ಹಿಂದೆ ಬೇಸಿಗೆಯ ತಂಪಿನ ರಕ್ಷಣೆಗಾಗಿ ಈ ಮೆಟ್ಟಿಲು ಬಾವಿಯನ್ನು ನಿರ್ಮಿಸಲಾಯಿತು."'
      };
      setTranslatedMicText(demoTranslations[lang] || demoTranslations.en);
      setMicActive(false);
      speakText(demoTranslations[lang] || demoTranslations.en, lang);
    }, 2000);
  };

  return (
    <div className="pb-24 pt-2 px-3.5 max-w-md mx-auto space-y-4 animate-fadeIn">
      {/* Header */}
      <div>
        <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-wider">
          Module 8 • Hyper-Local Audio & Inscriptions
        </span>
        <h2 className="text-lg font-black text-white">Epigraphy Scanner & Audio</h2>
        <p className="text-[11px] text-slate-400">
          Decodes ancient monument inscriptions into regional audio (EN, HI, TA, KN)
        </p>
      </div>

      {/* Language Selector for Audio */}
      <div className="p-3 rounded-2xl smart-card border border-white/10 flex justify-between items-center">
        <span className="text-xs text-slate-300 font-semibold">Narrate Audio In:</span>
        <div className="flex gap-1">
          {['en', 'hi', 'ta', 'kn'].map((code) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition uppercase ${
                lang === code ? 'bg-[#0084FF] text-white shadow' : 'bg-[#080C16] text-slate-400 border border-white/5'
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {/* Inscription Plaque Scanner Card */}
      <div className="p-4 rounded-2xl smart-card border border-cyan-500/30 shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
            <ScrollText className="w-4 h-4 text-cyan-400" />
            <span>Ancient Stone Inscription Scanner</span>
          </h3>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/50 font-bold">
            Curated Deciphering
          </span>
        </div>

        {/* Plaque Image & Simulated Viewfinder */}
        <div className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-900 border border-white/10">
          <img src={selectedPlaque.image} alt={selectedPlaque.plaqueTitle} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1729] via-transparent"></div>

          {/* Viewfinder crosshairs */}
          <div className="absolute inset-4 border-2 border-cyan-400/40 rounded-lg pointer-events-none flex items-center justify-center">
            {isScanning ? (
              <span className="text-xs font-black text-cyan-300 bg-slate-950/80 px-3 py-1.5 rounded-full animate-pulse">
                Analyzing Script Epigraphy...
              </span>
            ) : (
              <span className="text-[10px] font-bold text-white/80 bg-black/40 px-2 py-1 rounded">
                Point at Inscription Plaque
              </span>
            )}
          </div>
        </div>

        {/* Plaque Selector Chips */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar text-xs">
          {INSCRIPTIONS_DATABASE.map((p) => (
            <button
              key={p.id}
              onClick={() => handleScanSimulate(p)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition border ${
                selectedPlaque.id === p.id
                  ? 'bg-[#0084FF] text-white border-cyan-400'
                  : 'bg-[#080C16] text-slate-400 border-white/5'
              }`}
            >
              {p.monument}
            </button>
          ))}
        </div>

        {/* Decoded Details */}
        <div className="p-3 rounded-xl bg-[#080C16] border border-white/5 space-y-2 text-xs">
          <div>
            <span className="text-[9px] text-cyan-400 font-bold uppercase">{selectedPlaque.era}</span>
            <h4 className="font-bold text-white text-xs">{selectedPlaque.plaqueTitle}</h4>
            <div className="text-[10px] text-slate-400">Script: {selectedPlaque.script}</div>
          </div>

          <div className="p-2 rounded bg-slate-900/60 border border-white/5 font-mono text-[10px] text-amber-200">
            {selectedPlaque.originalExcerpt}
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed">
            {selectedPlaque.audioGuideNarrations[lang] || selectedPlaque.audioGuideNarrations.en}
          </p>

          <button
            onClick={handlePlayPlaqueAudio}
            className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow ${
              isSpeaking
                ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                : 'bg-gradient-to-r from-cyan-500 to-[#0084FF] text-white'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? 'Stop Audio Narration' : `Read Plaque Aloud in ${lang.toUpperCase()}`}</span>
          </button>
        </div>
      </div>

      {/* Live Voice Guide Mic Translator */}
      <div className="p-4 rounded-2xl smart-card border border-white/10 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Mic className="w-4 h-4 text-[#00D06C]" />
            <span>Live Tour Guide Voice Translator</span>
          </h3>
          <span className="text-[9px] text-slate-400">Speech-to-Speech</span>
        </div>

        <p className="text-[11px] text-slate-300">
          Point phone microphone toward local guide or temple priest. App transcribes & reads translated explanation in your language.
        </p>

        <button
          onClick={handleVoiceMicSimulate}
          className={`w-full py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition ${
            micActive
              ? 'bg-rose-600 text-white animate-pulse'
              : 'bg-[#131D33] hover:bg-slate-700 text-[#00D06C] border border-[#00D06C]/40'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>{micActive ? 'Listening to Guide Speech...' : 'Simulate Guide Voice Capture'}</span>
        </button>

        {translatedMicText && (
          <div className="p-3 rounded-xl bg-[#080C16] border border-white/5 text-xs text-slate-200 leading-relaxed animate-slideDown">
            <span className="text-[9px] text-[#00D06C] font-bold block mb-1">Instant Translated Narration:</span>
            {translatedMicText}
          </div>
        )}
      </div>
    </div>
  );
}
