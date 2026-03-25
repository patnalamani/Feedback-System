
import React from 'react';
import { Power, CheckCircle2, XCircle, Filter, CalendarDays, Building2, AlertTriangle } from 'lucide-react';
import { Department, Semester } from '../types';
import { DEPARTMENTS, SEMESTERS } from '../constants';

interface SessionManagerProps {
  sessionRegistry: Record<string, boolean>;
  onToggleSession: (key: string) => void;
  isGlobalSessionActive: boolean;
  onToggleGlobalSession: (val: boolean) => void;
}

const SessionManager: React.FC<SessionManagerProps> = ({ 
  sessionRegistry, 
  onToggleSession,
  isGlobalSessionActive,
  onToggleGlobalSession
}) => {
  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="bg-slate-900 p-12 rounded-[4rem] border border-slate-800 shadow-2xl flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className={`p-4 rounded-3xl ${isGlobalSessionActive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
            <Power size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Global Feedback Protocol</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
              Status: {isGlobalSessionActive ? 'Active & Accepting Submissions' : 'Locked & Maintenance Mode'}
            </p>
          </div>
        </div>
        <button 
          onClick={() => onToggleGlobalSession(!isGlobalSessionActive)}
          className={`px-12 py-5 rounded-[2rem] font-black uppercase text-[11px] tracking-[0.2em] transition-all shadow-2xl active:scale-95 ${
            isGlobalSessionActive 
              ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-900/20' 
              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-900/20'
          }`}
        >
          {isGlobalSessionActive ? 'Kill Protocol' : 'Initiate Session'}
        </button>
      </div>

      <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black uppercase tracking-tight">Granular Session Control</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Manage Start/Stop Status for Branch-Semester Nodes</p>
        </div>
        <div className="flex items-center gap-2 text-amber-600 font-bold text-[10px] uppercase tracking-widest bg-amber-50 px-4 py-2 rounded-xl">
          <AlertTriangle size={14} /> Only active nodes permit feedback submission
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEPARTMENTS.map(dept => (
          <div key={dept} className="space-y-4 p-6 bg-slate-50 border border-slate-100 rounded-[2.5rem]">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3 mb-2">
              <Building2 size={18} className="text-blue-600" />
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-sm">{dept} Department</h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {SEMESTERS.map(sem => {
                const sessionKey = `${dept}-${sem}`;
                const isActive = sessionRegistry[sessionKey] || false;
                return (
                  <button
                    key={sem}
                    onClick={() => onToggleSession(sessionKey)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all border ${
                      isActive 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-400 opacity-60'
                    } group`}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-[10px] font-black uppercase opacity-60">Sem</span>
                      <span className="text-sm font-black">{sem}</span>
                    </div>
                    {isActive ? (
                      <CheckCircle2 size={18} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                    ) : (
                      <Power size={18} className="text-slate-300 group-hover:text-red-400 transition-colors" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default SessionManager;
