import React, { useState } from 'react';
import styled from 'styled-components';
import { MdAdd /* 쓰고싶은 아이콘 이 안에 하나씩 추가 */ } from "react-icons/md";

const TodoInsertWrapper = styled.form`
  display: flex;
  background: #495057;
`;

const StyledInput = styled.input`
  /* 기본 스타일 초기화 */
  background: none;
  outline: none;
  border: none;
  padding: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.5;
  color: white;
  flex: 1; // 버튼을 제외한 영역을 모두 차지하기

  &::placeholder {
    color: #dee2e6;

  }
`;

const StyledButton = styled.button`
  border: none;
  background: #868e96;
  color: white;
  padding: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.2s background;

  &:hover {
  background: #adb5bd;
  }
`;

// 새로운 항목을 입력하고 추가할 수 있는 컴포넌트
// state를 통해 input의 상태를 관리
function TodoInsert(props) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value)


  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사 추가
    if (!value) { // '', null, undefined...
      alert('무엇을 할 지 내용을 입력하세요');
      return;
    }

    props.onInsert(value);
    setValue(''); // value 초기화
  };
  return (
    // form 태그 사용 시 input에서 엔터키를 눌렀을 때도 submit 이벤트가 발생
    // (참고) 일반적으로 keyUp 이벤트를 통해 엔터키를 감지하는 로직을 작성
    <TodoInsertWrapper onSubmit={handleSubmit}>
      <StyledInput
        value={value}
        onChange={handleChange}
        type='text'
        placeholder='할 일을 입력하세요.'
      />
      <StyledButton type='submit'>
        <MdAdd />
      </StyledButton>
    </TodoInsertWrapper>
  );
}

export default TodoInsert;


// HTML 웹 스토리지란?
// 브라우저에서 제공하는 데이터 저장소
// 사용자의 브라우저 내에 로컬로 데이터를 저장할 수 있음
// key-value 형태로 저장
// 최대 5MB까지 문자만 저장가능
// 콘솔 창에서 연습해보기

// 웹 스토리지는 origin(도메인 및 프로토콜)당입니다.
// 같은 출처의 모든 페이지는 동일한 데이터를 저장하고 액세스할 수 있습니다.

// HTML 웹 스토리지 객체
// HTML 웹 스토리지는 클라이언트에 데이터를 저장하기 위한 두 가지 객체를 제공합니다.
// window.localStorage - 만료 날짜 없이 데이터를 저장
// window.sessionStorage - 한 세션에 대한 데이터 저장(브라우저 탭을 닫으면 데이터가 손실됨)