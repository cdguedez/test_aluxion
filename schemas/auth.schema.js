const Joi = require('joi')

const email = Joi.string().email()
const username = Joi.string().min(5).max(20)
const password = Joi.string().min(8)
const role = Joi.string().valid('admin', 'customer')
const token = Joi.string().min(20)
const newPassword = Joi.string().min(8)

const login = Joi.object({
  email: email.required(),
  password: password.required()
})

const register = Joi.object({
    email: email.required(),
    username: username.required(),
    password: password.required(),
    role
})

const recovery = Joi.object({
  email: email.required()
})

const resetPassword = Joi.object({
  token: token.required(),
  newPassword: newPassword.required()
})

module.exports = { login, register, recovery, resetPassword }
