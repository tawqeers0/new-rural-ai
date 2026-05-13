import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, Laptop, Building2, Briefcase, 
  X, Mic, Users, Activity, BarChart, 
  Map, Wifi, RefreshCw, CheckCircle,
  TrendingUp, Award, Target, BookOpen, Sparkles, BrainCircuit
} from 'lucide-react';
import { Button } from '../ui/Button';

// --------- Generic Modal Wrapper --------- //
const ModalWrapper = ({ onClose, title, children }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a192f]/60 backdrop-blur-md p-4">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }} 
      animate={{ opacity: 1, scale: 1, y: 0 }} 
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl relative border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]"
    >
      <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
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

// --------- Modal Implementations --------- //

const AIClassroomModal = ({ onClose }) => {
  const [pulse, setPulse] = useState(false);
  return (
    <ModalWrapper onClose={onClose} title="AI-First Classrooms Live">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#0a192f] rounded-2xl p-6 border border-[#112240] shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Grade 8 Science</h3>
                <p className="text-cyan-400 font-medium text-sm">Chapter 4: Cell Structure</p>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                <span className="text-white text-sm font-bold">42 Students Online</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Class Attention Score</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-extrabold text-white">87%</span>
                  <Activity size={20} className="text-cyan-400 mb-1" />
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden"><div className="w-[87%] bg-cyan-400 h-full"></div></div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Live Quiz Accuracy</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-extrabold text-white">91%</span>
                  <BarChart size={20} className="text-cyan-400 mb-1" />
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden"><div className="w-[91%] bg-cyan-400 h-full"></div></div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
             <h4 className="font-bold text-[#0a192f] mb-4 flex items-center gap-2"><Sparkles size={18} className="text-cyan-600"/> AI Generated Intervention</h4>
             <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-4">
                <div className="bg-red-100 text-red-600 p-2 rounded-lg"><Users size={20}/></div>
                <div>
                  <h5 className="font-bold text-red-900 mb-1">Weak Students Detected</h5>
                  <p className="text-sm text-red-700 font-medium">5 students are struggling with the concept of "Mitochondria". An automated remedial 3-minute video has been queued for their tablets.</p>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-b from-blue-50 to-white border border-blue-100 rounded-2xl p-6 text-center shadow-sm flex flex-col items-center justify-center h-full min-h-[300px]">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
               <Mic size={28} />
            </div>
            <h4 className="font-bold text-[#0a192f] mb-2">Teacher Voice Assistant</h4>
            <p className="text-sm text-gray-600 font-medium mb-6">Click to activate AI explanation for the current topic.</p>
            <Button 
              onClick={() => { setPulse(true); setTimeout(() => setPulse(false), 3000); }} 
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${pulse ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-[#0a192f] text-white hover:bg-[#112240]'}`}
            >
              {pulse ? <><Mic className="animate-pulse" /> Listening...</> : <><Mic size={18}/> Push to Talk</>}
            </Button>
            {pulse && <p className="text-xs text-gray-500 mt-4 animate-fade-in font-medium">"AI is generating an explanation for mitochondria..."</p>}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

const SmartVillageModal = ({ onClose }) => {
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
    <ModalWrapper onClose={onClose} title="Smart Village Hubs">
      <div className="grid lg:grid-cols-2 gap-8 h-full">
        <div className="bg-[#0a192f] rounded-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center border border-[#112240] shadow-lg min-h-[400px]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          
          <Map size={200} className="text-[#112240] absolute" />
          
          <div className="relative z-10 w-full max-w-sm space-y-6">
             <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex justify-between items-center group hover:bg-white/20 transition-all cursor-pointer">
               <div>
                 <p className="font-bold text-white text-sm">Karnataka Hub</p>
                 <p className="text-xs text-cyan-400 font-medium">1.2 Gbps • Solar Powered</p>
               </div>
               <span className="w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></span>
             </div>

             <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex justify-between items-center group hover:bg-white/20 transition-all cursor-pointer">
               <div>
                 <p className="font-bold text-white text-sm">Tamil Nadu Hub</p>
                 <p className="text-xs text-yellow-400 font-medium">2G Edge • Low Bandwidth</p>
               </div>
               <span className="w-3 h-3 bg-yellow-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.8)]"></span>
             </div>

             <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 flex justify-between items-center group hover:bg-white/20 transition-all cursor-pointer">
               <div>
                 <p className="font-bold text-white text-sm">Bihar Hub</p>
                 <p className="text-xs text-cyan-400 font-medium">{syncing ? 'Syncing Data...' : synced ? 'Fully Synced' : 'Offline Cache Ready'}</p>
               </div>
               {syncing ? (
                 <RefreshCw size={14} className="text-cyan-400 animate-spin" />
               ) : synced ? (
                 <CheckCircle size={14} className="text-cyan-400" />
               ) : (
                 <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
               )}
             </div>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-8">
           <div>
             <h3 className="text-2xl font-bold text-[#0a192f] mb-4 flex items-center gap-2"><Wifi className="text-cyan-600"/> Rural Connectivity Status</h3>
             <p className="text-gray-600 font-medium leading-relaxed">Our edge nodes cache terabytes of educational data using solar-powered local servers. When internet drops, students keep learning. When it returns, analytics sync silently.</p>
           </div>

           <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-sm relative overflow-hidden">
             {syncing && <div className="absolute inset-0 bg-cyan-50/50 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                <RefreshCw size={32} className="text-cyan-600 animate-spin mb-2" />
                <p className="font-bold text-cyan-800">Internet Restored. Syncing Data...</p>
             </div>}
             {synced && <div className="absolute inset-0 bg-cyan-50/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                <CheckCircle size={40} className="text-cyan-600 mb-2" />
                <p className="font-bold text-cyan-800">Data Synced Successfully ✓</p>
             </div>}

             <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl border border-gray-200 flex items-center justify-center shadow-sm">
                  <Laptop size={20} className="text-[#0a192f]"/>
                </div>
                <div>
                  <h4 className="font-bold text-[#0a192f]">Offline Lessons Cached</h4>
                  <p className="text-xs font-bold text-gray-500 uppercase">124 MB Pending Sync</p>
                </div>
             </div>
             <Button onClick={triggerSync} className="w-full bg-[#0a192f] text-white hover:bg-[#112240]">Simulate Connection Restore</Button>
           </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

const AIMentorshipModal = ({ onClose }) => {
  const [showPlan, setShowPlan] = useState(false);
  return (
  <ModalWrapper onClose={onClose} title="Personalized AI Mentorship">
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm text-center">
        <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 border-4 border-white shadow-lg overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arun" alt="Arun" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-xl font-bold text-[#0a192f]">Arun Kumar</h3>
        <p className="text-sm text-gray-500 font-medium mb-4">Grade 10 • Started 2022</p>
        
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full text-orange-600 font-bold text-sm">
          <Sparkles size={16}/> 14 Day Learning Streak!
        </div>
      </div>

      <div className="md:col-span-2 bg-[#0a192f] border border-[#112240] p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <h3 className="text-lg font-bold text-white mb-6 relative z-10 flex items-center gap-2"><Target size={18} className="text-cyan-400"/> Skill Mastery</h3>
        
        <div className="space-y-5 relative z-10">
          <div>
            <div className="flex justify-between text-sm font-bold text-white mb-2"><span>Mathematics</span><span className="text-cyan-400">72%</span></div>
            <div className="w-full bg-[#112240] h-3 rounded-full overflow-hidden"><motion.div initial={{width:0}} animate={{width:'72%'}} transition={{duration:1}} className="bg-cyan-400 h-full rounded-full"></motion.div></div>
          </div>
          <div>
            <div className="flex justify-between text-sm font-bold text-white mb-2"><span>Science</span><span className="text-cyan-400">91%</span></div>
            <div className="w-full bg-[#112240] h-3 rounded-full overflow-hidden"><motion.div initial={{width:0}} animate={{width:'91%'}} transition={{duration:1, delay:0.2}} className="bg-cyan-400 h-full rounded-full"></motion.div></div>
          </div>
          <div>
            <div className="flex justify-between text-sm font-bold text-white mb-2"><span>English Fluency</span><span className="text-yellow-400">Improving</span></div>
            <div className="w-full bg-[#112240] h-3 rounded-full overflow-hidden"><motion.div initial={{width:0}} animate={{width:'45%'}} transition={{duration:1, delay:0.4}} className="bg-yellow-400 h-full rounded-full"></motion.div></div>
          </div>
        </div>
      </div>

      <div className="md:col-span-3 bg-blue-50 border border-blue-100 p-6 rounded-2xl shadow-sm flex items-start gap-4">
        <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-sm shrink-0"><BrainCircuit className="text-blue-600" size={24}/></div>
        <div>
           <h4 className="font-bold text-[#0a192f] text-lg mb-1">Welcome back Arun 👋</h4>
           <p className="text-gray-700 font-medium leading-relaxed">You improved 12% in math today! Based on your recent quizzes, my AI Suggestion is to focus on <strong className="text-blue-700">Algebra</strong> this week. I have generated a customized study plan for you.</p>
           <Button onClick={() => setShowPlan(!showPlan)} className="mt-4 bg-[#0a192f] text-white text-sm py-2">
             {showPlan ? "Hide Study Plan" : "View Study Plan"}
           </Button>
        </div>
      </div>
      
      {showPlan && (
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="md:col-span-3 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm mt-4">
          <h4 className="font-bold text-[#0a192f] mb-4">Your Custom Algebra Plan</h4>
          <div className="space-y-3">
             <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
               <span className="font-medium text-gray-700">1. Video: Solving for X</span>
               <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded">10 mins</span>
             </div>
             <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
               <span className="font-medium text-gray-700">2. Interactive Practice: 5 Questions</span>
               <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded">15 mins</span>
             </div>
             <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
               <span className="font-medium text-gray-700">3. Real-world Algebra Scenarios</span>
               <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded">20 mins</span>
             </div>
          </div>
        </motion.div>
      )}
    </div>
  </ModalWrapper>
  );
};

const AICareerModal = ({ onClose }) => (
  <ModalWrapper onClose={onClose} title="AI Career Guidance Panel">
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-[#0a192f] mb-2 flex items-center gap-2"><Target className="text-cyan-600"/> Career Match Results</h3>
          <p className="text-gray-600 font-medium">Based on 3 years of performance data, aptitude tests, and cognitive mapping.</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-cyan-200 p-4 rounded-xl shadow-sm flex items-center justify-between relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500"></div>
            <div>
              <h4 className="font-bold text-[#0a192f]">Software Engineer</h4>
              <p className="text-xs text-gray-500 font-medium">Avg Salary: ₹8L - ₹15L / year</p>
            </div>
            <div className="text-2xl font-extrabold text-cyan-600">92%</div>
          </div>
          
          <div className="bg-white border border-blue-200 p-4 rounded-xl shadow-sm flex items-center justify-between relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
            <div>
              <h4 className="font-bold text-[#0a192f]">Robotics Engineer</h4>
              <p className="text-xs text-gray-500 font-medium">Avg Salary: ₹6L - ₹12L / year</p>
            </div>
            <div className="text-2xl font-extrabold text-blue-600">88%</div>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-center justify-between relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-400"></div>
            <div>
              <h4 className="font-bold text-[#0a192f]">Teacher / Educator</h4>
              <p className="text-xs text-gray-500 font-medium">Avg Salary: ₹4L - ₹8L / year</p>
            </div>
            <div className="text-2xl font-extrabold text-gray-600">74%</div>
          </div>
        </div>
      </div>

      <div className="bg-[#0a192f] border border-[#112240] p-8 rounded-2xl shadow-lg relative">
        <div className="absolute top-0 right-0 p-8 opacity-5"><TrendingUp size={100} className="text-cyan-400" /></div>
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10"><Briefcase size={18} className="text-cyan-400"/> Recommended Learning Path</h3>
        
        <div className="space-y-6 relative z-10">
          <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-[#1e293b]"></div>
          
          {[
            { step: "Grade 10", desc: "Focus on Core Math & Science" },
            { step: "Coding Basics", desc: "Python & Logic Building (Next Month)" },
            { step: "AI Fundamentals", desc: "Machine Learning intro (Grade 11)" },
            { step: "Internship", desc: "Remote Tech Internship (Grade 12)" },
            { step: "Career Placement", desc: "University / Job Match" }
          ].map((item, i) => (
            <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay: i * 0.15}} key={i} className="flex items-center gap-4 relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border-4 border-[#0a192f] shadow-lg ${i === 1 ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-[#1e293b] text-gray-400'}`}>
                {i+1}
              </div>
              <div>
                <h4 className={`font-bold ${i === 1 ? 'text-cyan-400' : 'text-gray-300'}`}>{item.step}</h4>
                <p className="text-xs text-gray-500 font-medium mt-0.5">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </ModalWrapper>
);


// --------- Main Component --------- //

export const FutureVisionSection = ({ id }) => {
  const [activeModal, setActiveModal] = useState(null);

  const visions = [
    {
      id: 'classroom',
      title: "AI-First Classrooms",
      description: "Transforming standard classrooms into smart environments where AI tracks engagement and generates real-time quizzes based on class performance.",
      icon: <Laptop size={32} />,
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "blue"
    },
    {
      id: 'hubs',
      title: "Smart Village Hubs",
      description: "Solar-powered micro-centers in remote villages acting as localized edge nodes and community internet providers.",
      icon: <Building2 size={32} />,
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "cyan"
    },
    {
      id: 'mentorship',
      title: "Personalized AI Mentorship",
      description: "AI companions that grow with the student from Grade 1 to Grade 12, remembering their learning style and adapting over a decade.",
      icon: <Lightbulb size={32} />,
      img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "indigo"
    },
    {
      id: 'career',
      title: "AI Career Guidance",
      description: "Connecting rural students to the global digital economy by identifying their strengths and guiding them towards tech, science, and engineering roles.",
      icon: <Briefcase size={32} />,
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "blue"
    }
  ];

  return (
    <section id={id} className="py-24 bg-white text-gray-900 relative overflow-hidden border-b border-gray-100">
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-4 border border-blue-200"
          >
            <Lightbulb size={16} /> Roadmap to 2030
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0a192f]">
            Our Future Vision
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-4 text-xl text-gray-600 font-medium">
            Scaling AI to touch every aspect of rural life. Click any card to experience the future.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {visions.map((vision, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              onClick={() => setActiveModal(vision.id)}
              className={`group relative overflow-hidden rounded-3xl bg-white border border-gray-200 hover:border-${vision.color}-400 hover:shadow-2xl hover:shadow-${vision.color}-900/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer`}
            >
              <div className="h-48 overflow-hidden relative border-b border-gray-200">
                <div className="absolute inset-0 bg-[#0a192f]/40 group-hover:bg-[#0a192f]/10 transition-colors z-10 mix-blend-multiply"></div>
                <img src={vision.img} alt={vision.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-sm">
                   <div className="bg-white/90 text-[#0a192f] px-6 py-2 rounded-full font-bold text-sm shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                     <Sparkles size={16}/> Click to Experience
                   </div>
                </div>
              </div>
              <div className="p-8 relative z-20 bg-white">
                <div className={`w-14 h-14 bg-${vision.color}-50 rounded-2xl flex items-center justify-center text-${vision.color}-600 mb-4 -mt-14 relative z-30 shadow-md border border-${vision.color}-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {vision.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#0a192f] group-hover:text-cyan-600 transition-colors">{vision.title}</h3>
                <p className="text-gray-600 leading-relaxed font-medium">{vision.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeModal === 'classroom' && <AIClassroomModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'hubs' && <SmartVillageModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'mentorship' && <AIMentorshipModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'career' && <AICareerModal onClose={() => setActiveModal(null)} />}
      </AnimatePresence>
    </section>
  );
};
