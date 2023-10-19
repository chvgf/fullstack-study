import { useState } from "react";

function SetStateMerge() {
  const [result, setResult] = useState(2);

  const handleAdd = () => {
    console.log('handleAdd Start');
    // setResult(result + 5);
    setResult((result) => { return result + 5 });

    console.log('handleAdd end');
  };
  const handleSub = () => {
    console.log('handleSub Start');
    setResult(result - 3);
    console.log('handleSub end');
  };
  const handleMul = () => {
    console.log('handleMul Start');
    // setResult(result * 2);
    setResult((result) => { return result * 2 });
    console.log('handleMul end');
  };
  const handleDiv = () => {
    console.log('handleDiv Start');
    setResult(result / 2);
    console.log('handleDiv end');
  };
  const handleMixCalc = () => {
    handleAdd(); // 2 + 5 = 7
    handleMul(); // 7 * 2 = 14를 기대
    // 근데 결과는 4가 나옴 => handleMul()만 실행됨
  };
  // setState() 함수 안에 그냥 인자값 넣을 때와 콜백 함수를 넣을 때의 차이
  // setState()는 비동기로 처리됨(=비동기 함수)
  // 그래서 하나의 state를 동시에 여기저기서 수정하려고 할 때 가장 마지막 set함수만 실행되는 문제 발생
  // 해결책: state와 상관없는 새로운 값을 넣는 것이 아니면 콜백 형태로 쓸 것을 권장(비동기를 순차적으로 처리해줌)
  // 이 때 콜백 함수의 첫번째 매개 변수로 이전 state를 받아옴

  return (
    <div>
      <p>계산 결과: {result}</p>
      <button onClick={handleAdd}>+ 5</button>
      <button onClick={handleSub}>- 3</button>
      <button onClick={handleMul}>* 2</button>
      <button onClick={handleDiv}>/ 2</button>
      <button onClick={handleMixCalc}>MixCalc</button>
    </div>
  );
};

export default SetStateMerge;
