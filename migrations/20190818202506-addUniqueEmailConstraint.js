'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Users', ['email'], {
      type: 'unique',
      name: 'userUniqueEmail'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Users', 'userUniqueEmail')
  }
};
