import { createGlobalStyle } from "styled-components";
import reset, { Reset } from "styled-reset";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";

// 패키지 설치
// npm install styled-components styled-reset react-icons

// 패키지 설명
// 1) styled-reset: reset css
// 2) react-icons: 리액트에서 다양한 아이콘을 쓸 수 있는 라이브러리
// SVG 형태의 아이콘을 리액트 컴포넌트처럼 쉽게 사용
// props 또는 CSS 스타일로 커스텀 가능
// 아이콘 리스트와 사용법은 공식 문서 참고: https://github.com/react-icons/react-icons#readme , https://react-icons.github.io/react-icons

// 글로벌(공통) 스타일 적용과 reset css 적용
// 글로벌(공통) 스타일 작성은 index.css에서 해도 무방하지만
// styled-components 를 사용해서 적용을 하고싶다면
// createGlobbalStyle을 이용하여 컴포넌트를 만들고 가장 첫번째로 랜더링하면 됨
const GlobalStyle = createGlobalStyle`
/* reset css */  /* 리셋 css 방법2 */
  ${reset}

/* 글로벌(공통 스타일) */
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <>
      {/* <Reset /> */} {/* 리셋 css 방법1 */}
      <GlobalStyle /> {/* 리셋 css 방법2 */}
      
      <TodoTemplate>
        <TodoInsert />
      </TodoTemplate>
    </>
  );
}

export default App;
