import { connectDB } from '../config/database.js';
import { User, MoodCheckIn, Survey, SurveyResponse, Feedback, AdminToken } from '../models/index.js';

// Database Viewer - View all data in SQLite database
const viewDatabase = async () => {
  try {
    console.log('🔍 Employee Happiness Radar - Database Viewer');
    console.log('============================================\n');
    
    await connectDB();
    
    // View Users
    console.log('👥 USERS');
    console.log('--------');
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['role', 'ASC'], ['createdAt', 'DESC']]
    });
    
    if (users.length === 0) {
      console.log('   No users found. Run "npm run seed" to add sample data.\n');
    } else {
      users.forEach(user => {
        console.log(`   ${user.role === 'admin' ? '👑' : '👤'} ${user.name}`);
        console.log(`      Email: ${user.email}`);
        console.log(`      Role: ${user.role}`);
        if (user.department) console.log(`      Department: ${user.department}`);
        if (user.streak) console.log(`      Streak: ${user.streak} days`);
        console.log(`      Active: ${user.isActive ? 'Yes' : 'No'}`);
        console.log(`      Created: ${user.createdAt.toLocaleDateString()}`);
        console.log('');
      });
    }
    
    // View Mood Check-ins
    console.log('😊 MOOD CHECK-INS');
    console.log('-----------------');
    const checkIns = await MoodCheckIn.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['name', 'email']
      }],
      order: [['date', 'DESC']],
      limit: 10
    });
    
    if (checkIns.length === 0) {
      console.log('   No check-ins found.\n');
    } else {
      console.log(`   Total: ${await MoodCheckIn.count()} check-ins (showing last 10)\n`);
      checkIns.forEach(checkIn => {
        console.log(`   📅 ${checkIn.date} - ${checkIn.user ? checkIn.user.name : 'Unknown'}`);
        console.log(`      😊 Happiness: ${checkIn.happiness}/5`);
        console.log(`      😰 Stress: ${checkIn.stress}/5`);
        console.log(`      💪 Motivation: ${checkIn.motivation}/5`);
        console.log(`      💧 Hydration: ${checkIn.hydration}/5`);
        if (checkIn.notes) console.log(`      📝 Notes: ${checkIn.notes}`);
        console.log('');
      });
    }
    
    // View Surveys
    console.log('📋 SURVEYS');
    console.log('----------');
    const surveys = await Survey.findAll({
      include: [{
        model: User,
        as: 'createdBy',
        attributes: ['name', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });
    
    if (surveys.length === 0) {
      console.log('   No surveys found.\n');
    } else {
      surveys.forEach(survey => {
        console.log(`   📊 ${survey.title}`);
        console.log(`      Status: ${survey.isActive ? '✅ Active' : '❌ Inactive'}`);
        console.log(`      Questions: ${survey.questions.length}`);
        console.log(`      Created by: ${survey.createdBy ? survey.createdBy.name : 'Unknown'}`);
        console.log(`      Created: ${survey.createdAt.toLocaleDateString()}`);
        console.log('');
      });
    }
    
    // View Survey Responses
    console.log('📝 SURVEY RESPONSES');
    console.log('-------------------');
    const responses = await SurveyResponse.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email']
        },
        {
          model: Survey,
          as: 'survey',
          attributes: ['title']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    if (responses.length === 0) {
      console.log('   No survey responses found.\n');
    } else {
      responses.forEach(response => {
        console.log(`   ✍️  ${response.user ? response.user.name : 'Anonymous'}`);
        console.log(`      Survey: ${response.survey ? response.survey.title : 'Unknown'}`);
        console.log(`      Submitted: ${response.createdAt.toLocaleDateString()}`);
        console.log('');
      });
    }
    
    // View Feedback
    console.log('💬 FEEDBACK');
    console.log('-----------');
    const feedbacks = await Feedback.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email']
        },
        {
          model: User,
          as: 'reviewedBy',
          attributes: ['name', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    if (feedbacks.length === 0) {
      console.log('   No feedback found.\n');
    } else {
      feedbacks.forEach(feedback => {
        console.log(`   ${feedback.isAnonymous ? '🔒' : '👤'} ${feedback.subject}`);
        console.log(`      From: ${feedback.isAnonymous ? 'Anonymous' : (feedback.user ? feedback.user.name : 'Unknown')}`);
        console.log(`      Category: ${feedback.category}`);
        console.log(`      Status: ${feedback.status}`);
        console.log(`      Submitted: ${feedback.createdAt.toLocaleDateString()}`);
        console.log('');
      });
    }
    
    // View Admin Tokens
    console.log('🔑 ADMIN INVITE TOKENS');
    console.log('----------------------');
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
    
    if (tokens.length === 0) {
      console.log('   No admin tokens found.\n');
    } else {
      tokens.forEach(token => {
        const status = token.isUsed ? '✅ Used' : (token.isExpired() ? '⏰ Expired' : '🟢 Valid');
        console.log(`   ${status} ${token.token}`);
        console.log(`      Description: ${token.description || 'N/A'}`);
        console.log(`      Expires: ${token.expiresAt.toLocaleDateString()}`);
        if (token.isUsed && token.usedBy) {
          console.log(`      Used by: ${token.usedBy.name} (${token.usedBy.email})`);
        }
        console.log('');
      });
    }
    
    // Summary
    console.log('============================================');
    console.log('📊 SUMMARY');
    console.log('----------');
    const adminCount = await User.count({ where: { role: 'admin' } });
    const employeeCount = await User.count({ where: { role: 'employee' } });
    const checkInCount = await MoodCheckIn.count();
    const surveyCount = await Survey.count();
    const responseCount = await SurveyResponse.count();
    const feedbackCount = await Feedback.count();
    const tokenCount = await AdminToken.count();
    
    console.log(`   👑 Admins: ${adminCount}`);
    console.log(`   👤 Employees: ${employeeCount}`);
    console.log(`   😊 Mood Check-ins: ${checkInCount}`);
    console.log(`   📋 Surveys: ${surveyCount}`);
    console.log(`   📝 Survey Responses: ${responseCount}`);
    console.log(`   💬 Feedback: ${feedbackCount}`);
    console.log(`   🔑 Admin Tokens: ${tokenCount}`);
    console.log('');
    
    console.log('🔗 Database Location:');
    console.log(`   ${process.cwd()}/database.sqlite`);
    console.log('');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error viewing database:', error);
    process.exit(1);
  }
};

viewDatabase();