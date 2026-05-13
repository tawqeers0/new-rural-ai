import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, GraduationCap, HeartHandshake, Quote } from 'lucide-react';

const useCounter = (end, duration = 2000, shouldStart = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let startTime = null;
    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, shouldStart]);
  return count;
};

export const RuralImpactSection = ({ id }) => {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const villages = useCounter(1450, 2200, started);
  const students = useCounter(85000, 2500, started);
  const teachers = useCounter(3200, 2000, started);
  const dropout = useCounter(42, 1800, started);

  const stats = [
    { label: 'Villages Digitized', value: villages.toLocaleString() + '+', icon: <MapPin size={22} className="text-amber-400" />, color: 'text-amber-400' },
    { label: 'Active Students', value: students.toLocaleString() + '+', icon: <Users size={22} className="text-sky-400" />, color: 'text-sky-400' },
    { label: 'Teachers Supported', value: teachers.toLocaleString() + '+', icon: <HeartHandshake size={22} className="text-blue-400" />, color: 'text-blue-400' },
    { label: 'Drop-out Reduction', value: dropout + '%', icon: <GraduationCap size={22} className="text-sky-400" />, color: 'text-sky-400' },
  ];

  const testimonials = [
    { quote: '"Before RuralAI, our school had no science teacher. Now, my students learn physics from the AI tutor in Hindi."', author: 'Principal Sharma', school: 'Govt. School, Ramgarh Village' },
    { quote: '"The offline sync feature is a miracle. Even during power cuts, learning never stops for our children."', author: 'Meena Devi', school: 'Parent, Rajasthan' },
  ];

  return (
    <section id={id} ref={ref} className="py-28 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-50" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">Real-World Impact</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mt-3 mb-4">
            Measurable Impact Across{' '}
            <span className="gradient-text">India</span>
          </h2>
          <p className="text-[#475569] text-lg leading-relaxed">
            Not just software — we're rebuilding the foundation of rural education.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Stats */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  className="premium-card p-6 group">
                  <div className="w-10 h-10 bg-[#F1F5F9] rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className={`text-3xl font-black ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="space-y-4">
              {testimonials.map((t, i) => (
                <div key={i} className="premium-card p-6 relative">
                  <Quote size={20} className="text-sky-200 mb-3" />
                  <p className="text-[#334155] text-sm leading-relaxed italic mb-3">{t.quote}</p>
                  <div>
                    <p className="font-bold text-[#0F172A] text-sm">{t.author}</p>
                    <p className="text-xs text-[#64748B]">{t.school}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Map */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} className="relative">
            <div className="navy-card p-6">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-sky-400" /> Live Adoption Map
              </h3>
              <div className="h-64 bg-[#070F1E] rounded-2xl overflow-hidden relative border border-[#1E293B]">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="India Map"
                  className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070F1E] via-transparent to-transparent" />
                {/* Animated pins */}
                {[
                  { top: '25%', left: '35%', delay: '0s' },
                  { top: '45%', left: '55%', delay: '0.5s' },
                  { top: '65%', left: '30%', delay: '1s' },
                  { top: '30%', left: '70%', delay: '1.5s' },
                ].map((pin, i) => (
                  <div key={i} className="absolute" style={{ top: pin.top, left: pin.left }}>
                    <div className="w-3 h-3 bg-sky-400 rounded-full animate-ping shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                      style={{ animationDelay: pin.delay }} />
                  </div>
                ))}
              </div>

              {/* Live ticker */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: 'Active States', value: '18', color: 'text-sky-400' },
                  { label: 'Schools Online', value: '4,200+', color: 'text-white' },
                ].map((item, i) => (
                  <div key={i} className="bg-[#0a192f] border border-[#1E293B] rounded-xl p-3 text-center">
                    <div className={`text-xl font-black ${item.color}`}>{item.value}</div>
                    <div className="text-xs text-[#475569] font-semibold">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
