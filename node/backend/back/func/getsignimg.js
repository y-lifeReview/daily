let {
    query,
} = require('../db/index')
let reqData = require('../dataBase/response')
var COS = require('cos-nodejs-sdk-v5');

const  getSignImg = function (key) {
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
        cos.getObjectUrl({
            Bucket: 'sprinkle-1300857039', // 填入您自己的存储桶，必须字段
            Region: 'ap-chengdu', // 存储桶所在地域，例如 ap-beijing，必须字段
            Key:key.replace('https://sprinkle-1300857039.cos.ap-chengdu.myqcloud.com/',''), // 存储在桶里的对象键（例如1.jpg，a/b/test.txt），支持中文，必须字段
            Sign: true, // 获取带签名的对象 URL
            Expires:120
        },
        function (err, data) {
            if (err) {
                console.log(err)
                return;
            }
            console.log('COS:', data)
            return data.Url
        })
    })
    
}

// const getSignVideo = function (key) {
//     let sql = 'select a.key from tencentcoskey as a'
//     query(sql, [], function (err, result) {
//         if (err) {
//             res.send(reqData(500, err))
//             return;
//         }
//         let secretkey = result[0].key
//         var cos = new COS({
//             SecretId: 'AKIDiGYZKo20g5D5g03NYUAamjRvJfsteBXg',
//             SecretKey: secretkey
//         });
//         cos.getObjectUrl({
//             Bucket: 'sprinkle-1300857039', // 填入您自己的存储桶，必须字段
//             Region: 'ap-chengdu', // 存储桶所在地域，例如 ap-beijing，必须字段
//             Key:key.replace('http://sprinkle-1300857039.cos.ap-chengdu.myqcloud.com/',''), // 存储在桶里的对象键（例如1.jpg，a/b/test.txt），支持中文，必须字段
//             Sign: true, // 获取带签名的对象 URL
//             Expires:120
//         },
//         function (err, data) {
//             if (err) {
//                 console.log(err)
//                 return;
//             }
//             console.log('COS:', data)
//             return data.Url
//         })
//     })
    
// }
module.exports = {
    getSignImg
    // getSignVideo
}
