# Quick Fix - Property ID Not Displaying

## Issue
Property IDs showing "N/A" in admin dashboard and not visible in UI.

## Quick Fix (3 Steps)

### Step 1: Generate Property Codes
```bash
cd backend
node scripts/generatePropertyCodes.js
```

### Step 2: Restart Backend
```bash
# Press Ctrl+C to stop, then:
npm start
```

### Step 3: Refresh Browser
```
Hard refresh: Ctrl + Shift + R
```

## Verify Fix

### Test Property Codes
```bash
cd backend
node scripts/testPropertyCodes.js
```

Expected output:
```
✓ Connected to MongoDB

Total Properties: 5

Properties WITH codes: 5
  ✓ TP250001 - Luxury Villa
  ✓ TP250002 - 3BHK Apartment
  ✓ TP250003 - Agricultural Land
  ✓ TP250004 - Independent House
  ✓ TP250005 - Open Plot

Properties WITHOUT codes: 0

✓ All properties have codes!
```

### Check Admin Dashboard
1. Login: http://localhost:3000/admin/login
2. Go to Properties tab
3. First column should show: TP250001, TP250002, etc.

### Check Frontend
1. Homepage: http://localhost:3000
2. Property cards should have blue "ID: TP250001" badge
3. Click property → ID appears next to title
4. Click "Schedule Visit" → ID shown in modal

## Done! ✅

Property IDs will now display everywhere:
- ✅ Admin dashboard (first column)
- ✅ Property cards (badge on image)
- ✅ Property details (next to title)
- ✅ Schedule modal (with helper text)
- ✅ Image watermarks (bottom-right)

## For Future Properties

New properties automatically get IDs when created. No action needed!
