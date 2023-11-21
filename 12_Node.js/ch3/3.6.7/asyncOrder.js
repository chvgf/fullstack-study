const fs = require('fs');

console.log('시작');

fs.readFile('./readme.txt', (err, data) => {
  if (err) throw err;
  console.log('1번', data.toString());

    fs.readFile('./readme.txt', (err, data) => {
      if (err) throw err;
      console.log('2번', data.toString());
    

      fs.readFile('./readme.txt', (err, data) => {
        if (err) throw err;
        console.log('3번', data.toString());

        fs.readFile('./readme.txt', (err, data) => {
          if (err) throw err;
          console.log('4번', data.toString());
          console.log('끝');
        });
      });
    });
});
// 콜백 지옥

// 이렇게 쓸거면 동기식과 다른점이 무엇?
// asyncOrder를 여러번 실행하면 동시에 실행됨
// sync.js는 계속 순서가 쌓임(대기가 발생함) 