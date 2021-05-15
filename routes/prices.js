var express = require('express');
var router = express.Router();
var data = require('../data.js')

/* show prices */
router.get('/', function(req, res, next) {
  // res.send('list prices');  
  res.render('prices', data);
});

module.exports = router;
