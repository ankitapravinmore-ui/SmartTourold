import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, UI_TRANSLATIONS } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('smarttour360_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    localStorage.setItem('smarttour360_lang', lang);
  }, [lang]);

  const t = (key) => {
    const dict = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;
    return dict[key] || UI_TRANSLATIONS.en[key] || key;
  };

  // Web Speech API Voice synthesis
  const speakText = (text, targetLangCode = lang) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis not supported on this browser.');
      return;
    }

    window.speechSynthesis.cancel(); // stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    const langMap = {
      en: 'en-US',
      hi: 'hi-IN',
      ta: 'ta-IN',
      kn: 'kn-IN',
      es: 'es-ES',
      bn: 'bn-IN'
    };

    utterance.lang = langMap[targetLangCode] || 'en-US';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t,
        speakText,
        stopSpeaking,
        isSpeaking,
        availableLanguages: LANGUAGES,
        currentLangMeta: LANGUAGES.find(l => l.code === lang) || LANGUAGES[0]
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
