'use strict';
module.exports = function(sequelize, DataTypes) {
  var coordinates = sequelize.define('coordinates', {
    buoyid: DataTypes.INTEGER,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return coordinates;
};