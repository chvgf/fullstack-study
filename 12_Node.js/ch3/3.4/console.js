// 다양한 console 객체의 메서드
// 브라우저의 console 객체와 매우 유사(똑같지 않음)
const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
  outside: {
    inside: {
      key: 'value'
    }
  }
};

console.time('전체시간'); // 시간 로깅 start

console.log('평범한 로그입니다. 쉼표로 구분해 여러 값을 찍을 수 있습니다.');
console.log(string, number, boolean);
console.error('에러 메시지는 console.error에 담아주세요.'); // 에러 로깅

// 테이블 형태로 출력
console.table({ name: '제로', birth: 1994 });
console.table([{ name: '제로', birth: 1994 }, { name: 'hero', birth: 1988 }]);

// 객체 로깅 시 옵션을 줄 수 있음
console.dir(obj, { colors: false, depth: 2 })
console.dir(obj, { colors: true, depth: 2 })
console.dir(obj, { colors: false, depth: 1 })
console.dir(obj, { colors: true, depth: 1 })

// 시간 측정하기
console.time('시간측정');
for (let i = 0; i < 100000; i++) {}
console.timeEnd('시간측정');

function b() {
  console.trace('에러 위치 추적'); // 함수 안에서 쓰면 호출 스택을 보여줌
}
function a() {
  b();
}
a();

console.timeEnd('전체시간'); // 시간 로깅 end