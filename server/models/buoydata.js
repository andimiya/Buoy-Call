'use strict';
module.exports = function(sequelize, DataTypes) {
  var buoydata = sequelize.define('buoydata', {
    BUOYID: DataTypes.INTEGER,
    YY: DataTypes.FLOAT,
    MM: DataTypes.FLOAT,
    DD: DataTypes.FLOAT,
    hh: DataTypes.FLOAT,
    month: DataTypes.FLOAT,
    WDIR: DataTypes.FLOAT,
    WSPD: DataTypes.FLOAT,
    GST: DataTypes.FLOAT,
    WVHT: DataTypes.FLOAT,
    DPD: DataTypes.FLOAT,
    APD: DataTypes.FLOAT,
    MWD: DataTypes.FLOAT,
    PRES: DataTypes.FLOAT,
    ATMP: DataTypes.FLOAT,
    WTMP: DataTypes.FLOAT,
    DEWP: DataTypes.FLOAT,
    VIS: DataTypes.FLOAT,
    TIDE: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return buoydata;
};