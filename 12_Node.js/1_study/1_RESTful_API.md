- 서버란?
server = 서빙하는 사람
서버는 요구를 하면 갖다줌
즉, 요청을 받으면 요청한 내용을 보내주는 프로그램

여기서 말하는 요청은 HTTP 요청인데 그냥 막 보낸다고 되는게 아님
정확한 요청 형식에 맞춰서 보내야 됨
1. URL
2. method

method는 크게 4가지 방식이 있음
1. 읽기(GET) - 페이지를 가져오거나 데이터를 달라고 할 때
2. 쓰기(POST) - 뭔가 생성하거나 데이터를 보내고 싶을 때
3. 수정(PUT, PATCH) - DB 데이터 전체 또는 부분 수정 요청을 할 때
4. 삭제(DELETE) - DB 데이터 삭제 요청을 할 때

- REST API
: REpresentational State Transfer를 잘 따르는 API
: 좋은 API를 디자인하는 원칙

- REST 원칙 6개(참고만, 한번 읽어볼것) 
1. Uniform Interface: 
일관성있는 URL이 좋음
하나의 URL + method는 하나의 데이터를 보내야하고
간결하고 일관적이며 명확하게(URL을 보고 데이터의 예측이 가능한)
예: GET /news는 전체 뉴스 목록, GET /news/1234는 id가 1234인 뉴스 하나의 데이터
2. Client-Server 역할 구분: 
유저에게 서버 역할을 맡기거나 DB에 직접 입출력 시키게 하면 안됨 
브라우저는 요청만, 서버는 응답만 할 뿐
3. Stateless: 
요청들은 서로 의존성이 있으면 안됨
요청1과 요청2는 의존성이 없어야 함(서로 독립적인 요청)
예를 들어 요청1의 결과를 갖고 요청2를 처리하고
4. Cacheable: 
요청은 캐싱이 가능해야함
서버에서 보내주는 정보들은 캐싱이 가능해야 함
자주 수신되는 자료들은 브라우저에서 요청을 날리지 않고 하드에 저장해놓고 씀(브라우저가 알아서 해줌)
------------------------------------------- 5,6번은 중요X
5. Layered System:
요청 하나는 최종 응답전까지 여러 단계를 거쳐도 됨
6. Code on Demand:
서버는 유저에게 실행 가능한 코드를 보내줄 수도 있음

- 위 원칙에 따라 RESTful한 API 이름짓기
1. URL을 동사보다는 최대한 명사로 작성(동사의 역할은 method가 함)
2. 하위 문서(구조)를 나타낼 땐 / 기호 사용
3. 파일 확장자(예: .html) 쓰지 말기
4. 띄어쓰기는 언더바(_) 대신 대시(-) 이용
5. 자료 하나당 하나의 URL 사용

- 좋은 REST API 예시
GET facebook.com/natgeo/photos => natgeo 계정에 올린 사진들
GET facebook.com/bbc/photos => bbc 계정에 올린 사진들
GET instargram.com/explore/tags/kpop => 태그가 kpop인 것들 탐색
GET instargram.com/explore/tags/food => 태그가 food인 것들 탐색
GET example.com/product/65535 => 상품 id가 65535인 상품의 정보