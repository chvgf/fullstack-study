import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function EffectSummary(props) {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // (공통사항)
  // 모든 effect는 HTML DOM 렌더링 직후에 실행됨
  // 마운트 시에는 무조건 실행됨
  // return 되는 함수(뒷정리 함수, clean-up)는 언마운트 시에는 무조건 실행됨

  // 렌더링 될 때마다(마운트 + 업데이트) 매번 실행됨
  useEffect(() => {
    console.log('인자값 x: 나는 매번 실행됨');

    return () => {
      // 마운트를 제외한 해당 effect가 실행되기 전과 언마운트 시 실행됨
    };
  });

  // 마운트 + count가 변할때마다 실행됨
  useEffect(() => {
    console.log('%ccount가 변함', 'color: red; background: #ffdae0'); // '%c' css 줌

    return () => {
      // 마운트를 제외한 해당 effect가 실행되기 전과 언마운트 시 실행됨
    };
  }, [count]);

  // 마운트 + name이 변할때마다 실행됨
  useEffect(() => {
    console.log('%cname이 변함', 'color: blue; background: #e2d6fd');

    return () => {
      // 마운트를 제외한 해당 effect가 실행되기 전과 언마운트 시 실행됨
    };
  }, [name]);

  // 마운트 + name + count 
  useEffect(() => {
    console.log('%cname + count 둘다', 'color: green; background: #e2d6fd');

    return () => {
      // 마운트를 제외한 해당 effect가 실행되기 전과 언마운트 시 실행됨
    };
  }, [name, count]);

  // 마운트 될 때만 실행됨
  useEffect(() => {
    console.log('%c마운트 될 때만 실행', 'color: yellow; background: black');

    return () => {
      // 언마운트 시 실행됨
      console.log('%c언마운트 될 때만 실행', 'color: red; background: black');
    };
  }, []);

  // useEffect() 가 실행되는 모든 케이스를 정리
  return (
    <>
      <p>카운트: {count}</p>
      <button onClick={() => { setCount(count + 1) }}>카운트 +1</button>
      <p>이름: {name}</p>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
    </>
  );
}

export default EffectSummary;