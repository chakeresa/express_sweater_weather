'use strict';
module.exports = (sequelize, DataTypes) => {
  const FavoriteLocation = sequelize.define('FavoriteLocation', {
    name: DataTypes.STRING
  }, {});
  FavoriteLocation.associate = function(models) {
    FavoriteLocation.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'user'
    })
  };
  return FavoriteLocation;
};