import { connect } from "@/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { _id } = req.body

  const client = await connect;
  const db = await client.db('board');
  const del = await db.collection('post').deleteOne({
    _id: new ObjectId(_id)
  });

  res.json({
    flag: true,
    message: '삭제성공'
  })

}