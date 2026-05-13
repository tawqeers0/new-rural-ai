import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Map, Activity, BrainCircuit, Globe, Mic } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';

export const AdminAnalytics = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Analytics Dashboard</h1>
        <p className="text-gray-500 mt-2 text-lg">Real-time student performance, rural impact, and AI usage insights.</p>
      </div>

      {/* Top Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard icon={<Users />} title="Total Students" value="12,450" change="+15% M/M" color="blue" />
        <MetricCard icon={<TrendingUp />} title="Avg. Marks" value="78.5%" change="+4.2% M/M" color="cyan" />
        <MetricCard icon={<Activity />} title="Attendance Rate" value="92%" change="Stable" color="indigo" />
        <MetricCard icon={<BrainCircuit />} title="AI Queries" value="1.2M" change="+45% M/M" color="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Student Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart3 size={20} className="text-blue-600" /> Student Performance Analytics</CardTitle>
            <CardDescription>Average performance across core subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <SubjectProgress subject="Mathematics" score={72} color="bg-blue-500" />
              <SubjectProgress subject="Science" score={85} color="bg-cyan-500" />
              <SubjectProgress subject="English" score={68} color="bg-amber-500" />
              <SubjectProgress subject="History" score={88} color="bg-purple-500" />
            </div>
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-4">
              <Activity className="text-amber-500 shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-bold text-gray-900">Trend Alert</h4>
                <p className="text-sm text-gray-600 mt-1">Mathematics scores in Grade 4 are down by 5% this month. AI recommends deploying extra fraction worksheets.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Usage Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BrainCircuit size={20} className="text-purple-600" /> AI Usage Analytics</CardTitle>
            <CardDescription>Breakdown of AI interactions by students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Globe size={20} /></div>
                  <div>
                    <p className="font-bold text-gray-900">Translation Requests</p>
                    <p className="text-xs text-gray-500">Hindi, Kannada, Telugu</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-gray-900">450K</span>
              </div>

              <div className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg"><Mic size={20} /></div>
                  <div>
                    <p className="font-bold text-gray-900">Voice Assistant</p>
                    <p className="text-xs text-gray-500">Hands-free inquiries</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-gray-900">380K</span>
              </div>

              <div className="flex justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><BrainCircuit size={20} /></div>
                  <div>
                    <p className="font-bold text-gray-900">Math Solver</p>
                    <p className="text-xs text-gray-500">Step-by-step breakdown</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-gray-900">210K</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rural Impact Map (Mocked as Heatmap Grid) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Map size={20} className="text-cyan-600" /> Rural Impact & Reach</CardTitle>
          <CardDescription>Villages connected and active learning heatmaps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 grid grid-cols-6 gap-2 w-full max-w-sm mx-auto">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className={`aspect-square rounded-sm ${Math.random() > 0.6 ? 'bg-cyan-500' : Math.random() > 0.3 ? 'bg-cyan-300' : 'bg-gray-100'} transition-opacity hover:opacity-75 cursor-pointer`} title="Active Node"></div>
              ))}
            </div>
            <div className="flex-1 space-y-4 w-full">
              <h3 className="text-lg font-bold text-gray-900">Adoption Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-500 text-sm">Villages Connected</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">142</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-500 text-sm">Offline Edge Nodes</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">89</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl col-span-2">
                  <p className="text-gray-500 text-sm">Most Active Region</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">Maharashtra (65% penetration)</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </motion.div>
  );
};

const MetricCard = ({ icon, title, value, change, color }) => (
  <Card className="p-6">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>{icon}</div>
    </div>
    <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{value}</h3>
    <p className="text-sm font-semibold text-gray-700 mt-2">{title}</p>
    <p className={`text-xs font-bold mt-1 ${change.includes('+') ? 'text-cyan-600' : 'text-gray-500'}`}>{change}</p>
  </Card>
);

const SubjectProgress = ({ subject, score, color }) => (
  <div>
    <div className="flex justify-between text-sm font-bold text-gray-700 mb-1">
      <span>{subject}</span>
      <span>{score}%</span>
    </div>
    <Progress value={score} colorClass={color} className="bg-gray-100" />
  </div>
);
