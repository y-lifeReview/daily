let mysql =require('mysql')
var connection = mysql.createConnection({
    host     : 'gz-cynosdbmysql-grp-pd4ndjr1.sql.tencentcdb.com',
    user     : 'root',
    password : '19980508cX',
    port:'27251',
    database : 'test'
  });
connection.connect();
module.exports = connection; 