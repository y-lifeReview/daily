var express = require('express');
var router = express.Router();
let connection = require('../db/index')
/* GET users listing. */
// 注册
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

// 登录
router.post('/login', function (req, res, next) {
  var Sql = 'SELECT * FROM user WHERE nickname = ?';
  var SqlParams = [req.body.name];
  connection.query(Sql, SqlParams, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      res.send('respond with a resource');
      return;
    }
    console.log(result)
    res.send(result);
  });
  connection.end();
});

module.exports = router;