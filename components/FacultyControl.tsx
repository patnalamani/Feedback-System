
import React, { useState } from 'react';
import { Search, Edit3, Save, X, UserPlus, Trash2, IdCard, Plus, Briefcase } from 'lucide-react';
import { Faculty, Department } from '../types';
import { DEPARTMENTS } from '../constants';

interface FacultyControlProps {
  faculties: Faculty[];
  onUpdateFaculty: (updated: Faculty) => void;
  onAddFaculty: (faculty: Faculty) => void;
}

const FacultyControl: React.FC<FacultyControlProps> = ({ faculties, onUpdateFaculty, onAddFaculty }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Faculty | null>(null);
  
  const [newFaculty, setNewFaculty] = useState<Partial<Faculty>>({
    id: 'F' + (faculties.length + 1).toString().padStart(3, '0'),
    name: '',
    department: 'CSE',
    designation: 'Assistant Professor',
    subjects: []
  });

  const handleAdd = () => {
    if (newFaculty.name && newFaculty.id) {
      onAddFaculty(newFaculty as Faculty);
      setIsModalOpen(false);
      setNewFaculty({ 
        id: 'F' + (faculties.length + 2).toString().padStart(3, '0'), 
        name: '', 
        department: 'CSE', 
        designation: 'Assistant Professor',
        subjects: [] 
      });
    }
  };

  const startEdit = (faculty: Faculty) => {
    setEditingId(faculty.id);
    setEditForm({ ...faculty });
  };

  const handleSaveEdit = () => {
    if (editForm) {
      onUpdateFaculty(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search Faculty ID or Name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all w-full md:w-auto"
        >
          <UserPlus size={18} /> Add New Node
        </button>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Node ID</th>
                <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Full Name</th>
                <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Designation</th>
                <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Dept</th>
                <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-bold">
              {faculties.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.id.toLowerCase().includes(searchTerm.toLowerCase())).map(f => (
                <tr key={f.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="p-8 text-blue-600 font-mono">{f.id}</td>
                  <td className="p-8">
                    {editingId === f.id ? (
                      <input 
                        value={editForm?.name} 
                        onChange={(e) => setEditForm({...editForm!, name: e.target.value})}
                        className="px-4 py-2 bg-white border border-blue-500 rounded-xl outline-none"
                      />
                    ) : f.name}
                  </td>
                  <td className="p-8 text-slate-500">
                     {editingId === f.id ? (
                      <input 
                        value={editForm?.designation} 
                        onChange={(e) => setEditForm({...editForm!, designation: e.target.value})}
                        className="px-4 py-2 bg-white border border-blue-500 rounded-xl outline-none"
                      />
                    ) : (f.designation || 'Faculty')}
                  </td>
                  <td className="p-8"><span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black uppercase">{f.department}</span></td>
                  <td className="p-8 text-right">
                     {editingId === f.id ? (
                       <div className="flex justify-end gap-2">
                          <button onClick={handleSaveEdit} className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors"><Save size={18}/></button>
                          <button onClick={() => setEditingId(null)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"><X size={18}/></button>
                       </div>
                     ) : (
                       <div className="flex justify-end gap-2">
                          <button onClick={() => startEdit(f)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit3 size={18}/></button>
                          <button className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={18}/></button>
                       </div>
                     )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[4rem] p-12 shadow-2xl space-y-10 animate-in zoom-in duration-300">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                  <UserPlus size={32} />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight">Register Node</h3>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">SRK Ledger Expansion Protocol</p>
              </div>

              <div className="space-y-5">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Node ID</label>
                      <div className="relative">
                        <IdCard size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                        <input type="text" value={newFaculty.id} readOnly className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-blue-600" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Academic Unit</label>
                      <select value={newFaculty.department} onChange={(e) => setNewFaculty({...newFaculty, department: e.target.value as Department})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none">
                          {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                 </div>

                 <div className="space-y-1">
                   <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Full Name</label>
                   <input 
                    type="text" 
                    value={newFaculty.name} 
                    onChange={(e) => setNewFaculty({...newFaculty, name: e.target.value})} 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:border-blue-500 transition-all" 
                    placeholder="e.g. Dr. Ramesh Babu" 
                   />
                 </div>

                 <div className="space-y-1">
                   <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Designation</label>
                   <div className="relative">
                     <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                     <input 
                      type="text" 
                      value={newFaculty.designation} 
                      onChange={(e) => setNewFaculty({...newFaculty, designation: e.target.value})} 
                      className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold outline-none focus:border-blue-500 transition-all" 
                      placeholder="e.g. Professor" 
                     />
                   </div>
                 </div>
              </div>

              <div className="flex gap-4">
                 <button onClick={() => setIsModalOpen(false)} className="flex-1 py-6 bg-slate-50 text-slate-500 rounded-[2rem] font-black uppercase text-[10px] hover:bg-slate-100 transition-all">Cancel</button>
                 <button onClick={handleAdd} className="flex-1 py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-[10px] shadow-xl shadow-blue-900/10 active:scale-95 transition-all">Deploy Node</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default FacultyControl;
