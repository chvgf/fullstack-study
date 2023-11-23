// http 모듈: http 서버를 만들 수 있는 모듈을 노드가 제공
const http = require('http');

// 서버 만드는 코드
const server = http.createServer((req, res) => { // 서버로 요청이 오면 이 콜백 함수가 실행됨
  // req: 요청(requset)객체, res: 응답(reponse)객체

  // 여기에 어떻게 응답할지 코드로 작성하면 됨

  // 응답에 대한 헤더(정보를 기록) 작성
  // HTML인지 문자열인지 구분 못하는 브라우저가(예: Safari) 있을 수 있어 콘텐츠 타입을 명확히 명시
  // 한글도 정상적인 표시를 위해 charset 지정
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  // 응답에 데이터 작성
  res.write('<h1>Hello Node!</h1>'); // 응답 내용을 적고
  res.end('<p>Hello server!</p>'); // 응답 마무리(내용을 넣어도 됨)
})
  .listen(8080, () => { // 서버가 연결되면 실행할 콜백 함수
    console.log('8080번 포트에서 서버 대기 중입니다.!');
  });
// node로 서버 실행할 때 프로세스에 올라감
// 8080포트에 서버 연결 => http://localhost:8080/

// (중요) 서버 코드를 수정하면 항상 서버를 껐다가 다시 켜야 반영됨
// 개발시에는 번거로우므로 추후 nodemon 사용할 예정

// (참고) PORT(문 또는 구멍에 비유)
// 컴퓨터는 랜선을 꽂아 인터넷이 연결되면 IP주소를 통해 외부 컴퓨터들과 통신을 할 수 있게 설계됨
// 기본적으로는 다른 컴퓨터에 마음대로 접속 불가
// 컴퓨터에 문을 하나 달아놓으면 그 문으로 다른 컴퓨터들이 접속 가능
// 내 마음대로 오픈할 수 있는 포트가 6만개 정도 존재
// 내 컴퓨터에 서버를 여러개 만들고 포트 번호만 달리하면 동시에 여러 서버를 띄울 수 있음

// 에러 처리 습관
// on(): 이벤트 리스너 붙이기
server.on('error', (err) => {
  console.error(err);
});

// (테스또) 서버 만드는 코드 - 포트 번호를 다르게 하면 다른 서버 하나 더 띄우기 가능
http.createServer((req, res) => {
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello server!</p>');
})
  .listen(8081, () => {
    console.log('8081번 포트에서 서버 대기 중입니다.!');
  });

// 근데 서버 코드에 html을 직접 적는 것은 비효율적
// 코드 쓰기도 불편하고 가독성도 떨어짐
// html 파일을 만들고 읽어서 응답으로 전송하기 = server2 예제