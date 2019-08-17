var User = require('../../models').User;
var FavoriteLocation = require('../../models').FavoriteLocation;

module.exports = async function cleanup() {
  await User.destroy({ where: {} })
  await FavoriteLocation.destroy({ where: {} })
}
