var express = require('express');
var router = express.Router();
let connection = require('../db/index')
/* GET users listing. */
router.get('/register', function (req, res, next) {
  var addSql = 'INSERT INTO user(nickname) VALUES(?)';
  var addSqlParams = ['ycc1'];
  connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
      console.log('[INSERT ERROR] - ', err.message);
      res.send('respond with a resource');
      return;
    }
    res.send('respond with a resource');
  });
  connection.end();
});

module.exports = router;