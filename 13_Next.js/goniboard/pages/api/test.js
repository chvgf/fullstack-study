export default function handler(req, res) {
  console.log('/api/test.js');

  // query string 확인
  console.log(req.query);

  res.status(200).json({ message: '안녕!' });

  // GET/POST 요청에 따라 다른 코드를 실행하고 싶으면?
  // if문 또는 switch문 사용
  if (req.method === 'POST') {
    
  } else {
    
  }
}