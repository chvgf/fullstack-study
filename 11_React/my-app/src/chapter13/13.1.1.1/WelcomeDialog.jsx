import React from 'react';
import FancyBorder from './FancyBorder';

function WelcomeDialog(props) {
  return (
    <>
      <FancyBorder color="blue">
        {/* FancyBorder 컴포넌트 안에 있는 모든 자식 요소들은 children이라는 이름의 props로 전달됨 */}
        {/* 언제 쓸까? 자식 엘리먼트로 무엇이 올지 모를 떄 동적으로 전달 가능 */}
        <h1 className='Dialog-title'>
          어서오세요
        </h1>
        <p className='Dialog-message'>
          저희 우주선을 찾아주셔서 감사합니다!
        </p>
      </FancyBorder >

      <FancyBorder color="red">
        <ul>
          <li>아이템1</li>
          <li>아이템2</li>
          <li>아이템3</li>
          <li>아이템4</li>
        </ul>
      </FancyBorder >
    </>
  );
}

export default WelcomeDialog;