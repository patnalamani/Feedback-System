
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, FileText, AlertCircle, Sparkles } from 'lucide-react';
import { Department } from '../types';

interface AttributeEditorProps {
  theoryQuestions: Record<Department, string[]>;
  labQuestions: Record<Department, string[]>;
  setTheoryQuestions: (qs: Record<Department, string[]>) => void;
  setLabQuestions: (qs: Record<Department, string[]>) => void;
}

const AttributeEditor: React.FC<AttributeEditorProps> = ({ theoryQuestions, labQuestions, setTheoryQuestions, setLabQuestions }) => {
  const [activeTab, setActiveTab] = useState<'THEORY' | 'LAB'>('THEORY');
  const [currentQuestions, setCurrentQuestions] = useState<string[]>([]);

  // Sync state with props when tab changes or initial load
  useEffect(() => {
    const questions = activeTab === 'THEORY' 
      ? theoryQuestions['CSE'] || [] 
      : labQuestions['CSE'] || [];
    setCurrentQuestions([...questions]);
  }, [activeTab, theoryQuestions, labQuestions]);

  const handleAdd = () => {
    setCurrentQuestions([...currentQuestions, "New Assessment Metric " + (currentQuestions.length + 1)]);
  };

  const handleRemove = (idx: number) => {
    setCurrentQuestions(currentQuestions.filter((_, i) => i !== idx));
  };

  const handleChange = (idx: number, val: string) => {
    const next = [...currentQuestions];
    next[idx] = val;
    setCurrentQuestions(next);
  };

  const handleSave = () => {
    const updated: Record<string, string[]> = {};
    // Apply changes globally across all department nodes
    Object.keys(theoryQuestions).forEach(dept => {
      updated[dept] = [...currentQuestions];
    });

    if (activeTab === 'THEORY') {
      setTheoryQuestions(updated as Record<Department, string[]>);
    } else {
      setLabQuestions(updated as Record<Department, string[]>);
    }
    alert(`${activeTab} Protocol Synchronized Globally.`);
  };

  return (
    <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm space-y-10 animate-in fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full md:w-fit">
          <button 
            onClick={() => setActiveTab('THEORY')} 
            className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'THEORY' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
          >
            Theory Protocol
          </button>
          <button 
            onClick={() => setActiveTab('LAB')} 
            className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'LAB' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
          >
            Lab Protocol
          </button>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={handleAdd}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl text-[10px] font-black uppercase hover:bg-slate-200 transition-all"
          >
            <Plus size={16}/> Add Attribute
          </button>
          <button 
            onClick={handleSave} 
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase shadow-xl active:scale-95 transition-all"
          >
            <Save size={16}/> Sync Global State
          </button>
        </div>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {currentQuestions.map((q, i) => (
          <div key={i} className="flex items-center gap-4 group animate-in slide-in-from-left duration-300" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-black text-xs text-slate-300 shrink-0 group-hover:bg-blue-50 group-hover:text-blue-400 transition-colors">
              {i + 1}
            </div>
            <input 
              value={q} 
              onChange={(e) => handleChange(i, e.target.value)}
              className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700"
            />
            <button 
              onClick={() => handleRemove(i)} 
              className="p-3 text-slate-300 hover:text-red-500 transition-colors shrink-0"
              title="Delete Attribute"
            >
              <Trash2 size={18}/>
            </button>
          </div>
        ))}
        {currentQuestions.length === 0 && (
          <div className="p-20 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem] text-slate-300 font-black uppercase text-[10px] tracking-widest">
            No Attributes Defined
          </div>
        )}
      </div>

      <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl flex gap-4 text-blue-700">
         <AlertCircle size={20} className="shrink-0" />
         <div>
            <p className="text-[11px] font-black uppercase tracking-wider mb-1">Blockchain Synchronicity Notice</p>
            <p className="text-[11px] font-bold leading-relaxed opacity-80">Modifying these attributes affects the entire college node cluster. Ensure institutional consensus before syncing global state changes.</p>
         </div>
      </div>
    </div>
  );
};

export default AttributeEditor;
