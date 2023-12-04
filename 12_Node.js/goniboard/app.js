const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgen = require('morgan');
const session = require('express-session');
const passport = require('passport');

// const connect = require('./schemas/index');

dotenv.config();

// 라우터 리콰이어
const indexRouter = require('./routes');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

// DB 연결 함수 가져오기
const { connect } = require('./database');
// ./passport/index.js 가져오기
const passportConfig = require('./passport')

const app = express();
passportConfig(); // 패스포트 설정 함수 실행
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
// passport 미들웨어 설정
app.use(passport.initialize()); // 요청 객체에 passport 설정을 심음(req.isAuthenticated, req.login, req.logout 등)
app.use(passport.session()); // req.session 객체에 passport 정보를 저장
// req.session 객체는 express-session에서 생성하는 것이므로 passport 미들웨어는 express-session 미들웨어보다 뒤에 연결해야 함

// res.locals.user 속성에 req.user 정보 넣기를 미들웨어로 등록
// => 템플릿 엔진에서 user 객체를 통해 로그인한 사용자 정보에 접근할 수 있음
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// 라우터를 미들웨어 등록
app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);



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