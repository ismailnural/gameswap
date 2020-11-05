const Joi = require('joi');

module.exports = {
  add(req, res, next) {
    const schema = Joi.object({
      title: Joi.string().min(3)
        .required(),
      description: Joi.string().min(120)
        .required(),
      coverUrl: Joi.string().uri(),
      platform: Joi.number().positive().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).send(error.details);
    } else {
      next();
    }
  },
};
