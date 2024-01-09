import { connect } from "@/database"
import { ObjectId } from "mongodb";

export default async function Detail(props) {
  console.log(props);

  const client = await connect
  const db = await client.db('board');
  const post = await db.collection('post').findOne({ _id: new ObjectId(props.params.postId) });
  console.log(post);

  return (
    <div>
      <h4>상세 페이지</h4>
      <h4>{post.title}</h4>
      <p>{post.content}</p>
    </div>
  )
}