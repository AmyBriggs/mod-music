var express = require('express');
var router = express.Router();
var knex = require('../knex')

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  knex('users')
  .where('username', req.params.username)
  console.log(req.body.username);
  res.send('Welcome to profile');
});

module.exports = router;
