# 🎉 Employee Happiness Radar - READY TO USE!

A comprehensive workplace wellbeing platform with SQLite database, featuring mood tracking, surveys, feedback, and analytics.

## ✅ What's Working

### Backend (SQLite)
- ✅ **Database**: SQLite with Sequelize ORM
- ✅ **Authentication**: JWT-based auth for employees and admins
- ✅ **Employee Features**: Mood check-ins, surveys, feedback
- ✅ **Admin Features**: Dashboard, analytics, employee management, survey/feedback management
- ✅ **Security**: Password hashing, invite-token system for admins

### Frontend (React)
- ✅ **Employee Portal**: Dashboard, mood tracking, surveys, feedback
- ✅ **Admin Portal**: Analytics, employee management, burnout detection
- ✅ **UI**: Professional design with Tailwind CSS and shadcn/ui
- ✅ **API Integration**: All features connected to backend

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend (in new terminal)
cd ..
npm install
```

### Step 2: Seed Database (Recommended)

```bash
cd server
npm run seed
```

Creates sample data:
- **Admin**: admin@example.com / admin123
- **Employee**: john@example.com / password123
- 5 employees, mood check-ins, surveys, feedback

### Step 3: Start Application

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
npm run dev
```

**That's it!** 🎉

- Backend: http://localhost:5000
- Frontend: http://localhost:5173

## 📋 Features

### For Employees 👤
- **Daily Mood Check-ins**: Track happiness, stress, motivation, hydration
- **Streak System**: Maintain consecutive check-in streaks
- **Personal Dashboard**: View mood history and statistics
- **Surveys**: Complete workplace surveys
- **Feedback**: Submit anonymous or identified feedback
- **Insights**: View personal wellbeing trends

### For Admins 👨‍💼
- **Overview Dashboard**: Company-wide statistics at a glance
- **Employee Management**: View and manage all employees
- **Mood Analytics**: Track trends over time
- **Department Analytics**: Compare departments
- **Burnout Detection**: Automatic alerts for at-risk employees
- **Survey Management**: Create, edit, and analyze surveys
- **Feedback Review**: Read and respond to employee feedback
- **Admin Tokens**: Generate invite tokens for new admins

## 🔐 Default Credentials (After Seeding)

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

## 📖 Documentation

- **[MIGRATION_COMPLETE.md](./MIGRATION_COMPLETE.md)** - Complete overview of changes
- **[QUICK_START_SQLITE.md](./QUICK_START_SQLITE.md)** - Detailed setup guide
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Comprehensive testing instructions

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js + Express
- **Database**: SQLite3
- **ORM**: Sequelize
- **Authentication**: JWT + bcryptjs
- **Validation**: Validator.js

### Frontend
- **Framework**: React 18
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **HTTP Client**: Axios
- **Build Tool**: Vite

## 📂 Project Structure

```
employee-happiness-radar/
├── server/                  # Backend
│   ├── config/             # Database configuration
│   ├── models/             # Sequelize models
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth middleware
│   ├── utils/              # Utilities & seed script
│   ├── server.js           # Express server
│   ├── .env                # Environment variables
│   └── database.sqlite     # SQLite database (auto-created)
│
├── src/                    # Frontend
│   ├── app/
│   │   ├── components/     # React components
│   │   │   ├── admin/      # Admin components
│   │   │   ├── employee/   # Employee components
│   │   │   └── ui/         # UI components
│   │   └── App.tsx         # Main app component
│   ├── services/           # API services
│   └── styles/             # CSS styles
│
└── Documentation files
```

## 🔄 Database Commands

```bash
cd server

# Start with sample data
npm run seed

# Reset database completely
npm run reset

# Start server
npm run dev

# Start server (production)
npm start
```

## 🧪 Testing

### Test Employee Flow
1. Open http://localhost:5173
2. Click "Employee Login" → "Sign Up"
3. Create account with any department
4. Submit mood check-in
5. Complete surveys
6. Submit feedback
7. View dashboard stats

### Test Admin Flow
1. Click "Admin Login" → "Sign Up"
2. Use invite token: `ADMIN-INVITE-2025-MAIN`
3. Create admin account
4. View dashboard with all statistics
5. Browse employee list
6. Check burnout alerts
7. Create survey
8. Review feedback

## 🐛 Troubleshooting

### Backend won't start
```bash
cd server
rm -f database.sqlite  # Delete database
npm install            # Reinstall dependencies
npm run seed          # Recreate with data
npm run dev           # Start server
```

### Login not working
1. Clear browser localStorage
2. Verify backend is running (http://localhost:5000/api/health)
3. Check credentials
4. Look for errors in browser console

### Admin panel empty
1. Ensure you're logged in as admin
2. Run seed script to populate data: `cd server && npm run seed`
3. Check browser console for API errors

### Port conflicts
- Backend (port 5000): Kill process or change PORT in `/server/.env`
- Frontend (port 5173): Kill process or Vite will prompt for alternative

## 📊 API Endpoints

### Health Check
```
GET /api/health
```

### Authentication
```
POST /api/auth/employee/signup
POST /api/auth/employee/login
POST /api/auth/admin/signup
POST /api/auth/admin/login
GET  /api/auth/me
```

### Mood Check-ins (Employee)
```
POST /api/mood/checkin
GET  /api/mood/my-checkins
GET  /api/mood/today
GET  /api/mood/my-streak
GET  /api/mood/stats
```

### Admin Dashboard
```
GET /api/admin/dashboard
GET /api/admin/trends
GET /api/admin/department-stats
GET /api/admin/burnout-alerts
GET /api/admin/employees
GET /api/admin/employees/:id
```

Full API documentation in `/server/API_REFERENCE.md`

## 🎯 Key Features Implemented

✅ **Authentication System**
- Employee signup/login
- Admin signup with invite tokens
- JWT token management
- Password hashing

✅ **Mood Tracking**
- Daily check-ins (4 metrics)
- Streak system
- Historical data
- Personal statistics

✅ **Analytics**
- Company-wide trends
- Department comparisons
- Burnout detection
- Visual charts/graphs

✅ **Survey System**
- Create surveys with multiple question types
- Rating and text questions
- Track responses
- Analyze results

✅ **Feedback System**
- Anonymous and identified feedback
- Category-based organization
- Status tracking (pending/reviewed/resolved)
- Admin notes and responses

✅ **Admin Management**
- Employee list and details
- Deactivate accounts
- Generate invite tokens
- Comprehensive dashboard

## 💡 Usage Tips

1. **Start with seeded data** - Run `npm run seed` to get sample data immediately
2. **Use admin account** - Login as admin first to see full dashboard
3. **Create multiple employees** - Test department analytics with diverse data
4. **Submit varied mood data** - Mix high/low scores to see burnout detection
5. **Test anonymous feedback** - Verify anonymity is preserved

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Admin invite token system
- CORS protection
- SQL injection protection (Sequelize ORM)
- Input validation

## 🚀 Production Deployment

The SQLite database makes deployment simple:

1. Set environment variables in production
2. Run `npm run seed` once (or create admin manually)
3. Start server with `npm start`
4. Database file persists on server

For scaling:
- SQLite works great for up to ~500 employees
- Sequelize makes migration to PostgreSQL/MySQL easy if needed

## 📞 Support

Issues with:
- **Backend**: Check server logs and `/server/database.sqlite` exists
- **Frontend**: Check browser console for errors
- **Database**: Delete `database.sqlite` and restart or run `npm run reset`
- **Authentication**: Clear localStorage and try again

## 🎉 Success!

Your Employee Happiness Radar is now fully functional with:
- ✅ SQLite database (easy to manage, portable)
- ✅ Working employee authentication
- ✅ Working admin authentication
- ✅ Admin panel showing all data
- ✅ Complete mood tracking system
- ✅ Survey and feedback features
- ✅ Comprehensive analytics

**Enjoy your workplace wellbeing platform!** 🌟
