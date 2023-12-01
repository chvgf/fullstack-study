# DB 종류
1. 관계형(RDBMS), SQL
데이터가 규칙적으로 정형화 되어있고 서로 간에 관계가 있음
엑셀과 같음
예를 들어 사용자 정보를 저장하는 users 라는 테이블이 있으면
데이터 이름 달고 -> id name gae email -> 컬럼
실제 데이터 기입 -> 1 goni 30 aa@.com -> 로우
어떤 데이터를 어디에 입력할지 미리 설계해서 컬럼을 만듦(스키마)

하나의 컬럼에 여러가지 정보를 저장할 수 없음(타입과 갯수에 제한 )
예를 들어 취미 ,주문 내역(객체나 배열 자료형 사용이 안됨)
이 때는 컬럼을 하나 더 만들던가, 컬럼이 너무 많아지게 될 경우 차라리 새로운 테이블로 추출함(정규화)
아니면 꼼수로 문자 데이터에 구분자 써서 여러개 작성

SQL이라는 언어(문법)을 사용하여 디비에 입/출력

대표적인 DB: Oracle, MySQL, MS SQL Server, MariaDB, PostgreSQL

2. NoSQL(Not only SQL), 비관계형
데이터 구조가 정형화 되어있지 않고 다른 데이터와 관계가 없음
객체 자료형으로 입출력 가능
쉽고 자유롭게 데이터 저장 가능

데이터가 무분별하게 들어갈 수 있음
RDB 같은 JOIN 기능이 없음

대표적인 DB: MongoDB, DynamoDB, Redis, HBase

3. 비교
두 데이터베이스가 공존하는 이유는 바로 각각의 명확한 장점 때문
정규화된 데이터와 정확도(데이터 무결성), 안정성이 필요하다면 관계형 데이터베이스를 사용
금융서비스, 은행 전산시스템을 만든다면 당연히 안정적인 관계형이 좋음

하지만 일초에 수백만개의 데이터 입출력 요청이 들어오는 SNS 서비스 만들 때,
서비스의 변경사항이 잦아서 쉽고 유연하게 데이터를 저장하고 싶으면 NOSQL을 사용

근데 꼭 이렇게 분리해서 써야되는게 아니라 어떻게 활용하냐에 따라서 다를 수 있음

4. MongoDB 특징
- SQL 배울 필요 없음
- 테이블 정의(스키마) 필요 없음
- 정규화 필요 없음
- 관계 정의 필요 없음
- collecion(=table) 안에 document(=row)
- document에 데이터 저장할 때 JS Object 형태로 저장

5. MongoDB 사용하는 방법(2가지)
1) 컴퓨터(로컬)에 직접 설치
2) 클라우드에서 호스팅 받기
- 자동 백업, 분산 저장 등 서비스 제공
- 무료 용량 512MB 정도

6. MongoDB Atlas 가입 및 초기 설정
1) 구글에 MongoDB Atlas 검색 또는 mongodb.com 방문
2) 회원 가입(메일인증 필요)
3) M0 무료 티어 선택, 서버 위치도 선택
한국 유저들에게 빠른 서비스를 제공하려면 서울을 선택
4) 좌측 Database Access 메뉴에서 DB 접속용 아이디/비번 생성
하나의 데이터베이스를 여러 사람이 사용할 수도 있으니까
접속할 수 있는 아이디/비번 새로 생성
관리자용으로 admin/qwer1234  또는 root/root1234  (비밀번호는 맘대로)
(주의!) 역할을 atlas admin 으로 설정해야됨
그래야 Node.js에서 DB 접속 시 모든 기능을 다 사용 가능
5) 좌측 Network Access 메뉴에서 IP 추가
데이터베이스에 접속할 수 있는 IP를 미리 정의해놓는 일종의 보안장치
Allow access from anywhere를 누르거나 0.0.0.0/0 을 추가하기

7. 데이터 흐름
유저(클라이언트) <-> 서버 <-> DB

8. (참고)
- MongoDB Document
https://www.mongodb.com/docs/
- MongoDB 연산자
https://www.mongodb.com/docs/v7.0/reference/operator/

- 업데이트 연산자
$set(변경, 바꿀값)
$inc(증가, 기존값에 더해줄 값)
그 외 연산자 (잘 안씀)
$mul(곱하기, 기존값에 곱해줄 값)
$unset(삭제, 기존 필드값 삭제)
$min(기존값보다 적을 때만 변경)
$rename(key값 이름 변경) 등

- 동시에 여러 document 수정은 updateMany()
like 항목이 10 이상인 document 전부 수정? 
비교 연산자: &gt(초과), $gte(이상), &lt(미만), $lte(이하), $ne(not equal)
await db.collection('post').updateMany({ like: { $gt: 10 } }, { 
  $set: {
    수정할 내용
  } 
});

- MongoDB와 몽구스 시작하기
https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/
- Mongoose 사용하기
https://velog.io/@ckstn0777/Mongoose-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0