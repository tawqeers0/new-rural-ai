import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Target, Download, BookOpen, BrainCircuit, PlayCircle, 
  ChevronRight, Calculator, FlaskConical, Languages, History,
  Trophy, Medal, Star, Calendar as CalendarIcon, Clock, TrendingUp,
  MessageSquare, Mic, Send, Volume2, Sparkles, X, Activity, BookCheck, ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';

// --- Sub-Components ---

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


const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Namaste Rahul! I am your AI Study Assistant. What would you like to learn today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "";
      if (text.toLowerCase().includes("division")) {
        aiResponse = "Division is splitting into equal parts or groups. It is the result of 'fair sharing'. Example: 12 divided by 3 means sharing 12 items equally among 3 groups, which gives 4 items per group.";
      } else {
        aiResponse = "That's a great question! Let me pull up the relevant NCERT concepts for you to practice.";
      }
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  const simulateVoiceInput = () => {
    handleSend("What is division?");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-3xl shadow-2xl border border-cyan-100 z-50 overflow-hidden flex flex-col h-[500px]"
          >
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white leading-tight">AI Study Assistant</h3>
                  <p className="text-xs text-cyan-100 font-medium">Online • English</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-cyan-100 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-cyan-600 text-white rounded-br-sm' : 'bg-white border border-gray-200 text-gray-800 shadow-sm rounded-bl-sm'}`}>
                    <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
                    {msg.role === 'ai' && (
                      <button className="mt-3 text-cyan-600 hover:text-cyan-700 flex items-center gap-1 text-xs font-bold transition-colors bg-cyan-50 px-3 py-1.5 rounded-full w-fit">
                        <Volume2 size={14} /> Listen
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-bl-sm p-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
              <Button variant="ghost" className="w-10 h-10 rounded-full p-0 flex items-center justify-center bg-gray-100 hover:bg-cyan-50 text-gray-500 hover:text-cyan-600 transition-colors shrink-0" onClick={simulateVoiceInput}>
                <Mic size={18} />
              </Button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-full focus:ring-cyan-500 focus:border-cyan-500 px-4 py-2 outline-none"
              />
              <Button className="w-10 h-10 rounded-full p-0 flex items-center justify-center shrink-0 bg-cyan-600 hover:bg-cyan-700" onClick={() => handleSend(input)}>
                <Send size={16} className="ml-1" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-[0_10px_40px_rgba(6,95,70,0.4)] flex items-center justify-center text-white z-50 group border-2 border-white"
      >
        <Sparkles size={28} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-10 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Ask AI Tutor
        </span>
      </motion.button>
    </>
  );
};

const ContinueLearningCarousel = ({ setShowLessonModal }) => {
  const cards = [
    { title: "Fractions & Decimals", subject: "Math", progress: 75, image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=400&q=80", color: "from-blue-500 to-blue-700" },
    { title: "The Solar System", subject: "Science", progress: 30, image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80", color: "from-purple-500 to-purple-700" },
    { title: "Ancient Indian History", subject: "History", progress: 10, image: "/images/ancient_indian_history.png", color: "from-amber-500 to-amber-700" },
    { title: "Basic Grammar", subject: "English", progress: 90, image: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&w=400&q=80", color: "from-cyan-500 to-cyan-700" },
  ];

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <PlayCircle className="text-cyan-600" /> Continue Learning
      </h2>
      <div className="w-full overflow-hidden cursor-grab active:cursor-grabbing">
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -600 }}
          className="flex gap-6 pb-8 pt-2 px-2"
        >
          {cards.map((card, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setShowLessonModal(card.title)}
              className="min-w-[320px] bg-white rounded-3xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden flex-shrink-0 group cursor-pointer"
            >
              <div className="h-36 relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900">
                  {card.subject}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{card.title}</h3>
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-cyan-600">{card.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div className={`bg-gradient-to-r ${card.color} h-2.5 rounded-full`} style={{ width: `${card.progress}%` }}></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 rounded-xl bg-gray-900 hover:bg-gray-800 h-10 shadow-lg">Resume Lesson</Button>
                  <Button variant="outline" className="w-10 p-0 rounded-xl border-gray-200 text-cyan-600 hover:bg-cyan-50" title="Ask AI for help">
                    <BrainCircuit size={18} />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---

export const StudentDashboard = () => {
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(null);
  const [showLessonModal, setShowLessonModal] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(null);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-24">
      
      {/* Top Section: Welcome & Widgets */}
      <div className="flex flex-col lg:flex-row gap-8 justify-between items-start mb-16">
        <div className="flex-1 mt-6">
          <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-800 text-sm font-bold mb-6 shadow-sm">
            <Sparkles size={16} /> Welcome back, Rahul!
          </motion.div>
          <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-gray-900 mb-6 leading-[1.15]">
            Ready to learn <br /> something new today?
          </h1>
          <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
            You're doing great! Keep up the momentum to reach your weekly goal.
          </p>
        </div>

          <div className="flex flex-wrap gap-4 lg:w-[450px] shrink-0">
            <div className="grid grid-cols-2 gap-4 w-full mb-2">
              <motion.div whileHover={{ y: -2 }} onClick={() => setShowAnalyticsModal(true)} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900 leading-none">12</p>
                  <p className="text-xs text-gray-500 font-bold">Lessons Done</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} onClick={() => setShowAnalyticsModal(true)} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900 leading-none">5h</p>
                  <p className="text-xs text-gray-500 font-bold">Time Learned</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} onClick={() => setShowAnalyticsModal(true)} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Target size={20} />
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900 leading-none">89%</p>
                  <p className="text-xs text-gray-500 font-bold">Accuracy</p>
                </div>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} onClick={() => setShowStreakModal(true)} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                  <Flame size={20} />
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900 leading-none">7</p>
                  <p className="text-xs text-gray-500 font-bold">Day Streak</p>
                </div>
              </motion.div>
            </div>

            {/* Daily Goal Widget */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowGoalModal(true)}
              className="w-full bg-white rounded-3xl p-5 border border-gray-200 shadow-sm hover:shadow-md cursor-pointer hover:border-blue-200 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                  <Target size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Today's Goal</p>
                  <p className="text-xl font-black text-gray-900">2/3 Tasks Done</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400" />
            </motion.div>

          {/* Offline Toggle */}
          <motion.div whileHover={{ scale: 1.02 }} onClick={() => setShowOfflineModal(true)} className="cursor-pointer w-full bg-gray-900 rounded-3xl p-5 shadow-lg flex items-center justify-between text-white mt-2">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-cyan-400">
                <Download size={24} />
              </div>
              <div>
                <p className="font-bold">Offline Mode</p>
                <p className="text-sm text-gray-400">Synced 5m ago</p>
              </div>
            </div>
            <Button variant="outline" className="rounded-full border-gray-700 bg-gray-800 text-white hover:bg-gray-700 pointer-events-none">Sync</Button>
          </motion.div>
        </div>
      </div>

      {/* Continue Learning Carousel */}
      <ContinueLearningCarousel setShowLessonModal={setShowLessonModal} />

      {/* Grid Content */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        
        {/* Interactive Subjects */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="text-blue-600" /> Subject Dashboards
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: "Mathematics", icon: <Calculator size={24} />, color: "bg-blue-50 text-blue-600", border: "hover:border-blue-300", desc: "Algebra & Geometry" },
              { name: "Science", icon: <FlaskConical size={24} />, color: "bg-cyan-50 text-cyan-600", border: "hover:border-cyan-300", desc: "Physics & Bio" },
              { name: "Languages", icon: <Languages size={24} />, color: "bg-purple-50 text-purple-600", border: "hover:border-purple-300", desc: "English & Hindi" },
              { name: "History", icon: <History size={24} />, color: "bg-amber-50 text-amber-600", border: "hover:border-amber-300", desc: "Ancient India" },
            ].map((subject, idx) => (
              <motion.div onClick={() => setShowSubjectModal(subject.name)} key={idx} whileHover={{ y: -4 }} className={`bg-white rounded-3xl p-6 border border-gray-200 shadow-sm cursor-pointer transition-all ${subject.border} group`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${subject.color}`}>
                    {subject.icon}
                  </div>
                  <Button variant="ghost" className="rounded-full p-2 w-10 h-10 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <ArrowRight size={18} />
                  </Button>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{subject.name}</h3>
                <p className="text-sm text-gray-500 font-medium mb-4">{subject.desc}</p>
                <div className="flex gap-2">
                  <span className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">Lessons</span>
                  <span className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">Practice Tests</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Recommended & Planner */}
        <div className="space-y-8">
          
          {/* AI Recommended */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 border border-indigo-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BrainCircuit size={100} />
            </div>
            <h2 className="text-lg font-bold text-indigo-900 flex items-center gap-2 mb-6 relative z-10">
              <Sparkles className="text-indigo-600" size={20} /> Recommended for Rahul
            </h2>
            <div className="space-y-3 relative z-10">
              <div onClick={() => setShowLessonModal('Fractions Revision')} className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-50 hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-xs font-bold text-red-500 mb-1 flex items-center gap-1"><Activity size={12} /> Weakness Detected</p>
                <h4 className="font-bold text-gray-900 mb-1">Fractions Revision</h4>
                <p className="text-sm text-gray-500">Based on yesterday's quiz</p>
              </div>
              <div onClick={() => setShowLessonModal('Decimals')} className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-50 hover:shadow-md transition-shadow cursor-pointer">
                <p className="text-xs font-bold text-cyan-600 mb-1 flex items-center gap-1"><TrendingUp size={12} /> Next Logical Step</p>
                <h4 className="font-bold text-gray-900 mb-1">Introduction to Decimals</h4>
                <p className="text-sm text-gray-500">20 mins • AI Guided</p>
              </div>
            </div>
          </div>

          {/* Smart Planner & Upcoming */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <CalendarIcon className="text-blue-500" size={20} /> Upcoming Tasks
              </h2>
              <button className="text-sm font-bold text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="space-y-4">
              <div onClick={() => setShowTaskModal('Math Homework')} className="flex gap-4 items-start p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex flex-col items-center justify-center shrink-0 border border-red-100">
                  <span className="text-xs font-bold text-red-500">Tomorrow</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Math Homework</h4>
                  <p className="text-sm text-gray-500 flex items-center gap-1"><Clock size={12}/> Due 5:00 PM</p>
                </div>
              </div>
              <div onClick={() => setShowTaskModal('Live Science Class')} className="flex gap-4 items-start p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex flex-col items-center justify-center shrink-0 border border-cyan-100">
                  <span className="text-xs font-bold text-cyan-600">Wed</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Live Science Class</h4>
                  <p className="text-sm text-gray-500 flex items-center gap-1"><Volume2 size={12}/> With Mr. Sharma</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Achievements & Parent Progress */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Achievements Grid */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Trophy className="text-yellow-500" /> Achievements
          </h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-yellow-50 hover:border-yellow-200 transition-colors cursor-pointer group">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                <Medal size={28} className="text-yellow-500" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm">Math Scholar</h4>
              <p className="text-xs text-gray-500 mt-1">Level 3</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-cyan-50 hover:border-cyan-200 transition-colors cursor-pointer group">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform">
                <Star size={28} className="text-cyan-500" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm">Fast Learner</h4>
              <p className="text-xs text-gray-500 mt-1">10 Quizzes</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 opacity-60">
              <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookCheck size={28} className="text-gray-400" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm">Science Pro</h4>
              <p className="text-xs text-gray-500 mt-1">Locked</p>
            </div>
          </div>
        </div>

        {/* Performance Analytics Mock (Animated Charts) */}
        <div onClick={() => setShowAnalyticsModal(true)} className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="text-blue-600" /> Performance Analytics
            </h2>
            <ArrowRight className="text-gray-400" />
          </div>
          
          <div className="space-y-6">
            <p className="font-bold text-gray-700 mb-2 text-sm">Weekly Learning Hours</p>
            <div className="flex items-end gap-2 h-32 mb-6">
              {[
                { day: 'M', h: '40%' }, { day: 'T', h: '70%' }, { day: 'W', h: '50%' },
                { day: 'T', h: '90%' }, { day: 'F', h: '60%' }, { day: 'S', h: '30%' }, { day: 'S', h: '20%' }
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col justify-end items-center gap-2 h-full group cursor-pointer">
                  <motion.div 
                    initial={{ height: 0 }} whileInView={{ height: bar.h }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.5, type: 'spring' }}
                    className="w-full bg-blue-100 group-hover:bg-blue-500 rounded-t-md relative transition-colors"
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      {bar.h}
                    </span>
                  </motion.div>
                  <span className="text-xs font-bold text-gray-500">{bar.day}</span>
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-gray-700">Quiz Accuracy</span>
                <span className="text-blue-600">89%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: '89%' }} viewport={{ once: true }} transition={{ duration: 1 }} className="bg-blue-500 h-3 rounded-full"></motion.div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 leading-relaxed italic">
                "Excellent progress this week! Your math accuracy has improved by 14%." - AI Tutor
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showStreakModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center relative">
              <button onClick={() => setShowStreakModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900"><X size={20}/></button>
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 mx-auto mb-6">
                <Flame size={48} />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">7 Day Streak!</h2>
              <p className="text-gray-500 font-medium mb-8">You are on fire, Rahul! Complete today's goal to extend your streak.</p>
              <PremiumButton className="w-full h-12 text-lg" onClick={() => setShowStreakModal(false)}>Continue Learning</PremiumButton>
            </motion.div>
          </div>
        )}

        {showGoalModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
              <button onClick={() => setShowGoalModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900"><X size={20}/></button>
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2"><Target className="text-blue-500"/> Today's Goals</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-4 bg-cyan-50 rounded-xl border border-cyan-100 text-cyan-800 font-bold">
                  <div className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs">✓</div>
                  Complete 2 Lessons
                </div>
                <div className="flex items-center gap-4 p-4 bg-cyan-50 rounded-xl border border-cyan-100 text-cyan-800 font-bold">
                  <div className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs">✓</div>
                  Practice 5 Math Questions
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-600 font-bold">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs"></div>
                  30 min AI learning (12m left)
                </div>
              </div>
              <PremiumButton className="w-full h-12 text-lg" onClick={() => setShowGoalModal(false)}>Finish Goal</PremiumButton>
            </motion.div>
          </div>
        )}

        {/* Dynamic Details Modal */}
        {(showOfflineModal || showSubjectModal || showLessonModal || showTaskModal || showAnalyticsModal) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden">
              <button onClick={() => { setShowOfflineModal(false); setShowSubjectModal(null); setShowLessonModal(null); setShowTaskModal(null); setShowAnalyticsModal(false); }} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900"><X size={20}/></button>
              
              {showOfflineModal && (
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2"><Download className="text-cyan-500"/> Offline Sync</h2>
                  <p className="text-gray-500 mb-6">Your device has 225 MB of cached lessons. You are ready to learn without internet.</p>
                  <div className="bg-cyan-50 text-cyan-700 p-4 rounded-xl font-bold mb-4">Last synced: 5 mins ago</div>
                  <PremiumButton className="w-full h-12" onClick={() => setShowOfflineModal(false)}>Close</PremiumButton>
                </div>
              )}

              {showAnalyticsModal && (
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2"><TrendingUp className="text-blue-500"/> Full Analytics</h2>
                  <p className="text-gray-500 mb-6">Detailed breakdown of your learning journey.</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 font-bold"><p className="text-xs text-gray-500">Total Hours</p><p className="text-2xl text-gray-900">45.2h</p></div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 font-bold"><p className="text-xs text-gray-500">Tests Taken</p><p className="text-2xl text-gray-900">24</p></div>
                  </div>
                  <PremiumButton className="w-full h-12" onClick={() => setShowAnalyticsModal(false)}>View Report</PremiumButton>
                </div>
              )}

              {showSubjectModal && (
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2"><BookOpen className="text-blue-500"/> {showSubjectModal} Dashboard</h2>
                  <p className="text-gray-500 mb-6">View all your lessons, practice tests, and AI explanations for {showSubjectModal}.</p>
                  <PremiumButton className="w-full h-12" onClick={() => setShowSubjectModal(null)}>Open Course Modules</PremiumButton>
                </div>
              )}

              {showLessonModal && (
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2"><PlayCircle className="text-cyan-500"/> {showLessonModal}</h2>
                  <div className="aspect-video bg-gray-900 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                    <img src={showLessonModal === "Ancient Indian History" ? "/images/ancient_indian_history.png" : "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=800&q=80"} alt="Video cover" className="w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <PlayCircle size={32} className="text-white" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <PremiumButton className="flex-1 h-12">Start Lesson</PremiumButton>
                    <Button variant="outline" className="h-12 px-6" onClick={() => setShowLessonModal(null)}>Back</Button>
                  </div>
                </div>
              )}

              {showTaskModal && (
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2"><Activity className="text-red-500"/> {showTaskModal}</h2>
                  <p className="text-gray-500 mb-6">Review your assignment requirements and submit your work before the deadline.</p>
                  <PremiumButton className="w-full h-12" onClick={() => setShowTaskModal(null)}>Submit Work</PremiumButton>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <FloatingAIAssistant />
    </motion.div>
  );
};
