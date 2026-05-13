import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, HardDrive, PlayCircle, Trash2, RefreshCcw, X, Play, Pause, Volume2, Maximize, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const INITIAL_DOWNLOADS = [
  { id: 1, title: 'Fractions Basics Video', size: 145, date: 'Downloaded Yesterday', type: 'video' },
  { id: 2, title: 'Solar System 3D Model', size: 80, date: 'Downloaded Today', type: 'interactive' },
  { id: 3, title: 'English Grammar Ch 1', size: 45, date: 'Downloaded 2 days ago', type: 'video' }
];

const TOTAL_STORAGE = 1024; // 1GB in MB

export const StudentOffline = () => {
  const [downloads, setDownloads] = useState(INITIAL_DOWNLOADS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const usedStorage = downloads.reduce((acc, curr) => acc + curr.size, 0);
  const storagePercentage = Math.round((usedStorage / TOTAL_STORAGE) * 100);
  const dashOffset = 440 - (440 * storagePercentage) / 100;

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const handleDelete = (id) => {
    setDownloads(prev => prev.filter(d => d.id !== id));
  };

  const openPlayer = (item) => {
    if (item.type === 'video') {
      setActiveVideo(item);
      setIsPlaying(true);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pb-24 relative">
      
      {/* Video Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveVideo(null)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="bg-gray-900 rounded-3xl shadow-2xl w-full max-w-5xl relative z-10 overflow-hidden border border-gray-800">
              
              {/* Modal Header */}
              <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-30 bg-gradient-to-b from-black/80 to-transparent">
                <div>
                  <h2 className="text-xl font-bold text-white">{activeVideo.title}</h2>
                  <span className="text-xs font-bold bg-cyan-500 text-white px-2 py-0.5 rounded-full uppercase tracking-widest mt-1 inline-block">Offline Playback</span>
                </div>
                <button onClick={() => setActiveVideo(null)} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm">
                  <X size={20} />
                </button>
              </div>

              {/* Mock Player Area */}
              <div className="w-full aspect-video bg-black relative group cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
                {/* Simulated Video Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-8 border-white/5 rounded-full flex items-center justify-center animate-spin-slow">
                    <div className="w-32 h-32 border-8 border-cyan-500/20 rounded-full"></div>
                  </div>
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
                      <div className="w-24 h-24 bg-cyan-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-cyan-900/50 transform hover:scale-105 transition-all">
                        <Play size={40} className="ml-2" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Player Controls */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" onClick={e => e.stopPropagation()}>
                  <div className="w-full h-1.5 bg-white/20 rounded-full mb-6 cursor-pointer relative group/bar">
                    <div className="absolute h-full bg-cyan-500 rounded-full" style={{ width: '35%' }}></div>
                    <div className="absolute h-4 w-4 bg-white rounded-full top-1/2 -translate-y-1/2 shadow-lg transform scale-0 group-hover/bar:scale-100 transition-transform" style={{ left: '35%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-6">
                      <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-cyan-400 transition-colors">
                        {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                      </button>
                      <div className="flex items-center gap-2 group/volume">
                        <Volume2 size={24} className="hover:text-cyan-400 transition-colors cursor-pointer" />
                        <div className="w-0 overflow-hidden group-hover/volume:w-24 transition-all duration-300 ease-out">
                          <div className="w-24 h-1.5 bg-white/30 rounded-full mt-0.5"><div className="w-2/3 h-full bg-white rounded-full"></div></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium tracking-wide">04:12 / 15:30</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <button className="text-xs font-bold border border-white/30 px-2 py-1 rounded hover:bg-white/10 transition-colors">CC</button>
                      <button className="text-sm font-bold hover:text-cyan-400 transition-colors">1.0x</button>
                      <button className="text-sm font-bold hover:text-cyan-400 transition-colors">720p</button>
                      <button className="hover:text-cyan-400 transition-colors"><Maximize size={20} /></button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Offline Learning</h1>
          <p className="text-gray-500 text-lg">Manage downloaded content and learn without internet</p>
        </div>
        <Button onClick={handleSync} disabled={isSyncing} className={`rounded-xl h-12 px-6 bg-gray-900 hover:bg-gray-800 text-white shadow-lg transition-all ${isSyncing ? 'opacity-80' : ''}`}>
          <RefreshCcw size={18} className={`mr-2 ${isSyncing ? 'animate-spin' : ''}`} /> 
          {isSyncing ? 'Syncing...' : 'Sync Now'}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-cyan-50 rounded-xl"><Download className="text-cyan-600" size={24} /></div>
                Downloaded Lessons
              </h2>
              <span className="bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-full text-sm">{downloads.length} Items</span>
            </div>
            
            {downloads.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                  <Download className="text-gray-300" size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No downloaded lessons</h3>
                <p className="text-gray-500">Go to any course to download lessons for offline viewing.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {downloads.map(item => (
                    <motion.div key={item.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all hover:shadow-sm group">
                        <div className="flex items-center gap-4 cursor-pointer" onClick={() => openPlayer(item)}>
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm
                            ${item.type === 'video' ? 'bg-blue-100 text-blue-600 border border-blue-200' : 'bg-cyan-100 text-cyan-600 border border-cyan-200'}`}>
                            <PlayCircle size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg group-hover:text-cyan-600 transition-colors">{item.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-bold text-gray-500 bg-gray-200/50 px-2 py-0.5 rounded-full">{item.size} MB</span>
                              <span className="text-xs font-medium text-gray-400">• {item.date}</span>
                            </div>
                          </div>
                        </div>
                        <button onClick={() => handleDelete(item.id)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Storage Widget */}
        <div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-2xl shadow-gray-900/20 sticky top-8">
            <h3 className="text-xl font-bold flex items-center gap-3 mb-8">
              <div className="p-2 bg-white/10 rounded-xl"><HardDrive className="text-cyan-400" size={20} /></div>
              Storage Status
            </h3>
            
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="14" fill="transparent" className="text-gray-700" />
                <motion.circle 
                  cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="14" fill="transparent" strokeLinecap="round"
                  className="text-cyan-400"
                  strokeDasharray="527"
                  initial={{ strokeDashoffset: 527 }}
                  animate={{ strokeDashoffset: 527 - (527 * storagePercentage) / 100 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  key={storagePercentage}
                  initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl font-black text-white"
                >
                  {storagePercentage}%
                </motion.span>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Used</span>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-medium">Downloaded</span>
                <span className="font-bold text-white">{usedStorage} MB</span>
              </div>
              <div className="w-full h-px bg-white/10"></div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-medium">Available</span>
                <span className="font-bold text-cyan-400">{TOTAL_STORAGE - usedStorage} MB</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
