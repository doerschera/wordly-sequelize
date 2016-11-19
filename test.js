var sequelize = require('sequelize');
var models = require('./models');

models.findAll()
  .then(function(result) {
    console.log(result);
  })
