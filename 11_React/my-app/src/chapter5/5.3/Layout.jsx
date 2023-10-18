import Footer from "./Footer";
import Header from "./Header";

function Layout(props) {
  console.log(props);

  // Quiz: {} 채우기
  return (
    <>
      {props.header }
      레이아웃 크기는 가로 {props.width}, 세로{props.height}
      {props.footer}
    </>
  );
}

export default Layout;