var User = require('../../models').User;

module.exports = async function cleanup() {
  await User.destroy({ where: {} })
}
