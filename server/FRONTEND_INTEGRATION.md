# Connecting Frontend to Backend

This guide explains how to integrate the existing frontend with the new backend API.

## 🔄 Overview

The frontend currently uses `localStorage` to simulate backend operations. To connect it to the real backend, you'll need to:

1. Replace localStorage calls with API calls
2. Add axios or fetch for HTTP requests
3. Update authentication to use JWT tokens
4. Update all data operations to call backend endpoints

---

## 📦 Step 1: Install HTTP Client

### Option 1: Using Axios (Recommended)

```bash
cd /  # Go to root directory (frontend)
npm install axios
```

### Option 2: Using Fetch API (Built-in)
No installation needed, but axios provides better features.

---

## 🔧 Step 2: Create API Client

Create a new file `/src/utils/api.js`:

```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    // Get token based on user role
    const employeeToken = localStorage.getItem('hr_employee_token');
    const adminToken = localStorage.getItem('hr_admin_token');
    const token = employeeToken || adminToken;
    
    if (token) {
      // Extract actual JWT from simulated token or use as-is
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 🔐 Step 3: Update Authentication

Update `/src/utils/auth.js`:

```javascript
import api from './api';

// Employee Signup
export const employeeSignup = async (name, email, password, department) => {
  try {
    const response = await api.post('/auth/employee/signup', {
      name,
      email,
      password,
      department
    });
    
    const { token, user } = response.data;
    
    // Store token and user
    localStorage.setItem('hr_employee_token', token);
    localStorage.setItem('hr_employee', JSON.stringify(user));
    
    return { success: true, message: response.data.message };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Signup failed' 
    };
  }
};

// Employee Login
export const employeeLogin = async (email, password) => {
  try {
    const response = await api.post('/auth/employee/login', {
      email,
      password
    });
    
    const { token, user } = response.data;
    
    localStorage.setItem('hr_employee_token', token);
    localStorage.setItem('hr_employee', JSON.stringify(user));
    
    return { success: true, token, employee: user };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Login failed' 
    };
  }
};

// Admin Signup
export const adminSignup = async (name, email, password, inviteToken) => {
  try {
    const response = await api.post('/auth/admin/signup', {
      name,
      email,
      password,
      inviteToken
    });
    
    return { success: true, message: response.data.message };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Signup failed' 
    };
  }
};

// Admin Login
export const adminLogin = async (email, password) => {
  try {
    const response = await api.post('/auth/admin/login', {
      email,
      password
    });
    
    const { token, user } = response.data;
    
    localStorage.setItem('hr_admin_token', token);
    localStorage.setItem('hr_admin', JSON.stringify(user));
    
    return { success: true, token, admin: user };
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Login failed' 
    };
  }
};

// Validate token
export const validateInviteToken = async (token) => {
  try {
    const response = await api.post('/auth/validate-token', { token });
    return response.data;
  } catch (error) {
    return { 
      valid: false, 
      message: error.response?.data?.message || 'Invalid token' 
    };
  }
};

// Keep existing logout and get current user functions
// (they work with localStorage and don't need backend calls)
```

---

## 📊 Step 4: Update Data Operations

Update `/src/utils/data.js`:

```javascript
import api from './api';

// Mood Check-in
export const addMoodCheckIn = async (employeeId, data) => {
  try {
    const response = await api.post('/mood/checkin', data);
    return response.data.checkIn;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create check-in');
  }
};

export const getMoodCheckIns = async () => {
  try {
    const response = await api.get('/mood/my-checkins?limit=30');
    return response.data.checkIns;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch check-ins');
  }
};

export const getEmployeeStreak = async () => {
  try {
    const response = await api.get('/mood/my-streak');
    return response.data.streak;
  } catch (error) {
    return 0;
  }
};

// Surveys
export const getSurveys = async (activeOnly = false) => {
  try {
    const response = await api.get('/survey/active');
    return response.data.surveys;
  } catch (error) {
    return [];
  }
};

export const submitSurveyResponse = async (surveyId, employeeId, responses) => {
  try {
    const response = await api.post(`/survey/${surveyId}/respond`, { responses });
    return response.data.response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to submit survey');
  }
};

// Feedback
export const submitFeedback = async (employeeId, feedback, isAnonymous) => {
  try {
    const response = await api.post('/feedback', { feedback, isAnonymous });
    return response.data.feedback;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to submit feedback');
  }
};

// Admin: Dashboard
export const getDashboardStats = async () => {
  try {
    const response = await api.get('/admin/dashboard');
    return response.data;
  } catch (error) {
    return {
      totalEmployees: 0,
      totalCheckIns: 0,
      avgHappiness: 0,
      avgStress: 0,
      avgMotivation: 0
    };
  }
};

// Admin: Employees
export const getEmployees = async () => {
  try {
    const response = await api.get('/admin/employees');
    return response.data.employees;
  } catch (error) {
    return [];
  }
};

// Admin: Burnout Detection
export const detectBurnout = async () => {
  try {
    const response = await api.get('/admin/burnout-alerts');
    return response.data.alerts;
  } catch (error) {
    return [];
  }
};

// Admin: Department Stats
export const getDepartmentStats = async () => {
  try {
    const response = await api.get('/admin/department-stats');
    return response.data.departments;
  } catch (error) {
    return [];
  }
};

// Admin: Trends
export const getTrendData = async (days = 7) => {
  try {
    const response = await api.get(`/admin/trends?days=${days}`);
    return response.data.trends;
  } catch (error) {
    return [];
  }
};

// Admin: Create Survey
export const createSurvey = async (title, questions, isActive = true) => {
  try {
    const response = await api.post('/admin/surveys', {
      title,
      questions,
      isActive
    });
    return response.data.survey;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create survey');
  }
};

// Admin: Toggle Survey
export const toggleSurveyStatus = async (surveyId) => {
  try {
    await api.patch(`/admin/surveys/${surveyId}/toggle`);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to toggle survey');
  }
};

// Admin: Delete Survey
export const deleteSurvey = async (surveyId) => {
  try {
    await api.delete(`/admin/surveys/${surveyId}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete survey');
  }
};

// Admin: Get Feedback
export const getFeedback = async () => {
  try {
    const response = await api.get('/admin/feedback');
    return response.data.feedbacks;
  } catch (error) {
    return [];
  }
};

// Note: Remove initializeDemoData() as data is now in the database
```

---

## 🌐 Step 5: Environment Variables

Create `/vite.config.ts` or update existing one:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
```

Create `/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

For production:
```env
VITE_API_URL=https://your-backend-url.com/api
```

---

## 🧪 Step 6: Testing the Integration

1. **Start Backend:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   cd ..  # Back to root
   npm run dev
   ```

3. **Test Flow:**
   - Sign up as employee
   - Log in
   - Submit mood check-in
   - Check if data persists after refresh
   - Sign up as admin (use invite token)
   - View dashboard

---

## 🔍 Step 7: Debugging

### Check API Calls

Add this to your components:

```javascript
import api from '../utils/api';

// Enable detailed logging
api.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

api.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});
```

### Common Issues

1. **CORS Error:**
   - Ensure backend `CLIENT_URL` matches frontend URL
   - Check CORS middleware in `server.js`

2. **401 Unauthorized:**
   - Check token is being sent in headers
   - Verify token hasn't expired
   - Ensure user exists in database

3. **Network Error:**
   - Verify backend is running on port 5000
   - Check `VITE_API_URL` in `.env`
   - Test backend directly: `curl http://localhost:5000/api/health`

---

## 📝 Step 8: Remove Demo Data Initialization

Update `/src/app/components/AuthContext.jsx`:

Remove or comment out:
```javascript
// Don't call these anymore - data comes from backend
// initializeDemoData();
// initializeTokens();
```

---

## 🎯 Migration Checklist

- [ ] Install axios
- [ ] Create API client (`/src/utils/api.js`)
- [ ] Update auth functions to use API
- [ ] Update data functions to use API
- [ ] Add environment variables
- [ ] Remove localStorage-only operations
- [ ] Test signup/login flow
- [ ] Test mood check-ins
- [ ] Test surveys
- [ ] Test feedback
- [ ] Test admin features
- [ ] Handle errors gracefully
- [ ] Add loading states

---

## 🚀 Final Steps

1. **Remove Demo Data Code:**
   - Comment out `initializeDemoData()`
   - Remove localStorage-only logic

2. **Add Loading States:**
   ```javascript
   const [loading, setLoading] = useState(false);
   
   const handleSubmit = async () => {
     setLoading(true);
     try {
       await api.post('/endpoint', data);
     } catch (error) {
       // Handle error
     } finally {
       setLoading(false);
     }
   };
   ```

3. **Add Error Handling:**
   ```javascript
   const [error, setError] = useState(null);
   
   try {
     const data = await api.get('/endpoint');
   } catch (error) {
     setError(error.response?.data?.message || 'Something went wrong');
   }
   ```

---

## 📚 Additional Resources

- [Backend API Documentation](./server/README.md)
- [Backend Setup Guide](./server/SETUP.md)
- [Axios Documentation](https://axios-http.com/)

---

**Your backend is now ready! Happy integrating! 🎉**
