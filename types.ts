
export enum FeedbackType {
  THEORY = 'THEORY',
  LAB = 'LAB'
}

export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
  FACULTY = 'FACULTY',
  HOD = 'HOD'
}

export type Department = 'CSE' | 'CSM' | 'CSD' | 'AIML' | 'AIDS' | 'ECE' | 'EEE' | 'IT' | 'CIVIL' | 'MECH' | 'MBA' | 'MTECH' | 'FED';
export type Semester = '1-1' | '1-2' | '2-1' | '2-2' | '3-1' | '3-2' | '4-1' | '4-2';

export interface Subject {
  id: string;
  name: string;
  code: string;
  department: Department;
  semester: Semester;
  type: FeedbackType;
}

export interface Faculty {
  id: string;
  name: string;
  department: Department;
  subjects: string[];
  designation?: string;
  currentRating?: number;
  previousRating?: number;
}

export interface ArchiveRecord {
  sessionId: string;
  year: string;
  facultyId: string;
  dept: Department;
  avgRating: number;
  semester: Semester;
}

export interface User {
  fullName: string;
  email: string;
  role: UserRole;
  department?: Department;
  semester?: Semester;
  facultyId?: string;
  isAuthorized?: boolean; 
  registrationNo?: string;
}

export interface FeedbackEntry {
  id: string;
  type: FeedbackType;
  facultyId: string;
  subjectId: string;
  department: Department;
  semester: Semester;
  data: Record<number, number>;
  timestamp: number;
}

export interface AdminFeedbackRecord extends FeedbackEntry {
  studentHash: string;
  encryptedHash: string;
}
