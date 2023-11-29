const express = require('express');
const morgen = require('morgan');
const path = require('path');

const connect = require('./schemas/index')
const indexRouter = require('./routes');

const app = express();
app.set('port', process.env.PORT || 3002);
app.set('view engine', 'ejs'); // view engine의 확장자 지정
connect(); // 몽고디비에 연결

app.use(morgen('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err);
  // 템플릿 엔진 변수 생성
  // res.locals는 앱이 사용하는 템플릿 엔진의 종류에 상관없이 전달됨
  // 이 객체에 담은 값들은 템플릿 엔진에서 마음껏 깆다 쓸 수 있다
  // 템플릿에서는 '전역'이므로 앞에 아무것도 붙일 필요가 없음
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 운영(배포) 버전에서는 에러 객체를 안보여주기 위해
  res.status(err.status || 500);
  res.render('error.ejs');
});









app.listen(app.get('port'), () => {
  console.log(app.get('port') + '번에서 서버 실행');
});