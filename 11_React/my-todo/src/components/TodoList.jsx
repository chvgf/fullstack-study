import React from 'react';
import styled from 'styled-components';
import TodoListItem from './TodoListItem';

const TodoListWrapper = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`;


// todos 배열을 props로 받아와서 map() 함수를 사용해 여러 개의 TodoListItem 컴포넌트로 변환해 보여줌
function TodoList(props) {
  // console.log(props);
  return (
    <TodoListWrapper>
      {/* <TodoListItem />
      <TodoListItem />
      <TodoListItem /> */}

      {/* Quiz: map() 함수를 이용하여 TodoListItem으로 이루어진 배열로 변환하여 반복 렌더링 */}
      {props.todos.map((a) => {
        console.log(a);
        return <TodoListItem
          key={a.id}
          id={a.id}
          text={a.text}
          checked={a.checked}
          onRemove={props.onRemove}
          onToggle={props.onToggle} />
      })}
    </TodoListWrapper>
  );
}

export default TodoList;