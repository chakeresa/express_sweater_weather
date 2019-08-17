'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    passwordDigest: DataTypes.STRING,
    apiKey: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.FavoriteLocation, {
      as: 'favoriteLocations'
    })
  };
  return User;
};
