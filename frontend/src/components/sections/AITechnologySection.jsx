import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, Languages, Cpu, Network, ArrowRight, X, PlayCircle, 
  MessageSquare, AudioLines, Globe, UserCheck, ShieldCheck, Server, 
  Activity, Zap, Users, BarChart3, Database, FileText, CheckCircle, 
  Smartphone, HardDrive, Download, Mic, Play, Volume2, Send,
  RefreshCw, Check, BookOpen, AlertCircle, Target, TrendingUp, Layers, Sparkles, Wifi
} from 'lucide-react';
import { Button } from '../ui/Button';

export const AITechnologySection = ({ id }) => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (type) => {
    setActiveModal(type);
  };

  return (
    <section id={id} className="py-24 bg-white relative overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header & Status Cards */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-sm font-bold mb-4">
              <Cpu size={16} /> Advanced AI Infrastructure
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#0a192f]">
              Powering the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Rural Learning</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-4 text-xl text-gray-600 font-medium">
              Interactive, live AI demonstrations. Click any technology, status badge, or architecture step to explore the engine in real-time.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0">
            <StatusBadge text="AI Engine Active" color="blue" onClick={() => openModal('status_engine')} />
                        <StatusBadge text="Graph Networks Live" color="indigo" onClick={() => openModal('status_graph')} />
            <StatusBadge text="Offline Sync Ready" color="slate" onClick={() => openModal('status_offline')} />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Left Column: Interactive Cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            <TechCard 
              title="Generative AI Tutor" 
              desc="Locally hosted LLMs that answer questions, solve math step-by-step, and explain concepts perfectly."
              icon={<BrainCircuit size={32} />} 
              color="blue"
              onClick={() => openModal('tutor')}
            />
            <TechCard 
              title="Smart Recommendations" 
              desc="Graph neural networks mapping student weaknesses to generate targeted practice paths."
              icon={<Network size={32} />} 
              color="indigo"
              onClick={() => openModal('recommendation')}
            />
          </div>

          {/* Right Column: Animated Architecture Flow */}
          <div className="bg-[#0a192f] border border-[#112240] rounded-3xl p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(10,25,47,0.1)]">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0a192f] to-[#0a192f]"></div>
             
             <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2 relative z-10"><Server size={18} className="text-cyan-400"/> System Architecture</h3>
             
             <div className="space-y-6 relative z-10">
               <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-[#1e293b]"></div>
               
               <FlowStep 
                 icon={<MessageSquare />} 
                 title="1. Student Input" 
                 desc="Voice or text query received via Edge Node"
                 onClick={() => openModal('arch_input')} 
               />
               <FlowStep 
                 icon={<BrainCircuit />} 
                 title="2. LLM Processing" 
                 desc="Intent detection & educational reasoning" 
                 active 
                 onClick={() => openModal('arch_llm')}
               />
                              <FlowStep 
                 icon={<Network />} 
                 title="3. Graph Network" 
                 desc="Updates student's learning heatmap"
                 onClick={() => openModal('arch_graph')} 
               />
               <FlowStep 
                 icon={<UserCheck />} 
                 title="4. Teacher Dashboard" 
                 desc="Actionable analytics delivered to teacher"
                 onClick={() => openModal('arch_teacher')} 
               />
             </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 'tutor' && <AITutorModal onClose={() => setActiveModal(null)} />}
                {activeModal === 'recommendation' && <RecommendationModal onClose={() => setActiveModal(null)} />}
        
        {/* Status Modals */}
        {activeModal === 'status_engine' && <StatusEngineModal onClose={() => setActiveModal(null)} />}
                {activeModal === 'status_graph' && <StatusGraphModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'status_offline' && <StatusOfflineModal onClose={() => setActiveModal(null)} />}

        {/* Architecture Modals */}
        {activeModal === 'arch_input' && <ArchInputModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'arch_llm' && <ArchLLMModal onClose={() => setActiveModal(null)} />}
                {activeModal === 'arch_graph' && <ArchGraphModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'arch_teacher' && <ArchTeacherModal onClose={() => setActiveModal(null)} />}
      </AnimatePresence>
    </section>
  );
};

// --------- Sub Components --------- //

const PremiumButton = ({ children, onClick, className = '' }) => (
  <button 
    onClick={onClick} 
    className={`font-bold text-white rounded-xl flex items-center justify-center gap-2 transition-all ${className}`}
    style={{
      background: 'linear-gradient(135deg, #0F172A, #1E3A8A)',
      boxShadow: '0 10px 20px rgba(15,23,42,0.1)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(15,23,42,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 10px 20px rgba(15,23,42,0.1)';
    }}
  >
    {children}
  </button>
);

const StatusBadge = ({ text, color, onClick }) => {
  const colorMap = {
    blue: 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300',
    cyan: 'text-cyan-600 bg-cyan-50 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300',
    indigo: 'text-indigo-600 bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300',
    slate: 'text-slate-600 bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
  };
  const dotMap = {
    blue: 'bg-blue-500',
    cyan: 'bg-cyan-500',
    indigo: 'bg-indigo-500',
    slate: 'bg-slate-500'
  };

  return (
    <button onClick={onClick} className={`px-4 py-3 border rounded-xl flex items-center gap-2 text-sm font-bold transition-all cursor-pointer shadow-sm hover:shadow-md ${colorMap[color]}`}>
      <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${dotMap[color]}`}></span>
      {text}
    </button>
  );
};

const TechCard = ({ title, desc, icon, color, onClick, className = '' }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`bg-white border border-gray-200 hover:border-blue-300 p-8 rounded-3xl cursor-pointer group transition-all relative overflow-hidden shadow-lg hover:shadow-xl hover:shadow-blue-900/5 ${className}`}
  >
    <div className={`absolute -right-10 -top-10 w-40 h-40 bg-${color}-50 rounded-full blur-3xl group-hover:bg-${color}-100 transition-colors`}></div>
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-[#0a192f] text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-[#0a192f] mb-3 flex items-center justify-between">
      {title} <ArrowRight className={`text-cyan-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 transform duration-300`} />
    </h3>
    <p className="text-gray-600 leading-relaxed font-medium">{desc}</p>
    
    <div className={`mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md group-hover:bg-blue-100 transition-colors`}>
      <PlayCircle size={14} /> Click to launch live demo
    </div>
  </motion.div>
);

const FlowStep = ({ icon, title, desc, active, onClick }) => (
  <div onClick={onClick} className="flex items-start gap-4 relative z-10 group cursor-pointer p-2 -ml-2 rounded-xl hover:bg-[#112240] transition-colors">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-[#0a192f] shadow-xl transition-all ${active ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-[#1e293b] text-gray-400 group-hover:bg-[#334155] group-hover:text-white'}`}>
      {icon}
    </div>
    <div className="pt-2">
      <h4 className={`font-bold transition-colors ${active ? 'text-cyan-400' : 'text-gray-300 group-hover:text-cyan-300'}`}>{title}</h4>
      <p className="text-sm text-gray-500 mt-1 font-medium">{desc}</p>
    </div>
  </div>
);

// --------- Generic Modal Wrapper --------- //
const ModalWrapper = ({ onClose, title, children }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a192f]/80 backdrop-blur-md p-4">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl relative border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]"
    >
      <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-[#f8fafc]">
        <h2 className="text-xl font-bold text-[#0a192f] flex items-center gap-2"><Sparkles size={20} className="text-cyan-600"/> {title}</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors">
          <X size={20} />
        </button>
      </div>
      <div className="p-8 overflow-y-auto flex-1 bg-white">
        {children}
      </div>
    </motion.div>
  </div>
);

// --------- Feature Modals --------- //

const translations = {
  Hindi: { "integration is a mathematical method": "समाकलन एक गणितीय विधि है...", "subtraction means taking one number away from another.": "घटाव का मतलब एक संख्या से दूसरी संख्या को निकालना है।", "addition means combining numbers.": "जोड़ का मतलब संख्याओं को मिलाना है।", "photosynthesis is the process": "प्रकाश संश्लेषण वह प्रक्रिया है जिससे पौधे अपना भोजन बनाते हैं।", "h2so4 is sulfuric acid.": "H2SO4 सल्फ्यूरिक एसिड है।", "democracy means a system where people choose their government by voting.": "लोकतंत्र का अर्थ एक ऐसी प्रणाली है जहाँ लोग मतदान करके अपनी सरकार चुनते हैं।" },
  Kannada: { "integration is a mathematical method": "ಸಮಗ್ರತೆ (Integration) ಎಂಬುದು ಒಂದು ಗಣಿತ ವಿಧಾನ...", "subtraction means taking one number away from another.": "ವ್ಯವಕಲನ ಎಂದರೆ ಒಂದು ಸಂಖ್ಯೆಯನ್ನು ಇನ್ನೊಂದರಿಂದ ತೆಗೆಯುವುದು." },
  Tamil: { "integration is a mathematical method": "ஒருங்கிணைப்பு (Integration) என்பது ஒரு கணித முறை...", "subtraction means taking one number away from another.": "கழித்தல் என்பது ஒரு எண்ணிலிருந்து மற்றொரு எண்ணை எடுப்பதாகும்." },
  Telugu: { "integration is a mathematical method": "సమీకరణ (Integration) అనేది ఒక గణిత పద్ధతి...", "subtraction means taking one number away from another.": "వ్యవకలనం అంటే ఒక సంఖ్య నుండి మరొక సంఖ్యను తీసివేయడం." }
};

const AITutorModal = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('English');
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  useEffect(() => {
    // Run cool intro sequence on mount
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([{ role: 'ai', content: 'Namaste! I am your Generative AI Tutor. Watch how I can break down complex problems step-by-step.', type: 'text', subject: 'General' }]);
        setIsTyping(false);
      }, 1000);
    }, 500);
  }, []);

  const speakText = (text, targetLang) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const langMap = { 'Hindi': 'hi-IN', 'Kannada': 'kn-IN', 'Tamil': 'ta-IN', 'Telugu': 'te-IN', 'English': 'en-IN' };
      utterance.lang = langMap[targetLang] || 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const processAIResponse = (text) => {
    const query = text.toLowerCase();
    const mathMatch = query.match(/(\d+)\s*([+\-*xX\/÷])\s*(\d+)/);
    
    if (query.includes("integration") || query.includes("integrate")) {
      return { type: 'math_steps', subject: 'Mathematics', equation: '∫x² dx = ?', steps: ["Identify the power rule: ∫x^n dx = (x^(n+1))/(n+1)", "Apply n = 2", "∫x² dx = (x^(2+1))/(2+1)"], final: "x³/3 + C", content: "Integration is a mathematical method used to calculate area, accumulation, and continuous change. Example: ∫x² dx = x³/3 + C" };
    }
    if (mathMatch) {
      let num1 = parseFloat(mathMatch[1]), op = mathMatch[2].toLowerCase(), num2 = parseFloat(mathMatch[3]), result = 0, steps = [];
      if (op === 'x' || op === '*') { result = num1 * num2; steps = [`${num1} × 10 = ${num1 * 10}`, `${num1} × ${num2 % 10} = ${num1 * (num2 % 10)}`, `${num1 * 10} + ${num1 * (num2 % 10)} = ${result}`]; }
      else if (op === '/' || op === '÷') { result = num1 / num2; steps = [`${num2} × ${Math.floor(result)} = ${num2 * Math.floor(result)}`, `${num1} ÷ ${num2} = ${result}`]; }
      else if (op === '+') { result = num1 + num2; steps = [`${num1} + ${num2} = ${result}`]; }
      else if (op === '-') { result = num1 - num2; steps = [`${num1} - ${num2} = ${result}`]; }
      return { type: 'math_steps', subject: 'Mathematics', equation: `${num1} ${op.replace('x','×').replace('*','×').replace('/','÷')} ${num2} = ${result}`, steps: steps, final: result, content: `${num1} ${op.replace('x','×').replace('*','×').replace('/','÷')} ${num2} = ${result}` };
    }
    if (query.includes("h2so4")) return { type: 'text', subject: 'Chemistry', content: "H2SO4 is Sulfuric Acid." };
    if (query.includes("photosynthesis")) return { type: 'text', subject: 'Science', content: "Photosynthesis is the process where plants use sunlight to create food." };
    
    // Default dynamic response
    return { type: 'text', subject: 'AI Guidance', content: "That's an excellent question! I am analyzing the NCERT database to provide a precise, curriculum-aligned answer..." };
  };

  const handleSend = (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: text, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const responseObj = processAIResponse(text);
      let displayContent = responseObj.content;
      setMessages(prev => [...prev, { role: 'ai', ...responseObj, displayContent: displayContent, language: language, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]);
      setIsTyping(false);
      speakText(displayContent, language);
    }, 1500);
  };

  return (
    <ModalWrapper onClose={onClose} title="Live Generative AI Chatbot">
      <div className="flex flex-col h-[70vh]">
        <div className="bg-[#0a192f] p-4 flex items-center justify-between border-b border-[#112240] rounded-t-2xl shrink-0">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-blue-400/20 animate-pulse blur-md"></div>
               <BrainCircuit size={24} className="text-cyan-400 relative z-10" />
             </div>
             <div>
               <h3 className="font-bold text-white leading-tight flex items-center gap-2">RuralAI Neural Engine</h3>
               <p className="text-xs text-blue-400 font-medium">● Latency: 48ms • Models Loaded</p>
             </div>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 border-x border-gray-200">
          {messages.map((msg, idx) => (
            <motion.div initial={{opacity:0, y:10, scale:0.95}} animate={{opacity:1, y:0, scale:1}} key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              {msg.role === 'ai' && msg.subject && <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 ml-1 flex items-center gap-1"><BookOpen size={10}/> {msg.subject}</span>}
              <div className={`max-w-[85%] rounded-2xl p-4 shadow-md relative group ${msg.role === 'user' ? 'bg-[#0a192f] text-white rounded-br-sm' : 'bg-white border-l-4 border-[#2563EB] text-[#0a192f] rounded-bl-sm'}`}>
                {msg.type === 'math_steps' ? (
                  <div className="space-y-2">
                     <p className="font-bold text-[#0a192f] mb-2">{msg.content.split('Example:')[0]}</p>
                     <p className="font-bold text-blue-700 bg-blue-50 p-2 rounded shadow-inner text-center text-lg">{msg.equation}</p>
                     <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 font-mono text-sm space-y-2">
                       {msg.steps.map((step, i) => <motion.div key={i} initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} transition={{delay: i * 0.4}} className="flex items-center gap-2"><div className="w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs shrink-0">{i+1}</div> {step}</motion.div>)}
                     </div>
                     <motion.div initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{delay: msg.steps.length * 0.4}} className="text-white font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-lg inline-block mt-3 shadow-lg">Final Answer: {msg.final}</motion.div>
                  </div>
                ) : <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.displayContent || msg.content}</p>}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="flex justify-start">
              <div className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-bl-sm p-4 flex items-center gap-2">
                <div className="text-xs font-bold text-gray-500 mr-2 flex items-center gap-1"><BrainCircuit size={12}/> AI is analyzing syntax</div>
                <div className="w-2 h-2 bg-[#2563EB] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#2563EB] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-[#2563EB] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="px-4 py-3 bg-white flex flex-col gap-2 border-x border-t border-gray-200 shadow-[0_-5px_15px_rgba(0,0,0,0.02)] relative z-10">
           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Interactive Demos (Click one)</p>
           <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-2">
             {["What is integration?", "Solve 124 × 42", "What is photosynthesis?"].map((q, i) => (
               <button key={i} onClick={() => handleSend(q)} className="text-xs font-bold text-gray-700 bg-cyan-50 border border-cyan-100 px-4 py-2 rounded-xl hover:border-cyan-400 hover:bg-cyan-100 hover:text-cyan-800 transition-all shrink-0 flex items-center gap-2 shadow-sm"><Sparkles size={12} className="text-cyan-500"/> {q}</button>
             ))}
           </div>
        </div>

        <div className="p-4 bg-white flex gap-3 items-end border-x border-b border-gray-200 rounded-b-2xl">
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl shadow-inner relative flex items-center min-h-[54px] focus-within:ring-2 focus-within:ring-blue-500 transition-all overflow-hidden">
            <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(input); } }} placeholder="Ask a question..." className="w-full bg-transparent text-[#0a192f] text-sm p-4 outline-none resize-none min-h-[54px] max-h-[120px] overflow-y-auto font-medium" rows="1" />
          </div>
          <button className="w-14 h-[54px] rounded-2xl flex items-center justify-center shrink-0 text-white font-bold transition-all border-0 shadow-lg" style={{ background: 'linear-gradient(135deg, #0F172A, #1E3A8A)' }} onClick={() => handleSend(input)}><Send size={20} /></button>
        </div>
      </div>
    </ModalWrapper>
  );
};

const RecommendationModal = ({ onClose }) => {
  const [step, setStep] = useState(0);

  const startAnalysis = () => {
    setStep(1); // Scanning
    setTimeout(() => setStep(2), 2000); // Path generation
    setTimeout(() => setStep(3), 3500); // Final reveal
  };

  return (
  <ModalWrapper onClose={onClose} title="AI Recommendation Engine">
    <div className="grid md:grid-cols-2 gap-8 min-h-[400px]">
      <div className="bg-[#0a192f] rounded-2xl p-8 relative overflow-hidden border border-[#112240] shadow-lg flex flex-col justify-center items-center">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
         
         <div className="relative z-10 w-32 h-32 mb-6">
           {step === 1 && <div className="absolute inset-0 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>}
           {step >= 2 && <div className="absolute inset-0 border-4 border-green-400 rounded-full scale-110 transition-transform"></div>}
           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arun" alt="Arun" className="w-full h-full object-cover rounded-full bg-blue-500/20" />
           {step === 1 && (
              <div className="absolute top-1/2 -left-10 w-52 h-1 bg-cyan-400/50 shadow-[0_0_15px_#22d3ee] animate-[scan_1s_ease-in-out_infinite_alternate]"></div>
           )}
         </div>

         <h3 className="text-2xl font-bold text-white relative z-10 mb-2">Arun Kumar</h3>
         
         <div className="w-full mt-4 space-y-3 relative z-10">
            {step === 0 ? (
               <p className="text-gray-400 text-center text-sm">Awaiting neural network analysis...</p>
            ) : (
               <>
                 <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} className="bg-white/10 p-3 rounded-lg flex justify-between border border-white/10">
                    <span className="text-gray-300 font-medium text-sm">Math Aptitude</span>
                    <span className="text-cyan-400 font-bold text-sm">Top 15%</span>
                 </motion.div>
                 <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay: 0.5}} className="bg-white/10 p-3 rounded-lg flex justify-between border border-white/10">
                    <span className="text-gray-300 font-medium text-sm">Current Weakness</span>
                    <span className="text-red-400 font-bold text-sm">Linear Equations</span>
                 </motion.div>
               </>
            )}
         </div>
      </div>

      <div className="flex flex-col justify-center relative">
         {step === 0 && (
           <div className="text-center">
             <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Network size={40} />
             </div>
             <h3 className="text-2xl font-bold text-[#0a192f] mb-4">Generate Custom Learning Path</h3>
             <p className="text-gray-600 mb-8">Our algorithm cross-references Arun's past 40 quizzes with the national curriculum to identify exact knowledge gaps.</p>
             <button onClick={startAnalysis} className="bg-[#0a192f] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#112240] transition-colors shadow-lg shadow-blue-900/20 w-full text-lg">
                Run AI Diagnostics
             </button>
           </div>
         )}

         {step === 1 && (
           <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
             <RefreshCw size={40} className="text-cyan-600 animate-spin" />
             <h3 className="text-xl font-bold text-[#0a192f]">Processing 10,000+ Data Points...</h3>
             <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
               <motion.div initial={{width: "0%"}} animate={{width: "100%"}} transition={{duration: 1.5, ease: "linear"}} className="h-full bg-cyan-500"></motion.div>
             </div>
           </div>
         )}

         {step >= 2 && (
           <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-5">
             <h3 className="text-xl font-bold text-[#0a192f] flex items-center gap-2 border-b border-gray-100 pb-4"><Sparkles className="text-cyan-600"/> Hyper-Personalized Roadmap</h3>
             
             <div className="relative space-y-4 pl-4 border-l-2 border-blue-100 ml-4">
                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm relative hover:border-cyan-400 transition-colors cursor-pointer group">
                   <div className="absolute -left-6 top-5 w-4 h-4 bg-cyan-500 rounded-full border-4 border-white shadow-sm"></div>
                   <div className="flex justify-between items-start mb-1">
                     <h4 className="font-bold text-[#0a192f]">1. Micro-Lesson: Equations</h4>
                     <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-1 rounded">AI Selected</span>
                   </div>
                   <p className="text-sm text-gray-500 font-medium">A targeted 3-minute video on isolating variables, translated into Kannada.</p>
                </motion.div>

                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.6}} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm relative hover:border-blue-400 transition-colors cursor-pointer group">
                   <div className="absolute -left-6 top-5 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-sm"></div>
                   <div className="flex justify-between items-start mb-1">
                     <h4 className="font-bold text-[#0a192f]">2. Adaptive Quiz</h4>
                     <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">Locked</span>
                   </div>
                   <p className="text-sm text-gray-500 font-medium">5 dynamically generated questions to test understanding.</p>
                </motion.div>

                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:1.0}} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm relative hover:border-purple-400 transition-colors cursor-pointer group">
                   <div className="absolute -left-6 top-5 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-sm"></div>
                   <div className="flex justify-between items-start mb-1">
                     <h4 className="font-bold text-[#0a192f]">3. Live AI Tutor Session</h4>
                     <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">Locked</span>
                   </div>
                   <p className="text-sm text-gray-500 font-medium">1-on-1 Q&A to clear any remaining doubts.</p>
                </motion.div>
             </div>
           </motion.div>
         )}
      </div>
    </div>
  </ModalWrapper>
  );
};

const StatusEngineModal = ({ onClose }) => {
  const [engineState, setEngineState] = useState('ACTIVE');
  const triggerCycle = () => {
    setEngineState('PROCESSING');
    setTimeout(() => setEngineState('READY'), 2000);
    setTimeout(() => setEngineState('ACTIVE'), 4000);
  };

  return (
    <ModalWrapper onClose={onClose} title="Floating AI Control Center">
      <div className="bg-[#0a192f] rounded-3xl p-8 border border-[#112240] shadow-2xl relative overflow-hidden grid lg:grid-cols-2 gap-12 min-h-[400px]">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent"></div>
         
         <div className="flex flex-col items-center justify-center relative z-10">
            <div className={`w-40 h-40 rounded-full border-4 flex items-center justify-center mb-6 relative transition-all duration-500 ${engineState === 'PROCESSING' ? 'border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.4)]' : engineState === 'READY' ? 'border-blue-400 shadow-[0_0_50px_rgba(96,165,250,0.4)]' : 'border-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.4)] animate-[spin_10s_linear_infinite]'}`}>
               <div className={`absolute inset-0 rounded-full border border-white/20 animate-ping`}></div>
               <BrainCircuit size={64} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">RuralAI Neural Engine</h3>
            <p className="text-cyan-400 font-bold tracking-widest uppercase mb-8">Model: RuralGPT v3.5</p>
            
            <PremiumButton onClick={triggerCycle} className="w-full py-4 text-lg">
               {engineState === 'PROCESSING' ? <><RefreshCw className="animate-spin"/> Processing Input...</> : engineState === 'READY' ? <><Check/> Output Ready</> : <><PlayCircle/> Simulate Query</>}
            </PremiumButton>
         </div>

         <div className="relative z-10 flex flex-col justify-center space-y-6">
            <div className="bg-[#0f172a] p-4 rounded-xl border border-white/10 font-mono text-sm text-blue-400 h-40 overflow-y-hidden relative shadow-inner">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a] z-10"></div>
               <div className="space-y-2 opacity-80">
                  <p>&gt; Initializing neural weights...</p>
                  <p>&gt; Languages Loaded: 8</p>
                  <p>&gt; System Status: ACTIVE</p>
                  <p className="text-yellow-400">&gt; Memory usage stable at 4.2GB</p>
                  {engineState === 'PROCESSING' && <p className="text-cyan-400 animate-pulse">&gt; Loading NCERT Knowledge Base...</p>}
                  {engineState === 'PROCESSING' && <p className="text-cyan-400 animate-pulse" style={{animationDelay: '0.5s'}}>&gt; Voice Processing Activated...</p>}
                  {engineState === 'READY' && <p className="text-blue-400">&gt; Response Generated Successfully.</p>}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">Latency</p>
                  <p className="text-2xl font-extrabold text-white">48ms</p>
               </div>
               <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">GPU Usage</p>
                  <p className="text-2xl font-extrabold text-white">62%</p>
               </div>
               <div className="bg-white/5 p-4 rounded-xl border border-white/10 col-span-2">
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">Students Connected</p>
                  <p className="text-3xl font-extrabold text-cyan-400">12,482</p>
               </div>
            </div>
         </div>
      </div>
    </ModalWrapper>
  );
};

const StatusGraphModal = ({ onClose }) => (
  <ModalWrapper onClose={onClose} title="Student Learning Heatmap">
    <div className="grid md:grid-cols-2 gap-8 h-[450px]">
       <div className="bg-[#0a192f] rounded-2xl p-6 relative overflow-hidden flex items-center justify-center border border-[#112240] shadow-xl">
          <Network size={200} className="text-[#1e293b] absolute" />
          
          <div className="relative z-10 w-full h-full flex items-center justify-center">
             <div className="w-64 h-64 relative animate-[spin_20s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                   <span className="text-red-400 font-bold text-xs">Math</span>
                </div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-blue-500/20 border-2 border-blue-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                   <span className="text-blue-400 font-bold text-xs">Sci</span>
                </div>
                <div className="absolute bottom-0 left-0 w-14 h-14 bg-yellow-500/20 border-2 border-yellow-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.5)]">
                   <span className="text-yellow-400 font-bold text-xs">Eng</span>
                </div>
                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full" style={{zIndex:-1}}>
                  <line x1="50%" y1="10%" x2="80%" y2="80%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                  <line x1="50%" y1="10%" x2="20%" y2="80%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                  <line x1="80%" y1="80%" x2="20%" y2="80%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                </svg>
             </div>
          </div>
       </div>

       <div className="flex flex-col justify-center space-y-6">
          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
             <h3 className="text-xl font-bold text-[#0a192f] mb-4">Student Performance Network</h3>
             
             <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                   <span className="font-bold text-[#0a192f]">Mathematics</span>
                   <span className="text-red-600 font-bold text-sm bg-red-100 px-2 py-1 rounded">Weak (42%)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                   <span className="font-bold text-[#0a192f]">Science</span>
                   <span className="text-blue-600 font-bold text-sm bg-blue-100 px-2 py-1 rounded">Strong (91%)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                   <span className="font-bold text-[#0a192f]">English</span>
                   <span className="text-yellow-600 font-bold text-sm bg-yellow-100 px-2 py-1 rounded">Improving (65%)</span>
                </div>
             </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow-sm text-center">
             <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-1">AI Confidence: 94%</p>
             <h4 className="font-bold text-[#0a192f] mb-2">Weak Topic Detected: Algebra</h4>
             <p className="text-gray-600 text-sm font-medium">Recommendation Generated ✓</p>
          </div>
       </div>
    </div>
  </ModalWrapper>
);

const StatusOfflineModal = ({ onClose }) => {
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  const triggerSync = () => {
    setSyncing(true);
    setSynced(false);
    setTimeout(() => {
      setSyncing(false);
      setSynced(true);
    }, 3000);
  };

  return (
    <ModalWrapper onClose={onClose} title="Offline Learning System">
      <div className="flex flex-col items-center justify-center py-12">
         <div className="relative mb-10">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center shadow-2xl relative z-10 transition-colors duration-500 ${syncing ? 'bg-cyan-500' : synced ? 'bg-cyan-500' : 'bg-[#0a192f]'}`}>
               {syncing ? <RefreshCw size={48} className="text-white animate-spin" /> : synced ? <CheckCircle size={48} className="text-white" /> : <HardDrive size={48} className="text-white" />}
            </div>
            {/* Ping animations */}
            <div className={`absolute inset-0 rounded-full border-4 border-cyan-400 opacity-0 ${syncing ? 'animate-ping' : ''}`}></div>
         </div>

         <div className="w-full max-w-lg bg-white border border-gray-200 p-6 rounded-2xl shadow-lg mb-8">
            <h3 className="font-bold text-[#0a192f] text-lg mb-4 text-center flex items-center justify-center gap-2">
               <Wifi className={synced ? "text-blue-500" : "text-gray-400"} /> 
               {syncing ? 'Syncing to Cloud...' : synced ? 'Sync Complete' : 'Offline Mode Active'}
            </h3>
            
            <div className="space-y-3">
               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Lessons Cached</span>
                  <CheckCircle size={18} className="text-blue-500"/>
               </div>
               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Videos Stored</span>
                  <CheckCircle size={18} className="text-blue-500"/>
               </div>
               <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Translation Model Ready</span>
                  <CheckCircle size={18} className="text-blue-500"/>
               </div>
               {!synced && (
                 <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <span className="font-bold text-orange-800">Pending Sync</span>
                    <span className="font-bold text-orange-600 bg-white px-2 py-0.5 rounded shadow-sm">2 Files</span>
                 </div>
               )}
            </div>
         </div>

         <PremiumButton onClick={triggerSync} className="w-full max-w-md py-4 text-lg">
            Simulate Cloud Sync
         </PremiumButton>
      </div>
    </ModalWrapper>
  );
};

// --------- Architecture Modals --------- //

const ArchGenericModal = ({ onClose, step, title, icon, desc, children }) => (
  <ModalWrapper onClose={onClose} title={`Architecture Step ${step}`}>
    <div className="flex flex-col items-center max-w-3xl mx-auto py-8">
      <div className="w-24 h-24 bg-[#0a192f] rounded-full flex items-center justify-center mb-6 shadow-xl border-4 border-cyan-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyan-400/20 blur-xl animate-pulse"></div>
        <div className="relative z-10">{icon}</div>
      </div>
      <h2 className="text-3xl font-extrabold text-[#0a192f] mb-4 text-center">{title}</h2>
      <p className="text-xl text-gray-600 leading-relaxed font-medium mb-10 text-center max-w-2xl">{desc}</p>
      
      <div className="w-full">
         {children}
      </div>
    </div>
  </ModalWrapper>
);

const ArchInputModal = (props) => (
  <ArchGenericModal {...props} step="1" title="Student Input" icon={<Mic size={40} className="text-white"/>} desc="The AI engine captures raw student audio and immediately processes it through the edge node for clarity.">
    <div className="bg-[#0a192f] rounded-2xl p-8 border border-[#112240] shadow-xl text-white relative overflow-hidden">
       <div className="absolute right-0 bottom-0 p-8 opacity-5"><Mic size={150} /></div>
       <div className="flex items-center gap-4 mb-8">
          <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
          <h3 className="text-xl font-bold tracking-widest uppercase">Input Received</h3>
       </div>
       
       <div className="grid sm:grid-cols-2 gap-6 relative z-10">
          <div className="bg-white/10 p-5 rounded-xl border border-white/20">
             <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Detected Language</p>
             <p className="text-2xl font-bold text-cyan-400">Kannada</p>
          </div>
          <div className="bg-white/10 p-5 rounded-xl border border-white/20">
             <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Voice Clarity</p>
             <p className="text-2xl font-bold text-cyan-400">92%</p>
          </div>
       </div>

       <div className="mt-6 space-y-3 relative z-10">
          <div className="flex items-center gap-3 text-sm font-medium">
             <CheckCircle size={16} className="text-cyan-400"/> Noise Removal Applied Successfully
          </div>
          <div className="flex items-center gap-3 text-sm font-medium">
             <CheckCircle size={16} className="text-cyan-400"/> Edge Node Connection Established
          </div>
       </div>
    </div>
  </ArchGenericModal>
);

const ArchLLMModal = (props) => (
  <ArchGenericModal {...props} step="2" title="LLM Processing Engine" icon={<BrainCircuit size={40} className="text-white"/>} desc="The core intelligence layer where the raw query is broken down, classified, and solved step-by-step.">
    <div className="bg-[#0a192f] rounded-2xl p-8 border border-[#112240] shadow-xl text-white flex flex-col md:flex-row gap-8 items-center">
       <div className="w-48 h-48 rounded-full border-4 border-cyan-500/30 flex items-center justify-center relative animate-[spin_15s_linear_infinite]">
          <div className="absolute w-full h-full border-4 border-blue-500/30 rounded-full rounded-tr-transparent animate-[spin_5s_linear_infinite_reverse]"></div>
          <BrainCircuit size={64} className="text-cyan-400 animate-pulse" />
       </div>

       <div className="flex-1 w-full space-y-4">
          <h3 className="text-xl font-bold text-white mb-6">AI Processing Pipeline</h3>
          
          <div className="bg-white/10 p-4 rounded-xl border border-white/20 flex justify-between items-center shadow-lg">
             <span className="font-medium text-gray-200">Intent Detection</span>
             <CheckCircle size={20} className="text-cyan-400"/>
          </div>
          <div className="bg-white/10 p-4 rounded-xl border border-white/20 flex justify-between items-center shadow-lg">
             <span className="font-medium text-gray-200">Subject Classification</span>
             <CheckCircle size={20} className="text-cyan-400"/>
          </div>
          <div className="bg-white/10 p-4 rounded-xl border border-white/20 flex justify-between items-center shadow-lg">
             <span className="font-medium text-gray-200">NCERT Safe Retrieval</span>
             <CheckCircle size={20} className="text-cyan-400"/>
          </div>
          <div className="bg-white/10 p-4 rounded-xl border border-cyan-500/50 flex justify-between items-center shadow-[0_0_15px_rgba(34,211,238,0.2)]">
             <span className="font-bold text-cyan-400">Reasoning Complete</span>
             <CheckCircle size={20} className="text-cyan-400"/>
          </div>
       </div>
    </div>
  </ArchGenericModal>
);

const ArchGraphModal = (props) => (
  <ArchGenericModal {...props} step="4" title="Graph Network Intelligence" icon={<Network size={40} className="text-white"/>} desc="Updating the massive neural graph representing the student's entire learning history.">
    <div className="grid md:grid-cols-2 gap-6">
       <div className="bg-[#0a192f] border border-[#112240] rounded-2xl p-6 shadow-xl flex items-center justify-center">
          <Network size={120} className="text-cyan-400 animate-pulse" />
       </div>
       
       <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg flex flex-col justify-center">
          <h3 className="text-xl font-bold text-[#0a192f] mb-6 border-b border-gray-100 pb-4">Student Heatmap Update</h3>
          
          <div className="space-y-4">
             <div className="flex justify-between items-center">
                <span className="font-bold text-gray-600">Attendance Risk</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-bold text-sm">LOW</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="font-bold text-gray-600">Math Performance</span>
                <div className="flex items-center gap-2"><div className="w-20 h-2 bg-yellow-200 rounded-full"><div className="w-[68%] h-full bg-yellow-500 rounded-full"></div></div><span className="font-bold text-yellow-600 text-sm">68%</span></div>
             </div>
             <div className="flex justify-between items-center">
                <span className="font-bold text-gray-600">Science Understanding</span>
                <div className="flex items-center gap-2"><div className="w-20 h-2 bg-cyan-200 rounded-full"><div className="w-[91%] h-full bg-cyan-500 rounded-full"></div></div><span className="font-bold text-cyan-600 text-sm">91%</span></div>
             </div>
          </div>
       </div>
    </div>
  </ArchGenericModal>
);

const ArchTeacherModal = (props) => (
  <ArchGenericModal {...props} step="4" title="Teacher Dashboard Sync" icon={<UserCheck size={40} className="text-white"/>} desc="Delivering actionable insights directly to the educator to close the loop.">
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
       <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
          <h3 className="text-2xl font-bold text-[#0a192f] flex items-center gap-2"><Layers className="text-blue-600"/> Class Overview Dashboard</h3>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 font-bold text-sm rounded-lg border border-blue-100">Grade 8 Science</span>
       </div>

       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-center">
             <p className="text-3xl font-extrabold text-[#0a192f] mb-1">42</p>
             <p className="text-xs font-bold text-gray-500 uppercase">Students Active</p>
          </div>
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl text-center">
             <p className="text-3xl font-extrabold text-[#0a192f] mb-1">6</p>
             <p className="text-xs font-bold text-gray-500 uppercase">Homework Pending</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center">
             <p className="text-3xl font-extrabold text-blue-600 mb-1">3</p>
             <p className="text-xs font-bold text-blue-800 uppercase">AI Suggestions</p>
          </div>
          <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-center shadow-inner">
             <p className="text-3xl font-extrabold text-red-600 mb-1">2</p>
             <p className="text-xs font-bold text-red-800 uppercase">Weak Alerts</p>
          </div>
       </div>

       <PremiumButton className="w-full py-4 text-lg">
          Generate Remedial Lesson Plan
       </PremiumButton>
    </div>
  </ArchGenericModal>
);
