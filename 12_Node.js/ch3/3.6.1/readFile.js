// fs 모듈: 파일 시스템에 접근하는 모듈
// 브라우저에서는 접근이 안되는데 노드에서는 가능
// 파일/폴더 생성, 삭제, 읽기, 쓰기 가능
const fs = require('fs');
const util = require('util');

// 파일 읽기
// 인자값: 파일 경로, 파일을 읽었을 때 실행할 콜백 함수
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data); // 바이너리 데이터(2진법)가 출력됨 - 컴퓨터가 다룰 수 있는 데이터(0 또는 1)
  console.log(data.toString()); // 사람이 읽을 수 있게 바꿈
});

const readFilePro = util.promisify(fs.readFile);
readFilePro('./readme.txt')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });