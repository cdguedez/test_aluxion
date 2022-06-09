const { uploadFileToAWS } = require('./.././utils/aws/s3')
const { models } = require('../libs/sequelize')
const boom = require('@hapi/boom')
class FilesService {
  async upload(files, user) {
    const { file } = files
    const { sub } = user
    const userMatch = await models.User.findOne({ where: { id: sub } })
    if(!userMatch) {
      throw boom.notFound('Associated user not exist')
    }
    const result = await uploadFileToAWS(file)
    const save = await models.File.create({ name: result.Key, urlImage: result.Location, userId: sub })
    delete save.dataValues.createdAt
    delete save.dataValues.updatedAt
    return save
  }

  async find() {
    const files = await models.File.findAll()
    return files
  }


}
module.exports = FilesService
