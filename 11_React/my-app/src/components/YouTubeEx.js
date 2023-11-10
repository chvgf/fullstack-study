import React from 'react';
import YouTube from 'react-youtube';

function YouTubeEx(props) {
  const handleReady = (event) => {
    // event.target: 재생되고 있는 영상 자체
    event.target.mute(); // 음소거!
  }

  return (
    <>
      <YouTube 
        videoId="An6LvWQuj_8" 
        opts={{
          height: '360',
          width: '640',
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            loop: 1,
            playlist: 'An6LvWQuj_8'
          },
        }} 
        onReady={handleReady} 
      />
    </>
  );
}

export default YouTubeEx;