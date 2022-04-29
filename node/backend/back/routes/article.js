var express = require('express');
var router = express.Router();
let connection = require('../db/index')
let reqData = require('../dataBase/response')

router.post('/save', function (req, res, next) {
  // res.send('message')
  // console.log('请求参数:', req.body)
  let options = Object.values(req.body)
  var addSql = 'INSERT INTO article(md_url,category,create_at,updata_at,article_view) VALUES(?,?,?,?,?)';
  var addSqlParams = options;
  // console.log(addSqlParams)
  connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
      // console.log('[INSERT ERROR] - ', err.message);
      res.send('respond with a resource');
      return;
    }
    res.send(reqData(200,['aaa']));
  });
});
module.exports = router;