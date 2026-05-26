# Employee Happiness Radar - Complete Setup Guide 🚀

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Admin Access](#admin-access)
- [Employee Access](#employee-access)
- [Application Structure](#application-structure)
- [Key Features Explained](#key-features-explained)
- [Testing the Application](#testing-the-application)
- [Development](#development)

---

## 🎯 Overview

**Employee Happiness Radar** is a workplace wellbeing platform that helps organizations track employee mood, detect burnout early, and improve company culture through data-driven insights.

The application consists of two main portals:
- **Admin Dashboard**: For leadership to monitor team wellbeing, manage surveys, and view analytics
- **Employee Dashboard**: For employees to log daily moods, complete surveys, and share feedback

---

## ✨ Features

### Admin Portal Features
✅ **Dashboard Overview**
- Real-time statistics (total employees, check-ins, averages)
- Burnout detection alerts (high stress ≥4 + low motivation ≤2 for 3+ entries)
- Department-wise analytics
- 7-day wellbeing trends with interactive charts

✅ **Employee Management**
- View all employees with search and filter
- Department-based filtering
- View employee mood history
- Delete employee accounts (if needed)
- Track employee streaks and engagement

✅ **Mood & Health Analytics**
- Customizable time ranges (7, 14, 30 days)
- Happiness, stress, and motivation trends
- Department comparison charts
- Burnout risk monitoring

✅ **Survey Management**
- Create surveys with multiple question types:
  - ⭐ Rating questions (1-5 stars)
  - 📝 Text response questions
- Publish/unpublish surveys
- View employee survey responses
- Delete surveys

✅ **Feedback Management**
- View all employee feedback
- Filter by anonymous/identified
- Sort by latest first
- See feedback statistics

✅ **Admin Settings**
- Generate new admin invite tokens
- View and manage existing tokens
- System information and statistics

### Employee Portal Features
✅ **Personal Dashboard**
- Streak counter with gamification 🔥
- Personal wellbeing averages
- 14-day trend charts
- Recent check-in history

✅ **Daily Mood Check-In**
- Happiness level (1-5 with emoji feedback)
- Stress level (1-5 with emoji feedback)
- Motivation level (1-5 with emoji feedback)
- Hydration tracking (water glasses)
- **Required department selection** 🏢
- Optional notes section

✅ **Surveys**
- View and complete active surveys
- Rating and text-based questions
- Beautiful star rating interface

✅ **Feedback System**
- Submit feedback (anonymous or identified)
- Toggle anonymous mode with visual indicator
- Feedback guidelines and privacy information

### System Features
✅ Fully functional authentication (JWT-like)
✅ Beautiful, responsive UI with emojis
✅ Professional dark/light mode (working properly)
✅ Real-time data sync between admin and employee dashboards
✅ Streak system (correctly implemented - one check-in per day)
✅ All data stored in localStorage (browser-based)
✅ Interactive charts and graphs (using Recharts)
✅ Professional color gradients and animations

---

## 🛠️ Tech Stack

**Frontend:**
- React 18.3.1 (JavaScript - **No TypeScript**)
- Tailwind CSS v4
- Recharts (for charts and graphs)
- Lucide React (icons)
- next-themes (dark/light mode)
- Sonner (toast notifications)
- Radix UI components

**Backend/Database:**
- localStorage (browser-based storage)
- Simulated JWT authentication
- All data stored locally

**Note:** This is a frontend-only demo application. In production, you would replace localStorage with a real backend (Node.js + Express + MongoDB).

---

## 🚀 Quick Start

### Installation Steps

1. **Clone or download the project**
```bash
# If you have the files, navigate to the project directory
cd employee-happiness-radar
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to: `http://localhost:5173` (or the URL shown in your terminal)

That's it! The application is now running. 🎉

---

## 👨‍💼 Admin Access

### Default Admin Invite Tokens

To create an admin account, you need an invite token. Here are the 3 pre-configured tokens:

1. **Main Admin Token**
   ```
   ADMIN-INVITE-2025-MAIN
   ```
   Description: 🎯 Main Admin Token

2. **HR Department Token**
   ```
   ADMIN-INVITE-HR-001
   ```
   Description: 👥 HR Department Token

3. **Executive Token**
   ```
   ADMIN-INVITE-EXEC-001
   ```
   Description: 💼 Executive Token

### Creating Your First Admin Account

1. On the landing page, click **"Admin Portal"**
2. Click **"Sign up with invite token"**
3. The available tokens are displayed - click **Copy** on any token
4. Fill in the form:
   - **Name**: Your full name (e.g., "John Doe")
   - **Email**: Your email (e.g., "admin@company.com")
   - **Password**: At least 6 characters
   - **Confirm Password**: Same as password
   - **Admin Invite Token**: Paste the token you copied
5. Click **"Create Admin Account 🎉"**
6. You'll be redirected to the login page
7. Log in with your email and password

**Important Notes:**
- Each token can only be used once
- Tokens expire on 2026-12-31
- After using all 3 tokens, admins can generate new tokens in Admin Settings

### Generating Additional Admin Tokens

Once you're logged in as an admin:
1. Go to the **Settings** tab
2. In the "Generate New Admin Token" section
3. Enter a description (e.g., "Marketing Manager Token")
4. Click **"Generate Token"**
5. The new token will appear in the list below
6. Share this token with the new admin

---

## 👨‍💻 Employee Access

### Creating an Employee Account

1. On the landing page, click **"Employee Portal"**
2. Click **"Create one"** to sign up
3. Fill in the form:
   - **Name**: Your full name (e.g., "Jane Smith")
   - **Email**: Your email (e.g., "jane@company.com")
   - **Department**: Select from the dropdown (e.g., "Engineering")
   - **Password**: At least 6 characters
   - **Confirm Password**: Same as password
4. Click **"Create Account 🚀"**
5. You'll be redirected to the login page
6. Log in with your email and password

### Available Departments
- Engineering
- Marketing
- Sales
- Human Resources
- Finance
- Operations
- Customer Support
- Product
- Design
- Other

---

## 📁 Application Structure

```
employee-happiness-radar/
├── src/
│   ├── app/
│   │   ├── App.jsx                    # Main app component
│   │   ├── components/
│   │   │   ├── AdminDashboard.jsx     # Admin main dashboard
│   │   │   ├── AdminLogin.jsx         # Admin login page
│   │   │   ├── AdminSignup.jsx        # Admin signup page
│   │   │   ├── EmployeeDashboard.jsx  # Employee main dashboard
│   │   │   ├── EmployeeLogin.jsx      # Employee login page
│   │   │   ├── EmployeeSignup.jsx     # Employee signup page
│   │   │   ├── LandingPage.jsx        # Welcome/landing page
│   │   │   ├── AuthContext.jsx        # Authentication context
│   │   │   ├── admin/
│   │   │   │   ├── AdminOverview.jsx         # Dashboard overview tab
│   │   │   │   ├── EmployeeManagement.jsx    # Employee management tab
│   │   │   │   ├── MoodAnalytics.jsx         # Analytics tab
│   │   │   │   ├── SurveyManagement.jsx      # Survey management tab
│   │   │   │   ├── FeedbackManagement.jsx    # Feedback tab
│   │   │   │   └── AdminSettings.jsx         # Settings tab
│   │   │   ├── employee/
│   │   │   │   ├── EmployeeOverview.jsx      # Employee dashboard tab
│   │   │   │   ├── MoodCheckIn.jsx           # Mood check-in tab
│   │   │   │   ├── EmployeeSurveys.jsx       # Surveys tab
│   │   │   │   └── EmployeeFeedback.jsx      # Feedback tab
│   │   │   └── ui/                    # Reusable UI components
│   │   └── ...
│   ├── utils/
│   │   ├── auth.js                    # Authentication utilities
│   │   └── data.js                    # Data management utilities
│   └── styles/
│       ├── index.css
│       ├── tailwind.css
│       └── theme.css
├── package.json
└── README.md
```

---

## 🔑 Key Features Explained

### 1. Streak System 🔥
- Tracks consecutive days of check-ins
- **One check-in per day = 1 streak**
- Multiple check-ins on the same day don't increase streak
- Missing a full day resets the streak to 1
- Visible on both admin and employee dashboards

**How it works:**
1. Employee logs first check-in → Streak = 1
2. Next day, employee checks in → Streak = 2
3. Checks in again same day → Streak stays 2
4. Skips a day → Streak resets to 1 on next check-in

### 2. Burnout Detection ⚠️
Automatically detects employees at risk of burnout:
- Triggers when: **Stress ≥ 4 AND Motivation ≤ 2**
- Must occur in at least **3 out of the last 5 check-ins**
- Shows alerts on admin dashboard with employee details
- Helps leadership intervene early

### 3. Department-Wise Analytics 📊
- All mood data is tagged with department
- Admin can view trends by department
- Department selection is **required** for mood check-ins
- Helps identify which teams need support

### 4. Survey Types
**Rating Questions (⭐):**
- 1-5 star rating system
- Visual star interface
- Easy for quick feedback

**Text Questions (📝):**
- Open-ended responses
- Allows detailed feedback
- Ideal for qualitative insights

### 5. Anonymous Feedback 🎭
- Employees can toggle anonymous mode
- Admin cannot see who submitted anonymous feedback
- Encourages honest communication
- All feedback stored with timestamp

### 6. Real-Time Data Sync
- All data stored in localStorage
- Admin dashboard shows real-time updates
- When employee submits data, admin sees it immediately
- No page refresh needed (automatic reload on mount)

---

## 🧪 Testing the Application

### Test Scenario 1: Admin Workflow

1. **Create Admin Account**
   - Use token: `ADMIN-INVITE-2025-MAIN`
   - Email: `admin@test.com`
   - Password: `admin123`

2. **Log in and explore Dashboard**
   - View the overview tab (should show 0 employees initially)
   - Check all 6 tabs: Overview, Employees, Analytics, Surveys, Feedback, Settings

3. **Create a Survey**
   - Go to Surveys tab
   - Click "Create Survey"
   - Title: "Q1 Employee Satisfaction"
   - Add questions:
     - "How satisfied are you with your work?" (Rating)
     - "What can we improve?" (Text)
   - Click "Create Survey 🎉"

4. **Generate New Admin Token**
   - Go to Settings tab
   - Enter description: "Test Token"
   - Click "Generate Token"
   - Copy the new token

### Test Scenario 2: Employee Workflow

1. **Create Employee Account**
   - Email: `employee@test.com`
   - Password: `emp123`
   - Department: Engineering
   - Name: Test Employee

2. **Submit First Mood Check-In**
   - Go to Check-in tab
   - Select department: Engineering
   - Set happiness: 4
   - Set stress: 2
   - Set motivation: 5
   - Set hydration: 8
   - Add notes: "Great day today!"
   - Click "Submit Check-in 🎉"

3. **Check Your Streak**
   - Go to Overview tab
   - You should see Streak = 1 🔥

4. **Complete the Survey**
   - Go to Surveys tab
   - Click "Start Survey" on "Q1 Employee Satisfaction"
   - Rate: 5 stars
   - Text: "The team is amazing!"
   - Click "Submit Survey 🎉"

5. **Submit Feedback**
   - Go to Feedback tab
   - Toggle "Submit as Anonymous"
   - Write feedback
   - Click "Submit Anonymously 🎭"

### Test Scenario 3: Admin Viewing Employee Data

1. **Switch to Admin Account** (log out employee, log in admin)

2. **View Employee Management**
   - Go to Employees tab
   - You should see "Test Employee"
   - Click the eye icon to view details
   - See their mood check-in history

3. **View Survey Responses**
   - Go to Surveys tab
   - Click the eye icon on your survey
   - See "Test Employee" response

4. **View Feedback**
   - Go to Feedback tab
   - See the anonymous feedback
   - Filter by "Anonymous Only"

5. **View Analytics**
   - Go to Analytics tab
   - See department-wise stats (Engineering should have data)
   - Check trend charts

### Test Scenario 4: Burnout Detection

1. **Log in as employee**
2. **Submit 3 high-stress, low-motivation check-ins**
   - Day 1: Happiness 2, Stress 5, Motivation 1
   - Day 2: Happiness 2, Stress 4, Motivation 2
   - Day 3: Happiness 3, Stress 5, Motivation 1

3. **Switch to admin dashboard**
4. **Check Overview tab**
   - You should see a Burnout Alert for "Test Employee"
   - Red alert card at the top

---

## 💻 Development

### Running the App
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### File Structure for Adding New Features

**Adding a new Admin tab:**
1. Create component in `/src/app/components/admin/`
2. Import in `AdminDashboard.jsx`
3. Add to TabsList and TabsContent

**Adding a new Employee tab:**
1. Create component in `/src/app/components/employee/`
2. Import in `EmployeeDashboard.jsx`
3. Add to TabsList and TabsContent

**Adding new data utilities:**
1. Add functions to `/src/utils/data.js`
2. Follow existing patterns for localStorage

### Dark/Light Mode
The app uses `next-themes` for theme switching:
- Default theme: Light
- Toggle button in header
- All components styled for both themes
- Uses Tailwind's `dark:` variant

---

## 🎨 Color Scheme

### Admin Portal
- Primary: Purple to Pink gradient (#8b5cf6 → #ec4899)
- Secondary: Blue (#3b82f6)
- Success: Green (#10b981)
- Danger: Red (#ef4444)

### Employee Portal
- Primary: Green to Blue gradient (#10b981 → #3b82f6)
- Secondary: Purple (#8b5cf6)
- Accent: Yellow/Orange (for streaks)

---

## 📊 Data Storage

All data is stored in browser's localStorage:

```javascript
localStorage keys:
- hr_admins              // Admin accounts
- hr_employees           // Employee accounts
- hr_mood_checkins       // Mood check-ins
- hr_surveys             // Surveys
- hr_survey_responses    // Survey responses
- hr_feedback            // Feedback submissions
- admin_invite_tokens    // Admin invite tokens
- hr_admin_token         // Current admin session token
- hr_admin               // Current admin data
- hr_employee_token      // Current employee session token
- hr_employee            // Current employee data
```

### Clearing All Data
Open browser console and run:
```javascript
localStorage.clear();
```
Then refresh the page.

---

## 🔒 Security Notes

**⚠️ Important for Production:**

This is a demo application using localStorage. For production use:

1. **Replace localStorage with a real database** (MongoDB, PostgreSQL, etc.)
2. **Implement real JWT authentication** with bcrypt password hashing
3. **Add server-side validation** for all inputs
4. **Implement rate limiting** to prevent abuse
5. **Use HTTPS** in production
6. **Add CORS protection**
7. **Implement proper session management**
8. **Add data encryption** for sensitive information
9. **Set up proper backup systems**
10. **Follow GDPR/privacy regulations** if handling PII

**Current authentication is simulated for demo purposes only.**

---

## 🐛 Troubleshooting

### Issue: Data not showing
**Solution:** Make sure you've created accounts and submitted data. The app starts with empty localStorage.

### Issue: Can't login after signup
**Solution:** After admin signup, you're redirected to login. Use the same email/password you just created.

### Issue: Streak not increasing
**Solution:** Streaks only increase once per day. If you already checked in today, it won't increase until tomorrow.

### Issue: Dark mode not working
**Solution:** Click the sun/moon icon in the header. The theme persists across page reloads.

### Issue: Burnout alerts not showing
**Solution:** You need at least 3 check-ins with stress ≥4 AND motivation ≤2 from the same employee.

---

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify you're using a modern browser (Chrome, Firefox, Safari, Edge)
3. Clear localStorage and try again
4. Make sure you've installed all dependencies (`npm install`)

---

## 🎉 Congratulations!

You now have a fully functional Employee Happiness Radar application! 

**Admin Tokens (for easy reference):**
- `ADMIN-INVITE-2025-MAIN`
- `ADMIN-INVITE-HR-001`
- `ADMIN-INVITE-EXEC-001`

Enjoy exploring the platform! 🚀💚

---

## 📝 License

This is a demo application for educational purposes.

---

**Built with ❤️ using React, Tailwind CSS, and Recharts**
