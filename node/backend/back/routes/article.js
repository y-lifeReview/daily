var express = require('express');
var router = express.Router();
let query = require('../db/index')
let reqData = require('../dataBase/response')
const service = require('../request/axios')
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
  let id = req.query.id
  let sql = 'select a.md_url,a.category,a.updata_at,a.article_view,a.title,a.user_id ,url ,nickname from article as a left join article_img as b on a.id = b.article_id left join user as c on a.user_id = c.id where a.id =?'
  query(sql, [id], function (err, result) {
    if (err) {
      res.send(reqData(500, err));
      return;
    }
    let data = getArticle(result[0].md_url)
    data.then((result2) => {
      let obj = {}
      obj = result[0]
      obj.content = result2.data
      res.send(reqData(200, obj));
    }).catch((err2) => {
      res.send(reqData(500, err2));
    })
  })

})
router.post('/list', function (req, res) {
  let options = Object.values(req.body)
  let totalsql = 'SELECT COUNT(id) FROM article'
  let getsql = 'SELECT a.*,url,width,height,nickname FROM article as a left join article_img as b on a.id = b.article_id left join user as c on a.user_id = c.id where a.id > ? order by a.id  limit 10 ';
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