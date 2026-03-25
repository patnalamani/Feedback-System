
import React from 'react';
import { LucideIcon, Menu, X, GraduationCap, LogOut } from 'lucide-react';
import { User } from '../types';

interface Tab {
  id: any;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  tabs: Tab[];
  isOpen: boolean;
  toggleSidebar: () => void;
  user: User;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  tabs, 
  isOpen, 
  toggleSidebar, 
  user,
  onLogout 
}) => {
  return (
    <aside 
      className={`bg-slate-900 text-white transition-all duration-300 flex flex-col h-full border-r border-slate-800 ${
        isOpen ? 'w-64' : 'w-20'
      } fixed md:relative z-50`}
    >
      <div className="p-6 flex items-center justify-between">
        <div className={`flex items-center gap-3 overflow-hidden ${!isOpen && 'hidden'}`}>
          <div className="p-2 bg-blue-600 rounded-lg">
            <GraduationCap size={24} />
          </div>
          <span className="font-bold text-lg whitespace-nowrap">SRK-IT CSE</span>
        </div>
        <button onClick={toggleSidebar} className="p-1 hover:bg-slate-800 rounded md:hidden">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-2 py-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} className="shrink-0" />
              <span className={`font-medium transition-opacity duration-200 ${!isOpen ? 'opacity-0 w-0' : 'opacity-100'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800 transition-colors group relative ${!isOpen && 'justify-center'}`}>
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
            {user.fullName.charAt(0)}
          </div>
          {isOpen && (
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-semibold truncate">{user.fullName}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{user.role}</span>
            </div>
          )}
          <button 
            onClick={onLogout}
            className={`p-2 text-slate-400 hover:text-red-400 transition-colors ${!isOpen ? 'hidden' : ''}`}
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
        {!isOpen && (
          <button 
            onClick={onLogout}
            className="w-full mt-4 flex justify-center text-slate-400 hover:text-red-400"
          >
            <LogOut size={20} />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
