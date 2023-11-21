let i = 1;
setInterval(() => {
  if (i === 5) {
    console.log('종료!');
    // process.exit(); // 코드가 없거나 0이면 정상 종료를 의미
    process.exit(1); // 그 이외의 코드(주로 1)는 비정상 종료를 의미, 서버에서 에러 났다는 것을 알려주고 강제종료 시 사용
  }
  console.log(i);
  i += 1;
}, 1000);