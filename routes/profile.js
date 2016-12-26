var express = require('express');
var router = express.Router();
var knex = require('../knex')

/* GET users listing. */
router.get('/', function(req, res, next) {
  knex('users')
  .then(function(data){
    res.json(data)
    console.log('users', users);
  })
});

router.get('/:id', function(req, res, next) {
  knex('users')
  .where('id', req.params.id)
  .first()
  .then(function(data){
    res.json(data)
  })
});

module.exports = router;
