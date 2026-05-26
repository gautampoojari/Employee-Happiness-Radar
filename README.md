# 🎯 **START HERE** - Employee Happiness Radar

## ⚡ QUICKEST START (2 Commands)

### Step 1: Run Setup
```bash
./setup.sh       # Mac/Linux
setup.bat        # Windows
```

### Step 2: Start Application
```bash
# Terminal 1: Backend
cd server && npm start

# Terminal 2: Frontend
npm run dev
```

**Then open:** http://localhost:5173

**Login:** admin@example.com / admin123 (Admin) or john@example.com / password123 (Employee)

---

## 🎯 New User? Start Here

**Never set this up before?** Read: **[START_HERE_SIMPLE.md](START_HERE_SIMPLE.md)** ⭐

This 3-step visual guide gets you running in 5 minutes with screenshots of what to expect.

---

## 📚 Choose Your Guide

Pick the documentation that fits your needs:

### 🚀 Setup & Installation
- **[START_HERE_SIMPLE.md](START_HERE_SIMPLE.md)** ⭐ **START HERE!** Visual 3-step guide
- **[SETUP_COMPLETE.md](SETUP_COMPLETE.md)** - Complete reference guide
- **[COMPLETE_SETUP_GUIDE.md](COMPLETE_SETUP_GUIDE.md)** - Detailed setup with all options
- **[START_HERE.md](START_HERE.md)** - Comprehensive quick start

### 🔧 Troubleshooting
- **[TROUBLESHOOTING_COMPLETE.md](TROUBLESHOOTING_COMPLETE.md)** - Fix login & database issues
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - General troubleshooting

### 📖 Technical Docs
- **[README_START_HERE.md](README_START_HERE.md)** - Project overview
- **[MIGRATION_COMPLETE.md](MIGRATION_COMPLETE.md)** - MongoDB to SQLite migration
- **[server/API_REFERENCE.md](server/API_REFERENCE.md)** - Backend API docs

---

## 🔍 System Check

Run diagnostic to verify everything is set up:

**Mac/Linux:**
```bash
chmod +x diagnostic.sh
./diagnostic.sh
```

**Windows:**
```bash
diagnostic.bat
```

---

## 🗄️ View Database

See all data in your SQLite database:

```bash
cd server
npm run view
```

---

## ⚙️ Available Commands

### Backend (in `/server` directory)
```bash
npm start       # Start backend server
npm run dev     # Start with auto-reload
npm run seed    # Add sample data
npm run reset   # Delete DB and reseed
npm run view    # View all database data
```

### Frontend (in root directory)
```bash
npm run dev     # Start frontend dev server
npm run build   # Build for production
npm run preview # Preview production build
```

---

## 🔐 Default Login Credentials

### Admin Account
- Email: `admin@example.com`
- Password: `admin123`

### Employee Account
- Email: `john@example.com`
- Password: `password123`

### Admin Invite Tokens
- `ADMIN-INVITE-2025-MAIN`
- `ADMIN-INVITE-HR-001`
- `ADMIN-INVITE-EXEC-001`

---

## ✅ Verify Setup

1. **Backend health:** http://localhost:5000/api/health
2. **View database:** `cd server && npm run view`
3. **Login as employee:** john@example.com
4. **Login as admin:** admin@example.com
5. **Admin sees data:** Check employee list
6. **Create account:** Try creating new employee

---

## 🐛 Common Issues

### "Cannot login"
```bash
cd server
npm run seed
```

### "Admin panel shows no data"
```bash
cd server
npm run view  # Check if data exists
npm run seed  # If empty, reseed
```

### "Network Error"
1. Check backend is running: http://localhost:5000/api/health
2. Check `CLIENT_URL` in `/server/.env` = `http://localhost:5173`
3. Restart both servers

### "Port already in use"
- Kill process on port 5000 or 5173
- Or change PORT in `/server/.env`

### "Database locked"
```bash
cd server
rm database.sqlite
npm run seed
```

**Full troubleshooting:** See [TROUBLESHOOTING_COMPLETE.md](TROUBLESHOOTING_COMPLETE.md)

---

## 📂 Project Structure

```
/
├── server/                  # Backend (Express + SQLite)
│   ├── .env                # Config (auto-created)
│   ├── database.sqlite     # Database (auto-created)
│   ├── server.js           # Entry point
│   ├── models/             # Sequelize models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   └── utils/              # Utilities
│
├── src/                    # Frontend (React + Vite)
│   ├── app/                # React components
│   ├── services/           # API services
│   └── styles/             # CSS & Tailwind
│
├── setup.sh/.bat           # Automated setup
├── diagnostic.sh/.bat      # System check
└── Documentation files     # This and other guides
```

---

## 🎨 Features

### For Employees
- ✅ Daily mood tracking (happiness, stress, motivation, hydration)
- ✅ Streak system
- ✅ Submit feedback (anonymous or identified)
- ✅ Complete surveys
- ✅ View personal history

### For Admins
- ✅ View all employees
- ✅ Department analytics
- ✅ Mood trends & charts
- ✅ Burnout detection
- ✅ Survey management
- ✅ Feedback management
- ✅ Generate admin tokens

---

## 💾 Technology Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Shadcn/ui
- **Backend:** Node.js, Express
- **Database:** SQLite (file-based)
- **ORM:** Sequelize
- **Auth:** JWT tokens

---

## 🔄 Reset Everything

If you need a fresh start:

```bash
# Stop servers (Ctrl+C in both terminals)

# Delete database
cd server
rm database.sqlite  # Mac/Linux
del database.sqlite  # Windows

# Reseed
npm run seed

# Restart
npm start

# In new terminal
cd ..
npm run dev
```

---

## 📞 Need Help?

1. **Run diagnostics:** `./diagnostic.sh` or `diagnostic.bat`
2. **View database:** `cd server && npm run view`
3. **Check logs:** Look at both terminal windows
4. **Read guides:** See links at top of this file
5. **Complete reset:** Follow "Reset Everything" above

---

## 🎯 Success Checklist

- [ ] Ran setup script
- [ ] Backend starts without errors
- [ ] Frontend opens at http://localhost:5173
- [ ] Health check works: http://localhost:5000/api/health
- [ ] Database has data: `cd server && npm run view`
- [ ] Can login as employee
- [ ] Can login as admin
- [ ] Admin sees employee data
- [ ] Can submit mood check-in
- [ ] Can create new accounts

---

## 🎉 All Set!

Your Employee Happiness Radar is ready to track workplace wellbeing!

**Next Steps:**
1. Explore the admin dashboard
2. Submit mood check-ins
3. Create surveys
4. Try burnout detection
5. Customize for your organization

**Happy tracking!** 💚

---

## 📄 File Index

Quick reference to all documentation:

| File | Purpose |
|------|---------|
| **README.md** | This file - start here |
| **COMPLETE_SETUP_GUIDE.md** | Detailed setup guide |
| **START_HERE.md** | Quick start guide |
| **TROUBLESHOOTING_COMPLETE.md** | Fix login/database issues |
| **QUICK_START_SQLITE.md** | SQLite-specific guide |
| **MIGRATION_COMPLETE.md** | MongoDB → SQLite migration |
| **README_START_HERE.md** | Original project overview |
| **setup.sh / setup.bat** | Automated setup scripts |
| **diagnostic.sh / diagnostic.bat** | System check scripts |
| **server/API_REFERENCE.md** | Backend API documentation |

---

**Database Location:** `server/database.sqlite`  
**Backend URL:** http://localhost:5000  
**Frontend URL:** http://localhost:5173  
**Tech Support:** See TROUBLESHOOTING_COMPLETE.md