# Node+Express 서버와 React 연동하기(2가지)
1. 노드 서버에 리액트 앱을 올려서 합치기
서버는 사용자가 메인 페이지로 접속하면 리액트로 만든 index.html 파일을 보내주면 끝
이점은?
  1) 리액트로 만든 index.html 제공하면서 부가적으로 리액트가 아닌 다른 정적 페이지도 제공 가능
  2) 리액트 서버는 따로 둘 필요가 없으므로 API 요청 시 CORS가 안뜰것 같다..
  3) 노드로 서버를 구성하였기 때문에 미들웨어 기능을 활용할 수 있음

https://dori-coding.tistory.com/entry/React-Node-Express-%EC%84%9C%EB%B2%84%EC%99%80-React-%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0

2. 노드는 노드 서버로, 리액트는 리액트 서버로 따로 돌리는 방법
리액트는 Ajax로 필요한 데이터를 서버에 요청하고 
서버는 요청 받은 데이터를 res.send(), res.json() 으로 응답을 내려줌
리액트와 노드 서버는 데이터만 주고 받음

# CORS 문제
- https://inpa.tistory.com/entry/WEB-%F0%9F%93%9A-CORS-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-%F0%9F%91%8F
- https://ko.javascript.info/fetch-crossorigin

참고로 프로토콜://도메인:포트 세 가지에 의해 결정되는 오리진(origin)

1. Proxy 설정: https://create-react-app.dev/docs/proxying-api-requests-in-development/
2. 서버에서 응답 헤더 설정(Access-Control-Allow-Origin: '*')
=> cors 라이브러리 사용