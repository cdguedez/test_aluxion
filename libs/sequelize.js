const { Sequelize } = require('sequelize'),
      config = require('../config/config'),
      setupModels = require('./../db/models'),
      // USER = encodeURIComponent(config.dbUser),
      // PASSWORD = encodeURIComponent(config.dbPass),
      URI = config.dbUrl
      // URI = `${config.dialect}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI, {
  dialect: `${config.dialect}`,
  logging: false
})

setupModels(sequelize)
// sequelize.sync()
module.exports = sequelize
