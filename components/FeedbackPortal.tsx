
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Lock,
  Loader2,
  Fingerprint,
  SearchX,
  ShieldCheck,
  AlertCircle,
  AlertTriangle
} from 'lucide-react';
import { FeedbackType, FeedbackEntry, AdminFeedbackRecord, User, Subject, Department, Faculty } from '../types';
import { sendGaslessFeedback } from '../services/web3Service';
import { HOD_LIST } from '../constants';

interface FeedbackPortalProps {
  onSubmit: (entry: AdminFeedbackRecord) => void;
  onLogout: () => void;
  user: User;
  subjects: Subject[];
  faculties: Faculty[];
  sessionRegistry: Record<string, boolean>;
  theoryQuestions: Record<Department, string[]>;
  labQuestions: Record<Department, string[]>;
  isGlobalSessionActive: boolean;
}

const FeedbackPortal: React.FC<FeedbackPortalProps> = ({ 
  onSubmit, 
  onLogout, 
  user, 
  subjects, 
  faculties,
  sessionRegistry, 
  theoryQuestions,
  labQuestions,
  isGlobalSessionActive
}) => {
  const [type, setType] = useState<FeedbackType>(FeedbackType.THEORY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [suggestions, setSuggestions] = useState('');
  const [matrixScores, setMatrixScores] = useState<Record<string, Record<number, number>>>({});
  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const activeSubjects = useMemo(() => {
    const filtered = subjects.filter(s => 
      (s.department === user.department || s.department === 'FED') && 
      s.semester === user.semester &&
      s.type === type
    );

    if (filtered.length === 0) {
      return [{
        id: 'GEN-INST',
        name: 'General Institutional Feedback',
        code: 'GEN',
        department: user.department!,
        semester: user.semester!,
        type: type
      }];
    }
    return filtered;
  }, [subjects, user.department, user.semester, type]);

  const mappedFacultyForSubject = (subjectId: string) => {
    const faculty = faculties.find(f => f.subjects.includes(subjectId));
    if (!faculty && subjectId === 'GEN-INST') return HOD_LIST[user.department!] || 'Department Head';
    return faculty?.name || 'Assigned Faculty';
  };

  const mappedFacultyIdForSubject = (subjectId: string) => {
    const faculty = faculties.find(f => f.subjects.includes(subjectId));
    if (!faculty && subjectId === 'GEN-INST') return 'HOD-FALLBACK';
    return faculty?.id || 'F000';
  };

  useEffect(() => {
    const sessionKey = `${user.department}-${user.semester}`;
    const isOpen = (sessionRegistry[sessionKey] || false) && isGlobalSessionActive;
    setIsSessionOpen(isOpen);
  }, [user.department, user.semester, sessionRegistry, isGlobalSessionActive]);

  const metrics = useMemo(() => {
    const dept = user.department || 'CSE';
    const list = type === FeedbackType.THEORY ? (theoryQuestions[dept] || []) : (labQuestions[dept] || []);
    return list.slice(0, 10);
  }, [type, user.department, theoryQuestions, labQuestions]);

  // TASK 2: Hard Block Logic
  const isFormComplete = useMemo(() => {
    if (activeSubjects.length === 0) return false;
    return activeSubjects.every(s => 
      metrics.every((_, idx) => matrixScores[s.id]?.[idx] !== undefined && matrixScores[s.id]?.[idx] !== null)
    );
  }, [activeSubjects, metrics, matrixScores]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasTriedSubmit(true);

    if (!isFormComplete) {
      return; // Handled by disabled button, but kept for robustness
    }

    setIsSubmitting(true);
    const studentHash = btoa(user.email).substring(0, 12);
    
    try {
      const bundle = {
        studentNode: studentHash,
        type,
        department: user.department,
        semester: user.semester,
        responses: activeSubjects.map(s => ({
          facultyId: mappedFacultyIdForSubject(s.id),
          subjectId: s.id,
          scores: matrixScores[s.id]
        })),
        suggestions,
        timestamp: Date.now()
      };

      const web3Result = await sendGaslessFeedback(bundle);

      activeSubjects.forEach(s => {
        onSubmit({
          id: Math.random().toString(36).substr(2, 9),
          studentHash,
          type,
          facultyId: mappedFacultyIdForSubject(s.id),
          subjectId: s.id,
          department: user.department as Department,
          semester: user.semester as any,
          data: matrixScores[s.id] || {},
          timestamp: Date.now(),
          encryptedHash: web3Result.txHash
        });
      });

      setIsSubmitted(true);
      setTimeout(() => onLogout(), 4000);
    } catch (err) {
      console.error("[FeedbackPortal] Submission Error:", err);
      alert("Ledger Connection Error: Failed to anchor feedback scores. Check network.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-20 rounded-[4rem] border border-slate-200 shadow-2xl text-center max-w-xl mx-auto animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 mx-auto animate-bounce">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Feedback Submitted</h2>
        <p className="text-slate-500 font-bold uppercase text-[9px] tracking-[0.2em] mt-4">Feedback submitted successfully. Your response has been recorded.</p>
        <p className="text-slate-400 font-bold uppercase text-[8px] tracking-[0.2em] mt-2">Identity Purged • Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden">
        <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl text-white shadow-xl">
               <Fingerprint size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight">Academic Audit Node</h1>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                Branch: {user.department} • Sem: {user.semester} • Identity: Purged
              </p>
            </div>
          </div>
          <div className="flex bg-slate-200 p-1.5 rounded-2xl shadow-inner">
            <button type="button" onClick={() => setType(FeedbackType.THEORY)} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${type === FeedbackType.THEORY ? 'bg-white shadow-md text-blue-600' : 'text-slate-500'}`}>Theory Audit</button>
            <button type="button" onClick={() => setType(FeedbackType.LAB)} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${type === FeedbackType.LAB ? 'bg-white shadow-md text-emerald-600' : 'text-slate-500'}`}>Lab Audit</button>
          </div>
        </div>

        {(!isSessionOpen || activeSubjects.length === 0) ? (
          <div className="p-32 text-center space-y-6">
             <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <SearchX size={48} />
             </div>
             <div>
               <h3 className="text-2xl font-black uppercase text-slate-900 tracking-tight">Access Protocol Rejected</h3>
               <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 max-w-sm mx-auto">
                 {isGlobalSessionActive 
                  ? `The feedback session for ${user.department} - ${user.semester} has been stopped by Admin.` 
                  : "The global feedback protocol is currently locked for maintenance."}
               </p>
             </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="divide-y divide-slate-100">
            {hasTriedSubmit && !isFormComplete && (
               <div className="bg-red-50 p-6 border-b border-red-100 flex items-center gap-3 text-red-700 animate-in slide-in-from-top-4">
                  <AlertCircle size={20} />
                  <p className="text-[11px] font-black uppercase tracking-widest">Protocol Warning: Some required assessment attributes are missing scores.</p>
               </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="p-8 text-[11px] font-black text-slate-400 uppercase tracking-widest min-w-[400px]">Assessment Attribute</th>
                    {activeSubjects.map(s => (
                      <th key={s.id} className="p-8 text-center border-l border-slate-100 min-w-[150px]">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{s.id}</span>
                          <span className="text-[9px] font-bold text-blue-600 uppercase truncate max-w-[120px]">{mappedFacultyForSubject(s.id)}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((metric, mIdx) => (
                    <tr key={mIdx} className="hover:bg-slate-50/30 transition-colors">
                      <td className="p-8 text-sm font-bold text-slate-700 leading-relaxed">{metric}</td>
                      {activeSubjects.map(s => {
                        const score = matrixScores[s.id]?.[mIdx];
                        const isMissing = hasTriedSubmit && score === undefined;
                        return (
                          <td key={s.id} className="p-8 text-center border-l border-slate-100">
                            <select 
                              required
                              value={score || ''} 
                              onChange={(e) => {
                                setMatrixScores({
                                  ...matrixScores, 
                                  [s.id]: {
                                    ...(matrixScores[s.id]||{}), 
                                    [mIdx]: parseInt(e.target.value)
                                  }
                                });
                              }}
                              className={`w-12 h-12 rounded-xl border-2 text-center font-black transition-all appearance-none cursor-pointer outline-none focus:ring-4 ${
                                score 
                                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg ring-blue-500/20' 
                                  : isMissing
                                    ? 'bg-red-50 border-red-500 text-red-400 ring-red-500/20 animate-pulse'
                                    : 'bg-slate-50 border-slate-200 text-slate-400 ring-transparent'
                              }`}
                            >
                              <option value="">-</option>
                              {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-10 bg-white space-y-8">
              {!isFormComplete && (
                <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-700">
                  <AlertTriangle size={18} />
                  <p className="text-[10px] font-black uppercase tracking-widest">Form status: Incomplete • Submission node locked</p>
                </div>
              )}
              <div className="flex items-start gap-4 p-6 bg-blue-50 border border-blue-100 rounded-3xl">
                <ShieldCheck className="text-blue-600 shrink-0" size={24} />
                <p className="text-[11px] font-bold text-blue-700 leading-relaxed">
                  ZK-PROOF INTEGRITY: Your selections are hashed locally before transmission. Neither the Faculty nor the Admin can trace these specific scores back to your identifier. Tx Anchoring via Web3 Protocol enabled.
                </p>
              </div>
              <textarea 
                value={suggestions} 
                onChange={(e) => setSuggestions(e.target.value)} 
                placeholder="Improvement suggestions for assigned faculty (Optional)..." 
                className="w-full p-8 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] min-h-[120px] font-bold text-sm outline-none focus:border-blue-600 transition-all shadow-inner"
              />
              <button 
                type="submit" 
                disabled={isSubmitting || !isFormComplete} 
                onClick={() => setHasTriedSubmit(true)}
                className={`w-full py-8 rounded-[2.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 transition-all shadow-2xl active:scale-95 ${
                  isSubmitting || !isFormComplete 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {isSubmitting ? (
                  <><Loader2 className="animate-spin" /> Anchoring Scores...</>
                ) : !isFormComplete ? (
                  <><Lock size={20} /> Protocol Incomplete</>
                ) : (
                  <><Send size={20} /> Finalize & Submit Bundle</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackPortal;
