var express = require('express');
var router = express.Router();
var knex = require('../knex')


router.post('/', function(req, res, next){
 knex('users')
 .where('users.id', req.body.id)
 .join('projects', 'users.id', 'projects.user_id')
 .select('projects.user_id as user_id', 'users.username', 'users.views', 'users.desc', 'users.img', 'projects.id as project_id', 'projects.build', 'projects.views', 'projects.title',
 'projects.desc as project_desc', 'projects.genre', 'projects.votes', 'projects.created_at', 'projects.updated_at')
 .then(function(user){
   res.send(user);
 })
})

module.exports = router;
