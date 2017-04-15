'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'coordinates', 'id',
      'coordinates', 'createdAt',
      'coordinates', 'updatedAt');
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'coordinates', 'id',
      Sequelize.INTEGER
    );
    queryInterface.addColumn(
      'coordinates', 'createdAt',
      'coordinates', 'updatedAt',
      Sequelize.DECIMAL
    );
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
