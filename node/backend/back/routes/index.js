var express = require('express');
const fs = require("fs");
const http = require('http')
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  // res.send('message')
  res.render('index', {
    title: 'Express'
  });
});

router.get('/user2', function (req, res, next) {

  // http.get('https://v2.jinrishici.com/info', res2 => {
  //   const {
  //     statusCode
  //   } = res2;
  //   const contentType = res2.headers['content-type'];

  //   let error;
  //   // Any 2xx status code signals a successful response but
  //   // here we're only checking for 200.
  //   if (statusCode !== 200) {
  //     error = new Error('Request Failed.\n' +
  //       `Status Code: ${statusCode}`);
  //   } else if (!/^application\/json/.test(contentType)) {
  //     error = new Error('Invalid content-type.\n' +
  //       `Expected application/json but received ${contentType}`);
  //   }
  //   if (error) {
  //     console.error(error.message);
  //     // Consume response data to free up memory
  //     res2.resume();
  //     return;
  //   }

  //   res2.setEncoding('utf8');
  //   let rawData = '';
  //   res2.on('data', (chunk) => {
  //     rawData += chunk;
  //   });
  //   res2.on('end', () => {
  //     try {
  //       const parsedData = JSON.parse(rawData);
  //       console.log('result:',parsedData);
  //       res.send(parsedData)
  //     } catch (e) {
  //       console.error(e.message);
  //     }
  //   }).on('error', (e) => {
  //     console.error(`Got error: ${e.message}`);
  //   });;
  // })
  
});
module.exports = router;