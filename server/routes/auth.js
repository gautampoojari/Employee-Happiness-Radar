import express from 'express';
import { User, AdminToken } from '../models/index.js';
import { generateToken } from '../utils/jwt.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/auth/employee/signup
// @desc    Register new employee
// @access  Public
router.post('/employee/signup', async (req, res) => {
  try {
    const { name, email, password, department } = req.body;
    
    // Validation
    if (!name || !email || !password || !department) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Create new employee
    const employee = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      department,
      role: 'employee'
    });
    
    // Generate token
    const token = generateToken(employee.id);
    
    res.status(201).json({
      message: 'Employee account created successfully',
      token,
      user: employee.getPublicProfile()
    });
  } catch (error) {
    console.error('Employee signup error:', error);
    res.status(500).json({ message: 'Error creating employee account', error: error.message });
  }
});

// @route   POST /api/auth/employee/login
// @desc    Login employee
// @access  Public
router.post('/employee/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    // Find user
    const employee = await User.findOne({ 
      where: { 
        email: email.toLowerCase(),
        role: 'employee'
      }
    });
    
    if (!employee) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isPasswordValid = await employee.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check if account is active
    if (!employee.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }
    
    // Update last login
    employee.lastLogin = new Date();
    await employee.save();
    
    // Generate token
    const token = generateToken(employee.id);
    
    res.json({
      message: 'Login successful',
      token,
      user: employee.getPublicProfile()
    });
  } catch (error) {
    console.error('Employee login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// @route   POST /api/auth/admin/signup
// @desc    Register new admin with invite token
// @access  Public
router.post('/admin/signup', async (req, res) => {
  try {
    const { name, email, password, inviteToken } = req.body;
    
    // Validation
    if (!name || !email || !password || !inviteToken) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Validate admin invite token
    const adminToken = await AdminToken.findOne({ where: { token: inviteToken } });
    
    if (!adminToken) {
      return res.status(400).json({ message: 'Invalid invite token' });
    }
    
    if (!adminToken.isValid()) {
      const reason = adminToken.isUsed ? 'Token has already been used' : 'Token has expired';
      return res.status(400).json({ message: reason });
    }
    
    // Create new admin
    const admin = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'admin',
      adminInviteToken: inviteToken
    });
    
    // Mark token as used
    await adminToken.markAsUsed(admin.id);
    
    // Generate JWT
    const token = generateToken(admin.id);
    
    res.status(201).json({
      message: 'Admin account created successfully',
      token,
      user: admin.getPublicProfile()
    });
  } catch (error) {
    console.error('Admin signup error:', error);
    res.status(500).json({ message: 'Error creating admin account', error: error.message });
  }
});

// @route   POST /api/auth/admin/login
// @desc    Login admin
// @access  Public
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    // Find admin
    const admin = await User.findOne({ 
      where: { 
        email: email.toLowerCase(),
        role: 'admin'
      }
    });
    
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check if account is active
    if (!admin.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }
    
    // Update last login
    admin.lastLogin = new Date();
    await admin.save();
    
    // Generate token
    const token = generateToken(admin.id);
    
    res.json({
      message: 'Login successful',
      token,
      user: admin.getPublicProfile()
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', authenticate, async (req, res) => {
  try {
    res.json({
      user: req.user.getPublicProfile()
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// @route   POST /api/auth/validate-token
// @desc    Validate admin invite token
// @access  Public
router.post('/validate-token', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
    
    const adminToken = await AdminToken.findOne({ where: { token } });
    
    if (!adminToken) {
      return res.status(404).json({ 
        valid: false, 
        message: 'Invalid invite token' 
      });
    }
    
    if (!adminToken.isValid()) {
      const reason = adminToken.isUsed ? 'Token has already been used' : 'Token has expired';
      return res.status(400).json({ 
        valid: false, 
        message: reason 
      });
    }
    
    res.json({
      valid: true,
      message: 'Token is valid',
      description: adminToken.description
    });
  } catch (error) {
    console.error('Token validation error:', error);
    res.status(500).json({ message: 'Error validating token', error: error.message });
  }
});

export default router;
