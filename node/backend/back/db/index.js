let mysql =require('mysql')
var connection = mysql.createConnection({
    host     : '',
    user     : 'root',
    password : '',
    port:'27251',
    database : 'test'
  });
connection.connect();
module.exports = connection; 