# Employee Happiness Radar - Quick Start Guide 🚀

## Installation (5 minutes)

```bash
# Step 1: Install dependencies
npm install

# Step 2: Start the app
npm run dev

# Step 3: Open browser
# Go to http://localhost:5173
```

## Your First Login (2 minutes)

### Option A: Admin Access

1. Click **"Admin Portal"** on landing page
2. Click **"Sign up with invite token"**
3. Click **"🎫 Available Admin Tokens"** to expand
4. Click **Copy** on any token (e.g., `ADMIN-INVITE-2025-MAIN`)
5. Fill the form:
   - Name: `Admin User`
   - Email: `admin@test.com`
   - Password: `admin123`
   - Confirm Password: `admin123`
   - Token: (already pasted)
6. Click **"Create Admin Account 🎉"**
7. Login with `admin@test.com` / `admin123`

### Option B: Employee Access

1. Click **"Employee Portal"** on landing page
2. Click **"Create one"** to sign up
3. Fill the form:
   - Name: `Test Employee`
   - Email: `employee@test.com`
   - Department: `Engineering`
   - Password: `emp123`
   - Confirm Password: `emp123`
4. Click **"Create Account 🚀"**
5. Login with `employee@test.com` / `emp123`

## Test the App (5 minutes)

### As Employee:

1. **Submit a Mood Check-in** (Check-in tab)
   - Department: Engineering
   - Happiness: 4
   - Stress: 2
   - Motivation: 5
   - Submit ✅

2. **Check Your Streak** (Overview tab)
   - See your streak count increase! 🔥

3. **Submit Feedback** (Feedback tab)
   - Toggle anonymous mode
   - Write feedback
   - Submit 💬

### As Admin:

1. **View Dashboard** (Overview tab)
   - See employee count
   - View mood averages
   - Check department stats 📊

2. **Create a Survey** (Surveys tab)
   - Click "Create Survey"
   - Add questions (rating and text)
   - Publish 📋

3. **View Employee Data** (Employees tab)
   - Search and filter
   - Click eye icon to view details
   - See mood history 👥

## Admin Tokens

```
🎯 ADMIN-INVITE-2025-MAIN
👥 ADMIN-INVITE-HR-001
💼 ADMIN-INVITE-EXEC-001
```

**Each token works once!** Generate new ones in Admin Settings.

## Common Actions

### Generate New Admin Token
1. Login as admin
2. Go to Settings tab
3. Enter description
4. Click "Generate Token"
5. Copy and share with new admin

### Build Streak
1. Login as employee daily
2. Submit mood check-in
3. Streak increases by 1 each day
4. Miss a day = streak resets

### Trigger Burnout Alert
1. Submit 3+ check-ins with:
   - Stress ≥ 4
   - Motivation ≤ 2
2. Admin will see alert on dashboard

### Toggle Dark Mode
Click sun/moon icon in header (top right)

## Data Storage

All data stored in browser's localStorage:
- Admins, employees, check-ins, surveys, feedback
- Clears when you clear browser data
- No backend server needed for demo

## Need Help?

See full documentation: [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

**That's it! You're ready to explore Employee Happiness Radar! 💚**
