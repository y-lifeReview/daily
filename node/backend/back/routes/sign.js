var express = require('express');
var router = express.Router();
let {query} = require('../db/index')
let reqData = require('../dataBase/response')

router.get('/', function (req, res) {
    let sqlcount = 'select COUNT(id) from longsign'
    query(sqlcount, [], function (err, result) {
        if (err) {
            res.send(reqData(500, err));
            return;
        }
        let count = result[0]['COUNT(id)']
        let id = Math.floor(Math.random() * (count - 1 + 1)) + 1
        // console.log(count,id)
        let sql = 'select * from longsign where id=?'
        query(sql, [id], function (err2, result2) {
            if (err2) {
                res.send(reqData(500, err2));
                return;
            }
            res.send(reqData(200,result2))
        })
    })

})
module.exports = router;