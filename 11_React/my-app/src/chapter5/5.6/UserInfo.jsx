import Avatar from "./Avatar";



function UserInfo(props) {
  return (
    <div className="user-info">
    {/* 1) 아바타 이미지를 컴포넌트로 추출
    아바타 이미지는 댓글, 사용자 정보창 등 여기저기서 쓰일 수 있으므로 */}
    <Avatar 
      user={props.user}
    />

    <div className="user-info-name">
      {props.user.name}
    </div>
  </div>

  );
}

export default UserInfo;