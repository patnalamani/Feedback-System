
import React from 'react';
import { 
  ShieldCheck, 
  Key, 
  Layers, 
  Cpu, 
  Lock, 
  Terminal,
  FileCode,
  Network,
  Zap,
  HardDrive,
  Activity,
  Box,
  Building2,
  Database
} from 'lucide-react';
import { SOLIDITY_CONTRACT_CODE } from '../constants';

const TechnicalRoadmap: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500 pb-20">
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Network size={200} className="text-blue-400" />
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Zap size={12} /> Global Scalability Node
          </div>
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Multi-Dept MCP Architecture</h2>
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed font-medium">
            Scaling the FFB system across 10 Departments and 8 Semesters. 
            Automated routing via <strong>MCP Filesystem</strong> mapping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 relative z-10">
          {[
            { 
              icon: Building2, 
              title: "10 Departments", 
              desc: "From CSE to MBA, each department maintains an isolated, encrypted ledger slice.",
              color: "blue"
            },
            { 
              icon: Database, 
              title: "Dept-Sem Routing", 
              desc: "MCP automatically pulls subject schemas from local paths like /data/ECE/2.2/.",
              color: "emerald"
            },
            { 
              icon: Lock, 
              title: "Global Verifier", 
              desc: "A singular smart contract verifier handling multi-dept proof logic.",
              color: "purple"
            }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
              <div className={`p-3 bg-${item.color}-500/10 text-${item.color}-400 rounded-xl w-fit mb-4`}>
                <item.icon size={24} />
              </div>
              <h4 className="font-bold text-white mb-2">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            <Layers className="text-blue-600" /> Implementation Logic
          </h3>
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <h4 className="font-bold text-slate-900 mb-2 text-sm flex items-center gap-2"><Cpu size={16} /> Data Partitioning Strategy</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                We use nested mapping in Solidity: <code>mapping(Dept =&gt; mapping(Sem =&gt; mapping(Subject =&gt; Stats)))</code>. 
                This allows the AI to fetch granular statistics via MCP for specific department clusters without scanning the entire global state.
              </p>
            </div>
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl">
              <h4 className="font-bold text-blue-900 mb-2 text-sm flex items-center gap-2"><ShieldCheck size={16} /> Cross-Dept Nullifiers</h4>
              <p className="text-[11px] text-blue-700 leading-relaxed">
                Nullifiers are hashed as <code>keccak256(student_id + dept + sem + secret)</code>. 
                This prevents a student from voting twice in CSE, but allows them to have an identity if they are enrolled in an inter-disciplinary course.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-blue-500/20 group-hover:text-blue-500/40 transition-colors">
            <FileCode size={80} />
          </div>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
            <Terminal className="text-blue-400" size={24} />
            SRKInstituteFeedback.sol
          </h3>
          <pre className="text-[10px] font-mono bg-black/40 p-6 rounded-2xl overflow-x-auto text-blue-200 border border-white/5 leading-relaxed relative z-10 max-h-[350px]">
            <code>{SOLIDITY_CONTRACT_CODE}</code>
          </pre>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Layers size={22} className="text-blue-600" /> Global Directory (MCP Mapped)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          {[
            { dir: "SRK_Data/CSE/3.1/", items: ["ML_Theory.json", "CD_Theory.json", "CNS_Theory.json"] },
            { dir: "SRK_Data/ECE/2.2/", items: ["Embedded_Systems.json", "Signals.json", "DSP.json"] },
            { dir: "SRK_Data/MBA/1.1/", items: ["Management_Apps.json", "Economics.json", "Accounting.json"] }
          ].map((block, i) => (
            <div key={i} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
              <p className="text-blue-600 font-bold mb-2 flex items-center gap-1"><Box size={14} /> {block.dir}</p>
              <ul className="space-y-1 text-slate-500">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-slate-300 rounded-full"></div> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicalRoadmap;
