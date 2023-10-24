// 개념 설명용 예제

// Context를 이용하면 모든 컴포넌트를 일일이 통하지 않고도
// 원하는 값을 컴포넌트 트리 깊숲한 곳까지 보낼 수 있음
// 'light'를 기본값으로 하는 테마 Context를 만드는 코드
const ThemeContext = React.createContext('light');

function App() {
  // Provider를 이용해 하위 트리에 테마 값을 보내줌
  // 아무리 깊숙히 있어도, 모든 컴포넌트가 이값을 읽을 수 있음
  // 아래 예시에서는 dark를 현제 테마값으로 보내고 있음
  return (
    <ThemeContext.Provider value="dakr">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  // 이제 중간에 있는 컴포넌트가 일일이 테마를 넘겨줄 필요가 없음
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton(props) {
  // 리액트는 가장 가까이 있는 테마 Provider를 찾아 가 값을 사용함
  // 만약 해당되는 Provider가 없을 경우 기본값을 사용
  return (
    <ThemeContext.Consumer>
      {(value) => { <Button theme={value} /> }}
    </ThemeContext.Consumer>
  );
}