// Book 이라는 이름의 리액트 함수 컴포넌트 만들기
// JSX로 코딩
function Book(props) { // 컴포넌트 = 틀
  // console.log(props);
  return (
    <div>
      {/* 함수로 전달 받은 매개변수 props로부터 name이랑 numOfPage를 출력 */}
      <h1>이 책의 이름은 {props.name}입니다.</h1>
      <h2>이 책은 총 {props.numOfPage}페이지로 이뤄져 있습니다</h2>
    </div>
  ); // 리액트 엘리먼트를 반환
}

export default Book; // Book 컴포넌트 내보내기