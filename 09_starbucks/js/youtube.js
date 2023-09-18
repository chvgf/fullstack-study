// Youtube Iframe API 쓰는 이유?
// <iframe> 태그만 써도 유튜브 여상 삽입이 가능 한데 태그의 속성만으로 커스텁 하기에는 한계가 있음
// api를 사용하면 다양한 명령으로 동영상 제어 가능

// (참고) <iframe> 태그: HTML 문서 내에 다른 문서를 삽입하는데 사용 (웹 페이지 내에 웹 페이지를 표시)

// 2. This code loads the IFrame Player API code asynchronously.
let tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
let player;
function onYouTubeIframeAPIReady() { //라이브러리가 이 함수의 이름을 찾아 실행하기에 임의로 바꾸면 안됨
  player = new YT.Player('player', {
    // height: '360',
    // width: '640',
    videoId: 'c7Tg5uNTmfg', // 최초 재생할 유튜브 영상 ID
    playerVars: { // 더 자세한 옵션은 플레이어 매개변수 메뉴 확인
      autoplay: true, //자동 재생 유뮤
      loop: true, // 반복 재생 유무(아래 플레이리스트 옵션 필수)
      playlist: 'c7Tg5uNTmfg' //반복 재생할 유튜브 영상 ID 목록
    },
    events: {
    //   'onReady': onPlayerReady,
    //   'onStateChange': onPlayerStateChange
    // noReady: 영상이 준비되었을 때 내가 작성한 함수 실행
      onReady: function (event) {
        // event.target: 재생되고 있는 영상 자체
        event.target.mute(); //음소거!
      }
    }
  });
}