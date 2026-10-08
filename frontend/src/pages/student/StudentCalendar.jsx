import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Video, FileText, ChevronLeft, ChevronRight, X, BrainCircuit, PlayCircle, BookOpen, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

// Mock Data
const MOCK_EVENTS = [
  { id: 1, type: 'deadline', date: '14', month: 'NOV', title: 'Math Fractions Homework', time: 'Due at 5:00 PM', color: 'red', desc: 'Complete the interactive worksheet on adding fractions with different denominators.', actionText: 'Submit Assignment', icon: FileText },
  { id: 2, type: 'live', date: '16', month: 'NOV', title: 'Science: Solar System', time: '10:00 AM - 11:30 AM', color: 'blue', desc: 'Join Mrs. Sharma for a live 3D tour of the solar system. Ask questions in real-time.', actionText: 'Join Classroom', icon: Video },
  { id: 3, type: 'ai', date: '18', month: 'NOV', title: 'AI Revision Session', time: 'Flexible', color: 'cyan', desc: 'Your RuralAI tutor recommends a 15-minute revision on History before the upcoming quiz.', actionText: 'Start Session', icon: BrainCircuit },
  { id: 4, type: 'completed', date: '10', month: 'NOV', title: 'Grammar Quiz', time: 'Completed', color: 'gray', desc: 'You scored 95% on the Advanced English Grammar quiz!', actionText: 'View Results', icon: BookOpen },
];

export const StudentCalendar = () => {
  const [view, setView] = useState('month'); // month, week, day
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [view]);

  const renderSkeleton = () => (
    <div className="space-y-4 animate-pulse p-6">
      <div className="h-24 bg-gray-100 rounded-2xl w-full"></div>
      <div className="h-24 bg-gray-100 rounded-2xl w-full"></div>
      <div className="h-24 bg-gray-100 rounded-2xl w-full"></div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pb-24 relative">

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedEvent(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden">

              <div className={`h-24 bg-${selectedEvent.color}-500 p-6 flex justify-between items-start`}>
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                  <selectedEvent.icon className="text-white" size={28} />
                </div>
                <button onClick={() => setSelectedEvent(null)} className="text-white/80 hover:text-white bg-black/10 hover:bg-black/20 p-2 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 relative">
                <div className={`absolute -top-10 right-8 bg-white shadow-lg rounded-2xl border border-gray-100 w-20 h-20 flex flex-col items-center justify-center`}>
                  <span className={`text-${selectedEvent.color}-500 font-black text-2xl leading-none`}>{selectedEvent.date}</span>
                  <span className="text-gray-400 text-xs font-bold">{selectedEvent.month}</span>
                </div>

                <div className="pr-24">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 text-${selectedEvent.color}-700 bg-${selectedEvent.color}-50`}>
                    {selectedEvent.type.toUpperCase()}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
                  <p className="text-gray-500 font-medium flex items-center gap-2 mb-6"><Clock size={16} /> {selectedEvent.time}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-8">
                  <p className="text-gray-700 leading-relaxed">{selectedEvent.desc}</p>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setSelectedEvent(null)} className="rounded-xl border-gray-200">Close</Button>
                  <Button className={`rounded-xl shadow-md bg-${selectedEvent.color}-600 hover:bg-${selectedEvent.color}-700 text-white`}>
                    {selectedEvent.actionText}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">My Calendar</h1>
          <p className="text-gray-500 text-lg">Upcoming classes, deadlines, and schedule</p>
        </div>

        {/* View Toggles */}
        <div className="flex p-1 bg-white border border-gray-200 rounded-xl shadow-sm">
          {['month', 'week', 'day'].map(v => (
            <button key={v} onClick={() => setView(v)} className={`px-4 py-2 rounded-lg font-bold text-sm capitalize transition-all ${view === v ? 'bg-cyan-50 text-cyan-700 shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">

        {/* Main Calendar View */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
          <div className="p-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center shrink-0">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <CalendarIcon className="text-cyan-600" />
              {view === 'month' ? 'November 2026' : view === 'week' ? 'Nov 14 - Nov 20, 2026' : 'November 14, 2026'}
            </h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"><ChevronLeft size={18} className="text-gray-600" /></button>
              <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"><ChevronRight size={18} className="text-gray-600" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
            {loading ? renderSkeleton() : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 space-y-4">
                {MOCK_EVENTS.map(event => (
                  <div key={event.id} onClick={() => setSelectedEvent(event)}
                    className={`flex flex-col sm:flex-row gap-6 p-4 rounded-2xl border transition-all cursor-pointer group bg-${event.color}-50/30 border-${event.color}-100 hover:shadow-md hover:border-${event.color}-300 hover:bg-${event.color}-50`}>

                    <div className={`w-16 h-16 bg-white rounded-xl shadow-sm flex flex-col items-center justify-center shrink-0 border border-${event.color}-100 group-hover:scale-105 transition-transform`}>
                      <span className={`text-${event.color}-500 font-black text-xl leading-none`}>{event.date}</span>
                      <span className="text-gray-400 text-[10px] font-bold mt-0.5">{event.month}</span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-${event.color}-700 bg-${event.color}-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider`}>
                          {event.type}
                        </span>
                        <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-${event.color}-500 opacity-0 group-hover:opacity-100 transition-opacity`}>
                          <ChevronRight size={16} />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
                      <p className="text-gray-500 text-sm flex items-center gap-2 font-medium">
                        <Clock size={14} className={`text-${event.color}-400`} /> {event.time}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Empty state simulation for specific views */}
                {view === 'day' && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">No more events today!</h3>
                    <p className="text-gray-500">You've cleared your schedule.</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Sidebar Metrics */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-6 text-white shadow-lg">
            <h3 className="font-bold mb-4 flex items-center gap-2"><BrainCircuit size={18} /> AI Insights</h3>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-sm font-medium">You have a Math assignment due in 2 days. Want me to help you start?</p>
                <button className="mt-3 text-xs font-bold bg-white text-cyan-700 px-3 py-1.5 rounded-lg hover:bg-cyan-50 transition-colors">Start Prep</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Attendance Streak</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-black text-cyan-500">12</span>
              <span className="text-gray-500 font-medium pb-1">Days</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Keep it up! You're in the top 10% of your class.</p>
            <div className="flex justify-between">
              {['M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i < 4 ? 'bg-cyan-100 text-cyan-600' : 'bg-gray-100 text-gray-400'}`}>
                    {i < 4 ? '✓' : ''}
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
