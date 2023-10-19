import { useState } from "react";

function ConfirmButton(props) {
  const [isConfirmed, setIstConfirmed] = useState(false);

  const handleConfirm = () => {
    return setIstConfirmed(!isConfirmed);
  }

  return (
    <button 
    onClick={handleConfirm} disabled={isConfirmed}>
      {isConfirmed ? '확인됨': '확인하기'}
    </button>
  );
}

export default ConfirmButton;

// Quiz: 사용자에게 확인을 요구하는 버튼 컴포넌트
// 버튼을 누르면 '확인하기'가 '확인됨' 으로 변경되면서 버튼 비활성화 처리 해보기
// 무엇을 해야할까?
// 1) isConfirmed 라는 state 만들기
// 2) 버튼을 클릭하면 isConfirmed 상태를 바꾸는 handleConfirm() 이라는 핸들러 만들기
// 3) 삼항 연산자를 사용하여 버튼의 내용을 '확인하기' -> '확인됨' 으로 바꾸기
// 4) 버튼 비활성화 처리