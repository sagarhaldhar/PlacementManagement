const Joi = require("joi");

const registerValidation = {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      phone: Joi.string().required(),
      registrationNum : Joi.string().required(),
      gender: Joi.string().required(),
      course: Joi.string().required(),
      branch : Joi.string().required(),
      profilePic: Joi.string().optional(),
      year : Joi.number().required(),
      batch : Joi.string().required(),
      city : Joi.string().required(),
      state : Joi.string().required(),
    }),
};

module.exports = {
  registerValidation, 
}