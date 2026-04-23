# User Management Feature - Admin Dashboard

## Overview
Added user management functionality to the admin dashboard for managing chat users.

## Features Added

### Frontend
1. **UserManagement Component** (`admin-portal/src/components/UserManagement.js`)
   - View all registered users (chat users only)
   - Edit user details (name, email, phone)
   - Delete users and their chat messages
   - Clean table interface with user count

2. **Admin Dashboard Integration**
   - New "User Management" tab in sidebar
   - Accessible between "Live Chat" and "Sold Properties"
   - Uses existing toast and modal systems

### Backend
1. **User Management Routes** (`backend/routes/auth.js`)
   - `GET /api/auth/users` - List all users (admin only)
   - `PUT /api/auth/users/:id` - Update user details (admin only)
   - `DELETE /api/auth/users/:id` - Delete user and chat messages (admin only)

## User Management Features

### View Users
- Lists all users with role 'user' (excludes admins)
- Shows: Name, Email, Phone, Join Date
- Total user count displayed

### Edit User
- Update user name
- Update user email
- Update user phone number
- Form validation included

### Delete User
- Confirmation modal before deletion
- Deletes user account
- Automatically deletes all associated chat messages
- Cannot be undone

## Access Control
- Only admin users can access user management
- All routes protected with JWT authentication
- Role-based authorization (admin only)

## UI/UX
- Consistent with existing admin dashboard design
- Blue gradient table headers
- Hover effects on table rows
- Edit and Delete action buttons
- Modal for edit form
- Confirmation dialog for deletion

## Usage

1. Login as admin
2. Click hamburger menu (☰)
3. Select "User Management"
4. View all chat users
5. Click edit icon to update user details
6. Click delete icon to remove user (with confirmation)

## Security
- Admin-only access
- JWT token validation
- Role verification on all endpoints
- Cascade delete for user data

## Notes
- Only affects users with role 'user'
- Admin accounts cannot be managed through this interface
- Deleting a user removes all their chat history
- Changes are immediate and cannot be undone
