const express = require('express'); // express 내부적으로 http 모듈을 쓰고 있음
const path = require('path');

const app = express(); // express로 부터 app을 하나 가져옴
// app.set(키, 값): 서버에 전역 속성 설정
app.set('port', process.env.PORT || 3000); // 서버가 실행될 포트 지정(환경변수 없으면 기본값 3000으로)

// 미들웨어 (공통로직)
// app.use()로 미들웨어 장착, 안에 들어가는 콜백 함수가 미들웨어임
// 보통 직접 만들기 보다는 필요한 민들웨어 라이브러리를 받아서 사용
app.use((req, res, next) => {
  // 서버로 요청을 보낼 때마다 실행됨
  console.log('모든 요청에 실행하고 싶어요.');
  next(); // 다음 실행 흐름(미들웨어 또는 라우터)으로 넘어가기
});

// 특정 요청에서만 실행되는 미들웨어
app.use('/about', (req, res, next) => {
  console.log('/about 요청 에서만 실행');
  next(); // 다음 미들웨어 또는 app.get('/about') 라우터로 넘어감
});

// 미들웨어 여러개 사용하기
app.use((req, res, next) => {
  console.log('1 요청에 실행하고 싶어요.');
  next(); // 다음 미들웨어 실행
},
(req, res, next) => {
  console.log('2 요청에 실행하고 싶어요.');
  next(); // 다음 미들웨어 실행
},
(req, res, next) => {
  console.log('3 요청에 실행하고 싶어요.');
  next(); // 다음 미들웨어 실행
});

// 에러 처리 테스트
app.use((req, res, next) => {
  // 보통은 에러가 발생 가능한 코드를 try~catch 문으로 감싸줌
  try {
    // console.log(asdf); // 에러테스트용 - 테스트 끝나면 주석처리
    next(); // 다음 미들웨어 실행
  } catch (error) {
    next(error); // 인자값을 넣으면 에러 처리 미들웨어로 바로 넘어감
  }
});
// 에러가 발생하면 Express가 알아서 기본적인 처리를 해줌
// 1) 서버에 에러 로그를 찍고
// 2) 응답 코드 500과 함께 에러 로그가 찍힌 페이지를 내려줌
// 근데 에러가 찍힌 페이지는 사용자가 보기엔 좋지 않음 => 에러 처리 미들웨어 작성


// 라우팅 하기(라우터 만들기)
// app.get('주소', 콜백): 이 '주소'로 GET 요청이 올 때 콜백 함수로 어떤 동작을 할 지 지정
app.get('/', (req, res) => { // GET 요청이고 url이 '/' 일 때
  // 공통 로직 존재한다면 중복 코드 발생 = 미들웨어
  // console.log('모든 요청에 실행하고 싶어요.');

  // 응답 내려주기
  // res.send('<h1>hello express</h1>'); // res.writeHead(200, {  }) + res.end() 를 합친것!
  
  // html 파일 서빙하기
  res.sendFile(path.join(__dirname, '/index.html')); // snedFile 함수 안에서 fs 모듈로 html 파일을 읽어서 부름 라이브러리체고

  // 코린이들이 자주하는 실수
  // 한 라우터에서 여러 개의 응답을 보내면?
  // Cannot set headers after they are sent to the client 에러 발생
  // 해석: 클라이언트에 헤더를 보낸 후에는 헤더를 설정할 수 없습니다.
  // 요청 한 번에 응답은 한 번만 해야됨

  // Express 서버에서 응답을 보내는 다양한 방법
  // res.send('간단한 문자나 html내려줄때'); // ex)res.send('<h1>hello express</h1>');
  // res.sendFile('html 파일 내려줄 때'); // ex) res.sendFile(path.join(__dirname, '/index.html'));
  // res.json({ name: 'goni', age:28 }); // res.writeHead(200, {...}) + res.end(JSON.stringfy({...})) 를 합친것
  // res.render();
  // 그 외 end(), redirect()도 있음

  // 여기서 참고로
  // sendFile() / render()는 SSR 방식의 웹 서버 만들 때 많이 사용
  // json() CSR 방식의 API 서버 만들 때 많이 사용

  // 햇갈려하는 것들 
  // return을 써야 함수가 종료됨
  console.log('응답을 보낸 다음 코드들도 실행됨');
});

// Quiz: 라우팅
// 누가 /about 으로 GET 요청을 하면 'about 페이지 입니다.' 라고 보여주기
// 누가 /login 으로 POST 요청을 하면 'login 성공' 라고 응답 내려주기
app.get('/about', (req, res) => {
  // console.log('모든 요청에 실행하고 싶어요.');
  res.send('<h3>about 페이지 입니다.</h3>');
});
app.post('/login', (req, res) => {
  // console.log('모든 요청에 실행하고 싶어요.');
  // 로그인 처리 코드입니다~~~~
  res.send('로그인 성공');
});

// 라우트 매개변수(route parameter, req.params)
app.get('/category/:name', (req, res) => {
  res.send(`<h3>hello ${req.params.name}</h3>`);
});

// 와일드카드(*) 라우터
// 그 외 모든 GET 요청 주소에 대한 처리
// 순서에 주의 앞쪽에 작성하면 다른 라우터가 처리되기 전에 얘가 먼저 실행됨 딴거 작동 x
// app.get('*', (req, res) => {
//   res.send('모든 GET 요청에 대해 처리');
// });

// 404 처리 미들웨어
// 따로 404 처리 안만들면 Express가 알아서 기본적인 처리해줌
app.use((req, res, next) => {
  res.status(404).send('404 not found~~~~.')
})

// 에러 처리 미들 웨어
// (중요!)반드시 매개변수 4개를 다 작성해야 됨!!
app.use((error, req, res, next)=>{
  console.error(error);
  // res.send('에러가 나서 보여주는 내용입니다~'); // 응답 코드를 따로 작성하지 않으면 기본값 200
  res.status(500).send('에러가 나서 보여주는 내용입니다~'); // status: 
});


// 서버 연결
// app.Listen(포트, 콜백): 몇 번 포트에서 서버를 실행할 지 지정
// app.listen(3000, () => { // 하드코딩 방식 지양
app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행');
});
// 서버 실행방법 3가지
// 1) node app.js
// 2) nodemon app
// 3) npm start (package.json 에 스크립트 만들어서)