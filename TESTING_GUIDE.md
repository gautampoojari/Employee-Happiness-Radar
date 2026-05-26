# Testing Guide - Employee Happiness Radar

## Backend Testing (SQLite Database)

### Step 1: Install Backend Dependencies
```bash
cd server
npm install
```

### Step 2: Run Database Seed (Optional - Creates Sample Data)
```bash
cd server
npm run seed
```

This will create:
- 5 sample employees
- 1 admin user
- Multiple mood check-ins
- 2 surveys with responses
- 3 feedback items
- 3 admin invite tokens

**Sample Credentials After Seeding:**
- Admin: admin@example.com / admin123
- Employee: john@example.com / password123

### Step 3: Start Backend Server
```bash
cd server
npm run dev
```

Expected output:
```
✅ SQLite database connected successfully
✅ Database tables synchronized
✅ Admin tokens already initialized (or initialized)
🚀 Server running on port 5000
📊 Environment: development
🌐 Client URL: http://localhost:5173
```

### Step 4: Test Backend API Endpoints

#### Health Check
```bash
curl http://localhost:5000/api/health
```

Expected: `{"status":"ok","timestamp":"...","database":"SQLite connected"}`

#### Employee Signup
```bash
curl -X POST http://localhost:5000/api/auth/employee/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Employee",
    "email": "test@example.com",
    "password": "password123",
    "department": "Engineering"
  }'
```

Expected: JWT token and user object

#### Employee Login
```bash
curl -X POST http://localhost:5000/api/auth/employee/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Expected: JWT token and user object

## Frontend Testing

### Step 1: Install Frontend Dependencies
```bash
# From root directory
npm install
```

### Step 2: Start Frontend
```bash
npm run dev
```

Expected output:
```
VITE v... ready in ... ms
➜  Local:   http://localhost:5173/
```

### Step 3: Test Employee Flow

1. **Navigate to Application**
   - Open http://localhost:5173 in browser
   - Should see landing page with "Employee Login" and "Admin Login" buttons

2. **Create Employee Account**
   - Click "Employee Login"
   - Click "Sign Up" or "Create Account"
   - Fill in form:
     - Name: Test Employee
     - Email: testemployee@example.com
     - Password: password123
     - Department: Engineering
   - Click "Sign Up"
   - Should redirect to employee dashboard

3. **Test Mood Check-in**
   - On employee dashboard, look for "Daily Check-in" or "Mood Check-in"
   - Fill in ratings (1-5) for:
     - Happiness 😊
     - Stress 😰
     - Motivation 💪
     - Hydration 💧
   - Add optional note
   - Click "Submit Check-in"
   - Should see success message
   - Streak counter should increment

4. **View Mood History**
   - Navigate to mood history section
   - Should see your submitted check-in
   - Should see charts/graphs if available

5. **Complete Survey**
   - Navigate to surveys section
   - Should see active surveys
   - Click on a survey
   - Answer all questions
   - Submit responses
   - Should see success message

6. **Submit Feedback**
   - Navigate to feedback section
   - Choose category
   - Add subject and message
   - Toggle anonymous option if desired
   - Submit feedback
   - Should see success message

7. **Logout**
   - Click logout button
   - Should return to landing page

### Step 4: Test Admin Flow

1. **Create Admin Account**
   - Click "Admin Login"
   - Click "Sign Up" or "Create Account"
   - Fill in form:
     - Name: Test Admin
     - Email: testadmin@example.com
     - Password: admin123
     - Invite Token: ADMIN-INVITE-2025-MAIN
   - Click "Sign Up"
   - Should redirect to admin dashboard

2. **View Dashboard Statistics**
   - Should see overview cards with:
     - Total Employees
     - Total Check-ins
     - Total Surveys
     - Total Feedback
   - Should see average mood metrics
   - Should see charts/graphs

3. **View Employees**
   - Navigate to "Employee Management" or "Employees"
   - Should see list of all employees
   - Should see employee details (name, email, department, streak)
   - Try filtering by department
   - Click on an employee to view details

4. **View Employee Details**
   - Should see employee profile
   - Should see mood check-in history
   - Should see charts for that employee

5. **Check Burnout Alerts**
   - Navigate to burnout alerts section
   - Should see employees at risk (if any)
   - Each alert should show:
     - Employee name and department
     - Severity level
     - Number of concerning check-ins

6. **View Department Analytics**
   - Navigate to department analytics
   - Should see breakdown by department:
     - Employee count
     - Check-in count
     - Average mood metrics

7. **Create Survey**
   - Navigate to "Survey Management" or "Surveys"
   - Click "Create Survey"
   - Fill in:
     - Title
     - Description
     - Add questions (rating and text types)
   - Save survey
   - Should appear in survey list

8. **Manage Surveys**
   - View list of all surveys
   - Toggle survey active/inactive status
   - View survey responses
   - Delete surveys

9. **Review Feedback**
   - Navigate to "Feedback Management" or "Feedback"
   - Should see all feedback (anonymous and identified)
   - Filter by status (pending/reviewed/resolved)
   - Click on feedback to view details
   - Update status
   - Add admin notes
   - Save changes

10. **Generate Invite Tokens**
    - Navigate to settings or token management
    - Click "Generate Token"
    - Add description
    - Set expiration
    - Copy generated token
    - Should see in token list

## Common Issues & Solutions

### Backend Issues

**Issue: Database connection error**
- Solution: Delete `server/database.sqlite` and restart server

**Issue: Port 5000 already in use**
- Solution: Kill process on port 5000 or change PORT in `.env`

**Issue: JWT authentication errors**
- Solution: Clear browser localStorage and login again

### Frontend Issues

**Issue: Cannot connect to backend**
- Solution: Verify backend is running on http://localhost:5000
- Check VITE_API_URL in frontend config

**Issue: Login not working**
- Solution: Check browser console for errors
- Verify credentials are correct
- Check backend logs

**Issue: Admin panel not showing data**
- Solution: Ensure you're logged in as admin
- Verify there's data in database (run seed script)
- Check browser console for API errors

## Verification Checklist

### Employee Features
- [ ] Employee signup works
- [ ] Employee login works
- [ ] Mood check-in submission works
- [ ] Mood history displays correctly
- [ ] Streak counter updates
- [ ] Survey completion works
- [ ] Feedback submission works
- [ ] Anonymous feedback works
- [ ] Logout works

### Admin Features
- [ ] Admin signup with invite token works
- [ ] Admin login works
- [ ] Dashboard statistics load correctly
- [ ] Employee list displays
- [ ] Employee details view works
- [ ] Burnout alerts display
- [ ] Department analytics display
- [ ] Mood trends chart displays
- [ ] Survey creation works
- [ ] Survey management works (toggle, delete)
- [ ] Survey responses display
- [ ] Feedback review works
- [ ] Feedback status update works
- [ ] Token generation works
- [ ] Logout works

### Database
- [ ] SQLite database file created
- [ ] Tables created automatically
- [ ] Data persists after server restart
- [ ] Relationships work correctly
- [ ] Seed script populates data

## Performance Tests

1. **Load Test: Multiple Check-ins**
   - Create 10+ employees
   - Submit check-ins for all employees
   - Verify dashboard loads quickly

2. **Data Volume Test**
   - Run seed script multiple times
   - Verify queries still perform well
   - Check page load times

3. **Concurrent Users**
   - Open multiple browser windows
   - Login as different users
   - Perform actions simultaneously
   - Verify no conflicts

## Database Inspection

To inspect the SQLite database:

```bash
# Install sqlite3 command-line tool (if not installed)
# macOS: brew install sqlite3
# Ubuntu: sudo apt-get install sqlite3

# Open database
cd server
sqlite3 database.sqlite

# View tables
.tables

# View users
SELECT * FROM users;

# View mood check-ins
SELECT * FROM mood_check_ins;

# View surveys
SELECT * FROM surveys;

# Exit
.exit
```

## Reset Database

To start fresh:

```bash
# Stop the server
# Delete database file
rm server/database.sqlite

# Restart server (will create new database)
cd server
npm run dev

# Or run seed script for sample data
npm run seed
```

## Success Criteria

The application is working correctly if:

1. ✅ Backend starts without errors
2. ✅ Frontend starts without errors
3. ✅ Employee can signup and login
4. ✅ Admin can signup with invite token and login
5. ✅ Employee can submit mood check-ins
6. ✅ Admin can view all employee data
7. ✅ Dashboard displays statistics correctly
8. ✅ Surveys can be created and completed
9. ✅ Feedback can be submitted and reviewed
10. ✅ Data persists after server restart
