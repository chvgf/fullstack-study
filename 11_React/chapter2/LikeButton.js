// 리액트 함수 컴포넌트
// only JS로만 짠 코드(나중에는 JSX 사용)
function LikeButton() {
  const [isClicked, setIsClicked] = React.useState(false);

  return React.createElement(
    'button', //태그
    { onClick: () => setIsClicked(true) }, //속성
    isClicked ? 'You liked this' : 'Like' // 자식 요소들
  ); // 리액트 엘리먼트 반환
}

const domContainer = document.querySelector('#like_button_container');
const root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(LikeButton));