setInterval(() => {
  console.log('시작');
  throw new Error('서버를 고장내주마!'); // 에러 발생 시 멈춰버림
}, 1000);