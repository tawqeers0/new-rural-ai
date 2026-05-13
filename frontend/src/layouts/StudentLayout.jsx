import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, BrainCircuit, Trophy, 
  Calendar, Download, Settings, LogOut, Menu, X, Globe, Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';

export const StudentLayout = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('English');

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/student' },
    { name: 'Courses', icon: <BookOpen size={20} />, path: '/student/courses' },
    { name: 'AI Tutor', icon: <BrainCircuit size={20} />, path: '/student/tutor' },
    { name: 'Achievements', icon: <Trophy size={20} />, path: '/student/achievements' },
    { name: 'Calendar', icon: <Calendar size={20} />, path: '/student/calendar' },
    { name: 'Offline Learning', icon: <Download size={20} />, path: '/student/offline' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/student/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-40">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/20">
            RA
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">RuralAI</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
          {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  location.pathname === item.path 
                    ? 'bg-cyan-50 text-cyan-700 shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
              <div className={`${location.pathname === item.path ? 'text-cyan-600' : 'text-gray-400'}`}>
                {item.icon}
              </div>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl mb-4 border border-gray-100">
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Student" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" />
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">Rahul Kumar</p>
              <p className="text-xs text-gray-500 font-medium">Grade 8 • Student</p>
            </div>
          </div>
          <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-colors">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen relative overflow-x-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 h-20 flex items-center justify-between lg:justify-end">
          <div className="flex lg:hidden items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Menu size={24} />
            </button>
            <span className="text-xl font-bold tracking-tight text-gray-900">RuralAI</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-100 transition-colors">
              <Globe size={16} className="text-blue-500" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm font-bold text-gray-700 outline-none cursor-pointer"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                <option value="Telugu">Telugu (తెలుగు)</option>
              </select>
            </div>
            <Link to="/">
              <Button variant="outline" className="rounded-full text-sm font-bold h-10 border-gray-200 text-gray-600 hover:bg-gray-50">
                Exit Portal
              </Button>
            </Link>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden backdrop-blur-sm"
              />
              <motion.aside 
                initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                className="fixed inset-y-0 left-0 w-72 bg-white z-50 flex flex-col lg:hidden border-r border-gray-200"
              >
                <div className="p-6 flex items-center justify-between border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/20">RA</div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">RuralAI</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
                </div>
                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                  {navItems.map((item) => (
                    <Link 
                      key={item.name} to={item.path} 
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold ${location.pathname === item.path ? 'bg-cyan-50 text-cyan-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                    >
                      <div className={`${location.pathname === item.path ? 'text-cyan-600' : 'text-gray-400'}`}>{item.icon}</div>
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
