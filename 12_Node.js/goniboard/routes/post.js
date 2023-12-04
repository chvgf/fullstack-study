const express = require('express');
const { ObjectId } = require('mongodb')

const { client } = require('../database');
const db = client.db('board'); // board 데이터베이스에 연결

const router = express.Router();

// 글 목록 기능 만들기
// GET /post 라우터 /////밑에 재작성
// router.get('/', async (req, res) => {
//   const posts = await db.collection('post').find({}).toArray(); // post 컬렉션의 모든 document를 출력하는 법

//   // 글 목록 페이지 만들어서 웹페이지에 서버(DB) 데이터 꽂아 넣기 => 템플릿 엔진
//   // res.render('list');

//   // 서버 데이터를 ejs파일에 넣으려면?
//   // 1) ejx 파일로 데이터 전달
//   // 2) ejx 파일 안에서 <%= 데이터~~~~~ %>
//   // 3) ejx 문법으로 HTML 안에서도 JS 사용하려면 <% 자바스크립트 코드~~~~~ %>
//   res.render('list', { posts });
// });

// 글 작성 기능 만들기
// 사용자가 작성한 글을 DB에 저장해주기
// 1) 글 작성 페이지에서 작성한 내용을 서버로 전송
// 2) 서버는 전달받은 내용을 검사(유효성 검사)
// 프론트와 더불어 이중 체크 해주면 좋음
// => 프론트엔드 코드 및 데이터는 위조가 가능하기 때문
// => 또는 POSTMAN 같은 툴을 써서 요청을 보내면 프론트의 유효성 검사를 안거침
// 3) 이상이 없으면 DB에 저장

// GET/ post/write 라우터
router.get('/write', (req, res) => {
  res.render('write');
})

// POST/ post/write 라우터
router.post('/write', async (req, res) => {
  console.log(req.body); // 클라이언트 보낸 데이터 -> 요청 본문에 담김 -> body-parser가 분석해서 req.body에 객체로 저장
  
  const title = req.body.title;
  const content = req.body.content;
  
  
  // 유효성 검사 추가하기
  // 제목이 비어있으면 저장 안함
  if (!title) {
    res.json({
      flag: false,
      message: '제목을 입력하세요'
    });
  } else {
    // QUiz: DB에 저장하기
      try {
        await db.collection('post').insertOne({
          title: title,
          content: content
        });
        

        // 동기식 요청이면 다른 페이지로 이동
        // res.redirect('/post');
        // 비동기식(Ajax) 요청이면 성공 데이터와 함께 응답
        // 응답으로 redirect와 render은 사용안하는게 좋음
        res.json({
          flag: true,
          message: '등록성공'
        })

      } catch (err) {
        err.status = 500;
        next(err);
      }
  }
});

// 글 상세보기 만들기
// /post/글id 입력하면 해당 글의 상세 페이지를 보여줌
// 1) /post/글id 요청 보내기
// 2) { _id: 글id } 조건으로 글을 DB에서 찾아서
// 3) 해당 글을 ejs 파일에 꽂아서 보내줌

// GET /post/:id 라우터
router.get('/:id', async (req, res, next) => {
  // res.render('detail');

  // DB에서 글 가져오기
  // 테스트:
  // const post = await db.collection('post').findOne({ _id: '656947342c619b1356d8bc52' });
  // console.log(post);
  // const objId = new ObjectId('656947342c619b1356d8bc52'); // ObjectId 객체로 만듦
  // const post = await db.collection('post').findOne({ _id: objId });
  // console.log(post);

  // 예외 처리 하기
  // 1) url 잘못 입력 시
  // 2) 데이터를 못찾을 시 (잘못된 id) => null을 반환

  try {
    // 실제: 라우트 파라미터 매개변수에 입력한 값을 넣어야함
    const post = await db.collection('post').findOne({ _id: new ObjectId(req.params.id) });
    console.log(post);
    
    // 2) 번에 대한 예외 처리
    if (!post) {
      const error =  new Error('데이터 없음');
      error.status = 404;
      next(error);
    }
    
    res.render('detail', { post });
    
  } catch (err) { // 1번에 대한 예외처리
    err.message = '잘못된 url 입니다.'
    err.status = 400; // 응답코드 400번대는 클라이언트 에러
    // 400: 유저의 잘못된 문법으로 인하여 서버가 요청을 이해할 수 없을 때
    next(err);
  }
});

// 글 수정 기능 만들기
// 1) 수정 버튼 누르면 수정 페이지로
// 2) 수정 페이지에는 기존 글이 채워져있음
// 3) 전송 누르면 입력한 내용으로 DB 글 수정
// a, form 태그 사용 시 단점: 동기식이라 새로고침 발생  => 비동기식 Ajax 방식 사용해보기

// GET //post/edit/:id 라우터
router.get('/edit/:id', async (req, res, next) => {
  // DB에서 글 가져오기
  try {
    const post = await db.collection('post').findOne({ _id: new ObjectId(req.params.id) });
    
    if (!post) {
      const error =  new Error('데이터 없음');
      error.status = 404;
      next(error);
    }
    
    res.render('edit', { post });

  } catch (err) { 
    err.message = '잘못된 url 입니다.'
    err.status = 400;
    next(err);
  }
});


// PATCH /post/:id 라우터
router.patch('/:id', async (req, res, next) => {
  try {
    const title = req.body.title;
    const content = req.body.content;

    // 어떤 document를 찾아서 어떤 내용으로 수정할지 인자값 2개 전달
    await db.collection('post').updateOnee({
      _id: new ObjectId(req.params.id)
    }, {
      $set: {title, content}
    });

    res.json({
      flag: true,
      message: '수정 성공'
    });
  } catch (err) {
    console.error(err);

    // 보통 CSR 방식으로 개발 시 응답으로 json 데이터를 내려줌
    res.json({
      flag: false,
      message: '수정 실패'
    });
  }
});

// 글 살제 기능 만들기
// 1) 글 삭제 버튼 누르면 해당 글 삭제 요청보내기
// 2) 서버는 확인 후 해당 글을 DB 에서 삭제

// DELETE /post/:id 라우터
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('post').deleteOne({
      _id: new ObjectId(req.params.id)}
    );
    res.json({
      flag: true,
      message: '삭제 성공'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: '삭제 실패'
    });
  }
});

// (정리) 서버로 데이터 보내는 방법
// 1) form 태그
// 2) Ajax 방식
// 3) 라우트 매개변수(URL 파라미터)
// 4) 쿼리스트링

// 글 목록 여러 페이지로 나누기(페이지네이션 pagination)
// 예를 들어 글 1000개를 전부 가져와서 보여주도록 하면 DB도 부담되고 브라우저도 부담이 됨
// 1) 페이지 이동 버튼 만들기
// 2) 페이지마다 5개의 글을 보여줌(즉, 1페이지는 1~5번글, 2페이지는 6~10번글)

// GET /post 라우터 재작성
router.get('/', async (req, res) => {
  // 테스트
  // limit(5): 위에서 부터 5개만 가져옴
  // skip(5): 5개를 건너뜀
  // const posts = await db.collection('post').find({}).skip(5).limit(5).toArray();

  // 페이지네이션 구현 방법(1)
  // 페이지 번호는 쿼리스트링 또는 URL 파라미터 사용
  // 1 -> 0, 2 -> 5, 3 -> 10
  // const posts = await db.collection('post').find({}).skip(( req.query.page - 1) * 5 ).limit(5).toArray();

  // 페이지 계산
  const totalcount = await db.collection('post').countDocuments({}); // 전체 document 개수
  const postPerPage = 5; // 페이지 당 콘텐츠 개수
  const numOfPage = Math.ceil(totalcount / postPerPage) ; // 페이지 수
  const currentPage = req.query.page || 1; // 현제 페이지

  // 페이지네이션 구현 방법(2)
  // 데이터의 양이 너무 많아서 skip(1000000)을 많이 하게 되면 성능에 안좋음
  // => 너무 많이 skip 하지 못하게 막거나 다른 페이지네이션 방법 구현
  // 장점: 매우 빠름(_id 기준으로 뭔가 찾는 건 DB가 가장 빠르게 하는 작업임)
  // 단점: 바로 다음 게시물만 가져올 수 있음
  let posts;
  if (req.query.nextId) {
    posts = await db.collection('post')
    .find({ _id: { $gt: new ObjectId(req.query.nextId) } }) // ObjectId로 대소 비교
    .limit(5).toArray
  } else {
    posts = await db.collection('post').find().limit(5).toArray(); // 처음 5개
  }

  res.render('list', { posts, numOfPage, currentPage });


})

module.exports = router;