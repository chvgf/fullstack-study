import React from 'react';
import { useState } from 'react';

function UnitCounter(props) {
  const { length, onLengthChange } = props;
  // 1. Local State 실습
  // 만약 UnitCounter 컴포넌트 안에서 state를 정의했다면 컴포넌트마다 각각 개별적인 상태를 갖게 됨
  // const [locallLength, setLocallLength ] = useState(1);

  return (
    <>
      {/* Local State */}
      {/* <button onClick={() => { setLocallLength( Math.max(locallLength -1, 0)) }}>-</button>
      {locallLength}
      <button onClick={() => { setLocallLength(locallLength +1); }}>+</button> */}

      {/* Shared State */}
      <button onClick={() => { onLengthChange(Math.max(length - 1, 0)) }}>-</button>
      {length}
      <button onClick={() => { onLengthChange(length + 1); }}>+</button>
    </>
  );
}

export default UnitCounter;