const { User, Offer } = require('../models');

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
  async show(req, res) {
    try {
      const {
        limit = 10, page = 1, orderBy, orderType, statusType,
      } = req.query;
      const offers = await Offer.findAndCountAll(paginate({
        where: [
          {
            swapid: req.params.offerId,
            status: statusType || 1,
          },
        ],
        include: {
          model: User,
          as: 'user',
        },
        order: [
          [orderBy || 'id', orderType || 'DESC'],
        ],
        page,
        limit,
      }));

      const totalItems = offers.count;
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

      res.send({ data: offers.rows, pagination });
    } catch (err) {
      res.status(500).send({
        error: 'Teklifler getirilirken bir hata oluştu',
      });
    }
  },
  async add(req, res) {
    try {
      const uid = req.user.id;
      const offer = await Offer.create({
        uid,
        status: 1,
        ...req.body,
      });
      res.send(offer);
    } catch (err) {
      res.status(500).send({
        error: 'Teklif oluşturulurken bir hata oluştu',
      });
    }
  },
};
