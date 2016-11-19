'use strict';

var models = require('../models');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return models.Words.bulkCreate([
      {word: 'Amorphous', definition: 'indefinite, shapeless', type: 'adjective', likes: 4},
      {word: 'Beguile', definition: 'deceive', type: 'verb', likes: 14},
      {word: 'Caprice', definition: 'impulse', type: 'noun', likes: 8},
      {word: 'Cascade', definition: 'steep waterfall', type: 'noun', likes: 14},
      {word: 'Cashmere', definition: 'fine delicate wool', type: 'noun', likes: 14},
      {word: 'Chrysalis', definition: 'protective covering', type: 'noun', likes: 4},
      {word: 'Cinnamon', definition: 'an aromatic spice', type: 'noun', likes: 1},
      {word: 'Coalesce', definition: 'unite or fuse', type: 'verb', likes: 10},
      {word: 'Crepuscular', definition: 'dim or twilit', type: 'adjective', likes: 5},
      {word: 'Crystalline', definition: 'clear or sparkling', type: 'adjective', likes: 20}
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
