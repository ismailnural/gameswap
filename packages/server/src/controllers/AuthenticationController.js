const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/config');

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;

  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      const userJson = user.toJSON();
      res.send({
        user: userJson,
        token: jwtSignUser(userJson),
      });
    } catch (err) {
      res.status(400).send(
        err.errors,
      );
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(403).send({
          error: 'Kullanıcı bulunamadı.',
        });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Giriş bilgileri hatalı.',
        });
      }

      const userJson = user.toJSON();

      return res.send({
        user: userJson,
        token: jwtSignUser(userJson),
      });
    } catch (err) {
      return res.status(500).send({
        error: 'Giriş yapmaya çalışırken bir hata oluştu.',
      });
    }
  },
};
