var express = require('express');
const fs = require("fs");
const http = require('http')
const {
  getWeather,
  getAdcode
} = require('../func/weather')
const getClientIp = require('../func/getIp')

const {getMusicList} = require('../request/neteaseMusic')

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
  // musicLogin('18382749843','19980508c')
  let result = getMusicList()
  // console.log(result)
  result.then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
  

  // let ip = getClientIp(req)
  // let code = getAdcode(ip).then((res1) => {
  //   // console.log('res1:',ip,res1.data)
  //   let data = getWeather(res1.data.adcode)
  //   data.then((res2) => {
  //     // console.log(res2.data)
  //     // res.send(reqData(200,res2.data))
  //     res.send()
  //   }).catch((err) => {
  //     res.send(reqData(500,err))
  //   })
  // }).catch((err) => {
  //   res.send(reqData(500,err))
  // })

});
router.get('/getWeather', function (req, res, next) {

});

module.exports = router;