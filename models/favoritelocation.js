'use strict';
module.exports = (sequelize, DataTypes) => {
  const FavoriteLocation = sequelize.define('FavoriteLocation', {
    location: DataTypes.STRING,
    UserId: DataTypes.BIGINT
  }, {});
  FavoriteLocation.associate = function(models) {
    // associations can be defined here
  };
  return FavoriteLocation;
};