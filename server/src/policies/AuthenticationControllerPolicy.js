const Joi = require('joi');

module.exports = {
  register(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8)
        .max(32)
        .required(),
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      phone: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).send(error.details);
    } else {
      next();
    }
  },
};
