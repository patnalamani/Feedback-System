
import React, { useState } from 'react';
import { Archive, Search, Download, TrendingUp, ArrowRight, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';
import { ArchiveRecord, Faculty } from '../types';

interface RecordsArchiveProps {
  archives: ArchiveRecord[];
  faculties: Faculty[];
}

const RecordsArchive: React.FC<RecordsArchiveProps> = ({ archives, faculties }) => {
  const [selectedYear, setSelectedYear] = useState('2025');

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-600 rounded-3xl text-white shadow-xl">
               <Archive size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Records Archive</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Cross-Session Rating Comparison</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <select className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl font-black text-xs uppercase outline-none focus:ring-2 focus:ring-indigo-500 transition-all" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
               <option value="2025">Year 2025</option>
               <option value="2024">Year 2024</option>
             </select>
             <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase transition-all active:scale-95 shadow-lg"><Download size={14}/> Export CSV</button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-[2.5rem] border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Faculty Node</th>
                <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Previous (2024-S2)</th>
                <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Current (2025-S1)</th>
                <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  <div className="flex items-center gap-1 group relative cursor-help w-fit">
                    Delta (%)
                    <Info size={12} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                    <div className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-4 bg-slate-900 text-white rounded-[1.5rem] shadow-2xl z-50 normal-case font-bold leading-relaxed text-[10px] animate-in fade-in zoom-in duration-200">
                      Percentage change in average rating from the previous session (2024-S2) compared to the current session (2025-S1).
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-bold">
              {faculties.map(f => {
                const prev = 16.5 + (Math.random() * 2);
                const curr = 17.2 + (Math.random() * 2.5);
                const delta = ((curr - prev) / prev) * 100;
                return (
                  <tr key={f.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="p-8">
                      <div className="flex flex-col">
                        <span className="text-slate-900">{f.name}</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">{f.id} • {f.department}</span>
                      </div>
                    </td>
                    <td className="p-8 text-slate-500 font-mono">{prev.toFixed(2)}</td>
                    <td className="p-8 text-indigo-600 font-mono">{curr.toFixed(2)}</td>
                    <td className="p-8">
                       <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black ${delta >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                          {delta >= 0 ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
                          {Math.abs(delta).toFixed(1)}%
                       </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecordsArchive;
