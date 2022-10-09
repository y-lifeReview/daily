var express = require('express');
const fs = require("fs");
const http = require('http')
let query = require('../db/index')
const {
  getWeather,
  getAdcode
} = require('../func/weather')
const getClientIp = require('../func/getIp')

let reqData = require('../dataBase/response')
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  // res.send('message')
  res.render('index', {
    title: 'Express'
  });
});

router.get('/getWeather', function (req, res, next) {
  let ip = getClientIp(req)
  query('SELECT sig FROM gaode_sig WHERE id = 0', [], function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      res.send(reqData(500, err));
      
      return;
    }
    let sig = result[0].sig
    let code = getAdcode(ip, sig).then((res1) => {
      // console.log('res1:',ip,res1.data)
      let data = getWeather(res1.data.adcode,sig)
      data.then((res2) => {
        // console.log(res2.data)
        res.send(reqData(200, res2.data))
        // res.send()
      }).catch((err) => {
        res.send(reqData(500, err))
      })
    }).catch((err) => {
      res.send(reqData(500, err))
    })
  })


});

module.exports = router;