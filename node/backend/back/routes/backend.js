var express = require('express');
let {
    query,
    transction
} = require('../db/index')
let reqData = require('../dataBase/response');
// var moment = require('moment');
// moment().format('x');
// const {
//     route
// } = require('.');
const {
    getToken
} = require('../func/token')
const {
    getAdcode
} = require('../func/weather')
const {
    timeStand
} = require('../func/timeformat')
var router = express.Router();
//文章列表
router.get('/back/articleList', function (req, res) {
    // console.log(req.query)
    let {
        page,
        limit,
        sort
    } = req.query
    sort = sort === '-id' ? 0 : 1
    let countsql = 'select count(id) from article'
    let sql = 'select a.*,b.nickname as author from article as a left join user as b on a.user_id = b.id where a.id<=? order by a.id desc limit ?'
    if (sort) {
        sql = 'select a.*,b.nickname as author from article as a left join user as b on a.user_id = b.id where a.id<=? order by a.id limit ?'
    }
    query(countsql, [], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        query(sql, [result[0]['count(id)'] - (page - 1) * limit, limit - 0], function (err2, result2) {
            if (err2) {
                res.send(reqData(500, err2));
                return;
            }
            let data = reqData(200, result2)
            data.page = page;
            data.total = result[0]['count(id)']
            res.send(data)
        })

    })

})
//搜索作者
router.get('/back/search/author', function (req, res) {
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
router.get('/back/search/category', function (req, res) {
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
router.post('/back/register', function (req, res, next) {
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
router.post('/back/user/login', function (req, res, next) {
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
                console.log(result)
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
                            let addSql2 = 'UPDATE user SET token=? ,update_at = ? where nickname=?';
                            let addSqlParams2 = [token, update_at,req.body.username];
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
//用户信息
router.get('/back/user/info', function (req, res) {
    let token = req.query.token
    // console.log(token)
    let sql = 'select nickname,avatar ,role from user where token = ?'
    query(sql, [token], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        let obj = {}
        obj.roles = [result[0].role]
        obj.introduction = 'just'
        obj.avatar = result[0].avatar
        obj.name = result[0].nickname
        res.send(reqData(200, [obj]))
    })
})
//用户退出
router.post('/back/user/logout', function (req, res) {
    let token = req.body.token
    // console.log(token)
    let sql = 'update user set token=0 where token = ?'
    query(sql, [token], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        res.send(reqData(200, 'ok'))
    })
})
//文章发布
router.post('/back/article/pub', function (req, res) {
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
        image_uri,
        ispublish
    } = req.body
    let sqls = [],
        sqlParams = [];

    if (isOrder && ispublish) {
        //重置置顶的文章
        let sql2 = 'update articel set order=0 where order=1'
        sqls.push(sql2)
        sqlParams.push([])
    }
    if (!isPassword) {
        anwser = ques = '0'
    }
    isOrder = isOrder ? '1' : '0'
    isPassword = isPassword ? '1' : '0'
    let time = timeStand(new Date())
    let value1 = [content, category, time, time, title, content_short, uid, isOrder, isPassword, anwser, ques, image_uri, ispublish ? 0 : 1]
    // 1、article表操作
    let sql1 = 'insert into article (md_url,category,create_at,updata_at,title,summary,user_id,isorder,is_password,anwser,ques,img,is_draft) values(?,?,?,?,?,?,?,?,?,?,?,?,?)'
    sqls.push(sql1)
    sqlParams.push(value1)

    transction(sqls, sqlParams).then((all) => {
        console.log('all:', all)
        res.send(reqData(200, '发布成功'))
    }).catch((err) => {
        res.send(reqData(500, err))
    })
    // let sql = 'insert '
})
//文章删除
router.post('/back/article/delete', function (req, res) {
    let {
        id
    } = req.body;
    //删除数据后重建主键以保证id连续
    let sql = 'delete from article where id=?'
    let sql2 = 'alter table article drop id'
    let sql3 = 'alter table article add id int not null first'
    let sql4 = 'alter table article modify column id int not null auto_increment,add primary key(id)'
    let sqls = [sql, sql2, sql3, sql4]
    transction(sqls, [id, '', '', '']).then((all) => {
        console.log('all:', all)
        res.send(reqData(200, '删除成功'))
    }).catch((err) => {
        res.send(reqData(500, err))
    })
})
//草稿保存
router.post('/back/article/save', function (req, res) {
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
        image_uri,
        aid,
        ispublish
    } = req.body
    let sqls = [],
        sqlParams = [];
    if (!isPassword) {
        anwser = ques = 0
    }
    isOrder = isOrder ? 0 : 0
    isPassword = isPassword ? 0 : 0
    let time = timeStand(new Date())
    let value1 = [content, category, time, title, content_short, uid, isOrder, isPassword, anwser, ques, image_uri, ispublish ? 0 : 1, aid]
    // 1、article表操作
    let sql1 = 'update article  set md_url=?,category=?,updata_at=?,title=?,summary=?,user_id=?,isorder=?,is_password=?,anwser=?,ques=?,img=?,is_draft=? where id = ?'
    sqls.push(sql1)
    sqlParams.push(value1)

    transction(sqls, sqlParams).then((all) => {
        console.log('all:', all)
        res.send(reqData(200, '草稿保存成功'))
    }).catch((err) => {
        res.send(reqData(500, err))
    })
})
//签名列表获取
router.get('/back/signlist', function (req, res) {
    let {
        page,
        limit,
        sort
    } = req.query
    sort = sort === '-id' ? 0 : 1
    let countsql = 'select count(id) from longsign'
    let sql = 'select * from longsign  where id<=? order by id desc limit ? '
    if (sort) {
        sql = 'select * from longsign  where id<=? order by id  limit ? '
    }
    query(countsql, [], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        query(sql, [result[0]['count(id)'] - (page - 1) * limit, limit - 0], function (err2, result2) {
            if (err2) {
                res.send(reqData(500, err2));
                return;
            }
            let data = reqData(200, result2)
            data.page = page
            data.total = result[0]['count(id)']
            res.send(data)
        })
    })
})
//签名修改
router.post('/back/changesign', function (req, res) {
    let {
        id,
        content
    } = req.body;
    // console.log('id,content',id,content)
    let sql = 'update longsign set content=? where id=?'
    query(sql, [content, id], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        res.send(reqData(200, result))
    })
})
//签名新增
router.post('/back/addsign', function (req, res) {
    let {
        content
    } = req.body;
    let sql = 'insert into longsign (content) value(?)'
    query(sql, [content], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        res.send(reqData(200, result))
    })
})
//签名删除
router.post('/back/delsign', function (req, res) {
    let {
        id
    } = req.body;
    //删除数据后重建主键以保证id连续
    let sql = 'delete from longsign where id=?'
    let sql2 = 'alter table longsign drop id'
    let sql3 = 'alter table longsign add id int not null first'
    let sql4 = 'alter table longsign modify column id int not null auto_increment,add primary key(id)'
    let sqls = [sql, sql2, sql3, sql4]
    transction(sqls, [id, '', '', '']).then((all) => {
        console.log('all:', all)
        res.send(reqData(200, '删除成功'))
    }).catch((err) => {
        res.send(reqData(500, err))
    })
})
//草稿数据获取
router.get('/back/draft/info', function (req, res) {
    let {
        id
    } = req.query
    query('select * from article where id=?', [id], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        res.send(reqData(200, result))
    })
})

//侧边导航数据
router.get('/back/aside/info', function (req, res) {
    //获取一级导航数据
    let sql = 'select * from firstAside order by sort'
    query(sql, [], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        let sql2 = 'select * from secondAside order by sort'
        query(sql2, [], function (err2, result2) {
            if (err2) {
                res.send(reqData(500, err2))
                return;
            }
            for (var i = 0; i < result.length; i++) {
                for (var j = 0; j < result2.length; j++) {
                    if (result[i].id === result2[j].father_id) {
                        result[i].children = result[i].children || [];
                        result[i].children.push(result2[j])
                    }
                }
            }
            res.send(reqData(200, result))
        })
    })

})
//侧边导航显示
router.post('/back/aside/show', function (req, res) {
    let {
        is_show,
        id,
        father_id
    } = req.body;
    // console.log(is_show)
    is_show = is_show == 0 ? 1 : 0
    let sql = 'update firstAside set is_show=? where id=?';
    if (father_id) {
        sql = 'update secondAside set is_show=? where id=?';
    }
    query(sql, [is_show, id], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        res.send(reqData(200, '修改成功'))
    })
})
//新增侧边导航
router.post('/back/aside/add', function (req, res) {
    let {
        icon_string,
        title,
        father_id,
        zindex,
        is_outweb,
        path,
        is_show
    } = req.body;
    father_id = father_id ? father_id : 0
    if (father_id) { //新增二级导航
        let sortsql = 'select count(*) as maxsort from secondAside where father_id = ? '
        query(sortsql, [father_id], function (err, result) {
            if (err) {
                res.send(reqData(500, err))
                return;
            }
            console.log('最大', result)
            let max = result[0].maxsort + 1
            let sql = 'insert into secondAside (father_id,icon_string,title,is_outweb,path,sort,is_show) values(?,?,?,?,?,?,1)'
            query(sql, [father_id, icon_string, title, is_outweb, path, max], function (err2, result2) {
                if (err2) {
                    res.send(reqData(500, err2))
                    return;
                }
                res.send(reqData(200, '新增成功'))
            })
        })
    } else { //新增一级导航
        let maxsql = 'select MAX(sort) as max from firstAside'
        query(maxsql, [], function (err, result) {
            if (err) {
                res.send(reqData(500, err))
                return;
            }
            console.log('最大值', result[0].max + 1)
            let maxsort = result[0].max + 1
            // return;
            let sql = 'insert into firstAside (icon_string,title,is_outweb,path,sort,is_show) values(?,?,?,?,?,1)'
            query(sql, [icon_string,
                title,
                is_outweb,
                path,
                maxsort,
                is_show

            ], function (err2, result2) {
                if (err2) {
                    res.send(reqData(500, err2));
                    return;
                }
                res.send(reqData(200, '新增成功'))
            })
        })
    }


})
//侧边导航修改
router.post('/back/aside/change', function (req, res) {
    let {
        zindex,
        id,
        title,
        is_outweb,
        path,
        icon_string
    } = req.body
    let sql = 'update firstAside set title=?,is_outweb=?,path=?,icon_string=?  where id=?'
    if (zindex === 2) {
        sql = 'update secondAside set title=?,is_outweb=?,path=?,icon_string=?  where id=?'
    }
    query(sql, [title, is_outweb, path, icon_string, id], function (err, result) {
        if (err) {
            res.send(reqData(500, err))
            return;
        }
        res.send(reqData(200, '修改成功'))
    })
})

//create array



//相册分类新增
router.post('/back/addImageCate', function (req, res) {
    let {
        title,
        imgs
    } = req.body;
    //title重复检查
    let sqlTitleCheck = 'select title from img_category where img_category.title = ? '

    query(sqlTitleCheck, [title], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        if (result.length < 1) {
            let sqlInsertCate = 'insert into img_category (title) values(?)';
            query(sqlInsertCate, [title], function (err1, data1) {
                if (err1) {
                    res.send(reqData(500, err1));
                    return;
                }
                // console.log('data1', data1)
                let time = timeStand(new Date())
                let values = []
                imgs.forEach(item => {
                    values.push([item.replace('http://sprinkle-1300857039.cos.ap-chengdu.myqcloud.com/image/', ''), data1.insertId, item, time])
                });
                query('insert into images (title,box_id,src,create_at) values ?', [values], function (err2, data2) {
                    if (err2) {
                        res.send(reqData(500, err2));
                        return;
                    }
                    res.send(reqData(200, '新增成功'))
                })
            })
        } else {
            res.send(reqData(500, '相册名称重复'));
            return;
        }
        // res.send(reqData(200, result))
    })
})
//获取所有相册
router.get('/back/getImageCate', function (req, res) {
    query('select a.*,b.id as cid,b.src,b.create_at from img_category as a left join images as b  on a.id = b.box_id where b.id in (select max(c.id) from images as c left join img_category as d on c.box_id = d.id group by d.id)  order by a.id  ', '', function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        res.send(reqData(200, result))
    })
})
router.get('/back/getImageDetail', function (req, res) {
    let {
        id
    } = req.query
    query('select * from images where box_id = ? ', [id], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        res.send(reqData(200, result))
    })
})

//删除相册图片
router.post('/back/delImage', function (req, res) {
    let {
        id,
        islast
    } = req.body
    query('delete from images where id=?', [id], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        if (islast) {
            query('delete from img_category where id =?', [islast], function (err2, result) {
                if (err2) {
                    res.send(reqData(500, err));
                    return;
                }
                res.send(reqData(200, '删除成功'))
            })
        } else {
            res.send(reqData(200, '删除成功'))
        }

    })
})

//新增相册图片
router.post('/back/addImage', function (req, res) {
    let {
        id,
        src
    } = req.body
    let time = timeStand(new Date())
    let title = src.replace('http://sprinkle-1300857039.cos.ap-chengdu.myqcloud.com/image/', '')
    query('insert into images (title,box_id,src,create_at) values(?,?,?,?)', [title, id, src, time], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        res.send(reqData(200, '上传成功'))
    })
})

//统计数据
router.get('/back/visitorCount', function (req, res) {
    let time = new Date(new Date().toLocaleDateString()).getTime();
    query('select count(*) as allCount from iplist', function (err, data) {
        query('select count(*) as dayCount from iplist where updata_at>=?', [time], function (err, data1) {
            query('select SUM(times) as allTimes from iplist', function (err, data2) {
                query('SELECT COUNT(id) as allArt FROM article where is_draft!=1', function (err, data3) {
                    console.log(data, data1, data2, data3)
                    res.send(reqData(200, {
                        allCount: data[0].allCount,
                        dayCount: data1[0].dayCount,
                        allTimes: data2[0].allTimes,
                        allArt: data3[0].allArt
                    }))
                })
            })
        })
    })
})
//最近访问ip
router.get('/back/lastView', function (req, res) {
    query('select * from iplist order by updata_at desc limit 10', function (err, data) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        res.send(reqData(200, data))
    })
})
//分类统计
router.get('/back/cateInfo', function (req, res) {
    query('select category as name,COUNT(*) as value from article GROUP BY category', function (err, data) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        res.send(reqData(200, data))
    })
})
// 最近访问
// router.get('/back/ipLast', function (req, res) {
//     query('select * from iplist order by id desc limit 10', function (err, data) {
//         if (err) {
//             res.send(reqData(500, err));
//             return;
//         }
//         new Promise((resolve, reject) => {
//             data.forEach((item) => {
                 
//             })
           
//         }).then((redata)=>{
//             res.send(reqData(200, redata))
//         }).catch((rejerr)=>{
//             res.send(reqData(500, rejerr));
//         })

        
        
//     })
// })


module.exports = router;