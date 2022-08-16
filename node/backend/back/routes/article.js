var express = require('express');
var router = express.Router();
let connection = require('../db/index')
let reqData = require('../dataBase/response')
const {
  getArticle
} = require('../func/article');
const res = require('express/lib/response');

router.post('/save', function (req, res, next) {

  let options = Object.values(req.body)
  var addSql = 'INSERT INTO article(md_url,category,create_at,updata_at,article_view) VALUES(?,?,?,?,?)';
  var addSqlParams = options;

  connection.query(addSql, addSqlParams, function (err, result) {
    if (err) {
      res.send('respond with a resource');
      return;
    }
    res.send(reqData(200, ['aaa']));
  });
});

router.get('/detail', function (req, res) {
  let data = getArticle()
  data.then((result) => {
    res.send(reqData(200, result.data));
  }).catch((err) => {
    res.send(reqData(500, err));
  })
})
module.exports = router;