import React from "react";
function JsxUse() {
  // JSX의 사용법(문법)
  // 1. 꼭 닫혀야 하는 태그
  // const emement = (
  //   <div>
  //     {/* <div> */}
  //       {/* <input> */}
  //       {/* <br> */}

  //       {/* HTML에서는 input 또는 br 태그를 사용 할 때 닫지 않고 사용가능 하지만 리액트에서는 태그를 열었으면 무조건 닫아야 함 */}
  //       <div></div>
  //       <input />
  //       <br />
  //   </div>
  // );


  // 2. 꼭 감싸져야만 하는 태그
  // 두개 이상의 태그는 무조건 하나의 태그로 감싸져있어야 함
  const element = (
    // <div>안녕하세요.</div>
    // <div>안녕히계세요.</div>

    // 반드시 하나의 부모태그로 감싸져야 함
    // <div>
    //   <div>안녕하세요.</div>
    //   <div>안녕히계세요.</div>
    // </div>

    // 이렇게 단순히 감싸기 위하여 불필요한 div로 감싸는게 별로 좋지 않을 수도 있음
    // HTML 중첩 구조가 복잡해지며 그에 따른 스타일 설정을 할 때도 복잡해 질 수 있음
    // 이럴때 사용하는 것이 React Fragment
    // 개발자 도구로 확인해 보면 별도의 엘리먼트로 나타나지 않음0
    // <React.Fragment>
    //   <div>안녕하세요.</div>
    //   <div>안녕히계세요.</div>
    // </React.Fragment>

    // React.Frangment는 생략도 가능 빈괄호 하면 ok
    <>
      <div>안녕하세요.</div>
      <div>안녕히계세요.</div>
    </>
  );

  return element;
}

export default JsxUse; // JsxUse 컴포넌트(=함수) 내보내기
// export를 해줘야 다른 곳에서 import 해서 사용 가능