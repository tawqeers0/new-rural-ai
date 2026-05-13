import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, WifiOff, Users, PlayCircle, 
  MessageSquare, ShieldCheck, Zap, GraduationCap,
  Activity, Globe, Cpu
} from 'lucide-react';
import { HeroCarousel } from '../components/ui/HeroCarousel';
import { NavigationBar } from '../components/ui/NavigationBar';
import { AITechnologySection } from '../components/sections/AITechnologySection';
import { RuralImpactSection } from '../components/sections/RuralImpactSection';
import { FutureVisionSection } from '../components/sections/FutureVisionSection';
import { LiveAIDemoSection } from '../components/sections/LiveAIDemoSection';

// Animated counter hook
const useCounter = (end, duration = 2000, shouldStart = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, shouldStart]);
  return count;
};

// Live AI Command Center
const LiveCommandCenter = () => {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const req = useCounter(1247, 2200, started);
  const villages = useCounter(1450, 2000, started);
  const students = useCounter(12482, 2500, started);
  const langs = useCounter(8, 1500, started);

  const nodes = [
    { x: '20%', y: '25%', label: 'Karnataka' },
    { x: '55%', y: '15%', label: 'UP' },
    { x: '80%', y: '30%', label: 'Bihar' },
    { x: '15%', y: '65%', label: 'Rajasthan' },
    { x: '50%', y: '55%', label: 'MP' },
    { x: '75%', y: '70%', label: 'Odisha' },
  ];

  const stats = [
    { value: req.toLocaleString(), label: 'AI Requests / sec', icon: <Cpu size={20} className="text-sky-400" /> },
    { value: villages.toLocaleString(), label: 'Villages Connected', icon: <Globe size={20} className="text-sky-400" /> },
    { value: students.toLocaleString(), label: 'Students Online', icon: <Users size={20} className="text-sky-400" /> },
    { value: langs, label: 'Languages Active', icon: <Activity size={20} className="text-sky-400" /> },
  ];

  return (
    <section ref={sectionRef} className="py-28 bg-[#0F172A] relative overflow-hidden">
      <div className="bg-navy-grid absolute inset-0 opacity-100" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="section-label text-sky-400">Real-Time Operations</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3 mb-4">
            Live AI Command Center
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-xl mx-auto">
            Every number below is live. Our neural engine is actively serving students across rural India right now.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Network Visualization */}
          <div className="relative h-80 bg-[#0a192f] rounded-[28px] border border-[#1E293B] overflow-hidden shadow-2xl">
            <svg className="absolute inset-0 w-full h-full">
              {nodes.map((n, i) => nodes.slice(i + 1, i + 3).map((m, j) => (
                <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke="rgba(56,189,248,0.15)" strokeWidth="1" />
              )))}
            </svg>
            {nodes.map((node, i) => (
              <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: node.x, top: node.y }}>
                <div className="relative">
                  <div className="w-3 h-3 bg-sky-400 rounded-full animate-node-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
                  <div className="absolute -inset-2 bg-sky-400/20 rounded-full animate-ping" style={{ animationDelay: `${i * 0.4}s`, animationDuration: '2s' }} />
                  <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] text-sky-400/70 font-bold whitespace-nowrap">{node.label}</span>
                </div>
              </div>
            ))}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
              <span className="text-xs text-sky-400/70 font-bold tracking-widest uppercase">Neural Network Active</span>
            </div>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={started ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-[#0a192f] border border-[#1E293B] rounded-[20px] p-6 hover:border-sky-500/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
                  {stat.icon}
                </div>
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs text-[#64748B] font-semibold uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ModalBase = ({ onClose, icon, title, subtitle, children, btnLabel }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0F172A]/80 backdrop-blur-md p-4">
    <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
      className="bg-white border border-[#E2E8F0] rounded-[28px] p-8 max-w-lg w-full shadow-2xl relative">
      <button onClick={onClose} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold transition-colors">✕</button>
      <div className="w-14 h-14 bg-[#0F172A] rounded-2xl flex items-center justify-center text-sky-400 mb-6 shadow-lg">{icon}</div>
      <h3 className="text-2xl font-bold text-[#0F172A] mb-1">{title}</h3>
      <p className="text-[#64748B] mb-6 font-medium">{subtitle}</p>
      {children}
      <button onClick={onClose} className="btn-primary w-full justify-center mt-2">{btnLabel}</button>
    </motion.div>
  </div>
);

const DataRow = ({ label, value, badge }) => (
  <div className="flex justify-between items-center p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
    <span className="font-medium text-[#475569]">{label}</span>
    {badge
      ? <span className="font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded-md text-sm border border-sky-100">{value}</span>
      : <span className="font-bold text-[#0F172A]">{value}</span>}
  </div>
);

export const LandingPage = () => {
  const navigate = useNavigate();
  const [showDpdpReport, setShowDpdpReport] = useState(false);
  const [showOfflineReport, setShowOfflineReport] = useState(false);
  const [showPlacementReport, setShowPlacementReport] = useState(false);
  const [showLiveDemoFullScreen, setShowLiveDemoFullScreen] = useState(false);

  return (
    <div id="home" className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans">
      <NavigationBar />
      <HeroCarousel />

      {/* Features Bento Grid */}
      <section id="features" className="py-28 bg-[#F8FAFC] relative">
        <div className="absolute inset-0 bg-dot-pattern opacity-60" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-label">Core Infrastructure</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mt-3 mb-4">
              Billion-Dollar Infrastructure
            </h2>
            <p className="text-[#475569] text-lg leading-relaxed">
              Built to solve the hardest logistical problems in modern rural education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large dark card */}
            <div onClick={() => navigate('/student')}
              className="md:col-span-2 navy-card p-8 relative overflow-hidden group cursor-pointer h-72">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <MessageSquare size={120} className="text-sky-400" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 bg-sky-500/10 border border-sky-500/20 rounded-2xl flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center">
                    Vernacular AI Tutor
                    <ArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-3 group-hover:translate-x-0 text-sky-400" size={18} />
                  </h3>
                  <p className="text-[#94A3B8] text-base leading-relaxed max-w-md">
                    Powered by LangChain + RAG. Students ask in their local dialect; answers come from verified NCERT textbooks.
                  </p>
                </div>
              </div>
            </div>

            {/* White card */}
            <div onClick={() => setShowDpdpReport(true)}
              className="premium-card p-8 relative overflow-hidden group cursor-pointer h-72">
              <div className="absolute -right-4 -bottom-4 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity">
                <ShieldCheck size={140} className="text-[#0F172A]" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 bg-[#0F172A] rounded-2xl flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform shadow-lg">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-sky-600 transition-colors">DPDP Compliant</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">Zero behavioral tracking. Verifiable parental consent via SMS OTP.</p>
                </div>
              </div>
            </div>

            {/* White card */}
            <div onClick={() => setShowOfflineReport(true)}
              className="premium-card p-8 relative overflow-hidden group cursor-pointer h-72">
              <div className="absolute -right-4 -bottom-4 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity">
                <WifiOff size={140} className="text-[#0F172A]" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 bg-[#0F172A] rounded-2xl flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform shadow-lg">
                  <WifiOff size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2 group-hover:text-sky-600 transition-colors">Offline-First Edge</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">Intermittent 2G? Lessons cache locally and sync silently when connectivity returns.</p>
                </div>
              </div>
            </div>

            {/* Large dark card */}
            <div onClick={() => setShowPlacementReport(true)}
              className="md:col-span-2 navy-card p-8 relative overflow-hidden group cursor-pointer h-72">
              <div className="absolute right-0 bottom-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Users size={120} className="text-sky-400" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-bl from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 bg-sky-500/10 border border-sky-500/20 rounded-2xl flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center">
                    AI Teacher Placement Engine
                    <ArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-3 group-hover:translate-x-0 text-sky-400" size={18} />
                  </h3>
                  <p className="text-[#94A3B8] text-base leading-relaxed max-w-md">
                    Matching educators to schools by skill gaps, preventing burnout and ensuring equitable distribution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-20 bg-[#0F172A] relative overflow-hidden">
        <div className="bg-navy-grid absolute inset-0" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: '130M+', label: 'Students Ready' },
              { val: '89%',   label: 'Smartphone Access' },
              { val: '8+',    label: 'Regional Languages' },
              { val: '<5MB',  label: 'Data Per Sync' },
            ].map((s, i) => (
              <div key={i} className="group cursor-default px-4">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-sky-400 transition-colors">{s.val}</div>
                <div className="text-[#475569] font-semibold text-sm uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live AI Command Center — WOW Section */}
      <LiveCommandCenter />

      {/* AI Technology Section */}
      <AITechnologySection id="technology" />

      {/* Live Demo */}
      <LiveAIDemoSection id="demo" />

      {/* Rural Impact */}
      <RuralImpactSection id="impact" />

      {/* Future Vision */}
      <FutureVisionSection id="vision" />

      {/* Footer */}
      <footer className="bg-[#0F172A] pt-20 pb-10 border-t border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-[#1E293B]">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-sky-400/10 border border-sky-400/20 rounded-xl flex items-center justify-center">
                  <GraduationCap size={22} className="text-sky-400" />
                </div>
                <span className="text-white font-black text-xl">Rural<span className="text-sky-400">AI</span></span>
              </div>
              <p className="text-[#475569] text-sm leading-relaxed">
                Transforming Education Through AI.<br />
                Built for 130M+ rural students across India.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Quick Links</h4>
              <ul className="space-y-2">
                {['Features', 'AI Technology', 'Live Demo', 'Rural Impact', 'Future Vision'].map(link => (
                  <li key={link}>
                    <span className="text-[#475569] hover:text-sky-400 transition-colors text-sm font-medium cursor-pointer">{link}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Get Started</h4>
              <p className="text-[#475569] text-sm mb-4">Ready to transform rural education in your district?</p>
              <button onClick={() => setShowLiveDemoFullScreen(true)} className="btn-primary w-full justify-center">
                <PlayCircle size={18} /> Launch Full Demo
              </button>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[#334155] text-sm font-medium">© 2026 RuralAI Ecosystem. All rights reserved.</span>
            <span className="text-[#334155] text-sm font-medium bg-sky-500/10 border border-sky-500/20 px-4 py-2 rounded-full">
              🏆 Built for Hackathon Jury 2026
            </span>
          </div>
        </div>
      </footer>

      {/* Fullscreen Demo */}
      <AnimatePresence>
        {showLiveDemoFullScreen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-[#0F172A]/95 backdrop-blur-xl overflow-y-auto">
            <div className="sticky top-0 z-[310] flex justify-between items-center p-6 bg-[#0F172A]/80 backdrop-blur-lg border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Fullscreen AI Experience</h2>
              <button onClick={() => setShowLiveDemoFullScreen(false)} className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl transition-colors font-semibold text-sm">Close ✕</button>
            </div>
            <div className="bg-white"><LiveAIDemoSection id="fullscreen-demo" /></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DPDP Modal */}
      {showDpdpReport && (
        <ModalBase onClose={() => setShowDpdpReport(false)} icon={<ShieldCheck size={28} />}
          title="DPDP Compliance Report" subtitle="Live status of our verifiable parental consent network." btnLabel="Download Full Audit PDF">
          <div className="space-y-3 mb-6">
            <DataRow label="Minor Accounts Scanned" value="14,230" />
            <DataRow label="Behavioral Tracking" value="Disabled (0%)" badge />
            <DataRow label="SMS OTP Verified" value="94.2%" badge />
          </div>
        </ModalBase>
      )}

      {/* Offline Modal */}
      {showOfflineReport && (
        <ModalBase onClose={() => setShowOfflineReport(false)} icon={<WifiOff size={28} />}
          title="Edge Sync Status" subtitle="Real-time telemetry from remote school nodes." btnLabel="Force Manual Sync">
          <div className="space-y-3 mb-6">
            <DataRow label="Network State" value="Intermittent 2G" />
            <DataRow label="Local Cache Size" value="1.2 GB (Ready)" />
            <DataRow label="Pending Uplink Actions" value="0 (Fully Synced)" badge />
          </div>
          <div className="bg-[#0F172A] text-sky-400 font-mono text-sm p-4 rounded-xl mb-4 space-y-1">
            {['$ ping edge.ruralai.in', '> Offline payload detected.', '> Compressing 14 progress logs...'].map((l, i) => (
              <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.8 }}>{l}</motion.p>
            ))}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-white font-bold">&gt; Batch transmission success [2.1kb] ✓</motion.p>
          </div>
        </ModalBase>
      )}

      {/* Placement Modal */}
      {showPlacementReport && (
        <ModalBase onClose={() => setShowPlacementReport(false)} icon={<Zap size={28} />}
          title="Teacher Placement Algorithm" subtitle="Live AI matching sequence for optimal rural deployment." btnLabel="Close Placement Engine">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
              { label: 'Available Educator', name: 'Dr. Aminata K.', sub: 'Expertise: Physics', bg: 'bg-[#0F172A]', text: 'AK' },
              { label: 'Rural School Need', name: 'Govt. Vidya Mandir', sub: 'Shortage: Grade 10 Science', bg: 'bg-sky-100', text: 'GV', textColor: 'text-sky-800' },
            ].map((p, i) => (
              <div key={i} className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <p className="text-xs text-[#64748B] uppercase font-bold tracking-wider mb-3">{p.label}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${p.bg} rounded-full flex items-center justify-center font-bold ${p.textColor || 'text-white'} text-sm`}>{p.text}</div>
                  <div>
                    <p className="font-bold text-[#0F172A] text-sm">{p.name}</p>
                    <p className="text-xs text-[#64748B]">{p.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#0F172A] text-[#94A3B8] font-mono text-sm p-4 rounded-xl mb-4 space-y-1">
            {['> Initializing matching tensor...', '> Burnout risk factor: Safe (12%)', '> Distance & Language compatibility: 96%'].map((l, i) => (
              <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.9 }}>{l}</motion.p>
            ))}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="text-sky-400 font-bold">&gt; MATCH CONFIRMED. Contract initiated. ✓</motion.p>
          </div>
        </ModalBase>
      )}
    </div>
  );
};
