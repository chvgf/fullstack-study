// 타이머 메서드 3가지
// 콜백 함수를 백그라운드로 보내는 대표적인 비동기 함수들
// 타이머를 만들면 타이머의 아이디를 반환함
// 그리고 변수에 저장을 해 놔야 타이머 취소가 가능
const timeout = setTimeout(() => {
  console.log('1.5초 후 실행');
}, 1500)

const interval = setInterval(() => {
  console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(() => {
  console.log('실행되지 않습니다.');
}, 3000);

setTimeout(() => {
  clearTimeout(timeout2);
  clearInterval(interval);
}, 2500);

// Node.js 에만 있는 특별한 타이머 
// 즉시 실행인데 굳이 쓰는 이유? 백그라운드로 보내서 동시에 실행시킬 수 있음
const immediate = setImmediate(() => {
  console.log('즉시 실행');
});

const immediate2 = setImmediate(() => { // 호출스택
  console.log('실행되지 않습니다.'); // 백그라운드로 넘어가는 함수
});

// 즉시 실행인데 어떻게 취소가 가능하지??
clearImmediate(immediate2); // 호출스택 -> 백그라운드보다 우선이므로 백그라운드 것이 실행되기 전에 취소가능