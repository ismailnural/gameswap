const { User } = require('../models');

module.exports = {
  async show(req, res) {
    try {
      const profile = await User.scope(['defaultScope', 'activeTradeScope']).findByPk(req.params.userId, {});
      res.send(profile);
    } catch (err) {
      res.status(500).send({
        error: 'Kullanıcı getirilirken bir hata oluştu',
      });
    }
  },

};
