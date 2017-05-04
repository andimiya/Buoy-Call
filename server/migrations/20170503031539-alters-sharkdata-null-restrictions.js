'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return
    queryInterface.changeColumn('sharkdata', 'description', {
      type: Sequelize.TEXT
    }),
    queryInterface.changeColumn('sharkdata', 'createdAt', {
      allowNull: true
    }),
    queryInterface.changeColumn('sharkdata', 'updatedAt', {
      allowNull: true
    })
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    return
    queryInterface.changeColumn('sharkdata', 'description', {
      type: Sequelize.STRING
    }),
    queryInterface.changeColumn('sharkdata', 'createdAt', {
      allowNull: false
    }),
    queryInterface.changeColumn('sharkdata', 'updatedAt', {
      allowNull: false
    })
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
