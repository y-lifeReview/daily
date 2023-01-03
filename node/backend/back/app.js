var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const history = require('connect-history-api-fallback')
const logger = require('./logger')
// let connection = require('./db/index')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var poemRouter = require('./routes/poem');
var articleRouter = require('./routes/article');
var sign = require('./routes/sign');
var back = require('./routes/backend');
// var musicRouter = require('./routes/music');
const cors = require('cors')

var app = express();
//vue路由history模式
app.use(history())

app.use(cors())
//设置跨域访问
app.all("*", function (req, res, next) {
	
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "*");
	//允许的header类型
	res.header("Access-Control-Allow-Headers", "content-type");
	//跨域允许的请求方式 
	res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
	res.header("X-Powered-By",' 3.2.1')
	// if (req.method == 'OPTIONS')
	// 	res.sendStatus(200); //让options尝试请求快速结束
	// else
		next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/poem', poemRouter);
app.use('/article', articleRouter);
app.use('/sign', sign);
app.use('/back', back);
// app.use('/music', musicRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

const _errorHandel = (err,req,res,next)=>{
  logger.error(`${req.method} ${req.originaUrl}` + err.message);
  const errMsg = err.message;
  res.status(err.status || 500).json({
    code:-1,
    success:false,
    message:errMsg,
    data:{}
  })
}
app.use(_errorHandel)


module.exports = app;
