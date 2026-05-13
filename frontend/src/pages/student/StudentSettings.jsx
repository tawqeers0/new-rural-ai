import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Globe, Bell, Shield, Moon, Sun, CheckCircle, Smartphone, Camera, Lock } from 'lucide-react';
import { Button } from '../../components/ui/Button';

// Dummy Translations for demo
const translations = {
  en: { title: 'Settings', desc: 'Manage your account and preferences', save: 'Save Changes' },
  hi: { title: 'सेटिंग्स', desc: 'अपना खाता और प्राथमिकताएं प्रबंधित करें', save: 'परिवर्तन सहेजें' },
  kn: { title: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು', desc: 'ನಿಮ್ಮ ಖಾತೆ ಮತ್ತು ಆದ್ಯತೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ', save: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ' },
  te: { title: 'సెట్టింగ్‌లు', desc: 'మీ ఖాతా మరియు ప్రాధాన్యతలను నిర్వహించండి', save: 'మార్పులను సేవ్ చేయండి' }
};

export const StudentSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, msg: '' });
  
  // States
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('light');
  const [profile, setProfile] = useState({ name: 'Rahul Kumar', grade: 'Grade 5', school: 'Zilla Parishad High School' });
  const [notifs, setNotifs] = useState({ homework: true, liveClass: true, ai: false, download: true });

  const t = translations[lang] || translations.en;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

  const handleSave = () => {
    showToast('Changes saved successfully!');
  };

  const renderSkeleton = () => (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-gray-200 rounded-lg w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded-lg w-2/3 mb-8"></div>
      <div className="grid grid-cols-2 gap-6">
        <div className="h-16 bg-gray-200 rounded-2xl"></div>
        <div className="h-16 bg-gray-200 rounded-2xl"></div>
        <div className="h-16 bg-gray-200 rounded-2xl"></div>
        <div className="h-16 bg-gray-200 rounded-2xl"></div>
      </div>
      <div className="h-12 bg-gray-200 rounded-xl w-40 mt-8"></div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`pb-24 transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-900 text-white min-h-screen -m-8 p-8' : ''}`}>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} 
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
            <CheckCircle className="text-cyan-400" size={20} />
            <span className="font-bold">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-8">
        <h1 className={`text-4xl font-extrabold tracking-tight mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.title}</h1>
        <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{t.desc}</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-2">
          {[
            { id: 'profile', icon: User, label: 'Profile Settings' },
            { id: 'notifications', icon: Bell, label: 'Notifications' },
            { id: 'appearance', icon: Moon, label: 'Appearance' },
            { id: 'language', icon: Globe, label: 'Language & Region' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all
                ${activeTab === tab.id 
                  ? (theme === 'dark' ? 'bg-cyan-900 text-cyan-400' : 'bg-cyan-50 text-cyan-700 shadow-sm border border-cyan-100') 
                  : (theme === 'dark' ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50')
                }`}>
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className={`rounded-3xl shadow-sm p-8 transition-colors ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            
            {loading ? renderSkeleton() : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                
                {/* PROFILE TAB */}
                {activeTab === 'profile' && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Student Profile</h2>
                    <div className="flex items-center gap-6 mb-8">
                      <div className="relative group cursor-pointer">
                        <div className="w-24 h-24 rounded-full bg-cyan-100 border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul&backgroundColor=b6e3f4" alt="avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{profile.name}</h3>
                        <p className="text-cyan-600 font-bold">Student ID: RUR-84920</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                        <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} 
                          className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-cyan-500 outline-none transition-colors ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} />
                      </div>
                      <div>
                        <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Grade Level</label>
                        <select value={profile.grade} onChange={e => setProfile({...profile, grade: e.target.value})} 
                          className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-cyan-500 outline-none transition-colors ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`}>
                          <option>Grade 3</option><option>Grade 4</option><option>Grade 5</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>School Name</label>
                        <input type="text" value={profile.school} onChange={e => setProfile({...profile, school: e.target.value})} 
                          className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-cyan-500 outline-none transition-colors ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} />
                      </div>
                    </div>
                  </div>
                )}

                {/* NOTIFICATIONS TAB */}
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Alert Preferences</h2>
                    <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Choose what you want to be notified about.</p>
                    
                    <div className="space-y-4 mb-8">
                      {[
                        { id: 'homework', title: 'Homework Alerts', desc: 'Get reminded when homework is due soon.' },
                        { id: 'liveClass', title: 'Live Class Reminders', desc: 'Notifications 15 mins before class starts.' },
                        { id: 'ai', title: 'AI Recommendations', desc: 'Personalized study suggestions from RuralAI.' },
                        { id: 'download', title: 'Download Completions', desc: 'Know when offline videos are ready.' },
                      ].map(item => (
                        <div key={item.id} className={`flex items-center justify-between p-4 rounded-2xl border ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                          <div>
                            <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
                          </div>
                          {/* Toggle Switch */}
                          <div onClick={() => setNotifs({...notifs, [item.id]: !notifs[item.id]})} 
                            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${notifs[item.id] ? 'bg-cyan-500' : 'bg-gray-300'}`}>
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifs[item.id] ? 'translate-x-6' : 'translate-x-0'}`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* APPEARANCE TAB */}
                {activeTab === 'appearance' && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Theme & Display</h2>
                    <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Customize how RuralAI looks on your device.</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div onClick={() => setTheme('light')} className={`cursor-pointer p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-colors ${theme === 'light' ? 'border-cyan-500 bg-cyan-50' : (theme === 'dark' ? 'border-gray-700 bg-gray-900 text-gray-400' : 'border-gray-200 bg-white hover:border-cyan-200')}`}>
                        <Sun size={32} className={theme === 'light' ? 'text-cyan-600' : ''} />
                        <span className="font-bold">Light Mode</span>
                      </div>
                      <div onClick={() => setTheme('dark')} className={`cursor-pointer p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-colors ${theme === 'dark' ? 'border-cyan-500 bg-gray-900 text-cyan-400' : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300'}`}>
                        <Moon size={32} />
                        <span className="font-bold">Dark Mode</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* LANGUAGE TAB */}
                {activeTab === 'language' && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Language Selection</h2>
                    <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Choose your preferred language. The platform will fully translate all content.</p>
                    
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      {[
                        { id: 'en', title: 'English', sub: 'Default' },
                        { id: 'hi', title: 'Hindi (हिंदी)', sub: '' },
                        { id: 'kn', title: 'Kannada (ಕನ್ನಡ)', sub: '' },
                        { id: 'te', title: 'Telugu (తెలుగు)', sub: '' },
                      ].map(l => (
                        <label key={l.id} onClick={() => setLang(l.id)} className={`flex items-center gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-colors
                          ${lang === l.id 
                            ? (theme === 'dark' ? 'border-cyan-500 bg-cyan-900/30' : 'border-cyan-500 bg-cyan-50') 
                            : (theme === 'dark' ? 'border-gray-700 bg-gray-900 hover:border-gray-600' : 'border-gray-100 hover:border-gray-200')}`}>
                          <input type="radio" name="lang" checked={lang === l.id} readOnly className="w-5 h-5 text-cyan-600 accent-cyan-600" />
                          <div>
                            <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{l.title}</h4>
                            {l.sub && <p className="text-xs text-cyan-600 font-medium">{l.sub}</p>}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Common Save Button */}
                <div className="pt-4 border-t border-gray-200">
                  <Button onClick={handleSave} className="rounded-xl px-8 bg-cyan-600 hover:bg-cyan-700 text-white h-12 shadow-md">
                    {t.save}
                  </Button>
                </div>

              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
