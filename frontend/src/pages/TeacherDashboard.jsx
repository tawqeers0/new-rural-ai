import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileText, Video, Sparkles, AlertCircle, Clock, BookOpen, BrainCircuit, CheckCircle, Search, Monitor, Subtitles, Languages, Mic } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';

export const TeacherDashboard = () => {
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, planner, homework
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar fallback="TK" size="lg" className="border-4 border-indigo-50" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Teacher Portal</h1>
            <p className="text-gray-500 mt-0.5 text-sm font-medium">Mrs. Tanvi K. • Grade 4 Mathematics</p>
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search students, subjects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <Button className="rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shrink-0 flex items-center gap-2 px-6" onClick={() => setIsVideoCall(true)}>
            <Video size={18} /> Start Live Class
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
        {[
          { id: 'overview', label: 'Class Overview', icon: Users },
          { id: 'planner', label: 'AI Lesson Planner', icon: Sparkles },
          { id: 'homework', label: 'Homework Manager', icon: FileText }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
          
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Top Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard icon={<Users />} title="Active Students" value="45" sub="Grade 4 Section A" color="indigo" />
                <MetricCard icon={<Clock />} title="Avg Attendance" value="94%" sub="Up 2% this week" color="cyan" />
                <MetricCard icon={<BookOpen />} title="Avg Score" value="78/100" sub="Math Fractions Unit" color="blue" />
                <MetricCard icon={<AlertCircle />} title="Needs Help" value="4" sub="Detected by AI" color="red" />
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* AI Student Insights */}
                <Card className="lg:col-span-2 border-amber-200 bg-amber-50/30">
                  <CardHeader className="border-b border-amber-100/50 pb-4">
                    <CardTitle className="flex items-center gap-2 text-amber-900"><BrainCircuit size={20} className="text-amber-600" /> AI Student Insights</CardTitle>
                    <CardDescription className="text-amber-700/80">Proactive detection of learning gaps and attendance risks.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-amber-100">
                      {[
                        { name: "Rahul Verma", risk: "Performance Drop", desc: "Scored 42% on recent Fraction quiz. Drop of 20% from average.", action: "Assign Revision Plan" },
                        { name: "Priya S.", risk: "Slow Learner", desc: "Taking 3x longer to complete assignments. Struggling with long division.", action: "Generate Extra Practice" },
                        { name: "Vikram T.", risk: "Attendance Risk", desc: "Missed 3 consecutive offline syncs. Content not delivered.", action: "Alert Admin" }
                      ].map((insight, i) => (
                        <div key={i} className="p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:bg-amber-100/30 transition-colors">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-bold text-gray-900">{insight.name}</h4>
                              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider">{insight.risk}</span>
                            </div>
                            <p className="text-sm text-gray-600">{insight.desc}</p>
                          </div>
                          <Button size="sm" className="shrink-0">{insight.action}</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Tracking Chart Mock */}
                <Card>
                  <CardHeader>
                    <CardTitle>Subject Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm font-bold text-gray-700 mb-1"><span>Addition</span><span>92%</span></div>
                      <Progress value={92} colorClass="bg-cyan-500" className="bg-gray-100" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-bold text-gray-700 mb-1"><span>Subtraction</span><span>85%</span></div>
                      <Progress value={85} colorClass="bg-blue-500" className="bg-gray-100" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-bold text-gray-700 mb-1"><span>Multiplication</span><span>76%</span></div>
                      <Progress value={76} colorClass="bg-indigo-500" className="bg-gray-100" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-bold text-gray-700 mb-1 text-red-600"><span>Fractions (Weak)</span><span>45%</span></div>
                      <Progress value={45} colorClass="bg-red-500" className="bg-gray-100" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'planner' && <AILessonPlanner />}

          {activeTab === 'homework' && <HomeworkManager />}

        </motion.div>
      </AnimatePresence>

      {/* Live Classroom Modal */}
      {isVideoCall && <LiveClassroomModal onClose={() => setIsVideoCall(false)} />}
    </motion.div>
  );
};

// Sub-component: AI Lesson Planner
const AILessonPlanner = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState(null);

  const handleGenerate = () => {
    if(!prompt) return;
    setIsGenerating(true);
    setPlan(null);
    setTimeout(() => {
      setIsGenerating(false);
      setPlan({
        title: "Introduction to Fractions (Grade 3)",
        notes: "1. Start with a pizza analogy to explain numerators and denominators.\n2. Define Numerator: The parts we have.\n3. Define Denominator: Total equal parts.\n4. Show visual examples on the board.",
        examples: ["1/2 = One half of a pizza", "1/4 = One quarter of a pie"],
        quiz: ["What is the top number called?", "If I have 3 parts out of 4, what is the fraction?"],
        homework: "Draw 3 different shapes and shade 1/3 of each."
      });
    }, 2000);
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <Card className="md:col-span-1 border-indigo-100 bg-indigo-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-900"><Sparkles size={20} className="text-indigo-600" /> AI Generator</CardTitle>
          <CardDescription>Instantly generate full lesson plans, quizzes, and homework.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Generate Grade 3 fractions lesson with a focus on visual analogies..."
            className="w-full h-32 p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-sm font-medium"
          />
          <Button className="w-full h-12 rounded-xl" onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate Lesson Suite"}
          </Button>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 min-h-[500px]">
        {isGenerating ? (
           <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-6">
                <BrainCircuit size={32} className="animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI is crafting your lesson...</h3>
              <p className="text-gray-500 max-w-sm">Generating notes, creating visual examples, formatting quizzes, and assigning homework.</p>
           </div>
        ) : plan ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 space-y-8">
            <div className="flex justify-between items-start border-b border-gray-100 pb-6">
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">{plan.title}</h2>
                <Badge className="bg-cyan-100 text-cyan-700 font-bold uppercase tracking-widest text-[10px]">AI Generated</Badge>
              </div>
              <Button variant="outline" className="text-sm font-bold border-gray-200">Export & Assign</Button>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><FileText size={16}/> Teaching Notes</h4>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{plan.notes}</div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><Sparkles size={16}/> Examples</h4>
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-sm text-indigo-900 whitespace-pre-wrap leading-relaxed space-y-2">
                  {plan.examples.map((ex, i) => <p key={i} className="font-medium">• {ex}</p>)}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><CheckCircle size={16}/> Auto-Quiz</h4>
                <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-100 text-sm text-cyan-900 whitespace-pre-wrap leading-relaxed space-y-2">
                  {plan.quiz.map((q, i) => <p key={i} className="font-medium">Q{i+1}: {q}</p>)}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><BookOpen size={16}/> Homework</h4>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-sm text-amber-900 font-medium leading-relaxed">{plan.homework}</div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 border-dashed border-2 m-4 rounded-3xl border-gray-200 bg-gray-50/50">
            <Sparkles size={48} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">Empty Canvas</h3>
            <p className="text-gray-500">Type a prompt on the left to let AI create your entire lesson plan instantly.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

// Sub-component: Homework Manager
const HomeworkManager = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Homework Submissions</CardTitle>
            <CardDescription>Grade assignments and provide feedback.</CardDescription>
          </div>
          <Button className="rounded-xl">Upload New Homework</Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Assignment</th>
                <th className="px-6 py-4">Submission Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: "Rahul V.", assign: "Fraction Basics", date: "Today, 10:00 AM", status: "Pending Review", statusColor: "amber" },
                { name: "Anjali M.", assign: "Fraction Basics", date: "Yesterday", status: "Graded (85%)", statusColor: "cyan" },
                { name: "Vikram T.", assign: "Fraction Basics", date: "Overdue", status: "Missing", statusColor: "red" }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{row.name}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{row.assign}</td>
                  <td className="px-6 py-4 text-gray-500">{row.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-${row.statusColor}-100 text-${row.statusColor}-700`}>{row.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    {row.status === "Pending Review" ? (
                      <Button size="sm" variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">Give Marks & Feedback</Button>
                    ) : row.status === "Missing" ? (
                      <Button size="sm" variant="ghost" className="text-gray-400">Send Reminder</Button>
                    ) : (
                      <Button size="sm" variant="ghost" className="text-gray-400">View</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

// Sub-component: Live Classroom Modal
const LiveClassroomModal = ({ onClose }) => {
  const [isScreenShared, setIsScreenShared] = useState(false);
  const [subtitles, setSubtitles] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    let stream;
    if (cameraEnabled && !isScreenShared) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch(err => {
          console.error("Error accessing camera:", err);
          setCameraEnabled(false);
        });
    }
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraEnabled, isScreenShared]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-gray-900/95 backdrop-blur-2xl p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="bg-gray-900 rounded-3xl overflow-hidden w-full max-w-6xl shadow-2xl relative border border-gray-700 flex flex-col h-[85vh]">
        
        {/* Class Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center text-white bg-black/60 shrink-0">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold border border-red-500/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> LIVE
            </div>
            <div>
              <h3 className="font-bold">Grade 4 Mathematics</h3>
              <p className="text-xs text-gray-400">42 Students connected via Edge Nodes</p>
            </div>
          </div>
          <Button className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-6 h-10 font-bold shadow-lg" onClick={onClose}>
            End Class
          </Button>
        </div>
        
        {/* Main Stage */}
        <div className="flex-1 flex flex-col lg:flex-row relative overflow-hidden">
          
          {/* Video / Screen Share Area */}
          <div className="flex-1 bg-black relative flex items-center justify-center p-4">
            {isScreenShared ? (
              <div className="w-full h-full bg-white rounded-xl border-4 border-indigo-500/30 flex flex-col">
                <div className="bg-gray-100 p-3 border-b flex items-center gap-2 text-sm font-bold text-gray-600">
                  <Monitor size={16} /> Screen Sharing: Whiteboard
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <h1 className="text-6xl font-black text-indigo-200">WHITEBOARD</h1>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-800 rounded-xl flex items-center justify-center border-4 border-gray-700 overflow-hidden relative">
                {cameraEnabled ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Video size={64} className="text-gray-600" />
                )}
                <p className="absolute bottom-4 left-4 text-white font-bold bg-black/50 px-3 py-1 rounded-lg backdrop-blur-md">Teacher Camera</p>
              </div>
            )}

            {/* AI Subtitles Overlay */}
            {subtitles && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-28 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl max-w-2xl text-center shadow-2xl">
                <p className="text-lg font-medium text-white mb-1">"So today we are going to learn about fractions..."</p>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-cyan-400 mt-2">
                  <Languages size={14} /> Auto-translating to Hindi, Kannada, Telugu for students.
                </div>
              </motion.div>
            )}

            {/* Controls */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 bg-gray-900/80 backdrop-blur-md p-2 rounded-2xl border border-gray-700 shadow-2xl">
               <Button onClick={() => setCameraEnabled(!cameraEnabled)} variant="ghost" className={`rounded-xl w-14 h-14 p-0 ${cameraEnabled ? 'text-white hover:bg-gray-700' : 'text-red-500 hover:bg-red-500/20'}`}><Video size={24} /></Button>
               <Button onClick={() => setMicEnabled(!micEnabled)} variant="ghost" className={`rounded-xl w-14 h-14 p-0 ${micEnabled ? 'text-white hover:bg-gray-700' : 'text-red-500 hover:bg-red-500/20'}`}><Mic size={24} /></Button>
               <div className="w-px h-8 bg-gray-700 my-auto mx-1"></div>
               <Button onClick={() => setIsScreenShared(!isScreenShared)} variant={isScreenShared ? "default" : "ghost"} className={`rounded-xl h-14 px-4 font-bold flex items-center gap-2 ${isScreenShared ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'text-white hover:bg-gray-700'}`}>
                 <Monitor size={20} /> {isScreenShared ? 'Stop Sharing' : 'Share Screen'}
               </Button>
               <Button onClick={() => setSubtitles(!subtitles)} variant={subtitles ? "default" : "ghost"} className={`rounded-xl h-14 px-4 font-bold flex items-center gap-2 ${subtitles ? 'bg-cyan-600 hover:bg-cyan-700 text-white' : 'text-white hover:bg-gray-700'}`}>
                 <Subtitles size={20} /> AI Subtitles
               </Button>
            </div>
          </div>

          {/* Chat / Participants Sidebar */}
          <div className="w-full lg:w-80 bg-gray-900 border-l border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800 font-bold text-white flex items-center gap-2">
              <Users size={18} className="text-gray-400" /> Participants (42)
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {['Rahul V.', 'Priya S.', 'Vikram T.', 'Anjali M.', 'Karan D.', 'Neha S.', 'Rohan K.', 'Sunita L.'].map((name, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800 text-gray-300 text-sm font-medium">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs text-gray-500">{name[0]}</div>
                    {name}
                  </div>
                  <div className="flex items-center gap-2">
                    {i === 2 ? <span className="w-2 h-2 rounded-full bg-amber-500" title="Low Bandwidth"></span> : <span className="w-2 h-2 rounded-full bg-cyan-500" title="Good Connection"></span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-800 bg-gray-900/50">
               <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3">
                 <p className="text-xs font-bold text-indigo-400 mb-1 flex items-center gap-1"><Sparkles size={12}/> AI Moderator</p>
                 <p className="text-xs text-gray-400">Monitoring chat for questions and automatically translating student messages to English.</p>
               </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

const MetricCard = ({ icon, title, value, sub, color }) => (
  <Card className="p-6">
    <div className={`w-12 h-12 rounded-xl bg-${color}-50 text-${color}-600 flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{value}</h3>
    <p className="text-sm font-bold text-gray-700 mt-1">{title}</p>
    <p className="text-xs font-medium text-gray-500 mt-1">{sub}</p>
  </Card>
);
