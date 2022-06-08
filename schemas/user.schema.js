const Joi = require('joi')

const id = Joi.number(),
      email = Joi.string().email(),
      userName = Joi.string().min(5).max(20),
      password = Joi.string().min(8),
      role = Joi.string().valid('admin', 'coordinator', 'customer')

const createUser = Joi.object({
  email: email.required(),
  userName: userName.required(),
  password: password.required(),
  role: role.required()
})

const updateUser = Joi.object({
  userName,
  email,
  password,
  role
})

const getUser = Joi.object({
  id: id.required(),
})

const deleteUser = Joi.object({
  id: id.required(),
})

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
}
