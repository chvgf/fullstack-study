// url 모듈: 인터넷 주소를 쉽게 조작하도록 도와주는 모듈
const url = require('url')
console.log(url);

const {URL} = url;

// 참고로 URL은 노드 내장 객체 이기도 해서 require안하고 바로 사용 가능
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('new URL():', myURL); // URL 객체
console.log('url.format():', url.format(myURL)); // URL 객체를 다시 문자열로 변환