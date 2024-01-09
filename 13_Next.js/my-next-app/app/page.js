import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link';

export default function Home() {
  const developer = 'goni.kim';

  return (
    <>
<<<<<<< HEAD
      <h4 className='title'>마이 넥스트 앱</h4>
      <p className='subtitles'>by{developer} </p>
=======
      {/* 상단바(navbar) 만들기 */}
      {/* Link 컴포넌트 이용: 새로고침 없이 부드럽게 페이지 이동 */}
      {/* <nav className='navbar'>
        <Link href="/">홈</Link>
        <Link href="/list">List</Link>
      </nav> */}

      <h4 className='title'>마이 넥스트 앱</h4>
      <p className='subtitles'>by {developer}</p>
>>>>>>> 981c69e497a5e066d28180d7784cdab8b03a00c3
    </>
  )
}

// 여러 페이지 만들기(라우팅)
// 라우팅: URL 별로 페이지를 나눠놓고 사용자가 원하는 경로로 보내는 과정
// 1) 리액트의 경우: react-router-dom을 사용한 클라이언트 사이드 라우팅
// 2) 익스프레스의 경우: 라우터 기능을 사용한 서버 사이드 라우팅
// 3) 넥스트의 경우: 폴더와 파일 하나만 만들면 자동 라우팅
// app 폴더 안에 list 폴더를 만들면
<<<<<<< HEAD
// 폴더명과 동일한 URL 로 라우터가 자동 생성됨, 파일명은 page.js
=======
// 폴더명과 동일한 URL로 라우터가 자동 생성됨, 파일명은 page.js
>>>>>>> 981c69e497a5e066d28180d7784cdab8b03a00c3
// => /list로 접속 시 page.js 내용을 보여줌