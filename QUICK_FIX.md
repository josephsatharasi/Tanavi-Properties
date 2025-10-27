# Quick Fix for "Failed to fetch" Error

## Your Issue
**Error:** "Error uploading image: Failed to fetch"
**Backend URL:** https://tanavi-properties-backend.onrender.com

## Possible Causes

### 1. Backend is Sleeping (Most Likely on Render Free Tier)
Render free tier puts apps to sleep after 15 minutes of inactivity.

**Solution:**
- Visit: https://tanavi-properties-backend.onrender.com/api/properties
- Wait 30-60 seconds for backend to wake up
- Then try uploading again

### 2. Backend is Not Running
**Check:**
1. Open: https://tanavi-properties-backend.onrender.com/api/properties
2. You should see JSON data with properties
3. If you see error or nothing, backend is down

**Solution:**
- Go to Render dashboard
- Check if backend is deployed
- Check logs for errors
- Redeploy if needed

### 3. MongoDB Not Connected
**Check backend logs for:**
- "MongoDB connected" ✓ Good
- "MongoDB connection error" ✗ Problem

**Solution:**
- Go to MongoDB Atlas
- Network Access → Add IP → Allow 0.0.0.0/0
- Check connection string in backend env variables

### 4. Cloudinary Not Configured
**Check backend logs for:**
- "Cloudinary configured" ✓ Good

**Solution:**
- Verify these are set in backend environment:
  ```
  CLOUDINARY_CLOUD_NAME=dqmocxnjs
  CLOUDINARY_API_KEY=397183938987348
  CLOUDINARY_API_SECRET=25d2CioBH8TRsFC0jXJ7m85ir24
  ```

## Immediate Steps

### Step 1: Test Backend
Open this file in browser: `TEST_BACKEND.html`
Click "Test Backend Connection"

If all tests pass ✓ → Backend is working
If tests fail ✗ → Backend has issues

### Step 2: Wake Up Backend (Render Free Tier)
1. Open: https://tanavi-properties-backend.onrender.com/api/properties
2. Wait 30-60 seconds
3. Refresh page
4. Should see JSON data
5. Now try uploading image again

### Step 3: Check Mobile Connection
1. Make sure you're on WiFi (not mobile data)
2. Try uploading a small image (under 1MB)
3. Wait full 60 seconds before giving up

### Step 4: Check Admin Login
1. Make sure you're logged in as admin
2. Check browser console (F12)
3. Look for token in localStorage
4. If no token, login again

## Testing Checklist

- [ ] Backend URL opens in browser
- [ ] Shows JSON data (not error page)
- [ ] Admin is logged in (check localStorage)
- [ ] On WiFi connection
- [ ] Image is under 5MB
- [ ] Waited for backend to wake up (Render free tier)

## Common Render Free Tier Issues

**Problem:** Backend sleeps after 15 minutes
**Solution:** 
- Wake it up by visiting the URL first
- Or upgrade to paid tier
- Or use a service like UptimeRobot to ping it every 5 minutes

**Problem:** Cold start takes 30-60 seconds
**Solution:**
- Be patient, wait for it to wake up
- First request will be slow
- Subsequent requests will be fast

## If Still Not Working

### Check Backend Logs:
1. Go to Render dashboard
2. Click on your backend service
3. Click "Logs"
4. Look for errors

### Common Log Errors:

**"MongoDB connection error"**
→ Fix MongoDB Atlas IP whitelist

**"Cloudinary error"**
→ Check Cloudinary credentials

**"Port already in use"**
→ Redeploy backend

**No logs at all**
→ Backend not running, redeploy

## Alternative: Use Local Backend for Testing

If backend keeps failing:

```bash
cd backend
npm start
```

Then in frontend `.env`:
```
REACT_APP_API_URL=http://localhost:5000
```

Rebuild frontend and test locally first.

## Contact Backend URL

Your backend should respond at:
- https://tanavi-properties-backend.onrender.com/api/properties
- https://tanavi-properties-backend.onrender.com/api/gallery
- https://tanavi-properties-backend.onrender.com/api/buysell

If any of these don't work, backend has issues.
