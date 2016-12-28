var express = require('express')
var router = express.Router()
var knex = require('../knex')

router.post('/', function(req, res, next){
  knex('projects')
    .returning('*')
    .insert({
      user_id: req.body.id,
      build: req.body.build,
      views: 0,
      title: req.body.projTitle,
      desc: req.body.desc,
      genre: req.body.genre,
      votes: 0
    }).then(project => {
      console.log(project);
    })
})


module.exports = router;
