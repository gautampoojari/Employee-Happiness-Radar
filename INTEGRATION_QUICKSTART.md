# 🚀 Quick Start Guide - Employee Happiness Radar

## Prerequisites
- Node.js 16+ installed
- MongoDB installed and running
- npm or pnpm

## 5-Minute Setup

### Step 1: Start MongoDB
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongodb

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

### Step 2: Setup Backend
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env and set these values:
# MONGODB_URI=mongodb://localhost:27017/employee-happiness-radar
# JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
# PORT=5000

# Seed database with test data
npm run seed

# Start backend server
npm start
```

✅ Backend running on http://localhost:5000

### Step 3: Setup Frontend
```bash
# Open new terminal, navigate to project root
cd ..

# Install dependencies (if not already done)
npm install

# Start frontend
npm run dev
```

✅ Frontend running on http://localhost:5173

### Step 4: Test the Application

Open http://localhost:5173 in your browser

**Test as Employee:**
1. Click "Employee Portal"
2. Click "Create one" to sign up
3. Fill form:
   - Name: Test Employee
   - Email: test@company.com
   - Department: Engineering
   - Password: password123
4. Click "Create Account"
5. Login with the credentials

**Test as Admin:**
1. Click "Admin Portal"
2. Click "Sign up with invite token"
3. Click "Available Admin Tokens" to expand
4. Click copy button next to any token (e.g., ADMIN-INVITE-2025-MAIN)
5. Fill form and create account
6. Login with your credentials

**Or use seeded credentials:**
- Admin: admin@company.com / admin123
- Employee: alice@company.com / password123

## What's Integrated

✅ **Authentication**: JWT-based auth with bcrypt
✅ **Mood Check-ins**: Real-time data to MongoDB
✅ **Surveys**: Create, respond, view results
✅ **Feedback**: Anonymous and identified feedback
✅ **Analytics**: Department stats, burnout detection
✅ **Employee Management**: Admin can view/manage employees
✅ **Streak System**: Tracks consecutive check-ins
✅ **Dark/Light Mode**: Theme persists across sessions

## API Base URL

The frontend connects to: `http://localhost:5000/api`

To change it, create a `.env` file in the root:
```
VITE_API_URL=http://localhost:5000/api
```

## Database Structure

MongoDB collections:
- `users` - All users (employees + admins)
- `moodcheckins` - Daily mood entries
- `surveys` - Survey definitions
- `surveyresponses` - Survey answers
- `feedback` - Feedback submissions
- `admintokens` - Admin invite tokens

## Key Features Working

### Employee Features:
- ✅ Sign up / Login
- ✅ Daily mood check-in (happiness, stress, motivation, hydration)
- ✅ View personal dashboard with trends
- ✅ Streak tracking
- ✅ Complete surveys
- ✅ Submit feedback (anonymous or identified)

### Admin Features:
- ✅ Sign up with invite token / Login
- ✅ Dashboard with company-wide stats
- ✅ View all employees
- ✅ Department-wise analytics
- ✅ Burnout detection alerts
- ✅ Create/manage surveys
- ✅ View survey responses
- ✅ View all feedback
- ✅ Generate admin invite tokens

## Troubleshooting

### Backend won't start
- Is MongoDB running? Check `mongo --version`
- Is port 5000 free? Change PORT in .env
- Did you create .env file?

### Frontend shows connection errors
- Is backend running on port 5000?
- Check browser console for errors
- Try clearing localStorage

### Can't login
- Did you seed the database? Run `npm run seed` in /server
- Check credentials are correct
- Try signing up a new account

### CORS errors
- Backend has CORS enabled for all origins in development
- If issues persist, check server/server.js CORS config

## Next Steps

1. ✅ Test all employee features (check-ins, surveys, feedback)
2. ✅ Test all admin features (dashboard, analytics, surveys)
3. ✅ Create real employee accounts for your team
4. ✅ Customize surveys and feedback questions
5. 🚀 Deploy to production (see DEPLOYMENT.md)

## Production Deployment

For production deployment:
1. Set up MongoDB Atlas (cloud database)
2. Deploy backend to Heroku/Railway/DigitalOcean
3. Deploy frontend to Vercel/Netlify
4. Update VITE_API_URL to production backend URL
5. Enable HTTPS for security

## Support

- **API Documentation**: `/server/API_REFERENCE.md`
- **Backend Architecture**: `/server/ARCHITECTURE.md`
- **Full Integration Guide**: `/FRONTEND_BACKEND_INTEGRATION.md`
- **Backend Setup**: `/server/SETUP.md`

---

✨ **You're all set! Your app is now running with a full MERN stack!**
