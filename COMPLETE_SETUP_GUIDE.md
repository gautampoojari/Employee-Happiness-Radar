# 🚀 COMPLETE SETUP & FIX GUIDE
## Employee Happiness Radar - SQLite Edition

**This guide fixes all login, account creation, and data visibility issues.**

---

## 🎯 What This Does

This setup will:
- ✅ Create SQLite database (no MongoDB needed)
- ✅ Set up admin and employee accounts with working login
- ✅ Enable account creation for new users
- ✅ Show employee data in admin panel
- ✅ Connect frontend and backend properly
- ✅ Seed sample data for testing

---

## 📋 Prerequisites

- **Node.js v16+** - Download from https://nodejs.org/
- **npm** (comes with Node.js)
- **2 Terminal windows** (you'll need both open)

---

## 🚀 Installation (Choose One Method)

### Method A: Automated Setup (Recommended)

**On Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**On Windows:**
```bash
setup.bat
```

The script does everything automatically. Skip to "Starting the Application" section.

---

### Method B: Manual Setup (If script doesn't work)

#### Step 1: Install Backend Dependencies
```bash
cd server
npm install
```

#### Step 2: Create .env File
Create `/server/.env` with this content:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-employee-happiness-radar-2024
CLIENT_URL=http://localhost:5173
```

#### Step 3: Seed Database
```bash
# Still in server directory
npm run seed
```

You should see:
```
✅ Database seeded successfully!
📊 Sample Data Created:
   - 5 employees
   - 1 admin
   - 18 mood check-ins
   ...
```

#### Step 4: Install Frontend Dependencies
```bash
# Go back to root directory
cd ..
npm install
```

---

## ▶️ Starting the Application

### Terminal 1: Start Backend
```bash
cd server
npm start
```

**Wait for these messages:**
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
# In root directory (not server directory)
npm run dev
```

**Wait for:**
```
➜  Local:   http://localhost:5173/
```

---

## 🔐 Login Credentials

### Test as Admin
1. Go to http://localhost:5173
2. Click **"Admin Portal"**
3. Login with:
   - **Email:** admin@example.com
   - **Password:** admin123

### Test as Employee
1. Go to http://localhost:5173
2. Click **"Employee Portal"**
3. Login with:
   - **Email:** john@example.com
   - **Password:** password123

### Create New Employee
1. Click **"Employee Portal"** → **"Create one"**
2. Fill in form with your details
3. Choose any department
4. Click "Sign Up"
5. Login with your new credentials

### Create New Admin
1. Click **"Admin Portal"** → **"Create one"**
2. Fill in form
3. Use invite token: **ADMIN-INVITE-2025-MAIN**
4. Click "Create Admin Account"
5. Login with your new credentials

---

## 🗄️ Viewing Database

### Method 1: Command Line Tool
```bash
cd server
npm run view
```

This shows all data in your database.

### Method 2: SQLite Browser
Download [DB Browser for SQLite](https://sqlitebrowser.org/) and open:
```
server/database.sqlite
```

### Method 3: VS Code Extension
Install "SQLite Viewer" extension and open `server/database.sqlite`

---

## ✅ Verify Everything Works

### Test 1: Backend Health Check
Open in browser: http://localhost:5000/api/health

Should show:
```json
{
  "status": "ok",
  "timestamp": "...",
  "database": "SQLite connected"
}
```

### Test 2: View Database
```bash
cd server
npm run view
```

Should show lists of users, check-ins, surveys, etc.

### Test 3: Employee Login & Check-in
1. Login as john@example.com / password123
2. Dashboard should show:
   - Current streak
   - Mood tracking form
   - Previous check-ins
3. Submit a mood check-in
4. Should see success message

### Test 4: Admin Dashboard
1. Login as admin@example.com / admin123
2. Dashboard should show:
   - Total employees count
   - Mood analytics charts
   - Department statistics
   - Recent feedback
3. Click "Employee Management"
4. Should see list of all employees

### Test 5: Create Accounts
1. Try creating new employee account
2. Try creating new admin account with token
3. Both should work without errors

---

## 🐛 Troubleshooting

### Problem: Backend won't start

**Fix:**
```bash
# Check if port 5000 is in use
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill process or change port in /server/.env
```

### Problem: Login says "Invalid credentials"

**Fix:**
```bash
cd server
npm run seed
```

### Problem: Admin panel shows no data

**Fix:**
```bash
# Check database has data
cd server
npm run view

# If empty, reseed
npm run seed
```

### Problem: "Network Error" in frontend

**Fix:**
1. Make sure backend is running (check http://localhost:5000/api/health)
2. Check CLIENT_URL in `/server/.env` is `http://localhost:5173`
3. Restart both backend and frontend

### Problem: Database is corrupted/locked

**Fix:**
```bash
cd server
rm database.sqlite
npm run seed
npm start
```

### Problem: Account creation fails

**Fix:**
```bash
# Reset database
cd server
npm run reset
npm start
```

---

## 🔄 Reset Everything

If nothing works, do a complete reset:

```bash
# Stop both servers (Ctrl+C)

# Delete database
cd server
rm database.sqlite

# Reseed
npm run seed

# Start backend
npm start

# In new terminal, start frontend
npm run dev
```

---

## 📂 Important Files

```
/
├── server/
│   ├── .env                 ← Backend config (PORT, JWT_SECRET)
│   ├── database.sqlite      ← Your database (auto-created)
│   ├── server.js            ← Backend entry point
│   └── package.json         ← Backend dependencies
├── src/
│   ├── app/App.jsx          ← Frontend entry point
│   └── services/api.js      ← API configuration
├── package.json             ← Frontend dependencies
├── setup.sh                 ← Auto-setup script (Mac/Linux)
├── setup.bat                ← Auto-setup script (Windows)
└── START_HERE.md            ← Detailed documentation
```

---

## 🎨 Features Overview

### Employee Features
- 📊 Daily mood tracking (happiness, stress, motivation, hydration)
- 🔥 Streak system for consistent check-ins
- 💬 Submit anonymous or identified feedback
- 📋 Complete surveys
- 📈 View personal mood history

### Admin Features
- 👥 View all employees
- 📊 Department-wise analytics
- 📈 Mood trends over time
- 🚨 Burnout detection alerts
- 📋 Create and manage surveys
- 💬 Review employee feedback
- 🔑 Generate admin invite tokens
- ⚙️ System settings

---

## 📊 Sample Data Included

After seeding, you get:
- **1 Admin:** admin@example.com
- **5 Employees:** john@, sarah@, mike@, emily@, david@ example.com
- **18 Mood check-ins** (3 days of data)
- **2 Active surveys**
- **2 Survey responses**
- **3 Feedback items**
- **3 Admin invite tokens**

All employee passwords: `password123`
Admin password: `admin123`

---

## 📚 Additional Documentation

- **START_HERE.md** - Comprehensive quick start guide
- **TROUBLESHOOTING_COMPLETE.md** - Detailed troubleshooting
- **QUICK_START_SQLITE.md** - SQLite-specific guide
- **MIGRATION_COMPLETE.md** - MongoDB to SQLite migration details
- **server/API_REFERENCE.md** - Complete API documentation

---

## 🔍 Quick Commands Reference

```bash
# Backend (run in /server directory)
npm start           # Start server
npm run dev         # Start with auto-reload
npm run seed        # Add sample data
npm run reset       # Delete DB and reseed
npm run view        # View all database data

# Frontend (run in root directory)
npm run dev         # Start frontend
npm run build       # Build for production
npm run preview     # Preview production build
```

---

## 💡 Tips

1. **Always keep both terminals open** - one for backend, one for frontend
2. **Check backend first** if something doesn't work - http://localhost:5000/api/health
3. **Use `npm run view`** to inspect database anytime
4. **Clear localStorage** if login acting weird: `localStorage.clear()` in browser console
5. **Reseed database** for fresh start: `cd server && npm run reset`

---

## 🎯 Success Criteria

Your setup is complete when:
- ✅ Backend starts without errors on port 5000
- ✅ Frontend opens at http://localhost:5173
- ✅ Health check returns OK
- ✅ Can view database with `npm run view`
- ✅ Can login as admin (admin@example.com)
- ✅ Can login as employee (john@example.com)
- ✅ Admin sees employee data
- ✅ Employee can submit mood check-in
- ✅ Can create new accounts

---

## 🆘 Still Need Help?

If you're still having issues after following this guide:

1. **Check Prerequisites:**
   ```bash
   node --version  # Should be v16+
   npm --version   # Should be v7+
   ```

2. **View logs:**
   - Backend: Look at terminal where you ran `npm start`
   - Frontend: Open browser DevTools (F12) → Console tab

3. **Check files exist:**
   ```bash
   ls server/.env
   ls server/database.sqlite
   ls server/node_modules
   ls node_modules
   ```

4. **Try complete reset:**
   ```bash
   # Delete everything
   rm -rf node_modules server/node_modules server/database.sqlite
   
   # Reinstall
   cd server && npm install && npm run seed && cd ..
   npm install
   
   # Start fresh
   cd server && npm start
   # (New terminal) npm run dev
   ```

---

## 🎉 You're Ready!

Your Employee Happiness Radar is now fully set up with SQLite database. 

**Next Steps:**
1. Explore the admin dashboard
2. Submit mood check-ins as employee
3. Create surveys
4. Try the burnout detection
5. Customize for your needs

**Happy tracking!** 💚

---

**Database Location:** `server/database.sqlite`
**Backend Port:** 5000
**Frontend Port:** 5173
**Tech Stack:** React + Vite + Express + SQLite + Sequelize
