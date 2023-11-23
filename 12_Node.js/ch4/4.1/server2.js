const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
  try {
    res.writeHead(200, { 'content-Type': 'text/html; charset=utf-8' });
    const data = await fs.readFile('./server2.html'); // 프로미스 방식의 비동기 함수
    res.end(data); // html문서를 따로 만들고 그 파일을 읽어서 전송하는게 더 효율적
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'content-Type': 'text/plain; charset=utf-8' }) // text/plain의 의미는 콘텐츠 타입은 일반 문자열이다
    res.end(error.message);
  }
})
  .listen(8081, () => {
    console.log('8081번 포트에서 서버 대기 중입니다.!');
  });