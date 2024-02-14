const joi = require('joi');

const requestBodySchema = {
  body: joi.object().keys({
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    email: joi.string().email().required().messages({"string.email":"This field is compulsory"}),
    grade: joi.string().valid('A', 'B', 'C').messages({'any.only':"Invalid Grade Score Entered"})
  }),
};

module.exports = {
  requestBodySchema,
};
