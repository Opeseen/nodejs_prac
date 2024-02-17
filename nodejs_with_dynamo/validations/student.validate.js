const joi = require('joi');

const createRecordSchema = {
  body: joi.object().keys({
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    email: joi.string().email().required().messages({"string.email":"This field is compulsory"}),
    subject: joi.string(),
    grade: joi.string().valid('A','B','C','D').messages({'any.only':"Invalid Grade Score Entered - Only [A, B, C, D] are allowed"})
  }),
};

const updateRecordSchema = {
  body: joi.object().keys({
    firstname: joi.string(),
    lastname: joi.string(),
    grade: joi.string().valid('A','B','C','D').messages({'any.only':"Invalid Grade Score Entered - Only [A, B, C, D] are allowed"}),
    subject: joi.string()
  }),

  params: joi.object().keys({
    email: joi.string().email().message({"string.email":"Invalid email provided"})
  }),
};

const deleteRecordSchema = {
  params: joi.object().keys({
    email: joi.string().email().message({"string.email":"Invalid email provided"})
  }),
}

module.exports = {
  createRecordSchema,
  updateRecordSchema,
  deleteRecordSchema
};
