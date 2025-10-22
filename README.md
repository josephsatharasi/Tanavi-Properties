# Tanavi Properties - Admin Dashboard

## Features
- **Role-Based Access Control**: Admin and User roles
- **Property Management**: Full CRUD operations for properties
- **Schedule Management**: Approve and complete customer visit schedules
- **Authentication**: JWT-based secure authentication

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Start MongoDB (ensure MongoDB is installed and running)

3. Create admin user:
```bash
node scripts/createAdmin.js
```

4. Start backend server:
```bash
npm start
```

Backend runs on: http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Start frontend:
```bash
npm start
```

Frontend runs on: http://localhost:3000

## Admin Access

**Login URL**: http://localhost:3000/admin/login

**Default Credentials**:
- Email: admin@tanavi.com
- Password: admin123

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user (protected)

### Properties (Admin only for CUD operations)
- GET `/api/properties` - Get all properties
- GET `/api/properties/:id` - Get single property
- POST `/api/properties` - Create property (admin)
- PUT `/api/properties/:id` - Update property (admin)
- DELETE `/api/properties/:id` - Delete property (admin)

### Schedules (Admin only)
- POST `/api/schedules` - Create schedule (public)
- GET `/api/schedules` - Get all schedules (admin)
- PUT `/api/schedules/:id/status` - Update schedule status (admin)
- DELETE `/api/schedules/:id` - Delete schedule (admin)

## Admin Dashboard Features

### Properties Management
- View all properties in table format
- Add new properties with form
- Edit existing properties
- Delete properties
- Set property status (available/pending/sold)

### Schedule Management
- View all customer visit schedules
- Approve pending schedules
- Mark approved schedules as completed
- Cancel schedules
- View customer contact information

## Environment Variables

Create `.env` file in backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tanavi_properties
JWT_SECRET=your_jwt_secret_key_change_in_production
```

## Tech Stack

**Backend**:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

**Frontend**:
- React
- React Router
- Tailwind CSS
- React Icons
