# 🎯 3-STEP SETUP GUIDE

## YOUR PROBLEM
❌ Login not working  
❌ Account creation failing  
❌ Admin panel shows no data  
❌ Backend not connected to frontend  

## MY SOLUTION
✅ **Complete SQLite migration**  
✅ **Fixed all authentication**  
✅ **Connected backend-frontend**  
✅ **Created automated setup**  

---

# 🚀 START HERE - 3 SIMPLE STEPS

## STEP 1: Run Setup (2 minutes)

### Mac/Linux:
```bash
chmod +x setup.sh
./setup.sh
```

### Windows:
```bash
setup.bat
```

**What this does:**
- Installs all dependencies (backend + frontend)
- Creates `.env` configuration file
- Sets up SQLite database
- Seeds sample data (5 employees, 1 admin)
- Shows login credentials

---

## STEP 2: Start Backend (1 terminal)

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
```

**✅ Backend is ready when you see the rocket emoji**

---

## STEP 3: Start Frontend (NEW terminal)

```bash
npm run dev
```

**Wait for:**
```
➜  Local:   http://localhost:5173/
```

**✅ Click the link or visit http://localhost:5173**

---

# 🎉 CONGRATULATIONS!

Your application is now running!

---

# 🔐 TEST IT NOW

## Test 1: Employee Login (30 seconds)

1. Go to: http://localhost:5173
2. Click: **"Employee Portal"**
3. Login with:
   - Email: `john@example.com`
   - Password: `password123`
4. You should see: **Employee Dashboard**
5. Try: Submit a mood check-in

**✅ If you see the dashboard, employee login works!**

---

## Test 2: Admin Login (30 seconds)

1. Go to: http://localhost:5173
2. Click: **"Admin Portal"**
3. Login with:
   - Email: `admin@example.com`
   - Password: `admin123`
4. You should see: **Admin Dashboard with data**
5. Click: **"Employee Management"**
6. You should see: **List of 5 employees**

**✅ If you see employees, admin panel works!**

---

## Test 3: Account Creation (1 minute)

1. Go to: http://localhost:5173
2. Click: **"Employee Portal"** → **"Create one"**
3. Fill in:
   - Name: Your name
   - Email: your-email@test.com
   - Password: test123
   - Department: Any department
4. Click: **"Sign Up"**
5. Login with your new credentials

**✅ If you can login, account creation works!**

---

# 🗄️ VIEW YOUR DATABASE

Want to see what's in your database?

```bash
cd server
npm run view
```

This shows:
- All users (admins & employees)
- All mood check-ins
- All surveys
- All feedback
- Admin tokens

**Example output:**
```
👥 USERS
--------
   👑 Admin User
      Email: admin@example.com
      Role: admin
      Active: Yes
   
   👤 John Smith
      Email: john@example.com
      Role: employee
      Department: Engineering
      Streak: 5 days
      Active: Yes
```

---

# 🔧 IF SOMETHING BREAKS

## Problem 1: "Cannot login"

**Fix:**
```bash
cd server
npm run seed
```

Then try logging in again.

---

## Problem 2: "Admin panel empty"

**Fix:**
```bash
cd server
npm run view
```

If you see "No users found":
```bash
npm run seed
```

---

## Problem 3: "Network Error"

**Fix:**

1. Check backend is running:
   ```bash
   # Open in browser:
   http://localhost:5000/api/health
   ```
   Should show: `{"status":"ok"}`

2. If not working:
   ```bash
   cd server
   npm start
   ```

---

## Problem 4: "Port already in use"

**Kill the process:**

Mac/Linux:
```bash
lsof -i :5000
kill -9 <PID>
```

Windows:
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## Problem 5: "Everything is broken!"

**Complete reset:**

```bash
# 1. Stop both servers (Ctrl+C)

# 2. Delete database
cd server
rm database.sqlite     # Mac/Linux
del database.sqlite    # Windows

# 3. Reseed
npm run seed

# 4. Restart backend
npm start

# 5. In NEW terminal, restart frontend
cd ..
npm run dev
```

---

# ✅ CHECKLIST

Use this to verify everything works:

- [ ] Ran setup script (`setup.sh` or `setup.bat`)
- [ ] Backend starts without errors
- [ ] Frontend opens at http://localhost:5173
- [ ] Can see health check at http://localhost:5000/api/health
- [ ] `npm run view` shows data in database
- [ ] Can login as employee (john@example.com)
- [ ] Can login as admin (admin@example.com)
- [ ] Admin panel shows 5 employees
- [ ] Employee can submit mood check-in
- [ ] Can create new employee account
- [ ] Can create new admin account

**✅ If all checked, you're 100% ready!**

---

# 📚 MORE HELP

Need more detailed help? Check these files:

- **COMPLETE_SETUP_GUIDE.md** - Detailed setup
- **TROUBLESHOOTING_COMPLETE.md** - Fix all issues
- **START_HERE.md** - Comprehensive guide
- **README.md** - Documentation hub

---

# 🎯 QUICK REFERENCE

| What | Command | Location |
|------|---------|----------|
| Start backend | `npm start` | `/server` |
| Start frontend | `npm run dev` | `/` (root) |
| View database | `npm run view` | `/server` |
| Seed database | `npm run seed` | `/server` |
| Reset database | `npm run reset` | `/server` |
| Test APIs | `npm test` | `/server` |
| System check | `./diagnostic.sh` | `/` (root) |

---

# 💡 REMEMBER

1. **Two terminals** - Always keep both running
2. **Backend first** - Start backend before frontend
3. **Check health** - http://localhost:5000/api/health
4. **View data** - `cd server && npm run view`
5. **Reset if needed** - `cd server && npm run reset`

---

# 🌟 YOU'RE DONE!

Your Employee Happiness Radar is fully operational with:
- ✅ SQLite database
- ✅ Working authentication
- ✅ Admin and employee dashboards
- ✅ Mood tracking
- ✅ Survey system
- ✅ Feedback management
- ✅ Analytics and charts

**Enjoy your workplace wellbeing platform! 💚**

---

**Quick Links:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health: http://localhost:5000/api/health
- Database: `server/database.sqlite`

**Default Logins:**
- Admin: admin@example.com / admin123
- Employee: john@example.com / password123

**Admin Token:** ADMIN-INVITE-2025-MAIN
