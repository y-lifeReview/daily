let mysql = require('mysql')
// var connection = mysql.createConnection({
//   host: 'gz-cynosdbmysql-grp-pd4ndjr1.sql.tencentcdb.com',
//   user: 'root',
//   password: '',
//   port: '27251',
//   database: 'test',
//   multipleStatements: true
// });
let pool = mysql.createPool({
  host: 'gz-cynosdbmysql-grp-pd4ndjr1.sql.tencentcdb.com',
  user: 'root',
  password: '',
  port: '27251',
  database: 'test',
});
let query = function (sql,data ,callback) {
  pool.getConnection(function (err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql,data,function (qerr, vals, fields) {
        //释放连接
        conn.release();
        //事件驱动回调
        callback(qerr, vals, fields);
      });
    }
  });
}
module.exports = query;