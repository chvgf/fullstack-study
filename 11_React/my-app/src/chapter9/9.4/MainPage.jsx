import { useState } from "react";

const styles = {
  button: {
    height: 40,
    width: 200,
  },
  warning: {
    backgroundColor: 'red',
    textAlign: 'center',
    width: '100%',
    padding: 10,
    fontSize: '14pt',
    color: 'white',
  }
};


function WarningBanner(props) {
  console.log(props.warn);
  if (!props.warn) {
    return null;
  }

  return (
    <div style={styles.warning}>Waring!</div>
  );
}

function DangerBanner() {
  return (
    <div style={styles.warning}>Danger!</div>
  );
}

function MainPage() {
  const [showWarning, setShowWarning] = useState(false);

  const handleToggle = () => {
    // setShowWarning(!showWarning);
    setShowWarning((prevState => !prevState));
  };

  return (
    <>
      <WarningBanner warn={showWarning}/>

      {/* 보통의 경우 아래와 같이 조건부 랜더링으로 처리하는 것도 가능 */}
      { showWarning && <DangerBanner />}

      <button style={styles.button} onClick={handleToggle}>
        {showWarning ? '감추기' : '보이기'}
        
      </button>
    </>
  );
}

export default MainPage;