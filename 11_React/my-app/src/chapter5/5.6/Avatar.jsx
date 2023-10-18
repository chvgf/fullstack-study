const styles = {
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  }}

function Avatar(props) {
  return (
    // 컴포넌트로 추출했으므로 Comment에서만 쓰이는게 아니기에 author에서 user로 바꿔줌
    <img className="avatar"
    src={props.user.avatarUrl}
    alt={props.user.name}
    style={styles.image}
    />
  );
}


export default Avatar;