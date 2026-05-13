import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, FileSpreadsheet, File, BrainCircuit, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const AdminReports = () => {
  const [reportType, setReportType] = useState('student_progress');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedReport(null);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedReport({
        type: reportType,
        date: new Date().toLocaleDateString(),
        aiSummary: "Overall student performance increased by 12% across 5 rural cohorts. Mathematics shows the highest improvement (+14%) due to increased AI Tutor fraction drills. Recommend focusing on Science simulations for Grade 4.",
        records: 1245
      });
    }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Reports Generation</h1>
        <p className="text-gray-500 mt-2 text-lg">Generate, export, and analyze automated AI summaries of school data.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Generator Controls */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Configure Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700">Report Type</label>
              <select 
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800 font-medium"
              >
                <option value="student_progress">Student Progress Reports</option>
                <option value="attendance">Attendance Reports</option>
                <option value="teacher_perf">Teacher Performance Reports</option>
                <option value="ai_usage">AI Usage Analytics</option>
                <option value="school_admin">School Analytics Overview</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700">Date Range</label>
              <select className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800 font-medium">
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>Current Semester</option>
                <option>All Time</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700">Target Cohort</label>
              <select className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800 font-medium">
                <option>All Schools</option>
                <option>Govt. Vidya Mandir (Pune)</option>
                <option>Zilla Parishad High (Nagpur)</option>
                <option>Rural Secondary (Nashik)</option>
              </select>
            </div>

            <Button 
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg mt-4"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Compiling Data...
                </span>
              ) : "Generate Report"}
            </Button>
          </CardContent>
        </Card>

        {/* Output Viewer */}
        <div className="md:col-span-2">
          {isGenerating && (
            <Card className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center border-dashed border-2 bg-gray-50/50">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-6 relative">
                <Clock size={32} className="relative z-10" />
                <div className="absolute inset-0 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing Millions of Data Points...</h3>
              <p className="text-gray-500">The AI is parsing offline sync logs, student performance metrics, and teacher feedbacks.</p>
            </Card>
          )}

          {!isGenerating && !generatedReport && (
            <Card className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center border-dashed border-2 bg-gray-50">
              <FileText size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-1">No Report Selected</h3>
              <p className="text-gray-500">Configure parameters on the left and click Generate.</p>
            </Card>
          )}

          {!isGenerating && generatedReport && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full">
              <Card className="h-full border-indigo-100 shadow-md">
                <CardHeader className="bg-indigo-50/50 border-b border-indigo-50 pb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="mb-2 bg-indigo-100 text-indigo-700 font-bold uppercase tracking-widest text-[10px]">{generatedReport.type.replace('_', ' ')}</Badge>
                      <CardTitle className="text-2xl">Final Report Ready</CardTitle>
                      <CardDescription>Generated on {generatedReport.date} • {generatedReport.records} records processed</CardDescription>
                    </div>
                    <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600">
                      <CheckCircle size={24} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  
                  {/* AI Summary Block */}
                  <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl p-6 text-white mb-8 shadow-inner relative overflow-hidden">
                    <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                      <BrainCircuit size={150} />
                    </div>
                    <h4 className="text-indigo-200 font-bold text-sm uppercase tracking-widest flex items-center gap-2 mb-3 relative z-10">
                      <BrainCircuit size={16} /> AI Executive Summary
                    </h4>
                    <p className="text-lg leading-relaxed relative z-10 font-medium">
                      "{generatedReport.aiSummary}"
                    </p>
                  </div>

                  {/* Export Options */}
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Export Options</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-14 border-gray-200 hover:border-red-300 hover:bg-red-50 hover:text-red-700 transition-colors justify-start px-4">
                      <FileText size={20} className="text-red-500 mr-3 shrink-0" />
                      <div className="text-left">
                        <div className="font-bold text-sm leading-tight">Export PDF</div>
                        <div className="text-[10px] text-gray-500">Presentation Ready</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="h-14 border-gray-200 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 transition-colors justify-start px-4">
                      <FileSpreadsheet size={20} className="text-cyan-500 mr-3 shrink-0" />
                      <div className="text-left">
                        <div className="font-bold text-sm leading-tight">Export Excel</div>
                        <div className="text-[10px] text-gray-500">Raw Data & Charts</div>
                      </div>
                    </Button>

                    <Button variant="outline" className="h-14 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-colors justify-start px-4">
                      <File size={20} className="text-blue-500 mr-3 shrink-0" />
                      <div className="text-left">
                        <div className="font-bold text-sm leading-tight">Export CSV</div>
                        <div className="text-[10px] text-gray-500">Database Import</div>
                      </div>
                    </Button>
                  </div>

                  <Button className="w-full mt-6 h-12 bg-gray-900 hover:bg-gray-800 text-white shadow-lg">
                    <Download size={18} className="mr-2" /> Download Full Report Zip
                  </Button>

                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Badge = ({ children, className }) => (
  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${className}`}>
    {children}
  </span>
);
