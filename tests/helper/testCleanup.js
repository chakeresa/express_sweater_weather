var User = require('../../models').User;
var FavoriteLocation = require('../../models').FavoriteLocation;

module.exports = async function cleanup() {
  return User.destroy({ where: {} })
    .then(user => {
      FavoriteLocation.destroy({ where: {} })
    })
}
