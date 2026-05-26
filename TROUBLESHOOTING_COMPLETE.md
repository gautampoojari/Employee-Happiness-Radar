# 🔧 Troubleshooting Guide - Login & Database Issues

## Problem: Cannot Login or Create Accounts

This guide addresses the specific issues with:
- ❌ Login not working for admin or employee
- ❌ Account creation failing
- ❌ Admin panel not showing employee data
- ❌ Backend-frontend integration issues

---

## 🚨 Quick Fix (Start Here!)

### Step 1: Stop Everything
```bash
# Stop both backend and frontend servers
# Press Ctrl+C in both terminal windows
```

### Step 2: Reset Database
```bash
cd server

# Delete the old database
rm database.sqlite  # On Mac/Linux
# OR
del database.sqlite  # On Windows

# Reseed with fresh data
npm run seed
```

### Step 3: Verify .env File Exists
```bash
# Make sure you're in the server directory
cd server

# Check if .env exists
ls -la .env  # On Mac/Linux
# OR
dir .env  # On Windows
```

If `.env` doesn't exist, create it with this content:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (Change this in production!)
JWT_SECRET=your-super-secret-jwt-key-employee-happiness-radar-2024

# Client URL for CORS
CLIENT_URL=http://localhost:5173
```

### Step 4: Verify Dependencies Are Installed
```bash
# In server directory
cd server
npm install

# In root directory (for frontend)
cd ..
npm install
```

### Step 5: Start Fresh
```bash
# Terminal 1: Start backend
cd server
npm start

# Wait for these messages:
# ✅ SQLite database connected successfully
# ✅ Database tables synchronized
# ✅ Default admin tokens initialized
# 🚀 Server running on port 5000

# Terminal 2: Start frontend
npm run dev

# Open http://localhost:5173
```

---

## 🔍 Detailed Diagnostics

### Test 1: Check Backend is Running

Open this URL in your browser:
```
http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-XX...",
  "database": "SQLite connected"
}
```

**If you get an error:**
- Backend is not running → Start it with `cd server && npm start`
- Port 5000 is in use → Kill the process or change PORT in .env

### Test 2: Check Database Has Data

```bash
cd server
npm run view
```

This command shows all data in your database.

**Expected Output:**
```
👥 USERS
--------
   👑 Admin User
      Email: admin@example.com
      Role: admin
      ...
   
   👤 John Smith
      Email: john@example.com
      Role: employee
      Department: Engineering
      ...
```

**If you see "No users found":**
```bash
npm run seed
```

### Test 3: Check Frontend API Connection

1. Open browser DevTools (F12)
2. Go to http://localhost:5173
3. Look at Console tab

**Good signs:**
- No errors in console
- You see the landing page

**Bad signs (fix these):**
- "Network Error" → Backend not running
- "CORS Error" → Wrong CLIENT_URL in .env
- "Failed to fetch" → Backend URL wrong

### Test 4: Test Login Directly

Open DevTools Console and run:
```javascript
fetch('http://localhost:5000/api/auth/employee/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
})
.then(r => r.json())
.then(console.log)
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

**If you get an error:**
- "Invalid credentials" → Database not seeded
- "User not found" → Run `npm run seed`
- Network error → Backend not running

---

## 🐛 Common Issues & Solutions

### Issue 1: "Invalid credentials" when logging in

**Cause:** Database doesn't have the test users

**Solution:**
```bash
cd server
npm run seed
```

**Test accounts after seeding:**
- Admin: admin@example.com / admin123
- Employee: john@example.com / password123

---

### Issue 2: "Port 5000 already in use"

**Solution (Mac/Linux):**
```bash
# Find process using port 5000
lsof -i :5000

# Kill it
kill -9 <PID>
```

**Solution (Windows):**
```cmd
# Find process
netstat -ano | findstr :5000

# Kill it (run as Admin)
taskkill /PID <PID> /F
```

**Or change the port in `/server/.env`:**
```env
PORT=5001
```

Then update frontend API URL (if needed).

---

### Issue 3: Admin panel shows no employee data

**Possible causes:**
1. Not logged in as admin
2. Database has no employees
3. Backend API not responding

**Solutions:**

**1. Verify you're logged in as admin:**
```javascript
// In browser console on http://localhost:5173
console.log(localStorage.getItem('hr_admin'));
```

Should show admin user data. If null, you're not logged in as admin.

**2. Check database has employees:**
```bash
cd server
npm run view
```

Look for employees in the output. If none, run `npm run seed`.

**3. Check API is responding:**

Open browser DevTools → Network tab, then refresh admin dashboard.

Look for these API calls:
- `/api/admin/dashboard` → Should return 200 OK
- `/api/admin/employees` → Should return 200 OK

If you see 401 Unauthorized:
- Token expired or invalid
- Clear localStorage: `localStorage.clear()` in console
- Login again

If you see 500 Internal Server Error:
- Check backend console for errors
- Database might be corrupted → Run `npm run reset`

---

### Issue 4: Cannot create new employee account

**Symptoms:**
- Form submits but shows error
- "Email already exists" error

**Solutions:**

**1. Email already exists:**
```bash
# Check existing emails
cd server
npm run view
```

Look at the USERS section. Use a different email.

**2. Database error:**

Check backend console for errors. Common issues:
- Department not in allowed list → Use: Engineering, Marketing, Sales, HR, Finance, Operations, Customer Support, Design, Product, Other
- Password too short → Must be at least 6 characters
- Invalid email format

**3. Reset and try again:**
```bash
cd server
npm run reset
```

---

### Issue 5: "Network Error" or "Failed to fetch"

**This means frontend cannot reach backend.**

**Checklist:**

✅ Backend is running on port 5000
```bash
# Check this URL in browser:
http://localhost:5000/api/health
```

✅ Frontend API is pointing to correct URL

In browser console:
```javascript
console.log(import.meta.env.VITE_API_URL || 'http://localhost:5000/api');
```

Should show: `http://localhost:5000/api`

✅ CORS is configured correctly

In `/server/.env`:
```env
CLIENT_URL=http://localhost:5173
```

✅ No firewall blocking localhost connections

---

### Issue 6: Token/Auth errors

**Symptoms:**
- "Invalid token"
- "Token expired"
- Auto-logout on page refresh

**Solutions:**

**1. Clear all auth data:**
```javascript
// In browser console
localStorage.clear();
```

Then login again.

**2. Check JWT_SECRET exists:**
```bash
# In server directory
cat .env | grep JWT_SECRET
```

Should show:
```
JWT_SECRET=your-super-secret-jwt-key-employee-happiness-radar-2024
```

If not there, add it and restart backend.

**3. Token expired:**

Tokens expire after 7 days. If you seeded the database more than 7 days ago, just login again.

---

### Issue 7: Admin invite token not working

**Symptoms:**
- "Invalid invite token"
- "Token has already been used"
- "Token has expired"

**Solutions:**

**1. Check available tokens:**
```bash
cd server
npm run view
```

Look at the "ADMIN INVITE TOKENS" section.

**2. Generate new token:**

Method 1 - Via admin panel (if you have admin access):
- Login as admin
- Go to Settings
- Generate new invite token

Method 2 - Reseed database:
```bash
cd server
npm run reset
```

This creates fresh tokens:
- ADMIN-INVITE-2025-MAIN
- ADMIN-INVITE-HR-001
- ADMIN-INVITE-EXEC-001

**3. Token already used:**

Each token can only be used once. Generate a new one or use a different token from the list.

---

### Issue 8: Database locked or corrupted

**Symptoms:**
- "Database is locked" error
- "SQLITE_CORRUPT" error
- Weird behavior after crashes

**Solution:**

```bash
cd server

# Stop backend (Ctrl+C)

# Delete corrupted database
rm database.sqlite

# Create fresh database
npm run seed

# Restart backend
npm start
```

---

## 📋 Complete Reset Procedure

If nothing works, do a complete reset:

### Step 1: Stop all servers
```bash
# Press Ctrl+C in all terminal windows
```

### Step 2: Clean everything
```bash
# Delete database
cd server
rm database.sqlite

# Delete node_modules (optional but recommended)
rm -rf node_modules
cd ..
rm -rf node_modules
```

### Step 3: Reinstall everything
```bash
# Backend
cd server
npm install
npm run seed
cd ..

# Frontend
npm install
```

### Step 4: Start fresh
```bash
# Terminal 1
cd server
npm start

# Terminal 2 (new terminal)
npm run dev
```

### Step 5: Test login
1. Go to http://localhost:5173
2. Click "Employee Portal"
3. Login: john@example.com / password123
4. Should see dashboard

---

## 🔗 Quick Links

- **Backend Health:** http://localhost:5000/api/health
- **Frontend:** http://localhost:5173
- **Database:** `server/database.sqlite`

---

## 📞 Still Not Working?

If you've tried everything above and it still doesn't work:

### 1. Check versions
```bash
node --version  # Should be v16 or higher
npm --version   # Should be v7 or higher
```

### 2. Collect error logs

**Backend errors:**
- Look at the terminal where you ran `npm start`
- Copy the full error message

**Frontend errors:**
- Open DevTools (F12)
- Go to Console tab
- Copy any red errors

**Database state:**
```bash
cd server
npm run view
```

### 3. Check files exist
```bash
# These files MUST exist:
ls server/.env
ls server/database.sqlite
ls server/package.json
ls package.json
```

---

## ✅ Success Checklist

After troubleshooting, verify everything works:

- [ ] Backend starts without errors
- [ ] `http://localhost:5000/api/health` returns OK
- [ ] `cd server && npm run view` shows users
- [ ] Frontend opens at http://localhost:5173
- [ ] Can login as employee (john@example.com / password123)
- [ ] Employee dashboard shows mood check-in form
- [ ] Can login as admin (admin@example.com / admin123)
- [ ] Admin dashboard shows employee list
- [ ] Admin can see mood analytics
- [ ] Can create new employee account
- [ ] Can create new admin account with invite token

---

## 🎉 Working Now?

If everything is working:
1. ✅ Test creating a new employee account
2. ✅ Submit a mood check-in
3. ✅ Login as admin and view the data
4. ✅ Explore all features

Congratulations! Your Employee Happiness Radar is fully operational! 💚
