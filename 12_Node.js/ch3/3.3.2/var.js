//  Node의 CommonJs 모듈 시스템

const odd = '홀수입니다.'
const even = '짝수입니다.'
const jw = {
  name:'jw',
  age:'28',
}
const n = function (q, w, e) {
  return q + w + e;
}
// 선언한 변수들을 다른 파일에서 쓸 수 있게 모듈로 만듦
// module.exports 는 파일 안에서 단 한번만 쓸 수 있음
// module.exports = odd; // 이렇게 쓰면 한 개만 내보낼 수 있음
// 여러 개를 내보내려면 객체를 module.exports에 대입
module.exports = {
  odd,
  even,
  jw,
  n
};

// (참고만 할 것)
// exports.odd = odd;
// exports.even = even;
// 이렇게 쓰면 module 키워드 생략 가능
// 근데 module.exports 방식과 같이 쓸 수 없다.
// module.exports === exports === {} 초기값이 빈 객체