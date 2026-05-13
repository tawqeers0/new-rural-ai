import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Volume2, Maximize, Settings as SettingsIcon, 
  BrainCircuit, ChevronLeft, Mic, Send, BookOpen, PenTool, Download, MessageSquare
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

// Mock Data
const lessonData = {
  'math-3': { title: 'Understanding Fractions', subject: 'Mathematics', type: 'Interactive Video', progress: 45, thumb: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=1200&q=80', youtubeId: '5juto2ze8Lg' },
  'science-basics': { title: 'The Solar System', subject: 'Science', type: '3D Interactive', progress: 12, thumb: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80', youtubeId: 'Qd6nLMpz3kA' },
  'english-reading': { title: 'Reading Comprehension', subject: 'Languages', type: 'Reading & Pronunciation', progress: 0, thumb: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80', youtubeId: 'eHJIruA7h2U' },
  'chemistry': { title: 'Chemistry Basics', subject: 'Science', type: 'Lab Experiment', progress: 10, thumb: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80', youtubeId: 'FSyAehMdpyI' },
};

export const StudentLessonPlayer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false); // Default to false so user sees thumbnail and clicks play
  const [activeTab, setActiveTab] = useState('notes');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', content: 'Hi! I am here to help you with this lesson. Ask me anything or request a translation!' }
  ]);
  const chatEndRef = useRef(null);

  const lesson = lessonData[courseId] || lessonData['math-3'];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [courseId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { role: 'user', content: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'ai', content: `That's a great question about ${lesson.subject}. Let me explain...` }]);
    }, 1000);
  };

  const handlePlayAudio = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleTranslate = (idx) => {
    setChatMessages(prev => {
      const newMsgs = [...prev];
      const msg = newMsgs[idx];
      if (msg.content.includes("great question")) {
        msg.content = `यह ${lesson.subject} के बारे में एक अच्छा सवाल है। मुझे समझाने दो...`;
      } else if (msg.content.includes("अच्छा सवाल")) {
        msg.content = `That's a great question about ${lesson.subject}. Let me explain...`;
      } else if (msg.content === 'Hi! I am here to help you with this lesson. Ask me anything or request a translation!') {
        msg.content = 'नमस्ते! मैं इस पाठ में आपकी सहायता के लिए यहाँ हूँ। मुझसे कुछ भी पूछें या अनुवाद का अनुरोध करें!';
      } else if (msg.content === 'नमस्ते! मैं इस पाठ में आपकी सहायता के लिए यहाँ हूँ। मुझसे कुछ भी पूछें या अनुवाद का अनुरोध करें!') {
        msg.content = 'Hi! I am here to help you with this lesson. Ask me anything or request a translation!';
      } else {
        msg.content = msg.content.startsWith('[Translated]') ? msg.content.replace('[Translated] ', '') : `[Translated] ${msg.content}`;
      }
      return newMsgs;
    });
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6 pb-24">
        {/* Skeleton Player */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="w-full aspect-video bg-gray-200 rounded-3xl animate-pulse"></div>
          <div className="flex gap-4">
            <div className="h-12 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="h-12 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="h-12 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
          <div className="h-64 w-full bg-gray-200 rounded-3xl animate-pulse"></div>
        </div>
        {/* Skeleton Sidebar */}
        <div className="w-full lg:w-96 bg-gray-200 rounded-3xl animate-pulse hidden lg:block"></div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[calc(100vh-6rem)] flex flex-col lg:flex-row gap-6 pb-6">
      
      {/* Left Column: Player & Content */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
        
        {/* Header / Back */}
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-900 leading-tight">{lesson.title}</h1>
            <p className="text-sm font-bold text-cyan-600 uppercase tracking-wider">{lesson.subject} • {lesson.type}</p>
          </div>
        </div>

        {/* Video Player */}
        <div className="w-full aspect-video bg-gray-900 rounded-3xl relative overflow-hidden shadow-xl group">
          {isPlaying && lesson.youtubeId ? (
            <iframe 
              className="w-full h-full rounded-3xl"
              src={`https://www.youtube.com/embed/${lesson.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={lesson.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <>
              <img src={lesson.thumb} alt={lesson.title} className="w-full h-full object-cover opacity-60" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10 hover:bg-black/20 transition-colors">
                <button onClick={() => setIsPlaying(true)} className="w-20 h-20 bg-cyan-600 hover:bg-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-cyan-900/50 transform hover:scale-105 transition-all">
                  <Play size={36} className="ml-2" />
                </button>
              </div>

              {/* Controls Bar Mockup (Visible only before playing) */}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="w-full h-1.5 bg-white/30 rounded-full mb-4 cursor-pointer relative">
                  <div className="absolute h-full bg-cyan-500 rounded-full" style={{ width: '0%' }}></div>
                </div>
                
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-6">
                    <button onClick={() => setIsPlaying(true)} className="hover:text-cyan-400 transition-colors">
                      <Play size={24} />
                    </button>
                    <span className="text-sm font-medium">0:00 / 0:00</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex-shrink-0">
          <div className="flex border-b border-gray-100 p-2 gap-2 bg-gray-50/50">
            <button onClick={() => setActiveTab('notes')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all ${activeTab === 'notes' ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50' : 'text-gray-500 hover:bg-gray-100'}`}>
              <BookOpen size={18} /> Lesson Notes
            </button>
            <button onClick={() => setActiveTab('practice')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all ${activeTab === 'practice' ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50' : 'text-gray-500 hover:bg-gray-100'}`}>
              <PenTool size={18} /> Practice Exercises
            </button>
            <button onClick={() => setActiveTab('download')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all ${activeTab === 'download' ? 'bg-white text-gray-900 shadow-sm border border-gray-200/50' : 'text-gray-500 hover:bg-gray-100'}`}>
              <Download size={18} /> Resources
            </button>
          </div>
          
          <div className="p-8">
            {activeTab === 'notes' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Summary: {lesson.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">This lesson covers the fundamental concepts required to master {lesson.subject.toLowerCase()}. We will explore real-world examples, visual diagrams, and step-by-step problem-solving methodologies.</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div> Core definitions and terminology</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div> Visualizing the problem space</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div> AI-assisted walkthroughs</li>
                </ul>
              </motion.div>
            )}
            {activeTab === 'practice' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4"><PenTool size={32} /></div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to test your knowledge?</h3>
                <p className="text-gray-500 mb-6 max-w-sm">Take a quick 5-question AI generated quiz based on what you just watched.</p>
                <Button className="bg-gray-900 hover:bg-gray-800 rounded-full px-8">Start Quiz</Button>
              </motion.div>
            )}
            {activeTab === 'download' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200 mb-3">
                  <div className="flex items-center gap-4"><div className="p-3 bg-red-100 text-red-600 rounded-xl"><BookOpen size={20}/></div><div><p className="font-bold text-gray-900">Lesson Slides (PDF)</p><p className="text-xs text-gray-500">2.4 MB</p></div></div>
                  <Button variant="outline" className="rounded-full bg-white"><Download size={16} className="mr-2"/> Save</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-4"><div className="p-3 bg-cyan-100 text-cyan-600 rounded-xl"><Volume2 size={20}/></div><div><p className="font-bold text-gray-900">Audio Narration (MP3)</p><p className="text-xs text-gray-500">12.1 MB</p></div></div>
                  <Button variant="outline" className="rounded-full bg-white"><Download size={16} className="mr-2"/> Save</Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: AI Assistant Sidebar */}
      <div className="w-full lg:w-96 flex flex-col bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex-shrink-0">
        <div className="p-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm"><BrainCircuit size={20} /></div>
          <div>
            <h3 className="font-bold leading-tight">AI Co-Pilot</h3>
            <p className="text-xs text-cyan-100 font-medium">Ask doubts • Translate • Voice</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {chatMessages.map((msg, i) => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.role === 'user' ? 'bg-cyan-600 text-white rounded-br-sm' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'}`}>
                <p className="leading-relaxed font-medium">{msg.content}</p>
                {msg.role === 'ai' && (
                  <div className="mt-2 pt-2 border-t border-gray-100 flex gap-2">
                    <button onClick={() => handlePlayAudio(msg.content)} className="text-xs text-cyan-600 font-bold hover:underline">Play Audio</button>
                    <span className="text-gray-300">•</span>
                    <button onClick={() => handleTranslate(i)} className="text-xs text-blue-600 font-bold hover:underline">Translate</button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleChat} className="p-3 bg-white border-t border-gray-100">
          <div className="relative flex items-center">
            <button type="button" className="absolute left-2 p-2 text-gray-400 hover:text-cyan-600 transition-colors"><Mic size={18} /></button>
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask a question..." 
              className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-sm font-medium"
            />
            <button type="submit" disabled={!chatInput.trim()} className="absolute right-1.5 p-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full transition-colors">
              <Send size={14} className="ml-0.5" />
            </button>
          </div>
        </form>
      </div>

    </motion.div>
  );
};
