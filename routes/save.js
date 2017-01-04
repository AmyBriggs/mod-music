var express = require('express')
var router = express.Router()
var knex = require('../knex')

router.post('/', function(req, res, next){
  var id = req.body.id;
  var projTitle = req.body.projTitle;
  knex('projects')
    .where({
      user_id: id,
      title: projTitle
    })
    .then((project) => {
      if(project.length == 0){
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
        }).then((project2) => {
          console.log(project2);
        })
      } else{
        knex('projects')
          .where('title', req.body.projTitle)
          .returning('*')
          .update({
            build: req.body.build,
            desc: req.body.desc,
            genre: req.body.genre
          }).then((project1) => {
          })
      }
    })

})


module.exports = router;
