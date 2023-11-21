const fs = require('fs');

setInterval(() => {
  // 노드가 제공하는 비동기 메서드에 들어가는 콜백 함수에서 에러 처리 가능
  fs.unlink('./abcdefg.js', (err) => {
    // 에러 발생 시 첫번째 파라미터로 에러 객체를 받아옴
    if (err) {
      console.error(err);
    }
  });

}, 1000);