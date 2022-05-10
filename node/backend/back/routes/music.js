var express = require('express');
const fs = require("fs");
const http = require('http')

const {
    getMusicList,
    getMusicUrls,
    getMusicCookie,
    setMusicCookie
} = require('../request/neteaseMusic')

let reqData = require('../dataBase/response')
var router = express.Router();

router.get('/getMusicList', function (req, res, next) {
    let reu = setMusicCookie()
    reu.then((data) => {
        res.send(reqData(200,data))
    }).catch((err) => {
        res.send(reqData(500,err))
    })
    // let result = getMusicList()
    // result.then((data) => {
    //     res.send(reqData(200,data))
    // }).catch((err) => {
    //     res.send(reqData(500,err))
    // })
});
router.get('/getMusicUrls', function (req, res, next) {
    // console.log('req:',req.query)
    // let ids = req.query.id ||''
    // let result = getMusicUrls('004MWNlO3K6AXX')
    // result.then((data) => {
    //     res.send(reqData(200,data))
    // }).catch((err) => {
    //     res.send(reqData(500,err))
    // })
});

module.exports = router;