# Workshop Registration System

A complete workshop registration system with attendee management, capacity limits, and admin dashboard.

## Features

### User Registration Form
- Email validation against pre-imported attendee list
- Dynamic workshop selection based on attendee's available options
- Real-time capacity checking
- One registration per attendee
- Prevents double registration

### Admin Panel
- Import attendees and workshops from Excel
- View all registrations
- Monitor workshop capacity and availability
- Statistics dashboard
- Clear registrations functionality
- Download Excel template

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
node server.js
```

The server will start on http://localhost:3000

### 3. Access the Application

- **Registration Form**: http://localhost:3000/index.html
- **Admin Panel**: http://localhost:3000/admin.html

## How to Use

### Admin Side: Importing Data

1. Open the Admin Panel (http://localhost:3000/admin.html)

2. **Option A: Use the Template**
   - Click "Download Template" to get a sample Excel file
   - Edit the template with your data
   
3. **Option B: Create Your Own Excel File**
   
   Your Excel file must have two sheets:

   **Attendees Sheet:**
   | email | name | workshopOptions |
   |-------|------|-----------------|
   | john@example.com | John Doe | workshop_1,workshop_2 |
   | jane@example.com | Jane Smith | workshop_1,workshop_3 |

   **Workshops Sheet:**
   | id | name | description | capacity |
   |-----|------|-------------|----------|
   | workshop_1 | Web Development | Learn HTML, CSS, JS | 30 |
   | workshop_2 | Data Science | Python and ML | 25 |

4. Upload the Excel file by:
   - Dragging and dropping it into the import area, OR
   - Clicking "Choose Excel File" and selecting it

5. Click "Import Data"

### User Side: Registration

1. Open the Registration Form (http://localhost:3000/index.html)

2. Enter your email address (must be in the imported attendee list)

3. Select one workshop from the available options
   - Only workshops assigned to your email will be shown
   - Full workshops are disabled
   - Spots remaining are displayed for each workshop

4. Click "Register"

5. You'll see a confirmation message

### Admin Side: Viewing Registrations

1. Open the Admin Panel

2. View statistics in the top cards:
   - Total Attendees
   - Total Workshops
   - Total Registrations
   - Registration Rate

3. Switch between tabs:
   - **Registrations Tab**: See who registered for what workshop
   - **Workshops Tab**: See capacity and availability for each workshop

4. Clear all registrations if needed (useful for testing)

## Excel File Format Details

### Attendees Sheet
- **email** (required): Attendee's email address
- **name** (optional): Attendee's full name
- **workshopOptions** (required): Comma-separated list of workshop IDs they can choose from
  - Example: `workshop_1,workshop_2,workshop_3`

### Workshops Sheet
- **id** (required): Unique identifier for the workshop
  - Example: `workshop_1`, `web_dev_101`
- **name** (required): Display name of the workshop
- **description** (optional): Brief description
- **capacity** (required): Maximum number of participants
  - Example: `30`, `25`, `50`

## Data Storage

The system uses a JSON file (`database.json`) to store:
- Attendees list
- Workshops list
- Registrations

This data persists between server restarts and is stored on the server, not in the browser.

## API Endpoints

### User Endpoints
- `POST /api/check-email` - Validate email and get available workshops
- `POST /api/register` - Submit workshop registration

### Admin Endpoints
- `GET /api/admin/registrations` - Get all registrations
- `GET /api/admin/stats` - Get statistics
- `POST /api/admin/import` - Import Excel data
- `POST /api/admin/clear-registrations` - Clear all registrations

## Security Notes

For production use, you should:
1. Add authentication to the admin panel
2. Use a proper database (PostgreSQL, MySQL, MongoDB)
3. Add rate limiting
4. Use HTTPS
5. Validate and sanitize all inputs
6. Add CSRF protection

## Troubleshooting

**Problem**: Can't see my email when registering
**Solution**: Make sure you've imported the Excel file with attendees data first

**Problem**: Workshop shows as full even though capacity wasn't reached
**Solution**: Check the capacity value in your Excel file and current registrations

**Problem**: Import fails
**Solution**: Ensure your Excel file has exactly two sheets named "Attendees" and "Workshops" with the correct column names

## Sample Data

The template file includes sample data:
- 3 sample attendees
- 3 sample workshops
- Various workshop option combinations

You can modify this template to match your needs.
