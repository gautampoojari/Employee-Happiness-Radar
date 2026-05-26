# 🚀 Quick Start Guide - Employee Happiness Radar

This guide will get your application up and running in 5 minutes!

## Prerequisites

- Node.js (v16 or higher) - [Download here](https://nodejs.org/)
- npm (comes with Node.js)

## 🎯 Automated Setup (Recommended)

### Option 1: Using Setup Script

**On macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**On Windows:**
```cmd
setup.bat
```

The setup script will:
- ✅ Install all dependencies (backend & frontend)
- ✅ Create the .env file
- ✅ Initialize SQLite database
- ✅ Seed sample data (5 employees, admin, mood check-ins, surveys)
- ✅ Display login credentials

---

## 📋 Manual Setup (Alternative)

If you prefer manual setup:

### Step 1: Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# The .env file already exists with SQLite configuration
# If it doesn't exist, it will be created automatically on first run

# Seed the database with sample data
npm run seed
```

### Step 2: Frontend Setup

```bash
# Go back to root directory
cd ..

# Install frontend dependencies
npm install
```

---

## ▶️ Running the Application

You need **TWO terminal windows**:

### Terminal 1: Start Backend
```bash
cd server
npm start
```

You should see:
```
✅ SQLite database connected successfully
✅ Database tables synchronized
✅ Default admin tokens initialized
🚀 Server running on port 5000
📊 Environment: development
🌐 Client URL: http://localhost:5173
```

### Terminal 2: Start Frontend
```bash
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

---

## 🔐 Default Login Credentials

### Admin Account
- **Email:** admin@example.com
- **Password:** admin123

### Employee Accounts
- **Email:** john@example.com
- **Password:** password123

*(There are 4 more employees with similar credentials)*

---

## 🎫 Admin Invite Tokens

To create new admin accounts, use these tokens:
- `ADMIN-INVITE-2025-MAIN`
- `ADMIN-INVITE-HR-001`
- `ADMIN-INVITE-EXEC-001`

---

## 🗄️ Database

The application uses **SQLite** for the database. The database file is automatically created at:
```
server/database.sqlite
```

### Viewing the Database

You can view the SQLite database using:
- [DB Browser for SQLite](https://sqlitebrowser.org/) (Free, cross-platform)
- [SQLite Viewer VS Code Extension](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite)
- Command line: `sqlite3 server/database.sqlite`

### Database Commands

```bash
cd server

# Reset and reseed database (WARNING: Deletes all data!)
npm run reset

# Just seed new data (without deleting)
npm run seed

# Start server
npm start

# Development mode with auto-restart
npm run dev
```

---

## 🎨 Application Features

### Employee Portal
- ✅ Daily mood tracking (happiness, stress, motivation, hydration)
- ✅ Streak system for consistent check-ins
- ✅ Submit anonymous feedback
- ✅ Complete surveys
- ✅ View personal mood history

### Admin Dashboard
- ✅ View all employee data
- ✅ Department-wise analytics
- ✅ Mood trends over time
- ✅ Burnout detection alerts
- ✅ Survey management
- ✅ Feedback management
- ✅ Generate admin invite tokens

---

## 🔍 Testing the Setup

### 1. Test Backend Health
Open: http://localhost:5000/api/health

You should see:
```json
{
  "status": "ok",
  "timestamp": "2024-01-XX...",
  "database": "SQLite connected"
}
```

### 2. Test Employee Login
1. Go to http://localhost:5173
2. Click "Employee Portal"
3. Login with:
   - Email: john@example.com
   - Password: password123
4. You should see the Employee Dashboard

### 3. Test Admin Login
1. Go to http://localhost:5173
2. Click "Admin Portal"
3. Login with:
   - Email: admin@example.com
   - Password: admin123
4. You should see the Admin Dashboard with employee data

### 4. Create New Employee Account
1. Click "Employee Portal" → "Create one"
2. Fill in the form with your details
3. Choose any department
4. You should be automatically logged in

### 5. Create New Admin Account
1. Click "Admin Portal" → "Create one"
2. Fill in the form
3. Use invite token: `ADMIN-INVITE-2025-MAIN`
4. Complete registration
5. Login with your new admin credentials

---

## 🐛 Troubleshooting

### Backend won't start
- **Port 5000 in use?** Kill the process or change PORT in `/server/.env`
- **Dependencies not installed?** Run `cd server && npm install`
- **Database error?** Delete `server/database.sqlite` and run `npm run seed`

### Frontend won't start
- **Port 5173 in use?** Vite will prompt for alternative port
- **Dependencies not installed?** Run `npm install` in root directory
- **Can't connect to backend?** Make sure backend is running on port 5000

### Login not working
- **Make sure backend is running** (check http://localhost:5000/api/health)
- **Database not seeded?** Run `cd server && npm run seed`
- **Clear browser data:** Clear localStorage and cookies for localhost:5173
- **Check console:** Open browser DevTools and check for errors

### Admin panel shows no data
- **Database needs seeding:** Run `cd server && npm run seed`
- **Backend not connected:** Check backend console for errors
- **Login with admin account:** Make sure you're logged in as admin@example.com

### "Network Error" messages
- **Backend not running:** Start backend with `cd server && npm start`
- **CORS issues:** Check that CLIENT_URL in `/server/.env` is `http://localhost:5173`
- **Port mismatch:** Frontend expects backend on port 5000

---

## 📦 Technology Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Shadcn/ui
- **Backend:** Node.js, Express, SQLite, Sequelize ORM
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** SQLite (file-based, no setup required)

---

## 🔄 Resetting Everything

If you want to start fresh:

```bash
# Stop both servers (Ctrl+C in both terminals)

# Delete database
rm server/database.sqlite

# Reseed database
cd server
npm run seed
cd ..

# Restart both servers
```

---

## 📚 Additional Documentation

- `README_START_HERE.md` - Comprehensive overview
- `QUICK_START_SQLITE.md` - SQLite-specific guide
- `MIGRATION_COMPLETE.md` - Migration from MongoDB details
- `TESTING_GUIDE.md` - Complete testing guide
- `server/API_REFERENCE.md` - Backend API documentation

---

## ✅ Success Checklist

- [ ] Node.js installed and working
- [ ] Backend dependencies installed (`cd server && npm install`)
- [ ] Frontend dependencies installed (`npm install` in root)
- [ ] Database seeded (`cd server && npm run seed`)
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can login as employee (john@example.com)
- [ ] Can login as admin (admin@example.com)
- [ ] Admin can see employee data
- [ ] Employee can submit mood check-in

---

## 🆘 Still Having Issues?

If you're still experiencing problems:

1. **Check all logs:** Look at both terminal windows for error messages
2. **Verify ports:** Make sure 5000 and 5173 are available
3. **Fresh install:** Delete `node_modules` and reinstall
4. **Fresh database:** Delete `server/database.sqlite` and reseed
5. **Check Node version:** Make sure you have Node.js v16 or higher

---

## 🎉 You're All Set!

Your Employee Happiness Radar application is now ready to use. Explore the features, track mood check-ins, and manage employee wellbeing data!

**Next Steps:**
- Explore the admin dashboard
- Create mood check-ins as an employee
- Try the burnout detection feature
- Create and manage surveys
- Customize the application for your needs

Happy tracking! 💚
