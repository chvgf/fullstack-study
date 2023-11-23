const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const users = {}; // 사용자 정보 데이터 저장용
// (참고) DB가 아닌 메모리에 저장되는 것이라 서버를 재시작하면 정보가 지워짐

// 서버는 요청을 받으면 응답을 해야됨
// 브라우저 주소창에 주소를 입력하면 GET 요청을 보내는 것
// http://localhost:8082 를 입력하면 url은 '/', method는 GET
http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET') {
      if (req.url === '/') { // GET 요청이고 url이 '/'일 때
        // const data = await fs.readFile('./restFront.html');
        // (참고) 서버 파일이 루트 경로에 없는 경우 서버 실행 위치에 따라 상대 경로가 문제될 수 있음, path를 같이 사용하면 좋음
        const data = await fs.readFile(path.join(__dirname, 'restFront.html'));
        res.writeHead(200, { 'content': 'text/html; charset=utf-8' }); // 200: OK (성공)
        return res.end(data); // 응답으로 페이지를 내려줌
      }
      // Quiz: Get 요청이고 url이 '/about' 일 때
      if (req.url === '/about') {
        const data = await fs.readFile(path.join(__dirname, 'about.html'));
        res.writeHead(200, { 'content': 'text/html; charset=utf-8' });
        return res.end(data);
      }
      if (req.url === '/users') {
        res.writeHead(200, { 'content': 'application/json; charset=utf-8' }); // application/json: 컨텐츠 타입은 json
        return res.end(JSON.stringify(users)); // 응답으로 json 포맷으로 바꿔서 내려줌
      }
      // GET 요청이면서 /도 /about도 /users도 아니면
      console.log(req.url);
      try {
        // const data = await fs.readFile(`.${req.url}`); // 상대 경로 사용
        const data = await fs.readFile(path.join(__dirname, req.url)); // 안전한 방식
        return res.end(data); // 응답으로 css랑 js 를 보냄
      } catch (error) {
        console.error(error);
      }
    } else if (req.method === 'POST') {
      if (req.url === '/user') { // 폼 제출(submit) 시 실행, 사용자를 등록하는 로직
        let body = '';
        // 요청의 body를 stream 형식으로 받음
        req.on('data', (data) => {
          body += data;
        });
        // 요청의 body를 다 받은 후 실행됨
        return req.on('end', () => {
          console.log('POST 본문(Body):', body);
          const { name } = JSON.parse(body); // json 문자열을 객체로 변환
          const id = Date.now(); // id값 임의 생성
          users[id] = name;
          res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' }); // 201: Created(생성됨) ..200써도 상관없음 의미가 굳이 필요하면201
          res.end('등록 성공'); // Response에서 응답 데이터 확인 가능
        });
      }
    } else if (req.method === 'PUT') {
      // console.log(req.url); // /user/1700576444873
      // console.log(req.url.split('/')); // [ '', 'user', '1700576444873' ]
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2]; // url에서 id 추출
        let body = '';
        req.on('data', (data) => {
          body += data;
        });
        return req.on('end', () => {
          console.log('PUT 본문(Body):', body);
          users[key] = JSON.parse(body).name;
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end(JSON.stringify(users));
        });
      }
    } else if (req.method === 'DELETE') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2]; // url에서 id 추출
        delete users[key];
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end(JSON.stringify(users));
      }
    }

    // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
    res.writeHead(404);
    return res.end('NOT FOUND')
  } catch (error) {
    res.writeHead(500, { 'content-Type': 'text/plain; charset=utf-8' }); // 500: Internal Server Error(서버 에러)
    res.end(error.message);
  }
})
  .listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다.');
  });

// (참고) HTTP 상태 코드
// https://developer.mozilla.org/ko/docs/Web/HTTP/Status

// 위 코드는 서버의 동작 흐름(맥락)만 이해할 것
// 기본적으로는 Node.js의 http 모듈만으로도 서버 구성이 가능하나 코드가 상당히 복잡하고 지저분
// 실제로는 웹 프레임워크 사용하여 더 효율적으로 작성
// 예: Express, koa, fastify 등