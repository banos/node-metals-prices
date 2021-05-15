var express = require('express');
var router = express.Router();
var data = require('../data.js');

router.get('/', function(req, res, next) {
  clearInterval(data['intervalID']);
  delete data['intervalID'];
  res.send('stop fetching prices');
});

module.exports = router;
