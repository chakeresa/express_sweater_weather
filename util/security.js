const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.hashedPassword = function(rawPassword) {
  return bcrypt.hashSync(rawPassword, saltRounds);
}

module.exports.randomString = function() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
