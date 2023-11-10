import React from 'react';
import * as LottiePlayer from "@lottiefiles/lottie-player";

function LottieFilesEx(props) {
  return (
    <>
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="https://assets3.lottiefiles.com/datafiles/HF2l8DiOyOT4dwI/data.json"
        // style={{ width: '320px' }}
      />
    </>
  );
}

export default LottieFilesEx;