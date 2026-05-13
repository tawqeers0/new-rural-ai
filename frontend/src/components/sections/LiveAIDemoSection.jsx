import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, Volume2, Globe, Sparkles, MapPin, Activity, Check, BookOpen, BrainCircuit, Play } from 'lucide-react';
import { Button } from '../ui/Button';

// Mock Translation Dictionary for common phrases
const translations = {
  Hindi: {
    "subtraction means taking one number away from another.": "घटाव का मतलब एक संख्या से दूसरी संख्या को निकालना है।",
    "addition means combining numbers.": "जोड़ का मतलब संख्याओं को मिलाना है।",
    "photosynthesis is the process": "प्रकाश संश्लेषण वह प्रक्रिया है जिससे पौधे अपना भोजन बनाते हैं।",
    "h2so4 is sulfuric acid.": "H2SO4 सल्फ्यूरिक एसिड है। यह उद्योगों में इस्तेमाल होने वाला एक मजबूत एसिड है।",
    "democracy means a system where people choose their government by voting.": "लोकतंत्र का अर्थ एक ऐसी प्रणाली है जहाँ लोग मतदान करके अपनी सरकार चुनते हैं।",
    "step": "चरण", "final answer:": "अंतिम उत्तर:"
  },
  Kannada: {
    "subtraction means taking one number away from another.": "ವ್ಯವಕಲನ ಎಂದರೆ ಒಂದು ಸಂಖ್ಯೆಯನ್ನು ಇನ್ನೊಂದರಿಂದ ತೆಗೆಯುವುದು.",
    "addition means combining numbers.": "ಸೇರಿಸುವಿಕೆ ಎಂದರೆ ಸಂಖ್ಯೆಗಳ ಸಂಯೋಜನೆ.",
    "photosynthesis is the process": "ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯು ಸಸ್ಯಗಳು ತಮ್ಮ ಆಹಾರವನ್ನು ತಯಾರಿಸುವ ಪ್ರಕ್ರಿಯೆಯಾಗಿದೆ.",
    "h2so4 is sulfuric acid.": "H2SO4 ಸಲ್ಫ್ಯೂರಿಕ್ ಆಮ್ಲವಾಗಿದೆ.",
    "democracy means a system where people choose their government by voting.": "ಪ್ರಜಾಪ್ರಭುತ್ವ ಎಂದರೆ ಜನರು ಮತದಾನದ ಮೂಲಕ ತಮ್ಮ ಸರ್ಕಾರವನ್ನು ಆಯ್ಕೆ ಮಾಡುವ ವ್ಯವಸ್ಥೆ.",
    "step": "ಹಂತ", "final answer:": "ಅಂತಿಮ ಉತ್ತರ:"
  },
  Tamil: {
    "subtraction means taking one number away from another.": "கழித்தல் என்பது ஒரு எண்ணிலிருந்து மற்றொரு எண்ணை எடுப்பதாகும்.",
    "addition means combining numbers.": "கூட்டல் என்பது எண்களை இணைப்பதாகும்.",
    "photosynthesis is the process": "ஒளிச்சேர்க்கை என்பது தாவரங்கள் தங்கள் உணவை உருவாக்கும் செயல்முறையாகும்.",
    "h2so4 is sulfuric acid.": "H2SO4 என்பது சல்பூரிக் அமிலமாகும்.",
    "democracy means a system where people choose their government by voting.": "ஜனநாயகம் என்பது மக்கள் வாக்களிப்பதன் மூலம் தங்கள் அரசாங்கத்தை தேர்ந்தெடுக்கும் ஒரு அமைப்பாகும்.",
    "step": "படி", "final answer:": "இறுதி பதில்:"
  },
  Telugu: {
    "subtraction means taking one number away from another.": "వ్యవకలనం అంటే ఒక సంఖ్య నుండి మరొక సంఖ్యను తీసివేయడం.",
    "addition means combining numbers.": "కూడిక అంటే సంఖ్యలను కలపడం.",
    "photosynthesis is the process": "కిరణజన్య సంయోగక్రియ అనేది మొక్కలు తమ ఆహారాన్ని తయారుచేసే ప్రక్రియ.",
    "h2so4 is sulfuric acid.": "H2SO4 సల్ఫ్యూరిక్ ఆమ్లం.",
    "democracy means a system where people choose their government by voting.": "ప్రజాస్వామ్యం అంటే ప్రజలు ఓటు ద్వారా తమ ప్రభుత్వాన్ని ఎన్నుకునే వ్యవస్థ.",
    "step": "దశ", "final answer:": "తుది సమాధానం:"
  }
};

export const LiveAIDemoSection = ({ id }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Namaste! I am your AI Tutor. What would you like to learn today?', type: 'text', subject: 'General' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('English');
  const [isListening, setIsListening] = useState(false);
  const [pulseMap, setPulseMap] = useState(false);
  
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Setup Web Speech API for Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        handleSend(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setPulseMap(true);
    setTimeout(() => setPulseMap(false), 2000);
  };

  const speakText = (text, targetLang) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      
      const langMap = {
        'Hindi': 'hi-IN',
        'Kannada': 'kn-IN',
        'Tamil': 'ta-IN',
        'Telugu': 'te-IN',
        'English': 'en-IN'
      };
      utterance.lang = langMap[targetLang] || 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const processAIResponse = (text) => {
    const query = text.toLowerCase();
    
    // Math Regex: matches "solve 144 / 12", "25 * 12", "45 x 12"
    const mathMatch = query.match(/(\d+)\s*([+\-*xX\/÷])\s*(\d+)/);
    
    if (mathMatch || query.includes("integrate")) {
      if (query.includes("integrate x²") || query.includes("integrate x^2")) {
        return {
          type: 'math',
          subject: 'Mathematics',
          content: "∫x² dx = x³/3 + C"
        };
      }
      if (mathMatch) {
        let num1 = parseFloat(mathMatch[1]);
        let op = mathMatch[2].toLowerCase();
        let num2 = parseFloat(mathMatch[3]);
        let result = 0;
        let steps = [];

        if (op === 'x' || op === '*') {
          result = num1 * num2;
          steps = [
            `${num1} × 10 = ${num1 * 10}`,
            `${num1} × ${num2 % 10} = ${num1 * (num2 % 10)}`,
            `${num1 * 10} + ${num1 * (num2 % 10)} = ${result}`
          ];
        } else if (op === '/' || op === '÷') {
          result = num1 / num2;
          steps = [
            `${num2} × ${Math.floor(result)} = ${num2 * Math.floor(result)}`,
            `${num1} ÷ ${num2} = ${result}`
          ];
        } else if (op === '+') {
          result = num1 + num2;
          steps = [`${num1} + ${num2} = ${result}`];
        } else if (op === '-') {
          result = num1 - num2;
          steps = [`${num1} - ${num2} = ${result}`];
        }

        return {
          type: 'math_steps',
          subject: 'Mathematics',
          equation: `${num1} ${op.replace('x','×').replace('*','×').replace('/','÷')} ${num2} = ${result}`,
          steps: steps,
          final: result,
          content: `${num1} ${op.replace('x','×').replace('*','×').replace('/','÷')} ${num2} = ${result}`
        };
      }
    }

    if (query.includes("h2so4") || query.includes("chemistry")) {
      return { type: 'text', subject: 'Chemistry', content: "H2SO4 is Sulfuric Acid. It is a strong mineral acid used in industries and laboratories." };
    }
    if (query.includes("photosynthesis")) {
      return { type: 'text', subject: 'Science', content: "Photosynthesis is the process where plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar." };
    }
    if (query.includes("democracy")) {
      return { type: 'text', subject: 'Social Science', content: "Democracy means a system where people choose their government by voting." };
    }
    if (query.includes("addition")) {
      return { type: 'text', subject: 'Mathematics', content: "Addition means combining numbers." };
    }
    if (query.includes("subtraction")) {
      return { type: 'text', subject: 'Mathematics', content: "Subtraction means taking one number away from another." };
    }

    // Default Fallback
    return { type: 'text', subject: 'General Knowledge', content: "That is a great question! Based on the NCERT syllabus, " + query.split(" ").slice(0, 5).join(" ") + "... requires deeper context. Would you like a step-by-step module on this?" };
  };

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    // User Message
    const userMsg = { role: 'user', content: text, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // AI Generation
    setTimeout(() => {
      const responseObj = processAIResponse(text);
      
      // Handle Translation if not English
      let displayContent = responseObj.content;
      let translatedText = null;

      if (language !== 'English' && responseObj.type === 'text') {
        const lowerContent = responseObj.content.toLowerCase();
        // Find rough match in dictionary
        for (const [engPhrase, localPhrase] of Object.entries(translations[language] || {})) {
           if (lowerContent.includes(engPhrase) || engPhrase.includes(lowerContent.substring(0, 15))) {
             translatedText = localPhrase;
             displayContent = localPhrase;
             break;
           }
        }
        if (!translatedText) {
           displayContent = `[Translated to ${language}]: ` + responseObj.content;
        }
      }

      const aiMsg = { 
        role: 'ai', 
        ...responseObj,
        displayContent: displayContent,
        language: language,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      speakText(displayContent, language);

    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return (
    <section id={id} className="py-24 bg-white relative overflow-hidden border-b border-gray-100">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-sm font-bold mb-4">
            <Sparkles size={16} /> Live AI Experience
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-extrabold text-[#0a192f] tracking-tight mb-4">
            Experience the Vernacular AI Tutor
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-xl text-gray-600 leading-relaxed font-medium">
            Test the dynamic engine live. Ask a math question, request a translation, or press the mic to speak!
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Animated India Map & Connectivity */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[550px] bg-[#0a192f] border border-[#112240] rounded-3xl p-8 shadow-2xl overflow-hidden flex flex-col justify-center items-center group">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
            
            <h3 className="absolute top-8 left-8 text-lg font-bold text-white flex items-center gap-2 z-10">
              <Activity size={20} className="text-cyan-400" /> Active Edge Nodes
            </h3>

            {/* Simulated Abstract Map Visualization */}
            <div className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ${pulseMap ? 'scale-110' : 'scale-100'}`}>
              {/* Outer rings */}
              <div className={`absolute w-64 h-64 border rounded-full transition-all duration-500 ${pulseMap ? 'border-cyan-400 border-2 shadow-[0_0_30px_rgba(6,182,212,0.8)] animate-ping' : 'border-blue-500/20 animate-[spin_10s_linear_infinite]'}`}></div>
              <div className="absolute w-80 h-80 border border-cyan-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              
              {/* Central Server Node */}
              <div className="w-16 h-16 bg-[#0a192f] border-2 border-cyan-400 rounded-full flex items-center justify-center z-10 shadow-[0_0_30px_rgba(6,182,212,0.4)] relative">
                {pulseMap && <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-50"></div>}
                <Globe className="text-cyan-400 relative z-10" size={32} />
              </div>

              {/* Data streams / Ping lines */}
              <div className={`absolute top-1/4 left-1/4 w-32 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent transform rotate-45 origin-left ${pulseMap ? 'animate-none bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,1)]' : 'animate-pulse'}`}></div>
              <div className={`absolute top-3/4 right-1/4 w-40 h-0.5 bg-gradient-to-l from-blue-400 to-transparent transform -rotate-12 origin-right ${pulseMap ? 'animate-none bg-blue-300 shadow-[0_0_10px_rgba(59,130,246,1)]' : 'animate-pulse'}`}></div>
              <div className="absolute bottom-1/4 left-1/3 w-24 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent transform -rotate-45 origin-left animate-pulse"></div>

              {/* Remote Nodes */}
              <div className="absolute top-1/4 left-1/4 -translate-x-3 -translate-y-3">
                <MapPin size={24} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              </div>
              <div className="absolute top-3/4 right-1/4 translate-x-3 translate-y-3">
                <MapPin size={24} className="text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
              <div className="flex gap-4 items-center bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 w-full justify-between">
                <span className="font-bold text-white text-sm flex items-center gap-2"><Globe size={16}/> Target Language:</span>
                <select 
                  value={language} 
                  onChange={handleLanguageChange}
                  className="bg-white border border-gray-200 text-[#0a192f] text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-2 font-bold outline-none shadow-sm cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                  <option value="Tamil">Tamil (தமிழ்)</option>
                  <option value="Telugu">Telugu (తెలుగు)</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Right Chat UI */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-3xl transform rotate-2 scale-105 filter blur-xl pointer-events-none"></div>
            
            <div className="relative bg-white border border-gray-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col h-[550px]">
              {/* Chat Header */}
              <div className="bg-[#0a192f] p-5 flex items-center justify-between border-b border-[#112240]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <BrainCircuit className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white leading-tight">AI Educational Assistant</h3>
                    <p className="text-xs text-blue-400 font-medium tracking-wide">● Online • Responding in {language}</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    
                    {/* Subject Badge for AI */}
                    {msg.role === 'ai' && msg.subject && (
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 ml-1 flex items-center gap-1">
                        <BookOpen size={10}/> {msg.subject}
                      </span>
                    )}

                    <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm relative group ${msg.role === 'user' ? 'bg-[#0a192f] text-white rounded-br-sm' : 'bg-[#EFF6FF] border-l-4 border-[#2563EB] text-gray-800 rounded-bl-sm'}`}>
                      
                      {/* Message Content */}
                      {msg.type === 'math_steps' ? (
                        <div className="space-y-2">
                           <p className="font-bold text-[#0a192f] mb-2">{msg.equation}</p>
                           <div className="bg-white p-3 rounded-lg border border-blue-100 font-mono text-sm text-blue-800 space-y-1">
                             {msg.steps.map((step, i) => (
                               <motion.div key={i} initial={{opacity:0}} animate={{opacity:1}} transition={{delay: i * 0.3}}>
                                 {translations[msg.language]?.["step"] || 'Step'} {i+1}: {step}
                               </motion.div>
                             ))}
                           </div>
                           <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay: msg.steps.length * 0.3}} className="text-green-700 font-extrabold bg-green-50 px-2 py-1 rounded inline-block mt-2">
                             {translations[msg.language]?.["final answer:"] || 'Final Answer:'} {msg.final}
                           </motion.p>
                        </div>
                      ) : (
                        <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.displayContent || msg.content}</p>
                      )}

                      {/* AI Action Row */}
                      {msg.role === 'ai' && (
                        <div className="mt-3 pt-3 border-t border-blue-200/50 flex items-center justify-between">
                          <button onClick={() => speakText(msg.displayContent || msg.content, msg.language)} className="text-[#2563EB] hover:text-blue-800 flex items-center gap-1 text-xs font-bold transition-colors">
                            <Volume2 size={14} /> Speak
                          </button>
                          <span className="text-[10px] text-gray-400 font-bold">{msg.timestamp || 'Just now'}</span>
                        </div>
                      )}

                      {/* User Timestamp */}
                      {msg.role === 'user' && (
                        <span className="absolute -bottom-5 right-1 text-[10px] text-gray-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">{msg.timestamp}</span>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[#EFF6FF] border-l-4 border-[#2563EB] shadow-sm rounded-2xl rounded-bl-sm p-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#2563EB] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#2563EB] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-[#2563EB] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggested Questions */}
              <div className="px-4 py-2 bg-gray-50 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide border-t border-gray-100">
                 {["Solve 144 ÷ 12", "What is H2SO4?", "Meaning of democracy"].map((q, i) => (
                   <button key={i} onClick={() => handleSend(q)} className="text-xs font-bold text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:border-[#2563EB] hover:text-[#2563EB] transition-colors shrink-0 shadow-sm">
                     {q}
                   </button>
                 ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white flex gap-3 items-end border-t border-gray-200">
                <Button 
                  variant="ghost" 
                  className={`w-12 h-12 rounded-full p-0 flex items-center justify-center shrink-0 border transition-colors ${isListening ? 'bg-red-50 text-red-500 border-red-200 animate-pulse' : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100 hover:text-[#0a192f]'}`}
                  onClick={toggleListen}
                  title="Voice Input"
                >
                  <Mic size={20} />
                </Button>
                
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl shadow-inner relative flex items-center min-h-[48px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                  <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask math, science, english..."
                    className="w-full bg-transparent text-[#0a192f] text-sm p-3 outline-none resize-none min-h-[48px] max-h-[120px] overflow-y-auto font-medium"
                    rows="1"
                    style={{ paddingTop: '14px' }}
                  />
                </div>

                <Button className="w-12 h-12 rounded-full p-0 flex items-center justify-center shrink-0 bg-[#0a192f] hover:bg-[#112240] border-0 shadow-lg" onClick={() => handleSend(input)}>
                  <Send size={18} className="ml-1 text-white" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
