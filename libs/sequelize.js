const { Sequelize } = require('sequelize'),
      config = require('../config/config'),
      setupModels = require('./../db/models'),
      URI = config.dbUrl

const sequelize = new Sequelize(URI, {
  dialect: `${config.dialect}`,
  logging: false
})

setupModels(sequelize)
module.exports = sequelize
