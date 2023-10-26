import React from 'react';
import styled from 'styled-components';

const StyledTextarea = styled.textarea`
  width: calc(100% - 32px);
  height: ${props => props.height && props.height + 'px'};
  padding: 16px;
  font-size: 16px;
  line-height: 20px;
`;

// 공통 텍스트 입력 컴포넌트
function TextInput(props) {
  const { height, value, onChange } = props;

  return (
    <StyledTextarea height={height} value={value} onChange={onChange} />
  );
}

export default TextInput;