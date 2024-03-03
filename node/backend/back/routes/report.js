var express = require('express');
var router = express.Router();
const {
    timeStand
  } = require('../func/timeformat')
  
let {
    query
} = require('../db/index')
let reqData = require('../dataBase/response')

router.get('/getSendData.gif', function (req, res) {
    var ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0]
    }
    ip = ip.substr(ip.lastIndexOf(':') + 1, ip.length);
    ip = ip == '127.0.0.1' ? '114.247.50.2' : ip

    var u = req.headers['user-agent'];
    if (!!u.match(/compatible/i) || u.match(/windows/i)) {
        u = 'Windows';
    } else if (!!u.match(/Macintosh/i) || u.match(/MacIntel/i)) {
        u = 'MacOS';
    } else if (!!u.match(/iphone/i) || u.match(/Ipad/i)) {
        u = 'IPhone';
    } else if (!!u.match(/Android/i)) {
        u = 'Android';
    } else {
        u = '未知设备';
    }

    let type = req.query.type,
        data = JSON.parse(req.query.data || '[]')

    if (type === 'Requst') {
        //请求上报
        let values = []
        data.forEach(item => {
            item.reqStart = timeStand(item.reqStart)
            values.push([...Object.values(item), ip, u])
        });
        query('insert into req_records (req_start,url,method,params,req_duration,status,ip,agent) values ?', [values], function (err1, data1) {
            if (err1) {
                // console.log('错误：',err1.sqlMessage)
                query('Insert into report_error(err_time,type,reason) values(?,?,?)', [timeStand(new Date()), type, err1.sqlMessage], function (err2, data2) {
                    // console.log('错误2:',err2)                                 
                })
            }
            res.send(reqData(200, []))
        })
    } else if (type === 'Error') {
        //错误上报
        query('Insert into error_info (err_info,err_source,err_lineno,err_colno,err_url,err_time,user_ip,user_client,user_browser_version,is_deal) values(?,?,?,?,?,?,?,?,?,?)',
            [data.errInfo, data.errSource, data.errLineno, data.errColno, data.errUrl, timeStand(data.errTime), ip, u, data.clientInfo, 0],
            function (err, result) {
                if (err) {
                    // console.log('上报错误：',err)
                    query('Insert into report_error(err_time,type,reason) values(?,?,?)', [timeStand(new Date()), type, err.sqlMessage], function (err2, data2) {
                        // console.log('错误2:',err2)                                 
                    })
                }
                res.send(reqData(200, []))
            })
    } else if (type === 'PageStay') {
        //页面停留时间上报
        let values = []
        data.forEach(item => {
            item.duration = item.pageEndTime - item.pageBeginTime - 0
            item.pageBeginTime = timeStand(item.pageBeginTime);
            item.pageEndTime = timeStand(item.pageEndTime)
            values.push([...Object.values(item), ip, u, ])
        })
        // console.log(values)
        query('insert into page_stay (page_begin_time,page_end_time,page_title,page_url,duration,user_ip,user_agent) values ?', [values], function (err1, data1) {
            if (err1) {
                // console.log('错误：',err1.sqlMessage)
                query('Insert into report_error(err_time,type,reason) values(?,?,?)', [timeStand(new Date()), type, err1.sqlMessage], function (err2, data2) {
                    // console.log('错误2:',err2)                                 
                })
            }
            res.send(reqData(200, []))
        })
    }


})
module.exports = router;