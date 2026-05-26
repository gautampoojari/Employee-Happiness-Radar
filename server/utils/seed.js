import { User, MoodCheckIn, Survey, SurveyResponse, Feedback, AdminToken, sequelize } from '../models/index.js';
import { connectDB } from '../config/database.js';

// Seed database with sample data
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');
    
    // Connect to database
    await connectDB();
    
    // Clear existing data (optional)
    console.log('🗑️  Clearing existing data...');
    await sequelize.sync({ force: true }); // This will drop and recreate all tables
    
    // Create admin tokens
    console.log('🔑 Creating admin tokens...');
    await AdminToken.bulkCreate([
      {
        token: 'ADMIN-INVITE-2025-MAIN',
        description: 'Main Admin Token',
        expiresAt: new Date('2026-12-31')
      },
      {
        token: 'ADMIN-INVITE-HR-001',
        description: 'HR Department Token',
        expiresAt: new Date('2026-12-31')
      },
      {
        token: 'ADMIN-INVITE-EXEC-001',
        description: 'Executive Token',
        expiresAt: new Date('2026-12-31')
      }
    ]);
    
    // Create sample admin
    console.log('👤 Creating sample admin...');
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    
    // Create sample employees
    console.log('👥 Creating sample employees...');
    const employees = await User.bulkCreate([
      {
        name: 'John Smith',
        email: 'john@example.com',
        password: 'password123',
        role: 'employee',
        department: 'Engineering',
        streak: 5
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        password: 'password123',
        role: 'employee',
        department: 'Marketing',
        streak: 3
      },
      {
        name: 'Mike Williams',
        email: 'mike@example.com',
        password: 'password123',
        role: 'employee',
        department: 'Sales',
        streak: 7
      },
      {
        name: 'Emily Brown',
        email: 'emily@example.com',
        password: 'password123',
        role: 'employee',
        department: 'HR',
        streak: 2
      },
      {
        name: 'David Lee',
        email: 'david@example.com',
        password: 'password123',
        role: 'employee',
        department: 'Engineering',
        streak: 4
      }
    ]);
    
    // Create sample mood check-ins
    console.log('😊 Creating sample mood check-ins...');
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const moodCheckIns = [];
    for (const employee of employees) {
      // Today's check-in
      moodCheckIns.push({
        userId: employee.id,
        date: today,
        happiness: Math.floor(Math.random() * 2) + 3, // 3-5
        stress: Math.floor(Math.random() * 3) + 1, // 1-3
        motivation: Math.floor(Math.random() * 2) + 3, // 3-5
        hydration: Math.floor(Math.random() * 2) + 3, // 3-5
        notes: 'Feeling good today!'
      });
      
      // Yesterday's check-in
      moodCheckIns.push({
        userId: employee.id,
        date: yesterday,
        happiness: Math.floor(Math.random() * 3) + 2, // 2-4
        stress: Math.floor(Math.random() * 3) + 2, // 2-4
        motivation: Math.floor(Math.random() * 3) + 2, // 2-4
        hydration: Math.floor(Math.random() * 3) + 2, // 2-4
        notes: 'Regular day at work'
      });
      
      // Two days ago
      moodCheckIns.push({
        userId: employee.id,
        date: twoDaysAgo,
        happiness: Math.floor(Math.random() * 3) + 2, // 2-4
        stress: Math.floor(Math.random() * 3) + 2, // 2-4
        motivation: Math.floor(Math.random() * 3) + 2, // 2-4
        hydration: Math.floor(Math.random() * 3) + 2, // 2-4
        notes: ''
      });
    }
    
    // Add some burnout cases
    moodCheckIns.push({
      userId: employees[1].id, // Sarah - showing burnout pattern
      date: today,
      happiness: 2,
      stress: 5,
      motivation: 1,
      hydration: 2,
      notes: 'Feeling overwhelmed'
    });
    
    await MoodCheckIn.bulkCreate(moodCheckIns);
    
    // Create sample surveys
    console.log('📋 Creating sample surveys...');
    const surveys = await Survey.bulkCreate([
      {
        title: 'Quarterly Team Satisfaction Survey',
        description: 'Help us understand how you feel about working with your team',
        questions: [
          {
            id: '1',
            type: 'rating',
            question: 'How satisfied are you with team collaboration?',
            min: 1,
            max: 5
          },
          {
            id: '2',
            type: 'rating',
            question: 'How would you rate communication within the team?',
            min: 1,
            max: 5
          },
          {
            id: '3',
            type: 'text',
            question: 'What can we do to improve team dynamics?'
          }
        ],
        isActive: true,
        createdById: admin.id
      },
      {
        title: 'Work-Life Balance Check',
        description: 'We care about your wellbeing outside of work',
        questions: [
          {
            id: '1',
            type: 'rating',
            question: 'How would you rate your current work-life balance?',
            min: 1,
            max: 5
          },
          {
            id: '2',
            type: 'text',
            question: 'What improvements would help you achieve better balance?'
          }
        ],
        isActive: true,
        createdById: admin.id
      }
    ]);
    
    // Create sample survey responses
    console.log('📝 Creating sample survey responses...');
    await SurveyResponse.bulkCreate([
      {
        surveyId: surveys[0].id,
        userId: employees[0].id,
        answers: [
          { questionId: '1', question: 'How satisfied are you with team collaboration?', type: 'rating', answer: 4 },
          { questionId: '2', question: 'How would you rate communication within the team?', type: 'rating', answer: 5 },
          { questionId: '3', question: 'What can we do to improve team dynamics?', type: 'text', answer: 'More team building activities' }
        ]
      },
      {
        surveyId: surveys[0].id,
        userId: employees[2].id,
        answers: [
          { questionId: '1', question: 'How satisfied are you with team collaboration?', type: 'rating', answer: 3 },
          { questionId: '2', question: 'How would you rate communication within the team?', type: 'rating', answer: 4 },
          { questionId: '3', question: 'What can we do to improve team dynamics?', type: 'text', answer: 'Better meeting structure' }
        ]
      }
    ]);
    
    // Create sample feedback
    console.log('💬 Creating sample feedback...');
    await Feedback.bulkCreate([
      {
        userId: employees[0].id,
        isAnonymous: false,
        category: 'Work Environment',
        subject: 'Office Temperature',
        message: 'The office temperature is often too cold, making it hard to focus on work.',
        status: 'pending'
      },
      {
        userId: null,
        isAnonymous: true,
        category: 'Management',
        subject: 'Communication Issues',
        message: 'There seems to be a lack of clear communication from management regarding project deadlines.',
        status: 'pending'
      },
      {
        userId: employees[3].id,
        isAnonymous: false,
        category: 'Tools & Resources',
        subject: 'Software Request',
        message: 'Would like to request access to better project management tools.',
        status: 'reviewed',
        adminNotes: 'Looking into budget for new tools',
        reviewedById: admin.id,
        reviewedAt: new Date()
      }
    ]);
    
    console.log('✅ Database seeded successfully!');
    console.log('\n📊 Sample Data Created:');
    console.log(`   - ${employees.length} employees`);
    console.log(`   - 1 admin`);
    console.log(`   - ${moodCheckIns.length} mood check-ins`);
    console.log(`   - ${surveys.length} surveys`);
    console.log(`   - 2 survey responses`);
    console.log(`   - 3 feedback items`);
    console.log(`   - 3 admin invite tokens`);
    console.log('\n🔐 Sample Login Credentials:');
    console.log('   Admin:');
    console.log('     Email: admin@example.com');
    console.log('     Password: admin123');
    console.log('   Employee:');
    console.log('     Email: john@example.com');
    console.log('     Password: password123');
    console.log('\n🔑 Admin Invite Tokens:');
    console.log('   - ADMIN-INVITE-2025-MAIN');
    console.log('   - ADMIN-INVITE-HR-001');
    console.log('   - ADMIN-INVITE-EXEC-001');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
