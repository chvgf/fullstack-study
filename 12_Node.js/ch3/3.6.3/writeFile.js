const fs = require('fs').promises;

// 파일 생성
// 인자값: 만들 파일의 경로와 파일명, 파일에 작성할 내용
fs.writeFile('./writeme.txt', '글이 입력됩니다.')
  .then(() => {
    return fs.readFile('./writeme.txt'); // 파일을 만든 후 바로 읽기
  })
  .then((data) => {
    console.log(data.toString()); // 내용 출력
  })
  .catch((err) => {
    console.error(err);
  });
