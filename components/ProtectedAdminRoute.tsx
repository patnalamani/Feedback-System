
import React from 'react';
import { User, UserRole } from '../types';
import { ShieldAlert, LockKeyhole } from 'lucide-react';

interface ProtectedAdminRouteProps {
  user: User | null;
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ user, children }) => {
  // STRICT: Only the hardcoded Super-Admin can enter the Admin Dashboard.
  const isAuthorized = user?.role === UserRole.ADMIN && (user?.email.toLowerCase() === 'admin@gmail.com' || user?.email.toLowerCase() === 'yashwanthgorrela@gmail.com');

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center p-24 bg-white rounded-[4rem] border-4 border-red-50 shadow-2xl text-center max-w-2xl mx-auto my-20">
        <div className="w-24 h-24 bg-red-100 text-red-600 rounded-[2.5rem] flex items-center justify-center mb-8">
          <ShieldAlert size={48} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Access Denied</h2>
        <p className="text-slate-500 mt-4 font-medium leading-relaxed">
          The requested Governance Hub is protected by a Single-Point Lock. 
          Only the master Super-Admin account (admin@gmail.com) is authorized to modify registry state.
        </p>
        <div className="mt-10 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
           <LockKeyhole size={14} /> Security Protocol v4.0.1 Locked
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
