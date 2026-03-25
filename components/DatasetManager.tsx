
import React, { useState, useRef } from 'react';
import { Database, Zap, FileText, RefreshCw, AlertTriangle, Plus, FileType, AlertCircle } from 'lucide-react';
import { Department, Faculty, Subject, FeedbackType, Semester } from '../types';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

interface DatasetManagerProps {
  theoryQuestions: Record<Department, string[]>;
  labQuestions: Record<Department, string[]>;
  onUpdateQuestions: (type: 'THEORY' | 'LAB', questions: string[]) => void;
  onBulkSync: (payload: { faculties: Faculty[], subjects: Subject[], students: any[] }) => void;
}

const DatasetManager: React.FC<DatasetManagerProps> = ({ 
  theoryQuestions, 
  labQuestions, 
  onUpdateQuestions,
  onBulkSync
}) => {
  const [rawData, setRawData] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mapCSVToInternal = (data: any[]) => {
    const facultiesMap: Record<string, Faculty> = {};
    const subjectsMap: Record<string, Subject> = {};
    const students: any[] = [];

    data.forEach(row => {
      const type = row['RecordType'];
      const branch = (row['Branch'] || 'CSE') as Department;
      const semester = (row['Semester'] || '1-1') as Semester;

      if (type === 'Faculty') {
        const facId = row['Faculty ID'];
        const facName = row['Faculty Name'];
        const subjectName = row['Subject'];
        
        // Subject ID needs to be unique per branch/sem/name instance
        const subId = `${branch}-${semester}-${subjectName.replace(/\s+/g, '')}`;

        // Add to Subjects
        if (!subjectsMap[subId]) {
          subjectsMap[subId] = {
            id: subId,
            name: subjectName,
            code: subjectName,
            department: branch,
            semester: semester,
            type: FeedbackType.THEORY // Defaulting to Theory from CSV
          };
        }

        // Add to Faculties
        if (!facultiesMap[facId]) {
          facultiesMap[facId] = {
            id: facId,
            name: facName,
            department: branch,
            subjects: [subId],
            designation: 'Faculty Node'
          };
        } else {
          if (!facultiesMap[facId].subjects.includes(subId)) {
            facultiesMap[facId].subjects.push(subId);
          }
        }
      } else if (type === 'Student') {
        students.push({
          fullName: row['Student Name'],
          id: row['Student ID'],
          department: branch,
          semester: semester,
          year: row['Year'],
          role: 'STUDENT'
        });
      }
    });

    return {
      faculties: Object.values(facultiesMap),
      subjects: Object.values(subjectsMap),
      students: students
    };
  };

  const processFile = (file: File) => {
    setErrorMsg(null);
    const extension = file.name.split('.').pop()?.toLowerCase();

    if (extension === 'csv') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            setErrorMsg("Error parsing CSV. Check columns.");
          } else {
            const mapped = mapCSVToInternal(results.data);
            setRawData(JSON.stringify(mapped, null, 2));
          }
        }
      });
    } else if (['xlsx', 'xls'].includes(extension || '')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheet];
          const json = XLSX.utils.sheet_to_json(worksheet);
          const mapped = mapCSVToInternal(json);
          setRawData(JSON.stringify(mapped, null, 2));
        } catch {
          setErrorMsg("Error parsing Excel file.");
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      setErrorMsg("Use CSV or XLSX.");
    }
  };

  const handleSyncClick = () => {
    if (!rawData.trim()) return;
    try {
      const payload = JSON.parse(rawData);
      setIsSyncing(true);
      onBulkSync(payload);
      setTimeout(() => {
        setIsSyncing(false);
        setRawData('');
      }, 1500);
    } catch {
      setErrorMsg("Buffer Error: Invalid JSON structure.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
              <Database size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Bulk Registry Node</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Multi-Branch Intake: CSE, CSM, CSD, IT, etc.</p>
            </div>
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
          >
            <Plus size={24} />
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".csv, .xlsx, .xls" className="hidden" />
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-center gap-2 text-xs font-bold animate-in slide-in-from-top-2">
            <AlertCircle size={16} /> {errorMsg}
          </div>
        )}

        <div className="relative group transition-all">
          <textarea 
            value={rawData}
            onChange={(e) => setRawData(e.target.value)}
            placeholder="Paste raw data or upload CSV file..."
            className="w-full h-64 p-8 bg-slate-50 border-2 border-dashed rounded-[2.5rem] font-mono text-xs outline-none transition-all resize-none border-slate-200 focus:border-blue-500 focus:bg-white"
          />
          {!rawData && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-slate-300">
              <FileType size={48} className="mb-4 opacity-20" />
              <p className="font-black uppercase text-[10px] tracking-[0.3em]">Drop Dataset Here</p>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-[10px] uppercase tracking-widest bg-amber-50 px-4 py-2 rounded-xl">
            <AlertTriangle size={14} /> Extraction: Records isolated by RecordType
          </div>
          <button 
            onClick={handleSyncClick}
            disabled={isSyncing || !rawData.trim()}
            className="flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest shadow-xl disabled:opacity-50 active:scale-95 transition-all"
          >
            {isSyncing ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} />} Synchronize State
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatasetManager;
