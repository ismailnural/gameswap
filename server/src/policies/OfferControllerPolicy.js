const Joi = require('joi');

module.exports = {
  add(req, res, next) {
    const schema = Joi.object({
      description: Joi.string().min(20)
        .required(),
      swapid: Joi.number().positive().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).send(error.details);
    } else {
      next();
    }
  },
};
