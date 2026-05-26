# Employee Happiness Radar - Complete Installation Guide 🚀

A comprehensive guide to set up and run the Employee Happiness Radar application on your local machine.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation Methods](#installation-methods)
3. [Manual Setup (Step-by-Step)](#manual-setup-step-by-step)
4. [Automated Setup (Recommended)](#automated-setup-recommended)
5. [Running the Application](#running-the-application)
6. [Environment Configuration](#environment-configuration)
7. [Database Management](#database-management)
8. [Troubleshooting](#troubleshooting)
9. [Production Deployment](#production-deployment)

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (v16.0 or higher)
   - Download: https://nodejs.org/
   - Check version: `node --version`
   - Recommended: v18 LTS or v20 LTS

2. **npm** (v8.0 or higher) - comes with Node.js
   - Check version: `npm --version`

3. **Git** (optional, for cloning repository)
   - Download: https://git-scm.com/
   - Check version: `git --version`

### System Requirements

- **RAM:** 2GB minimum (4GB recommended)
- **Disk Space:** 500MB minimum
- **OS:** Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+)

### Verify Prerequisites

Run these commands to verify everything is installed:

```bash
node --version    # Should show v16.0 or higher
npm --version     # Should show v8.0 or higher
```

---

## 🎯 Installation Methods

Choose one of the following methods:

### Method 1: Automated Setup (⚡ Fastest - Recommended)
- **Time:** 3-5 minutes
- **Difficulty:** Easy
- Uses setup script to automate everything
- [Jump to Automated Setup](#automated-setup-recommended)

### Method 2: Manual Setup (📝 Step-by-Step)
- **Time:** 10-15 minutes
- **Difficulty:** Beginner-friendly
- Full control over each step
- [Jump to Manual Setup](#manual-setup-step-by-step)

---

## 📝 Manual Setup (Step-by-Step)

Follow these steps carefully to set up the application manually.

### Step 1: Download the Project

**Option A: Using Git (if installed)**
```bash
# Clone the repository
git clone <repository-url>
cd employee-happiness-radar
```

**Option B: Download ZIP**
1. Download the project ZIP file
2. Extract it to your desired location
3. Open terminal/command prompt in the extracted folder

### Step 2: Install Backend Dependencies

```bash
# Navigate to the backend directory
cd server

# Install all required packages
npm install

# Wait for installation to complete (may take 2-3 minutes)
```

**Expected output:**
```
added 150 packages, and audited 151 packages in 2m
```

### Step 3: Configure Backend Environment

```bash
# Copy the environment template
cp .env.example .env

# On Windows (Command Prompt):
copy .env.example .env

# On Windows (PowerShell):
Copy-Item .env.example .env
```

**Edit `.env` file** (open with any text editor):

```env
# Minimum required configuration:
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-employee-happiness-radar-2024
CLIENT_URL=http://localhost:5173
```

> **Important:** For production, generate a secure JWT_SECRET:
> ```bash
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```

### Step 4: Initialize Database with Sample Data

```bash
# Still in the /server directory
npm run seed
```

**Expected output:**
```
🌱 Seeding database...
✅ Creating admin tokens...
✅ Creating demo employees...
✅ Creating mood check-ins...
✅ Creating surveys...
✅ Database seeded successfully!
```

This creates:
- ✅ Admin tokens for creating admin accounts
- ✅ 5 sample employees with login credentials
- ✅ Historical mood check-ins
- ✅ Sample surveys and feedback

### Step 5: Install Frontend Dependencies

```bash
# Go back to project root
cd ..

# Install frontend packages
npm install

# Wait for installation (may take 3-4 minutes)
```

**Expected output:**
```
added 500+ packages, and audited 501 packages in 3m
```

### Step 6: Configure Frontend Environment (Optional)

```bash
# Copy the environment template
cp .env.example .env

# On Windows (Command Prompt):
copy .env.example .env
```

**Edit `.env` file** (optional - defaults work fine):

```env
# Frontend configuration (optional)
VITE_API_URL=http://localhost:5000/api
```

> **Note:** If not configured, the frontend automatically uses `http://localhost:5000/api`

### Step 7: Verify Installation

Check that everything is installed correctly:

```bash
# Check backend
cd server
npm list --depth=0

# Check frontend
cd ..
npm list --depth=0
```

---

## ⚡ Automated Setup (Recommended)

Use the automated setup script for quick installation.

### For macOS/Linux:

```bash
# Make setup script executable
chmod +x setup.sh

# Run setup script
./setup.sh
```

### For Windows:

**Option A: Using Git Bash or WSL (Recommended)**
```bash
./setup.sh
```

**Option B: Using Command Prompt or PowerShell**
```cmd
setup.bat
```

### What the Script Does:

1. ✅ Checks for Node.js installation
2. ✅ Installs all backend dependencies
3. ✅ Creates `.env` file with default configuration
4. ✅ Initializes SQLite database
5. ✅ Seeds database with sample data
6. ✅ Installs all frontend dependencies
7. ✅ Displays login credentials and next steps

**Expected time:** 3-5 minutes

---

## 🚀 Running the Application

After installation, you need to run both backend and frontend servers.

### Running Both Servers

**You need TWO terminal windows/tabs:**

#### Terminal 1: Start Backend Server

```bash
# Navigate to backend directory
cd server

# Start the backend server
npm start

# For development with auto-restart:
npm run dev
```

**Expected output:**
```
🚀 Server running on port 5000
✅ Database connected successfully
📊 Admin tokens initialized
```

**Backend is ready when you see:** `Server running on port 5000`

#### Terminal 2: Start Frontend Server

```bash
# In project root directory (not /server)
npm run dev
```

**Expected output:**
```
VITE v6.3.5  ready in 1234 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Frontend is ready when you see:** `Local: http://localhost:5173/`

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

You should see the **Employee Happiness Radar** landing page! 🎉

---

## 🔑 Default Login Credentials

### Admin Account

Use these credentials to access the admin dashboard:

```
Email:    admin@example.com
Password: admin123
```

**Admin Access:**
1. Click "Admin Portal" on landing page
2. Enter admin credentials
3. Access full dashboard

### Employee Accounts

Sample employee accounts for testing:

```
Employee 1:
Email:    john@example.com
Password: password123

Employee 2:
Email:    sarah@example.com
Password: password123

Employee 3:
Email:    mike@example.com
Password: password123
```

### Admin Invite Tokens

To create new admin accounts:

```
🎫 ADMIN-INVITE-2025-MAIN
🎫 ADMIN-INVITE-HR-001
🎫 ADMIN-INVITE-EXEC-001
```

**How to use:**
1. Go to Admin Portal → "Sign up with invite token"
2. Enter token and create new admin account
3. Each token can be used once

---

## ⚙️ Environment Configuration

### Backend Environment Variables

Edit `/server/.env` to customize:

```env
# Server Configuration
PORT=5000                           # Backend port
NODE_ENV=development                # Environment mode

# Security
JWT_SECRET=your-secret-here         # JWT signing key (CHANGE IN PRODUCTION!)
JWT_EXPIRES_IN=7d                   # Token expiration

# CORS
CLIENT_URL=http://localhost:5173    # Frontend URL

# Optional Features
MAX_LOGIN_ATTEMPTS=5                # Login attempt limit
LOCKOUT_DURATION=15                 # Lockout time in minutes
```

### Frontend Environment Variables

Edit `/.env` to customize:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Application
VITE_APP_NAME=Employee Happiness Radar
VITE_APP_VERSION=1.0.0

# Features
VITE_ENABLE_DEBUG_MODE=false
VITE_DEFAULT_THEME=system
```

### Important Notes:

- ⚠️ All Vite variables must start with `VITE_`
- ⚠️ Frontend variables are exposed to the browser (don't put secrets here!)
- ⚠️ Restart servers after changing environment variables

---

## 💾 Database Management

### View Database Contents

```bash
cd server

# View all data in the database
npm run view
```

### Reset Database

```bash
cd server

# Delete database and recreate with sample data
npm run reset

# On Windows:
del database.sqlite
npm run seed
```

### Seed More Data

```bash
cd server

# Add more sample data (keeps existing data)
npm run seed
```

### Database Location

- **File:** `/server/database.sqlite`
- **Type:** SQLite (file-based)
- **Backup:** Simply copy `database.sqlite` file

### Manual Backup

```bash
# Create backup
cp server/database.sqlite server/database.backup.sqlite

# On Windows:
copy server\database.sqlite server\database.backup.sqlite
```

---

## 🔧 Troubleshooting

### Issue: Port Already in Use

**Error:** `Port 5000 is already in use`

**Solutions:**

**Option 1: Kill the process (Recommended)**
```bash
# On macOS/Linux:
lsof -ti:5000 | xargs kill -9

# On Windows (Command Prompt as Administrator):
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

**Option 2: Change the port**
```bash
# Edit /server/.env
PORT=5001
```

### Issue: "npm: command not found"

**Solution:**
1. Node.js is not installed or not in PATH
2. Download and install from https://nodejs.org/
3. Restart terminal after installation

### Issue: "Cannot find module" errors

**Solution:**
```bash
# Delete node_modules and reinstall

# Backend:
cd server
rm -rf node_modules package-lock.json
npm install

# Frontend:
cd ..
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Network Error" in frontend

**Solutions:**

1. **Check backend is running:**
   ```bash
   curl http://localhost:5000/api/health
   # Should return: {"status":"ok"}
   ```

2. **Check CORS configuration:**
   - Verify `CLIENT_URL` in `/server/.env` = `http://localhost:5173`
   - Restart backend server after changes

3. **Check API URL in frontend:**
   - Verify `VITE_API_URL` in `/.env` = `http://localhost:5000/api`
   - Restart frontend server after changes

### Issue: "Database locked" error

**Solution:**
```bash
cd server

# Close all running servers
# Delete the database
rm database.sqlite

# Recreate database
npm run seed
```

### Issue: Login credentials not working

**Solution:**
```bash
cd server

# Reset database with fresh credentials
npm run reset

# Or view what's in the database
npm run view
```

### Issue: Frontend shows blank page

**Solutions:**

1. **Check browser console** (F12 → Console tab)
2. **Clear browser cache** (Ctrl+Shift+Delete)
3. **Verify backend is running** on port 5000
4. **Check for JavaScript errors** in console

### Issue: Permission denied on setup.sh

**Solution:**
```bash
# Make script executable
chmod +x setup.sh

# Run again
./setup.sh
```

---

## 🌐 Production Deployment

### Pre-Deployment Checklist

Before deploying to production:

#### Backend (Server)

- [ ] Generate secure JWT_SECRET
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
- [ ] Set `NODE_ENV=production` in `.env`
- [ ] Update `CLIENT_URL` to production frontend URL
- [ ] Configure database backup strategy
- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure rate limiting
- [ ] Set up logging service
- [ ] Remove sample/demo data

#### Frontend

- [ ] Update `VITE_API_URL` to production API URL
- [ ] Set `VITE_ENABLE_DEBUG_MODE=false`
- [ ] Build production bundle: `npm run build`
- [ ] Test production build locally
- [ ] Configure CDN for static assets (optional)

### Deployment Options

#### Backend Deployment

**Recommended Platforms:**
- **Railway** - Easy Node.js deployment
- **Heroku** - Established PaaS platform
- **DigitalOcean App Platform** - Full control
- **AWS Elastic Beanstalk** - Scalable solution
- **Google Cloud Run** - Containerized deployment

**Example: Railway Deployment**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
cd server
railway up
```

#### Frontend Deployment

**Recommended Platforms:**
- **Vercel** - Optimized for Vite/React
- **Netlify** - Easy drag-and-drop deployment
- **GitHub Pages** - Free hosting
- **Cloudflare Pages** - Fast CDN

**Example: Vercel Deployment**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts
```

### Environment Variables for Production

**Backend (.env):**
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=<SECURE_RANDOM_64_CHAR_STRING>
JWT_EXPIRES_IN=7d
CLIENT_URL=https://your-frontend-domain.com
DATABASE_URL=<production_database_url>  # If using PostgreSQL/MySQL
```

**Frontend (.env):**
```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_APP_NAME=Employee Happiness Radar
VITE_ENABLE_DEBUG_MODE=false
```

---

## 📚 Additional Resources

### Documentation Files

- **README.md** - Project overview
- **SETUP_COMPLETE.md** - Setup verification guide
- **TESTING_GUIDE.md** - Testing instructions
- **TROUBLESHOOTING.md** - Common issues
- **server/API_REFERENCE.md** - API documentation
- **server/ARCHITECTURE.md** - System architecture

### Useful Commands

```bash
# Backend
cd server
npm start           # Start backend server
npm run dev         # Start with auto-restart (nodemon)
npm run seed        # Seed database
npm run reset       # Reset database
npm run view        # View database contents

# Frontend
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build

# Database
# View SQLite database (install sqlite3):
sqlite3 server/database.sqlite
sqlite> .tables
sqlite> SELECT * FROM Users;
sqlite> .exit
```

### Support & Help

If you encounter issues:

1. **Check documentation** in the repository
2. **Search existing issues** on GitHub
3. **Create a new issue** with:
   - Error messages
   - Steps to reproduce
   - System information (OS, Node version)
   - Screenshots (if applicable)

---

## 🎉 Success!

You should now have Employee Happiness Radar running locally!

**Next Steps:**

1. ✅ Login with admin credentials
2. ✅ Explore the admin dashboard
3. ✅ Create employee accounts
4. ✅ Submit mood check-ins
5. ✅ Create surveys
6. ✅ View analytics

**Need help?** Check the [Troubleshooting](#troubleshooting) section above.

---

**Last Updated:** March 3, 2026
**Version:** 1.0.0
