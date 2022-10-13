var express = require('express');
let {
    query,
    transction
} = require('../db/index')
let reqData = require('../dataBase/response');
// const {
//     route
// } = require('.');
const {
    getToken
} = require('../func/token')
const {
    timeStand
} = require('../func/timeformat')
var router = express.Router();
//文章列表
router.get('/articleList', function (req, res) {
    // console.log(req.query)
    let params = req.query
    let sql = 'select a.*,b.nickname as author ,c.url from article as a left join user as b on a.id = b.id left join article_img as c on a.id=c.article_id order by a.id desc '
    query(sql, [], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        res.send(reqData(200, result))
    })
})
//搜索作者
router.get('/search/author', function (req, res) {
    let content = req.query.name
    let sql = "select nickname,id from user where nickname like '%" + content + "%'"
    if (!content) {
        sql = "select DISTINCT nickname,id from user"
    }

    query(sql, [], function (err, result) {
        if (err) {
            res.send(reqData(500, err))
            return;
        }
        res.send(reqData(200, result))
    })
})
//搜索已有分类
router.get('/search/category', function (req, res) {
    // let content = req.query.name
    let sql = "select DISTINCT category from article "
    query(sql, [], function (err, result) {
        if (err) {
            res.send(reqData(500, err))
            return;
        }
        res.send(reqData(200, result))
    })
})
/* GET users listing. */
// 注册
router.post('/register', function (req, res, next) {
    if (!req.body.name) {
        res.send(reqData(500, "用户名非法!"));
        return;
    }
    if (!req.body.password) {
        res.send(reqData(500, "密码不能为空"));
        return;
    }
    let name = req.body.name,
        password = req.body.password;
    let created_at = (new Date().getTime() / 1000).toFixed(0) - 0
    query('SELECT tokenKey FROM tokenKey WHERE id = 0', function (err, tokenkey) {
        if (err) {
            console.log('err1', err)
            res.send(reqData(500, '注册失败，请联系管理员'));
            return;
        }
        let key = tokenkey[0].tokenKey
        new Promise((resolve, reject) => {
            getToken(name, key, resolve)
        }).then((token) => {
            // console.log('token', token)
            let addSql = 'INSERT INTO user(nickname,password,token,created_at,update_at) VALUES(?,?,?,?,?)';
            let addSqlParams = [name, password, token, created_at, created_at];
            query(addSql, addSqlParams, function (err, result) {
                if (err) {
                    res.send(reqData(500, err));
                    return;
                }
                res.send(reqData(200, {
                    'token': token
                }));
            });

        }).catch((err) => {
            console.log('err2', err)
            res.send(reqData(500, '注册失败，请联系管理员'));
            return;
        })

    });


});

// 登录
router.post('/user/login', function (req, res, next) {
    let Sql = 'SELECT * FROM user WHERE nickname = ?';
    let SqlParams = [req.body.username];
    query(Sql, SqlParams, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(reqData(500, err));
            return;
        }
        // console.log(result)
        if (result.length == 0) {
            res.send(reqData(500, '账号不存在!'));

        } else {
            query('SELECT password FROM user WHERE nickname = ?', [req.body.username], function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    res.send(reqData(500, err));

                    return;
                }
                // console.log(result)
                if (result[0].password === req.body.password) {
                    query('SELECT tokenKey FROM tokenKey WHERE id = 0', function (err, tokenkey) {
                        if (err) {
                            console.log('err3', err)
                            res.send(reqData(500, '登录失败，请联系管理员'));

                            return;
                        }
                        let key = tokenkey[0].tokenKey
                        new Promise((resolve, reject) => {
                            getToken(req.body.username, key, resolve)
                        }).then((token) => {
                            // console.log('token', token)
                            let update_at = (new Date().getTime() / 1000).toFixed(0) - 0
                            let addSql2 = 'UPDATE user SET token=? ,update_at = ?';
                            let addSqlParams2 = [token, update_at];
                            query(addSql2, addSqlParams2, function (err, result) {
                                if (err) {
                                    res.send(reqData(500, err));

                                    return;
                                }
                                res.send(reqData(200, {
                                    'token': token
                                }));

                            });
                        }).catch((err) => {
                            console.log(err)
                            res.send(reqData(500, err))

                        })
                    })
                } else {
                    res.send(reqData(500, '密码错误!'));

                }
            })
        }
    });

});

router.get('/user/info', function (req, res) {
    let token = req.query.token
    // console.log(token)
    let sql = 'select nickname,avatar from user where token = ?'
    query(sql, [token], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        let obj = {}
        obj.roles = ['admin']
        obj.introduction = 'just'
        obj.avatar = result[0].avatar
        obj.name = result[0].nickname
        res.send(reqData(200, [obj]))
    })
})
router.post('/article/pub', function (res, req) {
    let {
        isOrder,
        anwser,
        isPassword,
        ques,
        title,
        category,
        content,
        content_short,
        uid,
        image_uri
    } = res.body
    let sqls = [],
        sqlParams = [];

    if (isOrder) {
        //重置置顶的文章
        let sql2 = 'updata articel set order=0 where order=1'
        sqls.push(sql2)
        sqlParams.push([])
    }
    if (!isPassword) {
        anwser = ques = 0
    }
    isOrder = isOrder ? 1 : 0
    isPassword = isPassword ? 1 : 0
    let time = timeStand(new Date())
    let value1 = [content,category,time,time,title,content_short,uid,isOrder,isPassword,anwser,ques]
    // 1、article表操作
    let sql1 = 'insert into article(md_url,category,create_at,updata_at,title,summary,user_id,order,is_password,password,ques) ' +
        ' values(?,?,?,?,?,?,?,?,?,?,?)'
    sqls.push(sql1)
    sqlParams.push(value1)
    //2、
    

    // transction(sqls,sqlParams).then((all)=>{

    // }).catch((err)=>{

    // })
    // let sql = 'insert '
})
module.exports = router;