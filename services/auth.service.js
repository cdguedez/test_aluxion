const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('./../config/config')
const userService = require('./users.service')
const service = new userService()
const nodemailer = require('nodemailer')
const { models } = require('../libs/sequelize')

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email)
    const isMatch = await bcrypt.compare(password, user.dataValues.password)
    if (!isMatch) {
      throw boom.unauthorized('unauthorized')
    }
    delete user.dataValues.password
    delete user.dataValues.recoveryToken
    return user
  }

  async register(data) {
    const hash = await bcrypt.hash(data.password, 10)
    const newData = {
      ...data,
      password: hash
    }
    const newUser = await models.User.create(newData)
    delete newUser.dataValues.password
    const sendMail = await this.sendRegister(newUser.dataValues.email)
    return { newUser, sendMail }
  }

  signTokenAuth(user) {
    const payload = { sub: user.id, role: user.role }
    const token = jwt.sign(payload, config.keyScret)
    return { user, token }
  }

  async resetPassword(token, newPassword) {
    const payload = jwt.verify(token, config.keyScret)
    const user = await service.findOne(payload.sub)
    if(user.recoveryToken !== token) {
      throw boom.unauthorized('unauthorized')
    }
    const isMatch = await bcrypt.compare(newPassword, user.password)
    if(isMatch) throw boom.notAcceptable('the password has been used before')
    const hash = await bcrypt.hash(newPassword, 10)
    await service.update(user.id, { recoveryToken: null, password: hash })
    const info = {
      from: `"Sistema de archivos cdguedez" ${config.smtpEmail}`,
      to: `${user.email}`,
      subject: `Hola ${user.username} has cambiado tu contraseña de forma exitosa.`,
      text: `Has cambiado tu contraseña de forma exitosa, ya puedes ingresar de nuevo.`,
      html: `<b>Has cambiado tu contraseña de forma exitosa, ya puedes ingresar de nuevo.</b>`,
    }
    const rta = await this.sendMail(info)
    return { message: 'password changed', rta }
  }

  async sendRegister(email) {
    const info = {
      from: `"Sistema de archivos cdguedez" ${config.smtpEmail}`,
      to: email,
      subject: `Gracias por registrarte en nuestro sistema de archivos de Nodejs`,
      text: `Hola, te damos la bienvenida al Sistema de archivos de Nodejs.`,
      html: `<main><h1>Hola, te damos la bienvenida.</h1><p>Gracias por registrarte un nuestro sistema de archivos de Nodejs</p></main>`,
    }
    const rta = await this.sendMail(info)
    return rta
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email)
    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.keyScret, { expiresIn: '10min' })
    const link = `http://localhost:3000/recovery?token=${token}`
    await service.update(user.id, { recoveryToken: token })
    const info = {
      from: `"Sistema de archivos cdguedez" ${config.smtpEmail}`,
      to: `${user.email}`,
      subject: `Hola ${user.username} has solicitado recuperar tu contraseña`,
      text: `Has solicitado cambiar tu contraseña en nuestro sistema de archivos. ingresa en ${link} para cambiarla`,
      html: `<b>Has solicitado cambiar tu contraseña en nuestro sistema de archivos. ingresa en el siguiente <a href=${link}>Link</a> para cambiarla</b>`,
    }
    const rta = await this.sendMail(info)
    return rta
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: true,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPass,
      },
    })
    const info = await transporter.sendMail(infoMail)
    return info.accepted
  }
}

module.exports = AuthService
