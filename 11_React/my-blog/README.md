# 미니 블로그에 필요한 기능
- 글 목록 보기 기능(리스트 형태)
- 글 보기 기능
- 댓글 보기 기능
- 댓글 작성 기능
- 글 작성 기능

# 미니 블로그 UI

# 프로젝트 생성하기
npx create-react-app my-blog

# 필요한 패키지 설치
npm install react-router-dom styled-components

# 각 기능에 필요한 컴포넌트(처음에 미리 다 만들어놓고 시작)
- 글 목록 보기 기능(리스트 형태)
  - MainPage, PostList, PostListItem
- 글 보기 기능
  - PostViewPage
- 댓글 보기 기능
  - CommentList, CommentListItem
- 댓글 작성 기능
  - 추출 안함
- 글 작성 기능
  - PostWritePage
- 공통 컴포넌트
  - Button, TextInput

# 폴더 구성하기(폴더 구성에 정답은 없음)
src
  - component
    - list: 리스트와 관련된 컴포넌트들을 모아놓은 폴더
    - page: 라우팅 관련 페이지 컴포넌트들을 모아놓은 폴더
    - ui: 공통 UI 컴포넌트들을 모아놓은 폴더

회사마다 다른 구조
src
  - components
    - common
    - 각 기능별 폴더
  - pages
