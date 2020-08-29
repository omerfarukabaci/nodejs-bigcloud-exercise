const Joi = require('@hapi/joi');

module.exports = {
  validateLog: (input) => {
    const objSchema = Joi.object().keys({
      type: Joi.string().required(),
      app_id: Joi.string().required(),
      session_id: Joi.string().required(),
      event_name: Joi.string().required(),
      event_time: Joi.date().timestamp().required(),
      page: Joi.string().required(),
      country: Joi.string().required(),
      region: Joi.string().required(),
      city: Joi.string().required(),
      user_id: Joi.string().required()
    })
    const arraySchema = Joi.array().items(objSchema).required();

    const schema = Joi.alternatives().try(objSchema, arraySchema)

    return schema.validate(input)
  },
}