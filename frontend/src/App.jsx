import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import { StudentLayout } from './layouts/StudentLayout';
import { AdminLayout } from './layouts/AdminLayout';

import { LandingPage } from './pages/LandingPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { StudentCourses } from './pages/student/StudentCourses';
import { StudentAITutor } from './pages/student/StudentAITutor';
import { StudentAchievements } from './pages/student/StudentAchievements';
import { StudentCalendar } from './pages/student/StudentCalendar';
import { StudentOffline } from './pages/student/StudentOffline';
import { StudentSettings } from './pages/student/StudentSettings';
import { StudentLessonPlayer } from './pages/student/StudentLessonPlayer';
import { AdminDashboard } from './pages/AdminDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { AdminAnalytics } from './pages/AdminAnalytics';
import { AdminReports } from './pages/AdminReports';

import './index.css';

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<LandingPage />} />

          {/* Student Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="courses" element={<StudentCourses />} />
            <Route path="tutor" element={<StudentAITutor />} />
            <Route path="achievements" element={<StudentAchievements />} />
            <Route path="calendar" element={<StudentCalendar />} />
            <Route path="offline" element={<StudentOffline />} />
            <Route path="settings" element={<StudentSettings />} />
            <Route path="lesson/:courseId" element={<StudentLessonPlayer />} />
          </Route>

          {/* Admin & Teacher Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="teacher" element={<TeacherDashboard />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="reports" element={<AdminReports />} />
            {/* Catch all admin */}
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
