# 🔍 Sub-Options Not Showing - Troubleshooting Guide

## Issue
Sub-options are not displaying under workshop titles in the registration form.

## ✅ What Should Appear

Your screenshot shows the workshops should look like this with sub-options visible:

```
┌────────────────────────────────────────────────┐
│ ○ برنامج جاهزية أعضاء مجلس الإدارة –          │
│   اللغة الإنجليزية (11 يوم)                  │
│                                                │
│   ┌──────────────────────────────────────┐   │
│   │ • المحور الأول: دور الأعضاء...       │   │
│   │ • المحور الثاني: الاستراتيجية...     │   │
│   │ • المحور الثالث: القيادة...          │   │
│   │ • المحور الرابع: المالية...          │   │
│   └──────────────────────────────────────┘   │
│                            30 مقاعد           │
└────────────────────────────────────────────────┘
```

---

## 🔧 Step-by-Step Fix

### **1. Complete Database Reset**

```bash
cd workshop-registration

# Stop server if running (Ctrl+C)

# Delete old database
rm -f database.json

# Start server fresh
node server.js
```

### **2. Import Data Properly**

```
1. Open: http://localhost:3000/admin.html

2. Click: "Single File Import"

3. Upload: test_workshop_revised_v3.xlsx

4. Set capacities:
   Option1: 30
   Option2: 30  
   Option3: 30

5. Click: "Import Data"

6. Should see: "Imported 3 attendees and 3 workshops"
```

### **3. Test and Debug**

```
1. Open: http://localhost:3000/index.html

2. Right-click → Inspect → Console tab

3. Enter email: n.elkojok@cfg.sa

4. Watch console output
```

---

## 📊 What Console Should Show

### ✅ **Good Output (Working):**
```javascript
Loading workshops: Array(3)
Processing workshop: برنامج جاهزية أعضاء مجلس الإدارة – اللغة الإنجليزية (11 يوم)
  Description: المحور الأول: دور الأعضاء ومجلس الإدارة - 13-14 يناير | المحور الثاني: ...
  Has pipe?: true
  Sub-options: Array(4) ["المحور الأول...", "المحور الثاني...", ...]
```

### ❌ **Bad Output (Problem):**
```javascript
Loading workshops: Array(3)
Processing workshop: برنامج جاهزية...
  Description: null
  Has pipe?: false
```

---

## 🔍 Verification Checklist

- [ ] **Database reset:** Deleted `database.json`
- [ ] **Server restarted:** Fresh start with new database
- [ ] **Data imported:** Via admin panel (not manually)
- [ ] **Import message:** Saw "Imported 3 attendees and 3 workshops"
- [ ] **Console open:** Browser F12 → Console tab
- [ ] **Console logs:** Show "Has pipe?: true"
- [ ] **Sub-options array:** Shows 2-4 items in console

---

## 📸 Send Me If Still Not Working

1. **Screenshot of Console** (showing workshop logs)
2. **First 30 lines of database.json**
3. **Screenshot of registration page**

This will help me see exactly what's happening!

---

## ✅ Success = Gray Box with Bullets

You'll know it's working when each workshop shows:
- Workshop title
- Gray box with rounded corners
- Bullet points (•) for each sub-option
- Module names with dates
- Capacity badge

**Check your browser console and let me know what you see!** 🔍
