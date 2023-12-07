const express = require('express');

const { client } = require('../database');
const db = client.db('board'); // board 데이터베이스에 연결

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('main');
});

// GET /insert 라우터
// DB에 데이터 저장하기 테스트(테스트 후 데이터 삭제)
router.get('/insert', async (req, res) => {
  // JS Object 형태
  try {
    await db.collection('post').insertOne({
      title: '제발 들어가라',
      content: '콘텐츠츠츠츠' 
    });
    res.send('데이터 저장 완료');
  } catch (err) {
    console.error(err);
  }
});


// DB에 데이터 저장하기 테스트(테스트 후 데이터 삭제)
router.get('/delete-all', async (req, res) => {
  await db.collection('post').deleteMany({});
  res.send('전체삭제 완료');
});

// GET/cors
router.get('/cors', async (req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  const a = await db.collection('post').find({}).toArray();
  res.send(a[0])
  res.send('데이터 응답 테스트');
});


// Quiz: /time 으로 접속하면 현재 서버의 날짜/시간을 보여주는 기능 만들기
// time.ejs로 웹페이지 만들어서 그 안에 서버의 시간을 넣어 보내주기만 하면 됨
router.get('/time', (req, res) => {
  res.render('time', { date: new Date() });
})

module.exports = router;