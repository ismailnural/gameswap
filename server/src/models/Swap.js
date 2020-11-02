module.exports = (sequelize, DataTypes) => {
  const Swap = sequelize.define('Swap', {
    uid: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    coverUrl: DataTypes.STRING,
    platform: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
  });

  return Swap;
};
