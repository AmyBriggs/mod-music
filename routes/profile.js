var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/profile', function(req, res, next) {
  res.send('Welcome to profile');
});

module.exports = router;
