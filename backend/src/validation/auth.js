const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().trim().required().label('Name'),
    email: Joi.string().trim().email().required().label('Email'),
    password: Joi.string().alphanum().min(8).required()
});


const loginSchema = Joi.object({
    email: Joi.string().trim().email().required().label('Email'),
    password: Joi.string().min(8).required()
});

const refreshTokenSchema = Joi.object({
   userRefreshToken: Joi.string().trim().required().label('refresh roken'),
})
module.exports = { registerSchema, loginSchema, refreshTokenSchema };