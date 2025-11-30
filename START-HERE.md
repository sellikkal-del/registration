# 🎯 Workshop Registration System - Complete Package

## What You've Received

A full-featured workshop registration system with server-side storage, capacity management, and admin dashboard.

## 📦 Package Contents

### Core Files
- **server.js** - Backend server (Express.js)
- **package.json** - Dependencies configuration
- **database.json** - Auto-created on first run for data storage

### Frontend Files (in /public)
- **index.html** - User registration form
- **admin.html** - Admin dashboard

### Sample Data
- **sample-workshop-data.xlsx** - Pre-filled Excel file with 5 attendees and 3 workshops
- **generate-sample-data.js** - Script to regenerate sample data

### Documentation
- **INSTALL.md** - Complete installation and setup guide ⭐ START HERE
- **README.md** - Full system documentation and features
- **QUICKSTART.md** - Fast-track setup guide
- **OVERVIEW.md** - Visual system architecture and workflow

## 🚀 Get Started in 3 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Server
```bash
node server.js
```

### 3. Use the System
- **Admin Panel**: http://localhost:3000/admin.html
- **Registration Form**: http://localhost:3000/index.html

## 🎓 First Time Setup

### Quick Test (Recommended)
1. Start the server (`node server.js`)
2. Open admin panel (http://localhost:3000/admin.html)
3. Import `sample-workshop-data.xlsx` (drag & drop or browse)
4. Open registration form (http://localhost:3000/index.html)
5. Try registering with: `alice@example.com`
6. See the registration appear in admin panel!

### With Your Own Data
1. Download template from admin panel
2. Fill in your attendees and workshops
3. Import the Excel file
4. Share registration link with your attendees

## 💡 Key Features

✅ **Email-Based Access Control**
- Only pre-imported emails can register
- Each email gets personalized workshop options

✅ **Smart Capacity Management**
- Set different limits for each workshop
- Real-time capacity checking
- Automatic full-workshop detection

✅ **One Registration Per Person**
- Prevents double registration
- Shows existing registration if attempted again

✅ **Excel Import/Export**
- Easy bulk data import
- Downloadable template
- Simple two-sheet format

✅ **Admin Dashboard**
- Live statistics
- Registration monitoring
- Workshop capacity overview
- Quick data management

✅ **Server-Side Storage**
- Data persists between sessions
- Not stored in browser
- Ready for production database upgrade

## 📊 Excel File Format

Your Excel file needs two sheets:

### Sheet 1: "Attendees"
| email | name | workshopOptions |
|-------|------|-----------------|
| alice@example.com | Alice Johnson | workshop_1,workshop_2 |

### Sheet 2: "Workshops"
| id | name | description | capacity |
|----|------|-------------|----------|
| workshop_1 | Web Development | Learn HTML, CSS, JS | 30 |

## 🔍 How It Works

1. **Admin imports data** → Attendees and workshops stored in database
2. **User enters email** → System validates against database
3. **User sees workshops** → Only their assigned options
4. **User selects one** → System checks capacity
5. **Registration saved** → Admin sees it immediately
6. **Workshop fills up** → System prevents over-capacity

## 🛠️ Tech Stack

- **Backend**: Node.js + Express.js
- **Storage**: JSON file (easily upgradeable to SQL/MongoDB)
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Excel**: SheetJS library
- **No database required** to start

## 📱 What Users See

### Registration Flow
```
Enter Email → Validate → Show Workshops → Select One → Register → Confirm
```

### What Makes a Workshop Available?
✅ Listed in attendee's workshopOptions
✅ Has spots remaining
❌ Full workshops are grayed out
❌ Wrong workshops don't appear

## 🎯 Common Use Cases

### Workshop/Training Events
- Corporate training sessions
- Academic workshops
- Conference breakout sessions

### Class Registration
- Course selection systems
- Seminar signups
- Lab session booking

### Event Management
- Multi-session events
- Parallel tracks
- Capacity-controlled sessions

## 🔐 Security Features

- Email validation against database
- Server-side capacity checking
- Duplicate registration prevention
- Input sanitization
- Race condition protection

**Note**: For production, add authentication to admin panel!

## 📞 Need Help?

1. **Installation issues** → See INSTALL.md
2. **How it works** → See OVERVIEW.md
3. **Quick setup** → See QUICKSTART.md
4. **Full documentation** → See README.md

## ⚡ Quick Commands

```bash
# Install
npm install

# Start server
node server.js

# Generate new sample data
node generate-sample-data.js
```

## 🎉 You're Ready!

The system is production-ready for small to medium deployments. For larger scale:
- Add authentication
- Use PostgreSQL/MySQL instead of JSON
- Add rate limiting
- Deploy to cloud (AWS, Azure, Heroku)
- Enable HTTPS

## 📈 Next Steps

1. ✅ Install dependencies
2. ✅ Start server
3. ✅ Import sample data
4. ✅ Test registration
5. ✅ Check admin panel
6. → Replace with your data
7. → Share with attendees
8. → Monitor registrations

**Everything you need is included. Let's get started! 🚀**

---

**Questions?** Check the documentation files or modify the code - it's fully commented and easy to customize!
