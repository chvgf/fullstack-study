<<<<<<< HEAD
'use client'  /* 클라이언트 컴포넌트로 전환 */

import Image from "next/image"
import fruitsImg from "@/public/fruits0.png";
import { useState } from "react";

export default function List(params) {
  // DB에서 가져온 데이터라고 가정
  const products = ['Apple', 'Orange', 'Grape']
=======
'use client'
import { useState } from "react";

import Image from "next/image";
import fruitsImg from "@/public/fruits0.png";

export default function List() {
  // DB에서 가져온 데이터라고 가정
  const products = ['Apple', 'Orange', 'Grape'];
>>>>>>> 981c69e497a5e066d28180d7784cdab8b03a00c3

  // 주문 수량
  // state는 client 컴포넌트에서만 사용 가능
  const [orderCount, setOrderCount] = useState([0, 10, 3]);

  return (
    <>
      <h4 className="title">상품 목록</h4>
<<<<<<< HEAD

=======
      {/* <div className="fruits">
        <h4>{products[0]}</h4>
      </div>
      <div className="fruits">
        <h4>{products[1]}</h4>
      </div>
      <div className="fruits">
        <h4>{products[2]}</h4>
      </div> */}

      {/* Quiz: 상품 목록 반복 렌더링 */}
>>>>>>> 981c69e497a5e066d28180d7784cdab8b03a00c3
      {products.map((product, index) => {
        return (
          <div key={index} className="fruits">
            {/* 이미지 넣기(1) - img 태그 */}
            {/* img 태그에 그냥 절대 경로로 적어주면 public 폴더에서 찾음 */}
<<<<<<< HEAD
            <img src={`/fruits${index}.png`} alt="fruits" className="fruits-img"></img>

            {/* 이미지 넣기(2) - img 컴포넌트 */}
            {/* 
              이미지는 일반적인 웹 페이지의 무게에 큰 부분을 차지함(즉, 성능에 영향을 미침)
              성능과 속도가 중요하다면 Image 컴포넌트를 통한 이미지 최적화 사용
              1) 사이즈 최적화: 디아비스에 맞는 크기의 이미지를 자동으로 제공
              2) layout shift 방지: 이미지 로딩이 늦어 레이아웃이 밀려나는 현상 방지
              3) 빠른 페이지 로드:
                lazy loading을 사용하여 실제 이미지들이 실제로 화면에 보여질 필요가 있을 때 (뷰표트에 들어갈 때만) 로딩
                웹 페이지 내에서 바로 로딩을 하지 않고 로딩 시점을 뒤로 미루는 것

                참고 자료: https://nextjs.org/docs/app/building-your-application/optimizing/images
=======
            <img src={`/fruits${index}.png`} alt="fruits" className="fruits-img" />

            {/* 이미지 넣기(2) - Image 컴포넌트 */}
            {/* 
              이미지는 일반적인 웹 페이지의 무게의 큰 부분을 차지함(즉, 성능에 영향을 미침)
              성능과 속도가 중요하다면 Image 컴포넌트를 통한 이미지 최적화 사용
              1) 사이즈 최적화: 디바이스에 맞는 크기의 이미지를 자동으로 제공
              2) layout shift 방지: 이미지 로딩이 늦어 레이아웃이 밀려나는 현상 방지
              3) 빠른 페이지 로드:
                lazy loading을 사용하여 실제 이미지들이 실제로 화면에 보여질 필요가 있을 때(뷰포트에 들어갈 때만) 로딩
                웹 페이지 내에서 바로 로딩을 하지 않고 로딩 시점을 뒤로 미루는 것

              참고 자료: https://nextjs.org/docs/app/building-your-application/optimizing/images
>>>>>>> 981c69e497a5e066d28180d7784cdab8b03a00c3
            */}

            {/* 1) 로컬(local) 이미지의 경우 */}
            {/* import로 이미지 가져오기
<<<<<<< HEAD
              Next.js가 가져온 이미지로부터 자동으로 width, heigth를 결정
=======
              Next.js가 가져온 이미지로부터 자동으로 width, height를 결정
>>>>>>> 981c69e497a5e066d28180d7784cdab8b03a00c3
              이 값은 이미지가 로딩될 때 layout shift를 방지
            */}
            {/* <Image src={fruitsImg} alt="fruits" className="fruits-img" /> */}

            {/* 2) 원격(remote) 이미지의 경우 */}
<<<<<<< HEAD
            {/* next.comfig.js에 원격 도메인 설정 필요
              width, height를 직접 제공해야 됨 */}
            {/* <Image
              src="https://goniboard.s3.ap-northeast-2.amazonaws.com/dog.JPG"
              alt="ff"
=======
            {/* next.config.js에 원격 도메인 설정 필요
              width, height를 직접 제공해야 됨 */}
            {/* <Image 
              src="https://goniboard.s3.ap-northeast-2.amazonaws.com/dog.JPG"
              alt="dog"
>>>>>>> 981c69e497a5e066d28180d7784cdab8b03a00c3
              width={160}
              height={160}
            /> */}

            <h4>{product}</h4>

            {/* 주문 수량 만들기 */}
            {/* onClick 이벤트 리스너와 이벤트 핸들러 함수를 쓰려면
              => client 컴포넌트로 변경 */}
<<<<<<< HEAD
            <button
              type="button"
              onClick={() => {
                const copuArray = [...orderCount];
                copuArray[index]--;
                setOrderCount(copuArray)
              }}
            >
              -
            </button>
            <span>{orderCount[index]}</span>
            <button
              type="button"
              onClick={() => {
                const copuArray = [...orderCount];
                copuArray[index]++;
                setOrderCount(copuArray)
              }}
            >
              +
            </button>
          </div>
        )
      })}
    </>
  )
=======
            <button type="button" onClick={() => {
              // Quiz: 수량 변경 기능 만들기
              // 배열/객체의 state를 변경하려면
              // 복사본을 만들고 복사본에 변화를 주고
              // 마지막으로 set함수에 복사본을 넣어주면 끝
              const copyArray = [...orderCount];
              copyArray[index]--;
              setOrderCount(copyArray);
            }}>
              -
            </button>
            <span>{orderCount[index]}</span>
            <button type="button" onClick={() => {
              const copyArray = [...orderCount];
              copyArray[index]++;
              setOrderCount(copyArray);
            }}>
              +
            </button>
          </div>
        );
      })}
    </>
  );
>>>>>>> 981c69e497a5e066d28180d7784cdab8b03a00c3
}