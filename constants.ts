
import { Faculty, Subject, Department, Semester, FeedbackType, UserRole, User } from './types';

export const DEPARTMENTS: Department[] = ['CSE', 'CSM', 'CSD', 'AIML', 'AIDS', 'ECE', 'EEE', 'IT', 'CIVIL', 'MECH', 'MBA', 'MTECH', 'FED'];
export const SEMESTERS: Semester[] = ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2'];

export const HOD_REGISTRY: User[] = [
  { fullName: 'Dr. A. Radhika', email: 'radhika.cse@srkit.edu.in', role: UserRole.HOD, department: 'CSE', isAuthorized: true, registrationNo: 'REG202501' },
  { fullName: 'Dr. J. Ashok', email: 'ashok.sh@srkit.edu.in', role: UserRole.HOD, department: 'FED', isAuthorized: true, registrationNo: 'REG202502' },
  { fullName: 'Dr. N. Murali Krishna', email: 'murali.sh@srkit.edu.in', role: UserRole.HOD, department: 'FED', isAuthorized: true, registrationNo: 'REG202503' },
  { fullName: 'Dhasaradh', email: 'dhasaradh.csm@srkit.edu.in', role: UserRole.HOD, department: 'CSM', isAuthorized: true, registrationNo: 'REG202504' },
  { fullName: 'Murili', email: 'murili.csd@srkit.edu.in', role: UserRole.HOD, department: 'CSD', isAuthorized: true, registrationNo: 'REG202505' },
  { fullName: 'Rama Anja', email: 'rama.ece@srkit.edu.in', role: UserRole.HOD, department: 'ECE', isAuthorized: true, registrationNo: 'REG202506' },
  { fullName: 'Chandra S', email: 'chandrashaker.eee@srkit.edu.in', role: UserRole.HOD, department: 'EEE', isAuthorized: true, registrationNo: 'REG202507' },
  { fullName: 'Sathyanar', email: 'sathyanarayana.civil@srkit.edu.in', role: UserRole.HOD, department: 'CIVIL', isAuthorized: true, registrationNo: 'REG202508' },
  { fullName: 'Naga Bask', email: 'nagabaskar.mtech@srkit.edu.in', role: UserRole.HOD, department: 'MTECH', isAuthorized: true, registrationNo: 'REG202509' },
  { fullName: 'Rambabu', email: 'rambabu.aids@srkit.edu.in', role: UserRole.HOD, department: 'AIDS', isAuthorized: true, registrationNo: 'REG202510' },
  { fullName: 'Sambasiva', email: 'sambasivaro.it@srkit.edu.in', role: UserRole.HOD, department: 'IT', isAuthorized: true, registrationNo: 'REG202511' },
  { fullName: 'Yashwanth Gorrela', email: 'yashwanthgorrela@gmail.com', role: UserRole.HOD, department: 'CSE', isAuthorized: true, registrationNo: 'DEV2025' },
  { fullName: 'Sudharani', email: 'sudharani.mba@srkit.edu.in', role: UserRole.HOD, department: 'MBA', isAuthorized: true, registrationNo: 'REG202512' },
  { fullName: 'Dr. K. Srinivas', email: 'srinivas.aiml@srkit.edu.in', role: UserRole.HOD, department: 'AIML', isAuthorized: true, registrationNo: 'REG202513' },
  { fullName: 'Dr. M. Ravi', email: 'ravi.mech@srkit.edu.in', role: UserRole.HOD, department: 'MECH', isAuthorized: true, registrationNo: 'REG202514' }
];

export const HOD_LIST: Record<string, string> = HOD_REGISTRY.reduce((acc, hod) => ({
  ...acc,
  [hod.department!]: hod.fullName
}), {});

export const SUBJECTS: Subject[] = [
  // FED Subjects
  { id: 'CE', name: 'Communicative English', code: 'CE', department: 'FED', semester: '1-1', type: FeedbackType.THEORY },
  { id: 'EP', name: 'Engineering Physics', code: 'EP', department: 'FED', semester: '1-1', type: FeedbackType.THEORY },
  { id: 'LA&C', name: 'Linear Algebra And Calculus', code: 'LA&C', department: 'FED', semester: '1-1', type: FeedbackType.THEORY },
  { id: 'BCME', name: 'Basic Civil & Mechanical Engineering', code: 'BCME', department: 'FED', semester: '1-1', type: FeedbackType.THEORY },
  { id: 'EG', name: 'Engineering Graphics', code: 'EG', department: 'FED', semester: '1-1', type: FeedbackType.THEORY },
  { id: 'BEEE', name: 'Basic Electrical And Electronics Engineering', code: 'BEEE', department: 'FED', semester: '1-1', type: FeedbackType.THEORY },
  { id: 'IP', name: 'Introduction To Programming', code: 'IP', department: 'FED', semester: '1-1', type: FeedbackType.THEORY },
  { id: 'P&S', name: 'Probability and Statistics', code: 'P&S', department: 'FED', semester: '1-2', type: FeedbackType.THEORY },
  { id: 'OS', name: 'Operating Systems', code: 'OS', department: 'CSE', semester: '1-2', type: FeedbackType.THEORY },
  { id: 'DBMS', name: 'Database Management Systems', code: 'DBMS', department: 'CSE', semester: '1-2', type: FeedbackType.THEORY },
  { id: 'SE', name: 'Software Engineering', code: 'SE', department: 'CSE', semester: '1-2', type: FeedbackType.THEORY },
  { id: 'MEFA', name: 'Managerial Economics and Financial Accountancy', code: 'MEFA', department: 'FED', semester: '1-2', type: FeedbackType.THEORY },
  { id: 'DM', name: 'Discrete Mathematics', code: 'DM', department: 'CSE', semester: '1-2', type: FeedbackType.THEORY },
  
  // CSE Core Subjects
  { id: 'DWDM', name: 'Data warehousing and Data mining', code: 'DWDM', department: 'CSE', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'CN', name: 'Computer Networks', code: 'CN', department: 'CSE', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'FLAT', name: 'Formal Languages and Automata Theory', code: 'FLAT', department: 'CSE', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'OOAD', name: 'Object Oriented Analysis and Design', code: 'OOAD', department: 'CSE', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'EPS', name: 'Entrepreneurship', code: 'EPS', department: 'MBA', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'CD', name: 'Compiler Design', code: 'CD', department: 'CSE', semester: '3-2', type: FeedbackType.THEORY },
  { id: 'CC', name: 'Cloud Computing', code: 'CC', department: 'CSE', semester: '3-2', type: FeedbackType.THEORY },
  { id: 'CNS', name: 'Cryptography and Network Security', code: 'CNS', department: 'CSE', semester: '3-2', type: FeedbackType.THEORY },
  { id: 'ML', name: 'Machine Learning', code: 'ML', department: 'CSE', semester: '3-2', type: FeedbackType.THEORY },
  { id: 'SPM', name: 'Software Project Management', code: 'SPM', department: 'CSE', semester: '3-2', type: FeedbackType.THEORY },
  { id: 'DLT', name: 'Deep Learning Techniques', code: 'DLT', department: 'CSE', semester: '4-1', type: FeedbackType.THEORY },
  { id: 'BCT', name: 'Block Chain Techniques', code: 'BCT', department: 'CSE', semester: '4-1', type: FeedbackType.THEORY },
  { id: 'FEV', name: 'Fundamentals of Electric Vehicles', code: 'FEV', department: 'EEE', semester: '4-1', type: FeedbackType.THEORY },
  { id: 'DC', name: 'Data Communications', code: 'DC', department: 'ECE', semester: '4-1', type: FeedbackType.THEORY },
  { id: 'UHV2', name: 'Universal Human Values-2', code: 'UHV2', department: 'FED', semester: '4-1', type: FeedbackType.THEORY },
  
  // ECE Subjects
  { id: 'EDC', name: 'Electronic Devices and Circuits', code: 'EDC', department: 'ECE', semester: '2-1', type: FeedbackType.THEORY },
  { id: 'STLD', name: 'Switching Theory and Logic Design', code: 'STLD', department: 'ECE', semester: '2-1', type: FeedbackType.THEORY },
  { id: 'S&S', name: 'Signals and Systems', code: 'S&S', department: 'ECE', semester: '2-1', type: FeedbackType.THEORY },
  { id: 'RVSP', name: 'Random Variables and Stochastic Processes', code: 'RVSP', department: 'ECE', semester: '2-1', type: FeedbackType.THEORY },
  { id: 'NAS', name: 'Network Analysis and Synthesis', code: 'NAS', department: 'ECE', semester: '2-1', type: FeedbackType.THEORY },
  
  // EEE Subjects
  { id: 'EM1', name: 'Electrical Machines-I', code: 'EM1', department: 'EEE', semester: '2-1', type: FeedbackType.THEORY },
  { id: 'PS1', name: 'Power Systems-I', code: 'PS1', department: 'EEE', semester: '2-1', type: FeedbackType.THEORY },
  { id: 'CT', name: 'Control Systems', code: 'CT', department: 'EEE', semester: '2-1', type: FeedbackType.THEORY },
  { id: 'EMF', name: 'Electromagnetic Fields', code: 'EMF', department: 'EEE', semester: '2-1', type: FeedbackType.THEORY },

  // CSM Subjects
  { id: 'CSM-AI', name: 'Artificial Intelligence', code: 'CSM-AI', department: 'CSM', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'CSM-ML', name: 'Machine Learning', code: 'CSM-ML', department: 'CSM', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'CSM-DA', name: 'Data Analytics', code: 'CSM-DA', department: 'CSM', semester: '3-1', type: FeedbackType.THEORY },

  // CSD Subjects
  { id: 'CSD-UI', name: 'User Interface Design', code: 'CSD-UI', department: 'CSD', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'CSD-UX', name: 'User Experience Design', code: 'CSD-UX', department: 'CSD', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'CSD-WD', name: 'Web Design', code: 'CSD-WD', department: 'CSD', semester: '3-1', type: FeedbackType.THEORY },

  // AIML Subjects
  { id: 'AIML-NN', name: 'Neural Networks', code: 'AIML-NN', department: 'AIML', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'AIML-NLP', name: 'Natural Language Processing', code: 'AIML-NLP', department: 'AIML', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'AIML-CV', name: 'Computer Vision', code: 'AIML-CV', department: 'AIML', semester: '3-1', type: FeedbackType.THEORY },

  // AIDS Subjects
  { id: 'AIDS-DS', name: 'Data Science Fundamentals', code: 'AIDS-DS', department: 'AIDS', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'AIDS-BDA', name: 'Big Data Analytics', code: 'AIDS-BDA', department: 'AIDS', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'AIDS-DV', name: 'Data Visualization', code: 'AIDS-DV', department: 'AIDS', semester: '3-1', type: FeedbackType.THEORY },

  // IT Subjects
  { id: 'IT-WT', name: 'Web Technologies', code: 'IT-WT', department: 'IT', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'IT-IS', name: 'Information Security', code: 'IT-IS', department: 'IT', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'IT-MC', name: 'Mobile Computing', code: 'IT-MC', department: 'IT', semester: '3-1', type: FeedbackType.THEORY },

  // CIVIL Subjects
  { id: 'CIVIL-SA', name: 'Structural Analysis', code: 'CIVIL-SA', department: 'CIVIL', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'CIVIL-GE', name: 'Geotechnical Engineering', code: 'CIVIL-GE', department: 'CIVIL', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'CIVIL-TE', name: 'Transportation Engineering', code: 'CIVIL-TE', department: 'CIVIL', semester: '3-1', type: FeedbackType.THEORY },

  // MECH Subjects
  { id: 'MECH-TD', name: 'Thermodynamics', code: 'MECH-TD', department: 'MECH', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'MECH-DOM', name: 'Dynamics of Machinery', code: 'MECH-DOM', department: 'MECH', semester: '3-1', type: FeedbackType.THEORY },
  { id: 'MECH-MT', name: 'Manufacturing Technology', code: 'MECH-MT', department: 'MECH', semester: '3-1', type: FeedbackType.THEORY },

  // MTECH Subjects
  { id: 'MTECH-ADS', name: 'Advanced Data Structures', code: 'MTECH-ADS', department: 'MTECH', semester: '1-1', type: FeedbackType.THEORY },

  // Labs
  { id: 'CE-LAB', name: 'Communicative English Lab', code: 'CE-LAB', department: 'FED', semester: '1-1', type: FeedbackType.LAB },
  { id: 'EP-LAB', name: 'Engineering Physics Lab', code: 'EP-LAB', department: 'FED', semester: '1-1', type: FeedbackType.LAB },
  { id: 'ITWS-LAB', name: 'IT Workshop Lab', code: 'ITWS-LAB', department: 'CSE', semester: '1-1', type: FeedbackType.LAB },
  { id: 'EWS-LAB', name: 'Engineering Workshop Lab', code: 'EWS-LAB', department: 'MECH', semester: '1-1', type: FeedbackType.LAB },
  { id: 'CP-LAB', name: 'Computer Programming Lab', code: 'CP-LAB', department: 'CSE', semester: '1-1', type: FeedbackType.LAB },
  { id: 'DBMS-LAB', name: 'DBMS Lab', code: 'DBMS-LAB', department: 'CSE', semester: '1-2', type: FeedbackType.LAB },
  { id: 'OS-LAB', name: 'OS Lab', code: 'OS-LAB', department: 'CSE', semester: '1-2', type: FeedbackType.LAB },
  { id: 'FSD1-LAB', name: 'Full Stack Development-I Lab', code: 'FSD1-LAB', department: 'CSE', semester: '1-2', type: FeedbackType.LAB },
  { id: 'DWDM-LAB', name: 'DWDM Lab', code: 'DWDM-LAB', department: 'CSE', semester: '3-1', type: FeedbackType.LAB },
  { id: 'CN-LAB', name: 'CN Lab', code: 'CN-LAB', department: 'CSE', semester: '3-1', type: FeedbackType.LAB },
  { id: 'FSD2-LAB', name: 'Full Stack Development-II Lab', code: 'FSD2-LAB', department: 'CSE', semester: '3-1', type: FeedbackType.LAB },
  { id: 'UI-LAB', name: 'UI Design using Flutter Lab', code: 'UI-LAB', department: 'CSE', semester: '3-1', type: FeedbackType.LAB },
  { id: 'CC-LAB', name: 'Cloud Computing Lab', code: 'CC-LAB', department: 'CSE', semester: '3-2', type: FeedbackType.LAB },
  { id: 'CNS-LAB', name: 'CNS Lab', code: 'CNS-LAB', department: 'CSE', semester: '3-2', type: FeedbackType.LAB },
  { id: 'DL-LAB', name: 'Deep Learning with Python Lab', code: 'DL-LAB', department: 'CSE', semester: '4-1', type: FeedbackType.LAB },
  { id: 'DTI-LAB', name: 'Design Thinking & Innovation Lab', code: 'DTI-LAB', department: 'CSE', semester: '4-1', type: FeedbackType.LAB },
  { id: 'TWIPR', name: 'Technical Writing & IPR', code: 'TWIPR', department: 'CSE', semester: '4-1', type: FeedbackType.THEORY },
];

export const FACULTY_DATA: Faculty[] = [
  { id: 'F0001', name: 'Dr. N. Murali Krishna', department: 'FED', subjects: ['CE'], designation: 'Professor' },
  { id: 'F0002', name: 'Dr. A. Padmaja', department: 'FED', subjects: ['CE'], designation: 'Professor' },
  { id: 'F0003', name: 'Mr. G. Praveen', department: 'FED', subjects: ['CE'], designation: 'Assistant Professor' },
  { id: 'F0004', name: 'Ms. P. Farzeena Khanum', department: 'FED', subjects: ['CE'], designation: 'Assistant Professor' },
  { id: 'F0005', name: 'Ms. B. Ranga Nagavalli', department: 'FED', subjects: ['CE', 'CE-LAB'], designation: 'Assistant Professor' },
  { id: 'F0006', name: 'Ms. Theresamma Paul', department: 'FED', subjects: ['CE', 'CE-LAB'], designation: 'Assistant Professor' },
  { id: 'F0007', name: 'Mr. B.V. Rama Krishna Rao', department: 'FED', subjects: ['LA&C'], designation: 'Assistant Professor' },
  { id: 'F0008', name: 'Ms. S. Kalpana', department: 'FED', subjects: ['LA&C'], designation: 'Assistant Professor' },
  { id: 'F0009', name: 'Ms. S. Suman', department: 'FED', subjects: ['LA&C'], designation: 'Assistant Professor' },
  { id: 'F0010', name: 'Ms. V. Prasanthi', department: 'FED', subjects: ['LA&C'], designation: 'Assistant Professor' },
  { id: 'F0011', name: 'Mr. K. Basava Raju', department: 'FED', subjects: ['LA&C'], designation: 'Assistant Professor' },
  { id: 'F0012', name: 'Ms. G. Koteswaramma', department: 'FED', subjects: ['LA&C'], designation: 'Assistant Professor' },
  { id: 'F0013', name: 'Ms. T. Prasanna', department: 'FED', subjects: ['LA&C'], designation: 'Assistant Professor' },
  { id: 'F0014', name: 'Ms. V.V.M. Sri Vidya', department: 'FED', subjects: ['LA&C'], designation: 'Assistant Professor' },
  { id: 'F0015', name: 'Ms. N. Gayatri Devi', department: 'FED', subjects: ['LA&C'], designation: 'Assistant Professor' },
  { id: 'F0016', name: 'Ms. M. Ramanjani Devi', department: 'FED', subjects: ['P&S'], designation: 'Assistant Professor' },
  { id: 'F0017', name: 'Dr. J. Ashok', department: 'FED', subjects: ['EP', 'EP-LAB', 'DLT'], designation: 'Associate Professor' },
  { id: 'F0018', name: 'Ms. M. Vidya Elizabeth', department: 'FED', subjects: ['EP'], designation: 'Assistant Professor' },
  { id: 'F0019', name: 'Ms. N. Srilakshmi Prasanna Sai', department: 'FED', subjects: ['EP'], designation: 'Assistant Professor' },
  { id: 'F0020', name: 'Mr. D. Srikanth', department: 'FED', subjects: ['EP', 'EP-LAB'], designation: 'Assistant Professor' },
  { id: 'F0021', name: 'Dr. B. Sowjanya', department: 'FED', subjects: ['CE'], designation: 'Associate Professor' },
  { id: 'F0022', name: 'Mr. L. Nagaraju', department: 'FED', subjects: ['CE'], designation: 'Assistant Professor' },
  { id: 'F0023', name: 'Ms. J. Sucharitha', department: 'FED', subjects: ['CE'], designation: 'Assistant Professor' },
  { id: 'F0024', name: 'Dr. G. Dilli Rani', department: 'FED', subjects: ['CE'], designation: 'Associate Professor' },
  { id: 'F0025', name: 'Ms. P. Chandrakala', department: 'FED', subjects: ['CE', 'CE-LAB'], designation: 'Assistant Professor' },
  { id: 'F0026', name: 'Mr. A. Anjaneyulu', department: 'FED', subjects: ['LA&C', 'P&S'], designation: 'Assistant Professor' },
  { id: 'F0027', name: 'Mr. A. Saradhi', department: 'FED', subjects: ['EP', 'EP-LAB'], designation: 'Assistant Professor' },
  { id: 'F0028', name: 'Dr. P. Srinivas', department: 'CSE', subjects: ['DWDM', 'DWDM-LAB', 'DBMS-LAB', 'TWIPR'], designation: 'Professor' },
  { id: 'F0029', name: 'D.V. Subba Rao', department: 'CSE', subjects: ['CN', 'CN-LAB', 'DBMS-LAB'], designation: 'Assistant Professor' },
  { id: 'F0030', name: 'K. Krupa', department: 'CSE', subjects: ['FLAT', 'CD', 'FSD1-LAB'], designation: 'Assistant Professor' },
  { id: 'F0031', name: 'K. Rajyaguru Sai Sri', department: 'CSE', subjects: ['OOAD', 'OS', 'OS-LAB'], designation: 'Assistant Professor' },
  { id: 'F0032', name: 'U. Tanoj', department: 'MBA', subjects: ['EPS'], designation: 'Assistant Professor' },
  { id: 'F0033', name: 'B. Ramya', department: 'CSE', subjects: ['DWDM-LAB', 'CN-LAB', 'DBMS', 'DBMS-LAB'], designation: 'Assistant Professor' },
  { id: 'F0034', name: 'Ch. Pavani', department: 'CSE', subjects: ['FSD2-LAB', 'CC', 'CC-LAB'], designation: 'Assistant Professor' },
  { id: 'F0035', name: 'K. Jairam', department: 'CSE', subjects: ['FSD2-LAB', 'UI-LAB', 'CNS', 'CNS-LAB'], designation: 'Assistant Professor' },
  { id: 'F0036', name: 'Dr. K. Chaitanya', department: 'CSE', subjects: ['DLT', 'ML', 'DTI-LAB'], designation: 'Associate Professor' },
  { id: 'F0037', name: 'Dr. A. Radhika', department: 'CSE', subjects: ['BCT', 'CNS', 'CNS-LAB'], designation: 'Associate Professor' },
  { id: 'F0038', name: 'G. Sri Harsha', department: 'EEE', subjects: ['FEV'], designation: 'Assistant Professor' },
  { id: 'F0039', name: 'M.V. Annapurna', department: 'ECE', subjects: ['DC'], designation: 'Assistant Professor' },
  { id: 'F0040', name: 'Ch. Pratyusha', department: 'FED', subjects: ['UHV2'], designation: 'Assistant Professor' },
  { id: 'F0041', name: 'Ch. Ambedkar', department: 'CSE', subjects: ['SE', 'SPM', 'OS-LAB'], designation: 'Assistant Professor' },
  { id: 'F0042', name: 'N. Safalya', department: 'FED', subjects: ['MEFA'], designation: 'Assistant Professor' },
  { id: 'F0043', name: 'G. Srilalitha', department: 'FED', subjects: ['MEFA'], designation: 'Assistant Professor' },
  { id: 'F0044', name: 'Jyosthsingh', department: 'CSE', subjects: ['IP', 'CP-LAB'], designation: 'Assistant Professor' },
  { id: 'F0045', name: 'Ch. Rajesh', department: 'CSE', subjects: ['DM'], designation: 'Assistant Professor' },
  { id: 'F0046', name: 'S. Naga Raju', department: 'CSE', subjects: ['DM'], designation: 'Assistant Professor' },
  { id: 'F0047', name: 'Dr. K. Srinivas', department: 'AIML', subjects: ['AIML-NN', 'AIML-NLP'], designation: 'Professor' },
  { id: 'F0048', name: 'Dr. M. Ravi', department: 'MECH', subjects: ['MECH-TD', 'MECH-DOM'], designation: 'Professor' },
  { id: 'F0050', name: 'Mr. B. Suresh', department: 'CSM', subjects: ['CSM-AI', 'CSM-ML', 'CSM-DA'], designation: 'Assistant Professor' },
  { id: 'F0051', name: 'Ms. K. Deepthi', department: 'CSD', subjects: ['CSD-UI', 'CSD-UX', 'CSD-WD'], designation: 'Assistant Professor' },
  { id: 'F0052', name: 'Mr. P. Vamsi', department: 'AIDS', subjects: ['AIDS-DS', 'AIDS-BDA', 'AIDS-DV'], designation: 'Assistant Professor' },
  { id: 'F0053', name: 'Ms. R. Swathi', department: 'IT', subjects: ['IT-WT', 'IT-IS', 'IT-MC'], designation: 'Assistant Professor' },
  { id: 'F0054', name: 'Mr. T. Kishore', department: 'CIVIL', subjects: ['CIVIL-SA', 'CIVIL-GE', 'CIVIL-TE'], designation: 'Assistant Professor' },
  { id: 'F0055', name: 'Dr. N. Baskar', department: 'MTECH', subjects: ['MTECH-ADS'], designation: 'Professor' },
  { id: 'F0056', name: 'Mr. K. Venkatesh', department: 'MECH', subjects: ['BCME', 'EWS-LAB', 'MECH-TD'], designation: 'Assistant Professor' },
  { id: 'F0057', name: 'Mr. P. Satish', department: 'MECH', subjects: ['EG', 'MECH-DOM'], designation: 'Assistant Professor' },
  { id: 'F0058', name: 'Mr. M. Srinivasa Rao', department: 'EEE', subjects: ['BEEE', 'BEEE-LAB'], designation: 'Assistant Professor' },
  { id: 'F0059', name: 'Dr. K. Srinivas', department: 'AIML', subjects: ['AIML-NN', 'AIML-NLP', 'AIML-CV'], designation: 'Professor' },
  { id: 'F0060', name: 'Mr. R. Prasad', department: 'MECH', subjects: ['MECH-MT'], designation: 'Assistant Professor' },
];

export const THEORY_METRICS = [
  'Faculty comes to class on time',
  'Faculty comes well prepared in the subject',
  'Faculty speaks clearly and audibly',
  'Faculty writes and draws legibly',
  'Faculty explains with examples clearly',
  'Faculty asks relevant questions for interaction',
  'Faculty is regular and maintains discipline',
  'Faculty covers the syllabus at appropriate pace',
  'Faculty communicates efficiently',
  'Faculty Evaluates the scripts fair and impartial'
];

export const LAB_METRICS = [
  'Are you satisfied with your batch Size?',
  'Are the experiments conducted as per schedule?',
  'Are the equipments sufficient?',
  'Are the Equipment in working condition?',
  'Are the Consumables in Good Quality?',
  'Are the experiments conducted as per norms?',
  'Is the lab manual provided complete and informative?',
  'Whether the lab technician is assisting you?',
  'Whether the faculty is explaining the experiment?',
  'Overall satisfaction with the Lab Facility'
];

export const SOLIDITY_CONTRACT_CODE = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SRKInstituteFeedback {
    enum Role { STUDENT, FACULTY, HOD, ADMIN }
    
    struct User {
        string fullName;
        Role role;
        string department;
        bool isAuthorized;
    }

    mapping(address => User) public users;
    
    modifier onlyAuthorizedHOD(string memory dept) {
        require(users[msg.sender].role == Role.HOD, "Not an HOD");
        require(users[msg.sender].isAuthorized, "HOD not authorized");
        require(keccak256(abi.encodePacked(users[msg.sender].department)) == keccak256(abi.encodePacked(dept)), "Dept Lock");
        _;
    }
}
`;
