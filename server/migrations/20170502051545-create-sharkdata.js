'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('sharkdata', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shark_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      tagIdNumber: {
        type: Sequelize.INTEGER
      },
      species: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      stageOfLife: {
        type: Sequelize.STRING
      },
      length: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      tagDate: {
        type: Sequelize.STRING
      },
      tagLocation: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.INTEGER
      },
      tagid: {
        type: Sequelize.INTEGER
      },
      datetime: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
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
    return queryInterface.dropTable('sharkdata');
  }
};