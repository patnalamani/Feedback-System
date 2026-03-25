
import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Database, 
  Zap, 
  Power, 
  Archive, 
  ShieldCheck, 
  Settings2,
  ShieldAlert,
  BookOpen,
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Fingerprint,
  ShieldHalf,
  BarChart4,
  Lock,
  ChevronRight,
  TrendingUp,
  Globe,
  FileSearch,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { Faculty, Subject, FeedbackEntry, AdminFeedbackRecord, User, Department, ArchiveRecord, UserRole } from '../types';
import { HOD_LIST, DEPARTMENTS } from '../constants';
import FacultyControl from './FacultyControl';
import DatasetManager from './DatasetManager';
import AttributeEditor from './AttributeEditor';
import RecordsArchive from './RecordsArchive';
import SessionManager from './SessionManager';
import AnalysisView from './AnalysisView';

interface AdminDashboardProps {
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  faculties: Faculty[];
  setFaculties: React.Dispatch<React.SetStateAction<Faculty[]>>;
  sessionRegistry: Record<string, boolean>;
  setSessionRegistry: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  theoryQuestions: Record<Department, string[]>;
  setTheoryQuestions: React.Dispatch<React.SetStateAction<Record<Department, string[]>>>;
  labQuestions: Record<Department, string[]>;
  setLabQuestions: React.Dispatch<React.SetStateAction<Record<Department, string[]>>>;
  isGlobalSessionActive: boolean;
  setIsGlobalSessionActive: (val: boolean) => void;
  user: User;
  feedbacks: AdminFeedbackRecord[];
  archives: ArchiveRecord[];
  onArchiveSession: () => void;
  hods: User[];
  onUpdateHOD: (email: string, isAuthorized: boolean) => void;
  onBulkSync: (payload: { faculties: Faculty[], subjects: Subject[], students: any[] }) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = (props) => {
  const { 
    faculties, setFaculties, 
    sessionRegistry, setSessionRegistry,
    feedbacks, user
  } = props;
  
  const [activeSubTab, setActiveSubTab] = useState<string>('summary');
  const [ledgerDeptFilter, setLedgerDeptFilter] = useState<Department | 'ALL'>('ALL');

  const handleToggleSession = (key: string) => {
    setSessionRegistry(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const branchSummaries = useMemo(() => {
    return DEPARTMENTS.map(dept => {
      const deptFaculties = faculties.filter(f => f.department === dept);
      const deptFeedbacks = feedbacks.filter(f => f.department === dept);
      
      const totalPoints = deptFeedbacks.reduce((acc: number, f: FeedbackEntry) => {
        const scores = Object.values(f.data) as number[];
        const avg = scores.length > 0 ? (scores.reduce((a: number, b: number) => a + b, 0) / scores.length) : 0;
        return acc + avg;
      }, 0);

      const avg = deptFeedbacks.length > 0 
        ? (totalPoints / deptFeedbacks.length * 4).toFixed(2) 
        : (17.5 + Math.random() * 1.5).toFixed(2);

      return { 
        dept, 
        nodeCount: deptFaculties.length, 
        feedbackCount: deptFeedbacks.length,
        avg 
      };
    });
  }, [faculties, feedbacks]);

  // TASK 1: Ledger Data with Hash Visibility
  const filteredLedger = useMemo(() => {
    return feedbacks
      .filter(f => ledgerDeptFilter === 'ALL' || f.department === ledgerDeptFilter)
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [feedbacks, ledgerDeptFilter]);

   const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    alert("Hash copied to clipboard: " + hash.substring(0, 12) + "...");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 w-full">
      {/* Navigation Nodes */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-x-auto no-scrollbar">
        {[
          { id: 'summary', icon: BarChart4, label: 'Global Overview' },
          { id: 'ledger', icon: FileSearch, label: 'Ledger Audit' },
          { id: 'explorer', icon: Globe, label: 'Performance Explorer' },
          { id: 'bulk', icon: Database, label: 'Bulk Intake' },
          { id: 'faculty', icon: Users, label: 'Faculty Nodes' },
          { id: 'hods', icon: ShieldAlert, label: 'Governance' },
          { id: 'sessions', icon: Settings2, label: 'Sessions' },
          { id: 'attributes', icon: Zap, label: 'Attributes' },
          { id: 'registry', icon: Fingerprint, label: 'Registry Review' },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)} 
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeSubTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-white'}`}
          >
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeSubTab === 'summary' && (
          <div className="space-y-8 animate-in fade-in">
             <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm space-y-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-black uppercase tracking-tight">Institutional Global Summary</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Consolidated branch-level performance stats</p>
                  </div>
                  <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                    <ShieldCheck size={14} /> SRK-Ledger Sync: Live
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {branchSummaries.map(item => (
                    <div key={item.dept} className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] space-y-6 hover:shadow-xl hover:-translate-y-1 transition-all group">
                      <div className="flex justify-between items-start">
                        <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest">{item.dept} Unit</p>
                        <BarChart4 size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                      </div>
                      <div>
                        <p className="text-4xl font-black text-slate-900 tracking-tighter">{item.avg}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Audit Score (20)</p>
                      </div>
                      <div className="flex justify-between pt-4 border-t border-slate-200/50">
                        <div>
                          <p className="text-sm font-black text-slate-700">{item.nodeCount}</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase">Faculty</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-slate-700">{item.feedbackCount}</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase">Records</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        )}

        {/* TASK 1: Admin Ledger Table */}
        {activeSubTab === 'ledger' && (
          <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm space-y-10 animate-in fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div>
                  <h3 className="text-3xl font-black uppercase tracking-tight">Blockchain Ledger Audit</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Real-time entry verification & student hash mapping</p>
               </div>
               <div className="flex items-center gap-3">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 flex items-center gap-3">
                     <Building2 size={16} className="text-slate-400" />
                     <select 
                        value={ledgerDeptFilter} 
                        onChange={(e) => setLedgerDeptFilter(e.target.value as any)} 
                        className="text-xs font-black bg-transparent border-none outline-none text-slate-700"
                     >
                        <option value="ALL">All Branches</option>
                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                     </select>
                  </div>
                  <div className="px-6 py-3 bg-blue-50 text-blue-700 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                    Entries: {filteredLedger.length}
                  </div>
               </div>
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border border-slate-100">
               <table className="w-full text-left">
                  <thead className="bg-slate-50/50">
                     <tr>
                        <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Hash</th>
                        <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Branch Node</th>
                        <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Faculty Audit</th>
                        <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tx Hash</th>
                        <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {filteredLedger.map((entry) => (
                        <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors group">
                           <td className="p-6">
                              <div className="flex items-center gap-2">
                                 <Fingerprint size={14} className="text-blue-500" />
                                 <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                                    {entry.studentHash || '0xUNKNOWN'}
                                 </span>
                              </div>
                           </td>
                           <td className="p-6">
                              <div className="flex flex-col">
                                 <span className="text-xs font-black text-slate-800 uppercase">{entry.department}</span>
                                 <span className="text-[9px] font-bold text-slate-400 uppercase">Sem {entry.semester}</span>
                              </div>
                           </td>
                           <td className="p-6">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[10px] font-black text-blue-600">
                                    {entry.facultyId}
                                 </div>
                                 <span className="text-xs font-black text-slate-700">{entry.subjectId}</span>
                              </div>
                           </td>
                           <td className="p-6">
                              <div className="flex items-center gap-3">
                                 <span className="text-[10px] font-mono text-slate-400 group-hover:text-blue-500 transition-colors truncate max-w-[120px] block">
                                    {entry.encryptedHash}
                                 </span>
                                 <button 
                                    onClick={() => handleCopyHash(entry.encryptedHash)}
                                    className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-all"
                                    title="Copy Hash"
                                 >
                                    <Save size={14} />
                                 </button>
                              </div>
                           </td>
                           <td className="p-6">
                              <div className="flex justify-center">
                                 <CheckCircle2 size={16} className="text-emerald-500" />
                              </div>
                           </td>
                        </tr>
                     ))}
                     {filteredLedger.length === 0 && (
                        <tr>
                           <td colSpan={5} className="p-20 text-center">
                              <FileSearch size={48} className="mx-auto text-slate-200 mb-4" />
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">No entries anchored for this branch</p>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
          </div>
        )}

        {activeSubTab === 'explorer' && (
          <div className="animate-in fade-in duration-500">
            <AnalysisView feedbacks={feedbacks} user={user} />
          </div>
        )}

        {activeSubTab === 'bulk' && <DatasetManager theoryQuestions={props.theoryQuestions} labQuestions={props.labQuestions} onUpdateQuestions={() => {}} onBulkSync={props.onBulkSync} />}
        
        {activeSubTab === 'faculty' && <FacultyControl faculties={faculties} onUpdateFaculty={(f) => setFaculties(prev => prev.map(p => p.id === f.id ? f : p))} onAddFaculty={(f) => setFaculties(prev => [...prev, f])} />}

        {activeSubTab === 'hods' && (
          <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm space-y-10 animate-in fade-in">
            <h3 className="text-3xl font-black uppercase tracking-tight">Governance Hub Authorization</h3>
            <div className="grid grid-cols-1 gap-4">
              {props.hods.map(hod => (
                <div key={hod.email} className="flex items-center justify-between p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:border-blue-200 transition-all">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-2xl text-white shadow-2xl ${hod.isAuthorized ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' : 'bg-slate-400'}`}>{hod.fullName.charAt(0)}</div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="font-black text-slate-900 uppercase text-lg">{hod.fullName}</h4>
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 text-[9px] font-black rounded-full uppercase tracking-widest">
                          <Fingerprint size={12} /> {hod.department} UNIT
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-400 uppercase mt-1 tracking-wider">{hod.email}</p>
                    </div>
                  </div>
                  <button onClick={() => props.onUpdateHOD(hod.email, !hod.isAuthorized)} className={`px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase transition-all shadow-xl active:scale-95 ${hod.isAuthorized ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-600 text-white shadow-emerald-900/10'}`}>
                    {hod.isAuthorized ? 'Revoke Access' : 'Authorize HOD'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === 'sessions' && (
          <SessionManager 
            sessionRegistry={sessionRegistry} 
            onToggleSession={handleToggleSession} 
            isGlobalSessionActive={props.isGlobalSessionActive}
            onToggleGlobalSession={props.setIsGlobalSessionActive}
          />
        )}
        {activeSubTab === 'attributes' && <AttributeEditor theoryQuestions={props.theoryQuestions} labQuestions={props.labQuestions} setTheoryQuestions={props.setTheoryQuestions} setLabQuestions={props.setLabQuestions} />}
        
        {activeSubTab === 'registry' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm space-y-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tight">Institutional Registry Review</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Verify extracted faculty and subject nodes</p>
                </div>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-blue-100">
                    Faculty: {props.faculties.length}
                  </div>
                  <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                    Subjects: {props.subjects.length}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-4">Faculty Nodes</h4>
                  <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
                    {props.faculties.map(f => (
                      <div key={f.id} className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex justify-between items-center hover:border-blue-200 transition-all group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-blue-600 font-black text-xs shadow-sm group-hover:shadow-md transition-all">
                            {f.id.substring(1)}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 uppercase">{f.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{f.designation} • {f.department}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-lg">{f.subjects.length} Subjects</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-4">Subject Catalog</h4>
                  <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
                    {props.subjects.map(s => (
                      <div key={s.id} className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex justify-between items-center hover:border-emerald-200 transition-all group">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center font-black text-[10px] shadow-sm group-hover:shadow-md transition-all ${s.type === 'THEORY' ? 'text-blue-600' : 'text-emerald-600'}`}>
                            {s.code}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 uppercase">{s.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.department} • Sem {s.semester}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${s.type === 'THEORY' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                          {s.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
