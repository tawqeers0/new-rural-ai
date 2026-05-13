import { motion } from 'framer-motion';
import { BookOpen, Search, Filter, PlayCircle, Star, BrainCircuit, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const StudentCourses = () => {
  const navigate = useNavigate();
  
  const courses = [
    { id: 'math-3', title: 'Mathematics Grade 3', category: 'Math', progress: 65, color: 'text-blue-600', bg: 'bg-blue-50', image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=600&q=80' },
    { id: 'science-basics', title: 'Science Basics', category: 'Science', progress: 30, color: 'text-cyan-600', bg: 'bg-cyan-50', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80' },
    { id: 'english-reading', title: 'English Reading', category: 'Languages', progress: 85, color: 'text-purple-600', bg: 'bg-purple-50', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80' },
    { id: 'chemistry', title: 'Chemistry Basics', category: 'Science', progress: 10, color: 'text-amber-600', bg: 'bg-amber-50', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pb-24">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">My Courses</h1>
          <p className="text-gray-500 text-lg">Continue your learning journey</p>
        </div>
        <div className="flex gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search courses..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:ring-cyan-500 focus:border-cyan-500 outline-none w-64" />
          </div>
          <Button variant="outline" className="rounded-full bg-white border-gray-200 text-gray-700">
            <Filter size={16} className="mr-2" /> Filter
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {courses.map((course, i) => (
          <motion.div key={i} whileHover={{ y: -6, scale: 1.02 }} className="bg-white rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 hover:border-cyan-400/50 hover:ring-4 hover:ring-cyan-500/10 overflow-hidden group transition-all duration-300 flex flex-col">
            <div className="h-48 relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-black/40 transition-colors z-10 flex items-center justify-center">
                <PlayCircle size={48} className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 drop-shadow-lg" />
              </div>
              <img src={course.image} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 z-20">
                <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm shadow-sm ${course.color}`}>{course.category}</span>
              </div>
              <div className="absolute bottom-4 right-4 z-20">
                <span className="px-2 py-1 rounded bg-black/70 backdrop-blur-sm text-white text-xs font-bold shadow-sm">12:42 / 20:00</span>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors">{course.title}</h3>
              
              <div className="mb-6 mt-auto">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-gray-500">Progress</span>
                  <span className={course.color}>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`absolute left-0 top-0 h-full rounded-full ${course.bg.replace('50', '500')}`} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => navigate(`/student/lesson/${course.id}`)} className="rounded-xl shadow-md bg-gray-900 hover:bg-gray-800 text-white font-semibold text-xs py-2 h-auto flex items-center justify-center col-span-2 group/btn relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <PlayCircle size={16} className="mr-2 relative z-10"/> 
                  <span className="relative z-10">Watch Lesson</span>
                </Button>
                <Button variant="outline" onClick={() => navigate(`/student/tutor`)} className="rounded-xl border-gray-200 hover:bg-cyan-50 text-gray-700 hover:text-cyan-700 hover:border-cyan-200 font-bold text-xs py-2 h-auto flex items-center justify-center transition-colors">
                  <BrainCircuit size={14} className="mr-1.5 text-blue-600" /> AI Tutor
                </Button>
                <Button variant="outline" className="rounded-xl border-gray-200 hover:bg-purple-50 text-gray-700 hover:text-purple-700 hover:border-purple-200 font-bold text-xs py-2 h-auto flex items-center justify-center transition-colors">
                  <BookOpen size={14} className="mr-1.5 text-purple-600" /> Quiz
                </Button>
                <Button variant="outline" className="rounded-xl border-gray-200 hover:bg-amber-50 text-gray-700 hover:text-amber-700 hover:border-amber-200 font-bold text-xs py-2 h-auto flex items-center justify-center col-span-2 transition-colors">
                  <Download size={14} className="mr-1.5 text-amber-600" /> Download for Offline
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
