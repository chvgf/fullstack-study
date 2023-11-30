const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgen = require('morgan');
const session = require('express-session');
const mongodb = require('mongodb');

// const connect = require('./schemas/index');

dotenv.config();

// 라우터 리콰이어
const indexRouter = require('./routes');
const postRouter = require('./routes/post');

// DB 연결 리콰이어
const { connect } = require('./database');

const app = express();
app.set('port', process.env.PORT || 8088);
app.set('view engine', 'ejs');
connect(); //몽고디비에 연결

app.use(morgen('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

// 라우터 미들웨어 등록
app.use('/', indexRouter);
app.use('/post', postRouter);







// 에러 설정
app.use((req, res, next) => { // 404 처리
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => { // error.ejs
  console.error(err);
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error.ejs');
});

// 서버연결
app.listen(app.get('port'), () => {
  console.log(app.get('port') + '번에서 서버 실행');
});