"use strict"

mode.exports = function(sequelize, DataTypes) {
  var Words = sequelize.defined('Words', {
    word: DataTypes.STRING,
    definition: DataTypes.STRING,
    type:  DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    freezeTableName: true
  });

  return Words;
}
