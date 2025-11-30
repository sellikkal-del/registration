import express from 'express';
import bodyParser from 'body-parser';
import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

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
    return {
      ...reg,
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

// Admin: Import Excel data
app.post('/api/admin/import', (req, res) => {
  const { attendeesData, workshopsData } = req.body;
  
  try {
    const db = readDB();
    
    // Process workshops
    const workshops = workshopsData.map((w, index) => ({
      id: w.id || `workshop_${index + 1}`,
      name: w.name,
      description: w.description || '',
      capacity: parseInt(w.capacity) || 30
    }));

    // Process attendees
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
        email: a.email.toLowerCase(),
        name: a.name || '',
        workshopOptions: workshopOptions
      };
    });

    db.workshops = workshops;
    db.attendees = attendees;
    writeDB(db);

    res.json({ 
      success: true, 
      message: `Imported ${attendees.length} attendees and ${workshops.length} workshops.` 
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
