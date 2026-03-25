
import React from 'react';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  ShieldAlert,
  ArrowUpRight,
  ChevronRight,
  // Add missing Database and Lock imports
  Database,
  Lock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FeedbackEntry } from '../types';

const data = [
  { name: 'ML', points: 18.71, color: '#3b82f6' },
  { name: 'CD', points: 18.55, color: '#8b5cf6' },
  { name: 'CNS', points: 18.37, color: '#ec4899' },
  { name: 'OOAD', points: 18.62, color: '#10b981' },
  { name: 'MSD', points: 18.45, color: '#f59e0b' },
];

const Dashboard: React.FC<{ feedbacks: FeedbackEntry[] }> = ({ feedbacks }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Feedback', value: 1248 + feedbacks.length, icon: MessageSquare, color: 'blue' },
          { label: 'Avg Feedback Points', value: '18.54', icon: TrendingUp, color: 'emerald' },
          { label: 'Student Anonymity', value: '100%', icon: ShieldAlert, color: 'indigo' },
          { label: 'Active Subjects', value: '12', icon: Users, color: 'orange' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600 flex items-center gap-1">
                +12% <ArrowUpRight size={12} />
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Card */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Faculty Performance (Points)</h2>
              <p className="text-sm text-slate-500">Subject-wise feedback analysis for Semester 2024-25</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 rounded-lg text-sm p-2 outline-none">
              <option>CSE Dept</option>
              <option>IT Dept</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis domain={[18, 19]} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="points" radius={[6, 6, 0, 0]} barSize={40}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Info Column */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl text-white shadow-lg shadow-blue-500/20 flex flex-col justify-between h-full">
            <div>
              <ShieldAlert className="mb-4 opacity-80" size={32} />
              <h3 className="text-xl font-bold mb-2">Zero-Knowledge Integrity</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Our system uses ZK-Proofs to verify student eligibility without recording identity. Your feedback is truly anonymous.
              </p>
            </div>
            <button className="mt-6 w-full py-3 px-4 bg-white/10 hover:bg-white/20 transition-colors rounded-xl font-semibold text-sm flex items-center justify-center gap-2 group">
              View Privacy Protocol
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Database size={18} className="text-blue-600" />
              Latest On-Chain Entries
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-mono font-bold text-slate-400">
                      0x{Math.floor(Math.random()*10000)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700">Encrypted Feedback</p>
                      <p className="text-[10px] text-slate-500">2 mins ago • Block #84920</p>
                    </div>
                  </div>
                  <Lock size={14} className="text-slate-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
