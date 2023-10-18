function Header(props) {
  return (
    <header>
      헤더입니다.
      <h1>{props.title}</h1>
    </header>
  );
}

export default Header;