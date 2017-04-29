'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('aggregatetodays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BUOYID: {
        type: Sequelize.INTEGER
      },
      YY: {
        type: Sequelize.FLOAT
      },
      MM: {
        type: Sequelize.FLOAT
      },
      DD: {
        type: Sequelize.FLOAT
      },
      WDIR: {
        type: Sequelize.FLOAT
      },
      WSPD: {
        type: Sequelize.FLOAT
      },
      GST: {
        type: Sequelize.FLOAT
      },
      WVHT: {
        type: Sequelize.FLOAT
      },
      DPD: {
        type: Sequelize.FLOAT
      },
      APD: {
        type: Sequelize.FLOAT
      },
      MWD: {
        type: Sequelize.FLOAT
      },
      PRES: {
        type: Sequelize.FLOAT
      },
      ATMP: {
        type: Sequelize.FLOAT
      },
      WTMP: {
        type: Sequelize.FLOAT
      },
      DEWP: {
        type: Sequelize.FLOAT
      },
      VIS: {
        type: Sequelize.FLOAT
      },
      TIDE: {
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('aggregatetodays');
  }
};