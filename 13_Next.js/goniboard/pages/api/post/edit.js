import { connect } from "@/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id, title, content } = req.body

  const client = await connect;
  const db = await client.db('board');
  const edit = await db.collection('post').updateOne({
    _id: new ObjectId(id)
  }, {
    $set: { title, content }
  });

  res.json({
    flag: true,
    message: '수정성공'
  })

}