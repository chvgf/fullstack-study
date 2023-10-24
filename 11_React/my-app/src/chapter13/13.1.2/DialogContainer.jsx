import React from 'react';
import Dialog from './Dialog';

function DialogContainer(props) {
  return (
    <>
      {/* WelcomeDialog */}
      <Dialog 
        title="어서오세요"
        message="저희 우주선을 찾아주셔서 감사합니다!"
        color="blue"
      />

      {/* WelcomeDialog */}
      <Dialog
        title="경고합니다"
        message="관계자외 출입금지"
        color="red"
      />
    </>
  );
}

export default DialogContainer;