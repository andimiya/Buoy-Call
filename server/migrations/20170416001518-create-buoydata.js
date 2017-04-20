'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('buoydata', {
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
        type: Sequelize.NUMERIC
      },
      MM: {
        type: Sequelize.NUMERIC
      },
      DD: {
        type: Sequelize.NUMERIC
      },
      hh: {
        type: Sequelize.NUMERIC
      },
      month: {
        type: Sequelize.NUMERIC
      },
      WDIR: {
        type: Sequelize.NUMERIC
      },
      WSPD: {
        type: Sequelize.NUMERIC
      },
      GST: {
        type: Sequelize.NUMERIC
      },
      WVHT: {
        type: Sequelize.NUMERIC
      },
      DPD: {
        type: Sequelize.NUMERIC
      },
      APD: {
        type: Sequelize.NUMERIC
      },
      MWD: {
        type: Sequelize.NUMERIC
      },
      PRES: {
        type: Sequelize.NUMERIC
      },
      ATMP: {
        type: Sequelize.NUMERIC
      },
      WTMP: {
        type: Sequelize.NUMERIC
      },
      DEWP: {
        type: Sequelize.NUMERIC
      },
      VIS: {
        type: Sequelize.NUMERIC
      },
      TIDE: {
        type: Sequelize.NUMERIC
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
    return queryInterface.dropTable('buoydata');
  }
};
