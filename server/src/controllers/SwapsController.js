const Sequelize = require('sequelize');
const { Swap, User } = require('../models');

const paginate = (query) => {
  const { page, limit } = query;
  const offset = (page * limit) - limit;

  return {
    ...query,
    offset,
    limit,
  };
};

module.exports = {
  async index(req, res) {
    try {
      const { or, like } = Sequelize.Op;
      const {
        search, limit = 10, page = 1, order,
      } = req.query;

      const where = {
        [or]: [
          'title', 'description',
        ].map((key) => ({
          [key]: {
            [like]: `%${search}%`,
          },
        })),
      };

      const swaps = await Swap.findAndCountAll(paginate({
        where: search ? where : null,
        include: {
          model: User,
          as: 'user',
        },
        order: order || [
          ['id', 'DESC'],
        ],
        page,
        limit,
      }));

      const totalItems = swaps.count;
      const lastPage = Math.ceil(totalItems / limit);
      const currentPage = Number(page);

      const pagination = {
        lastPage,
        currentPage,
        prevPage: currentPage <= 1 ? null : currentPage - 1,
        nextPage: currentPage >= lastPage ? null : currentPage + 1,
        totalItems,
        perPage: limit,
      };

      res.send({ data: swaps.rows, pagination });
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
