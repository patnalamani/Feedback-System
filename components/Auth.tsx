
import React, { useState } from 'react';
import { 
  Shield, 
  User, 
  LockKeyhole,
  KeyRound,
  IdCard,
  Building2,
  CheckCircle2,
  Users,
  ChevronDown,
  CalendarDays,
  Sparkles,
  Search
} from 'lucide-react';
import { UserRole, User as UserType, Department, Semester } from '../types';
import { DEPARTMENTS, SEMESTERS, HOD_REGISTRY } from '../constants';

const SUPER_ADMIN_CREDS = [
  { email: "admin@gmail.com", password: "123456" },
  { email: "yashwanthgorrela@gmail.com", password: "123456" }
];

interface AuthProps {
  onAuthenticate: (user: UserType, facultySemester?: Semester) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthenticate }) => {
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [dept, setDept] = useState<Department>('CSE');
  const [sem, setSem] = useState<Semester>('1-1');
  const [facultySem, setFacultySem] = useState<Semester>('1-1');
  const [error, setError] = useState<string | null>(null);
  const [showHODRegistry, setShowHODRegistry] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    identifier: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailInput = formData.identifier.trim().toLowerCase();
    const passwordInput = formData.password.trim();

    if (role === UserRole.ADMIN) {
      const admin = SUPER_ADMIN_CREDS.find(a => a.email === emailInput && passwordInput === a.password);
      if (admin) {
        onAuthenticate({
          fullName: "System Admin",
          email: admin.email,
          role: UserRole.ADMIN,
          isAuthorized: true
        });
        return;
      }
      setError("Root access denied. Invalid Super-Admin credentials.");
      return;
    }

    if (role === UserRole.HOD) {
      const hod = HOD_REGISTRY.find(h => h.email.toLowerCase() === emailInput);
      if (hod) {
        onAuthenticate({
          ...hod,
          email: emailInput 
        });
        return;
      } else {
        setError("HOD Identity Not Found. Use your official @srkit.edu.in email.");
        return;
      }
    }

    // Fix: Redundant comparison with UserRole.HOD as the case is already handled above.
    // At this point, role is narrowed to STUDENT | FACULTY, both of which are authorized in this flow.
    const userData: UserType = {
      fullName: formData.fullName || (role === UserRole.STUDENT ? "Anonymous Student" : "Node User"),
      email: emailInput,
      role: role,
      department: dept,
      semester: role === UserRole.STUDENT ? sem : undefined,
      facultyId: role === UserRole.FACULTY ? 'F0001' : undefined,
      isAuthorized: true 
    };

    onAuthenticate(userData, role === UserRole.FACULTY ? facultySem : undefined);
  };

  const selectHOD = (email: string) => {
    setFormData({ ...formData, identifier: email, password: '••••••••' });
    setShowHODRegistry(false);
  };

  const isValidHOD = role === UserRole.HOD && HOD_REGISTRY.some(h => h.email.toLowerCase() === formData.identifier.trim().toLowerCase());

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center p-6 font-inter">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white shadow-2xl mb-6 transform hover:rotate-12 transition-transform">
            <Shield size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">SRK-IT Portal</h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Unified Governance Gateway</p>
        </div>

        <div className="bg-white p-10 md:p-12 rounded-[3.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-xs font-black rounded-2xl border border-red-100 flex items-center gap-2 animate-in slide-in-from-top-4">
              <LockKeyhole size={14} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Role</label>
              <div className="relative">
                <Users size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                <select 
                  value={role} 
                  onChange={(e) => {
                    setRole(e.target.value as UserRole);
                    setFormData({...formData, identifier: ''});
                  }}
                  className="w-full pl-14 pr-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none appearance-none focus:border-slate-900 transition-all cursor-pointer"
                >
                  <option value={UserRole.STUDENT}>Student Node</option>
                  <option value={UserRole.FACULTY}>Faculty Node</option>
                  <option value={UserRole.HOD}>Head of Dept (HOD)</option>
                  <option value={UserRole.ADMIN}>Super-Admin</option>
                </select>
                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {(role === UserRole.STUDENT || role === UserRole.FACULTY) && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-300">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Academic Unit</label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <select 
                      value={dept} 
                      onChange={(e) => setDept(e.target.value as Department)} 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs outline-none focus:border-slate-900"
                    >
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Semester</label>
                  <select 
                    value={role === UserRole.STUDENT ? sem : facultySem} 
                    onChange={(e) => role === UserRole.STUDENT ? setSem(e.target.value as Semester) : setFacultySem(e.target.value as Semester)} 
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-xs outline-none"
                  >
                    {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Identifier</label>
                {role === UserRole.HOD && (
                  <button 
                    type="button" 
                    onClick={() => setShowHODRegistry(!showHODRegistry)}
                    className="text-[9px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1 hover:text-blue-800 transition-colors"
                  >
                    <Search size={10} /> {showHODRegistry ? 'Hide Registry' : 'Browse HODs'}
                  </button>
                )}
              </div>
              <div className="relative">
                <IdCard size={18} className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isValidHOD ? 'text-emerald-500' : 'text-slate-300'}`} />
                <input 
                  type="text" 
                  required 
                  value={formData.identifier} 
                  onChange={(e) => setFormData({...formData, identifier: e.target.value})} 
                  placeholder={role === UserRole.ADMIN ? "admin@gmail.com" : role === UserRole.HOD ? "Official HOD Email" : "Email / Roll No"} 
                  className={`w-full pl-14 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none transition-all ${isValidHOD ? 'focus:border-emerald-500' : 'focus:border-slate-900'}`} 
                />
                {isValidHOD && <CheckCircle2 size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-500 animate-in zoom-in" />}
              </div>

              {showHODRegistry && role === UserRole.HOD && (
                <div className="mt-4 p-4 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-xl space-y-2 animate-in slide-in-from-top-4">
                  <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2 px-2">Authorized SRK-HOD List</p>
                  <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1">
                    {HOD_REGISTRY.map(hod => (
                      <button 
                        key={hod.email} 
                        type="button"
                        onClick={() => selectHOD(hod.email)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors text-left group"
                      >
                        <div>
                          <p className="text-white text-xs font-black uppercase tracking-tight">{hod.fullName}</p>
                          <p className="text-slate-500 text-[9px] font-bold">{hod.email}</p>
                        </div>
                        <span className="text-[9px] font-black text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">{hod.department}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <KeyRound size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  type="password" 
                  required 
                  value={formData.password} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                  placeholder="••••••••" 
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-slate-900 transition-all" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={`w-full py-6 rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${isValidHOD ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
            >
              {role === UserRole.HOD ? (isValidHOD ? <><Sparkles size={18}/> Unlock Hub</> : 'Verify HOD Identity') : 'Access Ledger'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
