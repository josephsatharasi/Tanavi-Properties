# Admin Authentication System - Implementation Guide

## Overview
Complete admin authentication system with registration, login, and password recovery using OTP verification via email.

## Features Implemented

### 1. Admin Registration
- **Route**: `/register`
- **File**: `admin-portal/src/pages/AdminRegister.js`
- **Features**:
  - Full name, email, password fields
  - Password confirmation validation
  - Admin secret key verification (prevents unauthorized registrations)
  - Minimum 6-character password requirement
  - Professional Modal dialogs for feedback
  - Auto-login after successful registration

### 2. Admin Login
- **Route**: `/` (root)
- **File**: `admin-portal/src/pages/AdminLogin.js`
- **Features**:
  - Email and password authentication
  - JWT token-based session management
  - Links to registration and password recovery
  - Professional Modal dialogs
  - Loading states

### 3. Password Recovery (Forgot Password)
- **Route**: `/forgot-password`
- **File**: `admin-portal/src/pages/ForgotPassword.js`
- **Features**:
  - 3-step process:
    1. Enter admin email
    2. Verify 6-digit OTP sent to email
    3. Set new password
  - OTP expires in 10 minutes
  - Professional email templates
  - Step-by-step navigation
  - Password strength validation

## Backend API Endpoints

### Admin Authentication Routes (`/api/admin-auth`)

#### 1. Register Admin
```
POST /api/admin-auth/register
Body: {
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "password123",
  "adminSecretKey": "tanavi-admin-2024"
}
Response: {
  "message": "Admin registered successfully",
  "token": "jwt_token",
  "user": { id, name, email, role }
}
```

#### 2. Admin Login
```
POST /api/admin-auth/login
Body: {
  "email": "admin@example.com",
  "password": "password123"
}
Response: {
  "message": "Login successful",
  "token": "jwt_token",
  "user": { id, name, email, role }
}
```

#### 3. Forgot Password (Send OTP)
```
POST /api/admin-auth/forgot-password
Body: {
  "email": "admin@example.com"
}
Response: {
  "message": "OTP sent to your email successfully"
}
```

#### 4. Verify Reset OTP
```
POST /api/admin-auth/verify-reset-otp
Body: {
  "email": "admin@example.com",
  "otp": "123456"
}
Response: {
  "message": "OTP verified successfully",
  "verified": true
}
```

#### 5. Reset Password
```
POST /api/admin-auth/reset-password
Body: {
  "email": "admin@example.com",
  "otp": "123456",
  "newPassword": "newpassword123"
}
Response: {
  "message": "Password reset successfully"
}
```

## Environment Variables

### Backend (.env)
```
ADMIN_SECRET_KEY=tanavi-admin-2024
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Tanavi Properties <your-email@gmail.com>
JWT_SECRET=your_jwt_secret_key
```

## Security Features

1. **Admin Secret Key**: Prevents unauthorized admin registrations
2. **Password Hashing**: Uses bcryptjs with 10 salt rounds
3. **JWT Tokens**: 30-day expiration for admin sessions
4. **OTP Expiration**: 10-minute TTL for OTPs
5. **Email Verification**: OTP sent via nodemailer
6. **Role-Based Access**: Only users with role='admin' can access admin portal

## Email Templates

### Password Reset Email
- Professional HTML template
- Large, centered OTP display
- Expiration warning
- Branded footer

## User Flow

### Registration Flow
1. User visits `/register`
2. Fills in name, email, password, confirm password
3. Enters admin secret key (obtained from system administrator)
4. System validates and creates admin account
5. Auto-login with JWT token
6. Redirects to dashboard

### Login Flow
1. User visits `/` (login page)
2. Enters email and password
3. System validates credentials
4. JWT token stored in localStorage
5. Redirects to dashboard

### Password Recovery Flow
1. User clicks "Forgot Password?" on login page
2. Enters admin email address
3. Receives 6-digit OTP via email
4. Enters OTP for verification
5. Sets new password
6. Redirects to login page

## Files Modified/Created

### Backend
- ✅ `backend/routes/adminAuth.js` (NEW)
- ✅ `backend/server.js` (UPDATED - added admin-auth route)
- ✅ `backend/.env` (UPDATED - added ADMIN_SECRET_KEY)

### Frontend (Admin Portal)
- ✅ `admin-portal/src/pages/AdminRegister.js` (NEW)
- ✅ `admin-portal/src/pages/ForgotPassword.js` (NEW)
- ✅ `admin-portal/src/pages/AdminLogin.js` (UPDATED)
- ✅ `admin-portal/src/App.js` (UPDATED - added routes)

## Testing Instructions

### 1. Register First Admin
```
1. Navigate to: http://localhost:3001/register
2. Fill in:
   - Name: Your Name
   - Email: your-email@example.com
   - Password: password123
   - Confirm Password: password123
   - Admin Secret Key: tanavi-admin-2024
3. Click "Register Admin Account"
4. Should auto-login and redirect to dashboard
```

### 2. Test Login
```
1. Navigate to: http://localhost:3001/
2. Enter registered email and password
3. Click "Login"
4. Should redirect to dashboard
```

### 3. Test Password Recovery
```
1. Navigate to: http://localhost:3001/forgot-password
2. Enter admin email
3. Click "Send OTP"
4. Check email for 6-digit OTP
5. Enter OTP and click "Verify OTP"
6. Enter new password and confirm
7. Click "Reset Password"
8. Should redirect to login page
9. Login with new password
```

## Important Notes

1. **Admin Secret Key**: Change `tanavi-admin-2024` to a secure value in production
2. **Email Configuration**: Ensure Gmail app password is configured correctly
3. **JWT Secret**: Use a strong, unique secret in production
4. **HTTPS**: Always use HTTPS in production for secure authentication
5. **Rate Limiting**: Consider adding rate limiting for OTP endpoints

## Migration from Old System

The old dummy login system has been completely replaced. To migrate:

1. Remove any hardcoded admin credentials
2. Register new admin accounts using the registration page
3. All admins must use the new authentication system
4. Old admin accounts (if any) need to re-register

## Support

For issues or questions:
- Check email configuration in `.env`
- Verify MongoDB connection
- Check browser console for errors
- Verify backend server is running on port 5000
- Check admin secret key matches in registration form

## Default Admin Secret Key
```
tanavi-admin-2024
```
**⚠️ IMPORTANT: Change this in production!**
