var express = require('express');
var router = express.Router();
var knex = require('../knex')

/* GET users listing. */
// router.get('/profile', function(req, res, next) {
//   knex('users')
//   .then(function(users){
//     res.json(users)
//   })
// });

//
// router.get('/', function(req, res, next){
//   knex('users')
//   .where('users.id')
//   .join('projects', 'users.id', 'projects.user_id')
//   .select('users.id', 'users.username', 'users.views', 'users.desc', 'users.img', 'projects.build', 'projects.views', 'projects.title',
//   'projects.desc', 'projects.genre', 'projects.votes', 'projects.created_at', 'projects.updated_at')
//   .then(function(user){
//     res.json(user)
//   })
//
//
// router.get('/', function(req, res, next){
//  knex('users')
//  .where('users.id', req.body.id)
//  .join('projects', 'users.id', 'projects.user_id')
//  .select('users.id', 'users.username', 'users.views', 'users.desc', 'users.img', 'projects.build', 'projects.views', 'projects.title',
//  'projects.desc', 'projects.genre', 'projects.votes', 'projects.created_at', 'projects.updated_at')
//  .then(function(user){
//    res.json(user)
//  })
// })

// router.get('/', function(req, res, next){
//  knex('users')
//  .join('projects', 'users.id', 'projects.user_id')
//  .select('users.id', 'users.username', 'users.views', 'users.desc', 'users.img', 'projects.build', 'projects.views', 'projects.title',
//  'projects.desc', 'projects.genre', 'projects.votes', 'projects.created_at', 'projects.updated_at')
//  .then(function(user){
//    console.log(user);
//  })
// })

// router.get('/', function(req, res, next){
//  knex('users')
//  .join('projects', 'users.id', 'projects.user_id')
//  .select('projects.user_id as user_id', 'users.username', 'users.views', 'users.desc', 'users.img', 'projects.id as project_id', 'projects.build', 'projects.views', 'projects.title',
//  'projects.desc as project_desc', 'projects.genre', 'projects.votes', 'projects.created_at', 'projects.updated_at')
//  .then(function(user){
//    console.log(user);
//  })
// })

router.post('/', function(req, res, next){
 knex('users')
 .join('projects', 'users.id', 'projects.user_id')
 .select('projects.user_id as user_id', 'users.username', 'users.views', 'users.desc', 'users.img', 'projects.id as project_id', 'projects.build', 'projects.views', 'projects.title',
 'projects.desc as project_desc', 'projects.genre', 'projects.votes', 'projects.created_at', 'projects.updated_at')
 .then(function(user){
   console.log(req.body);
 })
})

module.exports = router;
