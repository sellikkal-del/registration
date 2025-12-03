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

  // Get available workshops for this attendee
  const availableWorkshops = db.workshops
    .filter(w => attendee.workshopOptions.includes(w.id))
    .map(w => {
      const registrationCount = db.registrations.filter(r => r.workshopId === w.id).length;
      const spotsLeft = w.capacity - registrationCount;
      return {
        id: w.id,
        name: w.name,
        title: w.title || w.name,
        description: w.description || '',
        modules: w.modules || '',
        originalColumn: w.originalColumn || '',
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

// Submit multiple registrations
app.post('/api/register-multiple', (req, res) => {
  const { email, workshopIds } = req.body;
  const db = readDB();
  
  // Validate attendee
  const attendee = db.attendees.find(a => a.email.toLowerCase() === email.toLowerCase());
  if (!attendee) {
    return res.json({ success: false, message: 'Email not found.' });
  }

  if (!workshopIds || workshopIds.length === 0) {
    return res.json({ success: false, message: 'No workshops selected.' });
  }

  const successfulRegistrations = [];
  const failedRegistrations = [];

  // Process each workshop
  for (const workshopId of workshopIds) {
    const workshop = db.workshops.find(w => w.id === workshopId);
    
    if (!workshop) {
      failedRegistrations.push({ workshopId, reason: 'Workshop not found' });
      continue;
    }

    // Check if workshop is in attendee's options
    if (!attendee.workshopOptions.includes(workshopId)) {
      failedRegistrations.push({ workshopId, reason: 'Not available for your email' });
      continue;
    }

    // Check capacity
    const registrationCount = db.registrations.filter(r => r.workshopId === workshopId).length;
    if (registrationCount >= workshop.capacity) {
      failedRegistrations.push({ workshopId, reason: 'Workshop is full' });
      continue;
    }

    // Check if already registered for this workshop
    const alreadyRegistered = db.registrations.find(
      r => r.email.toLowerCase() === email.toLowerCase() && r.workshopId === workshopId
    );
    if (alreadyRegistered) {
      failedRegistrations.push({ workshopId, reason: 'Already registered' });
      continue;
    }

    // Create registration
    const registration = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: email.toLowerCase(),
      workshopId: workshopId,
      workshopName: workshop.name,
      registeredAt: new Date().toISOString()
    };

    db.registrations.push(registration);
    successfulRegistrations.push(workshop.name);
  }

  writeDB(db);

  if (successfulRegistrations.length > 0) {
    res.json({ 
      success: true, 
      message: `Successfully registered for ${successfulRegistrations.length} workshop(s)!`,
      registeredWorkshops: successfulRegistrations,
      failedWorkshops: failedRegistrations
    });
  } else {
    res.json({ 
      success: false, 
      message: 'Failed to register for any workshops.',
      failedWorkshops: failedRegistrations
    });
  }
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

// Workshop name mapping for new structure - Option1-14 (each date option is separate)
const workshopOptionsMapping = {
  'Option1': {
    title: 'برنامج جاهزية أعضاء مجلس الإدارة – اللغة الإنجليزية ( 11 يوم غير متتالية)',
    description: 'الخيار الأول',
    modules: [
      'المحور الأول: دور الأعضاء  ومجلس الإدارة - 13- 14 يناير',
      'المحور الثاني: الاستراتيجية لأعضاء مجلس الإدارة - 27-29 يناير',
      'المحور الثالث: القيادة لأعضاء مجلس الإدارة - 4-5 فبراير',
      'المحور الرابع: المالية لأعضاء مجلس الإدارة غير الماليين - 9-12 فبراير'
    ]
  },
  'Option2': {
    title: 'برنامج جاهزية أعضاء مجلس الإدارة – اللغة الإنجليزية ( 11 يوم غير متتالية)',
    description: 'الخيار الثاني',
    modules: [
      'المحور الأول: دور الأعضاء  ومجلس الإدارة - 14-15 أبريل',
      'المحور الثاني: الاستراتيجية لأعضاء مجلس الإدارة -28-30  أبريل',
      'المحور الثالث: القيادة لأعضاء مجلس الإدارة - 10-11 مايو',
      'المحور الرابع: المالية لأعضاء مجلس الإدارة غير الماليين - 18 -21 مايو'
    ]
  },
  'Option3': {
    title: 'برنامج جاهزية أعضاء مجلس الإدارة – اللغة العربية ( 10 أيام غير متتالية)',
    description: 'الخيار الأول',
    modules: [
      'المحور الأول: أسس الحوكمة والأدوار والمسؤوليات - 19-21 أبريل',
      'المحور الثاني: الرقابة الإستراتيجية - 3-4 مايو',
      'المحور الثالث: الإشراف على المخاطر وأخلاقيات العمل المؤسسية - 10-11 مايو',
      'المحور الرابع: المعلومات، الهيكلية، الجدولة، وجودة اتخاذ القرار - 12 مايو',
      'المحور الخامس: الإشراف المالي والرقابي - 17-18 مايو'
    ]
  },
  'Option4': {
    title: 'برنامج جاهزية أعضاء مجلس الإدارة – اللغة العربية ( 10 أيام غير متتالية)',
    description: 'الخيار الثاني',
    modules: [
      'المحور الأول: أسس الحوكمة والأدوار والمسؤوليات - 7-9 يونيو',
      'المحور الثاني: الرقابة الإستراتيجية - 14-15 يونيو',
      'المحور الثالث: الإشراف على المخاطر وأخلاقيات العمل المؤسسية - 23-24 يونيو',
      'المحور الرابع: المعلومات، الهيكلية، الجدولة، وجودة اتخاذ القرار - 25 يونيو',
      'المحور الخامس: الإشراف المالي والرقابي - 29-30 يونيو'
    ]
  },
  'Option5': {
    title: 'أعضاء مجلس الإدارة المتقدم – اللغة الإنجليزية (4 أيام متتالية)',
    description: 'الخيار الأول',
    modules: [
      'المحور الأول: دعم عملية اتخاذ القرار الاستراتيجي - 6 أبريل',
      'المحور الثاني: الاستراتيجية لأعضاء مجلس الإدارة - 7 أبريل',
      'المحور الثالث: القيادة لأعضاء مجلس الإدارة - 8-9 أبريل'
    ]
  },
  'Option6': {
    title: 'أعضاء مجلس الإدارة المتقدم – اللغة الإنجليزية (4 أيام متتالية)',
    description: 'الخيار الثاني',
    modules: [
      'المحور الأول: دعم عملية اتخاذ القرار الاستراتيجي - 8 يونيو',
      'المحور الثاني: الاستراتيجية لأعضاء مجلس الإدارة - 9 يونيو',
      'المحور الثالث: القيادة لأعضاء مجلس الإدارة - 10-11 يونيو'
    ]
  },
  'Option7': {
    title: 'برنامج لجنة الإستثمار – اللغة العربية والإنجليزية (يومان)',
    description: 'الخيار الأول : 22-23 أبريل',
    modules: []
  },
  'Option8': {
    title: 'برنامج لجنة الإستثمار – اللغة العربية والإنجليزية (يومان)',
    description: 'الخيار الثاني : 17-18 يونيو',
    modules: []
  },
  'Option9': {
    title: 'برنامج لجنة الترشيحات والمكافآت – اللغة العربية والإنجليزية (يومان)',
    description: 'الخيار الأول : 29-30 مارس',
    modules: []
  },
  'Option10': {
    title: 'برنامج لجنة الترشيحات والمكافآت – اللغة العربية والإنجليزية (يومان)',
    description: 'الخيار الثاني : 6-7 مايو',
    modules: []
  },
  'Option11': {
    title: 'برنامج لجنة الحوكمة والمخاطر والإمتثال – اللغة العربية والإنجليزية (يومان)',
    description: 'الخيار الأول : 12-13 أبريل',
    modules: []
  },
  'Option12': {
    title: 'برنامج لجنة الحوكمة والمخاطر والإمتثال – اللغة العربية والإنجليزية (يومان)',
    description: 'الخيار الثاني : 13-14 مايو',
    modules: []
  },
  'Option13': {
    title: 'برنامج لجنة المراجعة – اللغة العربية والإنجليزية (يومان)',
    description: 'الخيار الأول : 1-2 أبريل',
    modules: []
  },
  'Option14': {
    title: 'برنامج لجنة المراجعة – اللغة العربية والإنجليزية (يومان)',
    description: 'الخيار الثاني : 21-22 يونيو',
    modules: []
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
        col !== 'Name' && col !== 'Email' && col !== 'Dates' && col !== 'Emails'
      );
      
      // Create workshops from column headers
      const workshops = [];
      let workshopIndex = 1;
      
      workshopColumns.forEach((columnName) => {
        const cleanColumnName = columnName.replace(/\r?\n/g, ' ').trim();
        
        // Check if this is a mapped Option
        if (workshopOptionsMapping[cleanColumnName]) {
          const optionData = workshopOptionsMapping[cleanColumnName];
          
          // Create workshop with title, description, and modules
          const fullWorkshopName = `${optionData.title} - ${optionData.description}`;
          const moduleDescription = optionData.modules.length > 0 
            ? optionData.modules.join(' | ') 
            : '';
          
          workshops.push({
            id: `workshop_${workshopIndex}`,
            name: fullWorkshopName,
            title: optionData.title,
            description: optionData.description,
            modules: moduleDescription,
            capacity: parseInt(workshopCapacities[columnName]) || 30,
            originalColumn: cleanColumnName
          });
          workshopIndex++;
        } else {
          // For unmapped columns, use column name as-is
          workshops.push({
            id: `workshop_${workshopIndex}`,
            name: cleanColumnName,
            title: cleanColumnName,
            description: '',
            modules: '',
            capacity: parseInt(workshopCapacities[columnName]) || 30,
            originalColumn: cleanColumnName
          });
          workshopIndex++;
        }
      });

      // Process attendees - each row is one attendee
      const attendees = data.map((row, index) => {
        const workshopOptions = [];
        let currentWorkshopIndex = 1;
        
        // Find which workshops this attendee can choose (where value is "Yes")
        workshopColumns.forEach((columnName) => {
          const cleanColumnName = columnName.replace(/\r?\n/g, ' ').trim();
          const value = row[columnName];
          
          if (value === 'Yes' || value === 'yes' || value === 'YES') {
            workshopOptions.push(`workshop_${currentWorkshopIndex}`);
          }
          currentWorkshopIndex++;
        });

        return {
          id: `attendee_${index + 1}`,
          email: (row.Email || row.Emails || '').toLowerCase().trim(),
          name: row.Name || row.Dates || '',
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

// Admin: Clear ALL data (workshops, attendees, registrations)
app.post('/api/admin/clear-all-data', (req, res) => {
  const db = readDB();
  db.workshops = [];
  db.attendees = [];
  db.registrations = [];
  writeDB(db);
  res.json({ success: true, message: 'All data cleared successfully. Database is now empty.' });
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
