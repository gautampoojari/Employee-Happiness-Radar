import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import sequelize from '../config/database.js';

class User extends Model {
  // Method to compare password
  async comparePassword(candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      throw new Error('Password comparison failed');
    }
  }

  // Method to get public profile (without sensitive data)
  getPublicProfile() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      department: this.department,
      streak: this.streak,
      lastCheckIn: this.lastCheckIn,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name is required' },
        len: {
          args: [2, 50],
          msg: 'Name must be between 2 and 50 characters',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'Email is required' },
        isEmail: { msg: 'Please provide a valid email' },
      },
      set(value) {
        this.setDataValue('email', value.toLowerCase().trim());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password is required' },
        len: {
          args: [6, 100],
          msg: 'Password must be at least 6 characters',
        },
      },
    },
    role: {
      type: DataTypes.ENUM('employee', 'admin'),
      defaultValue: 'employee',
      allowNull: false,
    },
    department: {
      type: DataTypes.ENUM(
        'Engineering',
        'Marketing',
        'Sales',
        'HR',
        'Finance',
        'Operations',
        'Customer Support',
        'Design',
        'Product',
        'Other'
      ),
      allowNull: true,
      validate: {
        isRequiredForEmployee() {
          if (this.role === 'employee' && !this.department) {
            throw new Error('Department is required for employees');
          }
        },
      },
    },
    streak: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    lastCheckIn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    adminInviteToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    indexes: [
      { fields: ['email'] },
      { fields: ['role'] },
      { fields: ['department'] },
    ],
    hooks: {
      beforeSave: async (user) => {
        // Hash password if it's modified
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;
