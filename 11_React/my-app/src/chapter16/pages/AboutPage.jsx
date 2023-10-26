import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

function AboutPage(props) {
  // 실습1
  const location = useLocation();
  console.log(location); // location 객체

  // 실습2
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const sort = searchParams.get('sort');


  return (
    <div>
      <h1>쿼리스트링 사용</h1>
      <h3>1. useLocation</h3>
      <p>{location.search}</p>
      {/* 이 문자열 앞에 있는 ?를 지우고, &로 분리한뒤 key와 value로 파싱하는 작업이 필요했는데
       현재는 useErarchParams() 훅을 이용하여 간편하게 작업 */}


      <h3>2. useSearchParams</h3>
      <p>keyword: {keyword}</p>
      <p>sort: {sort}</p>


    </div>
  );
}

export default AboutPage;