const { Swap, User } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const { search } = req.query;
      const where = {
        $or: [
          'title', 'description',
        ].map((key) => ({
          [key]: {
            $like: `%${search}%`,
          },
        })),
      };

      const swaps = await Swap.findAll({
        limit: 10,
        where: search ? where : null,
        order: [
          ['id', 'DESC'],
        ],
        include: {
          model: User,
          as: 'user',
        },
      });

      res.send(swaps);
    } catch (err) {
      res.status(500).send({
        error: 'Takaslar getirilirken bir hata oluştu',
      });
    }
  },
  async show(req, res) {
    try {
      const swap = await Swap.findByPk(req.params.swapId, {
        include: {
          model: User,
          as: 'user',
        },
      });
      res.send(swap);
    } catch (err) {
      res.status(500).send({
        error: 'Takas getirilirken bir hata oluştu',
      });
    }
  },
  async post(req, res) {
    try {
      const uid = req.user.id;
      const swap = await Swap.create({
        uid,
        status: 1,
        ...req.body,
      });
      res.send(swap);
    } catch (err) {
      res.status(500).send({
        error: 'Takas oluşturulurken bir hata oluştu',
      });
    }
  },
  async put(req, res) {
    try {
      await Swap.update(req.body, {
        where: {
          id: req.params.swapId,
        },
      });
      res.send(req.body);
    } catch (err) {
      res.status(500).send({
        error: 'Takas güncellenirken bir hata oluştu',
      });
    }
  },
};
