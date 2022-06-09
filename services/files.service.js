const { uploadFileToAWS } = require('./.././utils/aws/s3')
const { models } = require('../libs/sequelize')
class FilesService {
  async upload(files, user) {
    const { file } = files
    const { sub } = user
    const result = await uploadFileToAWS(file)
    const save = await models.File.create({ name: result.Key, urlImage: result.Location, userId: sub })
    delete save.dataValues.createdAt
    delete save.dataValues.updatedAt
    return save
  }
}
module.exports = FilesService
