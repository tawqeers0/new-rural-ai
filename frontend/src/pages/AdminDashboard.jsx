import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Activity, Users, Globe, Building2, ShieldCheck, Database, BrainCircuit, AlertTriangle, ArrowRight, CheckCircle, Search, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { Avatar } from '../components/ui/Avatar';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('system'); // system, schools, users
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-screen filter blur-[80px] opacity-10"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold border border-cyan-500/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> ALL SYSTEMS OPERATIONAL
            </div>
            <span className="text-gray-400 text-sm font-medium">Uptime: 99.99%</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-1">Master Admin Console</h1>
          <p className="text-gray-400 font-medium">Managing 142 schools, 89 edge nodes, and 12,450 students.</p>
        </div>
        
        <div className="relative z-10 w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Global Search (Schools, Users, IDs)..." className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-sm font-medium text-white focus:ring-2 focus:ring-indigo-500 outline-none backdrop-blur-sm" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
        {[
          { id: 'system', label: 'System Health', icon: Server },
          { id: 'schools', label: 'School Network', icon: Building2 },
          { id: 'users', label: 'User Directory', icon: Users }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
          
          {activeTab === 'system' && <SystemHealthView />}
          {activeTab === 'schools' && <SchoolNetworkView />}
          {activeTab === 'users' && <UserDirectoryView />}

        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

// Sub-component: System Health View
const SystemHealthView = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <MetricCard icon={<Activity />} title="Active Users" value="3,492" sub="Current Online" color="cyan" />
      <MetricCard icon={<Database />} title="Storage Used" value="1.2 TB" sub="Of 5 TB Allocated" color="blue" />
      <MetricCard icon={<BrainCircuit />} title="AI Load" value="82%" sub="Processing requests" color="purple" />
      <MetricCard icon={<Server />} title="Edge Nodes" value="89/89" sub="All nodes syncing" color="indigo" />
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Server Geography (Live Sync)</CardTitle>
          <CardDescription>Real-time data transfer from rural edge nodes.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-bold text-gray-900">Maharashtra Hub (MH-1)</span>
                <span className="text-xs text-cyan-600 font-bold">Syncing...</span>
              </div>
              <span className="text-sm font-bold text-gray-600">45 Mbps</span>
            </div>
            <Progress value={100} colorClass="bg-cyan-500" className="bg-gray-100" />
            
            <div className="flex items-center justify-between pt-4">
              <div className="flex flex-col">
                <span className="font-bold text-gray-900">Karnataka Hub (KA-2)</span>
                <span className="text-xs text-gray-500 font-bold">Idle</span>
              </div>
              <span className="text-sm font-bold text-gray-600">0 Mbps</span>
            </div>
            <Progress value={0} colorClass="bg-gray-300" className="bg-gray-100" />

            <div className="flex items-center justify-between pt-4">
              <div className="flex flex-col">
                <span className="font-bold text-gray-900">UP North Hub (UP-1)</span>
                <span className="text-xs text-blue-600 font-bold">Batch Upload</span>
              </div>
              <span className="text-sm font-bold text-gray-600">12 Mbps</span>
            </div>
            <Progress value={45} colorClass="bg-blue-500" className="bg-gray-100" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Performance Monitoring</CardTitle>
          <CardDescription>LLM Translation and Voice processing health.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-gray-100 rounded-xl bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="text-purple-600" size={20} />
                <div>
                  <p className="font-bold text-gray-900 text-sm">AI Translation Engine</p>
                  <p className="text-xs text-gray-500">Latency: 120ms</p>
                </div>
              </div>
              <Badge className="bg-cyan-100 text-cyan-700">Healthy</Badge>
            </div>
            
            <div className="p-4 border border-gray-100 rounded-xl bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BrainCircuit className="text-indigo-600" size={20} />
                <div>
                  <p className="font-bold text-gray-900 text-sm">LLM Math Engine (Local)</p>
                  <p className="text-xs text-gray-500">Latency: 45ms</p>
                </div>
              </div>
              <Badge className="bg-cyan-100 text-cyan-700">Healthy</Badge>
            </div>

            <div className="p-4 border border-amber-200 rounded-xl bg-amber-50 flex items-start gap-3">
              <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-bold text-amber-900 text-sm">Voice Synthesis Throttling</p>
                <p className="text-xs text-amber-700 mt-1">High volume of Text-to-Speech requests detected in KA-2 region. Load balancing initiated automatically.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Sub-component: School Network View
const SchoolNetworkView = () => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-center">
        <div>
          <CardTitle>School Network Directory</CardTitle>
          <CardDescription>Manage connected schools, edge nodes, and hardware health.</CardDescription>
        </div>
        <Button className="rounded-xl">Add School</Button>
      </div>
    </CardHeader>
    <CardContent className="p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider border-y border-gray-100">
            <tr>
              <th className="px-6 py-4">School Name & Location</th>
              <th className="px-6 py-4">Students</th>
              <th className="px-6 py-4">Edge Node Status</th>
              <th className="px-6 py-4">Last Sync</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { name: "Govt. Vidya Mandir", loc: "Pune, MH", students: 450, node: "Online", sync: "2 mins ago", color: "cyan" },
              { name: "Zilla Parishad High", loc: "Nagpur, MH", students: 320, node: "Online", sync: "14 mins ago", color: "cyan" },
              { name: "Rural Secondary", loc: "Nashik, MH", students: 210, node: "Offline", sync: "4 hrs ago", color: "amber" },
              { name: "Saraswati Primary", loc: "Mysore, KA", students: 580, node: "Online", sync: "Just now", color: "cyan" },
              { name: "Govt. High School", loc: "Belagavi, KA", students: 140, node: "Critical", sync: "2 days ago", color: "red" }
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-900">{row.name}</p>
                  <p className="text-xs text-gray-500">{row.loc}</p>
                </td>
                <td className="px-6 py-4 font-medium text-gray-700">{row.students}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-${row.color}-100 text-${row.color}-700`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-${row.color}-500`}></span> {row.node}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{row.sync}</td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-indigo-600"><MoreHorizontal size={18}/></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

// Sub-component: User Directory View
const UserDirectoryView = () => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-center">
        <div>
          <CardTitle>User Role Management</CardTitle>
          <CardDescription>Manage Teachers, Admins, and Principals.</CardDescription>
        </div>
        <Button className="rounded-xl">Invite User</Button>
      </div>
    </CardHeader>
    <CardContent className="p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider border-y border-gray-100">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Assigned To</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { name: "Tanvi K.", email: "tanvi@ruralai.org", role: "Teacher", assign: "Govt. Vidya Mandir", status: "Active" },
              { name: "Rahul Verma", email: "rahul@ruralai.org", role: "Teacher", assign: "Zilla Parishad High", status: "Active" },
              { name: "Dr. Srinivas", email: "srinivas@ruralai.org", role: "Principal", assign: "Saraswati Primary", status: "Active" },
              { name: "Admin Support", email: "support@ruralai.org", role: "Super Admin", assign: "Global", status: "Active" },
              { name: "Priya Singh", email: "priya@ruralai.org", role: "Teacher", assign: "Unassigned", status: "Pending Invite" }
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar fallback={row.name[0]} size="sm" className={row.role === 'Super Admin' ? 'bg-gray-900 text-white' : ''} />
                    <div>
                      <p className="font-bold text-gray-900">{row.name}</p>
                      <p className="text-xs text-gray-500">{row.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge className={row.role === 'Super Admin' ? 'bg-gray-900 text-white' : row.role === 'Principal' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}>{row.role}</Badge>
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">{row.assign}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-bold ${row.status === 'Active' ? 'text-cyan-600' : 'text-amber-500'}`}>{row.status}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" className="text-indigo-600 font-bold hover:bg-indigo-50">Manage</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
);

const MetricCard = ({ icon, title, value, sub, color }) => (
  <Card className="p-6 border-l-4" style={{ borderLeftColor: `var(--tw-colors-${color}-500)` }}>
    <div className={`w-10 h-10 rounded-xl bg-${color}-50 text-${color}-600 flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{value}</h3>
    <p className="text-sm font-bold text-gray-700 mt-1">{title}</p>
    <p className="text-xs font-medium text-gray-500 mt-1">{sub}</p>
  </Card>
);
