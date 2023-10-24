// 개념 설명용 예제
function App() {
  return <Toolbar theme="dark" />
}

function Toolbar(props) {
  // Toolbar 컴포넌트는 테마 prop를 받아서 ThemeButton에 전달해야함
  // 앱 안의 모든 버튼이 테마를 알아야 한다면 이 정보를 일일이 넘기는 것은 비효율적임
  // 특히 트리의 구조가 싶어질 수록 매우 비효율적
  // 이런 과정을 Prop Drilling 이라고 부름(프로퍼티 내려꽂기)
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

function ThemedButton(props) {
  return <Button theme={props.theme} />;
}
