var express = require('express');
var router = express.Router();
var knex = require('../knex')


router.post('/', function(req, res, next){
 knex('users')
 .where('users.id', req.body.user_id)
 .join('projects', 'users.id', 'projects.user_id')
 .select('projects.user_id as user_id', 'users.username', 'users.views', 'users.desc', 'users.img', 'projects.id as project_id', 'projects.build', 'projects.views', 'projects.title',
 'projects.desc as project_desc', 'projects.genre', 'projects.votes', 'projects.created_at', 'projects.updated_at')
 .then(function(user){
   let resObj = {};
   let build = [];
   for(var i = 0; i < user.length; i++){
     if(user[i].project_id == req.body.proj_id){
       resObj.build = user[i].build;
       resObj.title = user[i].title;
       resObj.username = user[i].username;
       resObj.genre = user[i].genre;
       resObj.desc = user[i].project_desc;
     }
   }
   console.log(resObj);
   res.json(resObj);
 })
})

module.exports = router;
