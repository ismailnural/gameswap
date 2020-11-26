const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

function hashPassword(user) {
  const SALT_FACTOR = 8;

  if (!user.changed('password')) {
    return false;
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then((salt) => bcrypt.hashAsync(user.password, salt, null))
    .then((hash) => {
      user.setDataValue('password', hash);
    });
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    },
    defaultScope: {
      attributes: ['id', 'username', 'firstname', 'lastname'],
    },
    scopes: {
      activeTradeScope: {
        attributes: ['email', 'phone'],
      },
    },
  });

  User.prototype.comparePassword = () => (password) => bcrypt.compareAsync(password, this.password);

  User.associate = (models) => {
    User.hasMany(models.Swap, { foreignKey: 'uid', as: 'swaps' });
    User.hasMany(models.Offer, { foreignKey: 'uid', as: 'offers' });
  };

  return User;
};
