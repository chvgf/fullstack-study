const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello board');
});


router.get('/sub', (req, res) => {
  res.send('sup');
});

router.get('/sub/notice', (req, res) => {
  res.send('공지사항 게시판');
});

router.get('/sub/qna', (req, res) => {
  res.send('문의 게시판');
});

router.get('/sub/:jwBoard', (req, res) => {
  res.send(`${req.params.jwBoard}`);
});



module.exports = router;