# Quick Start Guide

## Step 1: Start the Server

```bash
node server.js
```

You should see:
```
Server running on http://localhost:3000
Admin panel: http://localhost:3000/admin.html
Registration form: http://localhost:3000/index.html
```

## Step 2: Set Up Your Data

### Option A: Use Sample Data (Recommended for Testing)

A sample Excel file has already been generated: `sample-workshop-data.xlsx`

It includes:
- 5 sample attendees (alice@example.com, bob@example.com, etc.)
- 3 workshops (Web Development, Data Science, UI/UX Design)

### Option B: Create Your Own Data

1. Go to http://localhost:3000/admin.html
2. Click "Download Template"
3. Edit the Excel file with your attendees and workshops
4. Save the file

## Step 3: Import Data

1. Open the Admin Panel: http://localhost:3000/admin.html
2. Drag and drop your Excel file (or use the file picker)
3. Click "Import Data"
4. You should see a success message and updated statistics

## Step 4: Test Registration

1. Open the Registration Form: http://localhost:3000/index.html
2. Enter one of the sample emails (e.g., `alice@example.com`)
3. Select a workshop
4. Click "Register"
5. See the success confirmation!

## Step 5: View Registrations

1. Go back to the Admin Panel
2. Check the "Registrations" tab to see who registered
3. Check the "Workshops" tab to see capacity and availability

## Sample Attendees for Testing

Use these emails to test the registration form:
- alice@example.com (can choose Web Development or Data Science)
- bob@example.com (can choose Web Development or UI/UX Design)
- charlie@example.com (can choose Data Science or UI/UX Design)
- diana@example.com (can choose any workshop)
- eve@example.com (can only choose Web Development)

## Tips

- Each attendee can only register once
- Workshops have capacity limits (Web Dev: 30, Data Science: 25, UI/UX: 20)
- Admin panel auto-refreshes every 30 seconds
- You can clear all registrations from the admin panel to test again

## Next Steps

For production use:
1. Replace sample data with your actual attendees and workshops
2. Adjust workshop capacities as needed
3. Add authentication to the admin panel
4. Consider using a proper database instead of JSON files
