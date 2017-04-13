'use strict';
module.exports = function(sequelize, DataTypes) {
  var namelatlong = sequelize.define('namelatlong', {
    buoyid: DataTypes.INTEGER,
    latitude: DataTypes.INTEGER,
    longitude: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return namelatlong;
};