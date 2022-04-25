var express = require('express');
var router = express.Router();
let url = require('url')
let connection = require('../db/index')
/* GET users listing. */
router.get('/everydaypoem', function (req, res, next) {
    var params = url.parse(req.url, true).query
    console.log(params)
    let sql = 'SELECT * FROM poem WHERE id=1'
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        res.send(result)
        connection.end();
        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
    });
});

module.exports = router;