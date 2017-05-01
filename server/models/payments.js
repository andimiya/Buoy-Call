'use strict';
module.exports = function(sequelize, DataTypes) {
  var payments = sequelize.define('payments', {
    customerid: DataTypes.STRING,
    email: DataTypes.STRING,
    lastFourDigits: DataTypes.INTEGER,
    cardType: DataTypes.STRING,
    origin: DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return payments;
};