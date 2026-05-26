# Employee Happiness Radar - Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or pnpm

## Setup Instructions

### 1. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend  
```bash
# From root directory
npm install
```

### 2. Environment Configuration

The backend is already configured with a `.env` file in the `server/` directory with these settings:
- PORT: 5000
- JWT_SECRET: (configured)
- CLIENT_URL: http://localhost:5173
- Database: SQLite (automatically created as `database.sqlite`)

### 3. Start the Application

#### Start Backend Server
```bash
cd server
npm run dev
```

The backend will:
- Connect to SQLite database
- Create tables automatically
- Initialize default admin invite tokens
- Run on http://localhost:5000

#### Start Frontend (in a new terminal)
```bash
# From root directory
npm run dev
```

The frontend will run on http://localhost:5173

## Default Admin Invite Tokens

Use any of these tokens to create an admin account:
- `ADMIN-INVITE-2025-MAIN`
- `ADMIN-INVITE-HR-001`
- `ADMIN-INVITE-EXEC-001`

## Testing the Application

### 1. Create an Employee Account
1. Go to http://localhost:5173
2. Click "Employee Login"
3. Click "Sign Up"
4. Fill in the form with:
   - Name
   - Email
   - Password
   - Department
5. Submit to create account

### 2. Create an Admin Account
1. Go to http://localhost:5173
2. Click "Admin Login"
3. Click "Sign Up"
4. Fill in the form with:
   - Name
   - Email
   - Password
   - Invite Token (use one from above)
5. Submit to create account

### 3. Test Employee Features
- Daily mood check-in (happiness, stress, motivation, hydration)
- View mood history and statistics
- Complete surveys
- Submit feedback

### 4. Test Admin Features
- View dashboard with overall statistics
- Monitor employee wellbeing trends
- View department analytics
- Check burnout alerts
- Manage employees
- Create and manage surveys
- Review feedback

## Database

The application uses SQLite database stored in `/server/database.sqlite`. This file is created automatically when you first run the server.

To reset the database:
1. Stop the server
2. Delete `/server/database.sqlite`
3. Restart the server

## API Endpoints

Backend API is available at http://localhost:5000/api

### Health Check
```
GET /api/health
```

### Authentication
```
POST /api/auth/employee/signup
POST /api/auth/employee/login
POST /api/auth/admin/signup
POST /api/auth/admin/login
GET  /api/auth/me
```

### Mood Check-ins (Employee)
```
POST /api/mood/checkin
GET  /api/mood/my-checkins
GET  /api/mood/today
GET  /api/mood/my-streak
GET  /api/mood/stats
```

### Surveys
```
GET  /api/survey/active
GET  /api/survey/:id
POST /api/survey/:id/respond
GET  /api/survey/my/responses
```

### Feedback
```
POST /api/feedback
GET  /api/feedback/my-feedback
```

### Admin
```
GET    /api/admin/dashboard
GET    /api/admin/trends
GET    /api/admin/department-stats
GET    /api/admin/burnout-alerts
GET    /api/admin/employees
GET    /api/admin/employees/:id
DELETE /api/admin/employees/:id
GET    /api/admin/surveys
POST   /api/admin/surveys
PATCH  /api/admin/surveys/:id/toggle
DELETE /api/admin/surveys/:id
GET    /api/admin/surveys/:id/responses
GET    /api/admin/feedback
PATCH  /api/admin/feedback/:id
POST   /api/admin/tokens/generate
GET    /api/admin/tokens
```

## Troubleshooting

### Backend won't start
- Make sure port 5000 is not in use
- Check that all dependencies are installed: `cd server && npm install`
- Verify `.env` file exists in `/server` directory

### Frontend won't start
- Make sure port 5173 is not in use
- Check that dependencies are installed: `npm install`
- Clear browser cache and try again

### Login issues
- Make sure backend is running on port 5000
- Check browser console for error messages
- Verify credentials are correct

### Admin panel not showing data
- Make sure you're logged in as an admin
- Verify there are employees and data in the database
- Check browser console for API errors

## Features

### Employee Dashboard
- 📊 Daily mood check-in with 4 metrics
- 🔥 Streak tracking for consecutive check-ins
- 📈 Personal mood statistics and history
- 📝 Complete surveys
- 💬 Submit feedback (anonymous or identified)

### Admin Dashboard
- 📊 Overall statistics (employees, check-ins, surveys, feedback)
- 📈 Mood trends over time
- 🏢 Department-wise analytics
- ⚠️ Burnout detection alerts
- 👥 Employee management
- 📋 Survey creation and management
- 💬 Feedback review and response

## Support

For issues or questions:
1. Check the browser console for errors
2. Check the server logs
3. Verify the database file exists
4. Ensure both frontend and backend are running
