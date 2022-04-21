var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send('message')
  res.render('index', { title: 'Express' });
});

router.get('/user2', function(req, res, next) {
  res.send('message')
});
module.exports = router;
