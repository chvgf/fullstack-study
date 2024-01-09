import Link from "next/link";
import DetailButton from "./DetailButton";

export default function ListItem(props) {
  return (
    <div key={props.key} className="list-item">
      {/* 페이지를 이동하는 방법(1) - Link 컴포넌트 */}
      {/* Link 컴포넌트를 사용하여 '/detail/글id'로 디옹 */}
      <h4>
        <Link href={`/detail/${props._id}`}>
          {props.title}
        </Link>
      </h4>

      {/* 페이지를 이동하는 방법(2) - useRouter */}
      <DetailButton postId={props._id.toString()} />

      <p>{props.content}</p>
    </div>
  );
}

// 상세 페이지 만들기
// 1) 글 제목 누르면 상세 페이지로 이동
// 2) DB에서 해당 게시글 가져와서 보여주기
// => 이때 상세 페이지 URL은? /detail/123
// => /app/detail 폴더 안에 여러 폴더 만들면 비효율적
// => React: URL 파라미터, Express: 라우트 파라미터
// => Next.js: Dynamic Routes 사용 -> 파일 또는 폴더 이름을 대괄호로 묶어 생성 []
