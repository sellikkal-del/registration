import express from 'express';
import bodyParser from 'body-parser';
import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Database file paths
const DB_PATH = path.join(__dirname, 'database.json');

// Initialize database
function initDatabase() {
  if (!fs.existsSync(DB_PATH)) {
    const initialData = {
      attendees: [],
      workshops: [],
      registrations: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
  }
}

// Read database
function readDB() {
  const data = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(data);
}

// Write database
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// API Routes

// Check if email exists and get available workshops
app.post('/api/check-email', (req, res) => {
  const { email } = req.body;
  const db = readDB();
  
  const attendee = db.attendees.find(a => a.email.toLowerCase() === email.toLowerCase());
  
  if (!attendee) {
    return res.json({ 
      success: false, 
      message: 'Email not found. Please contact the administrator.' 
    });
  }

  // Check if already registered
  const existingRegistration = db.registrations.find(r => r.email.toLowerCase() === email.toLowerCase());
  if (existingRegistration) {
    const workshop = db.workshops.find(w => w.id === existingRegistration.workshopId);
    return res.json({ 
      success: false, 
      alreadyRegistered: true,
      workshop: workshop ? workshop.name : 'Unknown Workshop',
      message: `You are already registered for: ${workshop ? workshop.name : 'Unknown Workshop'}` 
    });
  }

  // Get available workshops for this attendee
  const availableWorkshops = db.workshops
    .filter(w => attendee.workshopOptions.includes(w.id))
    .map(w => {
      const registrationCount = db.registrations.filter(r => r.workshopId === w.id).length;
      const spotsLeft = w.capacity - registrationCount;
      return {
        id: w.id,
        name: w.name,
        description: w.description,
        capacity: w.capacity,
        registered: registrationCount,
        spotsLeft: spotsLeft,
        available: spotsLeft > 0
      };
    });

  res.json({ 
    success: true, 
    workshops: availableWorkshops 
  });
});

// Submit registration
app.post('/api/register', (req, res) => {
  const { email, workshopId } = req.body;
  const db = readDB();
  
  // Validate attendee
  const attendee = db.attendees.find(a => a.email.toLowerCase() === email.toLowerCase());
  if (!attendee) {
    return res.json({ success: false, message: 'Email not found.' });
  }

  // Check if already registered
  const existingRegistration = db.registrations.find(r => r.email.toLowerCase() === email.toLowerCase());
  if (existingRegistration) {
    return res.json({ success: false, message: 'You are already registered for a workshop.' });
  }

  // Validate workshop
  const workshop = db.workshops.find(w => w.id === workshopId);
  if (!workshop) {
    return res.json({ success: false, message: 'Workshop not found.' });
  }

  // Check if workshop is in attendee's options
  if (!attendee.workshopOptions.includes(workshopId)) {
    return res.json({ success: false, message: 'This workshop is not available for your email.' });
  }

  // Check capacity
  const registrationCount = db.registrations.filter(r => r.workshopId === workshopId).length;
  if (registrationCount >= workshop.capacity) {
    return res.json({ success: false, message: 'This workshop is full.' });
  }

  // Create registration
  const registration = {
    id: Date.now().toString(),
    email: email.toLowerCase(),
    workshopId: workshopId,
    workshopName: workshop.name,
    registeredAt: new Date().toISOString()
  };

  db.registrations.push(registration);
  writeDB(db);

  res.json({ 
    success: true, 
    message: `Successfully registered for ${workshop.name}!`,
    workshop: workshop.name
  });
});

// Admin: Get all registrations
app.get('/api/admin/registrations', (req, res) => {
  const db = readDB();
  
  const registrationsWithDetails = db.registrations.map(reg => {
    const workshop = db.workshops.find(w => w.id === reg.workshopId);
    const attendee = db.attendees.find(a => a.email === reg.email);
    
    return {
      ...reg,
      name: attendee ? attendee.name : 'Unknown',
      workshopName: workshop ? workshop.name : 'Unknown'
    };
  });

  res.json({ 
    success: true, 
    registrations: registrationsWithDetails,
    workshops: db.workshops.map(w => ({
      ...w,
      registered: db.registrations.filter(r => r.workshopId === w.id).length
    }))
  });
});

// Workshop name mapping for new structure from Options.xlsx
const workshopOptionsMapping = {
  'Option1': {
    main: 'برنامج جاهزية أعضاء مجلس الإدارة – اللغة الإنجليزية (11 يوم)',
    subOptions: [
      'المحور الأول: دور الأعضاء ومجلس الإدارة - 13-14 يناير',
      'المحور الثاني: الاستراتيجية لأعضاء مجلس الإدارة - 27-29 يناير',
      'المحور الثالث: القيادة لأعضاء مجلس الإدارة - 4-5 فبراير',
      'المحور الرابع: المالية لأعضاء مجلس الإدارة غير الماليين - 9-12 فبراير'
    ]
  },
  'Option2': {
    main: 'برنامج جاهزية أعضاء مجلس الإدارة – اللغة الإنجليزية (11 يوم)',
    subOptions: [
      'المحور الأول: دور الأعضاء ومجلس الإدارة - 14-15 أبريل',
      'المحور الثاني: الاستراتيجية لأعضاء مجلس الإدارة - 28-30 أبريل',
      'المحور الثالث: القيادة لأعضاء مجلس الإدارة - 10-11 مايو',
      'المحور الرابع: المالية لأعضاء مجلس الإدارة غير الماليين - 18-21 مايو'
    ]
  },
  'Option3': {
    main: 'برنامج لجنة الترشيحات والمكافآت – اللغة العربية والإنجليزية (يومان)',
    subOptions: [
      'الخيار الأول: 29-30 مارس',
      'الخيار الثاني: 6-7 مايو'
    ]
  }
};

// Admin: Import Excel data
app.post('/api/admin/import', (req, res) => {
  const { data, workshopCapacities, workshopsData, attendeesData } = req.body;
  
  try {
    const db = readDB();
    
    // Method 1: Single file with auto-detected workshops
    if (data && workshopCapacities) {
      // Extract workshop names from column headers (skip Name and Email columns)
      const workshopColumns = Object.keys(data[0] || {}).filter(col => 
        col !== 'Name' && col !== 'Email'
      );
      
      // Create workshops from Options.xlsx structure
      const workshops = [];
      let workshopIndex = 1;
      
      workshopColumns.forEach((columnName) => {
        const cleanColumnName = columnName.replace(/\r?\n/g, ' ').trim();
        
        // Check if this is an Option column (Option1, Option2, Option3, etc.)
        if (workshopOptionsMapping[cleanColumnName]) {
          const optionData = workshopOptionsMapping[cleanColumnName];
          
          // Create one workshop for this option (since it's "One Radio Button")
          // Combine main label with all sub-options as description
          const fullDescription = optionData.subOptions.join(' | ');
          
          workshops.push({
            id: `workshop_${workshopIndex}`,
            name: optionData.main,
            description: fullDescription,
            capacity: parseInt(workshopCapacities[columnName]) || 30,
            subOptions: optionData.subOptions,
            originalColumn: cleanColumnName
          });
          workshopIndex++;
        } else {
          // For unmapped columns, use column name as-is
          workshops.push({
            id: `workshop_${workshopIndex}`,
            name: cleanColumnName,
            description: '',
            capacity: parseInt(workshopCapacities[columnName]) || 30,
            subOptions: [],
            originalColumn: cleanColumnName
          });
          workshopIndex++;
        }
      });

      // Process attendees - each row is one attendee
      const attendees = data.map((row, index) => {
        const workshopOptions = [];
        
        // Find which workshops this attendee can choose (where value is "Yes")
        workshopColumns.forEach((columnName, columnIndex) => {
          const value = row[columnName];
          
          if (value === 'Yes' || value === 'yes' || value === 'YES') {
            workshopOptions.push(`workshop_${columnIndex + 1}`);
          }
        });

        return {
          id: `attendee_${index + 1}`,
          email: (row.Email || '').toLowerCase().trim(),
          name: row.Name || '',
          workshopOptions: workshopOptions
        };
      }).filter(a => a.email); // Only include rows with email

      db.workshops = workshops;
      db.attendees = attendees;
      writeDB(db);

      return res.json({ 
        success: true, 
        message: `Imported ${attendees.length} attendees and ${workshops.length} workshops.` 
      });
    }
    
    // Method 2: Separate files - Workshops only
    if (workshopsData && workshopsData.length > 0 && (!attendeesData || attendeesData.length === 0)) {
      const workshops = workshopsData.map((w, index) => ({
        id: w.id || `workshop_${index + 1}`,
        name: w.name,
        description: w.description || '',
        capacity: parseInt(w.capacity) || 30
      }));

      db.workshops = workshops;
      writeDB(db);

      return res.json({ 
        success: true, 
        message: `Imported ${workshops.length} workshops.` 
      });
    }
    
    // Method 2: Separate files - Attendees only
    if (attendeesData && attendeesData.length > 0) {
      const attendees = attendeesData.map((a, index) => {
        // Parse workshop options - can be comma-separated or array
        let workshopOptions = [];
        if (typeof a.workshopOptions === 'string') {
          workshopOptions = a.workshopOptions.split(',').map(s => s.trim());
        } else if (Array.isArray(a.workshopOptions)) {
          workshopOptions = a.workshopOptions;
        }

        return {
          id: a.id || `attendee_${index + 1}`,
          email: (a.email || '').toLowerCase().trim(),
          name: a.name || '',
          workshopOptions: workshopOptions
        };
      }).filter(a => a.email);

      // Keep existing workshops, only update attendees
      db.attendees = attendees;
      writeDB(db);

      return res.json({ 
        success: true, 
        message: `Imported ${attendees.length} attendees.` 
      });
    }
    
    return res.json({ 
      success: false, 
      message: 'Invalid import data format.' 
    });
    
  } catch (error) {
    res.json({ 
      success: false, 
      message: 'Error importing data: ' + error.message 
    });
  }
});

// Admin: Clear all registrations (keep attendees and workshops)
app.post('/api/admin/clear-registrations', (req, res) => {
  const db = readDB();
  db.registrations = [];
  writeDB(db);
  res.json({ success: true, message: 'All registrations cleared.' });
});

// Admin: Get statistics
app.get('/api/admin/stats', (req, res) => {
  const db = readDB();
  
  const stats = {
    totalAttendees: db.attendees.length,
    totalWorkshops: db.workshops.length,
    totalRegistrations: db.registrations.length,
    registrationRate: db.attendees.length > 0 
      ? ((db.registrations.length / db.attendees.length) * 100).toFixed(1) 
      : 0
  };

  res.json({ success: true, stats });
});

// Initialize database on startup
initDatabase();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin.html`);
  console.log(`Registration form: http://localhost:${PORT}/index.html`);
});
