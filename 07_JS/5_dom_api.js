// querySelector('CSS 선택자')
// HTML에서 해당 요소를 검색하여 찾은 첫 번째 요소 하나만 반환
// 요소를 찾지 못하면 null을 반환
const boxEl = document.querySelector('.box');
console.log(boxEl);

// 요소에 이벤트 리스너 등록하기
// 이벤트: 마우스(click), 스크롤(scroll), 키보드(keydown)등 다양함
// addEventListener() 메소드:
// 해당 요소에 지정한 이벤트(Event)가 발생하는 지 듣고(Listen) 있다가
// 실제 이벤트가 발생하면 연결된 함수(Handler)를 실행
boxEl.addEventListener('click',function () {
  console.log('click!!');

  // classList 속성: 요소의 HTML class 속성에 대한 제어 명령이 포함
  boxEl.classList.add('active'); // 요소에 active라는 클래스를 추가

  let hasActive = boxEl.classList.contains('active'); // 요소에 active라는 클래스값이 있는 지 확인
  console.log(hasActive);

  boxEl.classList.remove('active'); // 요소에 active라는 클래스가 있으면 제거
  hasActive = boxEl.classList.contains('active'); 
  console.log(hasActive);
});
// 활용 예: active라는 클래스에 미리 스타일 지정하고 클릭한 특정 요소에 스타일을 적용할 때

// (참고) 한 번 정도 슥 읽어볼 것!
// 이벤트 종류: https://www.w3schools.com/jsref/dom_obj_event.asp
// HTML DOM 속성/메소드: https://www.w3schools.com/jsref/dom_obj_document.asp