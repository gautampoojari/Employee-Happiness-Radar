import express from 'express';
import { User, MoodCheckIn, Survey, SurveyResponse, Feedback, AdminToken, sequelize } from '../models/index.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { Op, fn, col, literal } from 'sequelize';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticate, requireAdmin);

// ============= DASHBOARD & ANALYTICS =============

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard overview statistics
// @access  Private (Admin)
router.get('/dashboard', async (req, res) => {
  try {
    const totalEmployees = await User.count({ where: { role: 'employee', isActive: true } });
    const totalCheckIns = await MoodCheckIn.count();
    const totalSurveys = await Survey.count();
    const totalFeedback = await Feedback.count();
    
    // Calculate average mood metrics
    const moodAggregation = await MoodCheckIn.findOne({
      attributes: [
        [fn('AVG', col('happiness')), 'avgHappiness'],
        [fn('AVG', col('stress')), 'avgStress'],
        [fn('AVG', col('motivation')), 'avgMotivation'],
        [fn('AVG', col('hydration')), 'avgHydration']
      ]
    });
    
    const averages = moodAggregation && moodAggregation.dataValues.avgHappiness ? {
      happiness: parseFloat(moodAggregation.dataValues.avgHappiness).toFixed(2),
      stress: parseFloat(moodAggregation.dataValues.avgStress).toFixed(2),
      motivation: parseFloat(moodAggregation.dataValues.avgMotivation).toFixed(2),
      hydration: parseFloat(moodAggregation.dataValues.avgHydration).toFixed(2)
    } : { happiness: 0, stress: 0, motivation: 0, hydration: 0 };
    
    res.json({
      totalEmployees,
      totalCheckIns,
      totalSurveys,
      totalFeedback,
      averages
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
  }
});

// @route   GET /api/admin/trends
// @desc    Get mood trends over time
// @access  Private (Admin)
router.get('/trends', async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const daysInt = parseInt(days);
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysInt);
    const startDateStr = startDate.toISOString().split('T')[0];
    
    const trends = await MoodCheckIn.findAll({
      where: {
        date: { [Op.gte]: startDateStr }
      },
      attributes: [
        'date',
        [fn('AVG', col('happiness')), 'avgHappiness'],
        [fn('AVG', col('stress')), 'avgStress'],
        [fn('AVG', col('motivation')), 'avgMotivation'],
        [fn('AVG', col('hydration')), 'avgHydration'],
        [fn('COUNT', col('id')), 'count']
      ],
      group: ['date'],
      order: [['date', 'ASC']],
      raw: true
    });
    
    const formattedTrends = trends.map(t => ({
      date: t.date,
      happiness: parseFloat(t.avgHappiness).toFixed(2),
      stress: parseFloat(t.avgStress).toFixed(2),
      motivation: parseFloat(t.avgMotivation).toFixed(2),
      hydration: parseFloat(t.avgHydration).toFixed(2),
      count: t.count
    }));
    
    res.json({ trends: formattedTrends });
  } catch (error) {
    console.error('Get trends error:', error);
    res.status(500).json({ message: 'Error fetching trends', error: error.message });
  }
});

// @route   GET /api/admin/department-stats
// @desc    Get statistics by department
// @access  Private (Admin)
router.get('/department-stats', async (req, res) => {
  try {
    const employees = await User.findAll({ where: { role: 'employee', isActive: true } });
    const departments = [...new Set(employees.map(e => e.department))];
    
    const departmentStats = await Promise.all(
      departments.map(async (dept) => {
        const deptEmployees = employees.filter(e => e.department === dept);
        const deptEmployeeIds = deptEmployees.map(e => e.id);
        
        const checkIns = await MoodCheckIn.findAll({ where: { userId: { [Op.in]: deptEmployeeIds } } });
        
        if (checkIns.length === 0) {
          return {
            department: dept,
            employeeCount: deptEmployees.length,
            checkInCount: 0,
            averages: { happiness: 0, stress: 0, motivation: 0, hydration: 0 }
          };
        }
        
        const totals = checkIns.reduce((acc, c) => {
          acc.happiness += c.happiness;
          acc.stress += c.stress;
          acc.motivation += c.motivation;
          acc.hydration += c.hydration;
          return acc;
        }, { happiness: 0, stress: 0, motivation: 0, hydration: 0 });
        
        const count = checkIns.length;
        
        return {
          department: dept,
          employeeCount: deptEmployees.length,
          checkInCount: count,
          averages: {
            happiness: parseFloat((totals.happiness / count).toFixed(2)),
            stress: parseFloat((totals.stress / count).toFixed(2)),
            motivation: parseFloat((totals.motivation / count).toFixed(2)),
            hydration: parseFloat((totals.hydration / count).toFixed(2))
          }
        };
      })
    );
    
    res.json({ departments: departmentStats });
  } catch (error) {
    console.error('Get department stats error:', error);
    res.status(500).json({ message: 'Error fetching department statistics', error: error.message });
  }
});

// @route   GET /api/admin/burnout-alerts
// @desc    Detect employees at risk of burnout
// @access  Private (Admin)
router.get('/burnout-alerts', async (req, res) => {
  try {
    const employees = await User.findAll({ where: { role: 'employee', isActive: true } });
    const alerts = [];
    
    for (const employee of employees) {
      // Get last 5 check-ins
      const recentCheckIns = await MoodCheckIn.findAll({ 
        where: { userId: employee.id },
        order: [['date', 'DESC']],
        limit: 5
      });
      
      if (recentCheckIns.length >= 3) {
        // Check for burnout pattern: stress >= 4 AND motivation <= 2 for 3+ entries
        const burnoutEntries = recentCheckIns.filter(c => c.stress >= 4 && c.motivation <= 2);
        
        if (burnoutEntries.length >= 3) {
          alerts.push({
            employee: {
              id: employee.id,
              name: employee.name,
              email: employee.email,
              department: employee.department
            },
            severity: 'high',
            message: 'High stress and low motivation detected',
            recentCheckIns: recentCheckIns.length,
            burnoutIndicators: burnoutEntries.length
          });
        }
      }
    }
    
    res.json({ alerts });
  } catch (error) {
    console.error('Get burnout alerts error:', error);
    res.status(500).json({ message: 'Error detecting burnout alerts', error: error.message });
  }
});

// ============= EMPLOYEE MANAGEMENT =============

// @route   GET /api/admin/employees
// @desc    Get all employees
// @access  Private (Admin)
router.get('/employees', async (req, res) => {
  try {
    const { department, active = 'true' } = req.query;
    
    const filter = { role: 'employee' };
    
    if (department) {
      filter.department = department;
    }
    
    if (active !== 'all') {
      filter.isActive = active === 'true';
    }
    
    const employees = await User.findAll({
      where: filter,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ employees });
  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
});

// @route   GET /api/admin/employees/:id
// @desc    Get employee details with mood history
// @access  Private (Admin)
router.get('/employees/:id', async (req, res) => {
  try {
    const employee = await User.findOne({ 
      where: { 
        id: req.params.id, 
        role: 'employee' 
      },
      attributes: { exclude: ['password'] }
    });
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    const checkIns = await MoodCheckIn.findAll({ 
      where: { userId: employee.id },
      order: [['date', 'DESC'], ['createdAt', 'DESC']],
      limit: 30
    });
    
    const totalCheckIns = await MoodCheckIn.count({ where: { userId: employee.id } });
    
    console.log(`📊 Admin viewing employee: ${employee.name}`);
    console.log(`   - Total check-ins: ${totalCheckIns}`);
    console.log(`   - Recent check-ins: ${checkIns.length}`);
    
    res.json({
      employee,
      checkIns,
      totalCheckIns
    });
  } catch (error) {
    console.error('Get employee error:', error);
    res.status(500).json({ message: 'Error fetching employee details', error: error.message });
  }
});

// @route   DELETE /api/admin/employees/:id
// @desc    Deactivate employee account
// @access  Private (Admin)
router.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await User.findOne({ 
      where: { 
        id: req.params.id, 
        role: 'employee' 
      }
    });
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    employee.isActive = false;
    await employee.save();
    
    res.json({ 
      message: 'Employee account deactivated successfully',
      employee: employee.getPublicProfile()
    });
  } catch (error) {
    console.error('Deactivate employee error:', error);
    res.status(500).json({ message: 'Error deactivating employee', error: error.message });
  }
});

// ============= SURVEY MANAGEMENT =============

// @route   POST /api/admin/surveys
// @desc    Create new survey
// @access  Private (Admin)
router.post('/surveys', async (req, res) => {
  try {
    const { title, description, questions, isActive } = req.body;
    
    console.log('📋 Creating survey...');
    console.log('   - Title:', title);
    console.log('   - Questions:', JSON.stringify(questions, null, 2));
    
    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({ message: 'Title and at least one question are required' });
    }
    
    const survey = await Survey.create({
      title,
      description: description || '',
      questions,
      isActive: isActive !== undefined ? isActive : true,
      createdById: req.user.id
    });
    
    console.log('✅ Survey created successfully:', survey.id);
    
    res.status(201).json({
      message: 'Survey created successfully',
      survey
    });
  } catch (error) {
    console.error('❌ Create survey error:', error.message);
    console.error('   Full error:', error);
    res.status(500).json({ message: 'Error creating survey', error: error.message });
  }
});

// @route   GET /api/admin/surveys
// @desc    Get all surveys
// @access  Private (Admin)
router.get('/surveys', async (req, res) => {
  try {
    const { active } = req.query;
    
    const filter = {};
    if (active !== undefined) {
      filter.isActive = active === 'true';
    }
    
    const surveys = await Survey.findAll({
      where: filter,
      include: [{
        model: User,
        as: 'createdBy',
        attributes: ['name', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ surveys });
  } catch (error) {
    console.error('Get surveys error:', error);
    res.status(500).json({ message: 'Error fetching surveys', error: error.message });
  }
});

// @route   PATCH /api/admin/surveys/:id/toggle
// @desc    Toggle survey active status
// @access  Private (Admin)
router.patch('/surveys/:id/toggle', async (req, res) => {
  try {
    const survey = await Survey.findByPk(req.params.id);
    
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }
    
    survey.isActive = !survey.isActive;
    await survey.save();
    
    res.json({
      message: `Survey ${survey.isActive ? 'activated' : 'deactivated'} successfully`,
      survey
    });
  } catch (error) {
    console.error('Toggle survey error:', error);
    res.status(500).json({ message: 'Error toggling survey status', error: error.message });
  }
});

// @route   DELETE /api/admin/surveys/:id
// @desc    Delete survey and its responses
// @access  Private (Admin)
router.delete('/surveys/:id', async (req, res) => {
  try {
    const survey = await Survey.findByPk(req.params.id);
    
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }
    
    // Delete all responses
    await SurveyResponse.destroy({ where: { surveyId: survey.id } });
    
    // Delete survey
    await survey.destroy();
    
    res.json({ message: 'Survey and all responses deleted successfully' });
  } catch (error) {
    console.error('Delete survey error:', error);
    res.status(500).json({ message: 'Error deleting survey', error: error.message });
  }
});

// @route   GET /api/admin/surveys/:id/responses
// @desc    Get all responses for a survey
// @access  Private (Admin)
router.get('/surveys/:id/responses', async (req, res) => {
  try {
    const survey = await Survey.findByPk(req.params.id);
    
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }
    
    const responses = await SurveyResponse.findAll({ 
      where: { surveyId: survey.id },
      include: [{
        model: User,
        as: 'user',
        attributes: ['name', 'email', 'department']
      }],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      survey,
      responses
    });
  } catch (error) {
    console.error('Get survey responses error:', error);
    res.status(500).json({ message: 'Error fetching survey responses', error: error.message });
  }
});

// ============= FEEDBACK MANAGEMENT =============

// @route   GET /api/admin/feedback
// @desc    Get all feedback (anonymous and identified)
// @access  Private (Admin)
router.get('/feedback', async (req, res) => {
  try {
    const { status } = req.query;
    
    const filter = {};
    if (status) {
      filter.status = status;
    }
    
    const feedbacks = await Feedback.findAll({
      where: filter,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email', 'department']
        },
        {
          model: User,
          as: 'reviewedBy',
          attributes: ['name', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ feedbacks });
  } catch (error) {
    console.error('Get feedback error:', error);
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
});

// @route   PATCH /api/admin/feedback/:id
// @desc    Update feedback status and add admin notes
// @access  Private (Admin)
router.patch('/feedback/:id', async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    
    const feedback = await Feedback.findByPk(req.params.id);
    
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    
    if (status) {
      feedback.status = status;
      feedback.reviewedById = req.user.id;
      feedback.reviewedAt = new Date();
    }
    
    if (adminNotes !== undefined) {
      feedback.adminNotes = adminNotes;
    }
    
    await feedback.save();
    
    const updatedFeedback = await Feedback.findByPk(feedback.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email', 'department']
        },
        {
          model: User,
          as: 'reviewedBy',
          attributes: ['name', 'email']
        }
      ]
    });
    
    res.json({
      message: 'Feedback updated successfully',
      feedback: updatedFeedback
    });
  } catch (error) {
    console.error('Update feedback error:', error);
    res.status(500).json({ message: 'Error updating feedback', error: error.message });
  }
});

// ============= ADMIN TOKEN MANAGEMENT =============

// @route   POST /api/admin/tokens/generate
// @desc    Generate new admin invite token
// @access  Private (Admin)
router.post('/tokens/generate', async (req, res) => {
  try {
    const { description, expiresInDays = 30 } = req.body;
    
    const token = `ADMIN-INVITE-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + parseInt(expiresInDays));
    
    const adminToken = await AdminToken.create({
      token,
      description: description || 'Admin Invite Token',
      expiresAt,
      createdById: req.user.id
    });
    
    res.status(201).json({
      message: 'Admin invite token generated successfully',
      token: adminToken
    });
  } catch (error) {
    console.error('Generate token error:', error);
    res.status(500).json({ message: 'Error generating token', error: error.message });
  }
});

// @route   GET /api/admin/tokens
// @desc    Get all admin invite tokens
// @access  Private (Admin)
router.get('/tokens', async (req, res) => {
  try {
    const tokens = await AdminToken.findAll({
      include: [
        {
          model: User,
          as: 'createdBy',
          attributes: ['name', 'email']
        },
        {
          model: User,
          as: 'usedBy',
          attributes: ['name', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ tokens });
  } catch (error) {
    console.error('Get tokens error:', error);
    res.status(500).json({ message: 'Error fetching tokens', error: error.message });
  }
});

export default router;