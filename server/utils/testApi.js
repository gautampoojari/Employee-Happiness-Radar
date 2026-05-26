import { User, MoodCheckIn, Survey, SurveyResponse, Feedback, AdminToken } from '../models/index.js';

// API Test Script - Tests all backend endpoints
const BASE_URL = 'http://localhost:5000/api';

console.log('🧪 Employee Happiness Radar - API Test Suite');
console.log('=============================================\n');

let adminToken = '';
let employeeToken = '';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

const success = (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`);
const error = (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`);
const info = (msg) => console.log(`${colors.yellow}ℹ️  ${msg}${colors.reset}`);

// Test health endpoint
async function testHealth() {
  try {
    info('Testing health endpoint...');
    const response = await fetch(`${BASE_URL}/health`);
    const data = await response.json();
    
    if (response.ok && data.status === 'ok') {
      success('Health endpoint working');
      return true;
    } else {
      error('Health endpoint failed');
      return false;
    }
  } catch (err) {
    error(`Health endpoint error: ${err.message}`);
    return false;
  }
}

// Test employee login
async function testEmployeeLogin() {
  try {
    info('Testing employee login...');
    const response = await fetch(`${BASE_URL}/auth/employee/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'john@example.com',
        password: 'password123'
      })
    });
    
    const data = await response.json();
    
    if (response.ok && data.token) {
      employeeToken = data.token;
      success(`Employee login successful (User: ${data.user.name})`);
      return true;
    } else {
      error(`Employee login failed: ${data.message}`);
      return false;
    }
  } catch (err) {
    error(`Employee login error: ${err.message}`);
    return false;
  }
}

// Test admin login
async function testAdminLogin() {
  try {
    info('Testing admin login...');
    const response = await fetch(`${BASE_URL}/auth/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'admin123'
      })
    });
    
    const data = await response.json();
    
    if (response.ok && data.token) {
      adminToken = data.token;
      success(`Admin login successful (User: ${data.user.name})`);
      return true;
    } else {
      error(`Admin login failed: ${data.message}`);
      return false;
    }
  } catch (err) {
    error(`Admin login error: ${err.message}`);
    return false;
  }
}

// Test getting current user
async function testGetMe(token, role) {
  try {
    info(`Testing get current user (${role})...`);
    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const data = await response.json();
    
    if (response.ok && data.user) {
      success(`Get current user successful (${role}: ${data.user.name})`);
      return true;
    } else {
      error(`Get current user failed (${role})`);
      return false;
    }
  } catch (err) {
    error(`Get current user error (${role}): ${err.message}`);
    return false;
  }
}

// Test admin dashboard
async function testAdminDashboard() {
  try {
    info('Testing admin dashboard...');
    const response = await fetch(`${BASE_URL}/admin/dashboard`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    
    const data = await response.json();
    
    if (response.ok && data.totalEmployees !== undefined) {
      success(`Admin dashboard working (${data.totalEmployees} employees, ${data.totalCheckIns} check-ins)`);
      return true;
    } else {
      error('Admin dashboard failed');
      return false;
    }
  } catch (err) {
    error(`Admin dashboard error: ${err.message}`);
    return false;
  }
}

// Test admin get employees
async function testAdminGetEmployees() {
  try {
    info('Testing admin get employees...');
    const response = await fetch(`${BASE_URL}/admin/employees`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    
    const data = await response.json();
    
    if (response.ok && data.employees) {
      success(`Admin get employees working (${data.employees.length} employees)`);
      return true;
    } else {
      error('Admin get employees failed');
      return false;
    }
  } catch (err) {
    error(`Admin get employees error: ${err.message}`);
    return false;
  }
}

// Test employee get mood history
async function testEmployeeMoodHistory() {
  try {
    info('Testing employee mood history...');
    const response = await fetch(`${BASE_URL}/mood/history`, {
      headers: { 'Authorization': `Bearer ${employeeToken}` }
    });
    
    const data = await response.json();
    
    if (response.ok && data.checkIns) {
      success(`Employee mood history working (${data.checkIns.length} check-ins)`);
      return true;
    } else {
      error('Employee mood history failed');
      return false;
    }
  } catch (err) {
    error(`Employee mood history error: ${err.message}`);
    return false;
  }
}

// Test employee get surveys
async function testEmployeeSurveys() {
  try {
    info('Testing employee get surveys...');
    const response = await fetch(`${BASE_URL}/survey/active`, {
      headers: { 'Authorization': `Bearer ${employeeToken}` }
    });
    
    const data = await response.json();
    
    if (response.ok && data.surveys) {
      success(`Employee get surveys working (${data.surveys.length} active surveys)`);
      return true;
    } else {
      error('Employee get surveys failed');
      return false;
    }
  } catch (err) {
    error(`Employee get surveys error: ${err.message}`);
    return false;
  }
}

// Test validate admin token
async function testValidateToken() {
  try {
    info('Testing validate admin token...');
    const response = await fetch(`${BASE_URL}/auth/validate-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: 'ADMIN-INVITE-2025-MAIN' })
    });
    
    const data = await response.json();
    
    if (response.ok && data.valid) {
      success('Admin token validation working');
      return true;
    } else {
      error(`Admin token validation failed: ${data.message}`);
      return false;
    }
  } catch (err) {
    error(`Admin token validation error: ${err.message}`);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('Starting API tests...\n');
  
  let passed = 0;
  let failed = 0;
  
  const tests = [
    { name: 'Health Check', fn: testHealth },
    { name: 'Employee Login', fn: testEmployeeLogin },
    { name: 'Admin Login', fn: testAdminLogin },
    { name: 'Get Employee Profile', fn: () => testGetMe(employeeToken, 'Employee') },
    { name: 'Get Admin Profile', fn: () => testGetMe(adminToken, 'Admin') },
    { name: 'Admin Dashboard', fn: testAdminDashboard },
    { name: 'Admin Get Employees', fn: testAdminGetEmployees },
    { name: 'Employee Mood History', fn: testEmployeeMoodHistory },
    { name: 'Employee Get Surveys', fn: testEmployeeSurveys },
    { name: 'Validate Admin Token', fn: testValidateToken }
  ];
  
  for (const test of tests) {
    const result = await test.fn();
    if (result) {
      passed++;
    } else {
      failed++;
    }
    console.log('');
  }
  
  console.log('=============================================');
  console.log('📊 TEST SUMMARY');
  console.log('=============================================');
  console.log(`Total Tests: ${tests.length}`);
  console.log(`${colors.green}Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failed}${colors.reset}`);
  console.log('');
  
  if (failed === 0) {
    success('All tests passed! Backend is working correctly. ✨');
  } else {
    error(`${failed} test(s) failed. Check the errors above.`);
    console.log('\nTroubleshooting:');
    console.log('1. Make sure backend is running: cd server && npm start');
    console.log('2. Make sure database is seeded: cd server && npm run seed');
    console.log('3. Check backend logs for errors');
  }
  
  console.log('');
}

// Check if backend is running first
async function checkBackend() {
  try {
    const response = await fetch(`${BASE_URL}/health`);
    if (response.ok) {
      return true;
    }
  } catch (err) {
    console.log(`${colors.red}❌ Cannot connect to backend at ${BASE_URL}${colors.reset}`);
    console.log('');
    console.log('Please start the backend first:');
    console.log('  $ cd server');
    console.log('  $ npm start');
    console.log('');
    return false;
  }
}

// Main execution
(async () => {
  const isRunning = await checkBackend();
  if (isRunning) {
    await runAllTests();
  }
  process.exit(0);
})();