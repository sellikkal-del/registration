# Troubleshooting Guide

## Installation Issues

### Problem: npm install fails
**Solutions:**
```bash
# Try clearing npm cache
npm cache clean --force
npm install

# Or delete node_modules and try again
rm -rf node_modules
npm install
```

### Problem: Port 3000 already in use
**Solution:** Change the port in server.js (line 10):
```javascript
const PORT = 3001; // Or any available port
```

Then access at: http://localhost:3001

## Import Issues

### Problem: "Attendees sheet not found"
**Cause:** Excel file doesn't have a sheet named "Attendees"
**Solution:** 
- Sheet name must be exactly "Attendees" (capital A)
- Download and use the template to ensure correct format

### Problem: "Workshops sheet not found"
**Cause:** Excel file doesn't have a sheet named "Workshops"
**Solution:**
- Sheet name must be exactly "Workshops" (capital W)
- Your Excel file must have both sheets

### Problem: Import succeeds but no data shown
**Cause:** Column names might be incorrect
**Solution:** Ensure columns are exactly:
- Attendees: `email`, `name`, `workshopOptions`
- Workshops: `id`, `name`, `description`, `capacity`

### Problem: workshopOptions not working
**Cause:** Format issue with workshop IDs
**Solution:** Use comma-separated IDs without spaces:
```
✅ Correct: workshop_1,workshop_2,workshop_3
❌ Wrong: workshop_1, workshop_2, workshop_3 (spaces)
❌ Wrong: workshop_1; workshop_2 (semicolons)
```

## Registration Issues

### Problem: "Email not found"
**Cause:** Email not in imported attendees list
**Solution:**
1. Check admin panel to verify data was imported
2. Ensure email is spelled exactly the same
3. Check for spaces or typos
4. Re-import if necessary

### Problem: "You are already registered"
**Cause:** This email already registered for a workshop
**Solutions:**
- This is by design - each person can only register once
- To test again: Use admin panel → "Clear All Registrations"
- Use different test email

### Problem: Can't see any workshops
**Cause:** No workshops in your workshopOptions
**Solution:**
1. Check Excel file - this email might have empty workshopOptions
2. Re-import with correct workshop IDs in workshopOptions column

### Problem: All workshops show as full
**Cause:** Capacity reached or capacity set too low
**Solutions:**
1. Check admin panel → Workshops tab
2. Increase capacity in Excel file and re-import
3. Or use "Clear All Registrations" to reset

### Problem: Workshop shows available but can't register
**Cause:** Race condition - filled between display and submission
**Solution:** 
- This is normal behavior
- System re-checks capacity on submission
- Try selecting a different workshop

## Admin Panel Issues

### Problem: Stats show 0 even after import
**Cause:** Import might have failed silently
**Solutions:**
1. Check browser console for errors (F12)
2. Re-import the file
3. Check Excel file format
4. Try the sample file first

### Problem: Can't upload Excel file
**Cause:** File type not recognized
**Solutions:**
- Use .xlsx or .xls format only
- Save Excel file properly (don't use CSV renamed to .xlsx)
- Try the sample file to verify system works

### Problem: Dashboard not updating
**Cause:** Cache issue
**Solutions:**
1. Refresh the page (F5)
2. Clear browser cache
3. The dashboard auto-refreshes every 30 seconds
4. Check if registrations are actually being saved

## Server Issues

### Problem: Server won't start
**Cause:** Missing dependencies
**Solution:**
```bash
npm install
node server.js
```

### Problem: "Cannot find module"
**Cause:** Dependencies not installed
**Solution:**
```bash
# Delete and reinstall
rm -rf node_modules
npm install
```

### Problem: Changes to files not reflecting
**Cause:** Server needs restart
**Solution:**
```bash
# Stop server (Ctrl+C)
# Start again
node server.js
```

## Data Issues

### Problem: Lost all data after restart
**Cause:** Normal - JSON file resets without imports
**Solution:**
- Import your Excel file after each fresh start
- OR keep database.json file from previous session
- Data in database.json persists if file is preserved

### Problem: Database.json not created
**Cause:** Permission issues
**Solution:**
```bash
# Check you have write permissions in directory
# Try creating manually
touch database.json
```

### Problem: Duplicate registrations in database
**Cause:** Shouldn't happen - system prevents this
**Solution:**
- Use "Clear All Registrations" in admin panel
- Check that you're not manually editing database.json
- Re-import fresh data

## Browser Issues

### Problem: Form not submitting
**Cause:** JavaScript error
**Solution:**
1. Open browser console (F12)
2. Look for errors
3. Ensure JavaScript is enabled
4. Try different browser

### Problem: Styling looks broken
**Cause:** CSS not loading
**Solution:**
1. Hard refresh (Ctrl+F5)
2. Check browser console for 404 errors
3. Ensure server is running

### Problem: Can't see registration confirmation
**Cause:** Popup blocker or navigation issue
**Solution:**
- Registration still saved even if confirmation not shown
- Check admin panel to verify
- Disable popup blocker

## Testing Issues

### Problem: Can't test multiple times with same email
**Cause:** By design - one registration per email
**Solution:**
1. Use admin panel → "Clear All Registrations"
2. Or use different test emails from sample data:
   - alice@example.com
   - bob@example.com
   - charlie@example.com
   - diana@example.com
   - eve@example.com

### Problem: Sample data not working
**Cause:** File might be corrupted
**Solution:**
```bash
# Regenerate sample data
node generate-sample-data.js

# This creates fresh sample-workshop-data.xlsx
```

## Performance Issues

### Problem: Slow response times
**Cause:** JSON file getting large
**Solutions:**
1. For production, switch to real database
2. Clear old registrations periodically
3. Archive old data

### Problem: Multiple users having issues
**Cause:** Server overwhelmed
**Solutions:**
1. For production deployment, use proper hosting
2. Implement caching
3. Use database instead of JSON
4. Consider load balancing for large events

## Quick Diagnostics

### System Health Check
```bash
# 1. Check if server is running
curl http://localhost:3000

# 2. Check if files exist
ls -la

# 3. Check database file
cat database.json

# 4. Check server logs
# Look at terminal where server is running
```

### Verify Setup
1. ✅ Node.js installed: `node --version`
2. ✅ Dependencies installed: `ls node_modules`
3. ✅ Server running: Check terminal for "Server running..."
4. ✅ Port accessible: Open http://localhost:3000
5. ✅ Data imported: Check admin panel stats

## Still Having Issues?

### Check These Common Mistakes
1. ❌ Forgot to run `npm install`
2. ❌ Server not started
3. ❌ Wrong port in browser
4. ❌ Excel file format incorrect
5. ❌ Column names don't match exactly
6. ❌ Workshop IDs mismatch
7. ❌ Capacity set to 0 in Excel

### Debug Mode
Add console logs to server.js to debug:
```javascript
// After reading database
console.log('Database:', readDB());

// After checking email
console.log('Attendee found:', attendee);

// After checking workshops
console.log('Available workshops:', availableWorkshops);
```

### Browser Console
Always check browser console (F12) for:
- JavaScript errors
- Network errors (red entries in Network tab)
- API response data

## Prevention Tips

### Before Going Live
1. ✅ Test with sample data first
2. ✅ Verify all workflows work
3. ✅ Test capacity limits
4. ✅ Test duplicate registration prevention
5. ✅ Verify admin panel shows data correctly
6. ✅ Test Excel import with your real data
7. ✅ Have backup of your Excel file

### Best Practices
1. Keep backup of database.json
2. Keep backup of Excel files
3. Test everything before event
4. Monitor admin panel during registration period
5. Have contact info available for attendee support

## Emergency Fixes

### Nuclear Option: Complete Reset
```bash
# Stop server (Ctrl+C)
# Delete everything and start fresh
rm -rf node_modules database.json
npm install
node generate-sample-data.js
node server.js
# Import sample file in admin panel
```

### Quick Fix: Clear and Restart
```bash
# Stop server
# Delete database
rm database.json
# Start server (creates fresh database)
node server.js
# Re-import your Excel file
```

## Getting Help

If you're still stuck:
1. Check all documentation files (README.md, INSTALL.md, etc.)
2. Review sample-workshop-data.xlsx for format reference
3. Test with sample data to isolate issue
4. Check browser console and server logs
5. Verify Excel file format exactly matches template

Most issues are:
- Excel format problems (80%)
- Missing npm install (10%)
- Server not running (5%)
- Port conflicts (5%)
