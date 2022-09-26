var express = require('express');
var router = express.Router();
let query = require('../db/index')
let reqData = require('../dataBase/response')
const {
  getArticle
} = require('../func/article');
const res = require('express/lib/response');

router.post('/save', function (req, res, next) {

  let options = Object.values(req.body)
  let addSql = 'INSERT INTO article(md_url,category,create_at,updata_at,article_view) VALUES(?,?,?,?,?)';
  let addSqlParams = options;

  query(addSql, addSqlParams, function (err, result) {
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
router.post('/list', function (req, res) {
  let options = Object.values(req.body)
  let totalsql = 'SELECT COUNT(id) FROM article'
  let getsql = 'SELECT * FROM article where id > ? order by id  limit 10 ';
  query(totalsql, [], function (err, result) {
    if (err) {
      res.send(reqData(500, err));
      return;
    }
    query(getsql, [(options[0] - 1) * 10], function (err2, result2) {
      if (err2) {
        console.log('[SELECT ERROR] - ', err2.message);
        res.send(reqData(500, err2));

        return;
      }
      let data = reqData(200, result2)
      data.page = options[0]
      data.total = Math.ceil(result[0]['COUNT(id)'] / 10)
      res.send(data);

    })
  })

})

module.exports = router;