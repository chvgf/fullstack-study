import { useState } from "react";
import Greeting from "../9.1/Greeting";

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>Login</button>
  );
}
function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>Logout</button>
  );
}

function LoginControlRefactoring() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };
  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };
  

  return (
    <>
      {/* Greeting 컴포넌트 재사용 */}
      <Greeting isLoggedIn={isLoggedIn} />
      {isLoggedIn 
        ? <LogoutButton onClick={handleLogoutClick} />
        : <LoginButton onClick={handleLoginClick} />
      }
    </>
  );
}

export default LoginControlRefactoring;