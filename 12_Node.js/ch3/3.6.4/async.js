const fs = require('fs');

console.log('시작');

fs.readFile('./readme.txt', (err, data) => {
  if (err)  throw err;
    console.log('1번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
  if (err)  throw err;
    console.log('2번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
  if (err)  throw err;
    console.log('3번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
  if (err)  throw err;
    console.log('4번', data.toString());
});

console.log('끝');

// 매 실행할 때마다 순서가 바뀜
// readFile()은 비동기 함수라서 콜백 함수들은 백드라운드로 보내고 동시에 실행됨
// 누가 먼저 끝날지는 OS가 판단하여 먼저 읽은 순서대로 완료 처리

// 순서대로 실행하고 싶다면? 2가지 방법
// 1) 동기 메서드 사용
// 2) 비동기 메서드로 순서 유지하기(콜백 또는 프로미스)