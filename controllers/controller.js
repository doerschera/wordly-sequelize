var express = require('express');
var router = express.Router();
var models = require('../models');

models.sequelize.sync();

var sidebar = {
  add: false,
  favorties: false
}
var currentData;
var edit;
var message;

router.get('/', function(req, res) {
  models.Words.findAll({})
    .then(function(result) {
      var randomOrder = [];
        randomize(result);
        function randomize(array) {
          var index = Math.floor(Math.random()*array.length);
          randomOrder.push(array[index]);
          result.splice(index, 1);
          if((array.length-1) > 0) {
            randomize(array);
          }
        }
        var data = {words: randomOrder}
        res.render('index', data);
    })
})

router.post('/', function(req, res) {
  var data = req.body
  console.log(data);
  if(data.type == 'validate') {
    models.Words.findOne({
      where: {
        word: data.word
      }
    }).then(function(result) {
      if(result) {
        res.send(false);
      } else {
        res.send(true);
      }
    })
  } else if(data.type == 'add') {
    models.Words.create({
      word: data.word,
      definition: data.definition,
      type: data.wordType,
      likes: 0
    }).then(function() {
      models.Words.findOne({
        where: {
          word: data.word
        }
      }).then(function(result) {
        res.send(result);
      })
    })
  } else if(data.type == 'like') {
    models.Words.findOne({where: {
      id: data.id
    }}).then(function(result) {
      result.increment('likes');
    }).then(function() {
      models.Words.findOne({where: {
        id: data.id
      }}).then(function(result) {
        res.send(result);
      })
    })
  } else if(data.type = 'favorites') {
    console.log(data);
    var favorites = data['favorites[]'];

    models.Words.findAll({
      where: models.sequelize.or(
        {id: favorites}
      )
    }).then(function(result) {
      res.send(result);
    })
  }
})

router.post('/edit', function (req, res) {
  var id = req.body.id;
  models.Words.findOne({
    where: {
      id: id
    }
  }).then(function(result) {
    edit = result;
    res.send(true);
  })
})

router.get('/edit', function(req, res) {
  console.log(edit);
  res.render('edit', edit.dataValues);
})

router.post('/filter', function(req, res) {
  var wordType = req.body.filter;

  if(typeof wordType != 'string') {
    filter(wordType)
  } else {
    var singleFilter = [];
    singleFilter.push(wordType);
    filter(singleFilter);
  }

  function filter(data) {
    models.Words.findAll({
      where: models.sequelize.or(
        {type: data}
      )
    }).then(function(result) {
      var randomOrder = [];
        randomize(result);
        function randomize(array) {
          var index = Math.floor(Math.random()*array.length);
          randomOrder.push(array[index]);
          result.splice(index, 1);
          if((array.length-1) > 0) {
            randomize(array);
          }
        }
        var data = {words: randomOrder}
        res.render('index', data);
    })
  }
})

router.put('/edit/update/:id', function(req, res) {
  var id = req.params.id;
  var data = {
    word: req.body.edit[0],
    definition: req.body.edit[1],
    type: req.body.edit[2]
  };
  console.log(id, data);
  message = {word: data.word, action: 'updated'}

  models.Words.update(
    {
      word: req.body.edit[0],
      definition: req.body.edit[1],
      type: req.body.edit[2]
    },
    {
      where: {
        id: id
      }
    }
  ).then(function() {
    res.render('message', message)
  })
})

router.delete('/edit/delete/:id', function(req, res) {
  var id = req.params.id;
  message = {
    word: req.body.delete,
    action: 'deleted'
  }

  models.Words.destroy({
    where: {
      id: id
    }
  }).then(function() {
    res.redirect('/message')
  })
})

router.get('/message', function(req, res) {
  console.log(message);
  res.render('message', message);
})


module.exports = router;
