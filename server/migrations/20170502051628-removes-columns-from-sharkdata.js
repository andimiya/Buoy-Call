'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'sharkdata', 'createdAt',
      'sharkdata', 'updatedAt');
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'sharkdata', 'createdAt',
      'sharkdata', 'updatedAt',
      Sequelize.string
    );
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
