var express = require('express');
var router = express.Router();
let {
    query
} = require('../db/index')
let reqData = require('../dataBase/response')
//获取相册分类数据
router.get('/images/getCategory', function (req, res) {
    query('select a.id,a.title,a.ispassword,b.id as cid,b.src,b.create_at from img_category as a left join images as b  on a.id = b.box_id where b.id in (select max(c.id) from images as c left join img_category as d on c.box_id = d.id group by d.id)  order by a.id  ', '', function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        res.send(reqData(200, result))
    })
})
//获取相册数据
router.get('/images/getImages', function (req, res) {
    let {
        id
    } = req.query
    query('select * from images where box_id = ? ', [id], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        query('select a.title from img_category as a where id = ?',[id],function(err1,result1){
            if (err1) {
                res.send(reqData(500, err1));
                return;
            }
            res.send(reqData(200, result,result1[0]))
        })
        
    })
})
//是否加密
router.get('/images/isPassword', function (req, res) {
    let {
        id
    } = req.query
    query('select a.ispassword,a.ques from img_category as a where id = ? ', [id], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        res.send(reqData(200, result))
    })
})
//密码验证
router.post('/images/passCheck', function (req, res) {
    let {
        id,
        anwser
    } = req.body
    query('select a.anwser from img_category as a where id = ? ', [id], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        if (anwser === result[0].anwser) {
            res.send(reqData(200, [true]))
          } else {
            res.send(reqData(200, [false]))
          }
    })
})




//获取视频集数据
router.get('/video/getCategory', function (req, res) {
    query('select a.id,a.title,a.ispassword,b.mask_img from video_category as a left join videos as b  on a.id = b.box_id where b.id in (select max(c.id) from videos as c left join video_category as d on c.box_id = d.id group by d.id)  order by a.id desc  ', '', function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        res.send(reqData(200, result))
    })
})
//获取视频集内视频
router.get('/video/getDetail', function (req, res) {
    let {
        id
    } = req.query
    query('select * from videos where box_id = ? ', [id], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        query('select a.title from video_category as a where id = ?',[id],function(err1,result1){

            if (err1) {
                res.send(reqData(500, err1));
                return;
            }
            res.send(reqData(200, result,result1[0]))
        })
        
    })
})
//是否加密
router.get('/video/isPassword', function (req, res) {
    let {
        id
    } = req.query
    query('select a.ispassword,a.ques from video_category as a where id = ? ', [id], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        res.send(reqData(200, result))
    })
})
//密码验证
router.post('/video/passCheck', function (req, res) {
    let {
        id,
        anwser
    } = req.body
    query('select a.anwser from video_category as a where id = ? ', [id], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        if (anwser === result[0].anwser) {
            res.send(reqData(200, [true]))
          } else {
            res.send(reqData(200, [false]))
          }
    })
})
module.exports = router;