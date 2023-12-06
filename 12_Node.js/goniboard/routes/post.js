const express = require('express');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');

const { isLoggedIn } = require('../middlewares');
const { client } = require('../database');
const db = client.db('board'); // board 데이터베이스에 연결

const router = express.Router();

// multer, S3, aws-sdk 설정
// 발급받은 엑세스 키랑 비밀키 기입(털리면 안되니까 .env에 저장   env깃헙 안올리게 조심)
// region: S3 리전(데이터 센터) 설정하는 부분인데 서울이면 ap-northeast-2 기입
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  },
  region: 'ap-northeast-2'
});

// s3 클라이언트
// 버킷이름 설정
// 저장할 파일명도 바꿀 수 있음
// 파일명을 안겹치게 하려면 랜덤 문자(uuid)를 넣던가 아니면 현재 시간(timestamp)을 섞거나
// 이렇게 하는 이유가 파일 이름이 중복되면 덮어씌우기 때문에
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'jwboard', // 만든 버킷 이름
    key(req, file, cb) { // 원본 파일명을 쓰고 싶으면 file 안에 들어있음
      cb(null, `original/${Date.now()}_${file.originalname}`); // 업로드 시 파일명
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 } // 파일 사이즈(바이트 단위): 5MB로 제한(그 이상 업로드 시 400번대 에러 발생)
});
// 여기까지 세팅하면 upload.single('인풋의 name') 미들웨어 사용으로 S3에 업로드 가능

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
router.get('/write', isLoggedIn, (req, res) => {
  res.render('write')
  // Quiz
  // 로그인한 사람만 글을 작성할 수 있게 만들고 싶으면?
  // 로그인한 경우에 req.user 안에 뭔가 들어있음
  // 반대로 비어있으면 로그인 안 한 상태
});


// router.get('/write', (req, res) => {
//   if (req.user) {
//     res.render('write');
//   } else {
//     res.json({
//       flag: false,
//       message: '로그인 해야 가능'
//     });
//   }
//   // Quiz
//   // 로그인한 사람만 글을 작성할 수 있게 만들고 싶으면?
//   // 로그인한 경우에 req.user 안에 뭔가 들어있음
//   // 반대로 비어있으면 로그인 안 한 상태
// });


// POST/ post/write 라우터
// 이미지 파일 업로드를 위한 미들웨어 장착
// name='img'인 파일이 서버로 전송되면 S3에 자동 업로드 해줌
// 업로드 완료 시 이미지의 URL도 생성해줌(req.file에 들어있음)
router.post('/write', isLoggedIn, upload.single('img'), async (req, res) => {
  console.log(req.file); // 업로드 후 S3 객체 정보
  console.log(req.file.location); // 이미지의 URL 정보, img 태그 src 속성에 넣으면 동작

  console.log(req.body); // 클라이언트 보낸 데이터 -> 요청 본문에 담김 -> body-parser가 분석해서 req.body에 객체로 저장
  
  const username = req.user.username;
  const title = req.body.title;
  const content = req.body.content;
  const imgUrl = req.file.location;
  
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
          username: username,
          title: title,
          content: content,
          imgUrl: imgUrl // 이미지 URL을 글과 함께 DB에 저장
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
router.get('/detail/:id', async (req, res, next) => {
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
    const comment = await db.collection('postcomment').find({ _id: new ObjectId(req.params.id) }); /////////////ㅇㅇ?ㅇ?ㅇ?ㅇ??
    console.log(post);
    
    // 2) 번에 대한 예외 처리
    if (!post) {
      const error =  new Error('데이터 없음');
      error.status = 404;
      next(error);
    }
    
    res.render('detail', { post, comment });
    
  } catch (err) { // 1번에 대한 예외처리
    err.message = '잘못된 url 입니다.'
    err.status = 400; // 응답코드 400번대는 클라이언트 에러
    // 400: 유저의 잘못된 문법으로 인하여 서버가 요청을 이해할 수 없을 때
    next(err);
  }
});

router.post('/detail/:id/comment', async (req, res, next) => {      ///////////// 댓글기능 테스트
  const comment = req.body.comment;
  const username = req.user.username;
  // const a = await db.collection('postcomment').find({})
  // console.log(a);

  try {
    await db.collection('postcomment').insertOne({
      comment: comment,
      username: username
    });
    console.log(comment);
    res.json({
      flag: true,
      message: '등록성공'
    })

  } catch (err) {
    err.status = 500;
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
    await db.collection('post').updateOne({
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
  const posts = await db.collection('post').find({}).skip(( req.query.page - 1) * 5 ).limit(5).toArray();

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
  // let posts;
  // if (req.query.nextId) {
  //   posts = await db.collection('post')
  //   .find({ _id: { $gt: new ObjectId(req.query.nextId) } }) // ObjectId로 대소 비교
  //   .limit(5).toArray();
  // } else {
  //   posts = await db.collection('post').find().limit(5).toArray(); // 처음 5개
  // }

  res.render('list', { posts, numOfPage, currentPage });
});


// 검색 기능 만들기
// 1) 검색 UI(input과 버튼)에서 서버로 검색어 전송
// 2) 서버는 그 검색어가 포함된 document를 찾음
// 3) 그 결과를 ejs에 넣어서 보내줌

// GET /post/search 라우터
router.get('/search', async (req, res) => {
  console.log(req.query.keyword);
  const keyword = req.query.keyword;

  const currentPage = req.query.page || 1; // 현재 페이지
  const postsPerPage = 3; // 페이지 당 콘텐츠 개수
  
  // 1. 서버는 그 검색어와 정확히 일치하는 document를 찾음
  // const posts = await db.collection('post').find({ title: keyword }).toArray();
  
  // 2. 서버는 그 검색어가 포함된 document를 찾음 -> 정규표현식(정규식) 사용
  // const posts = await db.collection('post').find({ title: { $regex: keyword } }).toArray();
  // 문제점 document가 매우 많을 경우 find()를 써서 _id가 아닌 다른 기준으로 document를 찾는 건 느려터짐
  // 예: document가 1억개 있으면 1억개를 다 뒤져봄
  // 해결책: 데이터베이스에 index를 만들어두면 됨
  
  // 3. index를 사용한 검색
  // const posts = await db.collection('post').find({ $text: { $search: keyword } }).toArray();
  // $text: text index를 갖다 쓰겠다는 의미
  // #search: 검색 키워드

  // (참고) find() 성능 평가
  // explain()
  // const result1 = await db.collection('post').find({ title: keyword }).explain('executionStats');
  // const result2 = await db.collection('post').find({ $text: { $search: keyword } }).explain('executionStats');
  // console.log(result2);

  // 4. search index를 사용한 검색
  // find({ 조건 }) -> aggregate([{ 조건1 }, { 조건2 }])
  // 장점: 여러 상세한 조건을 배열로 넣을 수 있음 => pipeline이라고 부름
  // const posts = await db.collection('post').aggregate([
  //   {
  //     $search: { // search index 이용해서 full-text search를 수행
  //       index: 'title_index', // 사용할 인덱스 이름
  //       text: {
  //         query: keyword, // 검색어
  //         path: 'title' // 검색할 필드 이름
  //       }
  //     }
  //   }, // 기본적으로 검색어와 관련도 점수가 높은 순으로 정렬됨
  //   // aggregate 에 쓸 수 있는 연산자(find에서는 메서드가 지원됨)
  //   { $sort: { _id: 1 } }, // 검색결과 정렬(1: 오름차순, -1: 내림차순)
  //   { $skip: 0 }, // 5개 건너뛰기
  //   { $limit: 4 }, // 결과 수 제한
  //   { $project: { title: 1 } } // 조회할 필드 선택(1: 추가, 0: 제외)
  // ]).toArray();
  

  // const postPerPage = 4; // 페이지 당 콘텐츠 개수
  // const numOfPage = Math.ceil(aa / postPerPage) ; // 페이지 수
  // const currentPage = req.query.page || 1; // 현제 페이지
  // const totalcount = await db.collection('post').aggregate([
  //   {
  //     $search: 
  //     {
  //       index: 'title_index', 
  //       text: 
  //       {
  //         query: keyword,
  //         path: 'title'
  //       }
  //     }
  //   },
  //   { $sort: { _id: 1 } }, // 검색결과 정렬(1: 오름차순, -1: 내림차순)
  //   { $skip: (currentPage - 1) * postPerPage }, // 5개 건너뛰기
  //   { $limit: 99999 }, // 결과 수 제한
  //   { $project: { title: 1 } } // 조회할 필드 선택(1: 추가, 0: 제외)
  // ]).toArray();
  // const aa = totalcount.length;

  // console.log(aa);

  // 답답답답답답임
  const query = {
    $search: {
      index: 'title_index',
      text: {
        query: keyword,
        path: 'title'
      }
    }
  };

  const posts = await db.collection('post').aggregate([
    query,
    { $skip: (currentPage - 1) * postsPerPage },
    { $limit: postsPerPage },
  ]).toArray();

  const result = await db.collection('post').aggregate([
    query, 
    { $count: "searchCount" }
  ]).toArray();
  console.log(result);
  const totalCount = result[0].searchCount;
  const numOfPage = Math.ceil(totalCount / postsPerPage); // 페이지 수

  
  res.render('search', { posts, numOfPage, currentPage, keyword });

});

module.exports = router;


  