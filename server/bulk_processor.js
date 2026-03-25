
/**
 * SRK-IT Backend Controller: Bulk Intake Node
 * Handles parsing of BTech_Students_Only_All_Branches.csv or Faculty registry files.
 */

const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.csv', '.xlsx', '.xls', '.json'].includes(ext)) cb(null, true);
    else cb(new Error('SRK Protocol: File type not supported for ledger intake.'));
  }
});

const processBulkIntake = async (req, res) => {
  try {
    const file = req.file;
    const type = req.body.type; // 'FACULTY', 'SUBJECTS', or 'STUDENTS'
    let data = [];

    if (file.mimetype === 'application/json') {
      data = JSON.parse(file.buffer.toString());
    } else {
      const workbook = xlsx.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    }

    // Mapping & Cleaning Logic
    const validatedNodes = data.map(record => {
      // Normalize Branch/Dept codes (e.g., "Computer Science" -> "CSE")
      let dept = record.Branch || record.department || 'CSE';
      if (dept.includes('Comp')) dept = 'CSE';
      
      return {
        ...record,
        department: dept,
        syncedAt: Date.now(),
        nodeId: record.id || `NODE-${Math.random().toString(36).substr(2, 9)}`
      };
    });

    // Persistent storage logic (Simulated here)
    // await db.Registry.bulkCreate(validatedNodes, { ignoreDuplicates: true });

    res.status(200).json({
      success: true,
      protocol: "SRK_LEDGER_SYNC_V4",
      count: validatedNodes.length,
      payload: validatedNodes
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { upload, processBulkIntake };
