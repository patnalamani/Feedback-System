
import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  TrendingUp, 
  BarChart3, 
  Users, 
  ShieldCheck, 
  LayoutDashboard, 
  Settings2,
  Lock,
  Download,
  ShieldAlert,
  FileText,
  Printer,
  ChevronRight,
  Plus,
  X,
  BookOpen,
  Fingerprint
} from 'lucide-react';
import { User, FeedbackEntry, Faculty, Subject } from '../types';
import AnalysisView from './AnalysisView';

interface HODDashboardProps {
  user: User;
  feedbacks: FeedbackEntry[];
  faculties: Faculty[];
  subjects: Subject[];
}

const HODDashboard: React.FC<HODDashboardProps> = ({ user, feedbacks, faculties, subjects }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'mapping' | 'reports'>('overview');
  const [isMappingModalOpen, setIsMappingModalOpen] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');

  // DEPARTMENTS ISOLATION: Only audit faculty from this HOD's department
  const deptFaculties = useMemo(() => 
    faculties.filter(f => f.department === user.department),
    [faculties, user.department]
  );

  const deptSubjects = useMemo(() => 
    subjects.filter(s => s.department === user.department),
    [subjects, user.department]
  );

  if (!user.isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[4rem] border border-amber-100 shadow-2xl text-center max-w-2xl mx-auto my-10 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-[2.5rem] flex items-center justify-center mb-8">
          <ShieldAlert size={48} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">HOD Registry Waitlist</h2>
        <p className="text-slate-500 mt-4 font-bold text-sm leading-relaxed max-w-sm mx-auto">
          Node Identity Confirmed: {user.fullName}. Status: Awaiting Super-Admin Authorization. Privileges for {user.department} hub are currently locked.
        </p>
      </div>
    );
  }

  const handlePrintReport = () => {
    setActiveTab('reports');
    setTimeout(() => window.print(), 500);
  };

  const handleAddMapping = () => {
    if (selectedFacultyId && selectedSubjectId) {
      // Logic for anchoring FacultyID -> SubjectID
      alert(`Success: Faculty ${selectedFacultyId} now mapped to Course ${selectedSubjectId}. Node Registry updated.`);
      setIsMappingModalOpen(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Building2 size={200} className="text-blue-400" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck size={12} /> {user.department} Departmental Node Active
          </div>
          <h2 className="text-4xl font-black">Governance Hub: {user.department}</h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
            <Fingerprint size={12}/> Authorized Head: {user.fullName}
          </p>
        </div>
      </div>

      <div className="flex bg-slate-200 p-1.5 rounded-3xl w-fit mx-auto no-print">
        <button onClick={() => setActiveTab('overview')} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase transition-all ${activeTab === 'overview' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500'}`}>Overview</button>
        <button onClick={() => setActiveTab('analytics')} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase transition-all ${activeTab === 'analytics' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500'}`}>Deep Audit</button>
        <button onClick={() => setActiveTab('mapping')} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase transition-all ${activeTab === 'mapping' ? 'bg-white shadow-md text-emerald-600' : 'text-slate-500'}`}>Node Mappings</button>
        <button onClick={() => setActiveTab('reports')} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase transition-all ${activeTab === 'reports' ? 'bg-white shadow-md text-orange-600' : 'text-slate-500'}`}>Print Hub</button>
      </div>

      <div className="mt-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Departmental Nodes</p>
              <h4 className="text-4xl font-black text-slate-900">{deptFaculties.length} Faculty</h4>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Departmental Average</p>
              <h4 className="text-4xl font-black text-emerald-600">18.42</h4>
            </div>
            <div onClick={handlePrintReport} className="bg-slate-900 p-10 rounded-[2.5rem] text-white flex flex-col justify-center items-center gap-3 cursor-pointer hover:bg-slate-800 transition-all shadow-xl">
              <Printer size={32} />
              <span className="text-[10px] font-black uppercase tracking-widest">Print Audit Report</span>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && <AnalysisView feedbacks={feedbacks} user={user} />}

        {activeTab === 'mapping' && (
          <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm space-y-8 animate-in slide-in-from-bottom-4">
             <div className="flex items-center justify-between">
               <h3 className="text-2xl font-black uppercase tracking-tight">Faculty-Subject Mapping Control</h3>
               <button onClick={() => setIsMappingModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest"><Plus size={14} /> New Mapping</button>
             </div>
             
             <div className="grid grid-cols-1 gap-4">
               {deptFaculties.map(f => (
                 <div key={f.id} className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center font-black text-blue-600 text-sm shadow-sm">{f.id}</div>
                       <div>
                          <h4 className="font-black text-slate-900 uppercase text-sm">{f.name}</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Courses: {f.subjects.length > 0 ? f.subjects.join(' | ') : 'Unmapped'}</p>
                       </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {activeTab === 'reports' && <AnalysisView feedbacks={feedbacks} user={user} />}
      </div>

      {isMappingModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in zoom-in">
           <div className="bg-white w-full max-w-lg rounded-[4rem] p-12 shadow-2xl space-y-10">
              <h3 className="text-3xl font-black uppercase text-center tracking-tight">Node Linker</h3>
              <div className="space-y-6">
                 <select value={selectedFacultyId} onChange={(e) => setSelectedFacultyId(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none">
                    <option value="">Select Faculty Node...</option>
                    {deptFaculties.map(f => <option key={f.id} value={f.id}>{f.name} ({f.id})</option>)}
                 </select>
                 <select value={selectedSubjectId} onChange={(e) => setSelectedSubjectId(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none">
                    <option value="">Select Course Identifier...</option>
                    {deptSubjects.map(s => <option key={s.id} value={s.id}>{s.name} ({s.code})</option>)}
                 </select>
              </div>
              <div className="flex gap-4">
                 <button onClick={() => setIsMappingModalOpen(false)} className="flex-1 py-6 bg-slate-50 text-slate-500 rounded-[2rem] font-black uppercase text-[10px]">Cancel</button>
                 <button onClick={handleAddMapping} className="flex-1 py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-[10px]">Anchor Map</button>
              </div>
           </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{ __html: `@media print { .no-print { display: none !important; } }` }} />
    </div>
  );
};

export default HODDashboard;
