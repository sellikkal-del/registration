# Workshop Registration System - Installation Guide

## 📦 What You've Got

A complete workshop registration system with:
- User registration form with email validation
- Dynamic workshop selection based on pre-imported data
- Capacity management with real-time availability
- Admin panel for data import and registration monitoring
- Excel import/export functionality
- Server-side data storage (not browser-based)

## 🚀 Installation Steps

### 1. Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### 2. Extract and Install

```bash
# Navigate to the project directory
cd workshop-registration

# Install dependencies
npm install

# Generate sample data (optional, for testing)
node generate-sample-data.js
```

### 3. Start the Server

```bash
node server.js
```

You'll see:
```
Server running on http://localhost:3000
Admin panel: http://localhost:3000/admin.html
Registration form: http://localhost:3000/index.html
```

## 📊 Using the System

### Admin Workflow

1. **Open Admin Panel**
   - Go to: http://localhost:3000/admin.html

2. **Import Your Data**
   - Option A: Use the sample file `sample-workshop-data.xlsx` (great for testing)
   - Option B: Download the template and fill with your data
   - Option C: Create your own Excel file with two sheets:

   **Attendees Sheet:**
   ```
   email                | name          | workshopOptions
   alice@example.com   | Alice Johnson | workshop_1,workshop_2
   bob@example.com     | Bob Smith     | workshop_1,workshop_3
   ```

   **Workshops Sheet:**
   ```
   id          | name                  | description              | capacity
   workshop_1  | Web Development       | Learn HTML, CSS, JS      | 30
   workshop_2  | Data Science          | Python and ML            | 25
   ```

3. **Upload the File**
   - Drag & drop the Excel file OR click "Choose Excel File"
   - Click "Import Data"
   - See statistics update automatically

4. **Monitor Registrations**
   - View real-time registration data
   - Check workshop capacity and availability
   - See who registered for which workshop

### User Workflow

1. **Access Registration Form**
   - Go to: http://localhost:3000/index.html

2. **Enter Email**
   - Must be one of the imported attendee emails
   - System validates against the database

3. **Select Workshop**
   - See only workshops available to you
   - View spots remaining for each workshop
   - Full workshops are disabled

4. **Complete Registration**
   - Click "Register"
   - Get instant confirmation
   - Can only register once

## 🎯 Key Features

### Smart Email Validation
- Only pre-imported emails can register
- Prevents unauthorized registrations
- Shows personalized workshop options

### Capacity Management
- Each workshop has a configurable limit
- Real-time capacity checking
- Automatic full-workshop detection

### One Registration Per Person
- System prevents double registration
- Shows existing registration if user tries again

### Admin Dashboard
- Live statistics (attendees, workshops, registrations, rate)
- Complete registration list with timestamps
- Workshop overview with capacity tracking
- Import/export Excel functionality

## 📁 File Structure

```
workshop-registration/
├── server.js                    # Backend server
├── package.json                 # Dependencies
├── database.json               # Data storage (auto-created)
├── public/
│   ├── index.html              # User registration form
│   └── admin.html              # Admin panel
├── sample-workshop-data.xlsx   # Sample data
├── generate-sample-data.js     # Sample data generator
├── README.md                   # Full documentation
└── QUICKSTART.md              # Quick start guide
```

## 🔧 Configuration

### Change Port
Edit `server.js` line 10:
```javascript
const PORT = 3000; // Change to your preferred port
```

### Database Location
Data is stored in `database.json` in the project root. This file is created automatically on first run.

## 📝 Excel File Requirements

### Attendees Sheet Columns (Required)
- `email` - Attendee email address (required, unique)
- `name` - Full name (optional)
- `workshopOptions` - Comma-separated workshop IDs (required)
  - Example: `workshop_1,workshop_2,workshop_3`

### Workshops Sheet Columns (Required)
- `id` - Unique workshop identifier (required)
- `name` - Workshop name (required)
- `description` - Brief description (optional)
- `capacity` - Maximum participants (required, number)

## 🧪 Testing with Sample Data

The included `sample-workshop-data.xlsx` has:
- 5 attendees with various workshop options
- 3 workshops with different capacities

Test emails:
- alice@example.com (Web Dev, Data Science)
- bob@example.com (Web Dev, UI/UX)
- charlie@example.com (Data Science, UI/UX)
- diana@example.com (All workshops)
- eve@example.com (Web Dev only)

## 🔒 Security Notes

**This is a development version.** For production:

1. Add authentication to admin panel
2. Use environment variables for configuration
3. Implement rate limiting
4. Use HTTPS
5. Replace JSON storage with a real database (PostgreSQL, MySQL, MongoDB)
6. Add input validation and sanitization
7. Implement CSRF protection
8. Add logging and monitoring

## 🐛 Troubleshooting

**Issue**: "Email not found"
**Solution**: Import attendee data first via admin panel

**Issue**: "Workshop is full"
**Solution**: Check capacity in Excel or increase it

**Issue**: Can't import Excel file
**Solution**: Ensure file has "Attendees" and "Workshops" sheets with correct columns

**Issue**: Server won't start
**Solution**: Run `npm install` first, check if port 3000 is available

**Issue**: Changes not reflecting
**Solution**: The database persists data. Use "Clear All Registrations" in admin to reset

## 📞 Support

- Full documentation: See README.md
- Quick start: See QUICKSTART.md
- Regenerate sample data: `node generate-sample-data.js`

## 🎉 Ready to Go!

1. `npm install`
2. `node server.js`
3. Open http://localhost:3000/admin.html
4. Import `sample-workshop-data.xlsx`
5. Test registration at http://localhost:3000/index.html

That's it! You're ready to manage workshop registrations.
