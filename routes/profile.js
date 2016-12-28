var express = require('express');
var router = express.Router();
var knex = require('../knex')

/* GET users listing. */
router.get('/profile', function(req, res, next) {
  knex('users')
  .then(function(users){
    res.json(users)
  })
});


router.get('/profile', function(req, res, next){
  knex('users')
  .where('users.id', req.params.id)
  .join('projects', 'users.id', 'projects.user_id')
  .select('users.id', 'users.username', 'users.views', 'users.desc', 'users.img', 'projects.build', 'projects.views', 'projects.title',
  'projects.desc', 'projects.genre', 'projects.votes', 'projects.created_at', 'projects.updated_at')
  .then(function(user){
    res.json(user)
  })
})

module.exports = router;
