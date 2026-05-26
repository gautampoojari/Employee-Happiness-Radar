# 🎯 Admin Quick Reference Guide - Employee Happiness Radar

## 📋 Table of Contents
1. [Viewing Employee Details](#viewing-employee-details)
2. [Understanding Burnout Alerts](#understanding-burnout-alerts)
3. [Accessing Mood Check-in Data](#accessing-mood-checkin-data)
4. [Database Verification](#database-verification)
5. [API Endpoints](#api-endpoints)

---

## 👥 Viewing Employee Details

### From Employee Management Panel

1. **Navigate to:** Admin Dashboard → Employees Tab
2. **Search/Filter:** Use search bar or department filter
3. **View Details:** Click the 👁️ (eye) icon next to any employee
4. **Modal Shows:**
   - ✅ Employee name, email, department
   - ✅ Current streak count
   - ✅ Total check-ins count
   - ✅ Last active date
   - ✅ Recent 10 mood check-ins with:
     - 📅 Full date (e.g., "Monday, March 3, 2026")
     - 🕐 Time of check-in (e.g., "10:30 AM")
     - 😊 Happiness score (1-5)
     - 😰 Stress score (1-5)
     - 🚀 Motivation score (1-5)
     - 💧 Hydration score (1-5)
     - 💭 Notes (if provided)

### What You Can See:
```
Employee: John Doe
Email: john@company.com
Department: Engineering
Streak: 7 days 🔥
Total Check-ins: 45 records
Last Active: 3/3/2026

Recent Mood Check-ins (Showing last 10 of 45)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Monday, March 3, 2026                 10:30 AM
😊 Happiness: 4/5  😰 Stress: 3/5
🚀 Motivation: 5/5  💧 Hydration: 4/5
💭 "Feeling great today! Good progress on project."
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🚨 Understanding Burnout Alerts

### What Triggers a Burnout Alert?

An employee is flagged when they have **3 or more** check-ins in their last 5 entries showing:
- **Stress ≥ 4** (High stress)
- **AND**
- **Motivation ≤ 2** (Low motivation)

### Where to Find Burnout Alerts

#### 1. Overview Dashboard
- **Location:** Admin Dashboard → Overview Tab
- **Display:** Red alert card at the top
- **Shows:** Employee name, department, severity, message

#### 2. Analytics Page
- **Location:** Admin Dashboard → Analytics Tab
- **Display:** Burnout Risk Alerts section
- **Shows:** Grid of at-risk employees with details

### Example Burnout Alert:
```
🚨 BURNOUT ALERTS (2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ Jane Smith
   Department: Marketing
   Severity: HIGH
   Message: High stress and low motivation detected
   Recent Check-ins: 5
   Burnout Indicators: 4
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Recommended Actions:
1. ✅ Schedule 1-on-1 meeting with the employee
2. ✅ Review workload and deadlines
3. ✅ Offer support resources
4. ✅ Monitor follow-up check-ins

---

## 📊 Accessing Mood Check-in Data

### 1. Dashboard Overview
**Location:** Overview Tab

**Displays:**
- Total employees count
- Total check-ins across all employees
- Average happiness (company-wide)
- Average stress (company-wide)
- Average motivation (company-wide)
- 7-day trend charts

### 2. Analytics Page
**Location:** Analytics Tab

**Features:**
- Time range selector: 7, 14, or 30 days
- Individual trend charts:
  - Happiness over time
  - Stress levels over time
  - Motivation levels over time
- Department comparison chart
- Department analytics table

### 3. Employee Details Modal
**Location:** Employees Tab → Click eye icon

**Shows:**
- Individual employee's complete check-in history
- Last 10 check-ins with full details
- Total check-ins count
- Each entry includes all 4 metrics + notes

---

## 🗄️ Database Verification

### Check if Data is Stored in SQLite

#### Method 1: View Database (Recommended)
```bash
# Navigate to server directory
cd server

# Run database viewer
node utils/viewDatabase.js

# Output shows:
# ✅ All users
# ✅ All mood check-ins
# ✅ All surveys
# ✅ All feedback
# ✅ Summary statistics
```

#### Method 2: Direct Database Access
```bash
# Install SQLite browser (if needed)
# Database location: /server/database.sqlite

# Or use command line:
cd server
sqlite3 database.sqlite

# Run queries:
SELECT COUNT(*) FROM mood_check_ins;
SELECT * FROM mood_check_ins ORDER BY date DESC LIMIT 10;
SELECT * FROM users WHERE role = 'employee';
```

### What Gets Stored in Database?

#### For Each Mood Check-in:
```sql
- id              (auto-increment)
- user_id         (employee who submitted)
- date            (YYYY-MM-DD format)
- happiness       (1-5)
- stress          (1-5)
- motivation      (1-5)
- hydration       (1-5)
- notes           (optional text)
- createdAt       (timestamp when created)
- updatedAt       (timestamp when last modified)
```

#### Database Features:
- ✅ Automatic timestamps on all records
- ✅ Unique constraint: one check-in per employee per day
- ✅ Foreign key relationships maintained
- ✅ All data persisted permanently
- ✅ Backup utility available

---

## 🔌 API Endpoints

### Employee Management

#### Get All Employees
```
GET /api/admin/employees
Response: { employees: [...] }
```

#### Get Employee Details + Check-ins
```
GET /api/admin/employees/:id
Response: {
  employee: { ...profile },
  checkIns: [...last 30],
  totalCheckIns: 45
}
```

### Analytics

#### Dashboard Statistics
```
GET /api/admin/dashboard
Response: {
  totalEmployees: 25,
  totalCheckIns: 450,
  averages: {
    happiness: 3.8,
    stress: 2.5,
    motivation: 4.1,
    hydration: 3.5
  }
}
```

#### Trend Data
```
GET /api/admin/trends?days=7
Response: { trends: [...daily averages] }
```

#### Department Statistics
```
GET /api/admin/department-stats
Response: { departments: [...stats by dept] }
```

#### Burnout Alerts
```
GET /api/admin/burnout-alerts
Response: { alerts: [...at-risk employees] }
```

---

## ✅ Verification Checklist

Use this checklist to verify everything is working:

### Admin Panel
- [ ] Can log in as admin
- [ ] Overview dashboard loads with statistics
- [ ] Burnout alerts display (if any exist)
- [ ] Trend charts render correctly
- [ ] Can navigate to Employees tab
- [ ] Employee list displays all employees
- [ ] Search and filter work
- [ ] Can click eye icon to view employee details
- [ ] Employee details modal shows:
  - [ ] Basic information
  - [ ] Total check-ins count
  - [ ] Last active date
  - [ ] Recent check-ins with dates/times
  - [ ] All 4 metrics (happiness, stress, motivation, hydration)
  - [ ] Notes display correctly
- [ ] Analytics page shows:
  - [ ] Time range selector works
  - [ ] All trend charts render
  - [ ] Department comparison works
  - [ ] Burnout alerts section displays

### Database
- [ ] Can run `node utils/viewDatabase.js`
- [ ] See all employees
- [ ] See all check-ins
- [ ] Counts match frontend display
- [ ] Timestamps are correct
- [ ] All data fields populated

### Employee Features
- [ ] Employee can submit mood check-in
- [ ] All 4 metrics required
- [ ] Notes are optional
- [ ] Can view own check-in history
- [ ] Streak updates correctly
- [ ] Can't submit duplicate for same day
- [ ] Updating check-in works

---

## 🆘 Troubleshooting

### Issue: Can't See Employee Details
**Check:**
1. Admin is logged in
2. JWT token is valid (check browser console)
3. Backend server is running
4. API endpoint responds: `GET /api/admin/employees/:id`

**Fix:**
```bash
# Restart backend server
cd server
npm start

# Check terminal for errors
# Verify database exists: ls -la database.sqlite
```

### Issue: No Check-ins Showing
**Check:**
1. Employee has actually submitted check-ins
2. Database contains records: `node utils/viewDatabase.js`
3. API returns data (check Network tab in browser)

**Fix:**
```bash
# Add test data
cd server
npm run seed

# This creates sample employees and check-ins
```

### Issue: Burnout Alerts Not Showing
**Check:**
1. Employees have 3+ check-ins
2. At least 3 entries have stress ≥ 4 AND motivation ≤ 2

**Test:**
1. Create employee account
2. Submit 3+ check-ins with:
   - Happiness: 2
   - Stress: 5
   - Motivation: 1
   - Hydration: 2
3. Refresh admin dashboard
4. Alert should appear

---

## 📞 Support

If issues persist:
1. Check terminal logs (both frontend and backend)
2. Check browser console for JavaScript errors
3. Verify database file exists and has correct permissions
4. Review API responses in Network tab
5. Refer to `/COMPLETE_FIX_DOCUMENTATION.md` for technical details

---

## 🎓 Best Practices

### For Admins:
1. ✅ Check burnout alerts daily
2. ✅ Review department statistics weekly
3. ✅ Follow up with at-risk employees promptly
4. ✅ Monitor overall trends for company-wide issues
5. ✅ Backup database regularly

### For the System:
1. ✅ Backup database before making changes
2. ✅ Keep backend server running continuously
3. ✅ Monitor server logs for errors
4. ✅ Ensure employees know how to use check-in feature
5. ✅ Review data privacy policies

---

**Last Updated:** March 3, 2026
**Status:** All Features Operational ✅
