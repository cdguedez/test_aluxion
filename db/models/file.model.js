const { Model, DataTypes, Sequelize } = require('sequelize')
const { USERS_TABLE } = require('./user.model')
const FILES_TABLE = 'files'
const FilesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(100),
  },
  urlImage: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'url_image',
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: USERS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
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
class File extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' })
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: FILES_TABLE,
      modelName: 'File',
      timestamps: true
    }
  }
}

module.exports = { FILES_TABLE, FilesSchema, File }
