# Employee Happiness Radar - System Architecture

## 📐 System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│                    (React + Vite)                           │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Landing │  │   Auth   │  │ Employee │  │  Admin   │  │
│  │   Page   │  │  Pages   │  │Dashboard │  │Dashboard │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            API Client (Axios/Fetch)                  │  │
│  │         JWT Token Management                         │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            │ Authorization: Bearer <JWT>
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                         BACKEND                              │
│                   (Node.js + Express)                       │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Middleware Layer                     │  │
│  │  • CORS          • Body Parser    • Auth Guard      │  │
│  │  • JWT Verify    • Error Handler                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌────────┐  │
│  │   Auth    │  │   Mood    │  │  Survey   │  │ Admin  │  │
│  │  Routes   │  │  Routes   │  │  Routes   │  │ Routes │  │
│  └───────────┘  └───────────┘  └───────────┘  └────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Models (Mongoose)                   │  │
│  │  User • MoodCheckIn • Survey • Response • Feedback   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ MongoDB Protocol
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                        DATABASE                              │
│                        (MongoDB)                            │
│                                                             │
│  ┌───────────┐  ┌──────────────┐  ┌──────────┐            │
│  │   users   │  │ moodcheckins │  │ surveys  │            │
│  └───────────┘  └──────────────┘  └──────────┘            │
│                                                             │
│  ┌──────────────────┐  ┌──────────┐  ┌────────────┐       │
│  │ surveyresponses  │  │feedback  │  │admintokens │       │
│  └──────────────────┘  └──────────┘  └────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Request Flow

### Employee Mood Check-in Flow

```
1. User fills mood form in frontend
   ↓
2. Frontend sends POST to /api/mood/checkin with JWT
   ↓
3. Auth middleware verifies JWT token
   ↓
4. Route handler validates data
   ↓
5. MoodCheckIn model saves to MongoDB
   ↓
6. Update user streak
   ↓
7. Return success response
   ↓
8. Frontend updates UI
```

### Admin Dashboard Flow

```
1. Admin opens dashboard
   ↓
2. Frontend requests /api/admin/dashboard with admin JWT
   ↓
3. Auth middleware verifies token + checks admin role
   ↓
4. Aggregate data from multiple collections:
   • Users (count employees)
   • MoodCheckIns (calculate averages)
   • Surveys (count total)
   • Feedback (count total)
   ↓
5. Run burnout detection algorithm
   ↓
6. Return aggregated statistics
   ↓
7. Frontend displays charts and metrics
```

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "employee" | "admin",
  department: String,
  streak: Number,
  lastCheckIn: Date,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### MoodCheckIns Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  happiness: Number (1-5),
  stress: Number (1-5),
  motivation: Number (1-5),
  hydration: Number (0-8),
  note: String,
  date: String (YYYY-MM-DD),
  createdAt: Date,
  updatedAt: Date
}
Indexes: { user: 1, date: -1 }, unique: { user: 1, date: 1 }
```

### Surveys Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  questions: [
    {
      question: String,
      type: "rating" | "text"
    }
  ],
  isActive: Boolean,
  createdBy: ObjectId (ref: User),
  responseCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### SurveyResponses Collection
```javascript
{
  _id: ObjectId,
  survey: ObjectId (ref: Survey),
  user: ObjectId (ref: User),
  responses: [
    {
      questionId: ObjectId,
      question: String,
      type: "rating" | "text",
      answer: Number | String
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
Unique: { survey: 1, user: 1 }
```

### Feedback Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User) | null,
  feedback: String,
  isAnonymous: Boolean,
  status: "pending" | "reviewed" | "addressed",
  adminNotes: String,
  reviewedBy: ObjectId (ref: User),
  reviewedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### AdminTokens Collection
```javascript
{
  _id: ObjectId,
  token: String (unique),
  description: String,
  isUsed: Boolean,
  usedBy: ObjectId (ref: User),
  usedAt: Date,
  expiresAt: Date,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentication Flow

### Signup Flow
```
1. User submits signup form
   ↓
2. POST /api/auth/employee/signup or /api/auth/admin/signup
   ↓
3. Validate input data
   ↓
4. Check if user exists
   ↓
5. For admin: Validate invite token
   ↓
6. Hash password with bcrypt
   ↓
7. Create user in database
   ↓
8. Mark admin token as used (if admin)
   ↓
9. Generate JWT token
   ↓
10. Return token + user data
```

### Login Flow
```
1. User submits credentials
   ↓
2. POST /api/auth/employee/login or /api/auth/admin/login
   ↓
3. Find user by email and role
   ↓
4. Compare password with bcrypt
   ↓
5. Check if account is active
   ↓
6. Update lastLogin timestamp
   ↓
7. Generate JWT token
   ↓
8. Return token + user data
```

### Request Authentication
```
1. Client includes: Authorization: Bearer <JWT>
   ↓
2. Auth middleware extracts token
   ↓
3. Verify token with JWT_SECRET
   ↓
4. Find user by ID from token
   ↓
5. Check if user is active
   ↓
6. Attach user to request object
   ↓
7. Continue to route handler
```

## 🚨 Burnout Detection Algorithm

```javascript
For each employee:
  1. Get last 5 mood check-ins
  2. Filter check-ins where:
     - stress >= 4 AND
     - motivation <= 2
  3. If 3 or more matching entries:
     → Flag employee as "High Risk"
     → Add to burnout alerts
     → Include employee details and metrics
```

## 📊 API Response Structure

### Success Response
```json
{
  "message": "Operation successful",
  "data": { ... },
  "token": "jwt-token" // if auth related
}
```

### Error Response
```json
{
  "message": "Error description",
  "error": "Detailed error message" // dev only
}
```

## 🔒 Security Layers

```
┌─────────────────────────────────────────────┐
│  1. CORS - Origin validation                │
├─────────────────────────────────────────────┤
│  2. Input Validation - Mongoose schemas     │
├─────────────────────────────────────────────┤
│  3. JWT Authentication - Token verification │
├─────────────────────────────────────────────┤
│  4. Role Authorization - Admin/Employee     │
├─────────────────────────────────────────────┤
│  5. Password Hashing - bcrypt (10 rounds)   │
├─────────────────────────────────────────────┤
│  6. Environment Variables - Secrets hidden  │
├─────────────────────────────────────────────┤
│  7. MongoDB Validation - Schema constraints │
└─────────────────────────────────────────────┘
```

## 📈 Performance Optimizations

1. **Database Indexes:**
   - Users: email (unique)
   - MoodCheckIns: { user, date } (compound, unique)
   - Surveys: { isActive, createdAt }
   - SurveyResponses: { survey, user } (unique)

2. **Efficient Queries:**
   - Aggregation pipelines for statistics
   - Selective field projection
   - Pagination for large datasets

3. **Caching Strategy:**
   - JWT tokens cached client-side
   - Consider Redis for session management

## 🔄 Data Relationships

```
User (Employee)
  ├─→ MoodCheckIns (one-to-many)
  ├─→ SurveyResponses (one-to-many)
  └─→ Feedback (one-to-many)

User (Admin)
  ├─→ Surveys (created by)
  ├─→ AdminTokens (created by)
  └─→ Feedback (reviewed by)

Survey
  ├─→ SurveyResponses (one-to-many)
  └─→ User (created by)

AdminToken
  └─→ User (used by)
```

## 🌐 Deployment Architecture

### Development
```
Frontend (localhost:5173) ←→ Backend (localhost:5000) ←→ MongoDB (localhost:27017)
```

### Production
```
Frontend (CDN/Vercel) ←→ Backend (Heroku/Railway) ←→ MongoDB Atlas (Cloud)
                ↓
         Load Balancer
                ↓
         SSL/HTTPS
```

## 📝 Environment Configuration

### Development
```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/employee-happiness-radar
JWT_SECRET=dev-secret-key
JWT_EXPIRES_IN=7d
```

### Production
```env
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-app.com
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=<strong-random-64-char-string>
JWT_EXPIRES_IN=7d
```

---

This architecture provides a scalable, secure, and maintainable foundation for the Employee Happiness Radar platform! 🎉
