const { MongoClient } = require("mongodb");

const url = 'mongodb+srv://amdin:qwer1234@cluster0.txxpbd0.mongodb.net/';
const client = new MongoClient(url);
let connect;

// Next.js의 경우 개발 환경에서 파일 저장할 때마다 JS 파일들이 재실행되기 때문에
// client.connect()가 동시에 여러 개 실행될 수 있음
// 방지하려면 global이라는 전역 변수에 보관해두고 꺼내씀
if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = client.connect();
  }
  connect = global._mongo;
} else {
  connect = client.connect();
}
// connect 변수에 저장해놓고 쓰면 매번 실행안되고 좋음
export { connect };