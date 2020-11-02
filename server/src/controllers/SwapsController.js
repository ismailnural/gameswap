const { Swap } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      let swaps = null;
      const { search } = req.query;
      if (search) {
        swaps = await Swap.findAll({
          where: {
            $or: [
              'title', 'description',
            ].map((key) => ({
              [key]: {
                $like: `%${search}%`,
              },
            })),
          },
        });
      } else {
        swaps = await Swap.findAll({
          limit: 10,
        });
      }
      res.send(swaps);
    } catch (err) {
      res.status(500).send({
        error: 'Takaslar getirilirken bir hata oluştu',
      });
    }
  },
  async show(req, res) {
    try {
      const swap = await Swap.findById(req.params.swapId);
      res.send(swap);
    } catch (err) {
      res.status(500).send({
        error: 'Takas getirilirken bir hata oluştu',
      });
    }
  },
  async post(req, res) {
    try {
      const swap = await Swap.create(req.body);
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
