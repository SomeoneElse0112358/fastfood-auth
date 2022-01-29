const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().required().email().min(6),
  password: Joi.string().min(6).required()
});

const registerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.number().min(7).required(),
  email: Joi.string().required().email().min(6),
  password: Joi.string().min(6).required()
});

module.exports = { loginSchema, registerSchema };
