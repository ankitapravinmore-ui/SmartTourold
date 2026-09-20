import React, { useState, useRef, useEffect } from 'react';
import { useTrip } from '../../context/TripContext';
import { useBudget } from '../../context/BudgetContext';
import { useLanguage } from '../../context/LanguageContext';
import { Bot, Send, Sparkles, Volume2 } from 'lucide-react';

export function TripAssistant() {
  const { trip } = useTrip();
  const { totalBudget, remainingBudget, allocations, categorySpent, fmt } = useBudget();
  const { lang, setLang, availableLanguages, speakText } = useLanguage();

  const [messages, setMessages] = useState([
    {
      id: 'init',
      sender: 'bot',
      text: `Namaste! I am your AI Yatri Sahayak. I have your live trip context: exploring ${trip.destinationName} with ${fmt(remainingBudget)} remaining. Ask me anything in English, हिंदी, தமிழ், or ಕನ್ನಡ!`,
      time: 'Just now'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const QUICK_PROMPTS = [
    { label: '💰 Under ₹500 near me', q: `What hidden spots or food can I experience right now for under ₹500 in ${trip.destinationName}?` },
    { label: '📊 Check remaining budget', q: 'Give me a live breakdown of my remaining budget across Stay, Travel, and Food.' },
    { label: '🛡️ Local tourist scams', q: `What auto-rickshaw or gemstone scams should I avoid in ${trip.destinationName}?` },
    { label: '🗣️ Bargaining phrase in Tamil/Kannada', q: 'How do I politely bargain for handicrafts in Tamil or Kannada?' }
  ];

  const generateReply = (query, currentLang) => {
    const q = query.toLowerCase();

    if (q.includes('budget') || q.includes('बजट') || q.includes('பட்ஜெட்') || q.includes('ಬಜೆಟ್')) {
      if (currentLang === 'ta') {
        return `உங்கள் நேரலை பட்ஜெட் விபரம்:
• மீதமுள்ள இருப்பு: ${fmt(remainingBudget)} (மொத்தம் ${fmt(totalBudget)})
• தங்குமிடம் மீதி: ${fmt(allocations.stay - categorySpent.stay)}
• உள்ளூர் பயணம் மீதி: ${fmt(allocations.travel - categorySpent.travel)}
• உணவு மீதி: ${fmt(allocations.food - categorySpent.food)}
நீங்கள் பாதுகாப்பான தினசரி வரம்பிற்குள் உள்ளீர்கள்!`;
      } else if (currentLang === 'kn') {
        return `ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಬಜೆಟ್ ವಿವರ:
• ಉಳಿದ ಬ್ಯಾಲೆನ್ಸ್: ${fmt(remainingBudget)} (ಒಟ್ಟು ${fmt(totalBudget)})
• ವಸತಿ ಬಾಕಿ: ${fmt(allocations.stay - categorySpent.stay)}
• ಸಾರಿಗೆ ಬಾಕಿ: ${fmt(allocations.travel - categorySpent.travel)}
• ಆಹಾರ ಬಾಕಿ: ${fmt(allocations.food - categorySpent.food)}
ನಿಮ್ಮ ಪ್ರವಾಸ ವೆಚ್ಚ ಸುರಕ್ಷಿತ ಮಿತಿಯಲ್ಲಿದೆ!`;
      } else if (currentLang === 'hi') {
        return `आपका लाइव वित्तीय विवरण:
• शेष राशि: ${fmt(remainingBudget)} (कुल ${fmt(totalBudget)})
• होटल/स्टे बाकी: ${fmt(allocations.stay - categorySpent.stay)}
• लोकल ट्रांसपोर्ट बाकी: ${fmt(allocations.travel - categorySpent.travel)}
• खान-पान बाकी: ${fmt(allocations.food - categorySpent.food)}
आपका खर्च बिल्कुल सुरक्षित और योजनाबद्ध है!`;
      }
      return `Live Financial Pulse for ${trip.destinationName}:
• Total Pool: ${fmt(totalBudget)} | Remaining: ${fmt(remainingBudget)}
• Stay: ${fmt(allocations.stay - categorySpent.stay)} left
• Transit: ${fmt(allocations.travel - categorySpent.travel)} left
• Food: ${fmt(allocations.food - categorySpent.food)} left
• Heritage: ${fmt(allocations.activities - categorySpent.activities)} left`;
    }

    if (q.includes('500') || q.includes('under') || q.includes('cheap') || q.includes('குறைந்த') || q.includes('ಕಡಿಮೆ')) {
      if (currentLang === 'ta') {
        return `₹500-க்குள் சிறந்த அனுபவங்கள்:
1. பன்னா மீனா கா குண்ட் (படி கிணறு) - இலவச நுழைவு (கேமரா ₹50).
2. லஸ்ஸிவாலா (MI சாலை) - பாரம்பரிய சுவையான மண்குவளை லஸ்ஸி ₹90.
3. அனோகி கைவினை அச்சு அருங்காட்சியகம் - நுழைவு ₹80.`;
      } else if (currentLang === 'kn') {
        return `₹500 ರೊಳಗೆ ಅತ್ಯುತ್ತಮ ಸ್ಥಳಗಳು:
1. ಪನ್ನಾ ಮೀನಾ ಕಾ ಕುಂಡ್ (ಮೆಟ್ಟಿಲು ಬಾವಿ) - ಉಚಿತ ಪ್ರವೇಶ (ಕ್ಯಾಮೆರಾ ₹50).
2. ಲಸ್ಸೀವಾಲಾ (MI ರಸ್ತೆ) - ಮಣ್ಣಿನ ಮಡಕೆಯ ಲಸ್ಸಿ ₹90.
3. ಅನೋಖಿ ಕೈಮಗ್ಗ ವಸ್ತುಸಂಗ್ರಹಾಲಯ - ಪ್ರವೇಶ ಶುಲ್ಕ ₹80.`;
      }
      return `Top experiences under ₹500 in ${trip.destinationName}:
1. 🏛️ Panna Meena ka Kund: Free entry (Camera ₹50). 450-yr-old geometric stepwell.
2. 🥛 Original Lassiwala (Shop 312, MI Road): Legendary clay-kulhad malai lassi for ₹90.
3. 🎨 Anokhi Museum: ₹80 entry to see 400-year-old Bagru woodblock carvers.`;
    }

    if (q.includes('scam') || q.includes('safety') || q.includes('மோசடி') || q.includes('ವಂಚನೆ')) {
      return `⚠️ Key Safety Precautions for ${trip.destinationName}:
1. Auto Driver Commission Route: Drivers may urge "Government Emporium" visits for cheap fares. Firmly decline and say "Meter se chaliye".
2. Cheap Gemstone Traps in Johari Bazaar: Avoid private dealers offering gems to resell abroad.
3. Emergency Desk: Dial 112 or Tourist Police desk at 0141-2601934 immediately for help.`;
    }

    if (q.includes('bargain') || q.includes('பேரம்') || q.includes('ಚೌಕಾಶಿ')) {
      return `Handicraft Bargaining Phrases:
• Tamil: "Konjam kuraichi vaiyunga, naanga student." (Please reduce a bit, we are students.)
• Kannada: "Swalpa kammi maadi, naavu students." (Please lower the price a little.)
• Hindi: "Bhaiya, thoda theek lagao."
Pro tip: Start by offering 60-70% of quoted price in street bazaars.`;
    }

    return `[Context-Injected Assistant] In ${trip.destinationName} with ${fmt(remainingBudget)} balance:
I recommend exploring **Panna Meena ka Kund** followed by lunch at **LMB Johari Bazaar** for authentic Ghewar. Would you like transit fare estimation?`;
  };

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const q = inputVal.trim();
    const userMsg = { id: `u_${Date.now()}`, sender: 'user', text: q, time: 'Now' };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateReply(q, lang);
      const botMsg = { id: `b_${Date.now()}`, sender: 'bot', text: reply, time: 'Now' };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="pb-24 pt-2 px-3.5 max-w-md mx-auto flex flex-col h-[calc(100vh-130px)] animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center pb-2 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-[#0084FF] flex items-center justify-center text-white shadow">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>AI Yatri Sahayak</span>
              <span className="text-[9px] px-1 rounded bg-[#00D06C]/20 text-[#00D06C] font-semibold border border-[#00D06C]/30">
                Context-Aware
              </span>
            </h3>
            <p className="text-[9px] text-slate-400">Aware of: {trip.destinationName} • {fmt(remainingBudget)} balance</p>
          </div>
        </div>

        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="bg-[#131D33] border border-white/10 text-slate-200 text-xs rounded-lg px-2 py-1 font-bold"
        >
          {availableLanguages.map((l) => (
            <option key={l.code} value={l.code} className="bg-slate-900 text-white">
              {l.flag} {l.name}
            </option>
          ))}
        </select>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-3 space-y-2.5 text-xs pr-1">
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${m.sender === 'user' ? 'bg-[#0084FF] text-white rounded-tr-none font-medium' : 'smart-card border border-white/10 text-slate-200 rounded-tl-none'}`}>
              <div className="whitespace-pre-line">{m.text}</div>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-slate-500 mt-0.5 px-1">
              <span>{m.time}</span>
              {m.sender === 'bot' && (
                <button onClick={() => speakText(m.text, lang)} className="hover:text-cyan-400">
                  <Volume2 className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="p-2.5 rounded-xl bg-[#131D33] text-[10px] text-slate-400 border border-white/5 inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
            <span>Synthesizing trip response...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Chips */}
      <div className="py-1.5 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        {QUICK_PROMPTS.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => { setInputVal(qp.q); }}
            className="px-2.5 py-1 rounded-full bg-[#131D33] hover:bg-slate-700 text-[10px] font-semibold text-slate-300 hover:text-white border border-white/10 whitespace-nowrap"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="pt-2 border-t border-white/10 shrink-0 flex gap-2">
        <input
          type="text"
          placeholder="Ask in English, Hindi, Tamil, Kannada..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-[#131D33] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
        />
        <button
          onClick={handleSend}
          disabled={!inputVal.trim()}
          className="w-9 h-9 rounded-xl bg-[#0084FF] hover:bg-[#0055D4] disabled:opacity-40 text-white flex items-center justify-center font-bold shadow"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
