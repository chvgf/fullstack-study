import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: calc(100% - 32px);
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 8px;
  background: white;
  cursor: pointer;

  &:hover {
    background: lightgrey;
  }
`;

const TitleText = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

// 글의 제목만 표시해주는 컴포넌트
function PostListItem(props) {
  const { post: { id, title } } = props;

  const navigate = useNavigate();

  return (
    <Wrapper onClick={() => {
      navigate(`/post/${id}`); // 여기서 id 값은 URL 파라미터로 사용할 예정
    }}>
      <TitleText>{title}</TitleText>
    </Wrapper>
  );
}

export default PostListItem;