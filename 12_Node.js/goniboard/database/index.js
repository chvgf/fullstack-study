const { MongoClient } = require('mongodb');

// MongoDB 연결 설정하기
// DB 주소 찾는 법: Database > connect > Drivers
const url = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@cluster0.txxpbd0.mongodb.net/`
const client = new MongoClient(url);

const connect = async () => {
  try {
    await client.connect(); // MongoDB 서버에 연결
    console.log('몽고디비 연결 성공이잉');
  } catch (err) {
    console.error('몽고디비 연결 에러', err);
  }
};

module.exports = { client, connect };