import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../ui/Button';
import CommentList from '../list/CommentList';
import TextInput from '../ui/TextInput';
import data from "../../data.json";

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 720px;

  & > * {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

const PostContainer = styled.div`
  padding: 8px 16px;
  border: 1px solid grey;
  border-radius: 8px;
`;

const TitleText = styled.p`
  font-size: 28px;
  font-weight: 500;
`;

const ContentText = styled.p`
  font-size: 20px;
  line-height: 32px;
  white-space: pre-wrap;
`;

const CommentLabel = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

// 글을 볼 수 있게 해주는 페이지(=컴포넌트)
function PostViewPage(props) {
  const navigate = useNavigate();

  // 댓글 내용을 위한 state
  const [comment, setComment] = useState('');

  // URL 파라미터로 전달받은 글의 postId값 가져오기
  // useParams(): 사용자가 URL 파라미터에 입력한 값을 가져올 수 있음
  console.log(useParams());
  const { postId } = useParams();

  // 전체 데이터에서 해당되는 글 찾기(배열의 find() 사용)
  const post = data.find((item) => {
    return item.id === postId;
  });

  return (
    <Wrapper>
      <Container>
        <Button
          title="뒤로 가기"
          coClick={() => {
            navigate('/');
          }}
        />
        <PostContainer>
          <TitleText>{post.title}</TitleText>
          <ContentText>{post.content}</ContentText>
        </PostContainer>

        <CommentLabel>댓글</CommentLabel>
        <CommentList comments={post.comments} />

        {/* 댓글 입력 */}
        <TextInput
          height={40}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        {/* 댓글 작성 버튼 */}
        <Button
          title="댓글 등록"
          coClick={() => {
            navigate('/');
          }}
        />
      </Container>
    </Wrapper>
  );
}

export default PostViewPage;