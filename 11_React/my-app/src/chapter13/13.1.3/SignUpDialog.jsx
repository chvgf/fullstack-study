import React from 'react';
import Dialog from './Dialog';
import { useState } from 'react';

function SignUpDialog(props) {
  const [login, setLogin] = useState('');

  const handleChange = (e) => {
    setLogin(e.target.value);
  };

  const handleSignUp = () => {
    alert(`탑승을 환영합니다. ${login}`)
  }
  return (
    <Dialog
      title="화성 탐사 프로그램"
      message="당신의 이름은?"
    >
      <input type="text" value={login} onChange={handleChange} />
      <button onClick={handleSignUp}>가입하세요!</button>
    </Dialog>

  );
}

export default SignUpDialog;