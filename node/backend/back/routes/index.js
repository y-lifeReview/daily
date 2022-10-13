var express = require('express');
const fs = require("fs");
const http = require('http')
let {query} = require('../db/index')

var COS = require('cos-nodejs-sdk-v5');


var tengxun_cos = {
  Bucket: 'sprinkle-1300857039',
  Region: 'ap-chengdu',
}

const {
  getWeather,
  getAdcode
} = require('../func/weather')
const
  randomString = require('../func/strrandom')
const getClientIp = require('../func/getIp')

let reqData = require('../dataBase/response')
var router = express.Router();
var multer = require('multer')
var upload = multer({
  dest: './tmp/'
})

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
      let data = getWeather(res1.data.adcode, sig)
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

router.post('/img/upload', upload.single('file'), function (req, res) {
  let token = req.body.token
  query('select user.token from user where user.token = ?', [token], function (err, data) {
    if (err) {
      res.send(reqData(500, err))
      return;
    }
    if (data.length < 1) {
      res.send(reqData(500, '权限不足'))
      return;
    }
    let sql = 'select a.key from tencentcoskey as a'
    query(sql, [], function (err, result) {
      if (err) {
        res.send(reqData(500, err))
        return;
      }
      let secretkey = result[0].key
      var cos = new COS({
        SecretId: 'AKIDiGYZKo20g5D5g03NYUAamjRvJfsteBXg',
        SecretKey: secretkey
      });
      // 文件路径
      var filePath = './' + req.file.path;
      // 文件类型
      var temp = req.file.originalname.split('.');
      var fileType = temp[temp.length - 1];
      var lastName = '.' + fileType;
      // 构建图片名
      var fileName = Date.now() + randomString(12) + lastName;

      // 图片重命名
      fs.rename(filePath, fileName, (err) => {
        if (err) {
          res.send(reqData(500, err));
        } else {
          var localFile = './' + fileName;
          var key = fileName;
          // 腾讯云 文件上传
          var params = {
            Bucket: tengxun_cos.Bucket,
            /* 必须 */
            Region: tengxun_cos.Region,
            /* 必须 */
            Key: './image/' + key,
            /* 必须 */
            FilePath: './' + fileName,
            /* 必须 */
          }
          cos.sliceUploadFile(params, function (err, data) {
            if (err) {
              fs.unlinkSync(localFile);
              res.send(reqData(500, err));
            } else {
              fs.unlinkSync(localFile);
              // console.log('img',data)
              var url = 'http://sprinkle-1300857039.cos.ap-chengdu.myqcloud.com/' + data.Key;
              res.send(reqData(200, {
                url
              }));
            }
          });
        }
      });
    })

  })
})

module.exports = router;