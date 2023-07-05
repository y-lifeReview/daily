var express = require('express');
var router = express.Router();
let {
    query
} = require('../db/index')
let reqData = require('../dataBase/response')
//获取相册分类数据
router.get('/images/getCategory', function (req, res) {
    query('select a.*,b.id as cid,b.src,b.create_at from img_category as a left join images as b  on a.id = b.box_id where b.id in (select max(c.id) from images as c left join img_category as d on c.box_id = d.id group by d.id)  order by a.id  ', '', function (err, result) {
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
        res.send(reqData(200, result))
    })
})
module.exports = router;