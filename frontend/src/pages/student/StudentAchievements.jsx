import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Flame, Crown, Lock, Share2, Download, CheckCircle, Award } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const ACHIEVEMENTS = [
  {
    id: 1,
    title: 'Math Scholar',
    desc: 'Completed all Grade 3 Algebra modules with perfect scores.',
    date: 'Unlocked Nov 12, 2026',
    icon: Crown,
    color: 'yellow',
    gradient: 'from-yellow-400 to-amber-500',
    stats: '15/15 Modules Completed',
    unlocked: true,
  },
  {
    id: 2,
    title: '7 Day Streak',
    desc: 'Learned consistently for a whole week without missing a day.',
    date: 'Unlocked Today',
    icon: Flame,
    color: 'orange',
    gradient: 'from-orange-400 to-red-500',
    stats: '7/7 Days Active',
    unlocked: true,
  },
  {
    id: 3,
    title: 'Fast Learner',
    desc: 'Scored 100% on 5 practice quizzes consecutively.',
    date: 'Unlocked Oct 30, 2026',
    icon: Star,
    color: 'cyan',
    gradient: 'from-cyan-400 to-blue-500',
    stats: '5/5 Quizzes Aced',
    unlocked: true,
  },
  {
    id: 4,
    title: 'Science Explorer',
    desc: 'Complete all interactive 3D science simulations for the semester.',
    date: 'Locked',
    icon: Award,
    color: 'gray',
    gradient: 'from-gray-200 to-gray-300',
    stats: '2/10 Simulations Completed',
    unlocked: false,
  },
  {
    id: 5,
    title: 'Language Master',
    desc: 'Use the Multi-Language AI Tutor in all 4 supported languages.',
    date: 'Locked',
    icon: Trophy,
    color: 'gray',
    gradient: 'from-gray-200 to-gray-300',
    stats: '1/4 Languages Used',
    unlocked: false,
  }
];

export const StudentAchievements = () => {
  const [selected, setSelected] = useState(null);
  const [isSharing, setIsSharing] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pb-24 relative">

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSelected(null); setIsSharing(false); }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md relative z-10 overflow-hidden text-center"
            >
              {/* Confetti Background Simulation */}
              {selected.unlocked && (
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
              )}

              <div className={`pt-12 pb-8 px-8 bg-gradient-to-b ${selected.unlocked ? selected.gradient : 'from-gray-100 to-gray-200'}`}>
                <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border-4 border-white/40 mb-6">
                  <selected.icon size={48} className={selected.unlocked ? 'text-white drop-shadow-md' : 'text-gray-400'} />
                </div>
                <h2 className={`text-3xl font-black mb-2 ${selected.unlocked ? 'text-white' : 'text-gray-800'}`}>
                  {selected.title}
                </h2>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${selected.unlocked ? 'bg-white/20 text-white' : 'bg-gray-300 text-gray-600'}`}>
                  {selected.unlocked ? <CheckCircle size={14} /> : <Lock size={14} />}
                  {selected.unlocked ? 'Unlocked' : 'Locked'}
                </div>
              </div>

              <div className="p-8 bg-white">
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {selected.desc}
                </p>

                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-8">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Progress</p>
                  <p className="text-xl font-black text-gray-900">{selected.stats}</p>
                </div>

                <div className="flex gap-4 justify-center relative">
                  {selected.unlocked ? (
                    <>
                      <Button className="flex-1 rounded-xl bg-gray-900 hover:bg-gray-800 text-white h-12">
                        <Download size={18} className="mr-2" /> Certificate
                      </Button>
                      <div className="relative">
                        <Button
                          onClick={() => setIsSharing(!isSharing)}
                          variant="outline"
                          className={`w-12 h-12 rounded-xl border-gray-200 p-0 flex items-center justify-center transition-colors ${isSharing ? 'bg-gray-100' : ''}`}
                        >
                          <Share2 size={18} className="text-gray-600" />
                        </Button>

                        <AnimatePresence>
                          {isSharing && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              className="absolute bottom-full right-0 mb-3 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col z-20"
                            >
                              <a href={`https://api.whatsapp.com/send?text=I just unlocked the ${selected.title} achievement on RuralAI!`} target="_blank" rel="noreferrer" className="flex items-center px-4 py-3 hover:bg-cyan-50 text-cyan-600 font-bold text-sm transition-colors border-b border-gray-50">
                                Share on WhatsApp
                              </a>
                              <a href={`sms:?body=I just unlocked the ${selected.title} achievement on RuralAI!`} target="_blank" rel="noreferrer" className="flex items-center px-4 py-3 hover:bg-blue-50 text-blue-600 font-bold text-sm transition-colors border-b border-gray-50">
                                Share via Messages
                              </a>
                              <a href={`https://www.facebook.com/sharer/sharer.php?u=ruralai.app`} target="_blank" rel="noreferrer" className="flex items-center px-4 py-3 hover:bg-indigo-50 text-indigo-600 font-bold text-sm transition-colors">
                                Share on Facebook
                              </a>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  ) : (
                    <Button onClick={() => { setSelected(null); setIsSharing(false); }} className="flex-1 rounded-xl bg-gray-900 hover:bg-gray-800 text-white h-12">
                      Keep Learning
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/20 relative">
          <Trophy size={40} className="text-yellow-500 relative z-10" />
          <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-20"></div>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">My Achievements</h1>
        <p className="text-gray-500 text-lg">You have earned 1,250 XP total. Keep going!</p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(item)}
            className={`cursor-pointer rounded-3xl p-6 border shadow-lg transition-shadow duration-300
              ${item.unlocked
                ? `bg-gradient-to-br ${item.gradient} text-white shadow-${item.color}-500/30 border-${item.color}-300`
                : 'bg-white border-gray-200 shadow-gray-200/50 grayscale hover:grayscale-0'
              }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${item.unlocked ? 'bg-white/20' : 'bg-gray-100 text-gray-400'}`}>
                <item.icon size={32} className={item.unlocked ? 'text-white drop-shadow-sm' : ''} />
              </div>
              {!item.unlocked && <Lock size={20} className="text-gray-300" />}
            </div>

            <h3 className={`text-2xl font-black mb-2 ${item.unlocked ? '' : 'text-gray-800'}`}>{item.title}</h3>
            <p className={`font-medium text-sm mb-6 ${item.unlocked ? `text-${item.color}-100` : 'text-gray-500'}`}>
              {item.desc}
            </p>

            <div className={`rounded-full px-4 py-1.5 text-xs font-bold w-fit 
              ${item.unlocked ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
              {item.date}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
