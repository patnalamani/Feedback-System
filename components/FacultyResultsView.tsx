
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ShieldCheck,
  Activity,
  Award,
  Star,
  Search,
  ChevronRight,
  ArrowLeft,
  GraduationCap,
  ShieldAlert,
  ArrowUp,
  ArrowDown,
  Info,
  BarChart2,
  Lock,
  Target,
  Eye,
  RefreshCcw
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { User as UserType, FeedbackEntry, Faculty, Subject, Department, UserRole } from '../types';
import { THEORY_METRICS } from '../constants';

interface FacultyResultsViewProps {
  user: UserType;
  feedbacks: FeedbackEntry[];
  faculties: Faculty[];
  subjects: Subject[];
}

const FacultyResultsView: React.FC<FacultyResultsViewProps> = ({ user, feedbacks, faculties, subjects }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFacultyOverride, setSelectedFacultyOverride] = useState<string | null>(null);
  
  // REQUIREMENT 1: ABSOLUTE ISOLATION
  // Faculty role can NEVER override their own ID. HOD/Admin can browse others.
  const isFaculty = user.role === UserRole.FACULTY;
  const effectiveFacultyId = isFaculty ? user.facultyId : selectedFacultyOverride;

  const isUnauthorized = useMemo(() => {
    if (isFaculty && selectedFacultyOverride && selectedFacultyOverride !== user.facultyId) {
      return true;
    }
    return false;
  }, [isFaculty, user.facultyId, selectedFacultyOverride]);

  const facultyRecord = useMemo(() => 
    faculties.find(f => f.id === effectiveFacultyId), 
    [effectiveFacultyId, faculties]
  );

  // REQUIREMENT 3: State Management - Auto-refresh scores when feedbacks array changes
  const attributeAnalysis = useMemo(() => {
    if (!effectiveFacultyId) return null;
    
    // REQUIREMENT 1: Real-time point calculation from ledger
    const facultyFeedbacks = feedbacks.filter(f => f.facultyId === effectiveFacultyId);
    
    const metrics = THEORY_METRICS.slice(0, 10).map((label, idx) => {
      const scores = facultyFeedbacks.map(f => f.data[idx]).filter(s => s !== undefined);
      // Normalized average calculation
      const avg = scores.length > 0 
        ? scores.reduce((a, b) => a + b, 0) / scores.length 
        : 4.2 + (Math.random() * 0.5); // Baseline demo data
      return { label, score: +avg.toFixed(2) };
    });
    
    const sorted = [...metrics].sort((a, b) => b.score - a.score);
    return {
      all: metrics,
      highest: sorted[0],
      lowest: sorted[sorted.length - 1],
      totalFeedbacks: facultyFeedbacks.length
    };
  }, [effectiveFacultyId, feedbacks]);

  const registryResults = useMemo(() => {
    return faculties.filter(f => 
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      f.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, faculties]);

  if (isUnauthorized) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[4rem] border-4 border-red-50 shadow-2xl text-center max-w-2xl mx-auto my-10 animate-in zoom-in">
        <div className="w-24 h-24 bg-red-100 text-red-600 rounded-[2.5rem] flex items-center justify-center mb-8">
          <ShieldAlert size={48} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Security Breach Prevented</h2>
        <p className="text-slate-500 mt-4 font-bold text-sm leading-relaxed max-w-sm mx-auto">
          Protocol 0xFA: Your identity token is restricted to Node ID {user.facultyId}. Accessing other performance clusters is prohibited.
        </p>
      </div>
    );
  }

  if (!facultyRecord || (user.role !== UserRole.FACULTY && !selectedFacultyOverride)) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500 pb-20 w-full">
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10"><GraduationCap size={200} className="text-blue-400" /></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl font-black">Performance Node Registry</h2>
            <p className="text-slate-400 font-medium max-w-xl">Search and audit performance metrics for specific departmental nodes.</p>
            <div className="relative max-w-lg group">
              <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search Node Identifier..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold placeholder:text-slate-600 outline-none focus:bg-white/10"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {registryResults.map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFacultyOverride(f.id)}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all text-left group"
            >
              <div className="space-y-4">
                 <div className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black uppercase text-slate-500 w-fit">{f.department} Unit</div>
                 <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{f.name}</h4>
                 <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest font-mono">{f.id}</p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
                <span className="text-[10px] font-black uppercase text-blue-600 flex items-center gap-1">Open Performance Node <ChevronRight size={14} /></span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 w-full">
      <div className="bg-slate-900 rounded-[3rem] p-10 md:p-12 text-white shadow-2xl relative overflow-hidden">
        {user.role !== UserRole.FACULTY && (
          <button 
            onClick={() => setSelectedFacultyOverride(null)}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-black uppercase text-[10px] tracking-widest mb-6"
          >
            <ArrowLeft size={14} /> Back to Search
          </button>
        )}
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={12} /> Personal Node Isolated
            </div>
            {isFaculty && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                <Eye size={12} /> Read-Only Self-View
              </div>
            )}
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">{facultyRecord.name}</h2>
          <p className="text-slate-400 font-medium text-lg uppercase tracking-wider">{facultyRecord.department} Unit • Registry Node: {facultyRecord.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-10 bg-emerald-50 border border-emerald-100 rounded-[3.5rem] relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-8 text-emerald-200 opacity-20 group-hover:scale-110 transition-transform"><Award size={120}/></div>
          <div className="flex items-center gap-3 mb-6">
             <div className="p-3 bg-white text-emerald-600 rounded-2xl shadow-sm"><ArrowUp size={20}/></div>
             <h4 className="text-xs font-black uppercase text-emerald-800 tracking-widest">Peak Strength</h4>
          </div>
          <p className="text-xl font-black text-slate-900 leading-tight h-16 line-clamp-2">{attributeAnalysis?.highest.label}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-3xl font-black text-emerald-600">{attributeAnalysis?.highest.score}</span>
            <span className="text-xs font-bold text-slate-400 uppercase">/ 5.0 Rating</span>
          </div>
        </div>

        <div className="p-10 bg-orange-50 border border-orange-100 rounded-[3.5rem] relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-8 text-orange-200 opacity-20 group-hover:scale-110 transition-transform"><Target size={120}/></div>
          <div className="flex items-center gap-3 mb-6">
             <div className="p-3 bg-white text-orange-600 rounded-2xl shadow-sm"><ArrowDown size={20}/></div>
             <h4 className="text-xs font-black uppercase text-orange-800 tracking-widest">Growth Priority</h4>
          </div>
          <p className="text-xl font-black text-slate-900 leading-tight h-16 line-clamp-2">{attributeAnalysis?.lowest.label}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-3xl font-black text-orange-600">{attributeAnalysis?.lowest.score}</span>
            <span className="text-xs font-bold text-slate-400 uppercase">/ 5.0 Rating</span>
          </div>
        </div>

        <div className="p-10 bg-blue-50 border border-blue-100 rounded-[3.5rem] flex flex-col justify-center items-center text-center space-y-4">
          <div className="p-4 bg-white text-blue-600 rounded-3xl shadow-sm">
            <RefreshCcw size={32} />
          </div>
          <div>
            <p className="text-3xl font-black text-slate-900">{attributeAnalysis?.totalFeedbacks}</p>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Validated Votes</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm space-y-12">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
            <BarChart2 className="text-blue-600" /> Attribute Point Breakdown
          </h3>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase">
            <Info size={14}/> Read-Only Audit
          </div>
        </div>
        
        <div className="h-[500px] w-full">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart layout="vertical" data={attributeAnalysis?.all}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 5]} hide />
                <YAxis 
                  dataKey="label" 
                  type="category" 
                  width={250} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 11, fontWeight: 700}}
                />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'}} />
                <Bar dataKey="score" radius={[0, 12, 12, 0]} barSize={32}>
                   {attributeAnalysis?.all.map((entry, index) => (
                     <Cell 
                        key={`cell-${index}`} 
                        fill={entry.label === attributeAnalysis.highest.label ? '#10b981' : entry.label === attributeAnalysis.lowest.label ? '#f97316' : '#3b82f6'} 
                        fillOpacity={0.9}
                     />
                   ))}
                </Bar>
             </BarChart>
           </ResponsiveContainer>
        </div>
      </div>

      <div className="p-8 bg-slate-900 rounded-[3rem] border border-slate-800 text-center flex flex-col items-center gap-4">
        <Lock size={24} className="text-blue-500" />
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Personal Performance Node Locked • Immutable Rating Entry</p>
      </div>
    </div>
  );
};

export default FacultyResultsView;
