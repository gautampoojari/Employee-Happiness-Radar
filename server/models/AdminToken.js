import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class AdminToken extends Model {
  // Check if token is valid (not used and not expired)
  isValid() {
    if (this.isUsed) return false;
    if (this.expiresAt && new Date() > new Date(this.expiresAt)) return false;
    return true;
  }

  // Mark token as used
  async markAsUsed(userId) {
    this.isUsed = true;
    this.usedById = userId;
    this.usedAt = new Date();
    await this.save();
  }
}

AdminToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'Token is required' },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Admin Invite Token',
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_used',
    },
    usedById: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'used_by_id',
    },
    usedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'used_at',
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'expires_at',
    },
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'created_by_id',
    },
  },
  {
    sequelize,
    modelName: 'AdminToken',
    tableName: 'admin_tokens',
    indexes: [
      { fields: ['token'], unique: true },
      { fields: ['is_used'] },
      { fields: ['expires_at'] },
    ],
  }
);

export default AdminToken;
