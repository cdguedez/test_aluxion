const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const { models } = require('../libs/sequelize')

class UsersService {

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10)
    const newUser = await models.User.create({
      ...data,
      password: hash
    })
    delete newUser.dataValues.password
    return newUser
  }

  async find() {
    const users = await models.User.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    })
    return users
  }

  async findOne(id) {
    const user = await models.User.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    })
    if(!user) {
      throw boom.notFound('User not found')
    }
    return user
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    if(!user) {
      throw boom.unauthorized('Credentials do not match')
    }
    return user
  }

  async update(id, data) {
    const updateUser = await this.findOne(id)
    await updateUser.update(data)
    delete updateUser.dataValues.password
    return updateUser
  }

  async destroy(id) {
    const user = await this.findOne(id)
    await user.destroy()
    return id
  }

}

module.exports = UsersService
