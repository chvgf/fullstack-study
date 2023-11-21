// 아래 4개 모두 콜백 함수를 백그라운드로 보내서 비동기 처리를 하는 함수들

setImmediate(() => {
  console.log('immediate');
});

// 이미 만들어진 비동기 함수들 말고
// Node.js 환경에서 특정 코드를 (강제로) 비동기적으로 처리하고 싶을 때
// 우선순위가 높음
process.nextTick(() => {
  console.log('nextTick');
});

setTimeout(() => {
  console.log('timeout');
}, 0);

// 비동기를 간편하게 처리할 수 있도록 도와주는 객체
// 비동기 작업이 끝날 때 까지 기다렸다가 성공 시 then()에 등록한 콜백 함수를 실행할 것을 보장(약속)
// nextTick 다음으로 우선순위 높음
Promise.resolve().then(() => {
  console.log('promise');
});