module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('Offer', {
    swapid: DataTypes.INTEGER,
    uid: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    description: DataTypes.TEXT,
  });

  Offer.associate = (models) => {
    Offer.belongsTo(models.Swap, { foreignKey: 'swapid' });
  };

  Offer.associate = (models) => {
    Offer.belongsTo(models.User, { foreignKey: 'uid', as: 'user' });
  };

  return Offer;
};
