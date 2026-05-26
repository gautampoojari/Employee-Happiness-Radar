import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create SQLite database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: join(__dirname, '..', 'database.sqlite'),
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: false,
  },
});

// Test database connection
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQLite database connected successfully');
    
    // Sync all models (create tables if they don't exist)
    await sequelize.sync({ alter: false });
    console.log('✅ Database tables synchronized');
    
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error);
    throw error;
  }
};

export default sequelize;
