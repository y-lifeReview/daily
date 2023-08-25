var express = require('express');
var router = express.Router();
let {
  query
} = require('../db/index')
let reqData = require('../dataBase/response')
const service = require('../request/axios')
const {
  getArticle
} = require('../func/article');
// const res = require('express/lib/response');

router.post('/article/save', function (req, res, next) {

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

router.get('/article/detail', function (req, res) {
  let id = req.query.id
  let sql = 'select a.md_url,a.category,a.img,a.updata_at,a.article_view,a.title,a.user_id  ,nickname from article as a  left join user as c on a.user_id = c.id where a.id =?'
  query(sql, [id], function (err, result) {
    if (err) {
      res.send(reqData(500, err));
      return;
    }
    let obj = {}
    obj = result[0]
    obj.content = result[0].md_url
    res.send(reqData(200, obj));
    //浏览量增加
    let sql2 = 'update article set article_view = article_view + 1 where id = ? '
    query(sql2, [id], function (err2, result2) {})
  })

})
router.get('/article/ispassword', function (req, res) {
  //  console.log('get参数',req.query.id)
  let id = req.query.id
  let sql = 'select is_password,ques from article where id=?'
  query(sql, [id], function (err, result) {
    if (err) {
      res.send(reqData(500, err));
      return;
    }
    res.send(reqData(200, result[0]))
  })
})
router.post('/article/checkpassword', function (req, res) {
  //  console.log('get参数',req.query.id)
  let id = req.body.id,
    content = req.body.content;
  console.log(id, content)
  let sql = 'select anwser from article where id=?'
  query(sql, [id], function (err, result) {
    if (err) {
      res.send(reqData(500, err));
      return;
    }
    console.log(result[0].anwser)
    if (content === result[0].anwser) {
      res.send(reqData(200, [true]))
    } else {
      res.send(reqData(200, [false]))
    }

  })
})
router.post('/article/top', function (req, res) {
  let spl = 'select a.summary,a.id,a.title ,a.img from article as a  where a.isorder=1'
  query(spl, [], function (err, result) {
    if (err) {
      res.send(reqData(500, err));
      return;
    }
    res.send(reqData(200, result))
  })
})
router.post('/article/list', function (req, res) {
  // console.log('list start')
  let options = Object.values(req.body)
  let totalsql = 'SELECT COUNT(id) FROM article where is_draft!=1 and isorder!=1'
  // let getsql = 'SELECT a.id,a.category,a.updata_at,a.article_view,a.title,a.summary,a.user_id,a.img,nickname FROM article as a  left join user as c on a.user_id = c.id where a.id <= ? and a.isorder!=1 and a.is_draft!=1 order by a.id desc limit 6 ';
  // let getsql = 'SELECT a.id,a.category,a.updata_at,a.article_view,a.title,a.summary,a.user_id,a.img,nickname FROM article as a  left join user as c on a.user_id = c.id and a.isorder!=1 and a.is_draft!=1 order by a.id desc limit 6 ';

  //  17 2 6
  let getsql = 'select a.id,a.category,a.updata_at,a.article_view,a.title,a.summary,a.user_id,a.img,nickname from (select * from article where is_draft!=1 and isorder!=1) as a left join user as c on a.user_id = c.id order by a.id desc limit  ?,6'

  // total-page*6
  query(totalsql, [], function (err, result) {
    // console.log('list 1')
    if (err) {
      console.log('err1', err)
      res.send(reqData(500, err));
      return;
    }
    query(getsql, [(options[0] - 1) * 6], function (err2, result2) {
      // console.log('分页',result[0]['COUNT(id)'],options[0],result[0]['COUNT(id)'] - options[0] * 6)
      // result[0]['COUNT(id)'] - (options[0] - 1) * 6
      if (err2) {
        console.log('[SELECT ERROR] - ', err2.message);
        res.send(reqData(500, err2));
        return;
      }
      let data = reqData(200, result2)
      data.page = options[0]
      data.total = result[0]['COUNT(id)']
      res.send(data);
    })
  })

})
//获取分类下文章
router.post('/article/category', function (req, res) {
  let {
    cate,
    page
  } = req.body;
  let totalsql = 'SELECT COUNT(id) FROM article where is_draft!=1 and category=?'
  // let getsql = 'SELECT a.id,a.category,a.updata_at,a.article_view,a.title,a.summary,a.user_id,a.img,nickname FROM article as a  left join user as c on a.user_id = c.id where a.id <= ? and  a.is_draft!=1 and a.category=? order by a.id desc limit 6 ';
  let getsql = 'select a.id,a.category,a.updata_at,a.article_view,a.title,a.summary,a.user_id,a.img,nickname from (select * from article where is_draft!=1  and category=?) as a left join user as c on a.user_id = c.id order by a.id desc limit  ?,6';
  query(totalsql, [cate], function (err, result) {
    // console.log('list 1')
    if (err) {
      console.log('err1', err)
      res.send(reqData(500, err));
      return;
    }
    query(getsql, [cate, (page - 1) * 6], function (err2, result2) {
      // console.log('list 2')
      if (err2) {
        console.log('[SELECT ERROR] - ', err2.message);
        res.send(reqData(500, err2));
        return;
      }
      let data = reqData(200, result2)
      data.page = page
      data.total = result[0]['COUNT(id)']
      res.send(data);
    })
  })
})


router.get('/article/hot', function (req, res) {
  let sql = 'select title,id,article_view from article where is_draft!=1 order by article_view desc limit 5'
  query(sql, function (err, result) {
    if (err) {
      res.send(reqData(500, err))
      return;
    }
    res.send(reqData(200, result))
  })
})
router.get('/article/tags', function (req, res) {
  let sql = 'select distinct category from article where is_draft!=1'
  query(sql, function (err, result) {
    if (err) {
      res.send(reqData(500, err))
      return;
    }
    res.send(reqData(200, result))
  })
})

//文章归档数据
router.post('/article/archives', function (req, res) {
  let page = req.body.page
  let totalsql = 'SELECT COUNT(id) FROM article where is_draft!=1 and isorder!=1'
  let sql = 'select a.id,a.updata_at,a.title,a.img,b.nickname from article as a left join user as b on a.user_id = b.id where a.is_draft !=1 order by a.updata_at desc limit ?,15'
  query(totalsql, [], function (err, result) {
    // console.log('list 1')
    if (err) {
      // console.log('err1', err)
      res.send(reqData(500, err));
      return;
    }
    query(sql, [(page - 1) * 15], function (err, result2) {
      if (err) {
        res.send(reqData(500, err))
        return;
      }
      let data = reqData(200, result2)
      data.page = page
      data.total = result[0]['COUNT(id)']
      res.send(data)
    })
  })

})
//动态获取
router.post('/dynamic', function (req, res) {
  let page = req.body.page
  let totalsql = 'SELECT COUNT(id) FROM dynamic where is_del!=1'
  query(totalsql, [], function (err, result) {
    if (err) {
      res.send(reqData(500, err));
      return;
    }
    query('select a.*,b.nickname,b.avatar,GROUP_CONCAT(c.url) as imgs from dynamic as a left join user as b on a.user_id = b.id left join dynamic_imgs as c on FIND_IN_SET(c.dy_id,a.id) where a.is_del!=1 group by a.id order by a.created_at desc limit ?,15 ', [(page - 1) * 15], function (err, result2) {
      if (err) {
        res.send(reqData(500, err))
        return;
      }
      let data = reqData(200, result2)
      data.page = page
      data.total = result[0]['COUNT(id)']
      res.send(data)
    })
  })
})

module.exports = router;