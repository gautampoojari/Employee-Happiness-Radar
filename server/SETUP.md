# Employee Happiness Radar - Backend Setup Guide

Complete setup guide for the Employee Happiness Radar backend server.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Database Setup](#database-setup)
5. [Running the Server](#running-the-server)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

1. **Node.js** (v18 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **MongoDB** (v6 or higher)
   - **Option 1:** Local Installation
     - macOS (Homebrew): `brew install mongodb-community`
     - Ubuntu: `sudo apt install mongodb`
     - Windows: Download from [mongodb.com](https://www.mongodb.com/try/download/community)
   
   - **Option 2:** MongoDB Atlas (Cloud)
     - Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)
     - Create a free cluster
     - Get your connection string

3. **npm** or **yarn** (comes with Node.js)
   - Verify: `npm --version`

---

## Installation

### Step 1: Navigate to Server Directory

```bash
cd server
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv
- validator
- nodemon (dev dependency)

---

## Configuration

### Step 1: Create Environment File

```bash
cp .env.example .env
```

### Step 2: Configure Environment Variables

Edit the `.env` file with your settings:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MongoDB Configuration
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/employee-happiness-radar

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/employee-happiness-radar?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRES_IN=7d
```

### Important Notes:

1. **JWT_SECRET**: Must be a strong, random string (minimum 32 characters)
   - Generate one using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

2. **MONGODB_URI**: 
   - Local: `mongodb://localhost:27017/employee-happiness-radar`
   - Atlas: Get from your MongoDB Atlas dashboard

3. **CLIENT_URL**: 
   - Development: `http://localhost:5173` (Vite default)
   - Production: Your frontend URL

---

## Database Setup

### Option 1: Local MongoDB

1. **Start MongoDB:**

   **macOS (Homebrew):**
   ```bash
   brew services start mongodb-community
   ```

   **Linux (systemd):**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod  # Auto-start on boot
   ```

   **Windows:**
   ```bash
   net start MongoDB
   ```

2. **Verify MongoDB is running:**
   ```bash
   mongosh  # or mongo (older versions)
   ```

### Option 2: MongoDB Atlas (Cloud)

1. **Create Account:**
   - Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Sign up for free

2. **Create Cluster:**
   - Click "Build a Database"
   - Choose "Free" tier (M0)
   - Select your region
   - Create cluster

3. **Configure Access:**
   - Create a database user (username/password)
   - Add your IP address to whitelist (or use 0.0.0.0/0 for development)

4. **Get Connection String:**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Add to `.env` as `MONGODB_URI`

### Seed Demo Data (Optional)

To populate the database with demo data:

```bash
npm run seed
```

This will create:
- 1 admin account (admin@company.com / admin123)
- 10 employee accounts (password123 for all)
- ~140 mood check-ins
- 2 surveys with sample responses
- 5 feedback items
- 3 admin invite tokens

---

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

The server will:
- Start on `http://localhost:5000`
- Auto-reload on file changes
- Show detailed error messages

### Production Mode

```bash
npm start
```

---

## Testing

### 1. Health Check

Test if the server is running:

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-01-10T12:00:00.000Z",
  "database": "connected"
}
```

### 2. Test Employee Signup

```bash
curl -X POST http://localhost:5000/api/auth/employee/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "department": "Engineering"
  }'
```

### 3. Test Employee Login

```bash
curl -X POST http://localhost:5000/api/auth/employee/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the returned `token` for authenticated requests.

### 4. Test Authenticated Endpoint

```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 5. Test Admin Signup

```bash
curl -X POST http://localhost:5000/api/auth/admin/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "inviteToken": "ADMIN-INVITE-2025-MAIN"
  }'
```

---

## Deployment

### Environment Setup

1. **Set NODE_ENV to production:**
   ```env
   NODE_ENV=production
   ```

2. **Use strong JWT secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

3. **Update CLIENT_URL:**
   ```env
   CLIENT_URL=https://your-frontend-domain.com
   ```

### Deployment Platforms

#### Heroku

1. **Install Heroku CLI**
2. **Login:**
   ```bash
   heroku login
   ```

3. **Create app:**
   ```bash
   heroku create your-app-name
   ```

4. **Set environment variables:**
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-uri"
   heroku config:set JWT_SECRET="your-jwt-secret"
   heroku config:set CLIENT_URL="your-frontend-url"
   ```

5. **Deploy:**
   ```bash
   git push heroku main
   ```

#### Railway

1. Create new project on [railway.app](https://railway.app)
2. Connect GitHub repository
3. Add MongoDB plugin
4. Set environment variables in Railway dashboard
5. Deploy automatically on push

#### DigitalOcean App Platform

1. Create new app
2. Connect GitHub repository
3. Configure build settings
4. Add MongoDB connection
5. Set environment variables
6. Deploy

### MongoDB Atlas for Production

1. **Create Production Cluster:**
   - Use M2 or higher tier
   - Enable backups
   - Configure proper network access

2. **Security:**
   - Use strong passwords
   - Restrict IP access
   - Enable encryption at rest

---

## Troubleshooting

### MongoDB Connection Issues

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions:**
1. Check if MongoDB is running:
   ```bash
   # macOS
   brew services list | grep mongodb
   
   # Linux
   sudo systemctl status mongod
   ```

2. Verify connection string in `.env`
3. For Atlas: Check IP whitelist

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

Or change PORT in `.env`:
```env
PORT=5001
```

### JWT Token Issues

**Error:** `JsonWebTokenError: jwt malformed`

**Solutions:**
1. Ensure token is sent with `Bearer` prefix:
   ```
   Authorization: Bearer <token>
   ```

2. Check JWT_SECRET is set in `.env`
3. Token might be expired (default: 7 days)

### Admin Token Already Used

**Error:** `Token has already been used`

**Solution:**
- Generate new admin token via admin dashboard, OR
- Clear database and re-seed:
  ```bash
  npm run seed
  ```

### CORS Errors

**Error:** `Access-Control-Allow-Origin header`

**Solution:**
Update `CLIENT_URL` in `.env` to match your frontend URL:
```env
CLIENT_URL=http://localhost:5173
```

### Database Validation Errors

**Error:** `ValidationError: ...`

**Solutions:**
1. Check required fields in request body
2. Verify field types match schema
3. Check value ranges (e.g., happiness: 1-5)

---

## Development Tips

### View MongoDB Data

**Using MongoDB Compass:**
1. Download from [mongodb.com/compass](https://www.mongodb.com/try/download/compass)
2. Connect using your connection string
3. Browse collections visually

**Using mongosh:**
```bash
mongosh
use employee-happiness-radar
db.users.find().pretty()
db.moodcheckins.find().pretty()
```

### Clear Database

```javascript
// In mongosh
use employee-happiness-radar
db.dropDatabase()
```

Then re-seed:
```bash
npm run seed
```

### Monitor Server Logs

Development mode shows detailed logs for:
- API requests
- Database queries
- Errors with stack traces

---

## Security Checklist

- [ ] Strong JWT_SECRET (min 32 characters)
- [ ] MongoDB authentication enabled
- [ ] Environment variables not committed to Git
- [ ] CORS configured for production
- [ ] HTTPS enabled in production
- [ ] Rate limiting implemented (optional)
- [ ] Input validation on all endpoints
- [ ] MongoDB Atlas IP whitelist configured

---

## Next Steps

1. ✅ Backend setup complete
2. 🔄 Connect frontend to backend
3. 🧪 Test all API endpoints
4. 🚀 Deploy to production

For API documentation, see [README.md](./README.md)

---

## Support

For issues or questions:
- Check [Troubleshooting](#troubleshooting) section
- Review API docs in [README.md](./README.md)
- Contact development team

---

**Happy coding! 🚀**
