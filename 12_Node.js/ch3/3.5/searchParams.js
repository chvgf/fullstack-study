// searchParams는 search(쿼리스트링) 문자열을 다루기 쉽게 객체화 시킨 것
const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
console.log('searchParams:', myURL.searchParams);
console.log('searchParams.getAll():', myURL.searchParams.getAll('category')); // 키에 해당하는 모든 값을 가져옴
console.log('searchParams.get():', myURL.searchParams.get('limit')); // 키에 해당하는 첫번째 값만 가져옴
console.log('searchParams.has():', myURL.searchParams.has('page')); // 해당 키가 있는지 없는지를 검사

console.log('searchParams.keys():', myURL.searchParams.keys()); // 모든 키를 iterator 객체로 가져옴
console.log('searchParams.values():', myURL.searchParams.values()); // 모든 값을 iterator 객체로 가져옴

myURL.searchParams.append('filter', 'es3'); // 해당 키와 값을 추가(같은 키의 값이 있다면 유지하고 하나 더 추가)
myURL.searchParams.append('filter', 'es5');
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.set('filter', 'es6'); // append와 비슷하지만 같은 키의 값들을 모두 지우고 새로 추가
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.delete('filter'); // 해당 키를 제거
console.log(myURL.searchParams.getAll('filter'));

console.log('searchParams.toString():', myURL.searchParams.toString()); // searchParams 객체를 다시 문자열로 변환
myURL.search = myURL.searchParams.toString(); // 이 문자열을 search에 대입하면 주소 객체에 반영됨

// 예전에는 노드의 querystring 모듈 사용했으나
// 요새는 searchParams 객체 사용으로 대체됨(권장 방식)