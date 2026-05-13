import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Database, LogOut, Activity } from 'lucide-react';

export const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Admin Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
    { name: 'Teacher Portal', path: '/admin/teacher', icon: <Users size={18} /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <Activity size={18} /> },
    { name: 'Reports', path: '/admin/reports', icon: <Database size={18} /> },
  ];

  return (
    <div className="min-h-screen flex bg-[#F9FAFB]">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-gray-900 text-white p-1.5 rounded-md font-bold text-sm">RA</div>
            <span className="font-semibold text-gray-900 tracking-tight">Admin Console</span>
          </div>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            <LogOut size={18} />
            Exit Admin
          </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 md:hidden">
            <span className="font-semibold text-gray-900">Admin Console</span>
        </header>
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
