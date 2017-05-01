'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerid: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      lastFourDigits: {
        type: Sequelize.INTEGER
      },
      cardType: {
        type: Sequelize.STRING
      },
      origin: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('payments');
  }
};