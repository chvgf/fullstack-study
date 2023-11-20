// const { odd, even } = require('./var'); // 구조 분해 할당 시에는 속성명이랑 변수명이랑 동일해야 한다
// const checkOddOrEvennn = require('./func.mjs'); // 변수명은 내 마음대로 지을 수 있음
import { odd, even } from "./var.mjs";
import checkOddOrEven from "./func.mjs";

function checkStringOddOrEven(str) {
  if (str.length % 2) { // 홀수면
    return odd;
  }
  return even;
}

console.log(checkOddOrEven(10));
console.log(checkStringOddOrEven('hello'));
// default export
// 파일 안에서 단 한번만 쓸 수 있음
// import 시 마음대로작명 가능