import { connect } from "@/database";
import ListItem from "./ListItem";

export default async function List() {
  // (참고) DB 입출력 코드는 server 컴포넌트에서만 쓰기
  const client = await connect;
  const db = await client.db('board');
  const posts = await db.collection('post').find().toArray();
  console.log(posts); // 수정전

  // 워닝 해결하기: Warning: Only plain objects can be passed to Client Components from Server Components.
  posts.map((post) => {
    post._id = post._id.toString();
    post.user = post.user?.toString();
    return post;
  });
  console.log(posts); // 수정 후


  return (

    <div className="list-bg">
      {posts.map((postMap) => {
        return (
          <ListItem
            key={postMap._id.toString()}
            title={postMap.title}
            content={postMap.content}
            _id={postMap._id.toString()}
          />
        )
      })}

      {/* ListItem 컴포넌트로 추출 */}
    </div>
  );
}

// 글 목록 기능 만들기
// 1) /list로 접속 시 글 목록 페이지
// /app/list/page.js
// 2) DB에서 글 목록 가져오기