import React from 'react';
import { useState } from 'react';

// 하위(자식) 엘리먼트를 감싸서 카드 형태로 보여주는 범용적인 컴포넌트
function Card(props) {
  const { title, backgroundColor, children } = props;
  const [aaa, setAaa] = useState();
  const FunAa = (e) => {
    setAaa(e.target.value);
  };

  return (
    <div style={{
      margin: 8,
      padding: 8,
      borderRadius: 8,
      boxShadow: '0px 0px 4px gray',
      backgroundColor: backgroundColor || 'lightgray', // backgroundColor에 falsy값이 들어오면 lightgray를 기본값으로 사용
    }}>
      {/* 조건부 렌더링 */}
      {title &&
        <h1 style={{ borderBottom: '1px solid gray' }}>{title}</h1>
      }
      {children}
      <label>깔깔
        <input type="text" value={aaa} onChange={FunAa} />
      </label>
      <button>
        깔깔추가
      </button>
    </div>
  );
}

export default Card;