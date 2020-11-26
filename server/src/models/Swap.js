module.exports = (sequelize, DataTypes) => {
  const Swap = sequelize.define('Swap', {
    uid: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    coverUrl: DataTypes.STRING,
    platform: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
  });

  Swap.associate = (models) => {
    Swap.belongsTo(models.User, { foreignKey: 'uid', as: 'user' });
    Swap.hasMany(models.Offer, { foreignKey: 'uid', as: 'offers' });
  };

  return Swap;
};
