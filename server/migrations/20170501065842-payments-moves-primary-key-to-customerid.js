'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('payments', 'user_id', {
      type: Sequelize.DataTypes.INTEGER,
      references: 'Users',
      key: 'id',
      onDelete: 'restrict'
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('payments', 'user_id');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
