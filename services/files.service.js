const { uploadFileToAWS, renameFileToAWS } = require('./.././utils/aws/s3')
const { models } = require('../libs/sequelize')
const boom = require('@hapi/boom')
class FilesService {

  async upload(files, user) {
    const { file } = files
    const { sub } = user
    const userMatch = await models.User.findOne({ where: { id: sub } })
    if(!userMatch) throw boom.notFound('Associated user not exist')
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

  async update(id, data) {
    const file = await models.File.findOne({ where: { id } })
    if(!file) throw boom.notFound('File not found')

    const renameFile = await renameFileToAWS(data, file)
    const updateFile = await file.update({ name: renameFile.newKey, urlImage: renameFile.newUrlImage })

    return { message: `name file changed of ${renameFile.oldKey} to ${renameFile.newKey}`, file: updateFile }
  }

}
module.exports = FilesService
