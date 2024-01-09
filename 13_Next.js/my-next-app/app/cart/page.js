import CartItem from "./CartItem";

<<<<<<< HEAD
export default function Payment(props) {
  // DB 에서 가져온 데이터라고 가정
=======
export default function Cart() {
  // DB에서 가져온 데이터라고 가정
>>>>>>> 981c69e497a5e066d28180d7784cdab8b03a00c3
  const cartList = ['Orange', 'Grape'];

  return (
    <>
      <h4 className="title">장바구니</h4>
      {/* <div className="cart-item">
        <p>상품명</p>
        <p>500원</p>
        <p>1개</p>
      </div>
      <div className="cart-item">
        <p>상품명</p>
        <p>500원</p>
        <p>1개</p>
      </div> */}

      {/* CartItem 컴포넌트 추출 */}
<<<<<<< HEAD
      <CartItem />
      <CartItem />

      {/* Q: 반복 렌더링 + 데이터 바인딩 */}
      {cartList.map((a, index) => {
        return (
          <CartItem
            key={index}
            cartList={a}
          />
        )
=======
      {/* <CartItem />
      <CartItem /> */}

      {/* Quiz: 반복 렌더링 + props로 데이터 전달 + 데이터 바인딩 */}
      {cartList.map((cartItem, index) => {
        return (
          <CartItem key={index} cartItem={cartItem} />
        );
>>>>>>> 981c69e497a5e066d28180d7784cdab8b03a00c3
      })}
    </>
  );
}

// 컴포넌트 추출
// 무조건 컴포넌트로 추출하는게 아니라 재사용이 잦은 것들만 추출

<<<<<<< HEAD
// Next.js 에서는 컴포넌트 종류가 2가지 => Client/sercer 컴포넌트
// 그냥 만들면 기본으로 server 컴포넌트
// 파일 맨 위에 'use client' 라고 작성하고 만들면 client 컴포넌트

// 차이점?
// server 컴포넌트에는
// - 프론트단 JS 기능 넣기 불가능(예: 이벤트 리스너 등록 같은 onClick={})
// - useState, useEffect 등 사용 불가
// client 컴포넌트에서는 사용 가능

// 그럼 전부 client 컴포넌트로 만들면 좋은 것 아닐까..?
// server 컴포넌트의 장점
// - 로딩 속도 빠름(페이지 로드에 필요한 JS 양이 적기 때문에)
// - 검색 엔진 노출에 유리

// (정리)
// 큰 페이지는 server 컴포넌트로 만들고
// 프론트 JS 기능이 필요한 곳만 client 컴포넌트로
=======
// Next.js에서는 컴포넌트 종류가 2가지 => client/server 컴포넌트
// 그냥 만들면 기본으로 server 컴포넌트
// 파일 맨 위에 'use client'라고 작성하고 만들면 client 컴포넌트

// 차이점
// server 컴포넌트에는
// - 프론트단 JS 기능 넣기 불가능(예: 이벤트 리스너 등록같은 onClick={})
// - useState, useEffect 등 사용 불가
// client 컴포넌트에서는 사용 가능

// 그럼 전부 client 컴포넌트로 만들면 좋은것 아닌가?
// server 컴포넌트의 장점
// - 로딩 속도 빠름(페이지 로드에 필요한 JS양이 적기 때문에)
// - 검색 엔진 노출에 유리

// (정리)
// 큰 페이지는 server 컴포넌트
// 프론트 JS 기능이 필요한 곳만 client 컴포넌트
>>>>>>> 981c69e497a5e066d28180d7784cdab8b03a00c3

// 참고 자료: https://www.plasmic.app/blog/how-react-server-components-work