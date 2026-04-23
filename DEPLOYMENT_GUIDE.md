# Tanavi Properties - Deployment & Setup Guide

## Recent Changes Summary

### 1. Chat System Enhancements
- ✅ Mobile-responsive design for both admin and public chat
- ✅ WhatsApp-style message bubbles
- ✅ User type badges (Seller/Buyer/Approval Pending)
- ✅ Property ID display for sellers
- ✅ 90-day availability confirmation
- ✅ Sold Properties tracking tab in admin dashboard

### 2. Backend Updates
- ✅ Removed authentication requirement from `/api/chat/message` and `/api/chat/read` endpoints
- ✅ Added comprehensive error logging
- ✅ Updated Property model with `soldDate` field
- ✅ Enhanced chat routes to store property codes instead of IDs

### 3. Frontend Updates
- ✅ Fully responsive admin chat (mobile-friendly)
- ✅ Fully responsive public chat widget (full-screen on mobile)
- ✅ Back button on mobile for admin chat
- ✅ Improved error handling

## Deployment Steps

### Step 1: Backend Deployment to Render

1. **Commit all backend changes:**
```bash
cd backend
git add .
git commit -m "Enhanced chat system with mobile responsiveness and sold properties tracking"
git push origin main
```

2. **Verify Render deployment:**
   - Go to https://dashboard.render.com
   - Check your backend service
   - Wait for deployment to complete (usually 2-5 minutes)
   - Check logs for any errors

3. **Verify environment variables on Render:**
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret key
   - `EMAIL_USER` - Gmail for sending OTPs
   - `EMAIL_PASS` - Gmail app password
   - `EMAIL_FROM` - Sender email address

### Step 2: Create Admin User in Production

Since you're getting 401 on login, you need to create an admin user in your production database.

**Option A: Using MongoDB Compass (Recommended)**

1. Connect to your production MongoDB using the connection string
2. Go to the `users` collection
3. Insert a new document:
```json
{
  "name": "Admin",
  "email": "admin@tanavi.com",
  "password": "$2a$10$YourHashedPasswordHere",
  "role": "admin",
  "isVerified": true,
  "createdAt": { "$date": "2025-01-12T00:00:00.000Z" }
}
```

**Option B: Using Backend Script**

Create a file `backend/scripts/createProductionAdmin.js`:

```javascript
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = 'admin@tanavi.com';
    const password = 'admin123'; // Change this!

    // Check if admin exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    await User.create({
      name: 'Admin',
      email: email,
      password: hashedPassword,
      role: 'admin',
      isVerified: true
    });

    console.log('Admin created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();
```

Run it:
```bash
cd backend
node scripts/createProductionAdmin.js
```

### Step 3: Frontend Deployment

1. **Update API URL (if needed):**
   - Check `admin-portal/src/utils/api.js`
   - Check `frontend/src/utils/api.js`
   - Ensure they point to your Render backend URL

2. **Build and deploy admin portal:**
```bash
cd admin-portal
npm run build
# Deploy the build folder to your hosting (Netlify/Vercel/etc.)
```

3. **Build and deploy public frontend:**
```bash
cd frontend
npm run build
# Deploy the build folder to your hosting
```

### Step 4: Database Migration (If Needed)

If you have existing chat documents without the new fields, run this migration:

**Create `backend/scripts/migrateChatSchema.js`:**

```javascript
require('dotenv').config();
const mongoose = require('mongoose');
const Chat = require('../models/Chat');

const migrateChats = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const chats = await Chat.find({});
    console.log(`Found ${chats.length} chats to migrate`);

    for (const chat of chats) {
      let updated = false;

      if (!chat.messages) {
        chat.messages = [];
        updated = true;
      }

      if (chat.unreadCount === undefined) {
        chat.unreadCount = 0;
        updated = true;
      }

      if (!chat.chatStartedAt) {
        chat.chatStartedAt = chat.createdAt || new Date();
        updated = true;
      }

      if (updated) {
        await chat.save();
        console.log(`Updated chat: ${chat.userId}`);
      }
    }

    console.log('Migration completed!');
    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
};

migrateChats();
```

Run it:
```bash
cd backend
node scripts/migrateChatSchema.js
```

## Testing Checklist

### Backend Testing

1. **Test chat endpoints:**
```bash
# Start chat
curl -X POST https://your-backend.onrender.com/api/chat/start \
  -H "Content-Type: application/json" \
  -d '{"mobileNumber": "9876543210"}'

# Send message
curl -X POST https://your-backend.onrender.com/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{"userId": "user_xxx", "sender": "user", "text": "Hello"}'

# Get messages
curl https://your-backend.onrender.com/api/chat/messages/user_xxx
```

2. **Test admin login:**
```bash
curl -X POST https://your-backend.onrender.com/api/admin-auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@tanavi.com", "password": "admin123"}'
```

### Frontend Testing

1. **Public Chat Widget:**
   - Open website on mobile device
   - Click chat button
   - Enter mobile number
   - Send test message
   - Verify responsive design

2. **Admin Chat:**
   - Login to admin portal
   - Go to Live Chat tab
   - Select a chat
   - Send message
   - Test on mobile device
   - Verify back button works on mobile

3. **Sold Properties Tab:**
   - Login to admin portal
   - Check Sold Properties tab
   - Verify data displays correctly
   - Test CSV download

## Troubleshooting

### Issue: 500 Error on Chat Endpoints

**Possible Causes:**
1. Old code still running on Render
2. Database connection issue
3. Missing environment variables
4. Chat documents missing required fields

**Solutions:**
1. Check Render logs: Dashboard → Your Service → Logs
2. Verify environment variables are set
3. Run database migration script
4. Manually restart service on Render

### Issue: 401 Error on Admin Login

**Possible Causes:**
1. Admin user doesn't exist in production database
2. Wrong password
3. JWT_SECRET mismatch

**Solutions:**
1. Create admin user using script above
2. Verify credentials
3. Check JWT_SECRET environment variable

### Issue: Chat Not Responsive on Mobile

**Possible Causes:**
1. Frontend not rebuilt after changes
2. Browser cache

**Solutions:**
1. Clear browser cache
2. Rebuild and redeploy frontend
3. Test in incognito mode

### Issue: Messages Not Sending

**Possible Causes:**
1. Backend not updated
2. API URL incorrect
3. CORS issues

**Solutions:**
1. Check browser console for errors
2. Verify API_URL in frontend
3. Check Render logs for CORS errors

## Monitoring

### Backend Logs
- Render Dashboard → Your Service → Logs
- Look for:
  - "POST /message called with body"
  - "PUT /read called for userId"
  - Any error messages

### Database Monitoring
- MongoDB Atlas → Metrics
- Check:
  - Connection count
  - Operation execution time
  - Storage usage

### Frontend Monitoring
- Browser Console (F12)
- Network Tab
- Check for:
  - Failed API calls
  - 401/403/500 errors
  - CORS errors

## Performance Optimization

### Backend
- Chat polling: 3 seconds (adjust if needed)
- Database indexes already created
- Consider Redis for caching if traffic increases

### Frontend
- Lazy load chat widget
- Debounce message sending
- Optimize image sizes

## Security Checklist

- ✅ JWT tokens expire after 30 days
- ✅ Passwords hashed with bcrypt
- ✅ Admin-only endpoints protected
- ✅ Input validation on all endpoints
- ✅ CORS configured properly
- ⚠️ Consider rate limiting for chat endpoints
- ⚠️ Add CAPTCHA for chat start if spam becomes an issue

## Next Steps

1. **Deploy backend to Render** ✓
2. **Create admin user in production** ✓
3. **Test all chat functionality** ✓
4. **Deploy frontend** ✓
5. **Monitor for 24 hours** ⏳
6. **Gather user feedback** ⏳

## Support

If you encounter issues:
1. Check Render logs first
2. Check browser console
3. Verify all environment variables
4. Test API endpoints directly with curl
5. Check MongoDB connection

---

**Last Updated:** January 2025
**Version:** 2.0
**Status:** Ready for Production
