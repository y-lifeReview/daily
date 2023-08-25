var express = require('express');
const fs = require("fs");
const http = require('http')
let {
  query,
  transction
} = require('../db/index')
const {
  timeStand
} = require('../func/timeformat')
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
  console.log('ip w',ip)
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

router.post('/video/upload', upload.single('file'), function (req, res) {
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
            Key: './video/' + key,
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

router.post('/bloginfo', function (req, res) {
  let sqls = [],
    sqlParams = [];

  let sql1 = 'SELECT COUNT(id) as count FROM article where is_draft!=1',
    sql2 = 'select MAX(updata_at) as time from article'
  sqls.push(sql1, sql2)
  sqlParams.push([], [])
  transction(sqls, sqlParams).then((all) => {
    let data = {}
    data.count = all[0][0].count;
    data.time = all[1][0].time.substring(0, 10);
    let temp = Math.ceil(((new Date()).getTime() / 1000 - 1667371358) / 24 / 3600)
    data.day = temp
    res.send(reqData(200, data))
  }).catch((err) => {
    // console.log('err:', err)
    res.send(reqData(500, err))
  })
})
router.get('/aside/info', function (req, res) {
  //获取一级导航数据
  let sql = 'select * from firstAside where is_show=1 order  by sort'
  query(sql, [], function (err, result) {
    if (err) {
      res.send(reqData(500, err));
      return;
    }
    let sql2 = 'select * from secondAside where is_show=1 order by sort'
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
      //
      query('select distinct category from article where is_draft=0', '', function (err3, result3) {
        if (err3) {
          res.send(reqData(500, err3))
          return;
        }

        let cateChild = result3.map((item) => {
          let obj = {
            is_outweb: 0,
            path: '/category/' + item.category,
            is_show: 1,
            title: item.category
          }
          return obj
        })
        // console.log('分类数据', result, result3)
        for (var k = 0; k < result.length; k++) {
          if (result[k].path == '/category') {
            result[k].children = cateChild
          }
        }
        res.send(reqData(200, result))
      })

    })
  })
})
router.post('/ipcommit', function (req, res) {

  var ip = req.headers['x-forwarded-for'] ||
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress || '';
  if (ip.split(',').length > 0) {
    ip = ip.split(',')[0]
  }
  ip = ip.substr(ip.lastIndexOf(':') + 1, ip.length);
  console.log('ip地址为:', ip)
  ip = ip=='127.0.0.1'?'114.247.50.2':ip
  getAdcode(ip, '96adcca306a38f736d8e1e74d9544ee8').then((result) => {
    let city = result.data.city
    query('select ip from iplist where ip=?', [ip], function (err, result) {
      if (err) {
        return;
      }
      console.log('ip查询', result)
      if (result.length > 0) {
        query('update iplist set times = times + 1,city=? where ip = ? ', [city,ip], function () {
          res.send(reqData(200, 'ok'))
        })
      } else {
        let time = new Date().getTime()
        query('INSERT INTO iplist(ip,updata_at,times,city) VALUES(?,?,?,?)', [ip, time, 1,city], function (err) {
          res.send(reqData(200, ip))
        })
      }
    })
  })


})

module.exports = router;