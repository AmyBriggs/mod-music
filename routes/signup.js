var express = require('express')
var router = express.Router()
var knex = require('../knex')
var bcrypt = require('bcrypt')

router.post ('/', function(req, res, next) {
  knex('users')
    .where('username', req.body.username)
    .then(function(user){
      if(user.length === 0) {
        let hashed_password = bcrypt.hashSync(req.body.password, 12)

        let newUser = {
          username: req.body.username,
          hashed_pass: hashed_password
        }

        knex('users')
          .insert(newUser, '*')
          .then(function(user) {
            res.json(user)
          })
      } else {
        let error = ['That username is already taken.']
        res.json(error)
      }
    })
})


module.exports = router
