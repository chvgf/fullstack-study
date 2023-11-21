const fs = require('fs').promises;

console.log('시작');

fs.readFile('./readme.txt')
  .then((data) => {
    console.log('1번', data.toString());
    return fs.readFile('./readme.txt');
  })
  .then((data) => {
    console.log('2번', data.toString());
    return fs.readFile('./readme.txt');
  })
  .then((data) => {
    console.log('3번', data.toString());
    return fs.readFile('./readme.txt');
  })
  .then((data) => {
    console.log('4번', data.toString());
    console.log('끝');
  })

  .catch((err) => {
    console.error(err);
  });
// 프로미스 사용으로 콜백 지옥 해결


async function 어싱크() {
  try {
    const a1 = await fs.readFile('./readme.txt');
    console.log('1111111', a1.toString());
    const a2 = await fs.readFile('./readme.txt');
    console.log('2222222', a2.toString());
    const a3 = await fs.readFile('./readme.txt');
    console.log('3333333', a3.toString());
    const a4 = await fs.readFile('./readme.txt');
    console.log('4444444', a4.toString());
    console.log('어싱크끝');
  } catch (err) {
    console.error(err);
  }
};
어싱크();

const 어싱크화살표 = async () => {
  try {
    const b1 = await fs.readFile('./readme.txt');
    console.log('aaaaaaa', b1.toString());
    const b2 = await fs.readFile('./readme.txt');
    console.log('bbbbbbb', b2.toString());
    const b3 = await fs.readFile('./readme.txt');
    console.log('ccccccc', b3.toString());
    const b4 = await fs.readFile('./readme.txt');
    console.log('ddddddd', b4.toString());
    console.log('어싱크화살표끝');
  } catch (err) {
    console.error(err);
  }
};
어싱크화살표();

// 정리: 비동기 메서드로 순서를 유지하는 방식이 동시성도 살리고 순서도 지키는 좋은 방법