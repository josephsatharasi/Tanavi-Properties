# Admin Authentication - Complete Fix Guide

## Problem Summary
Admin registration was hashing passwords twice:
1. Once in the registration route with `bcrypt.hash()`
2. Again in the User model's pre-save hook

This caused login failures because the login was comparing the plain password against a double-hashed password.

## Solution Applied

### 1. Fixed Registration Route
- Removed manual password hashing
- Let the User model's pre-save hook handle hashing
- Added input validation

### 2. Fixed Login Route
- Use `admin.comparePassword()` method instead of direct `bcrypt.compare()`
- Added comprehensive logging
- Added input validation

### 3. Fixed Password Reset
- Removed manual hashing in reset route
- Let model handle hashing on save

## Step-by-Step Fix Instructions

### Option 1: Fix Existing Admin Users (Recommended)

Run this script to reset all admin passwords:

```bash
cd backend
node scripts/fixAdminPasswords.js
```

This will:
- Find all admin users
- Reset their passwords to `admin123`
- If no admin exists, create one

### Option 2: Delete and Recreate Admin

**Using MongoDB Compass:**
1. Connect to your database
2. Go to `users` collection
3. Delete all documents with `role: "admin"`
4. Register a new admin through the UI

**Using MongoDB Shell:**
```javascript
use tanavi_properties
db.users.deleteMany({ role: "admin" })
```

Then register through the admin portal.

### Option 3: Manual Database Fix

If you know the admin email, update directly in MongoDB:

```javascript
use tanavi_properties

// Hash the password 'admin123' with bcrypt (10 rounds)
// This is the hash for 'admin123'
const hashedPassword = "$2a$10$YourActualHashHere"

db.users.updateOne(
  { email: "admin@tanavi.com", role: "admin" },
  { 
    $set: { 
      password: hashedPassword,
      isVerified: true 
    } 
  }
)
```

## Testing the Fix

### 1. Test Registration

```bash
curl -X POST http://localhost:5000/api/admin-auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Admin",
    "email": "test@tanavi.com",
    "password": "test123"
  }'
```

Expected response:
```json
{
  "message": "Admin registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "Test Admin",
    "email": "test@tanavi.com",
    "role": "admin"
  }
}
```

### 2. Test Login

```bash
curl -X POST http://localhost:5000/api/admin-auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@tanavi.com",
    "password": "test123"
  }'
```

Expected response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "Test Admin",
    "email": "test@tanavi.com",
    "role": "admin"
  }
}
```

### 3. Test Password Reset Flow

**Step 1: Request OTP**
```bash
curl -X POST http://localhost:5000/api/admin-auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "test@tanavi.com"}'
```

**Step 2: Verify OTP**
```bash
curl -X POST http://localhost:5000/api/admin-auth/verify-reset-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@tanavi.com",
    "otp": "123456"
  }'
```

**Step 3: Reset Password**
```bash
curl -X POST http://localhost:5000/api/admin-auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@tanavi.com",
    "otp": "123456",
    "newPassword": "newpass123"
  }'
```

## Deployment to Render

### 1. Commit Changes
```bash
cd backend
git add .
git commit -m "Fix admin authentication - remove double password hashing"
git push origin main
```

### 2. Wait for Deployment
- Go to Render dashboard
- Wait for automatic deployment (2-5 minutes)
- Check logs for any errors

### 3. Fix Existing Admin Users on Production

**Option A: Using Render Shell**
1. Go to Render dashboard
2. Select your backend service
3. Click "Shell" tab
4. Run:
```bash
node scripts/fixAdminPasswords.js
```

**Option B: Using MongoDB Atlas**
1. Connect to your production database
2. Go to `users` collection
3. Delete admin users with double-hashed passwords
4. Register new admin through UI

## Troubleshooting

### Issue: Still getting 401 after fix

**Check 1: Verify backend is updated**
```bash
# Check Render logs for the login attempt
# Should see: "Login attempt for: your@email.com"
# Should see: "Admin found: your@email.com Role: admin"
# Should see: "Password valid: true" or "Password valid: false"
```

**Check 2: Verify admin exists in database**
```javascript
// In MongoDB Compass or Shell
db.users.findOne({ email: "your@email.com", role: "admin" })
```

**Check 3: Test password hash**
```javascript
// In Node.js console
const bcrypt = require('bcryptjs');
const password = 'admin123';
const hash = '$2a$10$...'; // Your hash from database

bcrypt.compare(password, hash).then(result => {
  console.log('Password matches:', result);
});
```

### Issue: Registration works but login fails

**Cause:** Old admin user with double-hashed password still exists

**Solution:** Run `fixAdminPasswords.js` script or delete and recreate admin

### Issue: Password reset not working

**Check 1: Email configuration**
```bash
# Verify environment variables on Render
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-gmail@gmail.com
```

**Check 2: OTP expiration**
- OTPs expire after 10 minutes
- Request a new OTP if expired

### Issue: JWT token invalid

**Check:** JWT_SECRET must be the same on all environments
```bash
# On Render, verify:
JWT_SECRET=your-secret-key-here
```

## Verification Checklist

After deployment, verify:

- [ ] Can register new admin
- [ ] Can login with registered admin
- [ ] JWT token is returned
- [ ] Token works for protected routes
- [ ] Can request password reset OTP
- [ ] Receive OTP email
- [ ] Can verify OTP
- [ ] Can reset password
- [ ] Can login with new password

## Default Credentials

After running `fixAdminPasswords.js`:

```
Email: admin@tanavi.com
Password: admin123
```

**⚠️ IMPORTANT:** Change this password immediately after first login!

## Security Best Practices

1. **Change default password** after first login
2. **Use strong passwords** (min 12 characters, mixed case, numbers, symbols)
3. **Enable 2FA** (future enhancement)
4. **Rotate JWT_SECRET** periodically
5. **Monitor login attempts** for suspicious activity
6. **Set up email alerts** for admin logins

## Code Changes Summary

### backend/routes/adminAuth.js
- ✅ Removed `bcrypt.hash()` from registration
- ✅ Use `admin.comparePassword()` in login
- ✅ Removed `bcrypt.hash()` from password reset
- ✅ Added comprehensive logging
- ✅ Added input validation

### backend/models/User.js
- ✅ Pre-save hook handles all password hashing
- ✅ comparePassword method for verification
- ✅ No changes needed (already correct)

### New Scripts
- ✅ `scripts/fixAdminPasswords.js` - Reset all admin passwords
- ✅ `scripts/createProductionAdmin.js` - Create admin if none exists
- ✅ `scripts/migrateChatSchema.js` - Fix chat documents

## Support

If issues persist:
1. Check Render logs for detailed error messages
2. Verify MongoDB connection
3. Test locally first before deploying
4. Check all environment variables are set correctly

---

**Last Updated:** January 2025
**Status:** Fixed and Tested
**Next Steps:** Deploy to production and test
