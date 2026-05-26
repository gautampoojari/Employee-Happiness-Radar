# Employee Happiness Radar - Backend API

Backend server for the Employee Happiness Radar workplace wellbeing platform.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your `.env` file with your MongoDB URI and JWT secret:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/employee-happiness-radar
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

5. Start MongoDB (if running locally):
```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux (systemd)
sudo systemctl start mongod

# Windows
net start MongoDB
```

6. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Production

To start the server in production mode:
```bash
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All authenticated routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 Authentication Endpoints

### Employee Signup
```http
POST /api/auth/employee/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "department": "Engineering"
}
```

**Response:**
```json
{
  "message": "Employee account created successfully",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "employee",
    "department": "Engineering",
    "streak": 0
  }
}
```

### Employee Login
```http
POST /api/auth/employee/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Admin Signup (Requires Invite Token)
```http
POST /api/auth/admin/signup
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "inviteToken": "ADMIN-INVITE-2025-MAIN"
}
```

**Default Admin Tokens:**
- `ADMIN-INVITE-2025-MAIN`
- `ADMIN-INVITE-HR-001`
- `ADMIN-INVITE-EXEC-001`

### Admin Login
```http
POST /api/auth/admin/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Validate Admin Token
```http
POST /api/auth/validate-token
Content-Type: application/json

{
  "token": "ADMIN-INVITE-2025-MAIN"
}
```

---

## 😊 Mood Check-in Endpoints

### Create Mood Check-in
```http
POST /api/mood/checkin
Authorization: Bearer <employee-token>
Content-Type: application/json

{
  "happiness": 4,
  "stress": 2,
  "motivation": 5,
  "hydration": 6,
  "note": "Great day at work!"
}
```

**Note:** Only one check-in per day is allowed. Subsequent check-ins on the same day will update the existing entry.

### Get My Check-ins
```http
GET /api/mood/my-checkins?limit=30&page=1
Authorization: Bearer <employee-token>
```

### Get My Streak
```http
GET /api/mood/my-streak
Authorization: Bearer <employee-token>
```

### Get Today's Check-in
```http
GET /api/mood/today
Authorization: Bearer <employee-token>
```

### Get My Statistics
```http
GET /api/mood/stats
Authorization: Bearer <employee-token>
```

---

## 📋 Survey Endpoints

### Get Active Surveys
```http
GET /api/survey/active
Authorization: Bearer <employee-token>
```

### Get Survey by ID
```http
GET /api/survey/:id
Authorization: Bearer <employee-token>
```

### Submit Survey Response
```http
POST /api/survey/:id/respond
Authorization: Bearer <employee-token>
Content-Type: application/json

{
  "responses": [
    5,
    "Great work environment"
  ]
}
```

### Get My Survey Responses
```http
GET /api/survey/my/responses
Authorization: Bearer <employee-token>
```

---

## 💬 Feedback Endpoints

### Submit Feedback
```http
POST /api/feedback
Authorization: Bearer <employee-token>
Content-Type: application/json

{
  "feedback": "The new office layout is fantastic!",
  "isAnonymous": false
}
```

### Get My Feedback
```http
GET /api/feedback/my-feedback
Authorization: Bearer <employee-token>
```

---

## 👑 Admin Endpoints

All admin endpoints require admin authentication.

### Dashboard Overview
```http
GET /api/admin/dashboard
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "totalEmployees": 50,
  "totalCheckIns": 1250,
  "totalSurveys": 5,
  "totalFeedback": 30,
  "averages": {
    "happiness": 4.2,
    "stress": 2.8,
    "motivation": 4.0,
    "hydration": 5.5
  }
}
```

### Get Mood Trends
```http
GET /api/admin/trends?days=7
Authorization: Bearer <admin-token>
```

### Get Department Statistics
```http
GET /api/admin/department-stats
Authorization: Bearer <admin-token>
```

### Get Burnout Alerts
```http
GET /api/admin/burnout-alerts
Authorization: Bearer <admin-token>
```

**Burnout Detection Logic:**
- Stress ≥ 4 AND Motivation ≤ 2 for 3+ check-ins out of last 5

### Employee Management

#### Get All Employees
```http
GET /api/admin/employees?department=Engineering&active=true
Authorization: Bearer <admin-token>
```

#### Get Employee Details
```http
GET /api/admin/employees/:id
Authorization: Bearer <admin-token>
```

#### Deactivate Employee
```http
DELETE /api/admin/employees/:id
Authorization: Bearer <admin-token>
```

### Survey Management

#### Create Survey
```http
POST /api/admin/surveys
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Q1 Employee Satisfaction Survey",
  "description": "Help us improve your workplace experience",
  "questions": [
    {
      "question": "How satisfied are you with your work-life balance?",
      "type": "rating"
    },
    {
      "question": "What can we do to improve?",
      "type": "text"
    }
  ],
  "isActive": true
}
```

#### Get All Surveys
```http
GET /api/admin/surveys?active=true
Authorization: Bearer <admin-token>
```

#### Toggle Survey Status
```http
PATCH /api/admin/surveys/:id/toggle
Authorization: Bearer <admin-token>
```

#### Delete Survey
```http
DELETE /api/admin/surveys/:id
Authorization: Bearer <admin-token>
```

#### Get Survey Responses
```http
GET /api/admin/surveys/:id/responses
Authorization: Bearer <admin-token>
```

### Feedback Management

#### Get All Feedback
```http
GET /api/admin/feedback?status=pending
Authorization: Bearer <admin-token>
```

**Status values:** `pending`, `reviewed`, `addressed`

#### Update Feedback
```http
PATCH /api/admin/feedback/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "reviewed",
  "adminNotes": "Will discuss in next team meeting"
}
```

### Admin Token Management

#### Generate New Admin Token
```http
POST /api/admin/tokens/generate
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "description": "New HR Admin",
  "expiresInDays": 30
}
```

#### Get All Admin Tokens
```http
GET /api/admin/tokens
Authorization: Bearer <admin-token>
```

---

## 🗄️ Database Models

### User
- name, email, password (hashed)
- role: `employee` | `admin`
- department (for employees)
- streak, lastCheckIn
- isActive

### MoodCheckIn
- user (ref to User)
- happiness, stress, motivation (1-5)
- hydration (0-8)
- note (optional)
- date (YYYY-MM-DD)

### Survey
- title, description
- questions: [{ question, type: 'rating' | 'text' }]
- isActive
- createdBy (ref to User)
- responseCount

### SurveyResponse
- survey (ref to Survey)
- user (ref to User)
- responses: [{ questionId, question, type, answer }]

### Feedback
- user (ref to User, null if anonymous)
- feedback (text)
- isAnonymous
- status: `pending` | `reviewed` | `addressed`
- adminNotes, reviewedBy, reviewedAt

### AdminToken
- token (unique)
- description
- isUsed, usedBy, usedAt
- expiresAt
- createdBy (ref to User)

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ Role-based access control (Admin/Employee)
- ✅ Input validation
- ✅ Mongoose schema validation
- ✅ CORS configuration
- ✅ Environment variables for sensitive data

---

## 🧪 Testing

Test the API health:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-01-10T...",
  "database": "connected"
}
```

---

## 📝 Available Departments

- Engineering
- Marketing
- Sales
- HR
- Finance
- Operations
- Customer Support
- Design
- Product
- Other

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** Mongoose validators + validator.js
- **Environment:** dotenv
- **Development:** nodemon

---

## 📞 Support

For issues or questions, please contact the development team or create an issue in the project repository.

---

## 📄 License

MIT
