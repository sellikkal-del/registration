# Workshop Registration System - How It Works

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     WORKSHOP REGISTRATION SYSTEM             │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐
│   ADMIN PANEL    │         │  USER FORM       │
│  (admin.html)    │         │  (index.html)    │
└────────┬─────────┘         └────────┬─────────┘
         │                            │
         │ Import Excel               │ Submit Registration
         │ View Reports               │ Select Workshop
         │                            │
         └────────┬───────────────────┘
                  │
         ┌────────▼─────────┐
         │   EXPRESS.JS     │
         │     SERVER       │
         │   (server.js)    │
         └────────┬─────────┘
                  │
         ┌────────▼─────────┐
         │   DATABASE.JSON  │
         │                  │
         │  • Attendees     │
         │  • Workshops     │
         │  • Registrations │
         └──────────────────┘
```

## Data Flow

### 1. Admin Imports Data

```
Excel File (Attendees + Workshops)
           ↓
    Upload via Admin Panel
           ↓
   Server processes and validates
           ↓
     Stores in database.json
           ↓
    Dashboard shows statistics
```

### 2. User Registration

```
   User enters email
           ↓
   Server checks if email exists
           ↓
   Server finds available workshops
   (based on workshopOptions)
           ↓
   Server checks capacity
           ↓
   User sees only eligible workshops
           ↓
   User selects one workshop
           ↓
   Server validates selection
           ↓
   Server checks capacity again
           ↓
   Registration saved to database
           ↓
   Confirmation shown to user
```

## Database Structure

### database.json

```json
{
  "attendees": [
    {
      "id": "attendee_1",
      "email": "alice@example.com",
      "name": "Alice Johnson",
      "workshopOptions": ["workshop_1", "workshop_2"]
    }
  ],
  "workshops": [
    {
      "id": "workshop_1",
      "name": "Web Development",
      "description": "Learn HTML, CSS, JS",
      "capacity": 30
    }
  ],
  "registrations": [
    {
      "id": "1234567890",
      "email": "alice@example.com",
      "workshopId": "workshop_1",
      "workshopName": "Web Development",
      "registeredAt": "2025-11-30T14:30:00.000Z"
    }
  ]
}
```

## User Journey

### Step 1: Email Entry
```
┌─────────────────────────────────┐
│  Workshop Registration          │
│                                 │
│  Enter your email to see        │
│  available workshops            │
│                                 │
│  ┌───────────────────────────┐ │
│  │ your.email@example.com    │ │
│  └───────────────────────────┘ │
│                                 │
│  [        Continue        ]     │
└─────────────────────────────────┘
```

### Step 2: Workshop Selection
```
┌─────────────────────────────────┐
│  Select Your Workshop           │
│                                 │
│  ○ Web Development              │
│    Learn HTML, CSS, JavaScript  │
│    [30 spots left]              │
│                                 │
│  ● Data Science                 │
│    Python and Machine Learning  │
│    [15 spots left]              │
│                                 │
│  ○ UI/UX Design [FULL]          │
│    Design principles & Figma    │
│    [0 spots left]               │
│                                 │
│  [        Register        ]     │
│  [         Back           ]     │
└─────────────────────────────────┘
```

### Step 3: Success
```
┌─────────────────────────────────┐
│           ✓                     │
│                                 │
│  Registration Successful!       │
│                                 │
│  You have been registered for:  │
│  Data Science with Python       │
│                                 │
└─────────────────────────────────┘
```

## Admin Dashboard

### Import Section
```
┌────────────────────────────────────────┐
│  Import Data from Excel                │
│                                        │
│  ┌────────────────────────────────┐   │
│  │        📁                      │   │
│  │                                │   │
│  │  Drag and drop Excel file here │   │
│  │  or click to browse            │   │
│  │                                │   │
│  │  [  Choose Excel File  ]       │   │
│  └────────────────────────────────┘   │
│                                        │
│  [  Import Data  ]  [Download Template]│
└────────────────────────────────────────┘
```

### Statistics Dashboard
```
┌─────────────────────────────────────────────────┐
│  ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │    50    │ │    3     │ │    35    │       │
│  │ Attendees│ │Workshops │ │  Regist. │       │
│  └──────────┘ └──────────┘ └──────────┘       │
│                                                 │
│  ┌──────────┐                                  │
│  │   70%    │                                  │
│  │   Rate   │                                  │
│  └──────────┘                                  │
└─────────────────────────────────────────────────┘
```

### Registrations Table
```
┌──────────────────────────────────────────────────────────┐
│  Email              │ Workshop      │ Registered At      │
├──────────────────────────────────────────────────────────┤
│  alice@example.com  │ Web Dev       │ Nov 30, 2:30 PM   │
│  bob@example.com    │ Data Science  │ Nov 30, 2:35 PM   │
│  charlie@example.com│ UI/UX Design  │ Nov 30, 2:40 PM   │
└──────────────────────────────────────────────────────────┘
```

## API Endpoints

### Public Endpoints
- `POST /api/check-email` - Validate email and get workshops
- `POST /api/register` - Submit registration

### Admin Endpoints
- `GET /api/admin/registrations` - Get all registrations
- `GET /api/admin/stats` - Get statistics
- `POST /api/admin/import` - Import Excel data
- `POST /api/admin/clear-registrations` - Clear registrations

## Validation Rules

### Email Validation
✅ Must exist in imported attendees list
✅ Must not have already registered
❌ Cannot register if not in database

### Workshop Selection
✅ Must be in attendee's workshopOptions
✅ Must have available capacity
✅ Must select exactly one workshop
❌ Cannot select full workshops
❌ Cannot select unauthorized workshops

### Capacity Management
- Checked when displaying options
- Checked again when submitting
- Prevents race conditions
- Real-time updates

## Features Summary

### Security
- Email pre-validation
- Server-side data storage
- Duplicate registration prevention
- Capacity overflow prevention

### User Experience
- Clean, modern interface
- Real-time capacity display
- Instant feedback
- Mobile responsive

### Admin Features
- Easy Excel import
- Live dashboard
- Registration monitoring
- Workshop management
- One-click data clear

### Reliability
- Persistent storage
- Error handling
- Validation at every step
- Auto-refresh statistics

## Workflow Example

**Scenario**: 100 attendees, 5 workshops

1. **Admin**: Import Excel with 100 emails and 5 workshops
2. **Admin**: See dashboard showing 0 registrations
3. **Users**: Start registering via registration form
4. **System**: Validates each registration
5. **System**: Updates capacity in real-time
6. **Admin**: Monitors progress on dashboard
7. **System**: Automatically closes full workshops
8. **Result**: All attendees registered, no over-capacity

## Best Practices

### For Admins
1. Import data before sharing registration link
2. Set realistic capacity limits
3. Monitor registration progress
4. Download current data as backup
5. Test with sample data first

### For System Setup
1. Start with sample data
2. Test full registration flow
3. Verify all validations work
4. Check capacity limits
5. Ensure database persists
6. Review admin panel features

## Next Steps

After basic setup:
1. Customize workshop names and descriptions
2. Adjust capacity limits
3. Import your real attendee list
4. Share registration link
5. Monitor via admin dashboard
6. Export final registration data
