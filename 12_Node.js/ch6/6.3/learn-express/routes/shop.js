const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello Shop');
});


router.get('/shirts', (req, res) => {
  res.send('셔츠 판매 페이지');
});

router.get('/pants', (req, res) => {
  res.send('바지 판매 페이지');
});

router.get('/:jwShop', (req, res) => {
  res.send(`${req.params.jwShop}`);
});



module.exports = router;