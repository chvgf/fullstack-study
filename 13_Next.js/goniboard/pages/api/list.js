import { connect } from "@/database";

export default async function handler(req, res) {
  const client = await connect
  const db = await client.db('board');

  if (req.method === 'GET') {
    const posts = await db.collection('post').find().toArray();

    res.json({
      flag: true,
      message: '처리완료',
      posts
    })
  }
}