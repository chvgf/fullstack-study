const express = require('express');
const path = require('path');

const jw = express();
jw.set(3009);


jw.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './main.html'))
});
jw.get('/jw-1', (req, res) => {
  res.sendFile(path.join(__dirname, './jw-1.html'))
});


















jw.listen(3009, () => {
  console.log('준우서버 ㄱㄱ');
});