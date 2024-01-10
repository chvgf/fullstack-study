export default function handler(req, res) {
  console.log('/api/test/[id].js');

  // URL 파라미터 확인
  console.log(req.query);

  res.json({ message: '안녕!' });
}