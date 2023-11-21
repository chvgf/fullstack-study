const fs = require('fs');

console.log('시작');

let data = fs.readFileSync('./readme.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('3번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('4번', data.toString());

console.log('끝');

// 동기 방식이라 순서대로 실행됨
// 동시에 실행될 수 없어서 비효율적이고 실제로 서버 구동 후에는 문제가 많이 생길 수 있어 거의 안씀
// 문제란? sync.js 실행 요청이 여러번 들어오면 하나의 작업이 끝날 때 까지 다른 사람들이 기다려야 한다.