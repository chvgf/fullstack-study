# 2023년 초부터 주목받는 Next.js
2022년 10월 27일 Next 13(13.0.0) 버전 발표
문법과 구조가 싹 바뀌면서 사용성이 좋아지고 SSR 방식이 다시 유행하면서 떠오름
Next 13부터 App Router가 등장, Next의 라우팅 방식이 아예 달라짐
사실 Next 13.0에서는 베타로 소개되었고, 실질적인 변화는 2023년 5월 초에 있었던 Next 13.4부터임
Next 13.4부터 프로젝트 생성 시 App Router가 기본 설정으로 적용

# Next.js란?
프론트엔드부터 백엔드(서버)까지 만들 수 있는 React 기반 풀스택 프레임워크
이것만 사용해도 풀스택 웹개발이 가능

Next.js 사용시 서버사이드 렌더링이 쉽기 때문에 (참고로 리액트에서 SSR 구현을 못하는게 아님)
React만 사용해서 만든 사이트들 보다 로딩 시간이 빠르고 검색엔진 친화적인 사이트를 만들 수 있음
SSR방식이 다시 유행하고 프론트엔드 개발자에게 백엔드 역량까지 요구하고 있는 곳도 늘고 있어
React 개발자가 Next.js까지 배우는 추세

# 개발 환경 세팅
1) Node.js 설치
2) VSCode 설치
3) 프로젝트 폴더 만들기
4) Next 프로젝트 생성
npx create-next-app@latest => 질문 나오면 App Router만 Yes로 체크
npx create-next-app@latest --experimental-app => 실험적인 기능 사용 옵션
5) npm run dev
6) 실제 코딩은 /app/page.js(메인 페이지)에 작성

# Next App 구조 살펴보기
- page.js: 리액트의 App.js와 같은 메인 페이지 역할
- layout.js: page.js를 감싸는 파일(넥스트 앱은 레이아웃 안에 페이지를 넣어 구성)
페이지 바깥에 적을 내용은 레이아웃에 작성
예: <head> 태그 내용, 페이지 간에 공유하고 싶은 공통 UI(예: 상단바)
- globals.css: 모든 페이지에 다 적용할 글로벌(공통) 스타일 작성
- page.module.css: 특정 페이지에만 적용 시키고 싶은 스타일 작성(css의 모듈화)
- api폴더(버전에 따라 없을 수도 있음): 서버 기능을 만드는 곳(예: 서버 API)
- app폴더(Next 13부터 생김): App Router 방식
- public: 이미지, 폰트 파일 등 정적 리소스 보관
- next.config.js : Next.js 설정 파일
- node_modules: 앱 구동에 필요한 모든 라이브러리 파일들
- package.json, package-lock.json 등등