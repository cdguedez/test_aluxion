const { User, UserSchema } = require('./user.model')
const { File, FilesSchema } = require('./file.model')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  File.init(FilesSchema, File.config(sequelize))

  File.associate(sequelize.models)
}

module.exports = setupModels
