const Joi = require('joi')

const email = Joi.string().email()
const username = Joi.string().min(5).max(20)
const password = Joi.string().min(8)
const role = Joi.string().valid('admin', 'customer')

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

module.exports = { login, register, recovery }
