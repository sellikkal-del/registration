# 📝 How to Edit Text in Admin Panel

## File Location
**File:** `workshop-registration/public/admin.html`

---

## 🎯 All Editable Text Locations

### **1. Drag and Drop Text - Single File Import**

**Line 539:**
```html
<p style="color: #666; margin-bottom: 16px;">Drag and drop your Excel file here</p>
```

**To Change:**
```html
<p style="color: #666; margin-bottom: 16px;">YOUR NEW TEXT HERE</p>
```

**Example:**
```html
<p style="color: #666; margin-bottom: 16px;">اسحب الملف وأفلته هنا</p>
```

---

### **2. Choose File Button - Single File Import**

**Line 541:**
```html
<label for="fileInputAll" class="btn btn-primary">Choose Excel File</label>
```

**To Change:**
```html
<label for="fileInputAll" class="btn btn-primary">YOUR BUTTON TEXT</label>
```

**Example:**
```html
<label for="fileInputAll" class="btn btn-primary">اختر ملف Excel</label>
```

---

### **3. Info Box Text - Single File Import**

**Line 534:**
```html
<p><strong>Single File Format:</strong> Your Excel file should have columns: Name, Email, and workshop columns with "Yes" for available options.</p>
```

**To Change:**
```html
<p><strong>Format:</strong> Your custom instructions here</p>
```

---

### **4. Capacity Section Heading**

**Line 548:**
```html
<h3 style="color: #0f6b4a; margin-bottom: 15px;">Set Workshop Capacity</h3>
```

**To Change:**
```html
<h3 style="color: #0f6b4a; margin-bottom: 15px;">YOUR HEADING</h3>
```

**Example:**
```html
<h3 style="color: #0f6b4a; margin-bottom: 15px;">تحديد سعة ورش العمل</h3>
```

---

### **5. Capacity Section Description**

**Line 549-551:**
```html
<p style="color: #666; margin-bottom: 15px; font-size: 14px;">
    Define the maximum number of participants for each workshop
</p>
```

**To Change:**
```html
<p style="color: #666; margin-bottom: 15px; font-size: 14px;">
    YOUR DESCRIPTION HERE
</p>
```

---

### **6. Import Data Button**

**Line 556:**
```html
<button class="btn btn-primary" id="importBtnAll" disabled>Import Data</button>
```

**To Change:**
```html
<button class="btn btn-primary" id="importBtnAll" disabled>YOUR BUTTON TEXT</button>
```

**Example:**
```html
<button class="btn btn-primary" id="importBtnAll" disabled>استيراد البيانات</button>
```

---

### **7. Workshops File Upload (Separate Import)**

**Line 568:**
```html
<p style="color: #666; margin-bottom: 16px;">Upload Workshops File</p>
```

**Line 570:**
```html
<label for="fileInputWorkshops" class="btn btn-primary">Choose Workshops File</label>
```

---

### **8. Attendees File Upload (Separate Import)**

**Line 588:**
```html
<p style="color: #666; margin-bottom: 16px;">Upload Attendees File</p>
```

**Line 590:**
```html
<label for="fileInputAttendees" class="btn btn-primary">Choose Attendees File</label>
```

---

### **9. Export Button**

**Line 612-614:**
```html
<button class="btn btn-primary btn-small" onclick="exportToExcel()" id="exportBtn">
    📥 Export to Excel
</button>
```

**To Change:**
```html
<button class="btn btn-primary btn-small" onclick="exportToExcel()" id="exportBtn">
    📥 YOUR TEXT HERE
</button>
```

---

### **10. Clear Registrations Button**

**Line 615-617:**
```html
<button class="btn btn-danger btn-small" onclick="clearRegistrations()">
    Clear All Registrations
</button>
```

---

## 🔍 How to Find and Edit

### **Method 1: Search by Line Number**

1. Open: `workshop-registration/public/admin.html`
2. Go to line number (Ctrl+G in most editors)
3. Edit the text
4. Save file
5. Refresh browser (Ctrl+Shift+R)

---

### **Method 2: Search by Text**

1. Open: `workshop-registration/public/admin.html`
2. Find (Ctrl+F): "Drag and drop"
3. Edit the text you find
4. Save file
5. Refresh browser

---

## 📋 Quick Reference Table

| Text to Change | Line | Current Text |
|----------------|------|--------------|
| Drag & Drop | 539 | "Drag and drop your Excel file here" |
| Choose Button | 541 | "Choose Excel File" |
| Capacity Heading | 548 | "Set Workshop Capacity" |
| Capacity Description | 549 | "Define the maximum number..." |
| Import Button | 556 | "Import Data" |
| Export Button | 612 | "📥 Export to Excel" |
| Clear Button | 615 | "Clear All Registrations" |

---

## 💡 Tips

### **For Arabic Text:**
- Make sure to use RTL (right-to-left) styling
- Add: `style="direction: rtl; text-align: right;"`
- Keep emojis (📁, 📥, etc.) for visual appeal

### **For Colors:**
- MOF Green: `#0f6b4a`
- Gray Text: `#666`
- Keep consistent with MOF theme

### **After Editing:**
1. Save the file
2. Refresh browser (Ctrl+Shift+R)
3. Clear cache if changes don't appear

---

## ✅ Example: Complete Arabic Translation

### **Before (Line 539):**
```html
<p style="color: #666; margin-bottom: 16px;">Drag and drop your Excel file here</p>
```

### **After:**
```html
<p style="color: #666; margin-bottom: 16px; direction: rtl; text-align: right;">
    اسحب وأفلت ملف Excel هنا أو انقر للاختيار
</p>
```

---

## 🎯 Most Common Changes

### **1. Main Drop Area** (Line 539):
```html
<!-- English -->
<p>Drag and drop your Excel file here</p>

<!-- Arabic -->
<p style="direction: rtl;">اسحب الملف وأفلته هنا</p>
```

### **2. Choose Button** (Line 541):
```html
<!-- English -->
<label>Choose Excel File</label>

<!-- Arabic -->
<label>اختر ملف Excel</label>
```

### **3. Import Button** (Line 556):
```html
<!-- English -->
<button>Import Data</button>

<!-- Arabic -->
<button>استيراد البيانات</button>
```

---

## ⚠️ Important Notes

1. **Don't change:**
   - HTML IDs (id="...")
   - JavaScript function names (onclick="...")
   - CSS classes (class="...")

2. **Only change:**
   - Text between > and <
   - Button labels
   - Descriptions

3. **After editing:**
   - Must save file
   - Must refresh browser
   - Server restart NOT needed

---

**Need help finding specific text? Let me know which text you want to change!** 📝
