var express = require('express');
var router = express.Router();
let connection = require('../db/index')
const reqData = require('../dataBase/response')
const {
  getToken
} = require('../func/token')
/* GET users listing. */
// 注册
router.post('/register', function (req, res, next) {
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
  connection.query('SELECT tokenKey FROM tokenKey WHERE id = 0', function (err, tokenkey) {
    if (err) {
      console.log('err1', err)
      res.send(reqData(500, '注册失败，请联系管理员'));
      connection.end();
      return;
    }
    let key = tokenkey[0].tokenKey
    new Promise((resolve, reject) => {
      getToken(name, key, resolve)
    }).then((token) => {
      // console.log('token', token)
      let addSql = 'INSERT INTO user(nickname,password,token,created_at,update_at) VALUES(?,?,?,?,?)';
      let addSqlParams = [name, password, token, created_at, created_at];
      connection.query(addSql, addSqlParams, function (err, result) {
        if (err) {
          res.send(reqData(500, err));
          connection.end();
          return;
        }
        res.send(reqData(200, {
          'token': token
        }));
        connection.end();
      });

    }).catch((err) => {
      console.log('err2', err)
      res.send(reqData(500, '注册失败，请联系管理员'));
      connection.end();
      return;
    })

  });


});

// 登录
router.post('/login', function (req, res, next) {
  let Sql = 'SELECT * FROM user WHERE nickname = ?';
  let SqlParams = [req.body.name];
  connection.query(Sql, SqlParams, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      res.send(reqData(500, err));
      connection.end();
      return;
    }
    // console.log(result)
    if (result.length == 0) {
      res.send(reqData(500, '账号不存在!'));
      connection.end();
    } else {
      connection.query('SELECT password FROM user WHERE nickname = ?', [req.body.name], function (err, result) {
        if (err) {
          console.log('[SELECT ERROR] - ', err.message);
          res.send(reqData(500, err));
          connection.end();
          return;
        }
        // console.log(result)
        if (result[0].password === req.body.password) {
          connection.query('SELECT tokenKey FROM tokenKey WHERE id = 0', function (err, tokenkey) {
            if (err) {
              console.log('err3', err)
              res.send(reqData(500, '登录失败，请联系管理员'));
              connection.end();
              return;
            }
            let key = tokenkey[0].tokenKey
            new Promise((resolve, reject) => {
              getToken(req.body.name, key, resolve)
            }).then((token) => {
              // console.log('token', token)
              let update_at = (new Date().getTime() / 1000).toFixed(0) - 0
              let addSql2 = 'UPDATE user SET token=? ,update_at = ?';
              let addSqlParams2 = [token, update_at];
              connection.query(addSql2, addSqlParams2, function (err, result) {
                if (err) {
                  res.send(reqData(500, err));
                  connection.end();
                  return;
                }
                res.send(reqData(200, {
                  'token': token
                }));
                connection.end();
              });
            }).catch((err) => {
              console.log(err)
              res.send(reqData(500, err))
              connection.end();
            })
          })
        } else {
          res.send(reqData(500, '密码错误!'));
          connection.end();
        }
      })
    }
  });

});

module.exports = router;