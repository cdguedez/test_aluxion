const { Model, DataTypes, Sequelize } = require('sequelize')
const USERS_TABLE = 'users'
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(100),
    validate: {
      isEmail: true
    }
  },
  username: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(100),
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING(25),
    defaultValue: 'customer'
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW
  }
}
class User extends Model {
  static associate(models) {
    this.hasMany(models.File, { as: 'file', foreignKey: 'userId' })
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USERS_TABLE,
      modelName: 'User',
      timestamps: true
    }
  }
}

module.exports = { USERS_TABLE, UserSchema, User }
