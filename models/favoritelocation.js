'use strict';
module.exports = (sequelize, DataTypes) => {
  const FavoriteLocation = sequelize.define('FavoriteLocation', {
    name: DataTypes.STRING
  }, {});
  FavoriteLocation.associate = function(models) {
    // associations can be defined here
  };
  return FavoriteLocation;
};