// const value = require('./var');
// console.log(value);

const { odd:a, even:b, jw:c, n } = require('./var')
// console.log(a);
// console.log(b);
// console.log(c);
// console.log(n(1, 2, 3));

function checkOddOrEven(num) {
  if (num % 2) { // 홀수면
    return a;
  }
  return b;
}

// module.exports = () => { return checkOddOrEven(num)};
module.exports = checkOddOrEven;