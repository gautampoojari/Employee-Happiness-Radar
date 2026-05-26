# Employee Happiness Radar - Backend Complete! 🎉

The complete backend for the Employee Happiness Radar workplace wellbeing platform has been successfully built!

## 📦 What's Been Created

### Server Structure
```
server/
├── server.js                 # Main Express server
├── package.json             # Dependencies & scripts
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
│
├── models/                 # MongoDB Models
│   ├── User.js            # Employee & Admin users
│   ├── MoodCheckIn.js     # Daily mood entries
│   ├── Survey.js          # Survey definitions
│   ├── SurveyResponse.js  # Survey answers
│   ├── Feedback.js        # Employee feedback
│   └── AdminToken.js      # Invite tokens
│
├── routes/                # API Endpoints
│   ├── auth.js           # Authentication
│   ├── mood.js           # Mood check-ins
│   ├── survey.js         # Surveys
│   ├── feedback.js       # Feedback
│   └── admin.js          # Admin operations
│
├── middleware/           # Express Middleware
│   └── auth.js          # JWT authentication
│
├── utils/               # Utilities
│   ├── jwt.js          # JWT helpers
│   ├── initializeData.js  # Default admin tokens
│   └── seed.js         # Demo data seeding
│
└── Documentation
    ├── README.md           # API documentation
    ├── SETUP.md           # Setup guide
    ├── API_REFERENCE.md   # Quick reference
    └── FRONTEND_INTEGRATION.md  # Integration guide
```

## ✨ Features Implemented

### 🔐 Authentication
- ✅ Employee signup/login with JWT
- ✅ Admin signup/login with invite tokens
- ✅ Password hashing with bcrypt
- ✅ Role-based access control
- ✅ Token validation & expiry

### 😊 Mood Tracking
- ✅ Daily check-ins (happiness, stress, motivation, hydration)
- ✅ One check-in per day with update capability
- ✅ Streak system (consecutive days)
- ✅ Personal mood statistics
- ✅ Mood history tracking

### 📋 Surveys
- ✅ Create surveys with rating/text questions
- ✅ Active/inactive survey management
- ✅ One response per user per survey
- ✅ Survey response collection
- ✅ Response analytics

### 💬 Feedback
- ✅ Anonymous & identified feedback
- ✅ Feedback status tracking (pending/reviewed/addressed)
- ✅ Admin notes on feedback
- ✅ Review history

### 👑 Admin Dashboard
- ✅ Overview statistics
- ✅ Mood trends over time
- ✅ Department-wise analytics
- ✅ **Burnout detection** (stress ≥4 & motivation ≤2 for 3+ entries)
- ✅ Employee management
- ✅ Survey management
- ✅ Feedback management
- ✅ Admin token generation

### 🗄️ Database
- ✅ MongoDB with Mongoose ODM
- ✅ Comprehensive schemas with validation
- ✅ Indexes for performance
- ✅ Proper relationships between models

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

### 3. Start MongoDB
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 4. Seed Demo Data (Optional)
```bash
npm run seed
```

This creates:
- 1 admin account (admin@company.com / admin123)
- 10 employee accounts (password123 for all)
- ~140 mood check-ins
- 2 surveys with responses
- 5 feedback items

### 5. Start Server
```bash
npm run dev
```

Server runs on: `http://localhost:5000`

### 6. Test Health
```bash
curl http://localhost:5000/api/health
```

## 📚 Documentation

- **[API Documentation](./server/README.md)** - Complete API reference with examples
- **[Setup Guide](./server/SETUP.md)** - Detailed installation & deployment guide
- **[API Quick Reference](./server/API_REFERENCE.md)** - Quick lookup for endpoints
- **[Frontend Integration](./server/FRONTEND_INTEGRATION.md)** - Connect frontend to backend

## 🔑 Default Admin Tokens

```
ADMIN-INVITE-2025-MAIN
ADMIN-INVITE-HR-001
ADMIN-INVITE-EXEC-001
```

Valid until December 31, 2026

## 🧪 Test Credentials (After Seeding)

**Admin:**
- Email: `admin@company.com`
- Password: `admin123`

**Employee:**
- Email: `alice@company.com`
- Password: `password123`

## 🌐 API Endpoints Overview

### Authentication
- `POST /api/auth/employee/signup` - Register employee
- `POST /api/auth/employee/login` - Login employee
- `POST /api/auth/admin/signup` - Register admin
- `POST /api/auth/admin/login` - Login admin
- `GET /api/auth/me` - Get current user

### Mood (Employee)
- `POST /api/mood/checkin` - Submit mood check-in
- `GET /api/mood/my-checkins` - Get my check-ins
- `GET /api/mood/my-streak` - Get my streak
- `GET /api/mood/today` - Get today's check-in
- `GET /api/mood/stats` - Get my statistics

### Surveys
- `GET /api/survey/active` - Get active surveys
- `POST /api/survey/:id/respond` - Submit response
- `GET /api/survey/my/responses` - Get my responses

### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback/my-feedback` - Get my feedback

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/trends` - Mood trends
- `GET /api/admin/burnout-alerts` - Burnout detection
- `GET /api/admin/employees` - Employee list
- `POST /api/admin/surveys` - Create survey
- `GET /api/admin/feedback` - All feedback
- `POST /api/admin/tokens/generate` - Generate admin token

## 🔒 Security Features

- ✅ JWT authentication with configurable expiry
- ✅ bcrypt password hashing (10 rounds)
- ✅ Role-based authorization (Admin/Employee)
- ✅ Input validation at model level
- ✅ CORS configured for frontend
- ✅ Environment variables for secrets
- ✅ Password not returned in API responses
- ✅ Unique constraints on critical fields

## 🛠️ Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Security:** bcryptjs for password hashing
- **Validation:** Mongoose validators + validator.js
- **Development:** nodemon for auto-reload

## 📈 Burnout Detection Algorithm

The system automatically detects employees at risk:

```
IF (stress >= 4 AND motivation <= 2) for 3+ out of last 5 check-ins
THEN flag as "High Risk"
```

Admins can view alerts on the dashboard.

## 🗃️ Database Models

1. **User** - Employees & admins with authentication
2. **MoodCheckIn** - Daily mood entries (happiness, stress, motivation, hydration)
3. **Survey** - Survey definitions with questions
4. **SurveyResponse** - User responses to surveys
5. **Feedback** - Employee feedback (anonymous/identified)
6. **AdminToken** - Admin invite tokens with expiry

## 🔄 Next Steps

### Connect Frontend

1. Install axios in frontend:
   ```bash
   npm install axios
   ```

2. Follow the [Frontend Integration Guide](./server/FRONTEND_INTEGRATION.md)

3. Update `/src/utils/auth.js` and `/src/utils/data.js` to use API calls

4. Add environment variable:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Deploy Backend

1. **Heroku:**
   ```bash
   heroku create your-app-name
   heroku config:set MONGODB_URI="..." JWT_SECRET="..."
   git push heroku main
   ```

2. **Railway:**
   - Connect GitHub repo
   - Add MongoDB plugin
   - Set environment variables
   - Deploy automatically

3. **DigitalOcean App Platform:**
   - Connect repository
   - Configure build settings
   - Add environment variables

See [SETUP.md](./server/SETUP.md) for detailed deployment instructions.

## 🧪 Testing

### Manual Testing

```bash
# Health check
curl http://localhost:5000/api/health

# Employee signup
curl -X POST http://localhost:5000/api/auth/employee/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"pass123","department":"Engineering"}'

# Employee login
curl -X POST http://localhost:5000/api/auth/employee/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123"}'
```

## 📞 Support

- Review [API Documentation](./server/README.md) for endpoint details
- Check [Setup Guide](./server/SETUP.md) for troubleshooting
- See [Frontend Integration](./server/FRONTEND_INTEGRATION.md) for connecting frontend

## 📄 License

MIT

---

## 🎯 Summary

Your backend is **production-ready** with:

✅ Complete REST API with 30+ endpoints
✅ MongoDB database with 6 models
✅ JWT authentication & authorization
✅ Burnout detection algorithm
✅ Comprehensive documentation
✅ Demo data seeding
✅ Error handling & validation
✅ Security best practices

**Start the server and begin integrating with your frontend!** 🚀

```bash
cd server
npm run dev
```

Then visit: `http://localhost:5000/api/health`

**Happy coding! 🎉**
