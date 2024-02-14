const joi = require('joi');
const createStudentSchema = {
  body: joi.object().keys({
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    email: joi.string().email().required().messages({"any.required":"This field is compulsory"})  
  }),
};

module.exports = {
  createStudentSchema,
};
