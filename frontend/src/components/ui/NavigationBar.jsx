import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, LayoutDashboard, Settings, FileText, BarChart3 } from 'lucide-react';

export const NavigationBar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', 'features', 'technology', 'demo', 'impact', 'vision'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, []);

  const scrollToSection = (id) => {
    if (id === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); }
    else { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Features', id: 'features' },
    { name: 'AI Tech', id: 'technology' },
    { name: 'Live Demo', id: 'demo' },
    { name: 'Impact', id: 'impact' },
    { name: 'Vision', id: 'vision' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[150] transition-all duration-500 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-xl border-b border-[#E2E8F0] shadow-[0_1px_20px_rgba(15,23,42,0.07)] py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-9 h-9 bg-[#0F172A] rounded-xl flex items-center justify-center shadow-[0_4px_12px_rgba(15,23,42,0.25)] group-hover:shadow-[0_4px_20px_rgba(56,189,248,0.35)] transition-shadow duration-300">
            <span className="text-sky-400 font-black text-sm">RA</span>
          </div>
          <span className="text-[#0F172A] font-black text-lg tracking-tight">
            Rural<span className="text-sky-500">AI</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="relative px-4 py-2 text-sm font-semibold rounded-lg group transition-colors duration-200"
              style={{ color: activeSection === link.id ? '#0F172A' : '#64748B' }}
            >
              <span className="relative z-10 group-hover:text-[#0F172A] transition-colors">
                {link.name}
              </span>
              {activeSection === link.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-3 right-3 h-[2px] bg-sky-500 rounded-full"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => navigate('/student')}
            className="px-4 py-2 text-sm font-semibold text-[#0F172A] border border-[#E2E8F0] rounded-xl bg-white hover:bg-[#F8FAFC] hover:border-sky-300 transition-all duration-200"
          >
            Dashboard
          </button>

          <div
            className="relative"
            onMouseEnter={() => setAdminDropdownOpen(true)}
            onMouseLeave={() => setAdminDropdownOpen(false)}
          >
            <button className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">
              Admin Console
              <ChevronDown size={14} className={`transition-transform duration-200 ${adminDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {adminDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-[0_8px_40px_rgba(15,23,42,0.12)] border border-[#E2E8F0] overflow-hidden"
                >
                  <div className="p-1.5">
                    {[
                      { label: 'Teacher Portal',   path: '/admin/teacher',    icon: <LayoutDashboard size={15} className="text-sky-500" /> },
                      { label: 'Admin Dashboard',  path: '/admin',            icon: <Settings size={15} className="text-[#1E3A8A]" /> },
                      { label: 'Analytics',        path: '/admin/analytics',  icon: <BarChart3 size={15} className="text-sky-500" /> },
                      { label: 'Reports',          path: '/admin/reports',    icon: <FileText size={15} className="text-[#1E3A8A]" /> },
                    ].map(item => (
                      <button
                        key={item.path}
                        onClick={() => { navigate(item.path); setAdminDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[#334155] font-semibold hover:bg-[#F8FAFC] hover:text-[#0F172A] rounded-xl transition-colors"
                      >
                        {item.icon} {item.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-[#0F172A] p-2 rounded-xl hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-[#E2E8F0] overflow-hidden shadow-lg"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left font-semibold py-2.5 px-3 rounded-xl text-sm transition-colors ${
                    activeSection === link.id
                      ? 'bg-sky-50 text-sky-600'
                      : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-[#E2E8F0] mt-2">
                <button
                  onClick={() => navigate('/student')}
                  className="w-full py-3 text-sm font-bold text-[#0F172A] border border-[#E2E8F0] rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/admin')}
                  className="btn-primary w-full py-3 text-sm justify-center"
                >
                  Admin Console
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
