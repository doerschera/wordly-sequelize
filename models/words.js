"use strict"

module.exports = function(sequelize, DataTypes) {
  var Words = sequelize.define('Words', {
    word: DataTypes.STRING,
    definition: DataTypes.STRING,
    type:  DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    freezeTableName: true
  });

  return Words;
}
