'use strict';
module.exports = function(sequelize, DataTypes) {
  var buoydata = sequelize.define('buoydata', {
    BUOYID: DataTypes.INTEGER,
    YY: DataTypes.NUMERIC,
    MM: DataTypes.NUMERIC,
    DD: DataTypes.NUMERIC,
    hh: DataTypes.NUMERIC,
    month: DataTypes.NUMERIC,
    WDIR: DataTypes.NUMERIC,
    WSPD: DataTypes.NUMERIC,
    GST: DataTypes.NUMERIC,
    WVHT: DataTypes.NUMERIC,
    DPD: DataTypes.NUMERIC,
    APD: DataTypes.NUMERIC,
    MWD: DataTypes.NUMERIC,
    PRES: DataTypes.NUMERIC,
    ATMP: DataTypes.NUMERIC,
    WTMP: DataTypes.NUMERIC,
    DEWP: DataTypes.NUMERIC,
    VIS: DataTypes.NUMERIC,
    TIDE: DataTypes.NUMERIC
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return buoydata;
};
