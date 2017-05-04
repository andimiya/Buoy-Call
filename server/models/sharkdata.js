'use strict';
module.exports = function(sequelize, DataTypes) {
  var sharkdata = sequelize.define('sharkdata', {
    shark_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    tagIdNumber: DataTypes.INTEGER,
    species: DataTypes.STRING,
    gender: DataTypes.STRING,
    stageOfLife: DataTypes.STRING,
    length: DataTypes.STRING,
    weight: DataTypes.STRING,
    tagDate: DataTypes.STRING,
    tagLocation: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.INTEGER,
    tagid: DataTypes.INTEGER,
    datetime: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return sharkdata;
};