const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
  res.send('<h1>메인 페이지 입니다.</h1>');

  // (참고) req 객체를 통해 app 객체에 접근 가능
  console.log(req.app.get('port'), 'req통한 app접근');
  console.log(res.app.get('port'), 'res통한 app접근');
});


module.exports = router;