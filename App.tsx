
import React, { useState, useEffect, useMemo } from 'react';
import { 
  FileText, 
  BarChart3, 
  Lock,
  UserCheck,
  Building2,
  Terminal
} from 'lucide-react';
import FeedbackPortal from './components/FeedbackPortal';
import AnalysisView from './components/AnalysisView';
import AdminDashboard from './components/AdminDashboard';
import FacultyResultsView from './components/FacultyResultsView';
import HODDashboard from './components/HODDashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Auth from './components/Auth';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import { FeedbackEntry, AdminFeedbackRecord, User, UserRole, Subject, Faculty, Department, ArchiveRecord, Semester } from './types';
import { 
  SUBJECTS as INITIAL_SUBJECTS, 
  FACULTY_DATA as INITIAL_FACULTIES,
  THEORY_METRICS as INITIAL_THEORY_METRICS,
  LAB_METRICS as INITIAL_LAB_METRICS,
  DEPARTMENTS,
  SEMESTERS,
  HOD_REGISTRY
} from './constants';
import { bulkUpdateRegistry } from './services/web3Service';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('feedback');
  const [feedbacks, setFeedbacks] = useState<AdminFeedbackRecord[]>([]);
  const [archives, setArchives] = useState<ArchiveRecord[]>([]);

  const sanitizedFeedbacks = useMemo(() => {
    if (user?.role === UserRole.ADMIN) return feedbacks;
    return feedbacks.map(f => {
      const { studentHash, encryptedHash, ...rest } = f;
      return rest;
    }) as FeedbackEntry[];
  }, [feedbacks, user]);

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isGlobalSessionActive, setIsGlobalSessionActive] = useState(true);
  const [activeFacultySemester, setActiveFacultySemester] = useState<Semester | undefined>(undefined);

  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [faculties, setFaculties] = useState<Faculty[]>(INITIAL_FACULTIES);
  
  const [hods, setHods] = useState<User[]>(HOD_REGISTRY);

  const [theoryQuestions, setTheoryQuestions] = useState<Record<Department, string[]>>(
    DEPARTMENTS.reduce((acc, dept) => ({ ...acc, [dept]: [...INITIAL_THEORY_METRICS] }), {} as Record<Department, string[]>)
  );
  const [labQuestions, setLabQuestions] = useState<Record<Department, string[]>>(
    DEPARTMENTS.reduce((acc, dept) => ({ ...acc, [dept]: [...INITIAL_LAB_METRICS] }), {} as Record<Department, string[]>)
  );

  const [sessionRegistry, setSessionRegistry] = useState<Record<string, boolean>>(
    DEPARTMENTS.reduce((acc, dept) => {
      SEMESTERS.forEach(sem => { acc[`${dept}-${sem}`] = true; });
      return acc;
    }, {} as Record<string, boolean>)
  );

  const archiveSession = () => {
    const newArchives: ArchiveRecord[] = faculties.map(f => ({
      sessionId: `2025_SEM1_${Date.now()}`,
      year: '2025',
      facultyId: f.id,
      dept: f.department,
      avgRating: 17.5 + (Math.random() * 2),
      semester: '3-1' as Semester
    }));
    setArchives([...archives, ...newArchives]);
    setFeedbacks([]);
    alert("Session Archived Successfully.");
  };

  const handleUpdateHOD = (email: string, isAuthorized: boolean) => {
    setHods(prev => prev.map(hod => hod.email === email ? { ...hod, isAuthorized } : hod));
    if (user && user.email === email) setUser({ ...user, isAuthorized });
  };

  const handleBulkSync = async (payload: { faculties: Faculty[], subjects: Subject[], students: any[] }) => {
    try {
      const result = await bulkUpdateRegistry(payload.faculties, payload.subjects);
      console.log("[App] Backend Sync Complete:", result);

      setSubjects(prev => {
        const existingIds = new Set(prev.map(s => s.id));
        const newOnes = payload.subjects.filter(s => !existingIds.has(s.id));
        return [...prev, ...newOnes];
      });

      setFaculties(prev => {
        const existingIds = new Set(prev.map(f => f.id));
        const newOnes = payload.faculties.filter(f => !existingIds.has(f.id));
        return [...prev, ...newOnes];
      });

      console.log("Registered Students Buffer:", payload.students);
      alert(`Consensus Achieved: Mapped ${payload.faculties.length} Faculty Nodes. Tx Hash: ${result.txHash.substring(0, 10)}...`);
    } catch (err) {
      console.error("[App] Sync Error:", err);
      alert("Backend Sync Failed. Check network connection.");
    }
  };

  const handleAuth = (authenticatedUser: User, facultySemester?: Semester) => {
    if (authenticatedUser.role === UserRole.HOD) {
      const existing = hods.find(h => h.email.toLowerCase() === authenticatedUser.email.toLowerCase());
      if (existing) {
        authenticatedUser.fullName = existing.fullName;
        authenticatedUser.department = existing.department;
        authenticatedUser.isAuthorized = existing.isAuthorized;
        authenticatedUser.registrationNo = existing.registrationNo;
      }
    }
    
    setUser(authenticatedUser);
    setActiveFacultySemester(facultySemester);

    if (authenticatedUser.role === UserRole.ADMIN) setActiveTab('admin');
    else if (authenticatedUser.role === UserRole.FACULTY) setActiveTab('faculty_results');
    else if (authenticatedUser.role === UserRole.HOD) setActiveTab('hod_dashboard');
    else setActiveTab('feedback');
  };

  if (!user) return <Auth onAuthenticate={handleAuth} />;

  const tabs = [
    { id: 'feedback', label: 'Vote Feedback', icon: FileText, roles: [UserRole.STUDENT] },
    { id: 'faculty_results', label: 'Performance', icon: UserCheck, roles: [UserRole.FACULTY] },
    { id: 'hod_dashboard', label: 'HOD Hub', icon: Building2, roles: [UserRole.HOD] },
    { id: 'analysis', label: 'Analytics', icon: BarChart3, roles: [UserRole.FACULTY, UserRole.ADMIN, UserRole.HOD] },
    { id: 'admin', label: 'Super-Admin', icon: Lock, roles: [UserRole.ADMIN] },
  ].filter(tab => !tab.roles || tab.roles.includes(user.role));

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-inter">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} user={user} onLogout={() => setUser(null)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header activeTab={tabs.find(t => t.id === activeTab)?.label || 'SRK-IT'} user={user} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="space-y-6 w-full h-full">
            {activeTab === 'feedback' && (
              <FeedbackPortal 
                onSubmit={(e) => setFeedbacks([...feedbacks, e])} 
                onLogout={() => setUser(null)} 
                user={user} 
                subjects={subjects} 
                faculties={faculties} 
                sessionRegistry={sessionRegistry} 
                theoryQuestions={theoryQuestions} 
                labQuestions={labQuestions} 
                isGlobalSessionActive={isGlobalSessionActive} 
              />
            )}
            {activeTab === 'faculty_results' && <FacultyResultsView user={user} feedbacks={sanitizedFeedbacks} faculties={faculties} subjects={subjects} />}
            {activeTab === 'hod_dashboard' && <HODDashboard user={user} feedbacks={sanitizedFeedbacks} faculties={faculties} subjects={subjects} />}
            {activeTab === 'analysis' && <AnalysisView feedbacks={sanitizedFeedbacks} user={user} />}
            {activeTab === 'admin' && (
              <ProtectedAdminRoute user={user}>
                <AdminDashboard 
                  subjects={subjects} 
                  setSubjects={setSubjects} 
                  faculties={faculties} 
                  setFaculties={setFaculties} 
                  sessionRegistry={sessionRegistry} 
                  setSessionRegistry={setSessionRegistry} 
                  theoryQuestions={theoryQuestions} 
                  setTheoryQuestions={setTheoryQuestions} 
                  labQuestions={labQuestions} 
                  setLabQuestions={setLabQuestions} 
                  isGlobalSessionActive={isGlobalSessionActive} 
                  setIsGlobalSessionActive={setIsGlobalSessionActive} 
                  user={user} 
                  feedbacks={feedbacks} 
                  archives={archives} 
                  onArchiveSession={archiveSession} 
                  hods={hods} 
                  onUpdateHOD={handleUpdateHOD} 
                  onBulkSync={handleBulkSync} 
                />
              </ProtectedAdminRoute>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
