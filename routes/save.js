var express = require('express')
var router = express.Router()
var knex = require('../knex')

router.post('/', function(req, res, next){
  knex('projects')
    .where('title', req.body.projTitle)
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
        })
      } else{
        knex('projects')
          .where('title', req.body.projTitle)
          .update({
            build: req.body.build,
            desc: req.body.desc,
            genre: req.body.genre
          })
      }
    })

})


module.exports = router;
