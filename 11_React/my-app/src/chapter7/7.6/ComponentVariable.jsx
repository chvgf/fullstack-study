import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';

// 리액트에서 사용하는 변수들에 대해 알아보자

// 전역변수
// 렌더링과 상관없는 "고정값"들은 전역 변수로 선언
// 보통 상수 지정 시
const globalConstantVar = 1;

function ComponentVariable(props) {
  console.log('컴포넌트 렌더링!!');

  // 지역 상태 (local state)
  // 값이 변경되면 재렌더링이 발생
  const [count, setCount] = useState(globalConstantVar);
  console.log('count', count);

  // 지역 변수
  // 값은 변경되지만 재렌더링이 되지 않음
  // 렌더링 될 때마다 값이 초기화
  let id = 1;
  console.log('id', id);

  // useRef()로 만든 지역 변수
  // 값은 변경되지만 재렌더링이 되지 않음
  // => 렌더링과 관련이 없는 데이터에 대한 변수 선언은 useRef()를 사용
  // => 불필요한 렌더링 방지를 위해 렌더링과 관련이 있는 데이터만 state로 사용!!
  // 매번 렌더링 될 때마다 항상 같은 레퍼런스 객체를 반환(전체 생명주기에 걸쳐 유지됨)
  // => 그래서 렌더링이 될 때 값이 초기화 되지 않음  이게 결론이고만~'
  const idRef = useRef(1);
  console.log('idRef', idRef);

  return (
    <>
      <p>총 {count}번 렌더링</p>
      <button onClick={() => { setCount(count + 1); }}>
        count 업데이트 <br />
        (재렌더링 발생)
      </button>

      <p>현재 id값: {id}</p>
      <button onClick={() => {
        id++;
        console.log(id);
        idRef.current++;
      }}>
        id 업데이트 <br />
        (재렌더링 XX)
      </button>
    </>
  );
}

export default ComponentVariable;