'use strict';

var models = require('../models');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return models.Words.bulkCreate([
      {word: 'Amorphous', definition: 'indefinite, shapeless', type: 'adjective', likes: 4},
      {word: 'Beguile', definition: 'deceive', type: 'verb', likes: 14},
      {word: 'Caprice', defintion: 'impulse', type: 'noun', likes: 8},
      {word: 'Cascade', defintion: 'steep waterfall', type: 'noun', likes: 14},
      {word: 'Cashmere', defintion: 'fine delicate wool', type: 'noun', likes: 14},
      {word: 'Chrysalis', defintion: 'protective covering', type: 'noun', likes: 4},
      {word: 'Cinnamon', defintion: 'an aromatic spice', type: 'noun', likes: 1},
      {word: 'Coalesce', defintion: 'unite or fuse', type: 'verb', likes: 10},
      {word: 'Crepuscular', defintion: 'dim or twilit', type: 'adjective', likes: 5},
      {word: 'Crystalline', defintion: 'clear or sparkling', type: 'adjective', likes: 20}
    ])
  },

  down: function (queryInterface, Sequelize) {
    return models.Words.destroy({where:
        {
          word: [
          'Amorphous',
          'Beguile',
          'Caprice',
          'Cascade',
          'Cashmere',
          'Chrysalis',
          'Cinnamon',
          'Coalesce',
          'Crepuscular',
          'Crystalline'
        ]
      }
    })
  }
};
