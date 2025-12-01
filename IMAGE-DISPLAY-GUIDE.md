# 🖼️ Workshop Images Display Guide

## What's New

### ✅ Image Workshops Now Show Schedule Tables!

When users select their workshops, **Image 1, Image 2, and Image 3** workshops will now display the schedule table/image directly under the radio button - exactly as shown in your screenshot!

---

## 📸 How It Works

### **Image Workshops (Display Schedule Table)**

#### **Image 1 - برنامج جاهزية أعضاء مجلس الإدارة - اللغة الإنجليزية**

```
○ Radio Button
  Workshop Name
  [Schedule Image 1 Shows Here]
  ┌─────────────────────────────────┐
  │  التواريخ المتاحة              │
  │  الخيار الأول | الخيار الثاني   │
  │  Date ranges...                │
  └─────────────────────────────────┘
```

#### **Image 2 - برنامج جاهزية أعضاء مجلس الإدارة - اللغة العربية**

```
○ Radio Button
  Workshop Name
  [Schedule Image 2 Shows Here]
```

#### **Image 3 - برنامج أعضاء مجلس الإدارة المتقدم - اللغة الإنجليزية**

```
○ Radio Button
  Workshop Name
  [Schedule Image 3 Shows Here]
```

### **Text Workshops (No Images)**

These workshops show **text only** with dates in the workshop name:

```
○ برنامج لجنة الإستثمار - الخيار الأول: 22-23 أبريل
  (No image - dates are in the title)

○ برنامج لجنة المراجعة - الخيار الثاني: 21-22 يونيو
  (No image - dates are in the title)
```

---

## 🎯 Implementation Details

### **Files Added:**
```
/public/images/
├── image1.png  (18 KB) - Schedule for Image 1 workshops
├── image2.png  (20 KB) - Schedule for Image 2 workshops
└── image3.png  (14 KB) - Schedule for Image 3 workshops
```

### **Detection Logic:**
```javascript
if (workshop.name.includes('Image 1')) {
    // Display image1.png
} else if (workshop.name.includes('Image 2')) {
    // Display image2.png
} else if (workshop.name.includes('Image 3')) {
    // Display image3.png
}
```

### **CSS Styling:**
```css
.workshop-image {
    width: 100%;
    max-width: 500px;
    margin-top: 15px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

---

## 📱 User Experience

### **Step 1: Enter Email**
User enters: `n.elkojok@cfg.sa`

### **Step 2: See Available Workshops**
User sees workshops with:

**Image Workshops** (Both batches for each image):
```
┌─────────────────────────────────────────┐
│ ○ Image 1 - برنامج... - Batch 1        │
│   [Schedule Table Image Appears Here]   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ○ Image 1 - برنامج... - Batch 2        │
│   [Same Schedule Table Image]           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ○ Image 2 - برنامج... - Batch 1        │
│   [Different Schedule Table Image]      │
└─────────────────────────────────────────┘
```

**Text Workshops** (No images):
```
┌─────────────────────────────────────────┐
│ ○ برنامج لجنة الإستثمار - الخيار الأول: │
│   22-23 أبريل                            │
└─────────────────────────────────────────┘
```

### **Step 3: Select & Register**
- User clicks on any workshop
- Radio button highlights
- User clicks "تسجيل"
- Success!

---

## 🎨 Visual Enhancement

### **Benefits:**

1. **Clear Schedule Visibility**
   - Users can see exact dates and options
   - No need to remember which batch has which dates

2. **Professional Look**
   - Images have rounded corners
   - Subtle shadow for depth
   - Border for definition

3. **Responsive Design**
   - Images scale to fit screen
   - Max width: 500px
   - Works on mobile and desktop

4. **Consistent Experience**
   - Same image shown for both batches of each Image workshop
   - Example: Image 1 Batch 1 and Image 1 Batch 2 both show the same schedule table

---

## 🧪 Testing Instructions

### 1. **Start Application**
```bash
cd workshop-registration
npm install
node server.js
```

### 2. **Import Data**
```
http://localhost:3000/admin.html
- Import test_workshop_revised_v3.xlsx
- Verify 14 workshops imported
```

### 3. **Test Registration**
```
http://localhost:3000/index.html
- Enter: n.elkojok@cfg.sa
- You should see:
  ✓ Image 1 Batch 1 with schedule image
  ✓ Image 1 Batch 2 with schedule image
  ✓ Image 2 Batch 1 with schedule image
  ✓ Image 2 Batch 2 with schedule image
  ✓ Image 3 Batch 1 with schedule image
  ✓ Image 3 Batch 2 with schedule image
  ✓ Text workshops without images
```

### 4. **Verify Images Display**
- Scroll through workshops
- Check that Image workshops show schedule tables
- Check that Text workshops show dates in title (no image)

---

## 📊 Mapping Summary

| Workshop Type | Workshop Name | Image Displayed |
|---------------|--------------|-----------------|
| **Image 1 - Batch 1** | برنامج جاهزية... - الإنجليزية | image1.png ✓ |
| **Image 1 - Batch 2** | برنامج جاهزية... - الإنجليزية | image1.png ✓ |
| **Image 2 - Batch 1** | برنامج جاهزية... - العربية | image2.png ✓ |
| **Image 2 - Batch 2** | برنامج جاهزية... - العربية | image2.png ✓ |
| **Image 3 - Batch 1** | برنامج أعضاء... المتقدم | image3.png ✓ |
| **Image 3 - Batch 2** | برنامج أعضاء... المتقدم | image3.png ✓ |
| **Text 1 - Option 1** | برنامج لجنة الترشيحات... | ❌ No image |
| **Text 1 - Option 2** | برنامج لجنة الترشيحات... | ❌ No image |
| **Text 2 - Option 1** | برنامج لجنة المراجعة... | ❌ No image |
| **Text 2 - Option 2** | برنامج لجنة المراجعة... | ❌ No image |
| **Text 3 - Option 1** | برنامج لجنة الحوكمة... | ❌ No image |
| **Text 3 - Option 2** | برنامج لجنة الحوكمة... | ❌ No image |
| **Text 4 - Option 1** | برنامج لجنة الإستثمار... | ❌ No image |
| **Text 4 - Option 2** | برنامج لجنة الإستثمار... | ❌ No image |

---

## ✅ Complete Feature Summary

### **What Users See:**

✅ **Image Workshops:**
- Workshop name (with Image number and Batch)
- Schedule table image below the name
- Capacity indicator

✅ **Text Workshops:**
- Workshop name with dates included
- No image (dates are in the title)
- Capacity indicator

✅ **Selection:**
- Click anywhere on the workshop box
- Radio button highlights
- Clear visual feedback

✅ **Registration:**
- Arabic-only interface
- Clean, professional design
- Ministry of Finance branding

---

## 🎉 Result

Users can now **see the schedule tables directly** when selecting Image workshops, making it much easier to choose the right batch based on available dates!

**Exactly as shown in your screenshot!** ✓
