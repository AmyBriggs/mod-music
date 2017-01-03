var express = require('express');
var router = express.Router();
var knex = require('../knex')

router.get('/', function(req, res, next){
 knex('users')
  .then((users) => {
    var userArr = users;
    knex('projects')
      .then((projects) => {
        var classical = [];
        var alternative = [];
        for(var i = 0; i < projects.length; i++){
          if(projects[i].genre == "Classical"){

          }
        }
      })
  })
})

module.exports = router;
