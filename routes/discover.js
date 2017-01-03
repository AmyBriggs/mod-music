var express = require('express');
var router = express.Router();
var knex = require('../knex')

router.post('/', function(req, res, next){
 knex('users')
  .then((users) => {
    var userArr = users;
    knex('projects')
      .then((projects) => {
        var classical = [], alternative = [], electronic = [], rnb = [], pop = [], rock = [];
        for(var i = 0; i < projects.length; i++){
          if(projects[i].genre == "Classical"){
            classical.push(projects[i]);
          }
          if(projects[i].genre == "Electronic"){
            electronic.push(projects[i])
          }
          if(projects[i].genre == "R&B"){
            rnb.push(projects[i]);
          }
          if(projects[i].genre == "Alternative"){
            alternative.push(projects[i])
          }
          if(projects[i].genre == "Pop"){
            pop.push(projects[i]);
          }
          if(projects[i].genre == "Rock"){
            rock.push(projects[i])
          }
        }
        var resObj = {
          users: userArr,
          classical: classical,
          alternative: alternative,
          electronic: electronic,
          rnb: rnb,
          pop: pop,
          rock: rock
        }
        res.send(resObj);
      })
  })
})

module.exports = router;
