const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// 문자열로 된 쿠키를 객체로 바꿔주는 함수
const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie); // mycookie=test; => { mycookie: 'test' }

  console.log(req.url);
  // 주소가 /login으로 시작하는 경우
  if (req.url.startsWith('/login')) {
    const url = new URL(req.url, 'http://localhost:8084'); // 상대 경로 앞에 붙여줄 base url
    const name = url.searchParams.get('name'); // 쿼리스트링에서 name 추출
    const expires = new Date();
    // 쿠키 유효 시간을 현재시간 + 5분으로 설정
    expires.setMinutes(expires.getMinutes() + 1); // 테스트: 1분 뒤 쿠키 삭제됨

    console.log(name); // 한글 일 때 encodeURIComponent로 인코딩 안하면 쿠키에 이상한 문자 들어갔다고 에러 발생
    res.writeHead(302, { // 302: 리다이렉션
      location: '/', // 이 주소로 돌려보내라
      'set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; path=/`
      // 쿠키 옵션
      // Expires: 만료 기한, 브라우저가 자동으로 서버에 쿠키를 보내주는데 만료된 쿠키는 제거돼서 안보내짐, 안적으면 세션쿠키가 됨
      // HttpOnly: JS에서 쿠키에 접근하지 못하게 설정, 보안상 설정하는 것이 좋음
      // Path: /, 즉, 루트 아래에 있는 주소에서 이 쿠키를 다 쓸 수 있음
    });
    res.end();
    // name이라는 쿠키가 있는 경우
  } else if (cookies.name) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${cookies.name}님 안녕하세요`);
    // name이라는 쿠키가 없는 경우(처음 접속 시, 로그아웃 상태)
  } else {
    try {
      const data = await fs.readFile(path.join(__dirname, 'cookie2.html'));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(error.message);
    }
  }
})
  .listen(8084, () => {
    console.log('8084번 포트에서 서버 대기중입니다!');
  });

// 로그인이 잘 유지되다가 풀린 경우가 발생하면 쿠키가 만료된 것임
// (로그인 구현에 쿠키를 썼을 때만 해당)
// 실습: github에 로그인하고 쿠키 날려보기

// 근데 실제로는 쿠키만 써서 로그인을 구현하지 않음
// 개발자 도구만 쓸 줄 알면 정보가 다 보이고 조작도 가능
// 그래서 중요한 정보는 서버에 들고 있고 그 정보에 접속할 수 있는 키값(=세션 ID)만
// 브라우저로 보내서 쿠키에 넣는데 그게 바로 세션 방식